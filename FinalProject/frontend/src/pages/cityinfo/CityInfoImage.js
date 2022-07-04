import React,{useRef, useCallback} from 'react';
import Slick from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import styled, { css } from 'styled-components';
import cityinfoImg from '../../assets/images/IMG_1503.JPG';

const Wrap = styled.div`
    position: relative;
    padding-bottom: 70px;
    overflow: hidden;
   
    // 1. Global style 추가했던 것을 슬라이드 상단에 Wrap을 만들어 여기서 선언했습니다.
    .slick-slide {
        display: inline-block;
    }
   
    // 2. 제가 추가한 커스텀 클래스입니다.
    // pagination 부분입니다.
    .slick-dots.slick-thumb {
        position: absolute;
        bottom: 0;
        left: 50%;
        padding: 0;
        margin: 0;
        list-style: none;
        transform: translate(-50%);

        li {
            position: relative;
            display: inline-block;
         
            &.slick-active {
                span {
                    filter: none;
                }
            }
        }
    }  
`;

const SlickItems = styled.div`
    width: 100%;    
    height: 400px;
    text-align: center;

    img {
        max-width: 100%;
        height: 100%;
        vertical-align: top;
    }
`;

const defaultButtonStyle = css`
    position: absolute;
    top: calc(50% - 50px);
    padding: 0;
    width: 30px;
    height: 30px;
    line-height: 1;
    border: none;
    border-radius: 50%;
    background: none;
    outline: none;
    cursor: pointer;
`;

const PrevButton = styled.button`
    ${defaultButtonStyle}
    left: 0;
`;

const NextButton = styled.button`
    ${defaultButtonStyle}
    right: 0;
`;



// const PrevIcon = styled(<button type='button'>아</button>)`
//     ${defaultIconStyle}
// `;

// const NextIcon = styled(<button type='button'>아</button>)`
//     ${defaultIconStyle}
// `;

const PagingAnchor = styled.a`
    display: block;
    width: 50px;
    height: 50px;

    img {
        width: 100%;
        height: 100%;
    }
`;

// 3. custom pagination을 만듭니다.
// background를 통해 이미지를 넣어줍니다.
// filter를 통해 흑백으로 보이게 하고 active가 되면 흑백을 제거합니다. (31라인참고)
const Paging = styled.span`
    display: inline-block;
    width: 100%;
    height: 100%;
    vertical-align: middle;
    background: url(${props => props.src})no-repeat;
    background-size: 100% 100%;
    filter: grayscale(1);
`;

// 4. 샘플이미지
const images = [
    {
        src: cityinfoImg,
        title: "1"
    },
    {
        src: cityinfoImg,
        title: "2"
    },
    {
        src: cityinfoImg,
        title: "3"
    },
    {
        src: cityinfoImg,
        title: "4"
    },
    
];


const RecommendCorp = () => {
    // 5. custom arrows를 만들어 ref를 통해 제어합니다.
    const slickRef = useRef(null);

   // 6. slick에 추가할 세팅입니다.
    const settings = {
        dots: true,
        // 5. custom arrows를 만들기 위해 기본 arrows옵션을 false로 합니다.
        arrows: true,
        infinite: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        
        // 2. custom pagination을 만듭니다.
        // i(index)를 통해 샘플이미지에서 동일한 이미지를 가져옵니다.
        customPaging: function(i) {
            const imgSrc = images[i].src;
            return (
                <PagingAnchor className='slick-active'>
                        <button type='button'>::before i</button>
                </PagingAnchor>
            );
        },
    };
    
   // 5. custom arrows 동작 함수를 만듭니다.
    const previous = useCallback(() => slickRef.current.slickPrev(), []);
    const next = useCallback(() => slickRef.current.slickNext(), []);

    return (
        <div className='container'>
            <Wrap>
         

         <Slick 
            ref={slickRef} {...settings}>
            

                {images.map((v, i) => {
                    return (
                        
                        <SlickItems key={`${v.title}_${i}`}>
                            <img src={v.src} />
                        </SlickItems>
                    )
                })}
            </Slick>

            <>
                <PrevButton onClick={previous}>
                    <span className="hidden">이전</span>
                    
                </PrevButton>

                <NextButton onClick={next}>
                    <span className="hidden">다음</span>
                    
                </NextButton>
            </>
        </Wrap>

        </div>
    );
};

export default RecommendCorp;