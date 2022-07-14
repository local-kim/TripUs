import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../styles/join.css';
import kakao_icon from '../../assets/images/kakao_icon.png';
import naver_icon from '../../assets/images/naver_icon.png';
import google_icon from '../../assets/images/google_icon.png';
import { GoogleLogin } from 'react-google-login';
import { useDispatch } from 'react-redux';
import { login } from '../../modules/auth';

const LoginFormTest = () => {

   // redux
  const dispatch = useDispatch();
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
   let loginUrl = `${process.env.REACT_APP_SPRING_URL}auth/login`;
   

   const onClickLogin = (e) => {
       e.preventDefault();

       // console.log('click login')
       // console.log('ID : ', inputId)
       // console.log('PW : ', inputPw)

       axios.post(loginUrl, {id: inputId, password: inputPw})
       .then(res => {
         console.log(res.data);
         localStorage.setItem('jwtToken', res.data.token); // 로컬 스토리지에 토큰 저장
         dispatch(login(res.data)); // redux에 로그인 유저 정보 저장
         navi(-1);
       })
       .catch(err => {
         // console.log(err);
         alert("아이디 또는 비밀번호가 일치하지 않습니다.");
         // input 초기화
         setInputId('');
         setInputPw('');
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
    <div className='container'>
      <form onSubmit={onClickLogin}>
        <div className='text'>LOGIN</div>
        <div className='small_text'>나만의 여행 플래너 - TRIP:US</div>
     
      <div className='form_container'>
        <div className='data'>
          <label>아이디</label>
          <input type="text" id="LoginId" value={inputId} onChange={handleInputId}required></input>
        </div>
        <div className='data'>
          <label>비밀번호</label>
          <input type="text" id="LoginPass" value={inputPw} onChange={handleInputPw} required></input>
        </div>
        <div className='forgot_pass'>
          <a href='/findPassword'>비밀번호를 잊으셨나요?</a>
        </div>
        <div className='btn'>
          <button type='submit' id='loginBtn'>로그인</button>
        </div>
        <div className='signup_link'>
          회원이 아니세요?
          <a href="auth/join">회원가입하기</a>
        </div>
      </div>
      <div className='divider_container'>
        <div className='divider'></div>
        <span>or</span>
      </div>
      <div className='sns_text'>SNS 간편 로그인</div>
      <div className='socialBtn-container'>
        <div className='socialBtn'>
          <img src={kakao_icon} alt='카카오'><h1>
          <a href={KAKAO_AUTH_URL}>Kakao Login</a>
      </h1>
          </img>
        </div>
        <div className='socialBtn'>
          <img src={naver_icon} alt='네이버'></img>
        </div>
        <div className='socialBtn'>
          <img src={google_icon} alt='구글'></img>
        </div>
      </div>
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

export default LoginFormTest;