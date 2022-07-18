import React, { useState, useRef, useEffect, state } from 'react';
import '../../styles/plandetail.css';
// import ScrollButton from 'react-scroll-button';
import { useNavigate,useLocation, useParams } from 'react-router-dom';
import axios from 'axios';
import { daysToWeeks, format } from 'date-fns';
import { da } from 'date-fns/locale';
import { differenceInDays } from 'date-fns';
import { addDays } from 'date-fns';
import { useDispatch } from 'react-redux';
import { savePlan } from '../../modules/planner';
import Rating from '@mui/material/Rating';
import { PlanDetailMain, PlanDetailMessage, PlanDetailMap } from '.';

const PlanDetail = () => {

    const {num}=useParams();
    
//stars rating

    //mui
    const [value, setValue] = React.useState('1');
    const [starsvalue, setStarsValue] = React.useState(0);


    const handleChange = (event, newValue) => {
    
    };

    //지도api & 관광지 api 
    const [contentId, setContentId] = useState(126674); //임시 contentid 값 추후 cityInfo에서 contentid 넘겨받기
    const [mapx,setMapx]=useState('');
    const [mapy,setMapy]=useState('');
    
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
    //  let apiUrl=`http://api.visitkorea.or.kr/openapi/service/rest/KorService/detailCommon?ServiceKey=7Et3sUoEnYoi9UiGk4tJayBnDo4ZMQ%2FM%2FOkEKTJMSjXkoukxdqrTDOu3WAzTgO5QsOTQOBSKfwMMuIbl8LyblA%3D%3D&contentId=${contentId}&defaultYN=Y&mapinfoYN=Y&addrinfoYN=Y&firstImageYN=Y&catcodeYN=Y&MobileOS=ETC&MobileApp=AppTest&_type=json`;
    //  let apiUrl2=`http://api.visitkorea.or.kr/openapi/service/rest/KorService/categoryCode?ServiceKey=YHbvEJEqXIWLqYGKEDkCqF7V08yazpZHKk3gWVyGKJpuhY5ZowEIwkt9i8nmTs%2F5BMBmSKWuyX349VO5JN6Tsg%3D%3D&cat1=${cat1name}&cat2=${cat2name}&cat3=${cat3name}&MobileOS=ETC&MobileApp=AppTest&_type=json`;

    //후기 작성
    const [photo,setPhoto]=useState('');
    const [subject,setSubject]=useState('');
    const [content,setContent]=useState('');

    
    //  데이터 가져오기
    const [ddata, setDdata] = useState('');
    const [ndata, setNdata] = useState('');
    const [pdata, setPdata] = useState('');
    const [mdata, setMdata] = useState('');

    // 상단 이미지 내부내용 반복문 없이 0번데이터만 데이터가져올때 입력
    const [placeName, setPlaceName] = useState('');
    const [dimage, setDimage] = useState('');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [duringDay, setDuringDay] = useState('');
    const [userName, setUserName] = useState('');
    
    const SPRING_URL = process.env.REACT_APP_SPRING_URL;
    
    let detailUrl = SPRING_URL + "plan/list?num="+num;
    let dateUrl = SPRING_URL + "plan/pdate?num="+num;
    let navUrl = SPRING_URL + "plan/nav?num="+num;
    let nameUrl = SPRING_URL + "plan/name?num="+num;
    let mapUrl = SPRING_URL + "plan/map?num="+num;
    
    // 일정관련 전체 데이터 
    const planGetData = () => {
        axios.get(detailUrl)
        .then(res => {
            // console.log(res.data);
            setPlaceName(res.data[0].name);
            setMapx(res.data[0].mapx);
            setMapy(res.data[0].mapy);
            setDimage(res.data[0].image);
            setDdata(res.data);
        }).catch(err => {
            alert(err.data);
        })
    }
    // 여행 날짜 및 기간 
    const planDate = () => {
        axios.get(dateUrl)
        .then(res => {
            // console.log(res.data);
            setStartDate(res.data[0].start_date);
            setEndDate(res.data[0].end_date);
            setDuringDay(res.data[0].days);
            setPdata(res.data);
        }).catch(err => {
            alert(err.data);
        })
    }

    // 일자별 데이터
    const planGetNav = () => {
        axios.get(navUrl)
        .then(res => {
            setNdata(res.data);
        }).catch(err => {
            alert(err.data);
        })
    }

    const planMember = () => {
        axios.get(nameUrl)
        .then(res => {
            setUserName(res.data[0].name);
        }).catch(err => {
            alert(err.data);
        })
    }

    useEffect(() => {
        planGetData();
        planGetNav();
        planDate();
        planMember();
        console.log(mainList)
    },[])
    
    // const kakaomapscript2 = (d) => {
    //     axios.get(mapUrl)
    //     .then(res => {
    //         setMdata(res.data)
    //     }).catch(err => {
    //         alert(err.data);
    //     })

    //     var positions = [
    //         [...mdata] && [...mdata].map(map, index) (
    //             ({
    //                 title : map.day,
    //                 latLng : new kakao.maps.latLng(map.mapy, map.mapx)
    //             })
    //         )
    //     ]

    //     var imageSrc = "https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/markerStar.png";

    //     for (var i = 0; i < positions.length; i ++) {
    //         var imageSize = new kakao.maps.Size(24, 35);
    //         var markerImage = new kakao.maps.markerImage(imageSrc, imageSize);

    //         var marker = new kakao.maps.Marker({
    //             map : map,
    //             position : positions[i].latLng,
    //             title : positions[i].title,
    //             image : markerImage
    //         })
    //     }

    //     var container = document.getElementById('place_map'),
    //         option = {
    //             center : new kakao.maps.LatLng(33.450701, 126.570667),
    //             lever : 5,
    //         };

    //     var map = new kakao.maps.Map(container, option);


    // }
    
    const trip_date = new Date(startDate);
    console.log(addDays(trip_date, 1));

    // 클립보드에 현재 url 복사하기
    const copyUrl = () => {
        navigator.clipboard.writeText(window.location.href);

        alert("클립보드에 복사되었습니다")
    }
    
    
    const navi = useNavigate();
    const dispatch = useDispatch();
    
    
    // navi('../../../place/placedetail', {state:{place:day.contentid}})
    const modifyPlan = () => {
        const start = format(startDate, "yyyy-MM-dd");
        const end = format(endDate, "yyyy-MM-dd");
        const days = differenceInDays(endDate, startDate) + 1;
        const cityName = placeName;
        // console.log({start, end, days, cityNum, areaCode, sigunguCode});
        dispatch(savePlan(start, end, days, cityName));

        navi('../../../plan');
        
        // navi('../../../plan', {
        //     state:{
        //         planner:{
        //             cityName : placeName,
        //             startDate : startDate,
        //             endDate : endDate,
        //             days : duringDay

        //         }
        //     }
        // })
    }

    const [mainList, setMainList] = useState(1);

    const switchOn = (e) => {
        
            // 앞, 뒤 객체 찾기
            var leftList1 = e.currentTarget.previousElementSibling;
            var leftList2 = e.currentTarget.nextElementSibling;

            // 앞, 뒤 객체 있을 때 까지 지우기 반복
            while(leftList1){
                leftList1.classList.remove('on')
                leftList1 = leftList1.previousSibling
            }
            while(leftList2){
                leftList2.classList.remove('on');
                leftList2 = leftList2.nextSibling
            }

            // 현재 객체만 추가
            e.currentTarget.classList.add('on')
         
    }
    

    
    
    //별점 이미지 = https://www.earthtory.com/res//img/common/web/hotel_star_?.?.png

    // const [asd, setAsd] = useState(...Array(ndata.day))

    
        const imgadd1 = `http://api.visitkorea.or.kr/openapi/service/rest/KorService/detailCommon?ServiceKey=YHbvEJEqXIWLqYGKEDkCqF7V08yazpZHKk3gWVyGKJpuhY5ZowEIwkt9i8nmTs%2F5BMBmSKWuyX349VO5JN6Tsg%3D%3D&contentId=`
        const imgadd2 = `&defaultYN=Y&mapinfoYN=Y&addrinfoYN=Y&firstImageYN=Y&catcodeYN=Y&MobileOS=ETC&MobileApp=AppTest&_type=json`
        
    return (
        <div id = 'plan-detail'>
            <div className='all-top'>
            {/* 좌측 이동 리스트 */}
            {mainList == 1 ? 
            <div className='scroll-item'>
                <div className='scroll-item-prev'></div>
                <div className='scroll-item-list' >
                    <div className={'scroll-item-btn first'}/>
                {
                            // day 만큼 반복문 돌리기
                            [...ndata] && [...ndata].map((nav, index) => (
                                
                                <div className={`scroll-item-btn`} id={'nav-list'+index}
                                 onClick={switchOn}><a href = {'#page-'+nav.day}>D{nav.day} Place</a></div>
                            ))
                }
                {/* <div className='scoroll-item-btn last' /> */}

                </div>
                <div className='scroll-item-next'></div>
            </div>
            : ''}
            {/* 대표 이미지 */}
            <div className='main-image'
                style={{backgroundImage:'url(../../city_detail_image/'+dimage+')'}}>
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
                            <img alt='' src='../../DetailImage/box-user.png' />
                            <span><b style={{color:'white'}}>{userName}</b></span>
                        </div>
                        <div className='bottom-body'>
                            <h4>{placeName} 여행</h4>
                            <h6>{startDate} ~ {endDate} ({duringDay}일)</h6>
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
                    <div className='header-menu on'
                        onClick={() => {
                            setMainList(1);
                        }}>개요</div>
                    <div className='header-menu-line'></div>
                    <div className='header-menu'
                        onClick={() => {
                            setMainList(2);
                        }}>일정표</div>
                    <div className='header-menu-line'></div>
                    <div className='header-menu'
                        onClick={() => {
                            setMainList(3);
                        }}>지도</div>
                    <div className='header-menu-line'></div>
                    <div className='header-menu'
                        onClick={() => {
                            setMainList(4);
                        }}>댓글</div>
                    <div className='header-menu-line'></div>

                    <div className='header-menu-right1'
                        onClick={modifyPlan}>수정하기</div>
                    <div className='header-menu-right2'
                        onClick={copyUrl}>공유하기</div>
                    <div className='clear' />
                </div>
                {/* 메뉴 리스트 */}
                {mainList == 1 ? < PlanDetailMain /> :
                 mainList == 3 ? < PlanDetailMap /> :
                                < PlanDetailMessage /> 
                     
                }
            </div>
            </div>
        </div>
    );
};

export default PlanDetail;