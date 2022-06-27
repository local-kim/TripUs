import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import '../../styles/plan.css';

const Plan = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const period = location.state.period;
  const start = period[0].startDate;
  const end = period[0].endDate;

  const areaCode = location.state.areaCode;
  const sigunguCode = location.state.sigunguCode;

  const startDate = `${start.getFullYear()}-${start.getMonth() + 1}-${start.getDate()}`;
  const endDate = `${end.getFullYear()}-${end.getMonth() + 1}-${end.getDate()}`;

  const days = (end.getTime() - start.getTime()) / (1000*60*60*24) + 1;

  // TODO: day 별로 일정 저장할 배열 필요..(전역 변수)

  // useEffect(() => {
  //   console.dir(startDate);
  //   console.log(startDate.getFullYear()); // 2022
  //   console.log(startDate.getMonth() + 1);  // 6
  //   console.log(startDate.getDate()); // 24
  //   // console.log(startDate.getUTCDay());
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
                    days: days,
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