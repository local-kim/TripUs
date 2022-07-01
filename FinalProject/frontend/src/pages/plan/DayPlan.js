import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { useNavigate, useLocation, useParams } from 'react-router-dom';
import '../../styles/plan.css';
import { PlaceItem } from ".";
import TextField from '@mui/material/TextField';
import { connect, ReactReduxContext, useDispatch, useSelector } from 'react-redux'
import { savePlan } from '../../modules/planner';
// import reducers from './modules';

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

  // 사진이 있는 장소만 받는 url(arrange=P)
  // let apiUrl = `http://api.visitkorea.or.kr/openapi/service/rest/KorService/areaBasedList?ServiceKey=YHbvEJEqXIWLqYGKEDkCqF7V08yazpZHKk3gWVyGKJpuhY5ZowEIwkt9i8nmTs%2F5BMBmSKWuyX349VO5JN6Tsg%3D%3D&areaCode=${areaCode}&contentTypeId=12&arrange=P&MobileOS=ETC&MobileApp=AppTest&_type=json`;
  let apiUrl = `http://api.visitkorea.or.kr/openapi/service/rest/KorService/areaBasedList?ServiceKey=YHbvEJEqXIWLqYGKEDkCqF7V08yazpZHKk3gWVyGKJpuhY5ZowEIwkt9i8nmTs%2F5BMBmSKWuyX349VO5JN6Tsg%3D%3D&areaCode=${areaCode}&numOfRows=30&arrange=P&MobileOS=ETC&MobileApp=AppTest&_type=json`;

  // 처음 렌더링 시 api에서 목록 받아옴
  useEffect(() => {
    axios.get(apiUrl)
    .then((res) => {
      console.dir(res.data.response.body.items.item);
      setPlaces(res.data.response.body.items.item);
    }).catch((err) => {
      console.log(err.data);
    });
  }, []);

  useEffect(() => {
    addPlan();
  }, [dayPlan]);

  // useEffect(() => {
  //   console.log(plan[day]);
  //   setDayPlan(plan[day]);
  // }, [plan, day]);

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

  // 선택한 장소를 dayPlan에 저장
  const addPlace = (place) => {
    setDayPlan([
      ...dayPlan,
      place
    ]);
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

  return (
    <div id='day-plan'>
      <div className='title-wrap'>
        {
          // day1이면 이전 날짜 버튼 안보임
          day == 1 ? <button style={{opacity:'0',cursor:'default'}}>ᐸ</button> : <button type='button' className='btn btn-secondary btn-sm' onClick={prevDay}>ᐸ</button>
        }
        <span className='title'>DAY {day}</span>
        {
          // 마지막 날이면 다음 날짜 버튼 안보임
          day == days ? <button style={{opacity:'0',cursor:'default'}}>ᐳ</button> : <button type='button' className='btn btn-secondary btn-sm' onClick={nextDay}>ᐳ</button>
        }
      </div>

      <div className='list-container'>
        <div className='left'>
          <span className='label'>나의 일정</span>
          <div className='plan-place-list'>
            {
              // dayPlan이 있을 때만 표시
              dayPlan && dayPlan.map((place, index) => (
                <div className='place-list-item'>
                  <PlaceItem place={place} key={index}/>
                </div>
              ))
            }
          </div>
        </div>

        <div className='right'>
          {/* 장소 검색창 */}
          {/* 키워드 입력하고 버튼 클릭 또는 엔터 누르면 추천 장소 목록은 없어지고 검색 결과 목록이 나옴 */}
          <TextField id="" label="검색할 장소를 입력하세요" variant="outlined" size="small" fullWidth />
          
          {/* API에서 장소 목록 불러오기 */}
          <span className='label'>추천 장소</span>
          <div className='api-place-list'>
            {
              places.map((place, index) => (
                <div className='place-list-item'>
                  <PlaceItem place={place} addPlace={addPlace} key={index}/>
                  <button type='button' className='btn btn-light btn-sm' onClick={() => addPlace(place)}>+</button>
                </div>
              ))
            }
          </div>
          
          {/* TODO: DB에서 저장한 장소 목록 불러오기 */}
          <span className='label'>내가 저장한 장소</span>
          <div className='my-place-list'>
            
          </div>
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
  );
};

// const mapStateToProps = (state) => {
//   // getState와 같은 이름으로 지어도 되지만,
//   // 관행상 mapStateToProps를 사용한다
//   console.log(state)
//   return { plan: state.plan }
// }

// export default connect(mapStateToProps, {addPlace})(DayPlan);
export default DayPlan;