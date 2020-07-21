import { 
   LOGIN, 
   REGISTER, 
   OPEN_MODAL, 
   LOGIN_MODE, 
   CLOSE_MODAL, 
   LOGOUT_USER,
   REGISTER_MODE, 
   USER_INFO_NO_AUTH
} from '../constants/authConstants'

const initialState ={ 
   user: null,
   isAuth: false,
   modalOpen: false,
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
            modalOpen: false,
            isAuth: true,
         }
      case REGISTER:
         return {
            ...state,
            user: action.payload,
            modalOpen: false,
            isAuth: true
         }
      case USER_INFO_NO_AUTH:
         return {
            ...state,
            user: action.payload,
            modalOpen: false,
            isAuth: false,
         }
      case LOGOUT_USER:
         return {
            ...state,
            user: null,
            isAuth: false,
            modalOpen: false,
            modalModeLogin: true,
            isLoginMode: true
         }
      default:
         return state
   }
}