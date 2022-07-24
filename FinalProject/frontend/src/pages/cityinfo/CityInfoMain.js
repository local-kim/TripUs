import React, {useCallback, useEffect, useState} from 'react';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Button, CardActionArea, CardActions, TextField } from '@mui/material';
import axios from "axios";
import '../../styles/cityinfo.css';
import { Link, useNavigate, useParams } from 'react-router-dom';
import CityInfoImage from './CityInfoImage';
import CityInfoMore from './CityInfoMore';
import { add, addDays, differenceInDays, format, subYears } from 'date-fns';
import { useInView } from "react-intersection-observer"
import { PlaceItem } from '../plan';
import { height } from '@mui/system';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import ko from 'date-fns/locale/ko';
import { event } from 'jquery';

const CityInfoMain = () => {
    // 회원넘버, 로그인중?
    const loginNum = useSelector(state => state.auth.user.num);
    const isLoggedIn = useSelector(state => state.auth.isLoggedIn); //로그인여부 체크

    //관광명소 api contentId 받아오기
    const [pcontentId,setPcontentId]=useState(126078); //2360786

    // redux에서 state 얻기
    // const dispatch = useDispatch(); 

    const naVi=useNavigate();

    // MUi 메뉴 탭
    const [value, setValue] = useState('1');
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    // Mui 스타일 변수
    const muiStyle={
        margin:"0 auto",
        width:"1092px",
        typography:"body1"
    }

    // 날씨 데이타 db받는 변수
    const [cityData,setCityData]=useState([]);
    let PlaceUrl;
    const {num}=useParams();   
    const city_num = num;
    
    // 일정 url에 필요한 변수들   
    const [img,setImg]=useState([]);
    const [start_date,setStart_date]=useState(format(new Date(), "yyyy-MM-dd"));    // 기본 타입변경 필수!
    const [end_date,setEnd_date]=useState(format(new Date(), "yyyy-MM-dd"));        // 기본 타입변경 필수!
    const [days,setDays]=useState('365');
    
    // 작년 날짜로 수정
    const slastYear = format(subYears(new Date(start_date), 1), "yyyyMMdd");        // 페이지 로딩후 이걸로 교체
    const elastYear = format(subYears(new Date(end_date), 1), "yyyyMMdd");          // 페이지 로딩후 이걸로 교체

    // 좋아요
    const [like_btn, setLike_btn] = useState(false)
    const [checked, setChecked] = useState(false);
    // const [db_contentid,setDb_contentid] = useState('');
    // const [con_id, setCon_id] = useState(126078);
    const [l_T_placeid,setL_T_placeid] = useState('');
    const [like_list,setLike_list] = useState([]);
    
    // 지역 데이타 변수 
    const [areaCode,setAreaCode]=useState('6');
    const [sigunguCode,setSigunguCode]=useState('');
    const [cityname,setCityname]=useState('');
    const [keyWord,setKeyWord]=useState('부산');  // 검색 input 관광지 contentid 담는 변수
    const [page,setPage]=useState(1);   // 관광지 목록 데이타 페이지
    
    const [categoryPlace0,setCategoryPlace0]=useState([]);  // 전체보기
    const [categoryPlace1,setCategoryPlace1]=useState([]);  // 12 명소
    const [categoryPlace2,setCategoryPlace2]=useState([]);  // 39 음식점
    const [categoryPlace3,setCategoryPlace3]=useState([]);  // 38 쇼핑
    const [categoryPlace4,setCategoryPlace4]=useState([]);  // 15 행사/공연/축제
    const [categoryPlace5,setCategoryPlace5]=useState([]);  // 25 여행코스
    const [categoryPlace6,setCategoryPlace6]=useState([]);  // 28 레포츠
    const [categoryPlace7,setCategoryPlace7]=useState([]);  // 32 숙박  
    const [places, setPlaces] = useState([]);
    // const [keyWordPlace,setKeyWordPlace]=useState('');
    

    // API
    // 날씨 
    const API_KEY="hG2QkKkmuiN38w%2BeGu53VbRK%2BBNzKRpnjbLE%2BHDXZ0dHzgbBQ67K67NsuR5xOAs%2BErSqbSpOpk1UKBnj4dvlnA%3D%3D";       // 내꺼
    // const API_KEY="YHbvEJEqXIWLqYGKEDkCqF7V08yazpZHKk3gWVyGKJpuhY5ZowEIwkt9i8nmTs%2F5BMBmSKWuyX349VO5JN6Tsg%3D%3D";  // 현지씌꺼
    // const API_KEY="sRb6GSV%2FXAgOAdS%2FpBID9d0lsR8QfJ78C4bJYMZCu2MItPGIbX8JvFumAqXoFD61AoXODAxJdlrUaDwDavWlsg%3D%3D";  // 시연씌꺼
    // const API_KEY="7Et3sUoEnYoi9UiGk4tJayBnDo4ZMQ%2FM%2FOkEKTJMSjXkoukxdqrTDOu3WAzTgO5QsOTQOBSKfwMMuIbl8LyblA%3D%3D";  // 웅쓰꺼
    
    // // 일정 계획 데이타
    const [cityPlan,setCityPlan]=useState([]);
    const [cityPlan2,setCityPlan2]=useState([]);

    // 날씨 데이타 변수
    const [stnId,setStnId]=useState('');         // 지역번호
    const [stnNm,setStnNm]=useState('');         // 지역명
    const [maxTa,setMaxTa]=useState('');         // 최고기온
    const [minTa,setMinTa]=useState('');         // 최저기온
    const [iscs,setIscs]=useState('');           // 일기현상
    const [sumRn,setSumRn]=useState('');         // 일 강수량
    const [avgWs,setAvgWs]=useState('');            // 평균 풍속
    const [avgRhm,setAvgRhm]=useState('');          // 평균 습도 %
    const [ddMes,setDdMes]=useState('');            // 일 적설량
    

    
    
    const [w_data,setW_data]=useState([]);  // 날씨 데이터 담는 배열 변수
    // const [weatherImg,setWeatherImg]=useState([]);

    
    // URL
    // db city테이블 가져오는 거
    PlaceUrl=process.env.REACT_APP_SPRING_URL+"city/citydata?num="+num;
    
    // 날씨 api 받아오는 거   
    let weather_url=`https://apis.data.go.kr/1360000/AsosDalyInfoService/getWthrDataList?serviceKey=${API_KEY}&numOfRows=${days}&dataType=JSON&dataCd=ASOS&dateCd=DAY&startDt=${slastYear}&endDt=${elastYear}&stnIds=${num}`;
    // let weather_url=`https://apis.data.go.kr/1360000/AsosDalyInfoService/getWthrDataList?serviceKey=${API_KEY}&numOfRows=20&dataType=JSON&dataCd=ASOS&dateCd=DAY&startDt=20210101&endDt=20210501&stnIds=108`;
    let areaUrl = `http://api.visitkorea.or.kr/openapi/service/rest/KorService/areaBasedList?ServiceKey=${API_KEY}&areaCode=${areaCode}&numOfRows=2&arrange=R&MobileOS=ETC&MobileApp=AppTest&_type=json`;
    if(sigunguCode){  // 시군구 코드가 있는 도시이면
        areaUrl += `&sigunguCode=${sigunguCode}`;
     }
     // contenttypeid 포함
    let area_content_type_12_url = `http://api.visitkorea.or.kr/openapi/service/rest/KorService/areaBasedList?ServiceKey=${API_KEY}&areaCode=${areaCode}&numOfRows=2&arrange=R&contentTypeId=12&MobileOS=ETC&MobileApp=AppTest&_type=json`;
    if(sigunguCode){  // 시군구 코드가 있는 도시이면
        area_content_type_12_url += `&sigunguCode=${sigunguCode}`;
     }

    let area_content_type_39_url = `http://api.visitkorea.or.kr/openapi/service/rest/KorService/areaBasedList?ServiceKey=${API_KEY}&areaCode=${areaCode}&numOfRows=2&arrange=R&contentTypeId=39&MobileOS=ETC&MobileApp=AppTest&_type=json`;
    if(sigunguCode){  // 시군구 코드가 있는 도시이면
        area_content_type_39_url += `&sigunguCode=${sigunguCode}`;
     }

     let area_content_type_38_url = `http://api.visitkorea.or.kr/openapi/service/rest/KorService/areaBasedList?ServiceKey=${API_KEY}&areaCode=${areaCode}&numOfRows=2&arrange=R&contentTypeId=38&MobileOS=ETC&MobileApp=AppTest&_type=json`;
    if(sigunguCode){  // 시군구 코드가 있는 도시이면
        area_content_type_38_url += `&sigunguCode=${sigunguCode}`;
     }

     let area_content_type_14_url = `http://api.visitkorea.or.kr/openapi/service/rest/KorService/areaBasedList?ServiceKey=${API_KEY}&areaCode=${areaCode}&numOfRows=2&arrange=R&contentTypeId=14&MobileOS=ETC&MobileApp=AppTest&_type=json`;
     if(sigunguCode){  // 시군구 코드가 있는 도시이면
        area_content_type_14_url += `&sigunguCode=${sigunguCode}`;
     }

     let area_content_type_28_url = `http://api.visitkorea.or.kr/openapi/service/rest/KorService/areaBasedList?ServiceKey=${API_KEY}&areaCode=${areaCode}&numOfRows=2&arrange=R&contentTypeId=28&MobileOS=ETC&MobileApp=AppTest&_type=json`;
     if(sigunguCode){  // 시군구 코드가 있는 도시이면
        area_content_type_28_url += `&sigunguCode=${sigunguCode}`;
     }

     let area_content_type_15_url = `http://api.visitkorea.or.kr/openapi/service/rest/KorService/areaBasedList?ServiceKey=${API_KEY}&areaCode=${areaCode}&numOfRows=2&arrange=R&contentTypeId=15&MobileOS=ETC&MobileApp=AppTest&_type=json`;
    if(sigunguCode){  // 시군구 코드가 있는 도시이면
        area_content_type_15_url += `&sigunguCode=${sigunguCode}`;
    }
    // 일정
    let trip_url=`${process.env.REACT_APP_SPRING_URL}city/tripdata?city_num=${city_num}&loginNum=${loginNum}`;     
    // 좋아요
    let like_url=process.env.REACT_APP_SPRING_URL+"city/like?place_id="+pcontentId+"&loginNum="+loginNum;        
    let insert_like_url=process.env.REACT_APP_SPRING_URL+"city/insertlike";
    let delete_like_url=process.env.REACT_APP_SPRING_URL+"city/deletelike?place_id="+pcontentId+"&loginNum="+loginNum;
    let like_table_url=process.env.REACT_APP_SPRING_URL+"city/liketable?loginNum="+loginNum;
    // let like_table_url=process.env.REACT_APP_SPRING_URL+"city/liketable?&place_id="+l_T_placeid+"loginNum="+loginNum;
    // 키워드 검색 url
    let keyWord_url = `http://api.visitkorea.or.kr/openapi/service/rest/KorService/searchKeyword?ServiceKey=${API_KEY}&keyword=${keyWord}&areaCode=${areaCode}&numOfRows=2&arrange=B&MobileOS=ETC&MobileApp=AppTest&_type=json`;
    if(sigunguCode){  // 시군구 코드가 있는 도시이면
    keyWord_url += `&sigunguCode=${sigunguCode}`;
    }

    

    
    useEffect(() => {
        place_area_Data();
        trip_weather_Data();
        // myLike();
        like_table();
    }, []);
    const place_area_Data = () => {
        // console.log(areaUrl)
        // console.log("axios.place_area_Data");
        axios.get(PlaceUrl)
        .then(response => {
            setCityData(response);
            setAreaCode(response.data.area_code);
            setSigunguCode(response.data.sigungu_code);
            setCityname(response.data.name);
        })
        .then(() => {
            axios.get(areaUrl)
            .then((res1) => {
                setPlaces(res1.data.response.body.items.item);
                setCategoryPlace0(res1.data.response.body.items.item);
            })
            axios.get(area_content_type_12_url)
            .then((res2) => {
                setCategoryPlace1(res2.data.response.body.items.item);
            })
            axios.get(area_content_type_39_url)
            .then((res3) => {
                setCategoryPlace2(res3.data.response.body.items.item);
            })
            axios.get(area_content_type_38_url)
            .then((res4) => {
                setCategoryPlace3(res4.data.response.body.items.item);
            })
            axios.get(area_content_type_14_url)
            .then((res5) => {
                setCategoryPlace4(res5.data.response.body.items.item);
            })
            axios.get(area_content_type_28_url)
            .then((res6) => {
                setCategoryPlace5(res6.data.response.body.items.item);
            })
            axios.get(area_content_type_15_url)
            .then((res7) => {
                setCategoryPlace6(res7.data.response.body.items.item);
            })
        })
        .catch(err => console.log(err))
    }
    const trip_weather_Data = () => {
        // console.log("trip_weather_Data");
        axios.get(trip_url)
        .then((res8) => {
            setCityPlan(res8.data);
            setCityPlan2(res8.data[0]);
            setStart_date([res8.data[0].start_date]);  // 잘 들어가짐
            setEnd_date([res8.data[0].end_date]);  // 잘 들어가짐
            setDays([res8.data[0].days]);  // 잘 들어가짐
        })
        .then(()=>{
            axios.get(weather_url)
            .then((res9) => {
                setW_data(res9.data.response.body.items.item);
                // setWeatherImg(res9.data.response.body.items.item);
            })
        })
    }

    // 날씨 API 데이터
    useEffect(()=>{
        // console.log("weather_url");
        delete axios.defaults.headers.common['Authorization'];
        axios.get(weather_url)
        .then(res=>{
            setW_data(res.data.response.body.items.item);
        })
    },[start_date,end_date])

    // // 내 좋아요 현황
    // useEffect(() => {
    //     myLike();
    // },[])
    // const myLike=()=>{
    //     if(!isLoggedIn){
    //         return;
    //     }
    //     axios.get(like_url).then(res=>{
    //         console.log(res.data)
    //         if(res.data==null||res.data == 0){
    //             // setLike_btn(res.data);
    //             setChecked(false);
    //         }else{
    //             setLike_btn(res.data);
    //             setChecked(true);
    //         }
    //     }).catch(err => {
    //         alert(err);
    //     })
    // }
    // 좋아요 ON
    const insert_btn = (e, contentid) => {
        if (!isLoggedIn) {
            alert("로그인 후 이용해주세요")
        }
            axios.post(insert_like_url,{place_id:String(contentid),loginNum,check:Number(checked)})
            .then(res=>{
                alert("좋아요 true:",res.data);
                // setLike_btn(true);
                like_table();
            })
    }
    // 좋아요 OFF
    const delete_btn = (e, contentid) => {
            axios.delete(process.env.REACT_APP_SPRING_URL+"city/deletelike?place_id="+contentid+"&loginNum="+loginNum,{place_id:String(contentid), loginNum : loginNum})
            .then(res=>{
                console.log("delete_like_url : "+ delete_like_url)
                alert("좋아요 false");
                like_table();
                // setLike_btn(false);
            })
    }

    // const on_off_btn = () => {
    //     if (!isLoggedIn) {
    //         alert("로그인 후 이용해주세요")
    //     } else {
    //         if ()
    //     }
    // }


    // DB select
    // const myLike=()=>{
    //     if(!isLoggedIn){
    //         return;
    //     }
    //     axios.get(like_url)
    //     .then(res=>{
    //         if(res.data == 0){
    //             setLike_btn(false);
    //         }else{
    //             setLike_btn(true);
    //         }
    //     })
    // }
    // like table에서 place_id랑 loginNum 가져와서 클릭한 카드의 contentid 비교해서 insert,delete 버튼 실행하기
    const like_table = () => {
        axios.get(like_table_url)
        .then(res => {
            setLike_list(res.data);  // like 테이블에 있는 place_id 여기에 member_num(loginNum)만 +해서 비교하면 될 듯?
            console.log(res.data)
        })
    }

    // const likeBtnT = () => {
    //     setLike_btn(true)
    // }

    // const likeBtnF = () => {
    //     setLike_btn(false)
    // }


    // const wantcheck = (contentid) => {
    //     axios.get(process.env.REACT_APP_SPRING_URL+"city/like?place_id="+contentid+"&loginNum="+loginNum)
    //     .then(res => {
            
    //         if(res.data == 0){
    //             console.log(contentid, "false?");
    //             console.log(process.env.REACT_APP_SPRING_URL+"city/like?place_id="+contentid+"&loginNum="+loginNum);
    //             setTrueFalse(0);
    //             return false;
    //         }else{
    //             setTrueFalse(1);
    //             return true;
    //         }
    //     })
    //     .catch(err => console.log(err))
    // }
    // console.log("wantcheckkkkkkkk : " + wantcheck())

    

    // 검색
    useEffect(() => {
        console.log("keyword");
        // 추천 장소(keyword 값이 아직 없을 때) : 처음 렌더링 시
        if(keyWord === ''){
          delete axios.defaults.headers.common['Authorization'];
          axios.get(areaUrl)
          .then((res) => {
            setPlaces(res.data.response.body.items.item);
            setCategoryPlace0(res.data.response.body.items.item);
          }).catch((err) => console.log(err.data));
        }
        // 키워드 검색 장소
        else{
        //   console.log("keyword 검색 요청");
        //   console.log(keyWord_url);
          delete axios.defaults.headers.common['Authorization'];
          axios.get(keyWord_url)
          .then((res) => {
            setPlaces(res.data.response.body.items.item);
            setCategoryPlace0(res.data.response.body.items.item);
          }).catch((err) => console.log(err.data));
        }
    }, [keyWord]);


    // 정보 더보기
    // useEffect(() => {
    //     console.log("moreinfo");
    //     moreinfo();
    // },[])
    const moreinfo = () => {
        setPage(page + 1);
        areaUrl += `&pageNo=${page}`;
        // console.log("areaUrl111111111111111111 : " + areaUrl);
        axios.get(areaUrl)
        .then((res) => {
            setPlaces([...places, ...res.data.response.body.items.item]);
            setCategoryPlace0([...categoryPlace0, ...res.data.response.body.items.item]);
    })
    .catch((err)=>{
            console.log(err.data)
        })
    }


    // console.log("categoryPlace1 : ",categoryPlace1);
    // console.log("weather_url : "+weather_url);
    // console.log("like_url : " + like_url);
    console.log("l_T_placeid : "+ l_T_placeid);
    console.log("like_table_url : " + like_table_url);
    


    return (
        <div id='cityinfo' style={muiStyle} >
        
            <div className='title' style={{margin:'20px'}}>
                <b>
                    {cityname}
                </b>
            </div>    
            <div style={{display:'flex'}}>
                <div>
                   <CityInfoImage/>
                </div>
                {/* 날씨 */}
                <div id='weather-css'>
                    {
                        w_data && w_data.map((item,index) => (
                            <div style={{marginRight:'5px', border:'1px solid gray'}}>
                                <div className='ppp' style={{display:'flex'}}>
                                    <div>
                                        <div>
                                            {
                                                format(new Date(item.tm), "MM/dd (eee)", {locale: ko})
                                            }
                                        </div>
                                        <div>
                                            {
                                                (item.iscs == "" || item.iscs != "") && ((item.maxTa > "27" && item.sumRn == "" && item.avgRhm < '55.4') || (item.maxTa > "29" && item.sumRn == "" && item.avgRhm < '55.4')) ? <img className='wimg' alt='' src={`${process.env.PUBLIC_URL}/WeatherImage/맑음.png`}/> : 
                                                // (item.iscs == "" || item.iscs != "") && (('75.7' < item.avgRhm < '76.0') && ('2' < item.avgWs < '2.2') && ('26.7' < maxTa < '26.9') && ('18.5' < minTa < '18.7')) ? <img className='wimg' alt='' src={`${process.env.PUBLIC_URL}/WeatherImage/비온_뒤_맑음.png`}/> : 
                                                // (item.iscs == "" || item.iscs != "") && ('67' < item.sumRn < '73') && ( '2' < item.avgWs < '3') && (('28' < maxTa && minTa < '22') || ( maxTa < '31' && minTa < '21')) ? <img className='wimg' alt='' src={`${process.env.PUBLIC_URL}/WeatherImage/맑음_뒤_흐림.png`}/> : 
                                                (item.iscs == "" || item.iscs != "") && ( '2' < item.avgWs || item.avgWs == '3.7') && ( '59' < item.avgRhm < '61') && (('35' < maxTa && minTa < '26') || ( '29' < maxTa && minTa < '20')) ? <img className='wimg' alt='' src={`${process.env.PUBLIC_URL}/WeatherImage/흐린_뒤_맑음.png`}/> : 
                                                (item.sumRn > '40') || ((item.iscs == "" || item.iscs != "") && (item.sumRn > '30' || item.sumRn == '') && ((item.avgWs > '5' && item.avgRhm > '80') || ('75' < item.avgRhm < '78' && (avgWs == "3.3" || avgWs == "1.5") && ((maxTa > '26' && minTa < '17') || (maxTa > '31' && minTa < '25'))))) ? <img className='wimg' alt='' src={`${process.env.PUBLIC_URL}/WeatherImage/비_번개.png`}/> : 
                                                (item.iscs == "" || item.iscs != "") && item.ddMes != "" ? <img className='wimg' alt='' src={`${process.env.PUBLIC_URL}/WeatherImage/눈.png`}/> : 
                                                (item.iscs == "" || item.iscs != "") && ((item.sumRn != "" ) || (item.avgRhm > '50' && item.avgWs > '2')) ? <img className='wimg' alt='' src={`${process.env.PUBLIC_URL}/WeatherImage/비.png`}/> : 
                                                (item.iscs == "" || item.iscs != "") && item.sumRn == '' && ((item.avgWs > '4' && item.avgRhm > '50') || (item.avgWs < '3' && item.avgRhm < '50'))? <img className='wimg' alt='' src={`${process.env.PUBLIC_URL}/WeatherImage/흐림.png`}/> :                                             
                                                <img className='wimg' alt='' src={`${process.env.PUBLIC_URL}/WeatherImage/맑음.png`}/> 
                                            }
                                        </div>
                                    </div>
                                    &ensp;&ensp;
                                    &ensp;&ensp;
                                    <div style={{width:'150px', height:'110px',padding:'10px'}}>
                                        <div className='max-temp'>
                                            {item.maxTa}&nbsp;
                                        </div>
                                        <img className='slash' alt='' src={`${process.env.PUBLIC_URL}/WeatherImage/슬래시.png`}/>
                                        <div className='min-temp'>
                                        &emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;{item.minTa}&nbsp;
                                        </div>
                                    </div>
                                    <div><br/>
                                        <div>&emsp;&emsp;
                                            {
                                                item.ddMes != '' ? `적설량 : ${item.ddMes}` : (item.ddMes == '' && item.sumRn == '') ? `풍속 : ${item.avgWs}` : `강수량 : ${item.sumRn}`
                                            }
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))
                    }
                </div>                
            </div>
            <hr/>
            <div className='scheduleContainer'>
                <div className='scheduleBtnBox'>
                    <button type='button' className='btn scheduleBtn' 
                        onClick={()=>{
                            naVi(`../plan/city/${num}`);
                        }}>내 일정 만들기</button>
                    <button type='button' className='btn scheduleBtn'>내 일정 더보기</button>
                </div>
                <b className='schedule-title'>내 여행 일정</b>
                <div className='schedule-big-box row'>
                    {
                        cityPlan && cityPlan.map((item, index) => (
                            <div className='schedule-box col-sm-4'>
                                <h5>{item.name}&emsp;&emsp;&emsp;{item.days}일</h5>
                                <b>{
                                (new Date() > new Date(item.end_date)) ? <b>지난여행</b> : (new Date() < new Date(item.start_date)) ? <b>D - {differenceInDays(new Date(item.start_date) ,new Date())}</b> : <b>여행중</b>
                                }</b>
                                &emsp;&nbsp;<b>{item.start_date != "" ? format(new Date(item.start_date), "yyyy-MM-dd") : ''}</b>&emsp;
                                <span class="material-symbols-outlined view-weather" style={{fontSize:'15px'}} onClick={(e)=>{
                                    setStart_date(item.start_date); setEnd_date(item.end_date); setDays(item.days);
                                    console.log("item.start_date"+item.start_date);
                                    console.log("item.end_date"+item.end_date);
                                    console.log("days"+days);
                                }}>sunny</span>
                            </div>
                        ))
                    }
                </div>
            </div>
            <hr/>
            <div style={{display:'flex', marginTop:'50px'}}>
                <div>
                    <Box>
                        <TabContext value={value} >
                            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                                <TabList onChange={handleChange} aria-label="lab API tabs example">
                                    <Tab label="전체보기" value="1" />
                                    <Tab label="관광명소12" value="12" />
                                    <Tab label="음식점39" value="39" />
                                    <Tab label="쇼 핑38" value="38" />
                                    <Tab label="문화시설 14" value="14"/>
                                    <Tab label="레포츠 28" value="28" />
                                    <Tab label="행사/공연/축제 15" value="15" />
                                    <Tab label="숙 박 32" value="32" />
                                </TabList>
                            </Box>
                            <TabPanel value='1'>
                                <div style={{display:'flex', marginTop:'20px'}}>
                                    <div className='searchCity'>
                                        <TextField id="" label="검색할 키워드를 입력하세요" variant="outlined" size="small" fullWidth onKeyPress={(e) => {
                                            if(e.key === 'Enter' && e.target.value !== ''){
                                            setKeyWord(e.target.value);
                                            e.target.value = '';
                                            setCategoryPlace0([]);
                                            }
                                        }}/>
                                    </div>
                                </div>
                                <div style={{display:'flex'}} className='row'>
                                    {
                                        categoryPlace0 && categoryPlace0.map((item, idx) => (
                                            <div className='col-sm-3'>
                                                { 
                                                    like_list.includes(item.contentid) ?
                                                    <button type='button' className='heart_btn'
                                                    onClick={()=>{
                                                        delete_btn(event, item.contentid)
                                                        // setL_T_placeid(item.contentid)///
                                                        }}>
                                                        <img alt='' src='https://www.earthtory.com/res/img/mypage/plan/sub/btn_like_on.png'/>
                                                    </button>
                                                    :
                                                    <button type='button' className='heart_btn_on'
                                                    onClick={()=>{
                                                        // setL_T_placeid(item.contentid)
                                                        insert_btn(event, item.contentid)
                                                        }}>
                                                        <img alt='' src='https://www.earthtory.com/res/img/mypage/plan/sub/btn_like.png'/>
                                                    </button>
                                                    
                                                }
                                                <Link to={'/place/placedetail'} state={{state:{pcontentId : item.contentid}}} onClick={()=>{console.log("pcontentId : "+pcontentId)}}>
                                                    <Card value={item} sx={{width: 220, height: 300, marginRight: 12}}>
                                                        <CardActionArea>
                                                            <CardMedia
                                                            component="img"
                                                            height="180"
                                                            image={item.firstimage != "" ? item.firstimage : process.env.PUBLIC_URL+"/logo192.png"}
                                                            alt=""
                                                            />
                                                            <CardContent>
                                                                <Typography gutterBottom variant="h7" component="div">
                                                                    {item.title}
                                                                </Typography>
                                                                <Typography variant="h7" color="red">
                                                                    {item.tel}
                                                                </Typography>
                                                            </CardContent>
                                                        </CardActionArea>
                                                        <CardActions>
                                                            <Button className='clipBtn' size="small" color="primary">
                                                                {item.addr1}
                                                            </Button>
                                                        </CardActions>
                                                    </Card>
                                                </Link>
                                            </div>
                                        ))
                                    }
                                </div>
                                <button type='button' onClick={()=>{moreinfo()}}>+더보기</button>
                                {/* </div> 서브카테고리 div 닫는거 */}
                            </TabPanel>
                            <TabPanel value='12'>
                                <div style={{display:'flex', marginTop:'20px'}}>
                                    
                                </div>
                                <div style={{display:'flex'}} className='row'>
                                    {
                                        categoryPlace1 && categoryPlace1.map((item, idx) => (
                                            <div className='col-sm-3'>
                                                { 
                                                    like_list.includes(item.contentid) ?
                                                    <button type='button' className='heart_btn'
                                                    onClick={()=>{
                                                        // setL_T_placeid(item.contentid)
                                                        delete_btn(event, item.contentid)
                                                        }}>
                                                        <img alt='' src='https://www.earthtory.com/res/img/mypage/plan/sub/btn_like_on.png'/>
                                                    </button>
                                                    :
                                                    <button type='button' className='heart_btn_on'
                                                    onClick={()=>{
                                                        // setL_T_placeid(item.contentid)
                                                        insert_btn(event, item.contentid)
                                                        }}>
                                                        <img alt='' src='https://www.earthtory.com/res/img/mypage/plan/sub/btn_like.png'/>
                                                    </button>
                                                    
                                                }
                                                <Link to={'/place/placedetail'} state={{state:{pcontentId : item.contentid}}} onClick={()=>{console.log("pcontentId : "+pcontentId)}}>
                                                    <Card value={item} sx={{width: 220, height: 300, marginRight: 12}}>
                                                        <CardActionArea>
                                                            <CardMedia
                                                            component="img"
                                                            height="180"
                                                            image={item.firstimage != "" ? item.firstimage : process.env.PUBLIC_URL+"/logo192.png"}
                                                            alt=""
                                                            />
                                                            <CardContent>
                                                                <Typography gutterBottom variant="h7" component="div">
                                                                    {item.title}
                                                                </Typography>
                                                                <Typography variant="h7" color="red">
                                                                    {item.tel}
                                                                </Typography>
                                                            </CardContent>
                                                        </CardActionArea>
                                                        <CardActions>
                                                            <Button className='clipBtn' size="small" color="primary">
                                                                {item.addr1}
                                                            </Button>
                                                        </CardActions>
                                                    </Card>
                                                </Link>
                                            </div>
                                        ))
                                    }
                                </div>
                            </TabPanel>
                            <TabPanel value='39'>
                                <div style={{display:'flex', marginTop:'20px'}}>
                                    
                                </div>
                                <div style={{display:'flex'}} className='row'>
                                    {
                                        categoryPlace2 && categoryPlace2.map((item, idx) => (
                                            <div className='col-sm-3'>
                                                <Link to={'/place/placedetail'} state={{state:{pcontentId : item.contentid}}} onClick={()=>{console.log("pcontentId : "+pcontentId)}}>
                                                    <Card value={item} sx={{width: 220, height: 300, marginRight: 12}}>
                                                        <CardActionArea>
                                                            <CardMedia
                                                            component="img"
                                                            height="180"
                                                            image={item.firstimage != "" ? item.firstimage : process.env.PUBLIC_URL+"/logo192.png"}
                                                            alt=""
                                                            />
                                                            <CardContent>
                                                                <Typography gutterBottom variant="h7" component="div">
                                                                    {item.title}
                                                                </Typography>
                                                                <Typography variant="h7" color="red">
                                                                    {item.tel}
                                                                </Typography>
                                                            </CardContent>
                                                        </CardActionArea>
                                                        <CardActions>
                                                            <Button className='clipBtn' size="small" color="primary">
                                                                {item.addr1}
                                                            </Button>
                                                        </CardActions>
                                                    </Card>
                                                </Link>
                                            </div>
                                        ))
                                    }
                                </div>
                            </TabPanel>
                            <TabPanel value='38'>
                                <div style={{display:'flex', marginTop:'20px'}}>
                                    
                                </div>
                                <div style={{display:'flex'}} className='row'>
                                    {
                                        categoryPlace3 && categoryPlace3.map((item, idx) => (
                                            <div className='col-sm-3'>
                                                <Link to={'/place/placedetail'} state={{state:{pcontentId : item.contentid}}} onClick={()=>{console.log("pcontentId : "+pcontentId)}}>
                                                    <Card value={item} sx={{width: 220, height: 300, marginRight: 12}}>
                                                        <CardActionArea>
                                                            <CardMedia
                                                            component="img"
                                                            height="180"
                                                            image={item.firstimage != "" ? item.firstimage : process.env.PUBLIC_URL+"/logo192.png"}
                                                            alt=""
                                                            />
                                                            <CardContent>
                                                                <Typography gutterBottom variant="h7" component="div">
                                                                    {item.title}
                                                                </Typography>
                                                                <Typography variant="h7" color="red">
                                                                    {item.tel}
                                                                </Typography>
                                                            </CardContent>
                                                        </CardActionArea>
                                                        <CardActions>
                                                            <Button className='clipBtn' size="small" color="primary">
                                                                {item.addr1}
                                                            </Button>
                                                        </CardActions>
                                                    </Card>
                                                </Link>
                                            </div>
                                        ))
                                    }
                                </div>
                            </TabPanel>
                            <TabPanel value='14'>
                                <div style={{display:'flex', marginTop:'20px'}}>
                                    
                                </div>
                                <div style={{display:'flex'}} className='row'>
                                    {
                                        categoryPlace4 && categoryPlace4.map((item, idx) => (
                                            <div className='col-sm-3'>
                                                <Link to={'/place/placedetail'} state={{state:{pcontentId : item.contentid}}} onClick={()=>{console.log("pcontentId : "+pcontentId)}}>
                                                    <Card value={item} sx={{width: 220, height: 300, marginRight: 12}}>
                                                        <CardActionArea>
                                                            <CardMedia
                                                            component="img"
                                                            height="180"
                                                            image={item.firstimage != "" ? item.firstimage : process.env.PUBLIC_URL+"/logo192.png"}
                                                            alt=""
                                                            />
                                                            <CardContent>
                                                                <Typography gutterBottom variant="h7" component="div">
                                                                    {item.title}
                                                                </Typography>
                                                                <Typography variant="h7" color="red">
                                                                    {item.tel}
                                                                </Typography>
                                                            </CardContent>
                                                        </CardActionArea>
                                                        <CardActions>
                                                            <Button className='clipBtn' size="small" color="primary">
                                                                {item.addr1}
                                                            </Button>
                                                        </CardActions>
                                                    </Card>
                                                </Link>
                                            </div>
                                        ))
                                    }
                                </div>
                            </TabPanel>
                            <TabPanel value='28'>
                                <div style={{display:'flex', marginTop:'20px'}}>
                                    
                                </div>
                                <div style={{display:'flex'}} className='row'>
                                    {
                                        categoryPlace5 && categoryPlace5.map((item, idx) => (
                                            <div className='col-sm-3'>
                                                <Link to={'/place/placedetail'} state={{state:{pcontentId : item.contentid}}} onClick={()=>{console.log("pcontentId : "+pcontentId)}}>
                                                    <Card value={item} sx={{width: 220, height: 300, marginRight: 12}}>
                                                        <CardActionArea>
                                                            <CardMedia
                                                            component="img"
                                                            height="180"
                                                            image={item.firstimage != "" ? item.firstimage : process.env.PUBLIC_URL+"/logo192.png"}
                                                            alt=""
                                                            />
                                                            <CardContent>
                                                                <Typography gutterBottom variant="h7" component="div">
                                                                    {item.title}
                                                                </Typography>
                                                                <Typography variant="h7" color="red">
                                                                    {item.tel}
                                                                </Typography>
                                                            </CardContent>
                                                        </CardActionArea>
                                                        <CardActions>
                                                            <Button className='clipBtn' size="small" color="primary">
                                                                {item.addr1}
                                                            </Button>
                                                        </CardActions>
                                                    </Card>
                                                </Link>
                                            </div>
                                        ))
                                    }
                                </div>
                            </TabPanel>
                            <TabPanel value='15'>
                                <div style={{display:'flex', marginTop:'20px'}}>
                                    
                                </div>
                                <div style={{display:'flex'}} className='row'>
                                    {
                                        categoryPlace6 && categoryPlace6.map((item, idx) => (
                                            <div className='col-sm-3'>
                                                <Link to={'/place/placedetail'} state={{state:{pcontentId : item.contentid}}} onClick={()=>{console.log("pcontentId : "+pcontentId)}}>
                                                    <Card value={item} sx={{width: 220, height: 300, marginRight: 12}}>
                                                        <CardActionArea>
                                                            <CardMedia
                                                            component="img"
                                                            height="180"
                                                            image={item.firstimage != "" ? item.firstimage : process.env.PUBLIC_URL+"/logo192.png"}
                                                            alt=""
                                                            />
                                                            <CardContent>
                                                                <Typography gutterBottom variant="h7" component="div">
                                                                    {item.title}
                                                                </Typography>
                                                                <Typography variant="h7" color="red">
                                                                    {item.tel}
                                                                </Typography>
                                                            </CardContent>
                                                        </CardActionArea>
                                                        <CardActions>
                                                            <Button className='clipBtn' size="small" color="primary">
                                                                {item.addr1}
                                                            </Button>
                                                        </CardActions>
                                                    </Card>
                                                </Link>
                                            </div>
                                        ))
                                    }
                                </div>
                            </TabPanel>
                        </TabContext>
                        
                    </Box>
                </div>
            </div>
            
        </div>

    );
};

export default CityInfoMain;
