import { combineReducers } from "redux";
import eventLogReducer from './eventLogReducer'
import authReducer from './authReducer'

export default combineReducers({
   pianoData: eventLogReducer,
   userData: authReducer,
});
