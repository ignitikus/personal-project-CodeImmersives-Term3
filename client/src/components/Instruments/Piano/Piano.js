import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'

import { pianoFuncStart } from './pianoNotes'
import { addToLog, toggleSide, toggleRecording, toggleActiveTab } from '../../../redux/actions/eventLogActions'
import './Piano.css'


export const Piano = (props) => {
   const [showKeys, setShowKeys] = useState(false)
   const [showKeyboardKeys, setShowKeyboardKeys] = useState(false)
   
   useEffect(() => {
      document.title = 'Itsy Bitsy Piano'
      document.addEventListener('keydown', handleDocumentKeyDown, false)
      return () => {
         document.removeEventListener('keydown', handleDocumentKeyDown, false)
      }
   })

   const handleDocumentKeyDown=(e)=>{
      if(!(props.isSaveModalOpen || props.isLoginModalOpen)){
         switch (e.keyCode) {
            case 83:
               handleOnMouseDown('c')
               break;
            case 68:
               handleOnMouseDown('d')
               break;
            case 70:
               handleOnMouseDown('e')
               break;
            case 72:
               handleOnMouseDown('f')
               break;
            case 74:
               handleOnMouseDown('g')
               break;
            case 75:
               handleOnMouseDown('a')
               break;
            case 76:
               handleOnMouseDown('b')
               break;
            case 69:
               handleOnMouseDown('c#')
               break;
            case 82:
               handleOnMouseDown('d#')
               break;
            case 89:
               handleOnMouseDown('f#')
               break;
            case 85:
               handleOnMouseDown('g#')
               break;
            case 73:
               handleOnMouseDown('a#')
               break;
            default:
               break;
         }
      }
   }

   const handleOnMouseDown = (key) => {
      if(props.recording){
          if(props.eventLog.length >1 &&(Date.now() - props.eventLog[props.eventLog.length-1].time)>8000){
               props.toggleRecording(false)
            }else{
               props.addToLog({
                  key,
                  time: Date.now(),
                  difference: props.eventLog.length > 0 ? (props.eventLog[0].time - Date.now())*-1 : 0
               })
            }
      }
      pianoFuncStart(key)
   }

   const handleCheckbox = () => setShowKeys(!showKeys)
   const handleSide = () => props.toggleSide(!props.side)
   const handleRecording = () => {
      props.toggleRecording(!props.recording)
      props.toggleSide(true)
      props.toggleActiveTab(false)
   }

   return (
      <>
      <div className='piano-container'>
         <div id='buttons-container'>
            <button 
               onClick={handleCheckbox} 
               id='show-hide-button'
            >{showKeys
               ? <div>Hide Keys</div>
               : <div>Show Keys</div>
            }</button>
            <button 
               onClick={()=>setShowKeyboardKeys(!showKeyboardKeys)} 
               id='show-hide-button'
               className='desktop-only-buttons'
            >{showKeyboardKeys
               ? <div>Hide Hotkeys</div>
               : <div>Show Hotkeys</div>
            }</button>
            <button 
               onClick={handleSide} 
               id='show-hide-button'
               className='desktop-only-buttons'
            >{props.side
               ? <div>Hide Side</div>
               : <div>Show Side</div>
            }</button>
            <button 
               onClick={handleRecording} 
               id='record-button'
               className='desktop-only-buttons'
            >{props.recording
               ? <div id='recording'>Recording <span>.</span><span>.</span><span>.</span></div>
               : <div>Record</div>
            }</button>
         </div>
         <ul className="set">
            {props.pianoKeys.map((key, i)=>{
               return(
                  <li 
                     key={key} 
                     className={key.length>1? `black ${key}`: `white ${key}`} 
                     id={key} 
                     onMouseDown={()=>handleOnMouseDown(key)}
                  >
                     <div className='letter-keys'>
                        <span className='piano-keys'>{showKeys && key}</span>
                        <span className='keyboard-keys'>{showKeyboardKeys && `(${props.keyboardKeys[i]})`}</span>
                     </div>
                  </li>
               )
            })}
         </ul>
      </div>
      </>
   )
}

const mapStateToProps = (state) => ({
   eventLog: state.pianoData.eventLog,
   pianoKeys : state.pianoData.pianoKeys,
   side: state.pianoData.side,
   recording: state.pianoData.recording,
   keyboardKeys: state.pianoData.keyboardKeys,
   isSaveModalOpen: state.pianoData.isSaveModalOpen,
   isLoginModalOpen: state.userData.modalOpen,
})

export default connect(mapStateToProps, { addToLog, toggleSide, toggleRecording, toggleActiveTab })(Piano)
