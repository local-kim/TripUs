// Actions
// Ducks 패턴을 따를땐 액션의 이름에 접두사를 넣어주세요.
// 이렇게 하면 다른 모듈과 액션 이름이 중복되는 것을 방지 할 수 있습니다.
const ADD_PLACE = 'plan/ADD_PLACE';
const SET_DATE = 'plan/SET_DATE';
// const SHOW_PLAN = 'plan/SHOW_PLAN';

// Action Creators
// export const showPlan = (state) => (
// 	{
// 		type: SHOW_PLAN,
// 		state.plan
// 	}
// )

export const addPlace = (place) => (
	{
		type: ADD_PLACE,  // 앞서 선언한 액션명
		place: place
	}
);

export const setDate = (start, end, days) => (
	{
		type: SET_DATE,
		start: start,
		end: end,
		days: days
	}
);

// 초기 상태, 객체가 아니어도 된다.
const initialState = {
	startDate: "",
	endDate: "",
	days: null,
	plan: []
}

// Reducer
export default function reducer(state = initialState, action){
	switch(action.type){
		case ADD_PLACE:
			console.log(state);
			return {
				...state,
				plan: [...state.plan, action.place]
			};
		case SET_DATE:
			// console.log();
			return {
				...state,
				startDate: action.start,
				endDate: action.end,
				days: action.days
			}
		default:
			return state; //반드시 default는 state return
	}
}