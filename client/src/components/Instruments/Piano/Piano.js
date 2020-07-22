import React, { useState } from 'react'
import { connect } from 'react-redux'

import { pianoFuncStart } from './pianoNotes'
import { addToLog, toggleSide, toggleRecording, toggleActiveTab } from '../../../redux/actions/eventLogActions'
import './Piano.css'


export const Piano = (props) => {
   const [showKeys, setShowKeys] = useState(false)

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
               onClick={handleSide} 
               id='show-hide-button'
            >{props.side
               ? <div>Hide Side</div>
               : <div>Show Side</div>
            }</button>
            <button 
               onClick={handleRecording} 
               id='record-button'
            >{props.recording
               ? <div id='recording'>Recording <span>.</span><span>.</span><span>.</span></div>
               : <div>Record</div>
            }</button>
         </div>
         <ul className="set">
            {props.pianoKeys.map(key=>{
               return(
                  <li 
                     key={key} 
                     className={key.length>1? `black ${key}`: `white ${key}`} 
                     id={key} 
                     onMouseDown={()=>handleOnMouseDown(key)}
                  >
                     <span className='piano-keys'>{showKeys && key}</span>
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
})

export default connect(mapStateToProps, { addToLog, toggleSide, toggleRecording, toggleActiveTab })(Piano)
