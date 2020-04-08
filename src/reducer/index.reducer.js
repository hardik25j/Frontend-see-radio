import { combineReducers } from "redux";
import loader from './apiLoader.reducer';

const rootReducer=combineReducers({
  loader
});

export default rootReducer;