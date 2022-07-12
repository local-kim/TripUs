import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import TextField from '@mui/material/TextField';
import { useDispatch, useSelector } from 'react-redux'
import { savePlan } from '../../modules/planner';
import { useInView } from 'react-intersection-observer';
import { PlaceItem, MyPlaceList } from ".";
import '../../styles/plan.css';
import setAuthorizationToken from '../../utils/setAuthorizationToken';

const { kakao } = window;

const DayPlan = () => {
  // redux에서 변수 얻기
  const dispatch = useDispatch();
  // const plan = useSelector(state => state.planner.plan);
  const days = useSelector(state => state.planner.days);
  const areaCode = useSelector(state => state.planner.areaCode);
  const sigunguCode = useSelector(state => state.planner.sigunguCode);

  const statePlan = useSelector(state => state.planner.plan);
  const [plan, setPlan] = useState(statePlan);
  
  const navigate = useNavigate();
  const {day} = useParams();
  // const [plan, setPlan] = useState(Array.from(Array(days), () => new Array())); // [days x n] 2차원 배열
  const [dayPlan, setDayPlan] = useState(plan[day - 1]);

  const [places, setPlaces] = useState([]);

  const [keyword, setKeyword] = useState('');
  const [category, setCategory] = useState('');
  const [categoryPlace, setCategoryPlace] = useState([]);

  // 호버된 장소 좌표
  const [mapX, setMapX] = useState('');
  const [mapY, setMapY] = useState('');
  
  // scroll paging
  const [ref, inView] = useInView();
  const [page, setPage] = useState(2);

  useEffect(() => {
    // 사용자가 마지막 요소를 보고 있는 경우
      if(inView){
        setPage(page + 1);

        // 추천 장소(keyword 값이 아직 없을 때) : 처음 렌더링 시
        if(keyword == ''){
          areaUrl += `&pageNo=${page}`;
          console.log(areaUrl);
          delete axios.defaults.headers.common['Authorization'];
          axios.get(areaUrl)
          .then((res) => {
            console.dir(res.data.response.body.items.item);
            setPlaces([...places, ...res.data.response.body.items.item]);
            setCategoryPlace([...categoryPlace, ...res.data.response.body.items.item]);
          }).catch((err) => {
            console.log(err.data);
          });
        }
        // 키워드 검색 장소
        else{
          keywordUrl += `&pageNo=${page}`;
          // console.log("keyword 검색 요청");
          console.log(keywordUrl);
          delete axios.defaults.headers.common['Authorization'];
          axios.get(keywordUrl)
          .then((res) => {
            console.dir(res.data.response.body.items.item);
            setPlaces([...places, ...res.data.response.body.items.item]);
            setCategoryPlace([...categoryPlace, ...res.data.response.body.items.item]);
          }).catch((err) => {
            console.log(err.data);
          });
        }
      }
  }, [inView]);

  // 추천 장소 url(arrange=P)
  let areaUrl = `http://api.visitkorea.or.kr/openapi/service/rest/KorService/areaBasedList?ServiceKey=${process.env.REACT_APP_TOUR_API_KEY}&areaCode=${areaCode}&numOfRows=10&arrange=B&MobileOS=ETC&MobileApp=AppTest&_type=json`;

  if(sigunguCode){  // 시군구 코드가 있는 도시이면
    areaUrl += `&sigunguCode=${sigunguCode}`;
  }

  // 키워드 검색 url
  let keywordUrl = `http://api.visitkorea.or.kr/openapi/service/rest/KorService/searchKeyword?ServiceKey=${process.env.REACT_APP_TOUR_API_KEY}&keyword=${keyword}&areaCode=${areaCode}&numOfRows=10&arrange=B&MobileOS=ETC&MobileApp=AppTest&_type=json`;

  if(sigunguCode){  // 시군구 코드가 있는 도시이면
    keywordUrl += `&sigunguCode=${sigunguCode}`;
  }

  useEffect(() => {
    // 추천 장소(keyword 값이 아직 없을 때) : 처음 렌더링 시
    if(keyword == ''){
      // setAuthorizationToken(null);
      // axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('jwtToken')}`;
      delete axios.defaults.headers.common['Authorization'];
      axios.get(areaUrl)
      .then((res) => {
        console.dir(res.data.response.body.items.item);
        setPlaces(res.data.response.body.items.item);
        setCategoryPlace(res.data.response.body.items.item);
        kakaoMapScript(res.data.response.body.items.item[0].mapx, res.data.response.body.items.item[0].mapy);
      }).catch((err) => {
        console.log(err.data);
      });
    }
    // 키워드 검색 장소
    else{
      // console.log("keyword 검색 요청");
      // console.log(keywordUrl);
      delete axios.defaults.headers.common['Authorization'];
      axios.get(keywordUrl)
      .then((res) => {
        console.dir(res.data.response.body.items.item);
        setPlaces(res.data.response.body.items.item);
        setCategoryPlace(res.data.response.body.items.item);
      }).catch((err) => {
        console.log(err.data);
      });
    }
  }, [keyword]);

  // 처음 렌더링 시 api에서 목록 받아옴
  // useEffect(() => {
  //   // console.log(areaUrl);
  //   axios.get(areaUrl)
  //   .then((res) => {
  //     console.dir(res.data.response.body.items.item);
  //     setPlaces(res.data.response.body.items.item);
  //   }).catch((err) => {
  //     console.log(err.data);
  //   });
  // }, []);

  // 카테고리 필터링
  useEffect(() => {
    if(category == ''){
      setCategoryPlace(places);
      return;
    }
    if(category == 12){ // 관광지, 문화시설
      // console.log(category);
      setCategoryPlace(places.filter((place, index) => place.contenttypeid == '12' || place.contenttypeid == '14'));
      // console.log(categoryPlace);
    }
    else if(category == 39){  // 음식점
      // console.log(category);
      setCategoryPlace(places.filter((place, index) => place.contenttypeid == '39'));
      // console.log(categoryPlace);
    }
    else{ // 숙박
      // console.log(category);
      setCategoryPlace(places.filter((place, index) => place.contenttypeid == '32'));
      // console.log(categoryPlace);
    }
  }, [category, places]);

  useEffect(() => {
    addPlan();
  }, [dayPlan]);

  const prevDay = () => {
    // addPlan();
    setDayPlan(plan[Number(day) - 2]);
    navigate(`/plan/${Number(day) - 1}`);
  }

  const nextDay = () => {
    // addPlan();
    setDayPlan(plan[Number(day)]);  // dayPlan에 다음날의 일정을 저장
    navigate(`/plan/${Number(day) + 1}`);
  }

  // 선택한 장소를 dayPlan에 추가
  const addPlace = (place) => {
    setDayPlan([
      ...dayPlan,
      place
    ]);
  }

  // 선택한 장소를 dayPlan에서 삭제
  const removePlace = (index) => {
    setDayPlan(dayPlan.filter((plan, i) => index !== i));
  }

  // 선택한 장소를 한 칸 위로 옮김
  const upPlace = (index) => {
    setDayPlan([
      ...dayPlan.slice(0, index - 1), // 0 ~ index - 2
      dayPlan[index],
      dayPlan[index - 1],
      ...dayPlan.slice(index + 1)
    ])
  }

  // 선택한 장소를 한 칸 아래로 옮김
  const downPlace = (index) => {
    setDayPlan([
      ...dayPlan.slice(0, index), // 0 ~ index - 1
      dayPlan[index + 1],
      dayPlan[index],
      ...dayPlan.slice(index + 2)
    ])
  }

  // dayPlan을 plan에 저장
  const addPlan = () => {
    // dispatch(addPlan(dayPlan));
    setPlan([
      ...plan.slice(0, day - 1), // 0 ~ day - 2
      dayPlan,  // day - 1
      ...plan.slice(day)  // day ~
    ]);
  }

  // kakao map
  const kakaoMapScript = (mapX, mapY) => {
        
    const container = document.getElementById('map');

    const options = {
      center: new kakao.maps.LatLng(35.1795543, 129.0756416), // TODO: 도시마다 중심 좌표 다르게(DB에 넣어놓기)
      level: 8
    };
    
    const map = new kakao.maps.Map(container, options);

    //마커가 표시 될 위치
    let markerPosition = new kakao.maps.LatLng(mapY, mapX);

    // 마커를 생성
    let marker = new kakao.maps.Marker({position: markerPosition,});

    // 마커를 지도 위에 표시
    marker.setMap(map);
  };

  useEffect(() => {
    kakaoMapScript(mapX, mapY);
  }, [mapX, mapY]);

  return (
    <div id='day-plan'>
      <div id='map'></div>

      <div className='list-container'>
        <div className='left'>
          <div className='title-wrap'>
            {
              // day1이면 이전 날짜 버튼 안보임
              day == 1 ? <button style={{opacity:'0',cursor:'default'}}>ᐸ</button> : <button type='button' className='btn btn-sm' onClick={prevDay}>ᐸ</button>
            }
            <span className='title'>DAY {day}</span>
            {
              // 마지막 날이면 다음 날짜 버튼 안보임
              day == days ? <button style={{opacity:'0',cursor:'default'}}>ᐳ</button> : <button type='button' className='btn btn-sm' onClick={nextDay}>ᐳ</button>
            }
          </div>
          <div className='plan-place-list'>
            <span className='label'>나의 일정</span>
            <div className='place-list'>
              {
                // dayPlan이 있을 때만 표시
                dayPlan && dayPlan.map((place, index) => (
                  <div className='place-list-item' key={index}>
                    <PlaceItem place={place} setMapX={setMapX} setMapY={setMapY}/>
                    <div className='btn-wrap'>
                      {/* TODO: drag & drop으로 변경 */}
                      <div className='move-btn'>
                        {
                          index === 0 ? "" : <button type='button' className='btn btn-sm' onClick={() => upPlace(index)}>↑</button>
                        }
                        {
                          index === dayPlan.length - 1 ? "" : <button type='button' className='btn btn-sm' onClick={() => downPlace(index)}>↓</button>
                        }
                      </div>
                    
                      <button type='button' className='edit-btn btn btn-danger btn-sm' onClick={() => removePlace(index)}>−</button>
                    </div>
                  </div>
                ))
              }
            </div>
          </div>

          <div style={{textAlign:'center', marginTop:'10px'}}>
            <button type='button' className='btn btn-secondary' onClick={() => {
              // addPlan();
              // plan을 redux 전역 변수에 저장
              dispatch(savePlan(plan));
              navigate("/plan");
            }}>완료</button>
          </div>
        </div>

        <div className='right'>
          {/* 장소 검색창 */}
          <TextField id="" label="검색할 키워드를 입력하세요" variant="outlined" size="small" fullWidth onKeyPress={(e) => {
            if(e.key === 'Enter' && e.target.value != ''){
              setKeyword(e.target.value);
              e.target.value = '';
              setPlaces([]);
            }
          }}/>
          
          {/* API에서 장소 목록 불러오기 */}
          <div className='api-place-list'>
            <div className='label-wrap'>
              <span className='label'>
                {
                  keyword === '' ? '추천 장소' : "'" + keyword + "' 검색 결과"
                }
              </span>

              {/* 카테고리 필터(관광지, 음식점, 숙소,,) */}
              <span className='category-btn'>
                <button type='button' className={category == 12 ? 'btn btn-dark btn-sm' : 'btn btn-outline-dark btn-sm'} onClick={() => {
                  if(category == 12){
                    setCategory('');
                  }
                  else{
                    setCategory(12);
                  }
                }}>관광</button>
                <button type='button' className={category == 39 ? 'btn btn-dark btn-sm' : 'btn btn-outline-dark btn-sm'} onClick={() => {
                  if(category == 39){
                    setCategory('');
                  }
                  else{
                    setCategory(39);
                  }
                }}>맛집</button>
                <button type='button' className={category == 32 ? 'btn btn-dark btn-sm' : 'btn btn-outline-dark btn-sm'} onClick={() => {
                  if(category == 32){
                    setCategory('');
                  }
                  else{
                    setCategory(32);
                  }
                }}>숙소</button>
              </span>
            </div>
            
            <div className='place-list'>
              {
                // TODO: 끝까지 스크롤하면 장소 더 불러오기
                // places && places.map((place, index) => (
                categoryPlace && categoryPlace.map((place, index) => (
                  (categoryPlace.length - 1 == index) ? (
                    <div className='place-list-item' key={index} ref={ref}>
                      <PlaceItem place={place} addPlace={addPlace} setMapX={setMapX} setMapY={setMapY}/>
                      <button type='button' className='edit-btn btn btn-light btn-sm' onClick={() => addPlace(place)}>+</button>
                    </div>
                  ) : (
                    <div className='place-list-item' key={index}>
                      <PlaceItem place={place} addPlace={addPlace} setMapX={setMapX} setMapY={setMapY}/>
                      <button type='button' className='edit-btn btn btn-light btn-sm' onClick={() => addPlace(place)}>+</button>
                    </div>
                  )
                ))
              }
            </div>
          </div>
          
          {/* DB에서 저장한 장소 목록 불러오기 */}
          <MyPlaceList addPlace={addPlace} setMapX={setMapX} setMapY={setMapY}/>
        </div>
      </div>
    </div>
  );
};

export default DayPlan;