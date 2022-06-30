import React, { useState,useRef, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import axios from "axios";
import DaumPostcode from "react-daum-postcode";
import '../../styles/join.css';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';




const Profile = (props) => {

    //url
    let deleteUrl = process.env.REACT_APP_SPRING_URL + "mypage/delete";

    

    const [dto,setDto] =useState('');
    const navi=useNavigate();
    const [data,setData]=useState({
        id:'',
        name:'',
        password:'',
        email:'',
        hp:'',
        address1:'',
        address2:'',
        tel:'',
        birthday:'',
        zonecode:''

        
    });

    const [address1, setAddress1] = useState(''); // 주소
    const [address2, setAddress2] = useState(''); // 상세주소
    const [zonecode,setZonecode]=useState('');
    const [isOpenPost, setIsOpenPost] = useState(false);
    const [passOk,setPassOk]=useState(false);
    const [btnOk,setBtnOk]=useState(false);
    const [email,setEmail]=useState(false);
    const [open, setOpen] = React.useState(false);
    const [color,setColor]=useState('green');
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    
    const modalStyle = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
      };

  

        const deleteUser=()=>{
            axios.get(deleteUrl)
            .then(res=>{
                setDto(res.data);

                alert('삭제ok');
            })
            .catch(err => {
                alert(err);
            })
        }
   
    

    

    

    //submit 호출될 함수
    const onSave=(e)=>{
        e.preventDefault(); //기본이벤트(submit이 action으로 넘어가는것)를 무효화

    
        // if(!btnOk){
        //     alert("아이디 중복체크를 해주세요");
        //     return;
        // }
        // if(!passOk){
        //     alert("비밀번호 확인");
        //     return;
        // }

        const url = process.env.REACT_APP_SPRING_URL + "member/insert";
            axios.post(url, ({
                ...data,email:`${email}`
            }))
            .then(res => {
            //   alert("insert 성공");
              navi("/login")
            });

    }
    //data 관련 데이터 입력시 호출
    const onDataChange=(e)=>{
        const {name,value}=e.target;
        //이벤트 발생 name이 pass일 경우 무조건 passok는 false
        if(name==='pass')
            setPassOk(false);
        setData({
            ...data,
            [name]:value
        });
    }

     //두번째 pass 입력시 호출
     const onPassChange=(e)=>{
        const {value}=e.target;
        if(value===data.password)
            setPassOk(true)
           
        else
            setPassOk(false);
        
    }
    //아이디 중복 체크 버튼 이벤트
    const onIdCheck=()=>{
        const url=process.env.REACT_APP_SPRING_URL+"member/idcheck?id="+data.id;
        axios.get(url)
        .then(res=>{
            if(res.data===0){
                setBtnOk(true);
                alert("가입가능아이디")
            }else{
                setBtnOk(false);
                alert("이미있는 아이디")
                // setData({
                //     ...data,
                //     id:''
                // });
            }
        });
    }

        // 우편번호 검색 후 주소 클릭 시 실행될 함수, data callback 용
        const handlePostCode = (data) => {
            let fullAddress = data.address;
            let extraAddress = ''; 
            
            if (data.addressType === 'R') {
              if (data.bname !== '') {
                extraAddress += data.bname;
              }
              if (data.buildingName !== '') {
                extraAddress += (extraAddress !== '' ? `, ${data.buildingName}` : data.buildingName);
              }
              fullAddress += (extraAddress !== '' ? ` (${extraAddress})` : '');
            }
            console.log(data)
            console.log(fullAddress)
            console.log(data.zonecode)
            setAddress1(fullAddress);
            setAddress2(extraAddress);
            setZonecode(data.zonecode);
            console.log(address1)
            handleClose()
        }
     
        const postCodeStyle = {
            display: "block",
            position: "relative",
            top: "10%",
            width: "600px",
            height: "600px",
            padding: "7px",
          };
        
     


    return (
        <div className='member_join'>
            <div className='member_join'>
            <form className="form-inline" onSubmit={onSave}>
                <caption><h3 className='tit'>개인 정보 수정</h3></caption> 
                <p className="page_sub"><span class="ico">*</span>필수입력사항</p>
                <table className="tbl_comm">
                    <tbody>
                    <tr>
                            <th>이름<span class="ico">*</span></th>
                            <td>
                            <input type="text" name="name" className="form-control" value={data.name}
                            label="이름" onChange={onDataChange} placeholder="이름을 입력해주세요" required />
                            </td>
                        </tr>
{/* 
                        <tr>
                            <th>아이디<span class="ico">*</span></th>
                            <td>
                            <input type="text" name="id" value={data.id} max_length="16" required label="아이디"
                            className="form-control"
                            
                            onChange={onDataChange}
                            placeholder="6자 이상의 영문 혹은 영문과 숫자를 조합"/>
                           
                            </td>
                        </tr> */}
                 
              
                        <tr>
                            <th>이메일<span class="ico">*</span></th>
                            <td>
                            <input type="text" name="email" value={data.email} size="30" 
                            label="이메일" placeholder="예: bitrip@bitrip.com" className="form-control" required/>
                            <button type='button' className='btn'
                             onClick={()=>{
                                setData({
                                    ...data,
                                    email:`${email}`,
                                    emailCheck:true
                                });
                                alert("이메일 중복확인")
                            }}>중복확인</button>
                            </td>
                        </tr>
                        <tr>
                            <th>연락처<span class="ico">*</span></th>
                            <td>
                            {/* <input type="pass" value={data.tel} pattern="[0-9]*" name="mobileInp" className="form-control" placeholder="숫자만 입력해주세요"
                            onChange={onDataChange}
                            required/> */}
                            {/* <button id="" className='btn' type="button">인증번호 받기</button> */}
                            </td>
                        </tr>
                        {/* <tr>
                            <th>주소<span class="ico">*</span></th>
                            <td>
                            <input type='text' className="form-control"
                             name="address" value={address1}
                            required/>
                            <input type='text' className="form-control"
                             name="address" value={address2}
                            required/>
                            <input type='text' className="form-control"
                             name="address" value={zonecode}
                            required/>
                           
                           <div className="App">
                         
                            <Button onClick={handleOpen}>
                                <button type='button' className='btn'>주소찾기</button>
                            </Button>
                            <Modal
                                open={open}
                                onClose={handleClose}
                                aria-labelledby="modal-modal-title"
                                aria-describedby="modal-modal-description"
                            >
                                <Box sx={modalStyle}>
                                <Typography id="modal-modal-title" variant="h6" component="h2">
                                
                                <DaumPostcode onComplete={handlePostCode} />
                                <button type='button' onClick={handleClose} className='postCode_btn'>닫기</button>
                                </Typography>
                                <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                                    Test
                                </Typography>
                                </Box>
                            </Modal>
                            </div>
                        
                           
                            


                            </td>
                        </tr> */}

                        <tr>
                            <td colSpan={2} style={{textAlign:'center'}}>
                            <button type="submit" className="btn btn_active" style={{margin:'10px'}}>비밀번호 변경하기</button>
                            <button type="submit" className="btn btn_active" style={{margin:'10px'}}>수정하기</button>
                            <button type="submit" className="btn btn_active" style={{margin:'10px'}} onClick={deleteUser}>탈퇴하기</button>
                      
                            </td>
                        </tr>
                        
                    </tbody>
                </table>

            </form>
            </div>
            
        </div>
    );
};

export default Profile;