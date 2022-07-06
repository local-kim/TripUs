import React, {useEffect, useState} from 'react';
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
import cityinfoImg from '../../assets/images/IMG_1503.JPG';
import { Link, useNavigate, useParams } from 'react-router-dom';
import CityInfoImage from './CityInfoImage';
import CityInfoMore from './CityInfoMore';


const CityInfoMain = () => {
    const navi=useNavigate();

    //////////////////////////////관광명소 api contentId 받아오기
     const pcontentId=126078; //2360786
    // const pnavi =useNavigate();
    // const [pid,setPid]=useState();
    // setPid(contentId);


    //////////////////////////////// MUi 메뉴 탭
    const [value, setValue] = useState("1");
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
    

    /////////////////////////////// Mui 스타일 변수
    const muiStyle={
        margin:"0 auto",
        width:"1092px",
        typography:"body1"
    }
   

    ////////////////////////////// 수동 데이타

    const naVi=useNavigate();
    const [data,setData]=useState(['1','2','3','4','5','6']);
    const [data2,setData2]=useState([
        {
            subject: "냥이로 떠나는 여행",
            D_day: 1,
            day: "2022-06-30" 
        },{
            subject: "멍이로 떠나는 여행",
            D_day: 20,
            day: "2022-07-19" 
        },{
            subject: "그냥 떠나는 여행",
            D_day: 120,
            day: "2022-10-29" 
        }
    ])


    /////////////////////////////// 날씨 지역번호 가져오기
    const [wthNum,setWthNum]=useState([]);
    let PlaceUrl;
    const {num}=useParams();    // url에서 num 데이터 가져오기
    const [weatherImg,setWeatherImg]=useState('../../../public/WeatherImage/맑음.png');

    useEffect(() => {
        PlaceUrl=process.env.REACT_APP_SPRING_URL+"cityinfo/weather?num="+num;
        // console.log(wthPlaceUrl);
        place_Data();
    }, [num]);
    const place_Data=()=>{
        // const data = await axios({
        //     method: 'get',
        //     url: PlaceUrl
        // })
        //     console.log(data);
        //     setWthNum(data);
        axios.get(PlaceUrl)
        .then(res => {
            //console.log(res.data);
            setWthNum(res.data);            
        })
        .catch(err => {
            alert(err);
        })
    }

    
    ////////////////////////////////////////일정 계획 데이타
    // const [trip_id,setTrip_id]=useState('');
    // let trip_url;
    // useEffect(() => {
    //     trip_url=process.env.REACT_APP_SPRING_URL+"cityinfo/trip?id="+id;
    //     // console.log(wthPlaceUrl);
    //     trip_data();
    // }, [id]);

    // // db에서 num 데이터 가져오기
    
    // // const num = 1;
   

    // const trip_data=()=>{
    //     axios.get(trip_url)
    //     .then(res => {
    //         console.log(res.data);
    //         setTrip_id(res.data);            
    //     })
    //     .catch(err => {
    //         alert(err);
    //     })
    // }
    

    ///////////////////////////////////////////////////////////// 날씨 API
    const [stnId,setStnId]=useState('');
    const [stnNm,setStnNm]=useState('');
    const [maxTa,setMaxTa]=useState('');
    const [minTa,setMinTa]=useState('');
    const [iscs,setIscs]=useState('');
    // api key

    // const API_ID="pN8sverBEceulMUULSyvZ";
    // const API_KEY="QWZmBxA43k5EL7jQRyF5gMWtHEXBAgmpBjVXmgfh";

    //const API_KEY="eeb9140b1a18675f963cf17ab2081baf";     //openweathermap 사이트 APIKEY
    const API_KEY="hG2QkKkmuiN38w%2BeGu53VbRK%2BBNzKRpnjbLE%2BHDXZ0dHzgbBQ67K67NsuR5xOAs%2BErSqbSpOpk1UKBnj4dvlnA%3D%3D";       // 내꺼
    //const API_KEY="YHbvEJEqXIWLqYGKEDkCqF7V08yazpZHKk3gWVyGKJpuhY5ZowEIwkt9i8nmTs%2F5BMBmSKWuyX349VO5JN6Tsg%3D%3D"; // 누군가꺼


    // url
    const weather_url=`https://apis.data.go.kr/1360000/AsosDalyInfoService/getWthrDataList?serviceKey=${API_KEY}&numOfRows=2&dataType=xml&dataCd=ASOS&dateCd=DAY&startDt=20210703&endDt=20210704&stnIds=${wthNum.num}`       // 기상청 과거데이터 다됨
    //const weather_url=`https://api.openweathermap.org/data/2.5/forecast/daily?q=${location}&cnt=3&appid=${API_KEY}`         // 최대예측 16일까지 일일데이터 (유료)
    //const weather_url=`https://api.openweathermap.org/data/2.5/forecast?q=${location}&appid=${API_KEY}`             // 5일간 3시간 간격
    //const weather_url=`https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${API_KEY}`            // 현재 날씨
    //const weather_url=`https://pro.openweathermap.org/data/2.5/forecast/hourly?q=${location}&appid=${API_KEY}`    // 4일간 예측 (유료)
    //const weather_url=`https://api.aerisapi.com/conditions/summary/${location}?format=json&from=&to=&client_id=${API_ID}&client_secret=${API_KEY}`
    
    
    const [location,setLocation]=useState('');  // 검색 input 지역 담는 변수
    const [result,setResult]=useState([]);  // 날씨 데이터 담는 배열 변수

    // const [img,setImg]=useState('');
    // const [startDt,setStartDt]=useState('20210703');
    // const [endDt,setEndDt]=useState('20210705');
    // const [days,setDays]=useState(3);
    

    // const {name}=useParams('');
    // console.log(name);
    // let placeNameUrl=process.env.REACT_APP_SPRING_URL+"cityinfo/placename?name="+name;

    // const changeLocal = () =>{
    //     axios.get(placeNameUrl, name)
    //     .then(res=>{
    //         if(res.name === location){
    //             res.
    //         }
    //     })
    // }

    console.log(weather_url);


    // // 날씨 데이타 가져오기
    // const Weather_Data = async (e)=>{
    //     const w_data = await axios.get(weather_url)
    //     try {
    //         //console.log([w_data.response.body.items.item]);
    //         setResult(w_data.response.body.items.item);
    //     }
    //     catch(err) {
    //         //console.log(err.w_data);
    //     }
    // }
    // useEffect(() => {
    //     Weather_Data();
    // },[])
    //console.dir(result);
    //////////이미지로 변환하는 방법
    // if (result.data.weather[0].main === "Clouds"){
    //     setImg('../public/WeatherImage/비.png');
    // console.log(img);

    //////////////////////////////////////////////////////// 지역 데이타 가져오기
    // const [areaCode,setAreaCode]=useState('');
    // const [sigunguCode,setSigunguCode]=useState('');
    // const [category,setCategory]=useState('');
    // const [categoryPlace1,setCategoryPlace1]=useState([]);
    // const [categoryPlace2,setCategoryPlace2]=useState([]);
    // const [categoryPlace3,setCategoryPlace3]=useState([]);
    // const [places, setPlaces] = useState([]);
    

    // 추천 장소 url(arrange=P)
    // let areaUrl = `http://api.visitkorea.or.kr/openapi/service/rest/KorService/areaBasedList?ServiceKey=${API_KEY}&areaCode=${areaCode}&numOfRows=10&arrange=B&MobileOS=ETC&MobileApp=AppTest&_type=json`;
    // if(sigunguCode){  // 시군구 코드가 있는 도시이면
    //     areaUrl += `&sigunguCode=${sigunguCode}`;
    // }

    // useEffect(() => {
    //     // 추천 장소 : 처음 렌더링 시
    //       axios.get(areaUrl)
    //       .then((res) => {
    //         console.dir(res.data.response.body.items.item);
    //         setPlaces(res.data.response.body.items.item);
    //         // setCategoryPlace(res.data.response.body.items.item);
    //       }).catch((err) => {
    //         console.log(err.data);
    //       });
    // }, []);



    // // 섞여서 나오니까 각각 맞는 카테고리에 해당되는거 넣는거
    // // 카테고리 필터링
    // useEffect(() => {
    //     // if(category == ''){
    //     // setCategoryPlace(places);
    //     // return;
    //     // }
    //     if(category == 12){ // 관광지, 문화시설
    //     console.log(category);
    //     setCategoryPlace1(places.filter((place, index) => place.contenttypeid == '12' || place.contenttypeid == '14'));
    //     console.log(categoryPlace1);
    //     }
    //     else if(category == 39){  // 음식점
    //     // console.log(category);
    //     setCategoryPlace2(places.filter((place, index) => place.contenttypeid == '39'));
    //     // console.log(categoryPlace2);
    //     }
    //     else{ // 쇼핑
    //     // console.log(category);
    //     setCategoryPlace3(places.filter((place, index) => place.contenttypeid == '38'));
    //     // console.log(categoryPlace3);
    //     }
    // }, [category, places]); // 값이 바뀔 때마다 랜더링




    /////////////////////////////////// 스크롤 내리기
    // // 선택한 장소를 dayPlan에 추가
    // const addPlace = (place) => {
    //     // setDayPlan([
    //     // ...dayPlan,
    //     // place
    //     // ]);
    // }
    
    return (
        <div id='cityinfo' style={muiStyle} >
       <Link to={'/place/placedetail'} state={{state:{pcontentId}}}>춘식이를 눌러주세요</Link>


            <div style={{display:'flex', marginBottom:'20px'}}>
                <div className='title'>
                    <b>{wthNum.name}</b>
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
                {
                    Object.keys(result).length !== 0 && (
                        <div className='weather-css'>
                            <div className='city'>{result.data.stnNm}</div>
                            <div className='temperature-max'>{result.data.maxTa}도</div>
                            <div className='temperature-min'>{result.data.minTa}도</div>
                            <div className='sky'>{result.data.iscs.equals[1]}</div>
                        </div>
                    )
                }
            </div>
            
            <div style={{display:'flex', marginTop:'50px'}}>
                <div>
                    <Box>
                        <TabContext value={value} >
                            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                                <TabList onChange={handleChange} aria-label="lab API tabs example">
                                    <Tab label="관광명소12" value="1" />
                                    <Tab label="음식점39" value="2" />
                                    <Tab label="쇼 핑38" value="3" />
                                    <Tab label="더보기" value="4" />
                                </TabList>
                            </Box>
                                <TabPanel value="1">
                                    <div style={{display:'flex'}} className='row'>
                                        {
                                            data && data.map((item, idx) => (
                                                <div className='col-sm-4'>
                                                    <Card value={item} sx={{ width: 220, height: 300, marginRight: 2 }}>
                                                        <CardActionArea>
                                                            <CardMedia
                                                            component="img"
                                                            height="150"
                                                            image={cityinfoImg}
                                                            alt=""
                                                            />
                                                            <CardContent>
                                                            <Typography gutterBottom variant="h7" component="div">
                                                                명소
                                                            </Typography>
                                                            <Typography variant="h7" color="red">
                                                                내용
                                                            </Typography>
                                                            </CardContent>
                                                        </CardActionArea>
                                                        <CardActions>
                                                            <Button className='clipBtn' size="small" color="primary">
                                                                111
                                                            </Button>
                                                        </CardActions>
                                                    </Card>
                                                </div>
                                            ))
                                        }
                                    </div>
                                    <button type='button' className='btn btn-muted moreBtn' 
                                        onClick={()=>{
                                            naVi("../city/infomore")
                                        }}>????개 더보기</button>
                                </TabPanel>
                                <TabPanel value="2">
                                    <div style={{display:'flex'}} className='row'>
                                        {
                                            data && data.map((item, idx) => (
                                                <div className='col-sm-4'>
                                                    <Card value={item} sx={{ width: 220, height: 300, marginRight: 2 }}>
                                                        <CardActionArea>
                                                            <CardMedia
                                                            component="img"
                                                            height="150"
                                                            image={cityinfoImg}
                                                            alt=""
                                                            />
                                                            <CardContent>
                                                            <Typography gutterBottom variant="h7" component="div">
                                                                음식점
                                                            </Typography>
                                                            <Typography variant="h7" color="red">
                                                                내용
                                                            </Typography>
                                                            </CardContent>
                                                        </CardActionArea>
                                                        <CardActions>
                                                            <Button className='clipBtn' size="small" color="primary">
                                                                222
                                                            </Button>
                                                        </CardActions>
                                                    </Card>
                                                </div>
                                            ))
                                        }
                                    </div>
                                    <button type='button' className='btn btn-muted moreBtn' 
                                        onClick={()=>{
                                            naVi("../city/infomore")
                                        }}>????개 더보기</button>
                                </TabPanel>
                                <TabPanel value="3">
                                    <div style={{display:'flex'}} className='row'>
                                        {
                                            data && data.map((item, idx) => (
                                                <div className='col-sm-4'>
                                                    <Card value={item} sx={{ width: 220, height: 300, marginRight: 2 }}>
                                                        <CardActionArea>
                                                            <CardMedia
                                                            component="img"
                                                            height="150"
                                                            image={cityinfoImg}
                                                            alt=""
                                                            />
                                                            <CardContent>
                                                            <Typography gutterBottom variant="h7" component="div">
                                                                쇼핑
                                                            </Typography>
                                                            <Typography variant="h7" color="red">
                                                                내용
                                                            </Typography>
                                                            </CardContent>
                                                        </CardActionArea>
                                                        <CardActions>
                                                            <Button className='clipBtn' size="small" color="primary">
                                                                333
                                                            </Button>
                                                        </CardActions>
                                                    </Card>
                                                </div>
                                            ))
                                        }
                                    </div>
                                    <button type='button' className='btn btn-muted moreBtn' 
                                        onClick={()=>{
                                            naVi("../city/infomore")
                                        }}>????개 더보기</button>
                                </TabPanel>
                                {/* <div className='place-list'>
                                    {
                                        [1,2,3].map((item)=>(
                                            <div>
                                                {
                                                    // TODO: 끝까지 스크롤하면 장소 더 불러오기
                                                    // places && places.map((place, index) => (
                                                    categoryPlace{item} && categoryPlace{item}.map((place, index) => (
                                                        (categoryPlace{item}.length - 1 == index) ? (
                                                            <div className='place-list-item' key={index} ref={ref}>
                                                            <PlaceItem place={place} addPlace={addPlace}/>
                                                            <button type='button' className='edit-btn btn btn-light btn-sm' onClick={() => addPlace(place)}>+</button>
                                                            </div>
                                                        ) : (
                                                            <div className='place-list-item' key={index}>
                                                            <PlaceItem place={place} addPlace={addPlace}/>
                                                            <button type='button' className='edit-btn btn btn-light btn-sm' onClick={() => addPlace(place)}>+</button>
                                                            </div>
                                                        )
                                                    ))
                                                }
                                            </div>                                                
                                        ))
                                    }
                                </div> */}
                        </TabContext>
                    </Box>
                    
                </div>
                <div className='scheduleContainer'>
                    <div className='scheduleBtnBox'>
                        <button type='button' className='btn scheduleBtn' 
                            onClick={()=>{
                                naVi("../plan/calendar")
                            }}>내 일정 만들기</button>
                        <button type='button' className='btn scheduleBtn'>내 일정 더보기</button>
                    </div>
                    <b className='bb'>내 여행 일정</b>
                    {
                        data2 && data2.map((item) => (
                            <div className='aa'>
                                <h5>{item.subject}</h5>
                                <b>[D - {item.D_day}]</b>&emsp;&emsp;<b>{item.day}</b>
                            </div>
                        ))

                    }
                </div>
            </div>
            
        </div>

    );
};

export default CityInfoMain;