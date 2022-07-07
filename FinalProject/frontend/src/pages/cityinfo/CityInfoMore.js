import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';
import { deepOrange, deepPurple } from '@mui/material/colors';


const CityinfoMore = () => {


    //////////////////////////////// MUi 메뉴 탭
    const [value, setValue] = useState("1");
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    /////////////////////////////// Mui 스타일 변수
    const muiStyle={
        margin:"0 auto",
        width:"1092px",
        typography:"body1"
    }

    return (
        <div id='cityinfomore' style={muiStyle}>
            <Box className='infobox'>
                <TabContext value={value} >
                    <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                        <TabList onChange={handleChange} aria-label="lab API tabs example">
                            <Tab label="관광명소 12" value="1" />
                            <Tab label="문화시설 14" value="2" />
                            <Tab label="음식점 39" value="3" />
                            <Tab label="쇼 핑 38" value="4" />
                            <Tab label="레포츠 28" value="5" />
                            <Tab label="행사/공연/축제 15" value="6" />
                            <Tab label="숙 박 32" value="7" />
                        </TabList>
                    </Box>
                    <TabPanel value="1">
                        <div style={{display:'flex'}} className='row'>
                            <div className='col-sm-11 qqq'>
                                <input type="checkbox" className='more-input'></input><b className='more-input-b'>1111</b>
                                <input type="checkbox" className='more-input'></input><b className='more-input-b'>2222</b>
                                <input type="checkbox" className='more-input'></input><b className='more-input-b'>3333</b>
                                <input type="checkbox" className='more-input'></input><b className='more-input-b'>4444</b>
                                <input type="checkbox" className='more-input'></input><b className='more-input-b'>5555</b>
                                <input type="checkbox" className='more-input'></input><b className='more-input-b'>6666</b>
                                <input type="checkbox" className='more-input'></input><b className='more-input-b'>7777</b>
                            </div>    
                            <div>다운드롭? 카테고리 더보기</div>

                            <div style={{display:'flex'}}>
                                <div>총 ???개</div>
                                <div className='more-select' >
                                    <select>
                                        <option>인기순</option>
                                        <option>이름순</option>
                                        <option>??순</option>
                                        <option>??순</option>
                                    </select>
                                </div>
                            </div>
                            <div style={{display:'flex', width:'1000px',border:'1px solid black'}}>
                                <div className='more-image'>
                                    <img alt='' src='../../../city_image/busan.jpg'></img>
                                </div>
                                <div style={{marginTop:'10px',marginLeft:'5px'}}>
                                    <div style={{display:'flex'}}>
                                        <div style={{width:'500px'}}>
                                            <div className='more-location'>광안 대교</div>
                                            <div className='more-addr'><span class="material-symbols-outlined">pin_drop</span>부산시 어딘가</div>
                                            <div className='more-content'>야경이 쩝니다ㅏㅏㅏㅏㅏㅏㅏㅏ</div>
                                        </div>
                                        <div style={{display:'flex', marginLeft:'150px'}}>
                                            <Stack direction="row" spacing={2}>
                                                <Avatar sx={{ bgcolor: deepOrange[500] }}><span class="material-symbols-outlined">attach_file</span></Avatar>
                                                <Avatar sx={{ bgcolor: deepPurple[500] }}><span class="material-symbols-outlined">event_available</span></Avatar>
                                            </Stack>
                                            {/* <div className='more-clipbtn'>클립,</div>
                                            <div>일정추가</div> */}
                                        </div>
                                    </div>
                                    <div style={{display:'flex', marginTop:'20px'}}>
                                        <div><span class="material-symbols-outlined">attach_file</span>423</div>&emsp;
                                        <div><span class="material-symbols-outlined">star</span>7.0/10.0</div>&emsp;
                                    </div>
                                </div>
                            </div>
                        </div>
                    </TabPanel>
                </TabContext>
            </Box>
        </div>
    );
};

export default CityinfoMore;