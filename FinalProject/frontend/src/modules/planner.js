// Actions
// Ducks 패턴을 따를땐 액션의 이름에 접두사를 넣어주세요.
// 이렇게 하면 다른 모듈과 액션 이름이 중복되는 것을 방지 할 수 있습니다.
// const ADD_PLACE = 'plan/ADD_PLACE';
// const ADD_PLAN = 'plan/ADD_PLAN';
const SAVE_TRIP = 'plan/SAVE_TRIP';
const SAVE_PLAN = 'plan/SAVE_PLAN';

// Action Creators
// export const addPlace = (place) => (
// 	{
// 		type: ADD_PLACE,
// 		place: place
// 	}
// );

// export const addPlan = (plan) => (
// 	{
// 		type: ADD_PLAN,
// 		plan: plan
// 	}
// )

// export const saveTripInfo = (start, end, days, cityNum, cityName, areaCode, sigunguCode) => (
export const saveTrip = (tripInfo) => (
	{
		type: SAVE_TRIP,
		trip: tripInfo
		// start: start,
		// end: end,
		// days: days,
		// cityNum: cityNum,
		// cityName: cityName,
		// areaCode: areaCode,
		// sigunguCode: sigunguCode
	}
);

export const savePlan = (plan) => (
	{
		type: SAVE_PLAN,
		plan: plan
	}
);

// 초기 상태, 객체가 아니어도 된다.
const initialState = {
	// startDate: "",
	// endDate: "",
	// days: null,
	// cityNum: null,
	// areaCode: null,
	// sigunguCode: null,
	trip: {},
	plan: [],
}

// Reducer
export default function reducer(state = initialState, action){
	switch(action.type){
		// case ADD_PLACE:
		// 	// console.log(state);
		// 	return {
		// 		...state,
		// 		plan: [...state.plan, action.place]
		// 	};
		// case ADD_PLAN:
		// 	// console.log(action.plan);
		// 	return {
		// 		...state,
		// 		plan: [...state.plan, action.plan]	// 배열에 배열 추가
		// 	}
		case SAVE_PLAN:
			// console.log(action.plan);
			return {
				...state,
				plan: action.plan
			}
		case SAVE_TRIP:
			// console.log(action.areaCode, action.sigunguCode);
			return {
				...state,
				trip: action.trip,
				// startDate: action.start,
				// endDate: action.end,
				// days: action.days,
				// cityNum: action.cityNum,
				// cityName: action.cityName,
				// areaCode: action.areaCode,
				// sigunguCode: action.sigunguCode,
				plan: Array.from(Array(action.trip.days), () => new Array()),
			}
		default:
			return state; //반드시 default는 state return
	}
}