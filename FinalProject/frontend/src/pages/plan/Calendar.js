import React, {useEffect, useRef, useState} from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
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

  // TODO: 어느 도시인지 cityNum 넘겨받기 (useParams로 할지, useNavigate의 state로 할지 나중에 결정..)
  const cityNum = 159;  // 부산(159)
  // areaCode, sigunguCode는 cityNum 이용하여 DB에서 구하기
  const areaCode = useRef();
  const sigunguCode = useRef();

  let cityUrl = process.env.REACT_APP_SPRING_URL + `plan/city-code?cityNum=${cityNum}`;

  useEffect(() => {
    axios.get(cityUrl)
    .then(res => {
      areaCode.current = res.data.area_code;
      sigunguCode.current = res.data.sigungu_code;
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
        <button type='button' className='btn btn-primary' onClick={() => {
          // console.log(state[0].startDate, state[0].endDate);
          // 시작 날짜 : state[0].startDate
          // 끝 날짜 : state[0].endDate
          const start = format(state[0].startDate, "yyyy-MM-dd");
          const end = format(state[0].endDate, "yyyy-MM-dd");
          const days = differenceInDays(state[0].endDate, state[0].startDate) + 1;
          // console.log({start, end, days, cityNum, areaCode, sigunguCode});
          dispatch(setPlanInfo(start, end, days, cityNum, areaCode.current, sigunguCode.current));

          navigate("/plan");
        }}>Next</button>
      </div>
    </div>
  );
};

export default Calendar;