import { ADD_TO_EVENT_LOG, RESET_EVENT_LOG, TOGGLE_SIDE, TOGGLE_RECORDING } from "../constants/eventLogConstants";

const initialState ={
   eventLog: [
      // {key: "a#", time: 1594911654402, difference: 0},
      // {key: "f#", time: 1594911654708, difference: 306},
      // {key: "e", time: 1594911654988, difference: 586},
      // {key: "b", time: 1594911655340, difference: 938},
      // {key: "b", time: 1594911655662, difference: 1260},
      // {key: "e", time: 1594911656368, difference: 1966},
      // {key: "e", time: 1594911656586, difference: 2184},
   ],
   pianoKeys: ['c','c#','d','d#','e','f','f#','g','g#','a','a#','b'],
   side: true,
   recording: false,
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
      default:
         return state
   }
}