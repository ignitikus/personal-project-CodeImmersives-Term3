import { OPEN_MODAL, CLOSE_MODAL, LOGIN_MODE, REGISTER_MODE, LOGIN, REGISTER } from '../constants/authConstants'

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
   console.log(user)
   //make server call
   dispatch({
      type: LOGIN,
      payload: user
   })
}

export const register = (user)=>(dispatch)=>{
   console.log(user)
   //make server call
   dispatch({
      type: REGISTER,
      payload: user
   })
}