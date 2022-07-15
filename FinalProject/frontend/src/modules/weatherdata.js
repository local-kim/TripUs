// Actions
const SAVE_WEATHER = 'cityinfo/SAVE_WEATHER';


// Action Creators
// 날씨 해당기간 데이터 받는 변수
export const getWeather_data = (cityData) => ({
    type : SAVE_WEATHER,
    cityData : cityData
})


// 내가 사용할 변수 초기 상태
// 날씨
const weather_initialState = {
    
}





// Reducer
// 날씨
export default function W_reducer(state = weather_initialState, action){
    return {
        
    }   
}
