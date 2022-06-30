import React, { useState, useRef, useEffect } from 'react';
import '../../styles/plandetail.css';
// import ScrollButton from 'react-scroll-button';
import { useNavigate,useLocation } from 'react-router-dom';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import Rating from '@mui/material/Rating';
import Typography from '@mui/material/Typography';
import axios from 'axios';



// 카카오맵

const { kakao } = window;

const PlanDetail = () => {

//stars rating

    //mui
    const [value, setValue] = React.useState('1');
    const [starsvalue, setStarsValue] = React.useState(0);


    const handleChange = (event, newValue) => {
    setValue(newValue);
    if(newValue==='1'){
    return kakaomapscript();
    }
    };

    //지도api & 관광지 api 
    const contentId=127419; //임시 contentid 값 추후 cityInfo에서 contentid 넘겨받기
    const [placeTitle, setPlaceTitle] = useState();
    const [placeAddr, setPlaceAddr] = useState();
    const [placeImg,setPlaceImg]= useState();
    const [review,setReview]= useState();

    const [cat1name,setCat1name] =useState();
    const [cat2name,setCat2name] = useState();
    const [cat3name,setCat3name] =useState();
    const [placeCategory, setPlaceCategory]=useState();

    console.log("let cat1:",cat1name,"let cat2:",cat2name,"let cat3:",cat3name);

    // 사진이 있는 장소만 받는 url(arrange=P)
     let apiUrl=`http://api.visitkorea.or.kr/openapi/service/rest/KorService/detailCommon?ServiceKey=YHbvEJEqXIWLqYGKEDkCqF7V08yazpZHKk3gWVyGKJpuhY5ZowEIwkt9i8nmTs%2F5BMBmSKWuyX349VO5JN6Tsg%3D%3D&contentId=${contentId}&defaultYN=Y&mapinfoYN=Y&addrinfoYN=Y&firstImageYN=Y&catcodeYN=Y&MobileOS=ETC&MobileApp=AppTest&_type=json`;
     let apiUrl2=`http://api.visitkorea.or.kr/openapi/service/rest/KorService/categoryCode?ServiceKey=YHbvEJEqXIWLqYGKEDkCqF7V08yazpZHKk3gWVyGKJpuhY5ZowEIwkt9i8nmTs%2F5BMBmSKWuyX349VO5JN6Tsg%3D%3D&cat1=${cat1name}&cat2=${cat2name}&cat3=${cat3name}&MobileOS=ETC&MobileApp=AppTest&_type=json`;

    //후기 작성
    const [photo,setPhoto]=useState('');
    const [subject,setSubject]=useState('');
    const [content,setContent]=useState('');

    
    useEffect(() => {
        kakaomapscript();
    });

    //kakomap + tourapi3
    const kakaomapscript = () => {
        
        const container = document.getElementById('place_map');

        axios.get(apiUrl)
        .then((res) => {
        console.dir(res.data.response.body.items.item);

        const apidata=res.data.response.body.items.item;
        const placex=apidata.mapx;  //관광지 위치(x좌표)
        const placey=apidata.mapy;  //관광지 위치(y좌표)
        const placetitle=apidata.title; //관광지명
        const placeaddr1=apidata.addr1; //관광지 주소 
        const placeaddr2=apidata.addr2; //관광지 상세주소
        const placeimg=apidata.firstimage; //관광지 대표 이미지
        
        const cat1 =apidata.cat1; //관광지 대분류
        const cat2=apidata.cat2; //관광지 중분류
        const cat3=apidata.cat3; //관광지 소분류

        setCat1name(cat1);
        setCat2name(cat2);
        setCat3name(cat3);

        
        // console.log("placeimgurl:",placeimg);
        //console.log("placeaddr2:",placeaddr2);

        setPlaceTitle(placetitle);
            if(placeaddr2===undefined){
                setPlaceAddr(placeaddr1);
            }else{
                setPlaceAddr(placeaddr1+placeaddr2);
            }
        setPlaceImg(placeimg);

        const options = {
            center: new kakao.maps.LatLng(placey,placex),
            //center: new kakao.maps.LatLng(35.1591243474,129.1603078991),
            //new kakao.maps.LatLng(y좌표,x좌표)
            level: 2
        };
        
        const map = new kakao.maps.Map(container, options);
    
        //마커가 표시 될 위치
        let markerPosition = new kakao.maps.LatLng(placey,placex);

        // 마커를 생성
        let marker = new kakao.maps.Marker({position: markerPosition,
        });

        // 마커를 지도 위에 표시
        marker.setMap(map);
        //setPlaces(res.data.response.body.items.item);
        }).catch((err) => {
    
        });
    };

    axios.get(apiUrl2).then((res) => {

        console.log("apiUrl2",res.data.response.body.items.item);
        const api2data=res.data.response.body.items.item;
        const servicetypecodename=api2data.name;
        setPlaceCategory(servicetypecodename);

    }).catch((err) => {
    
    });



    
    
    
    

    // const ScrollComponent = () => {
    //     return (
    //         <ScrollButton
    //             behavior = "smooth"
    //             buttonBackgroundColor = "red"
    //             style = {{fontSize: '24px'}}
    //         />
    //     );
    // };
    
    //별점 이미지 = https://www.earthtory.com/res//img/common/web/hotel_star_?.?.png

    const btnChange = (e) => {
        
    }
    
    return (
        <div id = 'plan-detail'>
            {/* 좌측 이동 리스트 */}
            <div className='scroll-item'>
                <div className='scroll-item-prev'></div>
                <div className='scroll-item-list'>
                    <div className='scroll-item-btn on'><a href='#page-1'>D1 Place</a></div>
                    <div className='scroll-item-btn'><a href='#page-2'>D2 Place</a></div>
                    <div className='scroll-item-btn'><a href='#page-3'>D3 Place</a></div>
                    <div className='scroll-item-btn'><a href='#page-4'>D4 Place</a></div>
                    <div className='scroll-item-btn last'><a href='#page-5'>D5 Place</a></div>
                </div>
                <div className='scroll-item-next'></div>
            </div>

            {/* 대표 이미지 */}
            <div className='main-image'
                style={{backgroundImage:'url(../DetailImage/main-sample.jpg)'}}>
                <div className='top-box'>
                    <div className='like-btn'>
                        <div className='ico'></div>
                        {/* <img alt='' src='../DetailImage/heart-logo.png' /> */}
                    </div>
                    <div className='clear' />
                </div>
                <div className='cover-bottom'>
                    <div className='bottom-box'>
                        <div className='bottom-head'>
                            <img alt='' src='../DetailImage/box-user.png' />
                            <span><b style={{color:'white'}}>UserName</b></span>
                        </div>
                        <div className='bottom-body'>
                            <h4>Place</h4>
                            <h6>StartDay ~ EndDay (x일) <b>with</b></h6>
                            <div className='bottom-bottom-box'>
                                <div className='bottom-count'>
                                    place, view, scrap count
                                </div>
                                <div className='bottom-price'>
                                    <select>
                                        <option>뭐로</option>
                                        <option>할까</option>
                                    </select>

                                    <span className='bottom-number'>
                                        00,000,000
                                    </span>
                                    <div className='clear' />
                                </div>
                            </div>
                        </div>
                        <div className='clear' />
                    </div>
                </div>
            </div>
            {/* 메뉴창 */}
            <div className='main-list'>
                {/* 상단 메뉴바 */}
                <div className='list-header'>
                    <div className='header-menu on'>개요</div>
                    <div className='header-menu-line'></div>
                    <div className='header-menu'>일정표</div>
                    <div className='header-menu-line'></div>
                    <div className='header-menu'>지도</div>
                    <div className='header-menu-line'></div>
                    <div className='header-menu'>댓글</div>
                    <div className='header-menu-line'></div>

                    <div className='header-menu-right1'>다운로드</div>
                    <div className='header-menu-right2'>복사하기</div>
                    <div className='clear' />
                </div>
                {/* 메뉴 리스트 */}
                <div className='wrap-list'>
                    <div className='list-left'>

                        {/* 날짜별 */}
                        <div className='day-box'>
                            {/* 리스트-상단바 */}
                            <div className='day-box-title'>
                                <div id='page-1'
                                    style={{
                                        position:'relative',
                                        top:'-100px'
                                    }}></div>
                                <div className='day-num'>
                                    Day01
                                </div>
                                <div className='day-date'>
                                    <div className='day-date-left'>
                                        <div className='date'>
                                            Start date
                                        </div>
                                        <div className='day-title'>
                                            {placeAddr}
                                        </div>
                                        <div className='clear' />
                                    </div>
                                    <div className='day-date-right'>
                                        Used price?
                                        <div className='clear' />
                                    </div>
                                </div>
                                <div className='clear'></div>
                            </div>
                            {/* 리스트-하단바 */}
                            <div className='day-box-list'>
                                <div className='day-list-num'>
                                    <div className='list-num'>1</div>
                                </div>
                                <div className='list-content'>
                                    <img alt='spot' src={placeImg} className='spot-img'/>
                                    <div className='spot-content-box'>
                                        <div className='spot-name'>
                                            {placeTitle}
                                        </div>
                                        <div className='spot-info'>
                                            <img alt src='https://www.earthtory.com/res//img/common/web/hotel_star_1.5.png' className='star' />
                                            <div className='sinfo-line' />
                                            <div className='sinfo-txt'>commit text</div>
                                            <div className='clear' />
                                        </div>
                                    </div>
                                    <div className='spot-btn-box'>
                                        <img alt src='https://www.earthtory.com/res/img/mypage/plan/sub/map_ico.png' className='spot-btn map_view' />
                                        <img alt src='https://www.earthtory.com/res/img/mypage/plan/sub/info_ico.png' className='spot-btn spot-info-btn' />
                                        <div className='clear' />
                                    </div>
                                    <div className='clear' />
                                </div>
                                <div className='clear' />
                                <div className='list-add-content'>
                                    <div className='list-use-price'>
                                        <div className='use-price'>
                                            use-price
                                        </div>
                                        <div className='use-memo'>
                                            {placeCategory}
                                        </div>
                                    </div>
                                    <div className='clear' />
                                </div>
                            </div>
                        </div>

                        {/* 날짜별 */}
                        <div className='day-box'>
                            {/* 리스트-상단바 */}
                            <div className='day-box-title'>
                            <div id='page-2'
                                    style={{
                                        position:'relative',
                                        top:'-100px'
                                    }}></div>
                                <div className='day-num'>
                                    Day02
                                </div>
                                <div className='day-date'>
                                    <div className='day-date-left'>
                                        <div className='date'>
                                            Start date
                                        </div>
                                        <div className='day-title'>
                                            Place
                                        </div>
                                        <div className='clear' />
                                    </div>
                                    <div className='day-date-right'>
                                        Used price?
                                        <div className='clear' />
                                    </div>
                                </div>
                                <div className='clear'></div>
                            </div>
                            
                            {/* 리스트-하단바 */}
                            <div className='day-box-list'>
                                <div className='day-list-num'>
                                    <div className='list-num'>1</div>
                                </div>
                                <div className='list-content'>
                                    <img alt='spot' src='' className='spot-img'/>
                                    <div className='spot-content-box'>
                                        <div className='spot-name'>
                                            Spot-name
                                        </div>
                                        <div className='spot-info'>
                                            <img alt src='https://www.earthtory.com/res//img/common/web/hotel_star_1.5.png' className='star' />
                                            <div className='sinfo-line' />
                                            <div className='sinfo-txt'>commit text</div>
                                            <div className='clear' />
                                        </div>
                                    </div>
                                    <div className='spot-btn-box'>
                                        <img alt src='https://www.earthtory.com/res/img/mypage/plan/sub/map_ico.png' className='spot-btn map_view' />
                                        <img alt src='https://www.earthtory.com/res/img/mypage/plan/sub/info_ico.png' className='spot-btn spot-info-btn' />
                                        <div className='clear' />
                                    </div>
                                    <div className='clear' />
                                </div>
                                <div className='clear' />
                                <div className='list-add-content'>
                                    <div className='list-use-price'>
                                        <div className='use-price'>
                                            use-price
                                        </div>
                                        <div className='use-memo'>
                                            write or not
                                        </div>
                                    </div>
                                    <div className='clear' />
                                </div>
                            </div>
                            {/* 같은날짜 spot 간격 */}
                            <div className='day-box-distance'>

                            </div>

                            {/* 리스트-하단바 */}
                            <div className='day-box-list'>
                                <div className='day-list-num'>
                                    <div className='list-num'>2</div>
                                </div>
                                <div className='list-content'>
                                    <img alt='spot' src='' className='spot-img'/>
                                    <div className='spot-content-box'>
                                        <div className='spot-name'>
                                            Spot-name
                                        </div>
                                        <div className='spot-info'>
                                            <img alt src='https://www.earthtory.com/res//img/common/web/hotel_star_1.5.png' className='star' />
                                            <div className='sinfo-line' />
                                            <div className='sinfo-txt'>commit text</div>
                                            <div className='clear' />
                                        </div>
                                    </div>
                                    <div className='spot-btn-box'>
                                        <img alt src='https://www.earthtory.com/res/img/mypage/plan/sub/map_ico.png' className='spot-btn map_view' />
                                        <img alt src='https://www.earthtory.com/res/img/mypage/plan/sub/info_ico.png' className='spot-btn spot-info-btn' />
                                        <div className='clear' />
                                    </div>
                                    <div className='clear' />
                                </div>
                                <div className='clear' />
                                <div className='list-add-content'>
                                    <div className='list-use-price'>
                                        <div className='use-price'>
                                            use-price
                                        </div>
                                        <div className='use-memo'>
                                            {placeCategory}
                                        </div>
                                    </div>
                                    <div className='clear' />
                                </div>
                            </div>
                            
                        </div>
                    </div>
                    <div className='list-right'>
                        <div className='list-right-map' id='place_map'>
                            
                        </div>
                        <div className='spot-list-box'>
                        
                            <div className="row">
                                <div className="col-sm-4 rlist">
                                    <div className="spot-number">1</div>
                                    <div className="spot-title">spot-title</div>
                                </div>
                                <div className="col-sm-4 rlist">
                                    <div className="spot-number">2</div>
                                    <div className="spot-title">spot-title</div>
                                </div>
                                <div className="col-sm-4 rlist">
                                    <div className="spot-number">3</div>
                                    <div className="spot-title">spot-title</div>
                                </div>
                                <div className="col-sm-4 rlist">
                                    <div className="spot-number">4</div>
                                    <div className="spot-title">spot-title</div>
                                </div>
                                <div className="col-sm-4 rlist">
                                    <div className="spot-number">5</div>
                                    <div className="spot-title">spot-title</div>
                                </div>
                                <div className="col-sm-4 rlist">
                                    <div className="spot-number">6</div>
                                    <div className="spot-title">spot-title</div>
                                </div>
                                <div className="col-sm-4 rlist">
                                    <div className="spot-number">7</div>
                                    <div className="spot-title">spot-title</div>
                                </div>
                                <div className="col-sm-4 rlist">
                                    <div className="spot-number">8</div>
                                    <div className="spot-title">spot-title</div>
                                </div>
                                <div className="col-sm-4 rlist">
                                    <div className="spot-number">9</div>
                                    <div className="spot-title">spot-title</div>
                                </div>
                            </div>
                            
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PlanDetail;