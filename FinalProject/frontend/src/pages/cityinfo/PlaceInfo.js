import axios from 'axios';
import React, { useEffect,useRef,useState } from 'react';
import { useNavigate,useLocation, useParams} from 'react-router-dom';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import '../../styles/placeinfo.css';
import Rating from '@mui/material/Rating';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Ayong from '../../assets/images/IMG_1503.JPG';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Modal } from '@mui/material';



//kakao map
const { kakao } = window;

//modal style
const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 800,
  height:730,
  bgcolor: 'background.paper',
  //border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

const PlaceInfo=()=>{

       //CityInfoMain에서 Api contentId 받기 (pcontentId)  [126078]
      // const location = useLocation();
      //console.log("location",location.state.place); //contentId 받아온거
       //const CityInfoMainContendId = location.state.state.pcontentId;
    
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
    const contentId=126078; //임시 contentid 값 추후 cityInfo에서 contentid 넘겨받기 [ 광안리해수욕장 : 126078] [강화도 : 125502]
    const placeApikey="sRb6GSV%2FXAgOAdS%2FpBID9d0lsR8QfJ78C4bJYMZCu2MItPGIbX8JvFumAqXoFD61AoXODAxJdlrUaDwDavWlsg%3D%3D"; //내인증키
    //const placeApikey="YHbvEJEqXIWLqYGKEDkCqF7V08yazpZHKk3gWVyGKJpuhY5ZowEIwkt9i8nmTs%2F5BMBmSKWuyX349VO5JN6Tsg%3D%3D"; //현지언니 인증키
    //const placeApikey="7Et3sUoEnYoi9UiGk4tJayBnDo4ZMQ%2FM%2FOkEKTJMSjXkoukxdqrTDOu3WAzTgO5QsOTQOBSKfwMMuIbl8LyblA%3D%3D"; 일웅님 인증키
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
    const reviewtxtRef = useRef('');
    const reviewstarsRef = useRef('');

     const [refreshReview,setRefreshReview]=useState();
     const [avgStars,setAvgStars]=useState();
     const [place_id,setPlace_Id]=useState('');
     const [detailData,setDetailData]=useState('');
     const [detailData2,setDetailData2]=useState('');
     const [editDetailData,setEditDetailData]=useState('');
     //setPlace_Id(contentId);
     const [member_num,setMember_Num]=useState('');
     const [stars,setStars]=useState();
     const [content,setContent]=useState();
     const [filename,setFileName]=useState();
    // const [sta,setContent]=useState('');
    const [reviewData,setReviewData]=useState([]); //data 받아오기
    
    //Spring url선언
    let pagelistUrl=process.env.REACT_APP_SPRING_URL+"review/allreview?place_id="+contentId;
    let placeStarsAvgUrl=process.env.REACT_APP_SPRING_URL+"review/avgstars?place_id="+contentId;
    let insertUrl=process.env.REACT_APP_SPRING_URL+"review/insert";
    let deleteUrl=process.env.REACT_APP_SPRING_URL+"review/delete?num=";
    let detailUrl=process.env.REACT_APP_SPRING_URL+"review/detail?num=";
    let updateUrl=process.env.REACT_APP_SPRING_URL+"review/update";

    let uploadUrl=process.env.REACT_APP_SPRING_URL+"review/upload";
    let photoUrl=process.env.REACT_APP_SPRING_URL+"review_photo/";

     //file change 시 호출 이벤트
     const uploadImage=(e)=>{
      const uploadFile=e.target.files[0];
      const imageFile = new FormData();
      imageFile.append("uploadFile",uploadFile);// spring의 @RequestParam으로 들어감


      axios({
          method: 'post',
          url: uploadUrl,
          data: imageFile,
          headers: {'Content-Type': 'multipart/form-data'}
        }).then(res => {  // json 형식의 response를 받음
          setFileName(res.data); // 백엔드에서 보낸 변경된 이미지명을 photo 변수에 넣는다
        }).catch(err => {
          alert(err);
        });
      }

    //ReviewList 호출
    const pageList=()=>{

        axios.get(pagelistUrl).then(res=>{
        // if(res.data.length===0){
            // setReviewData("후기가 없습니다 작성해주시길바랍니다.");
            // alert("x");
        // }else{
            setReviewData(res.data);

          // }
        // console.log(res.data);
        })
        .catch(err => {
            alert(err);
        }) 
    }

        //Review insert
        const writeReview=(e)=>{
          //e.preventDefault();
          axios.post(insertUrl,{place_id:contentId,member_num,stars,content}).then(res=>{ 
              alert("성공");
              pageList();
              setStarsValue("");
              setRefreshReview("");
            }).catch(err => {
              alert(err);
            })
          }


    //ReviewAvgStars 호출
    const AvgStars=()=>{
      axios.get(placeStarsAvgUrl).then(res=>{
        setAvgStars(res.data);
      }).catch(err => {
        alert("별0",err);
    })
    }

        //삭제시 호출할 함수
        const onDelete=(num)=>{
          if(window.confirm("정말 삭제하시겠습니까?")){
          
          axios.delete(deleteUrl+num).then(res=>{
            alert("삭제되었습니다.");
            if(open===true){
              handleClose();
              pageList();
            }else{
              pageList();
            }
          })
        }
           }

           //modal mui
           const [open, setOpen] = React.useState(false);
           const [updateModalOpen,setUpdateModalOpen] = React.useState(false);
          

          // const handleOpen = () =>
           const handleClose = () =>{ setOpen(false);  }
           const edithandleClose = () =>{setUpdateModalOpen(false);}

         //상세보기 호출할 함수
         const onDetail=(num)=>{
          axios.get(detailUrl+num).then(res=>{
                if(res.file_name ===null){
                setDetailData(res.data);
                console.log("notfile_name:",res.data);  
              }
              else{
              setDetailData(res.data);
              console.log("detail->",res.data);
            }
              setOpen(true);
             
          })
         }

         const [updateStarsValue, setUpdateStarsValue] = React.useState('0');

         //수정상세보기 호출함수
         const onEditReviewDetail=(num)=>{
      
          axios.get(detailUrl+num).then(res=>{
            setEditDetailData(res.data);
            setUpdateStarsValue(res.data.stars);
            console.log("editdetail:",res.data); //호출
            console.log("editdetailnum형태:",res.data.num);
            //이름 , num
            setUpdateModalOpen(true);
           
        })
      }

         //수정하는 함수 이벤트
         const onUpdate=(num)=>{
          axios.post(updateUrl,{num, stars, content}).then(res=>{
            alert("수정완료");
            setUpdateModalOpen(true);
            onDetail(num);
            pageList();
          })
         }

    useEffect(() => {
       kakaomapscript();
      // requiredimgscript();
    });

    useEffect(()=>{
     pageList();
     AvgStars();
    },[]);

    //modal
    

    // const requiredimgscript = () =>{

    //   var i3 = document.getElementById("uploadimgalt").style.visibility="visible"; 
    // }


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
            center: new kakao.maps.LatLng(placey, placex),
            //center: new kakao.maps.LatLng(35.1591243474,129.1603078991),
            //new kakao.maps.LatLng(y좌표,x좌표)
            level: 2
        };
        
        const map = new kakao.maps.Map(container, options);
    
        //마커가 표시 될 위치
        let markerPosition = new kakao.maps.LatLng(placey, placex);

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
                    {/* <p>{reviewData}</p> */}
                    {reviewData.length == 0 ? "x" : ""}
                    {
                      reviewData&&reviewData.map((row,idx)=>(
                        <div style={{display:'flex',borderBottom:'1px solid gray',margin:'10px'}} >

                        <div style={{flexDirection:'column',justifyContent:'center'}}>
                          <div>
                         <img src={Ayong} alt='ganzi' style={{width:'50px',height:'50px',borderRadius:'25px'}}/>
                          </div>
                          <div style={{marginTop:'5px'}}>
                          {row.name}
                          </div>
                          </div>  
                          <div style={{display:'flex',flexDirection:'column',marginLeft:'15px'}}>
                          <div style={{backgroundColor:'white',height:'50px',width:'600px',padding:'5px 0px 0px 5px'}} onClick={()=>{onDetail(row.num);}}>
                       {row.content}
                       </div>
                       <div style={{display:'inline-flex',height:'30px',marginTop:'5px'}}>
                        <div style={{flexGrow:'3'}}>
                        {row.created_at}&nbsp;&nbsp;&nbsp;
                       <Rating name="read-only" value={row.stars} readOnly size="small" precision={0.5} />&nbsp;({row.stars}점)
                       </div>
                       <div style={{flexGrow:'0',marginRight:'10px'}}>
                       <span style={{cursor:'pointer'}} onClick={()=>{onEditReviewDetail(row.num);}}>수정</span>
                       &nbsp;&nbsp;|&nbsp;&nbsp;
                       <span className='myreviewDelete' style={{cursor:'pointer'}} onClick={()=>{
                        onDelete(row.num);
                       }}>삭제</span>
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
                    {/* <Rating name="half-rating-read" defaultValue={avgStars} precision={0.1} readOnly/>{avgStars} */}
                    <i className="fa-solid fa-star" style={{color:'#faaf00'}}></i>&nbsp;&nbsp;{avgStars}<br/>
                    <i className="fa-solid fa-heart" style={{color:'#E2264D'}}></i>&nbsp;&nbsp;{liked}
                </div>
            </div>
            <br/>

            <div className='stars'>
            <Box sx={{'& > legend': { mt: 2 },}}>

              <Typography component="legend">{member_num}</Typography> 
              
              <Rating
                name="half-rating" className='mystar'
                value={starsvalue} precision={0.5}
                onChange={(event, newValue) => {
                  setStarsValue(newValue);
                  setStars(newValue);
                }}/> 
                
                {/*imgfile */}
                <label for="file">
                  <div class="btn-upload"><i class="fa-solid fa-image"></i></div>
                  </label>
                  <input type='file' name='upload' accept='image/*' multiple onChange={uploadImage} id="file" />
                  {/* <i class="fa-solid fa-image"> <input type='file' name='upload' accept='image/*' multiple onChange={uploadImage}/> </i> */}
                  <p>{filename}</p>
                     <img src={photoUrl+filename} style={{width:'120px',marginLeft:'130px'}} alt= "1" />
          </Box> 
             </div> 
            <div className='place_review_write'>
            
                <textarea placeholder='50글자내로 작성해주세요🥕' className='review' value={refreshReview} onChange={(e)=>{setContent(e.target.value);}}></textarea>
                <button type='button' className='btn_review_write' onClick={writeReview}>글쓰기</button>
            </div>


             {/* 상세보기 */}

            <div>
                  <Modal
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                  >
                    <Box sx={style}>
                      <Typography id="modal-modal-title" variant="h6" component="h2">
                      <div style={{display:'inline-flex',width:'450px',justifyContent:'left'}}>
                        <div>
                          <img src={Ayong} alt="프로필사진" style={{width:'50px',height:'50px',borderRadius:'25px'}}/>
                      </div>

                        <div style={{marginLeft:'10px',fontSize:'16px'}}>
                          <div>
                          <label>{detailData.name}</label>
                          </div>

                          <div style={{display:'inline-flex'}}>
                        <label>{placeTitle}</label>&nbsp;/&nbsp;
                        <label>{detailData.created_at}</label>&nbsp;/&nbsp;
                        </div>
                       <Rating name="read-only" ref={reviewstarsRef} value={detailData.stars} readOnly size="small" precision={0.5} style={{marginTop:'5px'}}/>
                        </div>
                      </div>
                      </Typography>

                      <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                      <div style={{justifyContent:'center',display:'flex'}}>
                      <img src={detailData.file_name?photoUrl+detailData.file_name:{Ayong}} alt={detailData.file_name} style={{width:'300px'}} />
                      </div>
                      <div style={{justifyContent:'center',display:'flex'}}>
                         <pre style={{width:'400px',height:'180px',border:'1px solid #aaaaaa'}} >{detailData.content}</pre>
                      </div>

                      <div style={{justifyContent:'center',display:'inline-flex'}}>
                         <button type='button' className='btn btn-default' style={{border:'1px solid gray'}} onClick={()=>{onEditReviewDetail(detailData.num);}}>수정</button>&nbsp;&nbsp;
                         <button type='button' className='btn btn-default' style={{border:'1px solid gray'}} onClick={()=>{
                        onDelete(detailData.num);
                       }}>삭제</button>
                      </div>
                      </Typography>
                    </Box>
                  </Modal>
                </div>
              


                <div>
                
                  <Modal
                    open={updateModalOpen}
                    onClose={edithandleClose}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                  >
                    <Box sx={style}>
                      <Typography id="modal-modal-title" variant="h6" component="h2">
                      <div style={{display:'inline-flex',width:'450px',justifyContent:'left'}}>
                        <div>
                          <img src={Ayong} alt="프로필사진" style={{width:'50px',height:'50px',borderRadius:'25px'}}/>
                      </div>

                        <div style={{marginLeft:'10px',fontSize:'16px'}}>
                          <div>
                          <label>{editDetailData.name}</label>
                          </div>

                          <div style={{display:'inline-flex'}}>
                        <label>{placeTitle}</label>&nbsp;/&nbsp;
                        <label>{editDetailData.created_at}</label>&nbsp;/&nbsp;
                        </div>
                       {/* <Rating name="read-only" defaultValue={editDetailData.stars}  size="small" precision={0.5} style={{marginTop:'5px'}}/> */}
                       <Rating name="half-rating" className='updatestar' defaultValue={updateStarsValue} precision={0.5}
                          onChange={(event, newValue) => {
                            setStars(newValue);
                          }}/> 
                        </div>
                      </div>
                      </Typography>

                      <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                      <div style={{justifyContent:'center',display:'flex'}}>
                      <img src={detailData.file_name===''?{Ayong}:photoUrl+detailData.file_name} alt={detailData.file_name} style={{width:'300px'}} />
                      </div>
                      <div style={{justifyContent:'center',display:'flex'}}>
                         <textarea style={{width:'400px',height:'180px',border:'1px solid #aaaaaa'}} defaultValue={editDetailData.content} onChange={(e)=>{
                          setContent(e.target.value);
                         }}></textarea>
                      </div>

                      <div style={{justifyContent:'center',display:'inline-flex'}}>
                         <button type='button' className='btn btn-default' style={{border:'1px solid gray'}} onClick={()=>{
                          onUpdate(editDetailData.num);
                         }}>수정완료</button>

                         {/*imgfile */}
                <label for="file">
                  <div class="btn-upload"><i class="fa-solid fa-image"></i></div>
                  </label>
                  <input type='file' name='upload' accept='image/*' multiple onChange={uploadImage} id="file" />
                  {/* <i class="fa-solid fa-image"> <input type='file' name='upload' accept='image/*' multiple onChange={uploadImage}/> </i> */}
                      </div>
                      </Typography>
                    </Box>
                  </Modal>
                </div>
        </div>
        </div>
    );
}

export default PlaceInfo;