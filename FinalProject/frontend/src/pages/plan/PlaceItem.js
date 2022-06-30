import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation, useParams } from 'react-router-dom';
import '../../styles/plan.css';
import { connect, useDispatch, useSelector } from 'react-redux';
import { addPlace } from '../../modules/planner';
// import reducers from './modules';

const PlaceItem = (props) => {
  // const plan = useSelector(({ state }) => state.plan);
  const dispatch = useDispatch();

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

  return (
    <div className='place-info-wrap'>
      <img src={props.place.firstimage} alt=''/>

      <div>
        <div>{props.place.title}</div>
        {/* <div>{props.place.cat3}</div> */}
        <div className='place-info'>{contentTypeId[props.place.cat3]}</div>
        <div className='place-info'>{props.place.contentid}</div>
      </div>
    </div>
  );
};

// const mapStateToProps = (state) => {
//   // getState와 같은 이름으로 지어도 되지만,
//   // 관행상 mapStateToProps를 사용한다
//   console.log(state)
//   return { plan: state.plan }
// }

// export default connect(mapStateToProps, {addPlace})(PlaceItem);
export default PlaceItem;