import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { NumPlaceItem, PlaceItem } from '.';
import '../../styles/plan.css';
import { format } from 'date-fns';

const { kakao } = window;

const Plan = () => {
  // redux에서 변수 얻기
  // const dispatch = useDispatch();
  const days = useSelector(state => state.planner.days);
  const startDate = useSelector(state => state.planner.startDate);
  const endDate = useSelector(state => state.planner.endDate);
  const cityNum = useSelector(state => state.planner.cityNum);
  const cityName = useSelector(state => state.planner.cityName);
  const areaCode = useSelector(state => state.planner.areaCode);
  const sigunguCode = useSelector(state => state.planner.sigunguCode);
  const plan = useSelector(state => state.planner.plan);

  // console.log(areaCode, sigunguCode);

  const navigate = useNavigate();

  let insertUrl = process.env.REACT_APP_SPRING_URL + `plan/insert`;

  const insertPlan = () => {
    // console.log(plan);
    // console.log({cityNum, startDate, endDate, days});
    
    axios.post(insertUrl, {
      plan: plan,
      trip: {
        cityNum: cityNum,
        startDate: startDate,
        endDate: endDate,
        days: days
      }
    })
    .then(res => {
      // console.log(res.data);  // trip_num
      // 해당 일정 상세 페이지로 이동(trip_num 이용)
      navigate(`/plan/detail/${res.data}`);
    })
    .catch(err => {
      console.log(err);
    });
  }

  const [focus, setFocus] = useState(0);

  // kakao map
  const kakaoMapScript = () => {
    const container = document.getElementById('map'); // 지도를 표시할 div  

    const options = {
      // TODO: 도시마다 중심 좌표 다르게(DB에 넣어놓기)
      center: new kakao.maps.LatLng(35.1795543, 129.0756416), // 지도의 중심좌표
      level: 9  // 지도의 확대 레벨
    };
    
    const map = new kakao.maps.Map(container, options); // 지도를 생성합니다

    // 일정에 있는 장소 마커들
    let markerList = [];

    for(let i in plan[focus]){
      markerList.push({latlng: new kakao.maps.LatLng(plan[focus][i].mapy, plan[focus][i].mapx), title: plan[focus][i].title});
    }

    // 커스텀 오버레이
    for (let i in markerList) {
      // 커스텀 오버레이에 표시할 내용
      // HTML 문자열 또는 Dom Element
      let content = `<div class ="label">${Number(i) + 1}</div>`;

      // 커스텀 오버레이가 표시될 위치
      let position = markerList[i].latlng;

      // 커스텀 오버레이를 생성
      let customOverlay = new kakao.maps.CustomOverlay({
          position: markerList[i].latlng,
          content: content
      });

      // 커스텀 오버레이를 지도에 표시
      customOverlay.setMap(map);
    }

    // 마커와 마커 사이에 선 그리기
    // 선을 구성하는 좌표 배열
    let linePath = [];

    for(let j in markerList){
      linePath.push(markerList[j].latlng);
    }

    // 지도에 표시할 선을 생성
    let polyline = new kakao.maps.Polyline({
      path: linePath, // 선을 구성하는 좌표 배열
      strokeWeight: 2.5, // 선의 두께
      strokeColor: '#333333', // 선의 색깔
      strokeOpacity: 0.6, // 선의 불투명도: 1에서 0 사이의 값, 0에 가까울수록 투명
      strokeStyle: 'shortdash' // 선의 스타일
    });

    // 지도에 선을 표시
    polyline.setMap(map);
  };

  useEffect(() => {
    kakaoMapScript();
  }, [focus]);

  return (
    <div id='plan'>

      <div id='map'></div>
      
      <div className='box-wrap'>
        <div className='title'>{cityName} 여행</div>
        {
          days == 1 ? <div className='period'>{format(startDate, "yyyy-MM-dd")} ({days}일)</div> : <div className='period'>{format(startDate, "yyyy-MM-dd")} ~ {format(endDate, "yyyy-MM-dd")} ({days}일)</div>
        }

        <button type='button' className='btn btn-primary btn-sm btn-plan' onClick={insertPlan}>일정 생성하기</button>
        {
          // days 만큼 반복문 돌리기
          [...Array(days)].map((day, index) => (
            <div key={index + 1} className='day'>
              <span className='title' onClick={() => {
                setFocus(index);
              }}>Day {index + 1}</span>
              <div className='day-place-list'>
                {
                  plan[index] && plan[index].map((place, i) => (
                    <div className='place-list-item' key={i}>
                      <NumPlaceItem place={place} num={i + 1} focus={focus === (index) ? true : false}/>
                    </div>
                  ))
                }
              </div>
              <button type='button' className='btn btn-outline-primary btn-sm btn-place' onClick={() => {
                navigate(`/plan/${index + 1}`);
              }}>장소 추가</button>
              <button type='button' className='btn btn-outline-secondary btn-sm btn-memo'>메모 추가</button>
            </div>
          ))
        }
      </div>
      
    </div>
  );
};

export default Plan;