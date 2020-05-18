import { combineReducers } from "redux";

import loader from './apiLoader.reducer';
import form from './3StepForm.reducer';

const rootReducer=combineReducers({
  loader,
  form
});

export default rootReducer;