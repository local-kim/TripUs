import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { NumPlaceItem, PlaceItem } from '.';
import '../../styles/plan.css';

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
  const kakaoMapScript = (mapX, mapY) => {
    let markerList = [];

    for(let i in plan[focus]){
      markerList.push({latlng: new kakao.maps.LatLng(plan[focus][i].mapy, plan[focus][i].mapx), title: plan[focus][i].title});
    }

    // console.log(markerList);
        
    const container = document.getElementById('map');

    const options = {
      center: new kakao.maps.LatLng(35.1795543, 129.0756416), // TODO: 도시마다 중심 좌표 다르게(DB에 넣어놓기)
      // center: new kakao.maps.LatLng(126.9784147, 37.5666805),
      level: 9
    };
    
    const map = new kakao.maps.Map(container, options);

    // 마커 이미지의 이미지 주소입니다
    // let imageSrc = "https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/markerStar.png";

    // 마커 이미지의 이미지 크기입니다
    let imageSize = new kakao.maps.Size(24, 35);
    
    // 마커 이미지를 생성합니다
    // let markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize);

    for (let i in markerList) {
      // 마커를 생성합니다
      // let marker = new kakao.maps.Marker({
      //   map: map, // 마커를 표시할 지도
      //   position: markerList[i].latlng, // 마커를 표시할 위치
      //   title : markerList[i].title, // 마커의 타이틀, 마커에 마우스를 올리면 타이틀이 표시됩니다
      //   // image : markerImage // 마커 이미지
      // });

      // 커스텀 오버레이에 표시할 내용입니다     
      // HTML 문자열 또는 Dom Element 입니다
      let content = `<div class ="label">${Number(i) + 1}</div>`;

      // 커스텀 오버레이가 표시될 위치입니다
      let position = markerList[i].latlng;

      // 커스텀 오버레이를 생성합니다
      let customOverlay = new kakao.maps.CustomOverlay({
          position: markerList[i].latlng,
          content: content
      });

      // 커스텀 오버레이를 지도에 표시합니다
      customOverlay.setMap(map);
    }

    // 선을 구성하는 좌표 배열입니다. 이 좌표들을 이어서 선을 표시합니다
    let linePath = [];

    for(let j in markerList){
      linePath.push(markerList[j].latlng);
    }

    // 지도에 표시할 선을 생성합니다
    let polyline = new kakao.maps.Polyline({
      path: linePath, // 선을 구성하는 좌표배열입니다
      strokeWeight: 3, // 선의 두께입니다
      strokeColor: '#333333', // 선의 색깔입니다
      strokeOpacity: 0.6, // 선의 불투명도 입니다 1에서 0 사이의 값이며 0에 가까울수록 투명합니다
      strokeStyle: 'shortdash' // 선의 스타일입니다
    });

    // 지도에 선을 표시합니다 
    polyline.setMap(map);

    // // 커스텀 오버레이에 표시할 내용입니다     
    // // HTML 문자열 또는 Dom Element 입니다 
    // let content = `<div class ="label"><span class="left"></span><span class="center">카카오!</span><span class="right"></span></div>`;

    // // 커스텀 오버레이가 표시될 위치입니다
    // var position = new kakao.maps.LatLng(33.450701, 126.570667);

    // // 커스텀 오버레이를 생성합니다
    // var customOverlay = new kakao.maps.CustomOverlay({
    //     position: position,
    //     content: content
    // });

    // // 커스텀 오버레이를 지도에 표시합니다
    // customOverlay.setMap(map);
  };

  useEffect(() => {
    kakaoMapScript();
  }, [focus]);

  return (
    <div id='plan'>

      <div id='map'></div>
      
      <div className='place-list'>
        <div className='title'>{cityName} 여행</div>
        {
          days == 1 ? <div className='period'>{startDate} ({days}일)</div> : <div className='period'>{startDate} ~ {endDate} ({days}일)</div>
        }

        <button type='button' className='btn btn-primary btn-sm' onClick={insertPlan}>일정 생성하기</button>
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
              <button type='button' className='btn btn-outline-primary btn-sm' onClick={() => {
                navigate(`/plan/${index + 1}`);
              }}>장소 추가</button>
              <button type='button' className='btn btn-outline-secondary btn-sm'>메모 추가</button>
            </div>
          ))
        }
      </div>
      
    </div>
  );
};

export default Plan;