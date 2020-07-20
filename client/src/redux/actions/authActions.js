import { 
   LOGIN, 
   REGISTER, 
   OPEN_MODAL, 
   LOGIN_MODE, 
   CLOSE_MODAL, 
   LOGOUT_USER,
   REGISTER_MODE, 
   USER_INFO_NO_AUTH,
} from '../constants/authConstants'

export const openModal = ()=>(dispatch)=>{
   dispatch({
      type: OPEN_MODAL
   })
}

export const closeModal = ()=>(dispatch)=>{
   dispatch({
      type: CLOSE_MODAL
   })
}
export const loginMode = (user)=>(dispatch)=>{
   dispatch({
      type: LOGIN_MODE,
   })
}
export const registerMode = (user)=>(dispatch)=>{
   dispatch({
      type: REGISTER_MODE,
   })
}

export const login = (user)=>(dispatch)=>{
   dispatch({
      type: LOGIN,
      payload: user
   })
}

export const register = (user)=>(dispatch)=>{
   dispatch({
      type: REGISTER,
      payload: user
   })
}

export const userInfo = (user)=>(dispatch)=>{
   dispatch({
      type: USER_INFO_NO_AUTH,
      payload: {
         id: user.getUserInfo.id,
         email: user.getUserInfo.email,
         username: user.getUserInfo.username,
      }
   })
}

export const logoutUser = ()=>(dispatch)=>{
   dispatch({
      type: LOGOUT_USER
   })
}