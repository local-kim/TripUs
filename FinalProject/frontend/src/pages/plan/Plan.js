import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { setDate } from '../../modules/planner';
import '../../styles/plan.css';

const Plan = () => {
  // const dispatch = useDispatch();
  const days = useSelector(state => state.planner.days);

  const startDate = useSelector(state => state.planner.startDate);
  const endDate = useSelector(state => state.planner.endDate);

  const navigate = useNavigate();
  const location = useLocation();

  const areaCode = location.state.areaCode;
  const sigunguCode = location.state.sigunguCode;

  // TODO: day 별로 일정 저장할 배열 필요..(전역 변수)

  // useEffect(() => {
  //   console.dir(start);
  //   console.log(start.getFullYear()); // 2022
  //   console.log(start.getMonth() + 1);  // 6
  //   console.log(start.getDate()); // 24
  //   // console.log(start.getUTCDay());
  //   console.log(days);
  // }, []);

  return (
    <div id='plan'>
      <h3>나의 부산 여행</h3>
      <h5>{startDate} ~ {endDate} ({days}일)</h5>
      {
        // days 만큼 반복문 돌리기
        [...Array(days)].map((day, index) => (
          <div key={index + 1} className='day'>
            <span>DAY {index + 1}</span>
            <div>
              <button type='button' className='btn btn-outline-primary btn-sm' onClick={() => {
                navigate(`/plan/${index + 1}`, {
                  state: {
                    // days: days,
                    areaCode: areaCode,
                    sigunguCode: sigunguCode
                  }
                })
              }}>장소 추가</button>
              <button type='button' className='btn btn-outline-secondary btn-sm'>메모 추가</button>
            </div>
          </div>
        ))
      }
    </div>
  );
};

export default Plan;