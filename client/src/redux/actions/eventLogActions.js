import { 
   ADD_TO_EVENT_LOG, 
   RESET_EVENT_LOG, 
   TOGGLE_SIDE, 
   TOGGLE_RECORDING,
   TOGGLE_PLAYING,
   TOGGLE_ACTIVE_TAB,
   TOGGLE_SAVE_MODAL,
    } from '../constants/eventLogConstants'

export const addToLog = (event) => (dispatch)=>{
   dispatch({
      type: ADD_TO_EVENT_LOG,
      payload: event
   })
}

export const resetLog = () => (dispatch)=>{
   dispatch({
      type: RESET_EVENT_LOG
   })
}

export const toggleSide = (bool) =>(dispatch)=>{
   dispatch({
      type: TOGGLE_SIDE,
      payload: bool
   })
}

export const toggleRecording = (bool) =>(dispatch)=>{
   dispatch({
      type:TOGGLE_RECORDING,
      payload: bool
   })
}

export const togglePlaying = (bool) =>(dispatch) =>{
   dispatch({
      type:TOGGLE_PLAYING,
      payload: bool
   })
}

export const toggleActiveTab = (bool) =>(dispatch) =>{
   dispatch({
      type: TOGGLE_ACTIVE_TAB,
      payload: bool
   })
}

export const toggleSaveModal = (bool) =>(dispatch)=>{
   dispatch({
      type: TOGGLE_SAVE_MODAL,
      payload: bool
   })
}