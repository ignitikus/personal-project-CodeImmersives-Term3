import { OPEN_MODAL, CLOSE_MODAL, LOGIN_MODE, REGISTER_MODE, LOGIN, REGISTER } from '../constants/authConstants'

const initialState ={ 
   user: null,
   modalOpen: true,
   modalModeLogin: true,
   isLoginMode: true
}

export default function (state = initialState, action){
   switch (action.type) {
      case OPEN_MODAL:
         return {
            ...state,
            modalOpen: true,
         }
      case CLOSE_MODAL:
         return {
            ...state,
            modalOpen: false,
         }
      case LOGIN_MODE:
         return {
            ...state,
            isLoginMode: true,
         }
      case REGISTER_MODE:
         return {
            ...state,
            isLoginMode: false,
         }
      case LOGIN:
         return {
            ...state,
            user: action.payload,
         }
      case REGISTER:
         return {
            ...state,
            user: action.payload,
         }
      default:
         return state
   }
}