import { combineReducers } from "redux";
import posts from './posts';
import auth from './auth.js';


const reducers = combineReducers({posts,auth});
export default reducers;