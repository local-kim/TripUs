import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../../styles/plan_list.css';
import { Link } from 'react-router-dom';

const PlanList = () => {
  let planUrl = `${process.env.REACT_APP_SPRING_URL}plan/rank`;

  const [tripList, setTripList] = useState([]);

  useEffect(() => {
    axios.get(planUrl)
    .then(res => {
      console.log(res.data);
      setTripList(res.data);
    })
    .catch(err => console.log(err));
  }, []);

  return (
    <div id='plan-list'>
      <div className='title'>인기 여행 일정</div>
      <div className='sub-title'>다른 여행자들의 일정을 참고해 나만의 여행을 계획해보세요!</div>
      
        <div className='trip-wrap'>
          {
            tripList && tripList.map((trip, idx) => (
              <Link to={`/plan/detail/${trip.tripNum}`}>
                <div className='plan-item'>
                  <div className='city-img' style={{backgroundImage:`url(../../city_image/${trip.image})`}}></div>
                  <div className='info-wrap'>
                    <div className='city-name'>{trip.tripName}</div>
                    <div className='date'>{trip.start_date} ~ {trip.end_date} ({trip.days}일)</div>
                    <div className='member-name'>{trip.memberName}님</div>
                  </div>
                </div>
              </Link>
            ))
          }
        </div>
    </div>
  );
};

export default PlanList;