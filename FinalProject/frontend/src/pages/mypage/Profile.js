import React, { useState,useRef, useEffect } from 'react';
import { useNavigate ,useParams} from "react-router-dom";
import axios from "axios";
import DaumPostcode from "react-daum-postcode";
import './profile.css';
import Avatar from 'react-avatar';




const Profile = () => {
    
 

    const {num,Currentpage}=useParams();

    //url
    let deleteUrl = process.env.REACT_APP_SPRING_URL + "mypage/delete";
    let profileUrl = process.env.REACT_APP_SPRING_URL + "mypage/profile";
    let photonameUrl =  process.env.REACT_APP_SPRING_URL + "mypage/photo";

    const getData=()=>{
        axios.get(profileUrl)
        .then(res=>{
            setDto(res.data.member);
            setImage(photoUrl + res.data.photo);
            
            console.log(res.data);
        })
        .catch(err => {
            alert(err);
        })

        // axios.get(photonameUrl).then(res=>{
        //     setImage(photoUrl + res.data);
        // })

       

        
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

        const [data, setData] = useState({}); //데이터 한번에 받을때 쓰는법 
        const [photo,setPhoto] = useState("https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png");
        const [Image, setImage] = useState("https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png")
        const fileInput = useRef(null)

        
        
        let pagelistUrl = process.env.REACT_APP_SPRING_URL + "mypage/pagelist" //?currentPage=" + currentPage;
        let photoUrl = process.env.REACT_APP_SPRING_URL + "save/";
        let uploadUrl=process.env.REACT_APP_SPRING_URL+"mypage/upload";
        
    
        //file change 시 호출 이벤트
        const uploadImage=(e)=>{
            const uploadFile=e.target.files[0];
            const imageFile=new FormData();
            //spring 에서 multipartfile로 받는 이름 
            imageFile.append("uploadFile",uploadFile);
    
            axios({
                method:'post',
                url:uploadUrl, //백앤드 url
                data:imageFile,
                headers:{'Content-Type':'multipart/form-data'}
            }).then(response=>{
                setPhoto(response.data); //백엔드에서 보내는 변경된 이미지명을 photo변수에 넣는다
            }).catch(err=>{
                alert(err);
            })
    
        }

        const onChange = (e) => {
            if(e.target.files[0]){
                    setPhoto(e.target.files[0])

                    const uploadFile=e.target.files[0];
                    const imageFile=new FormData();
                    //spring 에서 multipartfile로 받는 이름 
                    imageFile.append("uploadFile",uploadFile); 
            
                    axios({
                        method:'post',
                        url:uploadUrl, //백앤드 url
                        data:imageFile,
                        headers:{'Content-Type':'multipart/form-data'}
                    }).then(response=>{
                        setPhoto(response.data); //백엔드에서 보내는 변경된 이미지명을 photo변수에 넣는다
                    }).catch(err=>{
                        alert(err);
                    })
                }else{ 
                    //업로드 취소할 시
                    setImage("https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png")
                    return
                }
            //화면에 프로필 사진 표시
                const reader = new FileReader();
                reader.onload = () => {
                    if(reader.readyState === 2){
                        setImage(reader.result)
                    }
                }
                reader.readAsDataURL(e.target.files[0])
            }


    
     let updateUrl = process.env.REACT_APP_SPRING_URL + "mypage/update";
    
     const save=()=>{
        console.log(dto);
        // setDto({
        //     ...dto,
        //     file_name: photo
        // });
        axios.post(updateUrl,{'member': dto}).then(res=>{window.location.reload();})


        
    }

   

    
    return (
        <div>
            <div className="wrapper">
            <div className="container">
                <div className="top-background-div"></div>
                <div className="top-container">
                    <div className="profilePhotoContainer">
                        <div className="profilePhoto-text" id="profilePhote">

                        <Avatar 
                        src={Image} 
                        style={{margin:'20px',borderRadius:'10px'}} 
                        size={200} 
                        onClick={()=>{fileInput.current.click()}}>


                    </Avatar>


                    <input 
                        type='file' 
                        style={{display:'none'}}
                        accept='image/jpg,image/png,image/jpeg' 
                        name='profile_img'
                        onChange={onChange}
                        ref={fileInput}/>
                    
                        
                        </div>
                    </div>
                    <div className="text" style={{marginTop:'50px'}}><span id="userNickNameTop">{dto.id}</span></div>
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
                                <input type="text" id="userName" readonly="" placeholder={dto.name}/>
                            </div>

                            <div className="data">
                                <label>생년월일</label>
                                <input type="text" id="userEmailArea" readonly="" placeholder={dto.birthday}/>
                                     <b id="userEmailArea"></b>
                            </div>


                            <div className="data">
                                <label>전화번호</label>
                                <input type="text" id="userEmailArea" defaultValue={dto.tel}/>
                                     <b id="userEmailArea"></b>
                            </div>

                            <div className="data">
                                <label>이메일</label>
                                <input type="text" id="userEmailArea" defaultValue={dto.email}/>
                            </div>
                            <div className="data">
                                <label>주소</label>
                                <input type="text" id="userEmailArea"  defaultValue={dto.address1}/>
                                     <b id="userEmailArea"></b>
                            </div>

                            <div className="data">
                                <label>주소</label>
                                <input type="text" id="userEmailArea"  defaultValue={dto.address2}/>
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
                    <button className="btn-normal" id="saveUserInfo" onClick={save}>저장하기</button>
                    <button className="btn-normal" id="saveUserInfo">비밀번호 변경</button>
                </div>
            </div>
        </div>
            
    
    );
};

export default Profile;