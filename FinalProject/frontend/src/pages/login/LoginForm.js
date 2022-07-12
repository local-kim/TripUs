import axios from 'axios';
import React, { useState } from 'react';
import { Modal } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import '../../styles/join.css';
import { GoogleLogin } from 'react-google-login';
import { SearchId, SearchPass } from './index.js';

const LoginForm = () => {
   const [id,setId] = useState('')
   const [password,setPassword] = useState('')
   const [SearchId_modal,setSearchId_modal] = useState(false);
   const [SeachPass_modal,setSearchPass_modal] = useState(false);

   
    const [inputId, setInputId] = useState('')
    const [inputPw, setInputPw] = useState('')
 
    const handleInputId = (e) => {
        setInputId(e.target.value)
    }
 
    const handleInputPw = (e) => {
        setInputPw(e.target.value)
    }
    const navi=useNavigate();
    const REST_API_KEY = "c78ded458e4b18060e7a0d0868e70cd1";
    const REDIRECT_URI = "http://localhost:3000/oauth/kakao/callback";
    const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}&response_type=code`;
    
    // const onSubmit=(e)=>{
    //     e.preventDefault();
    //     const url=process.env.REACT_APP_SPRING_URL+"login";
    //     axios.post(url,{id,password})
    //     .then(res=>{
    //         if(res.data===0){
    //             alert("아아디 또는 비밀번호가 틀렸습니다")
    //         }else{
    //             localStorage.loginOk="yes";
    //             localStorage.myid=id;
    //             navi(-1);//새로고침
                
    //         }
    //     })
        
    // }
    const onClickLogin = (e) => {
        e.preventDefault();

        console.log('click login')
        console.log('ID : ', inputId)
        console.log('PW : ', inputPw)
        axios.post(process.env.REACT_APP_SPRING_URL+'member/process', null, {
            params: {
            'id': inputId,
            'password': inputPw
            }
        })
        .then(res => {
            console.log(res)
            if(res.data){
                alert("로그인 성공");
            }
            else{
                alert("로그인 실패");
            }
            // console.log('res.data.id :: ', res.data.id)
         
            // if(res.data.id === undefined){
            //     alert('입력하신 id 가 일치하지 않습니다.')
            // } else if(res.data.id === null){
            //     alert('입력하신 비밀번호 가 일치하지 않습니다.')
            // } else if(res.data.id === inputId) {
            //     // id, pw 모두 일치 userId = userId1
            //     console.log('======================','로그인 성공')
            //     sessionStorage.setItem('id', inputId)
            // }
       
            navi("/");
        })
        .catch(err => {
            alert(err);
        })
    }
        //로그인 성공했을 떄 처리 함수 
    
        const successGoogle = (response) => {
            console.log(response);
        }
        
        //로그인 실패했을 때 처리 함수 
        const failGoogle = (response) => {
            console.log(response);
        }
      
  
    return (
        
        <div className="section_login">
            <form onSubmit={onClickLogin}>
            <h3 className="tit_login">로그인</h3>
            <div className="write_form">

            <input type="text" name="" size="20" placeholder="아이디를 입력해주세요"
                value={inputId} onChange={handleInputId}/>
            <input type="password" name="" size="20" placeholder="비밀번호를 입력해주세요"
                 value={inputPw} onChange={handleInputPw}/>


             
                <div className="login_search">
                <a className="link"  href=''>
                아이디 찾기
                </a>
                <span className="bar"></span>
                <a className="link">
                비밀번호 찾기
                </a>
                </div>
             

            </div>
            <button className="btn_type1" type="submit">
            <span className="txt_type">로그인</span>
            </button>
           
            <button type='button' className="btn_type2 btn_member" onClick={()=>{
                console.log("hi");
                navi("/join");
            }} >
                <span className="txt_type">회원가입</span>
            </button>
           
                        <h1>
                        <a href={KAKAO_AUTH_URL}>Kakao Login</a>
                        </h1>
                        <div className="grid-naver" id='naverIdLogin'></div>
            <GoogleLogin
                clientId="362168925347-7h80oeftm2cub12235gac45dvhjo9fce.apps.googleusercontent.com"
                buttonText="Login"
                onSuccess={successGoogle}
                onFailure={failGoogle}
                cookiePolicy={'single_host_origin'}
            />
                   
            </form>
            </div>
           
           
                        
                 
    );
};

export default LoginForm;