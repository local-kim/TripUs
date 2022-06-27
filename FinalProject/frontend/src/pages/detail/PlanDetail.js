import React from 'react';
import '../../styles/plandetail.css';

const PlanDetail = () => {
    return (
        <div id = 'plan-detail'>
            {/* 좌측 이동 리스트 */}
            <div className='scroll-item'>
                scroll-item
            </div>

            {/* 대표 이미지 */}
            <div className='main-image'
                style={{backgroundImage:'url(../DetailImage/main-sample.jpg)'}}
                >
                <div className='top-box'>
                    <div className='like'>
                        <img alt='' src='../DetailImage/heart-logo.png' />
                    </div>
                    <div className='clear'></div>
                </div>
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
                                <div className='clear'></div>
                            </div>
                        </div>
                    </div>
                    <div className='clear'></div>
                </div>
            </div>
            {/* 메뉴창 */}
            <div className='main-list'>
                {/* 상단 메뉴바 */}
                <div className='list-header'>
                    <div className='header-menu'>개요</div>
                    <div className='header-menu-line'></div>
                    <div className='header-menu'>일정표</div>
                    <div className='header-menu-line'></div>
                    <div className='header-menu'>지도</div>
                    <div className='header-menu-line'></div>
                    <div className='header-menu'>댓글</div>
                    <div className='header-menu-line'></div>

                    <div className='header-menu-right1'>다운로드</div>
                    <div className='header-menu-right2'>복사하기</div>
                    <div className='clear'></div>
                </div>
                {/* 메뉴 리스트 */}
                <div className='wrap-list'>
                    <div className='list-left'>
                        <div className='day-box'>
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
                                        <div className='clear'></div>
                                    </div>
                                    <div className='day-date-right'>
                                        Used price?
                                        <div className='clear'></div>
                                    </div>
                                </div>
                                <div className='clear'></div>
                            </div>
                            <div className='day-box-list'>
                                
                            </div>
                        </div>
                    </div>
                    <div className='list-right'>
                        list-right
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PlanDetail;