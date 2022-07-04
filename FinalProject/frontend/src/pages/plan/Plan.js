import React from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { PlaceItem } from '.';
import '../../styles/plan.css';

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
    
    // axios: post로 DB에 insert
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
      console.log(res.data);  // trip_num
      // TODO: 해당 일정 상세 페이지로 이동(trip_num 이용)
      navigate("/plan/detail");
    })
    .catch(err => {
      console.log(err);
    });
  }

  return (
    <div id='plan'>
      <h3>나의 {cityName} 여행</h3>
      {
        days == 1 ? <h5>{startDate} ({days}일)</h5> : <h5>{startDate} ~ {endDate} ({days}일)</h5>
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
  );
};

export default Plan;