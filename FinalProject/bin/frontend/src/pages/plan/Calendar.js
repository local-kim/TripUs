import React, {useEffect, useRef, useState} from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setPlanInfo } from '../../modules/planner';
import { DateRangePicker } from 'react-date-range';
import { differenceInDays, format } from 'date-fns';
import ko from 'date-fns/locale/ko';
import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file
import '../../styles/plan.css';

const Calendar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // TODO: 도시 페이지로부터 cityNum 넘겨받기 (useParams로 할지, useNavigate의 state로 할지 나중에 결정..)
  // const cityNum = 159;  // 부산(159)
  const {cityNum} = useParams();
  console.log(cityNum);
  
  const cityName = useRef();
  const areaCode = useRef();
  const sigunguCode = useRef();

  let cityUrl = process.env.REACT_APP_SPRING_URL + `plan/city-code?cityNum=${cityNum}`;

  useEffect(() => {
    console.log(cityUrl);
    axios.get(cityUrl)
    .then(res => {
      areaCode.current = res.data.area_code;
      sigunguCode.current = res.data.sigungu_code;
      cityName.current = res.data.city_name;
      // console.log(areaCode, sigunguCode);
    })
    .catch(err => {
      console.log(err);
    })
  }, []);

  const [state, setState] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: 'selection'
    }
  ]);

  return (
    <div id='plan-calendar'>
      <DateRangePicker
        locale={ko}
        onChange={item => setState([item.selection])}
        showSelectionPreview={true}
        moveRangeOnFirstSelection={false}
        months={2}
        ranges={state}
        direction="horizontal"
        dateDisplayFormat={'yyyy-MM-dd'}
        monthDisplayFormat={'yyyy년 M월'}
      />

      <div>
        <button type='button' className='next-btn btn btn-primary' onClick={() => {
          // console.log(state[0].startDate, state[0].endDate);
          // 시작 날짜 : state[0].startDate
          // 끝 날짜 : state[0].endDate
          const start = format(state[0].startDate, "yyyy-MM-dd");
          const end = format(state[0].endDate, "yyyy-MM-dd");
          const days = differenceInDays(state[0].endDate, state[0].startDate) + 1;
          // console.log({start, end, days, cityNum, areaCode, sigunguCode});
          dispatch(setPlanInfo(start, end, days, cityNum, cityName.current, areaCode.current, sigunguCode.current));

          navigate("/plan");
        }}>Next</button>
      </div>
    </div>
  );
};

export default Calendar;