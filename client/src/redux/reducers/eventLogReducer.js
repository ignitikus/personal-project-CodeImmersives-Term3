import { 
   ADD_TO_EVENT_LOG, 
   RESET_EVENT_LOG, 
   TOGGLE_SIDE, 
   TOGGLE_RECORDING,
   TOGGLE_PLAYING,
   TOGGLE_ACTIVE_TAB,
   TOGGLE_SAVE_MODAL,
    } from "../constants/eventLogConstants";

const initialState ={
   eventLog: [],
   pianoKeys: ['c','c#','d','d#','e','f','f#','g','g#','a','a#','b'],
   keyboardKeys: ['s','e','d','r','f','h','y','j','u','k','i','l',],
   side: false,
   recording: false,
   playing: false,
   activeTabIsSaved: false,
   isSaveModalOpen: false
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
      case TOGGLE_SAVE_MODAL: 
         return {
            ...state,
            isSaveModalOpen: action.payload
         }
      default:
         return state
   }
}