import React from 'react';
import { Link } from 'react-router-dom';
import '../../styles/citylist.css';

const CityItem = ({city}) => {
  return (
    <div className='city-item'>
      <Link to={`/city/${city.num}`}>
        <div className='city-image' style={{backgroundImage:`url(../../city_image/${city.image})`}}>{city.eng_name.toUpperCase()}</div>
      </Link>
      <div className='city-name'>{city.name}, {city.country}</div>
      {/* <img src={`${}`} alt=''/>  */}
    </div>
  );
};

export default CityItem;