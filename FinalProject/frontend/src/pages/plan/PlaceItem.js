import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation, useParams } from 'react-router-dom';
import '../../styles/plan.css';
import { connect, useDispatch, useSelector } from 'react-redux';
import { addPlace } from '../../modules/planner';
// import reducers from './modules';

const PlaceItem = (props) => {
  // const plan = useSelector(({ state }) => state.plan);
  const dispatch = useDispatch();

  return (
    <div className='place-container'>
      <img className='place-item' src={props.place.firstimage} alt=''/>

      <div className='place-item'>
        <div>{props.place.title}</div>
        <div>{props.place.cat3}</div>
        {/* <div>{place.contentid}</div> */}
      </div>
      
      {/* TODO: 나중에 버튼 대신 장소 이름 클릭하면 추가되게 변경 */}
      {/* <button type='button' className='place-item btn btn-light btn-sm' onClick={() => dispatch(addPlace(props.place))}>+</button> */}
      <button type='button' className='place-item btn btn-light btn-sm' onClick={() => props.addPlace(props.place)}>+</button>
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