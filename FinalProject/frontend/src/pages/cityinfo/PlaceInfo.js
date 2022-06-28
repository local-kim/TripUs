    import axios from 'axios';
    import React, { useEffect,useState } from 'react';
    import { useNavigate,useLocation } from 'react-router-dom';
    import Box from '@mui/material/Box';
    import Tab from '@mui/material/Tab';
    import TabContext from '@mui/lab/TabContext';
    import TabList from '@mui/lab/TabList';
    import TabPanel from '@mui/lab/TabPanel';
    import '../../styles/placeinfo.css';

    //kakao map
    const { kakao } = window;

    const PlaceInfo=()=>{

        //mui
        const [value, setValue] = React.useState('1');

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
        const [cattypename,setCattypename]=useState();

        console.log("let cat1:",cat1name,"let cat2:",cat2name,"let cat3:",cat3name);

        // 사진이 있는 장소만 받는 url(arrange=P)
         let apiUrl=`http://api.visitkorea.or.kr/openapi/service/rest/KorService/detailCommon?ServiceKey=YHbvEJEqXIWLqYGKEDkCqF7V08yazpZHKk3gWVyGKJpuhY5ZowEIwkt9i8nmTs%2F5BMBmSKWuyX349VO5JN6Tsg%3D%3D&contentId=${contentId}&defaultYN=Y&mapinfoYN=Y&addrinfoYN=Y&firstImageYN=Y&catcodeYN=Y&MobileOS=ETC&MobileApp=AppTest&_type=json`;
         let apiUrl2=`http://api.visitkorea.or.kr/openapi/service/rest/KorService/categoryCode?ServiceKey=YHbvEJEqXIWLqYGKEDkCqF7V08yazpZHKk3gWVyGKJpuhY5ZowEIwkt9i8nmTs%2F5BMBmSKWuyX349VO5JN6Tsg%3D%3D&cat1=${cat1name}&cat2=${cat2name}&cat3=${cat3name}&MobileOS=ETC&MobileApp=AppTest&_type=json`;

        //후기 작성
        const [photo,setPhoto]=useState('');
        const [subject,setSubject]=useState('');
        const [content,setContent]=useState('');

        //url선언
        // let uploadUrl=process.env.REACT_APP_SPRING_URL+"board/upload";
        // let insertUrl=process.env.REACT_APP_SPRING_URL+"board/insert";
        // let photoUrl=process.env.REACT_APP_SPRING_URL+"save/";

        //이미지 업로드 이벤트
        // const imageUpload=(e)=>{
        //     const uploadFile=e.target.files[0]; //
        //     const imageFile=new FormData();
        //     imageFile.append("uploadFile",uploadFile);

        //     axios({
        //         method:'post',
        //         url:uploadUrl,
        //         data:imageFile,
        //         headers:{'Content-Type':'multipart/form-data'}
        //     }).then(res=>{
        //         console.log(res.data);
        //         setPhoto(res.data);
        //     })
        //      }

        //submit 이벤트
        // const onBoardInsert=(e)=>{
        //     e.preventDefault();

        //     axios.post(insertUrl,{id,photo,subject,content}).then(res=>{navi("/board/list/1");})
        // }

    useEffect(() => {
           kakaomapscript();
        });

        //kakomap + tourapi3
        const kakaomapscript = () => {
            
            const container = document.getElementById('myMap');

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
            setCattypename(servicetypecodename);

        }).catch((err) => {
        
        });
        
        return (
            <div style={{display:'flex',margin:'0 auto',justifyContent:'center'}}>

                <Box sx={{ width: 'inherit', typography: 'body1' }}>
                <TabContext value={value}>
                <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>

                <TabList onChange={handleChange} aria-label="lab API tabs example">
                <Tab label="Map" value="1" />
                <Tab label="Picture" value="2" />
                {/* <Tab label="Item Three" value="3" /> */}
            </TabList>
            </Box>

            <TabPanel value="1">
            <div id='myMap' style={{
                width: '700px',
                height: '500px'
            }}>
            </div>
            </TabPanel>
            <TabPanel value="2">Item Two</TabPanel>
            {/* <TabPanel value="3">Item Three</TabPanel> */}
        </TabContext>
        </Box>
            <div style={{display:'flex',flexDirection:'column',marginLeft:'10px'}}>
                <div style={{display:'inline-flex'}}>
                    <img src={placeImg} alt={placeTitle} style={{widht:'100px',height:'100px'}}/>
            
                    <div style={{marginLeft:'15px',textAlign:'left'}}>
                        <h3>PlaceName : {placeTitle}</h3>
                        <i className="fa-solid fa-map-location-dot"></i>&nbsp;&nbsp;{placeAddr}<br/>
                        {cattypename}
                    </div>
                </div>
                <div style={{display:'inline-flex',marginTop:'13px',textAlign:'left'}}>
                    <textarea placeholder='50글자내로 작성해주세요🥕' onChange={(e)=>{setReview(e.target.value);}} style={{width:'400px',height:'100px'}}>{review}</textarea>
                    <button type='submit' style={{marginLeft:'10px'}}>글쓰기</button>
                </div>
            </div>
            </div>
        );
    }

    export default PlaceInfo;