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
import { useDispatch } from 'react-redux';

const CityInfoMain = () => {
    
    //관광명소 api contentId 받아오기
    // const pcontentId = 126078;
    const [pcontentId,setPcontentId]=useState(); //2360786
    // const pnavi =useNavigate();
    // const [pid,setPid]=useState();
    // setPid(contentId);

    // redux에서 state 얻기
    // const dispatch = useDispatch(); 

    // 수동 데이타
    const naVi=useNavigate();


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
    const [start_date,setStart_date]=useState(format(new Date(), "yyyy-MM-dd"));    // 기본 타입변경 필수!
    const [end_date,setEnd_date]=useState(format(new Date(), "yyyy-MM-dd"));        // 기본 타입변경 필수!
    const [days,setDays]=useState('');
    
    // 작년 날짜로 수정
    const slastYear = format(subYears(new Date(start_date), 1), "yyyyMMdd");        // 페이지 로딩후 이걸로 교체
    const elastYear = format(subYears(new Date(end_date), 1), "yyyyMMdd");          // 페이지 로딩후 이걸로 교체
    // D-day 구하기 - 더 해야됨
    const difDay = differenceInDays(end_date, start_date);
    
    
    
    console.log("slastYear : "+slastYear);
    console.log("elastYear : "+elastYear);
    console.log("difDay : "+difDay);


    // 지역 데이타 변수 
    const [areaCode,setAreaCode]=useState('12');
    const [sigunguCode,setSigunguCode]=useState('');
    const [cityname,setCityname]=useState('');
    
    const [categoryPlace1,setCategoryPlace1]=useState([]);  // 12 명소
    const [categoryPlace2,setCategoryPlace2]=useState([]);  // 39 음식점
    const [categoryPlace3,setCategoryPlace3]=useState([]);  // 38 쇼핑
    const [categoryPlace4,setCategoryPlace4]=useState([]);  // 15 행사/공연/축제
    const [categoryPlace5,setCategoryPlace5]=useState([]);  // 25 여행코스
    const [categoryPlace6,setCategoryPlace6]=useState([]);  // 28 레포츠
    const [categoryPlace7,setCategoryPlace7]=useState([]);  // 32 숙박  
    const [places, setPlaces] = useState([]);


    // API
    // 날씨 
    const API_KEY="hG2QkKkmuiN38w%2BeGu53VbRK%2BBNzKRpnjbLE%2BHDXZ0dHzgbBQ67K67NsuR5xOAs%2BErSqbSpOpk1UKBnj4dvlnA%3D%3D";       // 내꺼

    
    // // 일정 계획 데이타
    const [cityPlan,setCityPlan]=useState([]);
    const [cityPlan2,setCityPlan2]=useState([]);

    // URL
    // db city테이블 가져오는 거
    PlaceUrl=process.env.REACT_APP_SPRING_URL+"city/citydata?num="+num;

    // 날씨 api 받아오는 거   
     let weather_url=`https://apis.data.go.kr/1360000/AsosDalyInfoService/getWthrDataList?serviceKey=${API_KEY}&numOfRows=${days}&dataType=JSON&dataCd=ASOS&dateCd=DAY&startDt=${slastYear}&endDt=${elastYear}&stnIds=${num}`;
    // let weather_url=`https://apis.data.go.kr/1360000/AsosDalyInfoService/getWthrDataList?serviceKey=${API_KEY}&numOfRows=20&dataType=JSON&dataCd=ASOS&dateCd=DAY&startDt=20210101&endDt=20210501&stnIds=108`;
    
    // 관광도시 api 받아오는 거(arrange=P)
    let areaUrl = `http://api.visitkorea.or.kr/openapi/service/rest/KorService/areaBasedList?ServiceKey=${API_KEY}&areaCode=${areaCode}&numOfRows=20&arrange=R&MobileOS=ETC&MobileApp=AppTest&_type=json`;
    if(sigunguCode){  // 시군구 코드가 있는 도시이면
         areaUrl += `&sigunguCode=${sigunguCode}`;
     }

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
    

    const [location,setLocation]=useState('');  // 검색 input 지역 담는 변수
    const [w_data,setW_data]=useState([]);  // 날씨 데이터 담는 배열 변수
    const [weatherImg,setWeatherImg]=useState([]);
    const [w_use_data,setW_use_data]=useState([]);      // 사용하는 날씨 데이터 + 필요한 데이터 주입
    
 

 
    useEffect(() => {
        place_Data();
    }, [num]);
     const place_Data= async()=>{
        try {
            const response = await axios.get(PlaceUrl)
                setCityData(response);
                setAreaCode(response.data.area_code);
                setSigunguCode(response.data.sigungu_code);
                setCityname(response.data.name);
        }
        catch(err) {
            alert(err);
        }
    }
    // console.log('cityData',cityData);

    let trip_url=`${process.env.REACT_APP_SPRING_URL}city/tripdata?city_num=${city_num}&member_num=3`;     
     // 이거 url에 뜨는 값 가져오는건데 url에서 넘어오는 값이 그냥 num 밖에 없잖아,,... 넘겨줄 때 로그인한 사람 member_num도 같이 넘겨주면 바로 될 듯?
    
    console.log("start_date:",start_date);
    console.log("end_date:",end_date);
    console.log("days:",days);

    // axios multiple request   
    useEffect(()=>{
        axios
            .all([axios.get(trip_url), axios.get(areaUrl), axios.get(weather_url)])
            .then(
                axios.spread((res1, res2, res3) => {
                    setCityPlan(res1.data);
                    setCityPlan2(res1.data[0]);
                    setStart_date([res1.data[0].start_date]);  // 잘 들어가짐
                    setEnd_date([res1.data[0].end_date]);  // 잘 들어가짐
                    setDays([res1.data[0].days]);  // 잘 들어가짐


                    setPlaces(res2.data.response.body.items.item);
                    setCategoryPlace1(res2.data.response.body.items.item.filter((place, idx) => place.contenttypeid == '12' || place.contenttypeid == '14' ))
                    setCategoryPlace2(res2.data.response.body.items.item.filter((place, idx) => place.contenttypeid == '39'))
                    setCategoryPlace3(res2.data.response.body.items.item.filter((place, idx) => place.contenttypeid == '38'))
                    setCategoryPlace4(res2.data.response.body.items.item.filter((place, idx) => place.contenttypeid == '15'))
                    setCategoryPlace5(res2.data.response.body.items.item.filter((place, idx) => place.contenttypeid == '25'))
                    setCategoryPlace6(res2.data.response.body.items.item.filter((place, idx) => place.contenttypeid == '28'))
                    setCategoryPlace7(res2.data.response.body.items.item.filter((place, idx) => place.contenttypeid == '32'))


                    setW_data(res3.data.response.body.items.item);
                    setWeatherImg(res3.data.response.body.items.item);
                    // if (res3.data.response.body.items.item.iscs != '' || avgWs > 2 || sumRn != ''){
                    //     setW_use_data(...res3.data.response.body.items.item, `${process.env.PUBLIC_URL}/WeatherImage/흐림.png`)
                    // }
                    // setW_use_data(res3.data.response.body.items.item.filter((data,idx) => data == data.stnId || data == data.stnNm || data == data.maxTa || data == data.minTa || data == data.iscs || data == data.sumRn || data == data.avgWs || data == data.avgRhm || data == data.ddMes ))
                    
                    
                })
            )
            .catch((err) => console.log(err));
    },[num,areaUrl,weather_url])

    
    console.log("cityPlan : ",cityPlan);
    console.log("places : ",places);
    console.log("w_data : ",w_data);
    console.log("weather_url : ",weather_url);
    console.log("w_use_data : ",w_use_data);
    

    // const arr1 = [10,20,30];
    // const arr2 = [{1 : '가', 2 : '나', 3 : '다'},{4 : '라', 5 : '마', 6 : '바'},{7 : '사', 8 : '아', 9 : '자'}]
    // let arr3=[];

    // for (let i = 0; i < 3; i++){
    //     for(let j = 0; j < 4; j++){
    //         arr3[i][j]=[...arr2[i][j],arr1[i]];
    //     }
    // }

    // for (let i = 0; i < 3; i++){
    //     arr3[i]=[...arr2[i],arr1[i]];
    // }

    // for (let i = 0; i < 3; i++){
    //     for(let j = 0; j < 4; j++){
    //         if(i == 0){
    //             arr3[i]=arr1[i];
    //             arr3[i][j]+=arr2[i][j]

    //         }
    //     }
    // }
    
    // console.log("arr3 : "+arr3);

    // arr1 && arr1.map((item,index) => (
    //     arr2 && arr2.map((key,idx) => (
    //        arr3 = [arr1[index], ...arr2[idx]]
    //     )
    // )))





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
      
        <div>
            <img alt='' src={weatherImg}></img>
        </div>

            <div style={{display:'flex', marginBottom:'20px'}}>
                <div className='title'>
                    <b>
                        {cityname}
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
                <Link to={'/place/placedetail'} state={{state:{pcontentId}}}>춘식이를 눌러주세요</Link>
                {/* 날씨 */}
                <div id='weather-css'>
                    {
                        w_data && w_data.map((item,index) => (
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
                            naVi(`../plan/calendar/108`);
                        }}>내 일정 만들기</button>
                    <button type='button' className='btn scheduleBtn'>내 일정 더보기</button>
                </div>
                <b className='schedule-title'>내 여행 일정</b>
                <div className='schedule-big-box row'>
                    {
                        cityPlan && cityPlan.map((item, index) => (
                                <div className='schedule-box col-sm-4'>
                                    <h5>{item.name}&emsp;&emsp;&emsp;&emsp;&emsp;</h5>
                                    <b>[D - {differenceInDays(format(new Date(item.end_date), "yyyy-MM-dd"), format(new Date(item.start_date), "yyyy-MM-dd"))}]</b>&emsp;&nbsp;<b>{item.start_date != "" ? format(new Date(item.start_date), "yyyy-MM-dd") : format(new Date(item.start_date), "yyyy-MM-dd")}</b>&emsp;
                                    <span class="material-symbols-outlined view-weather" style={{fontSize:'15px'}}>sunny</span>
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
                                    <Tab label="관광명소12" value="12" />
                                    <Tab label="음식점39" value="39" />
                                    <Tab label="쇼 핑38" value="38" />
                                    <Tab label="문화시설 14" value="2" />
                                    <Tab label="레포츠 28" value="5" />
                                    <Tab label="행사/공연/축제 15" value="6" />
                                    <Tab label="숙 박 32" value="7" />
                                </TabList>
                            </Box>
                                <TabPanel value='12'>
                                    

                                        <div style={{display:'flex', marginTop:'20px'}}>
                                            <h3>총 ???개</h3>
                                            <div className='more-select' >
                                                <select>
                                                    <option>최신순</option>
                                                    <option>인기순</option>
                                                    <option>이름순</option>
                                                    <option>??순</option>
                                                </select>
                                            </div>
                                        </div>

                                        <div style={{display:'flex'}} className='row'>
                                            {
                                                categoryPlace1 && categoryPlace1.map((item, idx) => (
                                                    <div className='col-sm-3'>
                                                        
                                                        <Card value={item} sx={{width: 220, height: 300, marginRight: 12}} onClick={(e)=>{
                                                                    setPcontentId(e.target.value);
                                                                    naVi(`/place/placedetail/${item.contentid}`);
                                                                    console.log("pcontentId : "+pcontentId);
                                                                }}>
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
                                    {/* </div> 서브카테고리 div 닫는거 */}
                                </TabPanel>
                                <TabPanel value='39'>
                                    
                                        <div style={{display:'flex'}}>
                                            <div>총 ???개</div>
                                            <div className='more-select' >
                                                <select>
                                                    <option>최신순</option>
                                                    <option>인기순</option>
                                                    <option>이름순</option>
                                                    <option>??순</option>
                                                </select>
                                            </div>
                                        </div>

                                        <div style={{display:'flex'}} className='row'>
                                            {
                                                categoryPlace2 && categoryPlace2.map((item, idx) => (
                                                    <div className='col-sm-3'>
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
                                    {/* </div> 서브카테고리 div 닫는거 */}
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
                        <button type='button' onClick={()=>{naVi("/city/infomore")}}>+더보기</button>
                    </Box>
                    
                </div>
                {/* <div className='scheduleContainer'>
                    <div className='scheduleBtnBox'>
                        <button type='button' className='btn scheduleBtn' 
                            onClick={()=>{
                                naVi(`../plan/calendar/108`);
                            }}>내 일정 만들기</button>
                        <button type='button' className='btn scheduleBtn'>내 일정 더보기</button>
                    </div>
                    <b className='bb'>내 여행 일정</b>
                    {
                        cityPlan && cityPlan.map((item, index) => (
                            <div className='aa'>
                                <h5>{item.name}</h5>
                                <b>[D - ??]</b>&emsp;&nbsp;<b>{item.start_date}</b>&emsp;
                                <span class="material-symbols-outlined" style={{fontSize:'15px'}}>sunny<b>날씨보기</b></span>
                            </div>
                        ))

                    }
                </div> */}
            </div>
            
        </div>

    );
};

export default CityInfoMain;