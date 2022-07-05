import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../styles/join.css';

const LoginForm = () => {
    const [id,setId]=useState('');
    const [password,setPassword]=useState('');
    const navi=useNavigate();
    const REST_API_KEY = "c78ded458e4b18060e7a0d0868e70cd1";
    const REDIRECT_URI = "http://localhost:3000/oauth/kakao/callback";
    const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}&response_type=code`;
    
    const onSubmit=(e)=>{
        e.preventDefault();
        const url=process.env.REACT_APP_SPRING_URL+"/login";
        axios.post(url,{id,password})
        .then(res=>{
            if(res.data===0){
                alert("아아디 또는 비밀번호가 틀렸습니다")
            }else{
                localStorage.loginOk="yes";
                localStorage.myid=id;
                navi(-1);//새로고침
                
            }
        })
    }
    
    return (
        
        <div className="section_login">
            <form onSubmit={onSubmit}>
            <h3 className="tit_login">로그인</h3>
            <div className="write_form">

            <input type="text" name="" size="20" placeholder="아이디를 입력해주세요"
                onChange={(e)=>{
                    setId(e.target.value)
                }}/>
            <input type="password" name="" size="20" placeholder="비밀번호를 입력해주세요"
                onChange={(e)=>{
                    setPassword(e.target.value)
                }}/>



                <div className="login_search">
                <a className="link"  onclick="" href=''>
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
                   
            </form>
            </div>
           
           
                        
                 
    );
};

export default LoginForm;