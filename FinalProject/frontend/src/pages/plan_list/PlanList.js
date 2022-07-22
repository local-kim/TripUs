import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../../styles/plan_list.css';
import { Link } from 'react-router-dom';
import { getMonth } from 'date-fns'
import { SeasonButton } from '.';

const PlanList = () => {
  const [seasons, setSeasons] = useState(() => []);

  const handleSeason = (event, newSeasons) => {
    setSeasons(newSeasons);
    // console.log(seasons);
  };

  useEffect(() => {
    // if(seasons.length == 0){
    //   setFilteredList(tripList);
    //   return;
    // }

    setFilteredList([]);  // 필터링 배열 초기화
    for(let i in seasons){
      if(seasons[i] == 'spring'){ // 3, 4, 5월
        setFilteredList([
          ...filteredList,
          ...tripList.filter((trip, idx) => getMonth(new Date(trip.start_date)) == 2 || getMonth(new Date(trip.start_date)) == 3 || getMonth(new Date(trip.start_date)) == 4)
        ]);
      }
      else if(seasons[i] == 'summer'){  // 6, 7, 8월
        setFilteredList([
          ...filteredList,
          ...tripList.filter((trip, idx) => getMonth(new Date(trip.start_date)) == 5 || getMonth(new Date(trip.start_date)) == 6 || getMonth(new Date(trip.start_date)) == 7)
        ]);
      }
      else if(seasons[i] == 'autumn'){
        setFilteredList([
          ...filteredList,
          ...tripList.filter((trip, idx) => getMonth(new Date(trip.start_date)) == 8 || getMonth(new Date(trip.start_date)) == 9 || getMonth(new Date(trip.start_date)) == 10)
        ]);
      }
      else{
        setFilteredList([
          ...filteredList,
          ...tripList.filter((trip, idx) => getMonth(new Date(trip.start_date)) == 11 || getMonth(new Date(trip.start_date)) == 0 || getMonth(new Date(trip.start_date)) == 1)
        ]);
      }
    }
    // setFilteredList(tripList.filter((trip, idx) => getMonth(new Date(trip.start_date)) == 6 || getMonth(new Date(trip.start_date)) == 7 || getMonth(new Date(trip.start_date)) == 8));
    console.log(filteredList);
  }, [seasons]);

  let planUrl = `${process.env.REACT_APP_SPRING_URL}plan/rank`;

  const [tripList, setTripList] = useState([]);
  const [filteredList, setFilteredList] = useState([]);

  useEffect(() => {
    axios.get(planUrl)
    .then(res => {
      console.log(res.data);
      setTripList(res.data);
      setFilteredList(res.data);
    })
    .catch(err => console.log(err));
  }, []);

  return (
    <div id='plan-list'>
      <div className='title'>인기 여행 일정</div>
      <div className='sub-title'>다른 여행자들의 일정을 참고해 나만의 여행을 계획해보세요!</div>

      <SeasonButton seasons={seasons} setSeasons={setSeasons} handleSeason={handleSeason}/>
      
        <div className='trip-wrap'>
          {
            filteredList && filteredList.map((trip, idx) => (
              <Link to={`/plan/detail/${trip.tripNum}`}>
                <div className='plan-item'>
                  <div className='city-img' style={{backgroundImage:`url(../../city_image/${trip.image})`}}>
                  </div>
                  <div className='info-wrap'>
                    <div style={{display:'flex',justifyContent:'space-between'}}>
                      <div className='trip-name'>{trip.tripName}</div>
                      
                      <div className='likes'>
                        <i className="fa-solid fa-heart"></i>
                        &nbsp;{trip.count}
                      </div>
                    </div>
                    <div className='date'>{trip.start_date} ~ {trip.end_date} ({trip.days}일)</div>
                    {/* <div>{getMonth(new Date(trip.start_date))}</div> */}
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