import React, { useState, useRef, useEffect, state } from 'react';
import '../../styles/plandetail.css';
// import ScrollButton from 'react-scroll-button';
import { useNavigate,useLocation, useParams } from 'react-router-dom';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import Rating from '@mui/material/Rating';
import Typography from '@mui/material/Typography';
import axios from 'axios';
import { daysToWeeks, format } from 'date-fns';
import { da } from 'date-fns/locale';
import { addDays } from 'date-fns';


// 카카오맵

const { kakao } = window;

const PlanDetail = () => {

    const {num}=useParams();
    
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

    
    useEffect(() => {
        kakaomapscript();
    }, [mapx]);

    //kakomap + tourapi3
    const kakaomapscript = (d) => {
        
        const container = document.getElementById('place_map');

        const options = {
            center: new kakao.maps.LatLng(mapy,mapx),
            // center: new kakao.maps.LatLng(35.1591243474,129.1603078991),
            // new kakao.maps.LatLng(y좌표,x좌표)
            level: 2
        };
        
        const map = new kakao.maps.Map(container, options);
    
        //마커가 표시 될 위치
        let markerPosition = new kakao.maps.LatLng(mapy,mapx);

        // 마커를 생성
        let marker = new kakao.maps.Marker({position: markerPosition,});

        // 마커를 지도 위에 표시
        marker.setMap(map);
        //setPlaces(res.data.response.body.items.item);

        // axios.get(apiUrl)
        // .then((res) => {
        // console.dir(res.data.response.body.items.item);
        
        // const apidata=res.data.response.body.items.item;
        // const placex=d.mapx;  //관광지 위치(x좌표)
        // const placey=d.mapy;  //관광지 위치(y좌표)
        // const placetitle=apidata.title; //관광지명
        // const placeaddr1=apidata.addr1; //관광지 주소 
        // const placeaddr2=apidata.addr2; //관광지 상세주소
        // const placeimg=apidata.firstimage; //관광지 대표 이미지
        
                
        
        // const cat1 =apidata.cat1; //관광지 대분류
        // const cat2=apidata.cat2; //관광지 중분류
        // const cat3=apidata.cat3; //관광지 소분류

        // setCat1name(cat1);
        // setCat2name(cat2);
        // setCat3name(cat3);

        
        // console.log("placeimgurl:",placeimg);
        // console.log("placeaddr2:",placeaddr2);

        // setPlaceTitle(placetitle);
        //     if(placeaddr2===undefined){
        //         setPlaceAddr(placeaddr1);
        //     }else{
        //         setPlaceAddr(placeaddr1+placeaddr2);
        //     }
        // setPlaceImg(placeimg);

        // const options = {
        //     center: new kakao.maps.LatLng(placey,placex),
        //     //center: new kakao.maps.LatLng(35.1591243474,129.1603078991),
        //     //new kakao.maps.LatLng(y좌표,x좌표)
        //     level: 2
        // };
        
        // const map = new kakao.maps.Map(container, options);
    
        // //마커가 표시 될 위치
        // let markerPosition = new kakao.maps.LatLng(placey,placex);

        // // 마커를 생성
        // let marker = new kakao.maps.Marker({position: markerPosition,
        // });

        // // 마커를 지도 위에 표시
        // marker.setMap(map);
        // //setPlaces(res.data.response.body.items.item);
        // }).catch((err) => {
    
        // });
    };

    // axios.get(apiUrl2).then((res) => {

    //     console.log("apiUrl2",res.data.response.body.items.item);
    //     const api2data=res.data.response.body.items.item;
    //     const servicetypecodename=api2data.name;
    //     setPlaceCategory(servicetypecodename);

    // }).catch((err) => {
    
    // });



    //  데이터 가져오기
    const [ddata, setDdata] = useState('');
    const [ndata, setNdata] = useState('');
    const [pdata, setPdata] = useState('');

    // 상단 이미지 내부내용 반복문 없이 0번데이터만 데이터가져올때 입력
    const [placeName, setPlaceName] = useState('');
    const [dimage, setDimage] = useState('');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [duringDay, setDuringDay] = useState('');
    
    const SPRING_URL = process.env.REACT_APP_SPRING_URL;
    
    let detailUrl = SPRING_URL + "plan/list?num="+num;
    let dateUrl = SPRING_URL + "plan/pdate?num="+num;
    let navUrl = SPRING_URL + "plan/nav?num="+num;
    
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
    // 계획 기간 
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

    useEffect(() => {
        planGetData();
        planGetNav();
        planDate();
    },[])
    
    const trip_date = new Date(startDate);
    const tday = (trip_date.getDate());
    const tmonth = (trip_date.getMonth()+1);
    const tyear = (trip_date.getFullYear());
    console.log(addDays(trip_date, 1));

    // 클립보드에 현재 url 복사하기
    const copyUrl = () => {
        navigator.clipboard.writeText(window.location.href);

        alert("클립보드에 복사되었습니다")
    }

    const navi = useNavigate();

    
    
    
    //별점 이미지 = https://www.earthtory.com/res//img/common/web/hotel_star_?.?.png

    // const [asd, setAsd] = useState(...Array(ndata.day))

    
        const imgadd1 = `http://api.visitkorea.or.kr/openapi/service/rest/KorService/detailCommon?ServiceKey=YHbvEJEqXIWLqYGKEDkCqF7V08yazpZHKk3gWVyGKJpuhY5ZowEIwkt9i8nmTs%2F5BMBmSKWuyX349VO5JN6Tsg%3D%3D&contentId=`
        const imgadd2 = `&defaultYN=Y&mapinfoYN=Y&addrinfoYN=Y&firstImageYN=Y&catcodeYN=Y&MobileOS=ETC&MobileApp=AppTest&_type=json`
        
    return (
        <div id = 'plan-detail'>
            {/* 좌측 이동 리스트 */}
            <div className='scroll-item'>
                <div className='scroll-item-prev'></div>
                <div className='scroll-item-list' >
                    <div className={'scroll-item-btn first'}/>
                {
                            // day 만큼 반복문 돌리기
                            [...ndata] && [...ndata].map((nav, index) => (
                                
                                <div className={`scroll-item-btn`} id={'nav-list'+index}
                                 onClick={((e) => {
                                    // {e.currentTarget.hasAttribute.className!==({index}) ? e.currentTarget.classList.add('on') : e.currentTarget.classList.remove('on')}
                                    // e.currentTarget.classList('on') ? e.currentTarget.classList.remove('on') : e.currentTarget.classList.add('on')
                                    var leftList1 = e.currentTarget.previousElementSibling;
                                    var leftList2 = e.currentTarget.nextElementSibling;

                                    while(leftList1){
                                        leftList1.classList.remove('on')
                                        leftList1 = leftList1.previousSibling
                                    }
                                    while(leftList2){
                                        leftList2.classList.remove('on');
                                        leftList2 = leftList2.nextSibling
                                    }
                                    // e.currentTarget.previousElementSibling.classList.remove('on')
                                    // e.currentTarget.nextElementSibling.classList.remove('on')
                                    e.currentTarget.classList.add('on')
                                 })}><a href = {'#page-'+nav.day}>D{nav.day} Place</a></div>
                            ))
                }
                {/* <div className='scoroll-item-btn last' /> */}

                </div>
                <div className='scroll-item-next'></div>
            </div>

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
                            <span><b style={{color:'white'}}>UserName</b></span>
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
                    <div className='header-menu'>개요</div>
                    <div className='header-menu-line'></div>
                    <div className='header-menu'>일정표</div>
                    <div className='header-menu-line'></div>
                    <div className='header-menu'>지도</div>
                    <div className='header-menu-line'></div>
                    <div className='header-menu'>댓글</div>
                    <div className='header-menu-line'></div>

                    <div className='header-menu-right1'>다운로드</div>
                    <div className='header-menu-right2'
                        onClick={copyUrl}>공유하기</div>
                    <div className='clear' />
                </div>
                {/* 메뉴 리스트 */}
                <div className='wrap-list'>
                    <div className='list-left'>

                        {
                            // day 만큼 반복문 돌리기
                            [...ddata] && [...ddata].map((day, index) => (
                                
                                <div className='day-box'>
                                {/* 상단바 첫스케쥴 기준 반복 */}
                                    {day.order == 1 ? 
                                    <div className='day-box-title'>
                                        <div className='undistance' />
                                    <div className='last-box' id={'page-'+day.day}
                                        style={{
                                            position:'relative',
                                            top:'-86px'
                                        }}></div>
                                    <div className='day-num' id={'day-nav'+day.day}>
                                        Day{day.day}

                                    </div>
                                    <div className='day-date'>
                                        <div className='day-date-left'>
                                            <div className='date'>
                                            {format(addDays(trip_date, day.day-1), "yyyy-MM-dd")}
                                            </div>
                                            <div className='day-title'>
                                                {day.name}
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
                                     : ''}
                                    {/* 리스트-하단바 */}
                                    <div className='day-box-list'>
                                        <div className='day-list-num'>
                                            <div className='list-num'>{day.order}</div>
                                        </div>
                                        <div className='list-content'>
                                            <img alt='spot' src={day.firstimage} className='spot-img'/>
                                            <div className='spot-content-box'>
                                                <div className='spot-name'
                                                    onClick={() => {
                                                        navi('../../../place/placedetail', state={state:day.contentid})
                                                    }}>
                                                    {day.title}
                                                </div>
                                                <div className='spot-info'>
                                                    {/* <img alt src='https://www.earthtory.com/res//img/common/web/hotel_star_1.5.png' className='star' /> */}
                                                    <div className='sinfo-cat2'>{day.cat2_name}</div>
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
                                                {/* <div className='use-price'>
                                                    use-price
                                                </div> */}
                                                <div className='use-memo'>
                                                    {day.cat3_name}
                                                </div>
                                            </div>
                                            <div className='clear' />
                                        </div>
                                    </div>
                                    {/* 같은날짜 spot 간격 */}
                                        <div className='day-box-distance' />

                                    
                                   </div>
                                
                            ))
                        }
                        
                    </div>
                    <div className='list-right'>
                        <div className='list-right-map' id='place_map'>
                            
                        </div>
                        <div className='spot-list-box'>
                        
                            <div className="row">
                            {
                            // day 만큼 반복문 돌리기
                            [...ddata] && [...ddata].map((day, index) => (

                                <div className="col-sm-4 rlist">
                                    <div className="spot-number">{index+1}</div>
                                    <div className="spot-title"
                                    onClick={() => {
                                        setContentId(day.place_id);
                                        setMapx(day.mapx);
                                        setMapy(day.mapy);
                                        // kakaomapscript(day);
                                    }}>{day.title}</div><span>···</span>
                                </div>
                            ))
                            }
                                {/* <div className="col-sm-4 rlist">
                                    <div className="spot-number">10</div>
                                    <div className="spot-title">zz</div><span>···</span>
                                </div> */}

                            </div>
                            
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PlanDetail;