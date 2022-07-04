import React from 'react';
import '../../styles/citylist.css';

const CityItem = ({city}) => {
  return (
    <div className='city-item'>
      <div className='city-image' style={{backgroundImage:`url(../../city_image/${city.image})`}}>{city.eng_name.toUpperCase()}</div>
      <span>{city.name}, {city.country}</span>
      {/* <img src={`${}`} alt=''/>  */}
    </div>
  );
};

export default CityItem;