import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

const CityInfoWeather = () => {

    const [list,setList]=useState('');

    const dispatch = useDispatch();
    const num = useSelector(state => state.weatherdata.num);
    const member_num = useSelector(state => state.weatherdata.member_num);
    const city_num = useSelector(state => state.weatherdata.city_num);


    const wwww = async () => {
        await dispatch(qweqwe(zzz))
        .then(res=>{
            setList(res.payload);
            console.log(res.payload);
            console.dir(res.payload);
        })
    }

    // let trip_url=`${process.env.REACT_APP_SPRING_URL}city/tripdata?city_num=${city_num}&member_num=3`;     




    // 주석처리 코드 모음

    /////////////////////////////////////////////// 1
    // [obdject Object] 데이터 값 콘솔에 출력
    // for ( var key in cityPlan) {
    //     // console.log("key : "+cityPlan[key]);
    //     Object.keys(cityPlan);
    //     console.log(cityPlan);
    // }
    // console.log("cityPlan:"+JSON.Stringify(cityPlan_);          // [object Object]로 콘솔에 나올 때 JSON 방식으로 데이타 보여주는 코드



    ////////////////////////////////////////////// 2
    //날씨 데이타 가져오기
    // 배웠던 방식
    // const Weather_Data = () => {
    //     // weather_url=`https://apis.data.go.kr/1360000/AsosDalyInfoService/getWthrDataList?serviceKey=${API_KEY}&numOfRows=6&dataType=JSON&dataCd=ASOS&dateCd=DAY&startDt=${start_date}&endDt=${end_date}&stnIds=${num}`;
    //     console.log("are_wurl : "+weather_url);
    //     axios.get('http://apis.data.go.kr/1360000/AsosDalyInfoService/getWthrDataList?serviceKey=hG2QkKkmuiN38w%2BeGu53VbRK%2BBNzKRpnjbLE%2BHDXZ0dHzgbBQ67K67NsuR5xOAs%2BErSqbSpOpk1UKBnj4dvlnA%3D%3D&numOfRows=3&dataType=JSON&dataCd=ASOS&dateCd=DAY&startDt=20220704&endDt=20220706&stnIds=159')
    //     .then(response=>{
    //         console.log("suse"+response);
    //         // console.log("dd"+res.data)
    //         // setResult(res.data);
    //     })
    //     .catch(
    //         error=>console.log(error)
    //     );
    // }
    // useEffect(() => {
    //     Weather_Data();
    // },[result,weather_url])
    
    // async,await 방식
    // const Weather_Data = async ()=>{
    //         // weather_url=`https://apis.data.go.kr/1360000/AsosDalyInfoService/getWthrDataList?serviceKey=${API_KEY}&numOfRows=6&dataType=xml&dataCd=ASOS&dateCd=DAY&startDt=${start_date}&endDt=${end_date}&stnIds=${num}`
    //     try {
    //         console.log("are_wurl : "+weather_url)
    //         const res = await axios.get(weather_url)
    //         console.log("res"+res.data);
    //         setResult(res.response.body.items.item);
    //     }catch(err) {
    //         console.log(err);
    //     }
    // }
    // console.log("re:"+result);
    //////이미지로 변환하는 방법
    // if (result.data.weather[0].main === "Clouds"){
    //     setImg('../public/WeatherImage/비.png');
    // console.log(img);
    // }



    ////////////////////////////////////////////// 3
    // 날씨 url
    // let weather_url=`https://apis.data.go.kr/1360000/AsosDalyInfoService/getWthrDataList?serviceKey=${API_KEY}&numOfRows=6&dataType=xml&dataCd=ASOS&dateCd=DAY&startDt=${cityPlan.data[0].start_date}&endDt=20210803&stnIds=${cityData.num}`       // 기상청 과거데이터 다됨
    //const weather_url=`https://api.openweathermap.org/data/2.5/forecast/daily?q=${location}&cnt=3&appid=${API_KEY}`         // 최대예측 16일까지 일일데이터 (유료)
    //const weather_url=`https://api.openweathermap.org/data/2.5/forecast?q=${location}&appid=${API_KEY}`             // 5일간 3시간 간격
    //const weather_url=`https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${API_KEY}`            // 현재 날씨
    //const weather_url=`https://pro.openweathermap.org/data/2.5/forecast/hourly?q=${location}&appid=${API_KEY}`    // 4일간 예측 (유료)
    //const weather_url=`https://api.aerisapi.com/conditions/summary/${location}?format=json&from=&to=&client_id=${API_ID}&client_secret=${API_KEY}`

    // 날씨 api
    // const API_ID="pN8sverBEceulMUULSyvZ";
    // const API_KEY="QWZmBxA43k5EL7jQRyF5gMWtHEXBAgmpBjVXmgfh";
    //const API_KEY="eeb9140b1a18675f963cf17ab2081baf";     //openweathermap 사이트 APIKEY
    //const API_KEY="YHbvEJEqXIWLqYGKEDkCqF7V08yazpZHKk3gWVyGKJpuhY5ZowEIwkt9i8nmTs%2F5BMBmSKWuyX349VO5JN6Tsg%3D%3D"; // 누군가꺼



    ////////////////////////////////////////////// 4

    // 일정 수동 데이타
    // const [data2,setData2]=useState([
    //     {
    //         subject: "냥이로 떠나는 여행",
    //         D_day: 1,
    //         day: "2022-06-30" 
    //     },{
    //         subject: "멍이로 떠나는 여행",
    //         D_day: 20,
    //         day: "2022-07-19" 
    //     },{
    //         subject: "그냥 떠나는 여행",
    //         D_day: 120,
    //         day: "2022-10-29" 
    //     }
    // ])



    ////////////////////////////////////////////// 5
    // // scroll paging 무한 스크롤 실패작
    // const [page, setPage] = useState(1);
    // const [loading,setLoading] = useState(false);
    // const [ref, inView] = useInView();

    // const aaaa = useCallback(async () => {
    //     setLoading(true)
    //     await axios.get(`${areaUrl}&page=${page}`).then((res) => {
    //         setCategoryPlace1(prevState => [...prevState, ...res.data.response.body.items.item])
    //     })
    //     setLoading(false)
    // },[page])
    // useEffect(() => {
    //     aaaa()
    // },[aaaa])
    // useEffect(()=>{
    //     if (inView && !loading) {
    //         setPage(prevState => prevState + 1)
    //     }
    // },[inView, loading])

    ////////////////////////////////////////////// 6
    // {/* <div style={{display:'flex'}} className='row'>
    //         <div className='col-sm-11 qqq'>
    //             <input type="checkbox" className='more-input'></input><b className='more-input-b'>건축물 갯수</b>
    //             <input type="checkbox" className='more-input'></input><b className='more-input-b'>공원/정원/광장 갯수</b>
    //             <input type="checkbox" className='more-input'></input><b className='more-input-b'>관공서/학교 갯수</b>
    //             <input type="checkbox" className='more-input'></input><b className='more-input-b'>교통 갯수</b>
    //             <input type="checkbox" className='more-input'></input><b className='more-input-b'>기념관/기념비 갯수</b>
    //             <input type="checkbox" className='more-input'></input><b className='more-input-b'>데이투어/액티비티 갯수</b>
    //             <input type="checkbox" className='more-input'></input><b className='more-input-b'>랜드마크 갯수</b>
    //             <input type="checkbox" className='more-input'></input><b className='more-input-b'>바 갯수</b>
    //             <input type="checkbox" className='more-input'></input><b className='more-input-b'>박물관/미술관 갯수</b>                    
    //             <input type="checkbox" className='more-input'></input><b className='more-input-b'>스포츠 갯수</b>                    
    //             <input type="checkbox" className='more-input'></input><b className='more-input-b'>역사/종교 갯수</b>                    
    //             <input type="checkbox" className='more-input'></input><b className='more-input-b'>오락/이벤트 갯수</b>                    
    //             <input type="checkbox" className='more-input'></input><b className='more-input-b'>유명거리/이색장소 갯수</b>                    
    //             <input type="checkbox" className='more-input'></input><b className='more-input-b'>자연 갯수</b>                    
    //             <input type="checkbox" className='more-input'></input><b className='more-input-b'>전경/전망대 갯수</b>                    
    //             <input type="checkbox" className='more-input'></input><b className='more-input-b'>전시/공연/관람 갯수</b>                    
    //             <input type="checkbox" className='more-input'></input><b className='more-input-b'>클럽 갯수</b>                    
    //             <input type="checkbox" className='more-input'></input><b className='more-input-b'>테마파크/동물원 갯수</b>                    
    //             <input type="checkbox" className='more-input'></input><b className='more-input-b'>트레킹/하이킹 갯수</b>                    
    //             <input type="checkbox" className='more-input'></input><b className='more-input-b'>펍/선술집 갯수</b>                    


    //         </div>    
    //         <div>다운드롭? 카테고리 더보기</div> */}

    // {/* <div style={{display:'flex'}} className='row'>
    //                                     <div className='col-sm-31 qqq'>
    //                                         <input type="checkbox" className='more-input'></input><b className='more-input-b'>1111</b>
    //                                         <input type="checkbox" className='more-input'></input><b className='more-input-b'>2222</b>
    //                                         <input type="checkbox" className='more-input'></input><b className='more-input-b'>3333</b>
    //                                         <input type="checkbox" className='more-input'></input><b className='more-input-b'>4444</b>
    //                                         <input type="checkbox" className='more-input'></input><b className='more-input-b'>5555</b>
    //                                         <input type="checkbox" className='more-input'></input><b className='more-input-b'>6666</b>
    //                                         <input type="checkbox" className='more-input'></input><b className='more-input-b'>7777</b>
    //                                     </div>    
    //                                     <div>다운드롭? 카테고리 더보기</div> */}


    
    ////////////////////////////////////////////// 7


    return (
        <div>
            <h3>member_num : {member_num}</h3>
            <h3>city_num : {city_num}</h3>
            <h3>num : {num}</h3>
            {/* {list && list.map((item,index) => (
                
            ))} */}
        </div>
    );
};

export default CityInfoWeather;