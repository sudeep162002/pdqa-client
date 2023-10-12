import {AUTH,LOGOUT} from '../constants/actionTypes.js';

const authReducer = (state={authData: null},action) =>{
  switch (action.type){
        // every case statement return something otherwise it will give error.
        case AUTH:
          localStorage.setItem('profile',JSON.stringify({...action?.data})); 
          return {...state,authData: action?.data}  
        case LOGOUT:
          localStorage.clear();
          return {...state,authData: null} 
        default:
              return state;

  }

}

export default authReducer;