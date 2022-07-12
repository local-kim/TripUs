import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { PlaceItem } from '.';
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

  // kakao map
  const kakaoMapScript = (mapX, mapY) => {

    console.log(plan[0]);

    let markerList = [];
    // let yList = [];
    // let titleList = [];

    for(let i in plan[0]){
      // console.log(plan[0][i].mapx);
      markerList.push({latlng: new kakao.maps.LatLng(plan[0][i].mapy, plan[0][i].mapx), title: plan[0][i].title});
      // yList.push(plan[0][i].mapy);
      // titleList.push(plan[0][i].title);
    }

    console.log(markerList);
        
    const container = document.getElementById('map');

    const options = {
      center: new kakao.maps.LatLng(35.1795543, 129.0756416), // TODO: 도시마다 중심 좌표 다르게(DB에 넣어놓기)
      level: 9
    };
    
    const map = new kakao.maps.Map(container, options);

    // //마커가 표시 될 위치
    // let markerPosition = new kakao.maps.LatLng(mapY, mapX);

    // // 마커를 생성
    // let marker = new kakao.maps.Marker({position: markerPosition,});

    // // 마커를 지도 위에 표시
    // marker.setMap(map);

    // 마커 이미지의 이미지 주소입니다
    var imageSrc = "https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/markerStar.png"; 
      
    for (var i in markerList) {
      // 마커 이미지의 이미지 크기 입니다
      var imageSize = new kakao.maps.Size(24, 35); 
      
      // 마커 이미지를 생성합니다    
      var markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize); 
      
      // 마커를 생성합니다
      var marker = new kakao.maps.Marker({
          map: map, // 마커를 표시할 지도
          position: markerList[i].latlng, // 마커를 표시할 위치
          title : markerList[i].title, // 마커의 타이틀, 마커에 마우스를 올리면 타이틀이 표시됩니다
          image : markerImage // 마커 이미지 
      });
    }
  };

  useEffect(() => {
    kakaoMapScript();
  }, []);

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
              <span>Day {index + 1}</span>
              <div className='day-place-list'>
                {
                  plan[index] && plan[index].map((place, index) => (
                    <div className='place-list-item' key={index}>
                      <PlaceItem place={place}/>
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