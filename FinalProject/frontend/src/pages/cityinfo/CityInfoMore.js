import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';


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
                            <div className='qqq'>
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
                                <div className='more-select'>
                                    <select>
                                        <option>인기순</option>
                                        <option>이름순</option>
                                        <option>??순</option>
                                        <option>??순</option>
                                    </select>
                                </div>
                            </div>
                            <div style={{display:'flex',border:'1px solid black', width:'1000px'}}>
                                <div className='more-image'>image</div>
                                <div>
                                    <div style={{display:'flex'}}>
                                        <div style={{border:'1px solid black'}}>
                                            <div>장소 이름</div>
                                            <div><span></span>주소</div>
                                            <div>장소 설명</div>
                                        </div>
                                        <div style={{display:'flex', border:'1px solid black',marginLeft:'600px'}}>
                                            <div>클립,</div>
                                            <div>일정추가</div>
                                        </div>
                                    </div>
                                    <div style={{display:'flex',border:'1px solid black'}}>
                                        <div><span class="material-symbols-outlined">attach_file</span>클립</div>&emsp;
                                        <div><span class="material-symbols-outlined">star</span>평균평점</div>&emsp;
                                        <div>
                                            <img alt='' src='../../public/city_detail_image/tag.png'></img>서브카테고리</div>
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