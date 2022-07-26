import React, { useState,useRef } from 'react';
import { useNavigate } from "react-router-dom";
import axios from "axios";
import DaumPostcode from "react-daum-postcode";
import '../../styles/join.css';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { useForm } from "react-hook-form";


const JoinForm = (props) => {
    let joinUrl = `${process.env.REACT_APP_SPRING_URL}auth/join`;

    const navi=useNavigate();
    const [joinData,setJoinData]=useState({
        id:'',
        name:'',
        password:'',
        email:'',
        address1:'',
        address2:'',
        tel:'',
        birthday:'',
        zonecode:''
    });
    const [birth,setBirth]=useState({
        year:'',
        month:'',
        day:''
      });

    // const [address1, setAddress1] = useState(''); // 주소
    // const [address2, setAddress2] = useState(''); // 상세주소
    // const [zonecode,setZonecode]=useState('');
    const [passOk,setPassOk]=useState(false);
    const [btnOk,setBtnOk]=useState(false);
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const [modalTitle, setModalTitle] = useState();
    const [modalContent, setModalContent] = useState();
    ///이메일 중복확인
    const [emailCheck, setEmailCheck] = useState(null);
    const {
        register,
        watch,
        handleSubmit,
        getValues,
        trigger,
        formState: { errors },
      } = useForm();
    
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

    //submit 호출될 함수
    const onSave=(data)=>{
        // e.preventDefault(); //기본이벤트(submit이 action으로 넘어가는것)를 무효화

        if(!btnOk){
            alert("아이디 중복체크를 해주세요");
            return;
        }
        // if(!passOk){
        //     alert("비밀번호 확인");
        //     return;
        // }

        console.log({
            ...data,
            birthday:birth.year+birth.month+birth.day
        });

        // const url = process.env.REACT_APP_SPRING_URL + "member/insert";
        axios.post(joinUrl, {
            ...data,
            address1:joinData.address1,
            address2:joinData.address2,
            zonecode:joinData.zonecode,
            birthday:data.year+data.month+data.day})//오빠 왔다 간다.
        .then(res => {
        //   alert("insert 성공");
            console.log(res.data);
            navi("/login");
        })
        .catch(err => {
            console.log(err);
        })
    }
    //data 관련 데이터 입력시 호출
    const onDataChange=(e)=>{
        const {name,value}=e.target;
        //이벤트 발생 name이 pass일 경우 무조건 passok는 false
        // if(name==='pass')
        //     setPassOk(false);
        setJoinData({
            ...joinData,
            [name]:value
        });
        console.log(joinData.password);
    }
    const onBirthChange=(e)=>{
      const {name,value}=e.target;
      setBirth({
          ...birth,
          [name]:value
      });
    }

    //두번째 pass 입력시 호출
    const onPassChange=(e)=>{
        const {value}=e.target;
        if(value===joinData.password)
            setPassOk(true)
           
        else
            setPassOk(false);
        
    }
    //아이디 중복 체크 버튼 이벤트
    const onIdCheck=()=>{
        const url=process.env.REACT_APP_SPRING_URL+"member/idcheck?id="+watch('id');
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
    //이메일 중복 체크 버튼 이벤트
    const onEmailCheck=()=>{
        const url=process.env.REACT_APP_SPRING_URL+"member/emailcheck?email="+watch('email');
        axios.get(url)
        .then(res=>{
            if(res.data===0){
                setBtnOk(true);
                alert("가입가능 이메일주소")
            }else{
                setBtnOk(false);
                alert("이미있는 이메일주소")
            }
        });
    }
  const comfrimUrl = "http://localhost:9001/" + "api/emailConfirm";
  //이메일 인증번호
  const [emailAuth, setEmailAuth] = useState(false);
  //입력된 이메일
  const data_email = getValues("email");
  const [disable, setDisable] = React.useState(false);

  const email_confirm = document.getElementById("email_confirm");
  
  //중복이메일 체크 및 이메일 인증 메세지 보내기
  const email_check_button = (e) => {
    //이메일 유효성 체크
    const emailExp =
    /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i;
   
    //인증번호 전송

    if (data_email === "") {
      handleOpen();
      setModalTitle("이메일 정보입력 오류");
      setModalContent("이메일을 입력해주세요");
    } else if (!emailExp.test(data_email)) {
      handleOpen();
      setModalTitle("이메일 정보입력 오류");
      setModalContent("이메일을 형식에 맞추어 입력해주세요");
    } else {
      axios
        .post("http://localhost:9150/api/duplicateCheck", {
          email: data_email,
        })
        .then((res) => {
          console.log(res);
          if (res.data === "cofirm") {

            handleOpen();
            setModalTitle("이메일 오류");
            setModalContent("이미 가입된 이메일입니다.");
          } else if (res.data === "") {
            handleOpen();
            setModalTitle("이메일 오류");
            setModalContent("이메일을 입력해주세요.");
          } else if (res.data === "pass") {
            handleOpen();
            setModalTitle("이메일 인증확인");
            setModalContent("이메일을 인증번호를 확인해주세요 .");
          } else {
            handleOpen();
            setModalTitle("이메일 인증확인");
            setModalContent("이메일 인증번호를 확인해주세요.");
          }
          if (emailCheck === true) {
            email_confirm.focus();
          }
        });
    }
  };

  //인증완료 버튼
  const authCofirm = (e) => {
    const data_key = getValues("email_confirm");
    axios
      .post(comfrimUrl, {
        user_email: data_email,
        authentication_key: data_key,
      })
      .then((res) => {
        console.log(res.data);
        if (res.data === true) {
          setDisable(true);
          handleOpen();
          setModalTitle("이메일 인증");
          setModalContent("인증 완료");
        } else {
          setDisable(false);
          handleOpen();
          setModalTitle("이메일 인증");
          setModalContent("인증번호를 다시 확인해주세요.");
        }
      });
  };


    // 우편번호 검색 후 주소 클릭 시 실행될 함수, data callback 용
    const handlePostCode = (kakaoData) => {
        let fullAddress = kakaoData.address;
        let extraAddress = ''; 
        
        if (kakaoData.addressType === 'R') {
            if (kakaoData.bname !== '') {
            extraAddress += kakaoData.bname;
            }
            if (kakaoData.buildingName !== '') {
            extraAddress += (extraAddress !== '' ? `, ${kakaoData.buildingName}` : kakaoData.buildingName);
            }
            fullAddress += (extraAddress !== '' ? ` (${extraAddress})` : '');
        }
        console.log(kakaoData)
        console.log(fullAddress)
        console.log(kakaoData.zonecode)
        // setAddress1(fullAddress);
        setJoinData({...joinData, address1: fullAddress, address2: extraAddress, zonecode: kakaoData.zonecode});
        // setData({...data, address2: extraAddress});
        // setData({...data, zonecode: data.zonecode});
        // setAddress2(extraAddress);
        // setZonecode(data.zonecode);
        // console.log(address1)
        handleClose()
        
    }
    
    // const postCodeStyle = {
    //     display: "block",
    //     position: "relative",
    //     top: "10%",
    //     width: "600px",
    //     height: "600px",
    //     padding: "7px",
    //   };
    
    

    return (
        <div className='member_join'>
            <div className='member_join'>
            <form className="form-inline" onSubmit={handleSubmit(onSave)}>
                <caption><h3 className='tit'>회원가입</h3></caption> 
                <p className="page_sub"><span class="ico">*</span>필수입력사항</p>
                <table className="tbl_comm">
                    <tbody>
                        <tr>
                            <th>아이디<span class="ico">*</span></th>
                            <td>
                            <input type="text" name="id" label="아이디"
                            className="form-control"
                            onChange={onDataChange}
                            placeholder="6자 이상의 영문 혹은 영문과 숫자를 조합"
                            {...register("id", {
                                required: "아이디를 입력해주세요",
                                minLength: {
                                  value: 6,
                                  message: "6자 이상의 아이디만 사용 가능합니다.",
                                },
                                maxLength: {
                                  value: 12,
                                  message: "12자 이하의 아이디만 사용 가능합니다.",
                                },
                                pattern: {
                                  value: /^([a-z])|([a-z0-9])$/,
                                  message: "아이디는 소문자와 숫자만 입력해주세요",
                                },
                              })}/>
                            <button type='button' className='btn' onClick={onIdCheck} >중복확인</button>
                            {errors.id && <p style={{color:'#1e87f0'}}>{errors.id?.message}</p>}
                            </td>
                        </tr>
                        <tr>
                            <th>비밀번호<span class="ico">*</span></th>
                            <td>
                            <input type="password" name="password"  className="form-control"
                             placeholder="비밀번호를 입력해주세요"
                             onChange={onDataChange}
                            {...register("password", {
                                required: "비밀번호를 입력해주세요",
                                minLength: {
                                  value: 8,
                                  message: "8자 이상의 비밀번호만 사용 가능합니다.",
                                },
                                maxLength: {
                                  value: 16,
                                  message: "16자 이하의 비밀번호만 사용 가능합니다.",
                                },
                                pattern: {
                                  value: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/,
                                  message: "영문, 숫자를 혼용하여 입력해주세요..",
                                }
                              })}/>
                              {errors.password && <p style={{color:'#1e87f0'}}>{errors.password?.message}</p>}
                            </td>
                        </tr>
                        <tr>
                            <th>비밀번호확인<span class="ico">*</span></th>
                            <td>
                            <input type="password" name="password_confirm"  className="form-control"
                             placeholder="비밀번호를 입력해주세요"
                            {...register("password_confirm", {
                                validate: value => value===watch("password") || '비밀번호가 일치하지 않습니다.'
                              })}/>
                              {errors.password_confirm && <p style={{color:'#1e87f0'}}>{errors.password_confirm?.message}</p>}
                            </td>
                        </tr>
                        <tr>
                            <th>이름<span class="ico">*</span></th>
                            <td>
                            <input type="text" name="name" className="form-control"
                            label="이름" onChange={onDataChange} placeholder="이름을 입력해주세요" required
                            {...register("name", {
                                required: "이름을 입력해주세요",
                                minLength: {
                                  value: 2,
                                  message: "2자 이상의 이름만 사용 가능합니다.",
                                },
                                maxLength: {
                                  value: 12,
                                  message: "12자 이하의 이름만 사용 가능합니다.",
                                },
                                pattern: {
                                  value: /^([가-힣])|([a-zA-Z])$/,
                                  message: "이름은 한글 또는 영문으로만 입력해주세요",
                                },
                              })} />
                              {errors.name && <p style={{color:'#1e87f0'}}>{errors.name?.message}</p>}
                            </td>
                        </tr>
                        <tr>
                            <th>이메일<span class="ico">*</span></th>
                            <td>
                            <input type="text" name="email" onChange={onDataChange}
                             placeholder="예: bitrip@bitrip.com" className="form-control"
                            
                            {...register("email", {
                              required: "이메일을 입력해주세요",
                              pattern: {
                                value: /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i,
                                message: "이메일 형식에 맞게 입력해주세요",
                              },
                              // validate: (value) => value === user_email_check,
                            })}/>
                            <button type='button' className='btn'
                             onClick={onEmailCheck}>중복확인</button>
                            
                             {errors.email && <p style={{color:'#1e87f0'}}>{errors.email?.message}</p>}
                             <button
                                disabled={disable}
                                type="button"
                                onClick={() => {
                                  email_check_button();
                                }}
                                onBlur={() => {
                                  trigger("email");
                                }}
                                >
                                인증하기
                                </button>
                                
                                {(errors.email && errors.email.message) ||
                                (emailCheck && (
                                <p style={{ color: "green" }}>
                                  사용 가능한 이메일입니다. 인증번호를 입력해주세요
                                </p>
                                ))}
                                {emailCheck && (
                                <div style={{ display: { emailAuth } }}>
                                <label
                                  className="accountLabel"
                                  style={{ display: "flex", marginTop: "15px" }}
                                >
                                  이메일 인증번호 입력
                                </label>
                                <div
                                  className="user_email_box"
                                  style={{ width: "98%", display: "flex" }}
                                  disabled={disable}
                                >
                                  <input
                                    disabled={disable}
                                    id="email_confirm"
                                    className="email_confirm"
                                    style={{ maxWidth: "75%" }}
                                    placeholder="인증번호를 입력해주세요"
                                    required
                                    {...register("email_confirm", {
                                      required: <p>이메일 인증번호를 입력해주세요.</p>,
                                    })}
                                  />
                                  <button
                                    disabled={disable}
                                    type="button"
                                    onClick={() => {
                                      trigger("email_confirm");
                                      authCofirm();
                                    }}
                                    onBlur={() => {
                                      trigger("email_confirm");
                                    }}
                                  >
                                    <b>인증확인</b>
                                  </button>
                                </div>
                                  {errors.email_confirm && errors.email_confirm.message}
                                  </div>
                                  )}
                                </td>
                        </tr>
                        <tr>
                            <th>연락처<span class="ico">*</span></th>
                            <td>
                            <input type="text" name="tel" className="form-control" placeholder="숫자만 입력해주세요"
                            onChange={onDataChange}
                            {...register("tel", {
                                required: "숫자만 입력해주세요",
                                pattern: {
                                  value: /^01([0|1|6|7|8|9]{0})?([0-9]{8,9})$/,
                                  message: "숫자만 입력해주세요",
                                },
                              })}
                            />
                            <button id="" className='btn' type="button">인증번호 받기</button>
                            {errors.tel && <p style={{color:'#1e87f0'}}>{errors.tel?.message}</p>}
                            </td>
                        </tr>
                        <tr>
                            <th>주소<span class="ico">*</span></th>
                            <td>
                            <input type='text' className="form-control"
                             name="address1" value={joinData.address1}
                             
                            required/>
                            <input type='text' className="form-control"
                             name="address2" value={joinData.address2}
                             
                            required/>
                            <input type='text' className="form-control"
                             name="zonecode" value={joinData.zonecode}
                             
                            required/>
                           <div className="App">
                         
                            <Button onClick={handleOpen} style={{paddingLeft:'30px'}}>
                                <button type='button' className='btn' style={{width:'250px'}}>주소찾기</button>
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
                                <button type='button' onClick={handleClose} className='btn'>닫기</button>
                                </Typography>
                                <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                                    TRIP:US
                                </Typography>
                                </Box>
                            </Modal>
                            </div>
                            </td>
                        </tr>
                        <tr>
                            <th>생년월일<span class="ico">*</span></th>
                            <div className='birth_day'>
                            <td style={{textAlign:'center', margin:'0,auto'}}>
                                <div style={{textAlign:'center'}}>
                                <input type="text" onChange={onBirthChange} name="year" id="birth_year"
                                maxLength="4"
                                {...register("year", {
                                    required: "숫자만 입력해주세요",
                                    pattern: {
                                      value: /^[0-9]*$/,
                                      message: "숫자만 입력해주세요",
                                    },
                                    maxLength: {
                                        value: 4
                                      },
                                    minLength: {
                                        value: 4
                                      },
                                    validate: value => (value >= new Date().getFullYear()-100 && value <= new Date().getFullYear()) || '출생년도를 다시 입력하세요'
                                  })}
                                placeholder="YYYY"/>

                                <span class="bar"></span>

                                <input type="text" onChange={onBirthChange} name="month" id="birth_month"
                                 maxLength="2"
                                 {...register("month", {
                                    required: "숫자만 입력해주세요",
                                    pattern: {
                                      value: /^[0-9]*$/,
                                      message: "숫자만 입력해주세요",
                                    },
                                    maxLength: {
                                        value: 2
                                      },
                                    minLength: {
                                        value: 2
                                      },
                                      validate: value => (value >= 1 && value <=12) || '양식에 맞게 입력하세요'
                                  })}
                                placeholder="MM"/>

                                <span class="bar"></span>

                                <input type="text" onChange={onBirthChange} name="day" id="birth_day"
                                 maxLength="2"
                                {...register("day", {
                                    required: "숫자만 입력해주세요",
                                    pattern: {
                                    value: /^[0-9]*$/,
                                    message: "숫자만 입력해주세요",
                                    },
                                    maxLength: {
                                        value: 2
                                    },
                                    minLength: {
                                        value: 2
                                    },
                                    validate: value => (
                                        (((watch("year")%4===0 && watch("year")%100!==0) || watch("year")%400===0) && watch("month")==="02" && value >= 1 && value <=29) ||
                                        (!((watch("year")%4===0 && watch("year")%100!==0) || watch("year")%400===0) && watch("month")==="02" && value >= 1 && value <=28) ||
                                        ((watch("month")==="04" || watch("month")==="06" || watch("month")==="09" || watch("month")==="11" ) && value >= 1 && value <=30) ||
                                        ((watch("month")==="01" || watch("month")==="03" || watch("month")==="05" || watch("month")==="07" || watch("month")==="08" || watch("month")==="10" || watch("month")==="12") && value >= 1 && value <=31)
                                        ) || '양식에 맞게 입력하세요'
                                })}
                                placeholder="DD"/>

                                </div>
                                {errors.year && <p style={{color:'#1e87f0'}}>{errors.year?.message}</p>}
                                {!errors.year && errors.month && <p style={{color:'#1e87f0'}}>{errors.month?.message}</p>}
                                {!errors.year && !errors.month && errors.day && <p style={{color:'#1e87f0'}}>{errors.day?.message}</p>}
                            </td>
                            </div>
                        </tr>
                        <tr>
                            <td colSpan={2} style={{textAlign:'center'}}>
                            <button type="submit" className="btn_type1 btn_member">
                            <span className="txt_type">가입하기</span>
                            </button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </form>
            </div>
        </div>
    );
};

export default JoinForm;