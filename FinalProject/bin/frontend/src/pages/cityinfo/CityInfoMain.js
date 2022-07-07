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

const CityInfoMain = () => {


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
        weatherData();
    }, [num]);
    const weatherData=()=>{
        // const data = await axios({
        //     method: 'get',
        //     url: wthPlaceUrl
        // })
        //     console.log(data);
        //     setWthNum(data);
        axios.get(PlaceUrl)
        .then(res => {
            console.log(res.data);
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
    // }, [num]);

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
    

    /////////////////////////////////////////// 날씨 API
    // const [stnId,setStnId]=useState('');
    // const [stnNm,setStnNm]=useState('');
    // const [maxTa,setMaxTa]=useState('');
    // const [minTa,setMinTa]=useState('');
    // const [iscs,setIscs]=useState('');
    // api key

    // const API_ID="pN8sverBEceulMUULSyvZ";
    // const API_KEY="QWZmBxA43k5EL7jQRyF5gMWtHEXBAgmpBjVXmgfh";

    //const API_KEY="eeb9140b1a18675f963cf17ab2081baf";     //openweathermap 사이트 APIKEY
    const API_KEY="hG2QkKkmuiN38w%2BeGu53VbRK%2BBNzKRpnjbLE%2BHDXZ0dHzgbBQ67K67NsuR5xOAs%2BErSqbSpOpk1UKBnj4dvlnA%3D%3D";       // 기상청 APIKEY

    // url
    //const weather_url=`https://api.openweathermap.org/data/2.5/forecast/daily?q=${location}&cnt=3&appid=${API_KEY}`         // 최대예측 16일까지 일일데이터 (유료)
    //const weather_url=`https://api.openweathermap.org/data/2.5/forecast?q=${location}&appid=${API_KEY}`             // 5일간 3시간 간격
    //const weather_url=`https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${API_KEY}`            // 현재 날씨
    //const weather_url=`https://pro.openweathermap.org/data/2.5/forecast/hourly?q=${location}&appid=${API_KEY}`    // 4일간 예측 (유료)
    const weather_url=`https://apis.data.go.kr/1360000/AsosDalyInfoService/getWthrDataList?serviceKey=${API_KEY}&numOfRows=2&dataType=xml&dataCd=ASOS&dateCd=DAY&startDt=20210703&endDt=20210704&stnIds=${wthNum.num}`       // 기상청 과거데이터 다됨
    //const weather_url=`https://api.aerisapi.com/conditions/summary/${location}?format=json&from=&to=&client_id=${API_ID}&client_secret=${API_KEY}`
    
    const [location,setLocation]=useState('');
    const [result,setResult]=useState([]);
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


    // 날씨 데이타 가져오기
    const searchEngin = async (e)=>{
        const data = await axios.get(weather_url)
        try {
            console.log(data);
            setResult(data);
        }
        catch(error) {
            alert(error);
        }
    }
    useEffect(() => {
        searchEngin();
    },[])
    //////////이미지로 변환하는 방법
    // if (result.data.weather[0].main === "Clouds"){
    //     setImg('../public/WeatherImage/비.png');
    // console.log(img);

    ////////////////////////////////////지역 데이타 가져오기
    
    
    return (
        <div id='cityinfo' style={muiStyle} >
       <Link to={'/place/placedetail'} state={{state:{pcontentId}}}>춘식이를 눌러주세요</Link>


            <div style={{display:'flex', marginBottom:'20px'}}>
                <div className='title'>
                    <b>{data.name}</b>
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
                        <div className='weatherCss'>
                            <div className='city'>{result.data.stnNm}</div>
                            <div className='temperature'>{result.data.maxTa}도</div>
                            <div className='temperature'>{result.data.minTa}도</div>
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
                                    <Tab label="관광명소" value="1" />
                                    <Tab label="음식점" value="2" />
                                    <Tab label="쇼 핑" value="3" />
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
                                </TabPanel>
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