// Root Reducer
import { combineReducers } from 'redux';
import planner from './planner';

const rootReducer = combineReducers({
  planner
});

export default rootReducer;