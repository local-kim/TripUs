import { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import '../App.css';
import axios from 'axios';


import { Navigation, Pagination, Scrollbar, A11y } from 'swiper';


import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';

const Myslide=() => {

    let cityDataUrl = process.env.REACT_APP_SPRING_URL + "/cityData";

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

  return (
    <Swiper
      // install Swiper modules
      modules={[Navigation, Pagination, Scrollbar, A11y]}
      spaceBetween={50}
      slidesPerView={3}
      navigation
      pagination={{ clickable: true }}
      
    //   onSwiper={(swiper) => console.log(swiper)}
    //   onSlideChange={() => console.log('slide change')} 
    >


       <SwiperSlide>

      <div className="plan_list" style={{width:'1150px'}}> 
                     

              
                           

                            <a href="/mypage/et_1506250714200238856001435227260?type=plan_sub&amp;gdb_srl=54114" target="_blank" className="box">
                            <div className="plan_bg">
                                <div className="plan_bg_inner">
                                    <span>2015-07-29</span>
                                    <span className="tour_day">5DAYS</span>
                                    <br/>제주!!!</div>
                                </div>
                                
                                <div className="plan_img_box">	
                                    <img src="https://img.earthtory.com/img/city_images/243/singapore_1425521362.jpg" alt="" className="plan_img"/>
                                </div>
                                
                                <div className="plan_bg_inner2">
                                    <span>친구와 함께</span>
                                    <div className="fr pn_list_copy_icon">0</div>
                                    <div className="fr pn_list_view_icon">148</div>
                                    <div className="fr pn_list_spot_icon">30</div>
                                    <div className="clear"></div>
                                    <div className="pn_list_city">제주</div>
                                    <div className="clear"></div>
                                    <div className="pn_list_user">윤지은</div>
                                </div>
                            </a>
                     
                                            
                                <div className='clear'></div>
                            
                        
                        </div>
      </SwiperSlide>

      <SwiperSlide>

      <div className="plan_list" style={{width:'1150px'}}> 
               

                            <a href="/mypage/et_1506250714200238856001435227260?type=plan_sub&amp;gdb_srl=54114" target="_blank" className="box">
                            <div className="plan_bg">
                                <div className="plan_bg_inner">
                                    <span>2015-07-29</span>
                                    <span className="tour_day">5DAYS</span>
                                    <br/>제주!!!</div>
                                </div>
                                
                                <div className="plan_img_box">	
                                    <img src="https://img.earthtory.com/img/city_images/243/singapore_1425521362.jpg" alt="" className="plan_img"/>
                                </div>
                                
                                <div className="plan_bg_inner2">
                                    <span>친구와 함께</span>
                                    <div className="fr pn_list_copy_icon">0</div>
                                    <div className="fr pn_list_view_icon">148</div>
                                    <div className="fr pn_list_spot_icon">30</div>
                                    <div className="clear"></div>
                                    <div className="pn_list_city">제주</div>
                                    <div className="clear"></div>
                                    <div className="pn_list_user">윤지은</div>
                                </div>
                            </a>
                           

                     
                                            
                                <div className='clear'></div>
                            
                        
                        </div>

        
      </SwiperSlide>
      
      <SwiperSlide>

            <div className="plan_list" style={{width:'1150px'}}> 
    

                            <a href="/mypage/et_1506250714200238856001435227260?type=plan_sub&amp;gdb_srl=54114" target="_blank" className="box">
                            <div className="plan_bg">
                                <div className="plan_bg_inner">
                                    <span>2015-07-29</span>
                                    <span className="tour_day">5DAYS</span>
                                    <br/>제주!!!</div>
                                </div>
                                
                                <div className="plan_img_box">	
                                    <img src="https://img.earthtory.com/img/city_images/243/singapore_1425521362.jpg" alt="" className="plan_img"/>
                                </div>
                                
                                <div className="plan_bg_inner2">
                                    <span>친구와 함께</span>
                                    <div className="fr pn_list_copy_icon">0</div>
                                    <div className="fr pn_list_view_icon">148</div>
                                    <div className="fr pn_list_spot_icon">30</div>
                                    <div className="clear"></div>
                                    <div className="pn_list_city">제주</div>
                                    <div className="clear"></div>
                                    <div className="pn_list_user">윤지은</div>
                                </div>
                            </a>
                     
                                            
                                <div className='clear'></div>
                            
                        
                        </div>
      </SwiperSlide>
      <SwiperSlide>

      <div className="plan_list" style={{width:'1150px'}}> 
    

    <a href="/mypage/et_1506250714200238856001435227260?type=plan_sub&amp;gdb_srl=54114" target="_blank" className="box">
    <div className="plan_bg">
        <div className="plan_bg_inner">
            <span>2015-07-29</span>
            <span className="tour_day">5DAYS</span>
            <br/>제주!!!</div>
        </div>
        
        <div className="plan_img_box">	
            <img src="https://img.earthtory.com/img/city_images/243/singapore_1425521362.jpg" alt="" className="plan_img"/>
        </div>
        
        <div className="plan_bg_inner2">
            <span>친구와 함께</span>
            <div className="fr pn_list_copy_icon">0</div>
            <div className="fr pn_list_view_icon">148</div>
            <div className="fr pn_list_spot_icon">30</div>
            <div className="clear"></div>
            <div className="pn_list_city">제주</div>
            <div className="clear"></div>
            <div className="pn_list_user">윤지은</div>
        </div>
    </a>

                    
        <div className='clear'></div>
    

</div>
      </SwiperSlide>

      <SwiperSlide>
      <div className="plan_list" style={{width:'1150px'}}> 
    

    <a href="/mypage/et_1506250714200238856001435227260?type=plan_sub&amp;gdb_srl=54114" target="_blank" className="box">
    <div className="plan_bg">
        <div className="plan_bg_inner">
            <span>2015-07-29</span>
            <span className="tour_day">5DAYS</span>
            <br/>제주!!!</div>
        </div>
        
        <div className="plan_img_box">	
            <img src="https://img.earthtory.com/img/city_images/243/singapore_1425521362.jpg" alt="" className="plan_img"/>
        </div>
        
        <div className="plan_bg_inner2">
            <span>친구와 함께</span>
            <div className="fr pn_list_copy_icon">0</div>
            <div className="fr pn_list_view_icon">148</div>
            <div className="fr pn_list_spot_icon">30</div>
            <div className="clear"></div>
            <div className="pn_list_city">제주</div>
            <div className="clear"></div>
            <div className="pn_list_user">윤지은</div>
        </div>
    </a>

                    
        <div className='clear'></div>
    

</div>
      </SwiperSlide>



    </Swiper>
  );
};

export default Myslide;
