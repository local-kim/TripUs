import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { useNavigate, useLocation, useParams } from 'react-router-dom';
import '../../styles/plan.css';
import { PlaceItem } from ".";
import TextField from '@mui/material/TextField';
import { connect, ReactReduxContext, useDispatch, useSelector } from 'react-redux'
// import reducers from './modules';

const DayPlan = () => {
  const dispatch = useDispatch();
  const plan = useSelector(state => state.planner.plan);
  const days = useSelector(state => state.planner.days);
  // console.log(a);
  console.log(plan);
  // const { store } = useContext(ReactReduxContext);
  
  const navigate = useNavigate();
  const location = useLocation();
  const {day} = useParams();
  const [dayPlan, setDayPlan] = useState([]); // 초기값: Redux store의 plan[day]
  // const [dayPlan, setDayPlan] = useState(plan[day]); // TODO: plan이 빈 배열이면 try-catch?
  // const days = location.state.days;

  // TODO: city_num을 넘겨받고 DB에서 city_num을 이용하여 areaCode, sigunguCode 얻기..?
  const areaCode = location.state.areaCode;
  const sigunguCode = location.state.sigunguCode; // 있을 수도, 없을 수도 있음

  const [places, setPlaces] = useState([]);

  // 사진이 있는 장소만 받는 url(arrange=P)
  let apiUrl = `http://api.visitkorea.or.kr/openapi/service/rest/KorService/areaBasedList?ServiceKey=YHbvEJEqXIWLqYGKEDkCqF7V08yazpZHKk3gWVyGKJpuhY5ZowEIwkt9i8nmTs%2F5BMBmSKWuyX349VO5JN6Tsg%3D%3D&areaCode=${areaCode}&contentTypeId=12&arrange=P&MobileOS=ETC&MobileApp=AppTest&_type=json`;

  // 처음 렌더링 시 api에서 목록 받아옴
  useEffect(() => {
    // console.log(areaCode);

    axios.get(apiUrl)
    .then((res) => {
      // console.dir(res.data.response.body.items.item);
      setPlaces(res.data.response.body.items.item);
    }).catch((err) => {
      console.log(err.data);
    });
  }, []);

  const prevDay = () => {
    addPlan();
    navigate(`/plan/${Number(day) - 1}`, {
      state: {
        days: days,
        areaCode: areaCode,
        sigunguCode: sigunguCode
      }
    })
  }

  const nextDay = () => {
    addPlan();
    navigate(`/plan/${Number(day) + 1}`, {
      state: {
        days: days,
        areaCode: areaCode,
        sigunguCode: sigunguCode
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
    dispatch(addPlan(dayPlan));
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
              dayPlan.map((place, index) => (
                <div className='place-container'>
                  <img className='place-item' src={place.firstimage} alt=''/>

                  <div className='place-item'>
                    <div>{place.title}</div>
                    <div>{place.cat3}</div>
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

      {/* <button type='button' onClick={() => {
        navigate("/plan", {
          state: {
            days: days,
            areaCode: areaCode,
            sigunguCode: sigunguCode
          }
        });
      }}>완료</button> */}
      
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