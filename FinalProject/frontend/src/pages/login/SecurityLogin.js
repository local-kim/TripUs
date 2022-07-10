import axios from 'axios';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { login } from '../../modules/auth';

const SecurityLogin = () => {
  // redux
  const dispatch = useDispatch();

  const navigation = useNavigate();

  const [id, setId] = useState('');
  const [password, setPassword] = useState('');

  let loginUrl = `${process.env.REACT_APP_SPRING_URL}auth/login`;

  return (
    <div>
      <div>
        ID : <input type='text' value={id} onChange={(e) => {
          setId(e.target.value);
        }}/>
      </div>
      <div>
        Password : <input type='text' value={password} onChange={(e) => {
          setPassword(e.target.value);
        }}/>
      </div>
      
      <button type='button' onClick={() => {
        axios.post(loginUrl, {id, password})
        .then(res => {
          console.log(res.data);
          localStorage.setItem('jwtToken', res.data.token); // 로컬 스토리지에 토큰 저장
          dispatch(login(res.data)); // redux에 로그인 유저 정보 저장
          navigation("/");
        })
        .catch(err => {
          console.log(err);
        })
      }}>Login</button>
    </div>
  );
};

export default SecurityLogin;