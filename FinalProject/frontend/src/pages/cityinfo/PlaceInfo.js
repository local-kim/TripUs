import axios from 'axios';
import React, { useEffect,useState } from 'react';
import { useNavigate,useLocation } from 'react-router-dom';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import '../../styles/placeinfo.css';
import Rating from '@mui/material/Rating';
import Typography from '@mui/material/Typography';
import Ayong from '../../assets/images/IMG_1503.JPG';



//kakao map
const { kakao } = window;

const PlaceInfo=()=>{

    //stars rating

    //mui
    const [value, setValue] = React.useState('1');
    const [starsvalue, setStarsValue] = React.useState('0');
   
    const [isChecked, setIsChecked] = useState(false);
    const [liked,setLiked]=useState(0);

     const handleChecked = (event) => {

        setIsChecked(event.target.checked);

        if(!isChecked){
       alert("좋아요+1");
       setLiked(liked+1);
       console.log("liked value:",liked);
    }else{
        alert("좋아요-1");
        setLiked(liked-1);
        console.log("-liked value:",liked);
    }
     };
   

    //tab화면전환시 지도 출력        
    const handleChange = (event, newValue) => {
    setValue(newValue);
    if(newValue==='1'){
    return kakaomapscript();
    }
    };

    //지도api & 관광지 api 
    const contentId=126078; //임시 contentid 값 추후 cityInfo에서 contentid 넘겨받기 126078
    //const placeApikey="sRb6GSV%2FXAgOAdS%2FpBID9d0lsR8QfJ78C4bJYMZCu2MItPGIbX8JvFumAqXoFD61AoXODAxJdlrUaDwDavWlsg%3D%3D"; 내인증키
    const placeApikey="YHbvEJEqXIWLqYGKEDkCqF7V08yazpZHKk3gWVyGKJpuhY5ZowEIwkt9i8nmTs%2F5BMBmSKWuyX349VO5JN6Tsg%3D%3D";
    const [placeTitle, setPlaceTitle] = useState();
    const [placeAddr, setPlaceAddr] = useState();
    const [placeImg,setPlaceImg]= useState();

    const [cat1name,setCat1name] =useState();
    const [cat2name,setCat2name] = useState();
    const [cat3name,setCat3name] =useState();
    const [cattypename,setCattypename]=useState();

    //console.log("let cat1:",cat1name,"let cat2:",cat2name,"let cat3:",cat3name); 대/중/소 분류

    // 사진이 있는 장소만 받는 url(arrange=P)
     let apiUrl=`http://api.visitkorea.or.kr/openapi/service/rest/KorService/detailCommon?ServiceKey=${placeApikey}&contentId=${contentId}&defaultYN=Y&mapinfoYN=Y&addrinfoYN=Y&firstImageYN=Y&catcodeYN=Y&MobileOS=ETC&MobileApp=AppTest&_type=json`;
     let apiUrl2=`http://api.visitkorea.or.kr/openapi/service/rest/KorService/categoryCode?ServiceKey=${placeApikey}&cat1=${cat1name}&cat2=${cat2name}&cat3=${cat3name}&MobileOS=ETC&MobileApp=AppTest&_type=json`;



    //review
     const [review,setReview]=useState();
     const [avgStars,setAvgStars]=useState(0);
    // const [content,setContent]=useState('');
    // const [sta,setContent]=useState('');
    const [reviewData,setReviewData]=useState([]); //data 받아오기
    


    //Spring url선언
    let pagelistUrl=process.env.REACT_APP_SPRING_URL+"review/allreview?place_id="+contentId;
    let placeStarsAvgUrl=process.env.REACT_APP_SPRING_URL+"review/avgstars?place_id="+contentId;
    // let uploadUrl=process.env.REACT_APP_SPRING_URL+"board/upload";
    // let insertUrl=process.env.REACT_APP_SPRING_URL+"board/insert";
    // let photoUrl=process.env.REACT_APP_SPRING_URL+"save/";

    //ReviewList 호출
    const pageList=()=>{
        axios.get(pagelistUrl).then(res=>{
            setReviewData(res.data);
        })
        .catch(err => {
            alert(err);
        })
    }

    //ReviewAvgStars 호출
    const AvgStars=()=>{
      axios.get(placeStarsAvgUrl).then(res=>{
        console.log("palceStarsAvgUrl:",res.data);
        setAvgStars(res.data);
      }).catch(err => {
        alert(err);
    })
    }

    useEffect(() => {
       kakaomapscript();
       
    });

    useEffect(()=>{
      pageList();
     AvgStars();
    },[]);

    //kakomap + tourapi3
    const kakaomapscript = () => {
        
        const container = document.getElementById('place_map');

        axios.get(apiUrl)
        .then((res) => {
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
        let markerPosition = new kakao.maps.LatLng(37.6473759,126.8376361);

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

        //console.log("apiUrl2",res.data.response.body.items.item); 대/중/소분류 axios
        const api2data=res.data.response.body.items.item;
        const servicetypecodename=api2data.name;
        setCattypename(servicetypecodename);

    }).catch((err) => {
    
    });
    
    return (
        <div className='place_info'>

            <Box sx={{ width: 'inherit', typography: 'body1' }}>
            <TabContext value={value}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>

            <TabList onChange={handleChange} aria-label="lab API tabs example">
            <Tab label="Map" value="1" />
            <Tab label="Review" value="2" />
            {/* <Tab label="Item Three" value="3" /> */}

            </TabList>
            </Box>
        
            <TabPanel value="1">
                <div id='place_map'>
                </div>
            </TabPanel>
            <TabPanel value="2">
                 <div style={{width:'700px',height:'500px',display:'flex'}}>
                  <div>
                    {
                      reviewData&&reviewData.map((row,idx)=>(
                        <div style={{display:'flex',borderBottom:'1px solid gray',margin:'10px'}}>
                        <div style={{flexDirection:'column',justifyContent:'center'}}>
                          <div>
                         <img src={Ayong} alt='ganzi' style={{width:'50px',height:'50px',borderRadius:'25px'}}/>
                          </div>
                          <div style={{marginTop:'5px'}}>
                          {row.name}
                          </div>
                          </div>  
                          <div style={{display:'flex',flexDirection:'column',marginLeft:'15px'}}>
                          <div style={{backgroundColor:'white',height:'50px',width:'600px',padding:'5px 0px 0px 5px'}}>
                       {row.content}
                       </div>
                       <div style={{display:'inline-flex',height:'30px',marginTop:'5px'}}>
                        <div style={{flexGrow:'3'}}>
                        {row.created_at}&nbsp;&nbsp;&nbsp;
                       <Rating name="read-only" value={row.stars} readOnly size="small" precision={0.5} />&nbsp;({row.stars}점)
                       </div>
                       <div style={{flexGrow:'0',marginRight:'10px'}}>
                       <span>수정</span>&nbsp;&nbsp;|&nbsp;&nbsp;<span>삭제</span>
                       </div>
                       </div></div>
                      </div>
                      ))

                    }
                  </div>
                </div> 
            </TabPanel>
                {/* <TabPanel value="3">Item Three</TabPanel> */}
            </TabContext>
            </Box>
        
            <div className='place_all_data'>
            <div className='place_sub_data'>
                {/* <img src={placeImg} alt={placeTitle} className='place_img'/> */}
        
                <div className='place_img_name_type'>

                    <div style={{display:'inline-flex',marginBottom:'13px'}}>
                    <span style={{fontSize:'30px',fontWeight:'bold'}}>{placeTitle}</span>
                    
                    <div id="main-content">
                    <input type="checkbox" id="checkbox"  checked={isChecked} onChange={handleChecked} value={liked}/>
                    <label for="checkbox" id="heartlabel">
  <svg id="heart-svg" viewBox="467 392 58 57" xmlns="http://www.w3.org/2000/svg">

    <g id="Group" fill="none" fill-rule="evenodd" transform="translate(467 392)">
      <path d="M29.144 20.773c-.063-.13-4.227-8.67-11.44-2.59C7.63 28.795 28.94 43.256 29.143 43.394c.204-.138 21.513-14.6 11.44-25.213-7.214-6.08-11.377 2.46-11.44 2.59z" id="heart" fill="#AAB8C2"/>
      <circle id="main-circ" fill="#E2264D" opacity="0" cx="29.5" cy="29.5" r="1.5"/>

        {/* 하트 클릭시 나오는 폭죽 */}
      <g id="grp7" opacity="0" transform="translate(7 6)">
        <circle id="oval1" fill="#9CD8C3" cx="2" cy="6" r="2"/>
        <circle id="oval2" fill="#8CE8C3" cx="5" cy="2" r="2"/>
      </g>

      <g id="grp6" opacity="0" transform="translate(0 28)">
        <circle id="oval1" fill="#CC8EF5" cx="2" cy="7" r="2"/>
        <circle id="oval2" fill="#91D2FA" cx="3" cy="2" r="2"/>
      </g>

      <g id="grp3" opacity="0" transform="translate(52 28)">
        <circle id="oval2" fill="#9CD8C3" cx="2" cy="7" r="2"/>
        <circle id="oval1" fill="#8CE8C3" cx="4" cy="2" r="2"/>
      </g>

      <g id="grp2" opacity="0" transform="translate(44 6)">
        <circle id="oval2" fill="#CC8EF5" cx="5" cy="6" r="2"/>
        <circle id="oval1" fill="#CC8EF5" cx="2" cy="2" r="2"/>
      </g>

      <g id="grp5" opacity="0" transform="translate(14 50)">
        <circle id="oval1" fill="#91D2FA" cx="6" cy="5" r="2"/>
        <circle id="oval2" fill="#91D2FA" cx="2" cy="2" r="2"/>
      </g>

      <g id="grp4" opacity="0" transform="translate(35 50)">
        <circle id="oval1" fill="#F48EA7" cx="6" cy="5" r="2"/>
        <circle id="oval2" fill="#F48EA7" cx="2" cy="2" r="2"/>
      </g>

      <g id="grp1" opacity="0" transform="translate(24)">
        <circle id="oval1" fill="#9FC7FA" cx="2.5" cy="3" r="2"/>
        <circle id="oval2" fill="#9FC7FA" cx="7.5" cy="2" r="2"/>
      </g>
    </g>
  </svg>
</label>
</div>
</div>

                    <p style={{fontSize:'14px',margin:'0 auto'}}>{cattypename}</p>
                    <i className="fa-solid fa-map-location-dot" style={{color:'#1976d2'}}></i>&nbsp;&nbsp;{placeAddr}<br/>
                    {/*별점 좋아요수 */}
                    <i className="fa-solid fa-star" style={{color:'#faaf00'}}></i>&nbsp;&nbsp;{avgStars}<br/>
                    <i className="fa-solid fa-heart" style={{color:'#E2264D'}}></i>&nbsp;&nbsp;{liked}
                </div>
            </div>
            <br/>

            <div className='stars'>
            <Box
            sx={{
    '& > legend': { mt: 2 },
  }}
>
   <Typography component="legend">Stars</Typography> 
   <Rating
    name="half-rating"
    value={starsvalue} precision={0.5}
    onChange={(event, newValue) => {
      setStarsValue(newValue);
      alert(newValue); 
    }}/> 
 </Box> 
             </div> 
            <div className='place_review_write'>
            
                <textarea placeholder='50글자내로 작성해주세요🥕' className='review'onChange={(e)=>{setReview(e.target.value)}}/>
                <button type='submit' className='btn_review_write'>글쓰기</button>
            </div>

                   {/* 상세보기 */}
          <div style={{width:'500px',height:'800px',backgroundColor:'white',display:'flex'}}>
              <div style={{display:'flex'}}>

                <div>
              <img src={Ayong} alt="프로필사진" style={{width:'50px',height:'50px',borderRadius:'25px'}}/>
              </div>

                <div style={{marginLeft:'10px'}}>
                  <div>
                <label>단춘식</label>
                  </div>
                  <div>
                <label>2022-06-30</label>
                <label>🌟🌟🌟</label>
                </div>
                </div>

              </div>

              <div style={{justifyContent:'row'}}>
              <img src={Ayong} alt="프로필사진"/>
              </div>
              <div>
                  <input tye='text' value= {review} style={{width:'400px',height:'180px'}}/>
              </div>
              <div style={{justifyContent:'center'}}>
                <button type='button' className='btn btn-default' style={{border:'1px solid gray'}}>수정</button>
                <button type='button' className='btn btn-default' style={{border:'1px solid gray'}}>삭제</button>
              </div>
          </div>
        
        </div>
        </div>
    );
}

export default PlaceInfo;