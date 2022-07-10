// Root Reducer
import { combineReducers } from 'redux';
import planner from './planner';
import auth from './auth';

const rootReducer = combineReducers({
  planner,
  auth
});

export default rootReducer;