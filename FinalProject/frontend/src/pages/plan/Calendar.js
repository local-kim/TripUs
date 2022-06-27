import React, {useState} from 'react';
import { useNavigate } from 'react-router-dom';
import { DateRangePicker, DateRange } from 'react-date-range';
import { addDays } from 'date-fns';
import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file
import '../../styles/plan.css';

const Calendar = () => {
  // TODO: 어느 도시인지 areaCode, sigunguCode 넘겨받기 (useParams로 할지, useNavigate의 state로 할지 나중에 결정..)
  // 일단은 부산이라고 가정하고 const에 저장
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
          navigate("/plan", {
            state: {
              // startDate: state[0].startDate,
              // endDate: state[0].endDate
              period: state,
              areaCode: areaCode,
              sigunguCode: sigunguCode
            }
          });
        }}>Next</button>
      </div>
    </div>
  );
};

export default Calendar;