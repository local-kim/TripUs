import React, {Component, useEffect, useState} from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import '../App.css';
import './Myslide2.css'
import axios from 'axios';


import { Navigation, Pagination, Scrollbar, A11y } from 'swiper';


import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';

const Myslide=() => {


        let cityDataUrl = process.env.REACT_APP_SPRING_URL + "cityData/";
    
        const [citydata,setCityData] = useState('');
    
        const cityData=()=>{
            axios.get(cityDataUrl)
            .then(res=>{
                setCityData(res.data);
                console.log(res.data);      
            })
            .catch(err => {
                alert(err);
            })
          }

          useEffect(()=>{
            cityData();
        },[]);


  return (
    <Swiper
      // install Swiper modules
      modules={[Navigation, Pagination, Scrollbar, A11y]}
      spaceBetween={50}
      slidesPerView={4}
      navigation
      pagination={{ clickable: true }}
      
      onSwiper={(swiper) => console.log(swiper)}
      onSlideChange={() => console.log('slide change')} >


    {citydata && citydata.map((row, index)=>(
       <SwiperSlide>

        <div className="card city-card-style hoverable z-depth-2" style={{margin:'0'}}>
            <div className="card-image imgbox">
                <img src={`../city_image/${row.image}`} alt="city" loading="lazy"/>
            </div>
                <div clasName="city-card-contents-div">
                    <li className="city-card-contents-title">
                        <div className="citynamefont" style={{textAlign:'center'}}>
                            <b> {row.eng_name}</b><br/>
                            <h6 className="city-card-contents-subtitle"> {row.name}</h6>
                        </div>
                    </li>
                </div>
            </div>
                    
        
        </SwiperSlide>
       ))}
    </Swiper>
  );
};

export default Myslide;
