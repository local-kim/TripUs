import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import '../../styles/plan.css';
import PlaceItem from './PlaceItem';

const Plan = () => {
  // redux에서 변수 얻기
  // const dispatch = useDispatch();
  const days = useSelector(state => state.planner.days);
  const startDate = useSelector(state => state.planner.startDate);
  const endDate = useSelector(state => state.planner.endDate);
  const areaCode = useSelector(state => state.planner.areaCode);
  const sigunguCode = useSelector(state => state.planner.sigunguCode);
  const plan = useSelector(state => state.planner.plan);

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

  // console.log(plan);

  const navigate = useNavigate();

  // TODO: day 별로 일정 저장할 배열 필요..(전역 변수)

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
              <div>
                {
                  plan[index] && plan[index].map((place, index) => (
                    <div className='place-container'>
                      <img className='place-item' src={place.firstimage} alt=''/>

                      <div className='place-item'>
                        <div>{place.title}</div>
                        {/* <div>{place.cat3}</div> */}
                        <div className='place-info'>{contentTypeId[place.cat3]}</div>
                        <div className='place-info'>{place.contentid}</div>
                      </div>
                    </div>
                  ))
                }
              </div>
              <button type='button' className='btn btn-outline-primary btn-sm' onClick={() => {
                navigate(`/plan/${index + 1}`);
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