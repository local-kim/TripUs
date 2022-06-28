import React, { useState } from 'react';
import '../../styles/plandetail.css';
// import ScrollButton from 'react-scroll-button';

const PlanDetail = () => {

    // const ScrollComponent = () => {
    //     return (
    //         <ScrollButton
    //             behavior = "smooth"
    //             buttonBackgroundColor = "red"
    //             style = {{fontSize: '24px'}}
    //         />
    //     );
    // };
    
    //별점 이미지 = https://www.earthtory.com/res//img/common/web/hotel_star_?.?.png
    
    return (
        <div id = 'plan-detail'>
            {/* 좌측 이동 리스트 */}
            <div className='scroll-item'>
                <div className='scroll-item-prev'></div>
                <div className='scroll-item-list'>
                    <div className='scroll-item-btn on'>D1 Place</div>
                    <div className='scroll-item-btn'>D2 Place</div>
                    <div className='scroll-item-btn'>D3 Place</div>
                    <div className='scroll-item-btn'>D4 Place</div>
                    <div className='scroll-item-btn last'>D5 Place</div>
                </div>
                <div className='scroll-item-next'></div>
            </div>

            {/* 대표 이미지 */}
            <div className='main-image'
                style={{backgroundImage:'url(../DetailImage/main-sample.jpg)'}}>
                <div className='top-box'>
                    <div className='like-btn'>
                        <div className='ico'></div>
                        {/* <img alt='' src='../DetailImage/heart-logo.png' /> */}
                    </div>
                    <div className='clear' />
                </div>
                <div className='cover-bottom'>
                    <div className='bottom-box'>
                        <div className='bottom-head'>
                            <img alt='' src='../DetailImage/box-user.png' />
                            <span><b style={{color:'white'}}>UserName</b></span>
                        </div>
                        <div className='bottom-body'>
                            <h4>Place</h4>
                            <h6>StartDay ~ EndDay (x일) <b>with</b></h6>
                            <div className='bottom-bottom-box'>
                                <div className='bottom-count'>
                                    place, view, scrap count
                                </div>
                                <div className='bottom-price'>
                                    <select>
                                        <option>뭐로</option>
                                        <option>할까</option>
                                    </select>

                                    <span className='bottom-number'>
                                        00,000,000
                                    </span>
                                    <div className='clear' />
                                </div>
                            </div>
                        </div>
                        <div className='clear' />
                    </div>
                </div>
            </div>
            {/* 메뉴창 */}
            <div className='main-list'>
                {/* 상단 메뉴바 */}
                <div className='list-header'>
                    <div className='header-menu on'>개요</div>
                    <div className='header-menu-line'></div>
                    <div className='header-menu'>일정표</div>
                    <div className='header-menu-line'></div>
                    <div className='header-menu'>지도</div>
                    <div className='header-menu-line'></div>
                    <div className='header-menu'>댓글</div>
                    <div className='header-menu-line'></div>

                    <div className='header-menu-right1'>다운로드</div>
                    <div className='header-menu-right2'>복사하기</div>
                    <div className='clear' />
                </div>
                {/* 메뉴 리스트 */}
                <div className='wrap-list'>
                    <div className='list-left'>

                        {/* 날짜별 */}
                        <div className='day-box'>
                            {/* 리스트-상단바 */}
                            <div className='day-box-title'>
                                <div className='day-num'>
                                    Day01
                                </div>
                                <div className='day-date'>
                                    <div className='day-date-left'>
                                        <div className='date'>
                                            Start date
                                        </div>
                                        <div className='day-title'>
                                            Place
                                        </div>
                                        <div className='clear' />
                                    </div>
                                    <div className='day-date-right'>
                                        Used price?
                                        <div className='clear' />
                                    </div>
                                </div>
                                <div className='clear'></div>
                            </div>
                            {/* 리스트-하단바 */}
                            <div className='day-box-list'>
                                <div className='day-list-num'>
                                    <div className='list-num'>1</div>
                                </div>
                                <div className='list-content'>
                                    <img alt='spot' src='' className='spot-img'/>
                                    <div className='spot-content-box'>
                                        <div className='spot-name'>
                                            Spot-name
                                        </div>
                                        <div className='spot-info'>
                                            <img alt src='https://www.earthtory.com/res//img/common/web/hotel_star_1.5.png' className='star' />
                                            <div className='sinfo-line' />
                                            <div className='sinfo-txt'>commit text</div>
                                            <div className='clear' />
                                        </div>
                                    </div>
                                    <div className='spot-btn-box'>
                                        <img alt src='https://www.earthtory.com/res/img/mypage/plan/sub/map_ico.png' className='spot-btn map_view' />
                                        <img alt src='https://www.earthtory.com/res/img/mypage/plan/sub/info_ico.png' className='spot-btn spot-info-btn' />
                                        <div className='clear' />
                                    </div>
                                    <div className='clear' />
                                </div>
                                <div className='clear' />
                                <div className='list-add-content'>
                                    <div className='list-use-price'>
                                        <div className='use-price'>
                                            use-price
                                        </div>
                                        <div className='use-memo'>
                                            write or not
                                        </div>
                                    </div>
                                    <div className='clear' />
                                </div>
                            </div>
                        </div>

                        {/* 날짜별 */}
                        <div className='day-box'>
                            {/* 리스트-상단바 */}
                            <div className='day-box-title'>
                                <div className='day-num'>
                                    Day02
                                </div>
                                <div className='day-date'>
                                    <div className='day-date-left'>
                                        <div className='date'>
                                            Start date
                                        </div>
                                        <div className='day-title'>
                                            Place
                                        </div>
                                        <div className='clear' />
                                    </div>
                                    <div className='day-date-right'>
                                        Used price?
                                        <div className='clear' />
                                    </div>
                                </div>
                                <div className='clear'></div>
                            </div>
                            
                            {/* 리스트-하단바 */}
                            <div className='day-box-list'>
                                <div className='day-list-num'>
                                    <div className='list-num'>1</div>
                                </div>
                                <div className='list-content'>
                                    <img alt='spot' src='' className='spot-img'/>
                                    <div className='spot-content-box'>
                                        <div className='spot-name'>
                                            Spot-name
                                        </div>
                                        <div className='spot-info'>
                                            <img alt src='https://www.earthtory.com/res//img/common/web/hotel_star_1.5.png' className='star' />
                                            <div className='sinfo-line' />
                                            <div className='sinfo-txt'>commit text</div>
                                            <div className='clear' />
                                        </div>
                                    </div>
                                    <div className='spot-btn-box'>
                                        <img alt src='https://www.earthtory.com/res/img/mypage/plan/sub/map_ico.png' className='spot-btn map_view' />
                                        <img alt src='https://www.earthtory.com/res/img/mypage/plan/sub/info_ico.png' className='spot-btn spot-info-btn' />
                                        <div className='clear' />
                                    </div>
                                    <div className='clear' />
                                </div>
                                <div className='clear' />
                                <div className='list-add-content'>
                                    <div className='list-use-price'>
                                        <div className='use-price'>
                                            use-price
                                        </div>
                                        <div className='use-memo'>
                                            write or not
                                        </div>
                                    </div>
                                    <div className='clear' />
                                </div>
                            </div>
                            {/* 같은날짜 spot 간격 */}
                            <div className='day-box-distance'></div>

                            {/* 리스트-하단바 */}
                            <div className='day-box-list'>
                                <div className='day-list-num'>
                                    <div className='list-num'>2</div>
                                </div>
                                <div className='list-content'>
                                    <img alt='spot' src='' className='spot-img'/>
                                    <div className='spot-content-box'>
                                        <div className='spot-name'>
                                            Spot-name
                                        </div>
                                        <div className='spot-info'>
                                            <img alt src='https://www.earthtory.com/res//img/common/web/hotel_star_1.5.png' className='star' />
                                            <div className='sinfo-line' />
                                            <div className='sinfo-txt'>commit text</div>
                                            <div className='clear' />
                                        </div>
                                    </div>
                                    <div className='spot-btn-box'>
                                        <img alt src='https://www.earthtory.com/res/img/mypage/plan/sub/map_ico.png' className='spot-btn map_view' />
                                        <img alt src='https://www.earthtory.com/res/img/mypage/plan/sub/info_ico.png' className='spot-btn spot-info-btn' />
                                        <div className='clear' />
                                    </div>
                                    <div className='clear' />
                                </div>
                                <div className='clear' />
                                <div className='list-add-content'>
                                    <div className='list-use-price'>
                                        <div className='use-price'>
                                            use-price
                                        </div>
                                        <div className='use-memo'>
                                            write or not
                                        </div>
                                    </div>
                                    <div className='clear' />
                                </div>
                            </div>
                            
                        </div>
                    </div>
                    <div className='list-right'>
                        <div className='list-right-map'>
                            position for map
                        </div>
                        <div className='spot-list-box'>
                        
                            position for list
                            
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PlanDetail;