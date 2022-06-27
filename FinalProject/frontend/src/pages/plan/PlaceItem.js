import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation, useParams } from 'react-router-dom';
import '../../styles/plan.css';

const PlaceItem = ({place}) => {
  return (
    <div className='place-container'>
      <img className='place-item' src={place.firstimage} alt=''/>

      <div className='place-item'>
        <div>{place.title}</div>
        <div>{place.cat3}</div>
        {/* <div>{place.contentid}</div> */}
      </div>
      
      {/* TODO: 나중에 버튼 대신 장소 이름 클릭하면 추가되게 변경 */}
      <button type='button' className='place-item btn btn-light btn-sm'>➕</button>
    </div>
  );
};

export default PlaceItem;