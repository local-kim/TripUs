import React, { useEffect, useState, useRef } from "react";
import './Mypage2.css';
import { NavLink } from 'react-router-dom';
import { useNavigate, useParams} from "react-router-dom";
import axios from "axios";
import Avatar from "react-avatar";

const Mypage = () => {
    const navi=useNavigate();
    const [photo,setPhoto] = useState("https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png");
    const [dto,setDto] =useState('');
    const[memberList,setMemberList]=useState([]);
    
    //데이타 가져오는 함수
    const list=()=>{
        let url="http://localhost:9001/mypage"


        axios.get(url)
        .then(res=>{
            //스프링으로부터 받아온 List를 MemberList에 넣기
            setMemberList(res.data);
            
        })
    }

    //처음 랜더링시 딱 한번 데이타 가져오기
    useEffect(()=>{
       // console.log("list");
    list();

    },[]);


    let mypageUrl = process.env.REACT_APP_SPRING_URL+"mypage/profile";
    let photonameUrl =  process.env.REACT_APP_SPRING_URL + "mypage/photo";
    

    const getData=()=>{
        axios.get(mypageUrl)
        .then(res=>{
            setDto(res.data.member);
            // setPhoto(res.data.photo);
            setImage(photoUrl + res.data.photo);
            
        })
        .catch(err => {
            alert("getdata");
        })

        // axios.get(photonameUrl).then(res=>{
        //     setImage(photoUrl + res.data);
        // })

    }

    useEffect(()=>{
        getData();
    },[]);


    
    const [data, setData] = useState(''); //데이터 한번에 받을때 쓰는법 
  
    // 현재 페이지 번호
    const {currentPage} = useParams();  //useparams = requestparam = currentpage 이거 뽑아온다  ㅇㅋ 
  
    // 시작시 호출되는 함수
    const pageList = () => {
      axios.get(pagelistUrl)
      .then(res => {
        setData(res.data);
      })
      .catch(err => {
        alert("pagelist");
      });
    }
  
    useEffect(() => {
      pageList();
    }, [currentPage]); //currentPage가 변경될때마다 다시 호출 
  
    // url
    let pagelistUrl = process.env.REACT_APP_SPRING_URL + "mypage/pagelist" //?currentPage=" + currentPage;
    let photoUrl = process.env.REACT_APP_SPRING_URL + "save/";
    let uploadUrl=process.env.REACT_APP_SPRING_URL+"mypage/upload";
    let insertUrl =process.env.REACT_APP_SPRING_URL+"mypage/insert";   
    let updateUrl = "http://localhost:9001/shop/update";
    let detailUrl="http://localhost:9001/shop/detail";




      




        const [Image, setImage] = useState("https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png")
        const fileInput = useRef(null)
        

    return (
        <div>
        <div style={{margin:'0', padding:'0', outline:'0', boxSizing:'border-box'}}>
          
           <div className="wrapper">
            <div className="container">
                <div className="top-background-div"></div>
                <div className="top-container">
                    
                    <Avatar 
                        src={Image} 
                        style={{margin:'20px'}} 
                        size={200} 
                        onClick={()=>{fileInput.current.click()}}>


                    </Avatar>


                        {/* <div className="profilePhoto-text" id="profilePhote">a</div> */}
               

                    <div className="text">{dto.id}</div>
                    <button className="btn-normal"  onClick={()=>{navi("/mypage/profile")}}>프로필 수정</button>
                </div>
                <div>
                    <div className="row">
                        <div className="index-section">
                            <div className="index-circle">
                                <h5>
                                    <b>나의 일정</b>
                                </h5>
                                <div>
                                    <h2 style={{lineHeight: "1", fontWeight: "700"}} id="myPlan">{data.totalCount}</h2>
                                </div>
                            </div>
                            <div className="index-circle">
                                <h5>
                                    <b>나의 리뷰</b>
                                </h5>
                                <div>
                                    <h2 style={{lineHeight: "1", fontWeight: "700"}}  id="myReview">{data.totalCount2}</h2>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="container uk-container-large" id="mypageData">
                <div className="uk-padding-small">
                    <div className="section-title-container">
                        <h3 className="section-title"><b>나의 일정</b></h3>
                    </div>
                    <span id="resultArea"><div style={{margin:"16px 0 "}}>
        <div className="uk-card uk-card-default uk-grid-collapse uk-grid" style={{padding:"16px"}} uk-grid="">
            <div className="uk-width-1-3@m uk-first-column">
                <div className="uk-grid" uk-grid="" style={{margin: "0" , height: "60%"}}>
                    <div className="uk-width-1-2 info-container uk-first-column">
                        <img className="width:100%" src="https://myro.co.kr/myro_image/city/jeju.jpg" alt="" />
                        <div className="d-day-circle">D-8</div>
                        <div className="share-circle" id="sharedLogo_idx_0" style={{display:"none"}}>공유</div>
                    </div>
                    <div className="uk-width-1-2 info-container">
                        <div className="travel-title">JEJU</div>
                        <div className="uk-text-meta">
                            대한민국 제주도
                        </div>
                        <div className="uk-text-meta" style={{fontSize:"12px", marginTop:"8px"}}>
                            khk8300@naver.com
                        </div>
                        <div className="info-container" style={{marginTop: "40px"}}>
                            <div  style={{
                                      display: "flex",
                                    justifyContent: "center",
                                    alignItems:"center",
                                    width:"50px",
                                    height:"50px",
                                    borderRadius:"50%",
                                    backgroundColor: "#717171",
                                    color: "#fff",
                                    fontWeight: "700"}}>
                                L
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="uk-width-2-3@m">
                <div className="uk-grid uk-grid-stack" uk-grid="" style={{margin:"0" , height: "60%"}}>
                    <div className="uk-width-expand@m uk-first-column" style={{padding: "16px"}}>
                        <div className="uk-grid" uk-grid="" style={{margin:"0", height: "50%"}}>
                            <div className="uk-width-1-2 info-container-top uk-first-column">
                                <div className="small-title" >
                                    여행이름
                                    <div className="uk-inline">
                                        

                                        <input className="
                                                uk-input
                                                uk-form-blank
                                                uk-form-width-medium
                                                small-text
                                            " type="text" placeholder="여행이름" id="inputTravelName_idx_0" value="" style={{width:'150px'}}/>

                                        <a className="uk-form-icon uk-form-icon-flip uk-icon" uk-icon="icon: file-edit"  id="inputTravelNameBtn_idx_0"><svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill="none" stroke="#000" d="M18.65,1.68 C18.41,1.45 18.109,1.33 17.81,1.33 C17.499,1.33 17.209,1.45 16.98,1.68 L8.92,9.76 L8,12.33 L10.55,11.41 L18.651,3.34 C19.12,2.87 19.12,2.15 18.65,1.68 L18.65,1.68 L18.65,1.68 Z"></path><polyline fill="none" stroke="#000" points="16.5 8.482 16.5 18.5 3.5 18.5 3.5 1.5 14.211 1.5"></polyline></svg></a>
                                    </div>                        
                                </div>
                            </div>
                            <div className="
                                    uk-width-1-2
                                    info-container-top
                                ">
                                <div className="small-title">
                                    최종수정

                                    <span className="small-text" style={{
                                            lineHeight: "40px "}}>
                                        2022.6.29
                                    </span>
                                </div>
                            </div>
                        </div>
                        <div className="uk-grid" uk-grid="" style={{margin: "0", height: "50%"}}>
                            <div className="uk-width-1-2 info-container-bottom uk-first-column">
                                <div className="small-title">
                                    여행일자

                                    <span className="small-text">
                                        2022.7.8-2022.7.9
                                    </span>
                                </div>
                            </div>
                            <div className="
                                    uk-width-1-2
                                    info-container-bottom
                                ">
                                <div className="small-title">
                                    선택장소

                                    <span className="small-text">
                                        10
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="uk-grid uk-grid-stack" uk-grid="" style={{margin: "0", height: "40%"}}>
                    <div className="uk-width-expand@m info-container uk-first-column">
                        <div className="
                                uk-text-center
                                uk-grid
                                uk-width-1-1
                                uk-padding-small
                            " uk-grid="">
                            <div className="uk-width-1-4 uk-first-column">
                                <div>
                                    <button className="
                                            uk-button
                                            uk-button-large
                                            uk-card-default
                                        " id="modifySavedRoute_idx_0">
                                        일정 수정
                                    </button>
                                </div>
                            </div>
                            <div className="uk-width-1-4">
                                <div className="uk-inline">
                                    <button className="
                                            uk-button
                                            uk-button-large
                                            uk-card-default
                                        " type="button" aria-expanded="false">
                                        일정표
                                    </button>
                                    <div uk-dropdown="mode: click" className="uk-dropdown">
                    
                                    </div>
                                </div>
                            </div>
                            <div className="uk-width-1-4">
                                <div>
                                    <button className="
                                            uk-button
                                            uk-button-large
                                            uk-card-default
                                        " uk-toggle="target:#modal-center_idx_0"  aria-expanded="false">
                                        일정 공유
                                    </button>
                                </div>
                            </div>
                            <div className="uk-width-1-4">
                                <div>
                                    <button className="
                                            uk-button
                                            uk-button-large
                                            uk-card-default
                                        " id="deleteSavedBtn_0" >
                                        삭제
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div id="modal-center_idx_0" className="uk-flex-top uk-modal" uk-modal="">
            <div className="
                    uk-modal-dialog
                    uk-modal-body
                    uk-margin-auto-vertical
                ">
                {/* <button className="uk-modal-close-default uk-icon uk-close" type="button" uk-close=""><svg width="14" height="14" viewBox="0 0 14 14" xmlns="http://www.w3.org/2000/svg"><line fill="none" stroke="#000" stroke-width="1.1" x1="1" y1="1" x2="13" y2="13"></line><line fill="none" stroke="#000" stroke-width="1.1" x1="13" y1="1" x2="1" y2="13"></line></svg></button> */}

                    <div className="uk-text-center uk-grid uk-width-1-1 uk-padding-small uk-grid-stack" uk-grid="">
                        <div className="uk-width-1-2">
                            <div>
                                {/* <button id="kakaoLinkBtn_idx_0" className="
                                        uk-button
                                        uk-button-large
                                        uk-card-default
                                        mypage-share-button
                                    ">
                                    카카오톡 공유
                                </button> */}
                            </div>
                        </div>
                        <div className="uk-width-1-2">
                            <div>
                                {/* <button className="
                                        uk-button
                                        uk-button-large
                                        uk-card-default
                                        mypage-share-button
                                    " uk-toggle="target: #modal-send-email_idx_0" aria-expanded="false">
                                    이메일 전송 공유
                                </button> */}
                            </div>
                        </div>
                    </div>

                    {/* <table className="uk-table">
                        <caption>
                            공유된 친구
                        </caption>
                        <thead>
                            <tr>
                                <th>닉네임</th>
                                <th>ID or EMAIL</th>
                                
                                <th>관리</th>
                            </tr>
                        </thead>

                        <tbody id="sharedEmailList_idx_0">
                            
                        </tbody>
                    </table> */}
                </div>
            </div>
        </div>
        

        <div id="modal-send-email_idx_0" class="uk-flex-top uk-modal" uk-modal="">
            <div class="
                    uk-modal-dialog
                    uk-modal-body
                    uk-margin-auto-vertical
                ">
                {/* <button class="uk-modal-close-default uk-icon uk-close" type="button" uk-close=""><svg width="14" height="14" viewBox="0 0 14 14" xmlns="http://www.w3.org/2000/svg"><line fill="none" stroke="#000" stroke-width="1.1" x1="1" y1="1" x2="13" y2="13"></line><line fill="none" stroke="#000" stroke-width="1.1" x1="13" y1="1" x2="1" y2="13"></line></svg></button> */}
            </div>
        </div>
    </span>
                </div>            

                <div class="info-container p-5">
                    <button class="btn-normal" onClick={()=>{navi("/")}}>홈으로 가기</button>
                </div>
            </div>
        </div>
    
    </div>
    </div>
        
    );
};

export default Mypage;

