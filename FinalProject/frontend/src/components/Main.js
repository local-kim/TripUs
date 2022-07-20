import { BorderAll, Margin } from '@mui/icons-material';
import { height, textAlign } from '@mui/system';
import React ,{useState} from 'react';
import { ReactDOM } from 'react';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';


import Fullpage,{FullPageSections,FullpageSection,FullpageNavigation} from '@ap.cx/react-fullpage';
import Myslide from './Myslide';
import Myslide2 from './Myslide2';
import Menu from './Menu';
import '../AppHeemin.css';
import axios from 'axios';
import jQuery from 'jquery';
import { NavLink } from 'react-router-dom';
import { setDate } from 'date-fns';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import Box from '@mui/material/Box';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ClickAwayListener from '@mui/material/ClickAwayListener';
import Grow from '@mui/material/Grow';
import Paper from '@mui/material/Paper';
import Popper from '@mui/material/Popper';
import MenuItem from '@mui/material/MenuItem';
import MenuList from '@mui/material/MenuList';
import FormatAlignLeftIcon from '@mui/icons-material/FormatAlignLeft';
import FormatAlignCenterIcon from '@mui/icons-material/FormatAlignCenter';
import FormatAlignRightIcon from '@mui/icons-material/FormatAlignRight';
import FormatAlignJustifyIcon from '@mui/icons-material/FormatAlignJustify';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';


import Beach from './Beach.mp4';
import Islands from './Islands.mp4';
import Cliff from './Cliff.mp4';
import Wave from './Waves.mp4';


//ㅡㅡㅡㅡㅡㅡㅡ배경 랜덤 

const video =[Beach, Cliff, Islands, Wave];
const video_Number = 4;

const getRandom=()=>{

    return Math.floor(Math.random()* video_Number)
}

const options = ['인기순','오름차순' ,'내림차순'];

// ㅡㅡㅡㅡㅡㅡㅡㅡㅡ

