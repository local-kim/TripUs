import React, {useState} from 'react';
import { useNavigate } from 'react-router-dom';
import { DateRangePicker, DateRange } from 'react-date-range';
import { addDays } from 'date-fns';
import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file
import '../../styles/plan.css';
import { useDispatch } from 'react-redux';
import { setPlanInfo } from '../../modules/planner';

const Calendar = () => {
  const dispatch = useDispatch();

  // TODO: 어느 도시인지 cityNum 넘겨받기 (useParams로 할지, useNavigate의 state로 할지 나중에 결정..)
  const cityNum = 159;  // 부산(159)
  // TODO: areaCode, sigunguCode는 cityNum 이용하여 DB에서 구하기
  const areaCode = 6;
  const sigunguCode = null;

  const navigate = useNavigate();

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
        onChange={item => setState([item.selection])}
        showSelectionPreview={true}
        moveRangeOnFirstSelection={false}
        months={2}
        ranges={state}
        direction="horizontal"
      />

      <div>
        <button type='button' className='btn btn-primary' onClick={() => {
          // console.log(state[0].startDate, state[0].endDate);
          // 시작 날짜 : state[0].startDate
          // 끝 날짜 : state[0].endDate
          // 여기서 다음 페이지로 시작 날짜, 끝 날짜 넘겨주면서 이동
          navigate("/plan");

          const start = `${state[0].startDate.getFullYear()}-${state[0].startDate.getMonth() + 1}-${state[0].startDate.getDate()}`;
          const end = `${state[0].endDate.getFullYear()}-${state[0].endDate.getMonth() + 1}-${state[0].endDate.getDate()}`;
          const days = (state[0].endDate.getTime() - state[0].startDate.getTime()) / (1000*60*60*24) + 1;
          // console.log({start, end, days});
          dispatch(setPlanInfo(start, end, days, cityNum, areaCode, sigunguCode));
        }}>Next</button>
      </div>
    </div>
  );
};

export default Calendar;