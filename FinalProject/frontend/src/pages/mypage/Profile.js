import React, { useState,useRef, useEffect } from 'react';
import { useNavigate ,useParams} from "react-router-dom";
import axios from "axios";
import DaumPostcode from "react-daum-postcode";
import './profile.css';





const Profile = () => {
    
 

    const {num,Currentpage}=useParams();

    //url
    let deleteUrl = process.env.REACT_APP_SPRING_URL + "mypage/delete";
    let profileUrl = process.env.REACT_APP_SPRING_URL + "mypage/profile";
    

    const getData=()=>{
        axios.get(profileUrl)
        .then(res=>{
            setDto(res.data);
            console.log(res.data);
        })
        .catch(err => {
            alert(err);
        })

    }

        useEffect(()=>{
            getData();
        },[]);



    const [dto,setDto] =useState('');
    const navi=useNavigate();




  

        const deleteUser=()=>{
            axios.get(deleteUrl)
            .then(res=>{
                
                setDto(res.data);

                if (window.confirm("정말 삭제합니까?")) {
        
                    alert("삭제되었습니다.");
                    
                    window.location.replace("/")
                    
              
                  } else {
              
                    alert("취소합니다.");
              
                  }
            })
            .catch(err => {
                alert(err);
            })
        }


   

    
    return (
        <div>
            <div className="wrapper">
            <div className="container">
                <div className="top-background-div"></div>
                <div className="top-container">
                    <div className="profilePhotoContainer">
                        <div className="profilePhoto-text" id="profilePhote">a</div>
                    </div>
                    <div className="text"><span id="userNickNameTop">{dto.id}</span></div>
                    <div className="small-text">님의 프로필</div>
                </div>
                <div className="flex-container">
                    <div className="form-container">
                        <div className="py-4">
                            <div className="section-title-container">
                                <h5 style={{marginBottom: "8px"}}><b>기본정보</b></h5>
                            </div>
                            <div className="data">
                                <label>이름</label>
                                <input type="text" id="userName" placeholder={dto.name}/>
                            </div>

                            <div className="data">
                                <label>생년월일</label>
                                <input type="text" id="userEmailArea" readonly="" placeholder={dto.birthday}/>
                                     <b id="userEmailArea"></b>
                            </div>


                            <div className="data">
                                <label>전화번호</label>
                                <input type="text" id="userEmailArea" readonly="" placeholder={dto.tel}/>
                                     <b id="userEmailArea"></b>
                            </div>

                            <div className="data">
                                <label>이메일</label>
                                <input type="text" id="userEmailArea" placeholder={dto.email}/>
                            </div>
                            <div className="data">
                                <label>주소</label>
                                <input type="text" id="userEmailArea" readonly="" placeholder={dto.address1 + dto.address2}/>
                                     <b id="userEmailArea"></b>
                            </div>

                        </div>
                        <span id="resultAreaForPwd"><div className="flex-container">
                        <div className="form-container">
                        {/* <div className="section-title-container">
                            <h5 style={{marginBottom: "8px"}}><b>비밀번호</b></h5>
                        </div>
                        <div className="data">
                            <label>비밀번호</label>
                            <input type="password" id="userPwd" required=""/>
                        </div>
                        <div className="data">
                            <label>새 비밀번호</label>
                            <input type="password" id="newPassword" required=""/>
                        </div>
                        <div className="data">
                            <label>새 비밀번호 확인</label>
                            <input type="password" id="newPasswordConfirm" required=""/>
                        </div> */}
                        <span id="differentPassMsg"></span>
                        </div>
                    </div></span>
                   
                    </div> 
                    </div>
                </div>

                    <div className="divider-container">
                    <div className="divider"></div>
                </div> 
                <div className="flex-container p-2">
                    <button className="btn-quit" id="deleteUserBtn" onClick={deleteUser}>회원탈퇴</button>
                </div>
                <div className="flex-container p-5">
                    <button className="btn-normal" onClick={()=>{navi("/mypage")}}>취소하기</button>
                    <button className="btn-normal" id="saveUserInfo">저장하기</button>
                    <button className="btn-normal" id="saveUserInfo">비밀번호 변경</button>
                </div>
            </div>
        </div>
            
    
    );
};

export default Profile;


