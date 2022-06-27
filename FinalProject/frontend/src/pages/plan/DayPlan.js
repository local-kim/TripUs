import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation, useParams } from 'react-router-dom';
import '../../styles/plan.css';
import { PlaceItem } from ".";
import TextField from '@mui/material/TextField';

const DayPlan = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const {day} = useParams();
  const days = location.state.days;

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
      console.dir(res.data.response.body.items.item);
      setPlaces(res.data.response.body.items.item);
    }).catch((err) => {

    });
  }, []);

  const prevDay = () => {
    navigate(`/plan/${Number(day) - 1}`, {
      state: {
        days: days,
        areaCode: areaCode,
        sigunguCode: sigunguCode
      }
    })
  }

  const nextDay = () => {
    navigate(`/plan/${Number(day) + 1}`, {
      state: {
        days: days,
        areaCode: areaCode,
        sigunguCode: sigunguCode
      }
    })
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
        </div>

        <div className='right'>
          {/* 장소 검색창 */}
          {/* 키워드 입력하고 버튼 클릭 또는 엔터 누르면 추천 장소 목록은 없어지고 검색 결과 목록이 나옴 */}
          <TextField id="" label="검색할 장소를 입력하세요" variant="outlined" size="small" fullWidth />
          
          {/* API에서 장소 목록 불러오기 */}
          <span className='label'>추천 장소</span>
          <div className='api-place-list'>
            {
              places.map((place, index) => <PlaceItem place={place} key={index}/>)
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

export default DayPlan;