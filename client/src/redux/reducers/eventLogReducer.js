import { 
   ADD_TO_EVENT_LOG, 
   RESET_EVENT_LOG, 
   TOGGLE_SIDE, 
   TOGGLE_RECORDING,
   TOGGLE_PLAYING,
   TOGGLE_ACTIVE_TAB,
    } from "../constants/eventLogConstants";

const initialState ={
   eventLog: [],
   pianoKeys: ['c','c#','d','d#','e','f','f#','g','g#','a','a#','b'],
   side: true,
   recording: false,
   playing: false,
   activeTabIsSaved: false,
}

export default function (state = initialState, action) {
   switch (action.type) {
      case ADD_TO_EVENT_LOG:
         return {
            ...state,
            eventLog: [...state.eventLog, action.payload]
         }
      case RESET_EVENT_LOG:
         return {
            ...state,
            eventLog: []
         }
      case TOGGLE_SIDE: 
         return {
            ...state,
            side: action.payload
         }
      case TOGGLE_RECORDING: 
         return {
            ...state,
            recording: action.payload
         }
      case TOGGLE_PLAYING: 
         return {
            ...state,
            playing: action.payload
         }
      case TOGGLE_ACTIVE_TAB: 
         return {
            ...state,
            activeTabIsSaved: action.payload
         }
      default:
         return state
   }
}