const Main=(row)=>{


    let cityDataUrl = process.env.REACT_APP_SPRING_URL + "cityData/";

    const [citydata2,setCityData2] = useState([]);
    const [citydata3,setCityData3] = useState([]);
    const [citydata4,setCityData4] = useState([]);

    const [citydata,setCityData] = useState('');

    // const cityData=()=>{
    //     axios.get(cityDataUrl)
    //     .then(res=>{
    //         // setCityData(res.data);
    //         // console.log(res.data.getData2
    //         setTogleButton(res.data.getData2);
    //         setCityData2(res.data.getData2);
    //         setCityData3(res.data.getData3);
    //         setCityData4(res.data.getData4);
    //     })
    //     .catch(err => {
    //         alert(err);
    //     })
    //   }

    
    // const [select, setSelect] = useState(''); // set 하라길래 그냥 하나 만들어뒀슴다

    const [alignment, setAlignment] = React.useState('web');

    const handleChange = (event, newAlignment) => {
      setAlignment(newAlignment);
    };

  const control = {
    value: alignment,
    onChange: handleChange,
    exclusive: true,
  };
    
    const [open, setOpen] = React.useState(false);
    const anchorRef = React.useRef(null);
    const [selectedIndex, setSelectedIndex] = React.useState(0);


    const handleClick = () => {
        console.info(`You clicked ${options[selectedIndex]}`);
      };
      
      const handleMenuItemClick = (event, index) => {
        setSelectedIndex(index);
        setOpen(false);
      };
      
      const handleToggle = () => {
        setOpen((prevOpen) => !prevOpen);
      };
      
      const handleClose = (event) => {
        if (anchorRef.current && anchorRef.current.contains(event.target)) {
          return;
        }
      
        setOpen(false);

    }
   
    const [city, setCity] = useState([]) 

    const navi=useNavigate();

    const sectionStyle = {
        height:'100vh',
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems:'center'

    }

    

    const sectionStyle2 = {
        height:'',
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems:'center'

    }

    const sectionStyle3 = {
      
        height:'100vh',
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems:'center',
        

    }

    const Search=(e)=>{


        if(e.target.value!=""){

        let searchUrl = process.env.REACT_APP_SPRING_URL+"searchauto?searchWord="+e.target.value;
    
    
    
    
        axios.get(searchUrl)
        .then(res=>{
            console.log(res.data)
        
          setCity(res.data);
            
    
        })
    
    }else{
        setCity('');
    }
       
    
    }

    const handleKeyPress = e => {
        if(e.key === 'Enter') {
            setCity();
        }
      }

    //   useEffect(() => {

    //     cityData();

    //   }, [category]);

    const [category, setCategory] = useState(0); //카테고리 숫자 저장 하는 변수 

    return(
 
        <Fullpage>
          <FullpageNavigation/>
            <FullPageSections>
                
                <FullpageSection style={sectionStyle3}>

                   
                     <div className='main_top'>
                             <div style={{zIndex:'-9999'}}>
                            <video muted autoPlay loop style={{width:'100%', height:'100vh', objectFit:'cover',position:'absolute'}}>
                                <source src={video[getRandom()]} type="video/mp4"/>
                            </video>
                            </div> 
                             <div className="wrap"style={{marginTop:'60px'}}>
                         
                            <div className='main_top_title' >나만의 여행 플래너 Trip Us!</div>
                            <div className='main_top_desc' >쉽고 빠르게 여행을 계획하세요.</div>
                            <div className='search_area' >
                                <div className='city_autocomplete' style={{display:'block'}}></div>
                                <input className='search_input' placeholder='국가명,도시명으로 검색' autocomplete="off" onKeyUp={Search} ></input>
                                <ul  style={{display:'block'}} id="searchAuto">{city && city.map((data, index)=>(<li onClick={()=>{navi(`/city/${data.num}`)}} >{data.name} <span class="h_search_cicu">대한민국</span></li> ))}</ul>
                                    <div className='latest_search'>추천도시:  서울  부산  제주  강릉  인천 </div>
                            </div>
                            
                        </div>
                        
                    </div>  
              
                </FullpageSection>
                
                <FullpageSection style={sectionStyle}>                
                    
                    <div className='page white'>
                    {/* <Menu></Menu> */}
                        <div className='wrap'>
                            <div className='page_title' style={{marginTop:'150px'}}>BitRip에서 여행을 시작하세요!</div>
                            <div className='clear'></div>
                            <div className="intro_list">
                                <div className="intro_box" onclick="location.href='/ko/area';">
                                    <img src="https://www.earthtory.com/res/img/main/intro_img/intro_1.jpg" alt=""/>
                                <div className="intro_title">여행정보</div>
                                <div className="intro_desc"> 전 세계 800개 도시, 30만개의 관광명소, 음식점, 쇼핑 정보를 확인하세요.	</div>
                            </div>

                            <div className="intro_box">
                                <img src="https://www.earthtory.com/res/img/main/intro_img/intro_2.jpg" alt=""/>
                                <div class="intro_title"> 여행일정	</div>
                                <div class="intro_desc">전 세계 100,000개 이상의 여행일정을 확인하고 나만의 일정을 계획해 보세요.</div>
                            </div>
                                        
                            <div class="intro_box">
                                <img src="https://www.earthtory.com/res/img/main/intro_img/intro_3.jpg" alt=""/>
                                <div class="intro_title">커뮤니티</div>
                                <div class="intro_desc">여행자들과 정보를 공유하고, 궁금한 것은 언제든 물어보세요.</div>
                            </div>

                            <div class="clear"></div>
                            <a href="/ko/intro" class="intro_link"> 사용방법이 궁금하신가요?</a>
                        </div>
                    </div>
                </div>
             </FullpageSection>
                
            <FullpageSection style={sectionStyle}>
                <div className="page silver" style={{paddingTop:"30px"}}>    
                <div className="wrap" style={{width:'1150px'}}>
                    <div className="page_title" >
                        <div> 인기 여행일정</div>
                    </div>
                    
                    <div className="page_desc">다른 여행자들의 일정을 참고해 나만의 여행을 계획해보세요!</div>

                            <Myslide></Myslide>
                
                                    <div className="more_btn" style={{marginTop:'50px'}}> 56,065개의 추천일정 모두보기 </div>
                            
                        </div>
                    </div>  
  
                </FullpageSection>

                <FullpageSection style={sectionStyle}>
                     <div className="page silver">
                        <div className="wrap">
                            <div className="page_title" style={{marginTop:'70px'}}>인기도시</div>
                            <p className="uk-text-meta">  여행지를 목록에서 직접 선택해주세요.  </p>

                        <div style={{textAlign:'center' , borderColor:'white'}}>
                            <ToggleButtonGroup
                                color="primary"
                                value={alignment}
                                exclusive
                                onChange={handleChange}
                                >
                                <ToggleButton onClick={() => setCategory(0)} value="web">전체</ToggleButton>
                                <ToggleButton onClick={() => setCategory(1)} value="ios">도시</ToggleButton>
                                <ToggleButton onClick={() => setCategory(2)} value="android">바다</ToggleButton>
                                <ToggleButton onClick={() => setCategory(3)} value="tema">테마</ToggleButton>
                                

                             </ToggleButtonGroup>
                        </div>


                            {/* 
                                 <Box
                                    sx={{
                                        display: 'flex',
                                        flexDirection: 'column',
                                        alignItems: 'center',
                                        '& > *': {
                                        m: 1,
                                        },
                                    }}
                                    >
                          
                                    <ButtonGroup variant="text" aria-label="text button group">
                                        <Button>전체</Button>
                                        <Button>바다</Button>
                                        <Button>전통</Button>
                                        <Button>산악</Button>
                                    </ButtonGroup>
                                    </Box> */}

                           
                   

                                <div style={{float:'right'  ,borderColor:'#f6f6f6'}}>
                                    <React.Fragment>
                                        <ButtonGroup variant="contained" ref={anchorRef} aria-label="split button" style={{zIndex:'1000'}}>
                                            <Button onClick={handleClick}>{options[selectedIndex]}</Button>
                                            <Button
                                            size="small"
                                            aria-controls={open ? 'split-button-menu' : undefined}
                                            aria-expanded={open ? 'true' : undefined}
                                            aria-label="select merge strategy"
                                            aria-haspopup="menu"
                                            onClick={handleToggle}
                                            >
                                            <ArrowDropDownIcon />
                                            </Button>
                                        </ButtonGroup>
                                        <Popper 
                                            open={open}
                                            anchorEl={anchorRef.current}
                                            role={undefined}
                                            transition
                                            disablePortal
                                            style={{zIndex:'1000'}} >
                                            {({ TransitionProps, placement }) => (
                                            <Grow
                                                {...TransitionProps}
                                                style={{
                                                transformOrigin:
                                                    placement === 'bottom' ? 'center top' : 'center bottom',
                                                }}
                                            >
                                                <Paper>
                                                <ClickAwayListener onClickAway={handleClose}>
                                                    <MenuList id="split-button-menu" autoFocusItem>
                                                    {options.map((option, index) => (
                                                        <MenuItem
                                                        key={option}
                                                        // disabled={index === 2}
                                                        selected={index === selectedIndex}
                                                        onClick={(event) => handleMenuItemClick(event, index)}
                                                        >
                                                        {option}
                                                        </MenuItem>
                                                    ))}
                                                    </MenuList>
                                                </ClickAwayListener>
                                                </Paper>
                                            </Grow>
                                            )}
                                        </Popper>
                                        </React.Fragment>
                                    </div>

                                <div className="top_city_list">

                                    <Myslide2 row={row} select={selectedIndex} category={category}></Myslide2>
                                             
                                    <div className="clear"></div>
                                </div>
                            </div>
                        </div>
                </FullpageSection>
            </FullPageSections>
        </Fullpage>

        
    )
}

export default Main;
