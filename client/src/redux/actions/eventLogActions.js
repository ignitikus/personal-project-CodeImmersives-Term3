import { ADD_TO_EVENT_LOG, RESET_EVENT_LOG, TOGGLE_SIDE, TOGGLE_RECORDING } from '../constants/eventLogConstants'

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