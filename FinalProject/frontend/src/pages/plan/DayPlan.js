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

  const contentTypeId = {
    A01010100: '국립공원',
    A01010200: '도립공원',
    A01010300: '군립공원',
    A01010400: '산',
    A01010500: '자연생태관광지',
    A01010600: '자연휴양림',
    A01010700: '수목원',
    A01010800: '폭포',
    A01010900: '계곡',
    A01011000: '약수터',
    A01011100: '해안절경',
    A01011200: '해수욕장',
    A01011300: '섬',
    A01011400: '항구/포구',
    A01011500: '어촌',
    A01011600: '등대',
    A01011700: '호수',
    A01011800: '강',
    A01011900: '동굴',
    A02020300: '온천/욕장/스파',
    A02010800: '사찰',
    A02020700: '공원',
    A02020800: '유람선/잠수함관광',
  }

  const statePlan = useSelector(state => state.planner.plan);
  const [plan, setPlan] = useState(statePlan);
  
  const navigate = useNavigate();
  const {day} = useParams();
  // const [plan, setPlan] = useState(Array.from(Array(days), () => new Array())); // [days x n] 2차원 배열
  const [dayPlan, setDayPlan] = useState(plan[day]);
  // const [dayPlan, setDayPlan] = useState(plan[day]); // 초기값: Redux store의 plan[day] TODO: plan이 빈 배열이면 try-catch?

  // console.log(plan);
  // console.log(dayPlan);

  const [places, setPlaces] = useState([]);

  // 사진이 있는 장소만 받는 url(arrange=P)
  let apiUrl = `http://api.visitkorea.or.kr/openapi/service/rest/KorService/areaBasedList?ServiceKey=YHbvEJEqXIWLqYGKEDkCqF7V08yazpZHKk3gWVyGKJpuhY5ZowEIwkt9i8nmTs%2F5BMBmSKWuyX349VO5JN6Tsg%3D%3D&areaCode=${areaCode}&contentTypeId=12&arrange=P&MobileOS=ETC&MobileApp=AppTest&_type=json`;

  // 처음 렌더링 시 api에서 목록 받아옴
  useEffect(() => {
    axios.get(apiUrl)
    .then((res) => {
      // console.dir(res.data.response.body.items.item);
      setPlaces(res.data.response.body.items.item);
    }).catch((err) => {
      console.log(err.data);
    });
  }, []);

  // useEffect(() => {
  //   console.log(plan[day]);
  //   setDayPlan(plan[day]);
  // }, [plan, day]);

  const prevDay = () => {
    addPlan();
    setDayPlan(plan[Number(day) - 2]);
    // console.log(plan);
    // console.log(plan.at(0));
    // console.log(plan.at(1));
    // console.log(plan.at(2));
    // console.log(plan[Number(day)]);
    // console.log(dayPlan);
    navigate(`/plan/${Number(day) - 1}`, {
      state: {
        // days: days,
        // areaCode: areaCode,
        // sigunguCode: sigunguCode
      }
    })
  }

  const nextDay = () => {
    addPlan();
    setDayPlan(plan[Number(day)]);
    // console.log(plan);
    // console.log(plan.at(0));
    // console.log(plan.at(1));
    // console.log(plan.at(2));
    // console.log(dayPlan);
    navigate(`/plan/${Number(day) + 1}`, {
      state: {
        // days: days,
        // areaCode: areaCode,
        // sigunguCode: sigunguCode
      }
    })
  }

  const addPlace = (place) => {
    setDayPlan([
      ...dayPlan,
      place
    ]);
  }

  const addPlan = () => {
    // dispatch(addPlan(dayPlan));
    setPlan([
      ...plan.slice(0, day - 1), // 0 <= x < day - 1
      dayPlan,  // day - 1
      ...plan.slice(day)  // day <= x
    ]);
    // console.log(dayPlan);
    // console.log(plan);
  }

  return (
    <div id='day-plan'>
      <div style={{textAlign:'center'}}>
        {
          // day1이면 이전 날짜 버튼 안보임
          day == 1 ? "" : <button type='button' className='btn btn-secondary btn-sm' onClick={prevDay}>ᐸ</button>
        }
        <span className='title'>DAY {day}</span>
        {
          // 마지막 날이면 다음 날짜 버튼 안보임
          day == days ? "" : <button type='button' className='btn btn-secondary btn-sm' onClick={nextDay}>ᐳ</button>
        }
      </div>

      <div className='list-container'>
        <div className='left'>
          <span className='label'>나의 일정</span>
          <div>
            {
              // dayPlan이 있을 때만 표시
              dayPlan && dayPlan.map((place, index) => (
                <div className='place-container' key={index}>
                  <img className='place-item' src={place.firstimage} alt=''/>

                  <div className='place-item'>
                    <div>{place.title}</div>
                    {/* <div>{place.cat3}</div> */}
                    <div className='content-type-id'>{contentTypeId[place.cat3]}</div>
                    {/* <div>{place.contentid}</div> */}
                  </div>
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
              places.map((place, index) => <PlaceItem day={day} place={place} addPlace={addPlace} key={index}/>)
            }
          </div>
          
          {/* TODO: DB에서 저장한 장소 목록 불러오기 */}
          <span className='label'>내가 저장한 장소</span>
          <div className='my-place-list'>
            
          </div>
        </div>
      </div>

      <button type='button' onClick={() => {
        // plan을 redux 전역 변수에 저장
        dispatch(savePlan(plan));
        navigate("/plan");
      }}>완료</button>
      
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