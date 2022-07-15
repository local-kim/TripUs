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
import { Button, CardActionArea, CardActions } from '@mui/material';
import axios from "axios";
import '../../styles/cityinfo.css';
import { Link, useNavigate, useParams } from 'react-router-dom';
import CityInfoImage from './CityInfoImage';
import CityInfoMore from './CityInfoMore';
import { differenceInDays, format, subYears } from 'date-fns';
import { useInView } from "react-intersection-observer"
import { PlaceItem } from '../plan';
import { height } from '@mui/system';

const CityInfoMain = () => {
    
    //관광명소 api contentId 받아오기
     const pcontentId=126078; //2360786
    // const pnavi =useNavigate();
    // const [pid,setPid]=useState();
    // setPid(contentId);

    // 수동 데이타
    const naVi=useNavigate();
    // const [data2,setData2]=useState([
    //     {
    //         subject: "냥이로 떠나는 여행",
    //         D_day: 1,
    //         day: "2022-06-30" 
    //     },{
    //         subject: "멍이로 떠나는 여행",
    //         D_day: 20,
    //         day: "2022-07-19" 
    //     },{
    //         subject: "그냥 떠나는 여행",
    //         D_day: 120,
    //         day: "2022-10-29" 
    //     }
    // ])

    // MUi 메뉴 탭
    const [value, setValue] = useState('12');
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
    const {num,member_num}=useParams();    // url에서 num 데이터 가져오기, 값이 안들어가서 member_num에만 3들어감
    const city_num = num;
    // const [weatherImg,setWeatherImg]=useState('../../../public/WeatherImage/맑음.png');
    
    // 일정 url에 필요한 변수들   
    const [img,setImg]=useState([]);
    const [start_date,setStart_date]=useState('');
    // const [slast_year,setSlast_year]=useState('');
    const [end_date,setEnd_date]=useState('');
    // const [elast_year,setElast_year]=useState('');
    const [days,setDays]=useState('');
    
    // 작년 날짜로 수정
    // const slastYear = subYears(new Date(start_date), 1);
    // const elastYear = subYears(new Date(end_date), 1);
    const slastYear = format(subYears(new Date(start_date), 1), "yyyyMMdd");        // 페이지 로딩후 이걸로 교체
    // const S_M_D = format((new Date(start_date)), "MMdd");
    const elastYear = format(subYears(new Date(end_date), 1), "yyyyMMdd");          // 페이지 로딩후 이걸로 교체
    // const E_M_D = format((new Date(end_date)), "MMdd");
    // D-day 구하기 - 더 해야됨
    // const difDay = differenceInDays(end_date, start_date) + 1;
    
    
    
    console.log("slastYear : "+slastYear);
    console.log("elastYear : "+elastYear);
    // console.log("difDay : "+difDay);


    // 지역 데이타 변수 
    const [areaCode,setAreaCode]=useState('12');
    const [sigunguCode,setSigunguCode]=useState('');
    const [categoryPlace1,setCategoryPlace1]=useState([]);  // 12 명소
    const [categoryPlace2,setCategoryPlace2]=useState([]);  // 39 음식점
    const [categoryPlace3,setCategoryPlace3]=useState([]);  // 38 쇼핑
    const [categoryPlace4,setCategoryPlace4]=useState([]);  // 15 행사/공연/축제
    const [categoryPlace5,setCategoryPlace5]=useState([]);  // 25 여행코스
    const [categoryPlace6,setCategoryPlace6]=useState([]);  // 28 레포츠
    const [categoryPlace7,setCategoryPlace7]=useState([]);  // 32 숙박  
    const [places, setPlaces] = useState([]);

    // axios multiple request
    const [aaaT,setAaaT]=useState([]);      // db(num, name, member_num, city_num, start_date, end_date, days)
    const [bbbA,setBbbA]=useState([]);      // 관광정보 데이터
    const [cccW,setCccW]=useState([]);      // 날씨 데이터
    
    
    // API
    // 날씨 
    // const API_ID="pN8sverBEceulMUULSyvZ";
    // const API_KEY="QWZmBxA43k5EL7jQRyF5gMWtHEXBAgmpBjVXmgfh";
    //const API_KEY="eeb9140b1a18675f963cf17ab2081baf";     //openweathermap 사이트 APIKEY
    //const API_KEY="YHbvEJEqXIWLqYGKEDkCqF7V08yazpZHKk3gWVyGKJpuhY5ZowEIwkt9i8nmTs%2F5BMBmSKWuyX349VO5JN6Tsg%3D%3D"; // 누군가꺼
    const API_KEY="hG2QkKkmuiN38w%2BeGu53VbRK%2BBNzKRpnjbLE%2BHDXZ0dHzgbBQ67K67NsuR5xOAs%2BErSqbSpOpk1UKBnj4dvlnA%3D%3D";       // 내꺼

    
    
    // // 일정 계획 데이타
    const [cityPlan,setCityPlan]=useState([]);
    const [cityPlan2,setCityPlan2]=useState([]);
    // URL
    // db city테이블 가져오는 거
    PlaceUrl=process.env.REACT_APP_SPRING_URL+"city/citydata?num="+num;
    //console.log(PlaceUrl);

    // 날씨 api 받아오는 거         ${cityPlan.data[0].start_date} , ${cityPlan.data[0].end_date}
    
     let weather_url=`https://apis.data.go.kr/1360000/AsosDalyInfoService/getWthrDataList?serviceKey=${API_KEY}&numOfRows=${days}&dataType=JSON&dataCd=ASOS&dateCd=DAY&startDt=${slastYear}&endDt=${elastYear}&stnIds=${num}`;
    // let weather_url=`https://apis.data.go.kr/1360000/AsosDalyInfoService/getWthrDataList?serviceKey=${API_KEY}&numOfRows=6&dataType=xml&dataCd=ASOS&dateCd=DAY&startDt=${cityPlan.data[0].start_date}&endDt=20210803&stnIds=${cityData.num}`       // 기상청 과거데이터 다됨
    //const weather_url=`https://api.openweathermap.org/data/2.5/forecast/daily?q=${location}&cnt=3&appid=${API_KEY}`         // 최대예측 16일까지 일일데이터 (유료)
    //const weather_url=`https://api.openweathermap.org/data/2.5/forecast?q=${location}&appid=${API_KEY}`             // 5일간 3시간 간격
    //const weather_url=`https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${API_KEY}`            // 현재 날씨
    //const weather_url=`https://pro.openweathermap.org/data/2.5/forecast/hourly?q=${location}&appid=${API_KEY}`    // 4일간 예측 (유료)
    //const weather_url=`https://api.aerisapi.com/conditions/summary/${location}?format=json&from=&to=&client_id=${API_ID}&client_secret=${API_KEY}`
    //console.log("wurl : "+weather_url)
    // 관광도시 api 받아오는 거(arrange=P)
     let areaUrl = `http://api.visitkorea.or.kr/openapi/service/rest/KorService/areaBasedList?ServiceKey=${API_KEY}&areaCode=${areaCode}&numOfRows=5&arrange=R&MobileOS=ETC&MobileApp=AppTest&_type=json`;
     if(sigunguCode){  // 시군구 코드가 있는 도시이면
         areaUrl += `&sigunguCode=${sigunguCode}`;
     }
    // 날씨 데이타 변수
    const [stnId,setStnId]=useState('');         // 지역번호
    const [stnNm,setStnNm]=useState('');         // 지역명
    const [maxTa,setMaxTa]=useState('');         // 최고기온
    const [minTa,setMinTa]=useState('');         // 최저기온
    const [iscs,setIscs]=useState('');           // 일기현상
    const [sumRn,setSunRn]=useState('');         // 일 강수량
    const [avgWs,setAvgWs]=useState('');            // 평균 풍속
    const [avgRhm,setAvgRhm]=useState('');          // 평균 습도 %
    const [ddMes,setDdMes]=useState('');            // 일 적설량
    

    const [location,setLocation]=useState('');  // 검색 input 지역 담는 변수
    const [result,setResult]=useState([]);  // 날씨 데이터 담는 배열 변수
    
 

 
    // useEffect(() => {
    //     // console.log(wthPlaceUrl);
    //     place_Data();
    // }, [num]);
     const place_Data= async()=>{
        // const data = await axios({
        //     method: 'get',
        //     url: PlaceUrl
        // })
        //     console.log(data);
        //     setWthNum(data);
        try {
            const response = await axios.get(PlaceUrl)
                setCityData(response);
                setAreaCode(response.data.area_code);
                setSigunguCode(response.data.sigungu_code);
        }
        catch(err) {
            alert(err);
        }
    }
    console.log('cityData',cityData);
 
    // 관광정보 더보기
    // const addPlace = () => {

    // }
 
    

    // difday = differenceInDays(state[0].endDate, state[0].startDate) + 1;

    let trip_url=`${process.env.REACT_APP_SPRING_URL}city/tripdata?city_num=${city_num}&member_num=3`;     
     // 이거 url에 뜨는 값 가져오는건데 url에서 넘어오는 값이 그냥 num 밖에 없잖아,,... 넘겨줄 때 로그인한 사람 member_num도 같이 넘겨주면 바로 될 듯?
    
    useEffect(() => {
        trip_data();
        place_Data();
        // Weather_Data();
    }, [num,result,,weather_url]);
    //console.log("trip_url : "+trip_url)

    const trip_data= async()=>{
        try {
            console.log("11111111111111"+areaUrl)
            const response = await axios.get(trip_url)
            //console.dir(response.data[0]);
            setCityPlan(response.data);
            setCityPlan2(response.data[0]);
            setStart_date([response.data[0].start_date]);  // 잘 들어가짐
            setEnd_date([response.data[0].end_date]);  // 잘 들어가짐
            setDays([response.data[0].days]);  // 잘 들어가짐
            weather_url=`https://apis.data.go.kr/1360000/AsosDalyInfoService/getWthrDataList?serviceKey=${API_KEY}&numOfRows=6&dataType=JSON&dataCd=ASOS&dateCd=DAY&startDt=${response.data[0].start_date}&endDt=${response.data[0].end_date}&stnIds=${num}`;
            console.log("wui_wurl : "+weather_url)
            // setEnd_date(response);
            // setStart_date(response);
            // setDays(response);
            // Weather_Data();

        }
        catch(err) {
            alert(err);
        }
    }
    // [obdject Object] 데이터 값 콘솔에 출력
    // for ( var key in cityPlan) {
    //     // console.log("key : "+cityPlan[key]);
    //     Object.keys(cityPlan);
    //     console.log(cityPlan);
    // }

    // console.log("cityPlan:"+JSON.Stringify(cityPlan_);          // [object Object]로 콘솔에 나올 때 JSON 방식으로 데이타 보여주는 코드
    console.log("start_date:",start_date);
    console.log("end_date:",end_date);
    console.log("days:",days);



    //날씨 데이타 가져오기
    
    // 배웠던 방식
    // const Weather_Data = () => {
    //     // weather_url=`https://apis.data.go.kr/1360000/AsosDalyInfoService/getWthrDataList?serviceKey=${API_KEY}&numOfRows=6&dataType=JSON&dataCd=ASOS&dateCd=DAY&startDt=${start_date}&endDt=${end_date}&stnIds=${num}`;
    //     console.log("are_wurl : "+weather_url);
    //     axios.get('http://apis.data.go.kr/1360000/AsosDalyInfoService/getWthrDataList?serviceKey=hG2QkKkmuiN38w%2BeGu53VbRK%2BBNzKRpnjbLE%2BHDXZ0dHzgbBQ67K67NsuR5xOAs%2BErSqbSpOpk1UKBnj4dvlnA%3D%3D&numOfRows=3&dataType=JSON&dataCd=ASOS&dateCd=DAY&startDt=20220704&endDt=20220706&stnIds=159')
    //     .then(response=>{
    //         console.log("suse"+response);
    //         // console.log("dd"+res.data)
    //         // setResult(res.data);
    //     })
    //     .catch(
    //         error=>console.log(error)
    //     );
    // }

    // useEffect(() => {
    //     Weather_Data();
    // },[result,weather_url])
    
    // async,await 방식
    // const Weather_Data = async ()=>{
    //         // weather_url=`https://apis.data.go.kr/1360000/AsosDalyInfoService/getWthrDataList?serviceKey=${API_KEY}&numOfRows=6&dataType=xml&dataCd=ASOS&dateCd=DAY&startDt=${start_date}&endDt=${end_date}&stnIds=${num}`
    //     try {
    //         console.log("are_wurl : "+weather_url)
    //         const res = await axios.get(weather_url)
    //         console.log("res"+res.data);
    //         setResult(res.response.body.items.item);
    //     }catch(err) {
    //         console.log(err);
    //     }
    // }
    // console.log("re:"+result);
    //////이미지로 변환하는 방법
    // if (result.data.weather[0].main === "Clouds"){
    //     setImg('../public/WeatherImage/비.png');
    // console.log(img);
    // }


    useEffect(()=>{
        // console.log("222222222 :"+areaUrl);
        // console.log("333333333 :"+weather_url);
        // console.log("444444444 :"+trip_url);
        axios
            .all([axios.get(trip_url), axios.get(areaUrl), axios.get(weather_url)])
            .then(
                axios.spread((res1, res2, res3) => {
                    // console.log("res1,res2,res3 :",[res1],[res2],[res3]);
                    // console.log("res1 : ", res1.data);
                    // console.log("res2 : ", res2.data.response.body.items.item);
                    // console.log("res3 : ", res3.data.response.body.items.item);
                    setAaaT(res1.data);
                    setBbbA(res2.data.response.body.items.item);
                    setCccW(res3.data.response.body.items.item);
                    
                })
            )
            .catch((err) => console.log(err));
    },[num,areaUrl,weather_url])
    
    console.log("aaaT : ",aaaT);
    console.log("bbbA : ",bbbA);
    console.log("cccW : ",cccW);

    useEffect(() => {
        // 처음 렌더링 시
          axios.get(areaUrl)
          .then((res) => {
            console.dir(res.data.response.body.items.item);
            setPlaces(res.data.response.body.items.item);
            setCategoryPlace1(res.data.response.body.items.item.filter((place, idx) => place.contenttypeid == '12' || place.contenttypeid == '14' ))
            setCategoryPlace2(res.data.response.body.items.item.filter((place, idx) => place.contenttypeid == '39'))
            setCategoryPlace3(res.data.response.body.items.item.filter((place, idx) => place.contenttypeid == '38'))
            setCategoryPlace4(res.data.response.body.items.item.filter((place, idx) => place.contenttypeid == '15'))
            setCategoryPlace5(res.data.response.body.items.item.filter((place, idx) => place.contenttypeid == '25'))
            setCategoryPlace6(res.data.response.body.items.item.filter((place, idx) => place.contenttypeid == '28'))
            setCategoryPlace7(res.data.response.body.items.item.filter((place, idx) => place.contenttypeid == '32'))

            //setCategoryPlace(res.data.response.body.items.item);
          }).catch((err) => {
            console.log(err.data);
          });
    }, [areaCode]);
   // console.log('places', places);
    //console.log('categoryplace', categoryPlace);
    // console.log("1",categoryPlace1);
    // console.log("2",categoryPlace2);
    // console.log("3",categoryPlace3);
    // console.log("4",categoryPlace4);
    // console.log("5",categoryPlace5);
    // console.log("6",categoryPlace6);
    // console.log("7",categoryPlace7);
 

    // // scroll paging 무한 스크롤 실패작
    // const [page, setPage] = useState(1);
    // const [loading,setLoading] = useState(false);
    // const [ref, inView] = useInView();

    // const aaaa = useCallback(async () => {
    //     setLoading(true)
    //     await axios.get(`${areaUrl}&page=${page}`).then((res) => {
    //         setCategoryPlace1(prevState => [...prevState, ...res.data.response.body.items.item])
    //     })
    //     setLoading(false)
    // },[page])
    // useEffect(() => {
    //     aaaa()
    // },[aaaa])
    // useEffect(()=>{
    //     if (inView && !loading) {
    //         setPage(prevState => prevState + 1)
    //     }
    // },[inView, loading])




    // const [ref, inView] = useInView();
    // const [page, setPage] = useState(1);

    // useEffect(() => {
    //     // 사용자가 마지막 요소를 보고 있는 경우
    //     if(inView){
    //         setPage(page + 1);
    //         areaUrl += `&pageNo=${page}`;
    //         // 처음 렌더링 시
    //         axios.get(areaUrl)
    //         .then((res) => {
    //             console.dir(res.data.response.body.items.item);
    //             setPlaces([...places, ...res.data.response.body.items.item])
    //             setCategoryPlace1([...categoryPlace1, ...res.data.response.body.items.item]);
    //             setCategoryPlace2([...categoryPlace2, ...res.data.response.body.items.item]);
    //             setCategoryPlace3([...categoryPlace3, ...res.data.response.body.items.item]);
    //             setCategoryPlace4([...categoryPlace4, ...res.data.response.body.items.item]);
    //             setCategoryPlace5([...categoryPlace5, ...res.data.response.body.items.item]);
    //             setCategoryPlace6([...categoryPlace6, ...res.data.response.body.items.item]);
    //             setCategoryPlace7([...categoryPlace7, ...res.data.response.body.items.item]);
    //         }).catch((err)=> {
    //             console.log(err.data)
    //         })
    //     }
    // }, [inView]);

    // 카테고리변수 값 변경
    // const categoryChg=()=>{
    //     setCategory(value);
    //     console.log("category",category);
    //     console.log("value",value);
    // }


    return (
        <div id='cityinfo' style={muiStyle} >
       <Link to={'/place/placedetail'} state={{state:{pcontentId}}}>춘식이를 눌러주세요</Link>


            <div style={{display:'flex', marginBottom:'20px'}}>
                <div className='title'>
                    <b>
                        {cccW[0].stnNm}<br/>
                        {/* {aaaT[0].end_date}<br/>
                        {bbbA[0].contentid}<br/>
                        {cccW[0].maxTa} */}
                    </b>
                </div>
                <div className='searchCity'>
                    <input type='text' placeholder='도시를 입력하세요' value={location} 
                        onChange={(e)=>{
                            setLocation(e.target.value);
                        }}/>
                </div>
            </div>        
            <div style={{display:'flex'}}>
                <div>
                   <CityInfoImage/>
                </div>
                {/* {
                    Object.keys(result).length !== 0 && (
                        <div className='weather-css'>
                            <div className='city'>{result.data.stnNm}</div>
                            <div className='temperature-max'>{result.data.maxTa}도</div>
                            <div className='temperature-min'>{result.data.minTa}도</div>
                            <div className='sky'>{result.data.iscs.equals[1]}</div>
                        </div>
                    )
                } */}
                {/* <div style={{display:'flex', border:'1px solid black'}}>
                    {
                        aaaT && aaaT.map((item,index) => (
                            <div style={{marginRight:'5px'}}>
                                {item.end_date}
                            </div>
                        ))
                    }
                </div>
                <div style={{display:'flex', border:'1px solid black'}}>
                    {
                        bbbA && bbbA.map((item,index) => (
                            <div style={{marginRight:'5px'}}>
                                {item.title}
                            </div>
                        ))
                    }
                </div> */}

                {/* 날씨 */}
                <div id='weather-css'>
                    {
                        cccW && cccW.map((item,index) => (
                            <div style={{marginRight:'5px', border:'1px solid gray'}}>
                                <div className='ppp' style={{display:'flex'}}>
                                    <div>
                                        <div>
                                            수&nbsp;
                                        </div>
                                        <br/>
                                        <div>
                                            7월 1일&nbsp;
                                        </div>
                                    </div>
                                    &ensp;&ensp;
                                    <div>
                                        <br/>
                                        날씨
                                    </div>
                                    &ensp;&ensp;
                                    <div>
                                        <div>
                                            최고기온 : {item.maxTa}&nbsp;
                                        </div>
                                        &emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;/
                                        <div>
                                        &emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;최저기온 : {item.minTa}&nbsp;
                                        </div>
                                    </div>
                                    <div><br/>
                                        <div>
                                        &emsp;&emsp;강수량 : {item.sumRn}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))
                    }
                </div>                
            </div>
            <div style={{display:'flex', marginTop:'50px'}}>
                <div>
                    <Box>
                        <TabContext value={value} >
                            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                                <TabList onChange={handleChange} aria-label="lab API tabs example">
                                    <Tab label="관광명소12" value="12" />
                                    <Tab label="음식점39" value="39" />
                                    <Tab label="쇼 핑38" value="38" />
                                    <button type='button' onClick={()=>{naVi("/city/infomore")}}>+더보기</button>
                                </TabList>
                            </Box>
                                <TabPanel value='12'>
                                    <div style={{display:'flex'}} className='row'>
                                        {
                                            categoryPlace1 && categoryPlace1.map((item, idx) => (
                                                <div className='col-sm-4'>
                                                    <Card value={item} sx={{width: 220, height: 300, marginRight: 12 }}>
                                                        <CardActionArea>
                                                            <CardMedia
                                                            component="img"
                                                            height="180"
                                                            image={item.firstimage}
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
                                                </div>
                                            ))
                                        }
                                        {/* <div>   무한 스크롤 실패작
                                            <div>
                                                {
                                                    categoryPlace1 && categoryPlace1.map((item,index) => (
                                                        <React.Fragment key={index}>
                                                            (categoryPlace1.length - 1 == index) ? (
                                                                <div key={index} ref={ref}>
                                                                    {item}
                                                                </div>
                                                            ) : (
                                                                <div key={index}>
                                                                    {item}
                                                                </div>
                                                            )
                                                        </React.Fragment>
                                                    ))
                                                }
                                            </div>
                                        </div> */}
                                    </div>
                                </TabPanel>
                                <TabPanel value='39'>
                                    <div style={{display:'flex'}} className='row'>
                                        {
                                            categoryPlace2 && categoryPlace2.map((item, idx) => (
                                                <div className='col-sm-4'>
                                                    <Card value={item} sx={{width: 220, height: 300, marginRight: 12 }}>
                                                        <CardActionArea>
                                                            <CardMedia
                                                            component="img"
                                                            height="180"
                                                            image={item.firstimage}
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
                                                </div>
                                            ))
                                        }
                                    </div>

                                </TabPanel>
                                <TabPanel value="38">
                                    <div style={{display:'flex'}} className='row'>
                                        {
                                           categoryPlace3 && categoryPlace3.map((item, idx) => (
                                                <div className='col-sm-4'>
                                                    <Card value={item} sx={{width: 220, height: 300, marginRight: 12 }}>
                                                        <CardActionArea>
                                                            <CardMedia
                                                            component="img"
                                                            height="180"
                                                            image={item.firstimage}
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
                                                </div>
                                            ))
                                        }
                                    </div>

                                </TabPanel>
                                {/* <div> 무한 스크롤 실패작
                                    <div>
                                        {
                                            categoryPlace1 && categoryPlace1.map((item,index) => {
                                                (categoryPlace1.length - 1 == index) ? (
                                                    <div key={index} ref={ref}>
                                                      {item.data}
                                                    </div>
                                                  ) : (
                                                    <div key={index}>
                                                      {item.data}
                                                    </div>
                                                  )
                                            })
                                        }
                                    </div>
                                </div> */}
                        </TabContext>
                    </Box>
                    
                </div>
                <div className='scheduleContainer'>
                    <div className='scheduleBtnBox'>
                        <button type='button' className='btn scheduleBtn' 
                            onClick={()=>{
                                naVi(`../plan/calendar/108`);
                            }}>내 일정 만들기</button>
                        <button type='button' className='btn scheduleBtn'>내 일정 더보기</button>
                    </div>
                    <b className='bb'>내 여행 일정</b>
                    {/* {
                        cityPlan && cityPlan.data.map((item, index) => (
                            <div className='aa'>
                                <h5>{item.name}</h5>
                                <b>[D - 12]</b>&emsp;&nbsp;<b>{item.start_date}</b>&emsp;
                                <span class="material-symbols-outlined" style={{fontSize:'15px'}}>sunny<b>날씨보기</b></span>
                            </div>
                        ))

                    } */}
                </div>
            </div>
            
        </div>

    );
};

export default CityInfoMain;