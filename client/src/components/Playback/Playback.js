import React, { useState } from 'react'
import { connect } from 'react-redux'
import PlayCircleOutlineIcon from '@material-ui/icons/PlayCircleOutline';
import SaveAltIcon from '@material-ui/icons/SaveAlt';
import IconButton from '@material-ui/core/IconButton';
import CachedIcon from '@material-ui/icons/Cached';

import { playBack } from '../Instruments/Piano/pianoNotes'
import { resetLog } from '../../redux/actions/eventLogActions'

import './Playback.css'

const iconButton = {
   color: 'red',
   transition: 'All 500ms ease'
}
const disabledButton = {
   color: 'grey',
   transition: 'All 500ms ease'
}

export const Playback = (props) => {

   const [activeTab, setActiveTab] = useState('recording')

   const noteListContainer = {
      position: 'absolute',
      right: 0,
      width: `${props.side ? '20%' : '0'}`,
      minHeight: '20%',
      maxHeight: '50%',
      overflowY: 'auto',
      border: '1px solid black',
      borderRight: 0,
      borderRadius: '15px 0 0 15px',
      boxShadow: '5px 10px #888888',
      padding: '20px 0 20px 0',
   }

   const playbackNotes = () =>{
      playBack(props.eventLog)
   }

   const saveComposition = () =>{
      console.log(props.eventLog)
   }

   const resetEventLog = () => {
      props.resetLog()
   }

   const handleTabClick = (mode) => {
      console.log(mode)
      setActiveTab(mode)
   }
   
   return (
      <div style={noteListContainer}>
         <div className='tabs-container'>
            <div className={`recording-tab ${activeTab==='recording'? 'active' :''}`} onClick={()=>handleTabClick('recording')}>Recording</div>
            <div className={`saved-tab ${activeTab==='saved'? 'active' :''}`} onClick={()=>handleTabClick('saved')}>Saved</div>
         </div>
         {activeTab==='recording' && 
            <>
                  <div className='buttons-container'>
                     <IconButton 
                        onClick={playbackNotes}
                        disabled={props.recording 
                           ? true
                           : props.eventLog.length>1
                              ? false
                              : true
                        } 
                        style={props.eventLog.length>1 
                        ? props.recording 
                           ? disabledButton 
                           : iconButton 
                        : disabledButton}
                     >
                        <PlayCircleOutlineIcon />
                     </IconButton>
                     <IconButton 
                        onClick={saveComposition}
                        disabled={props.recording 
                           ? true
                           : props.eventLog.length>1
                              ? false
                              : true
                        } 
                        style={props.eventLog.length>1 
                        ? props.recording 
                           ? disabledButton 
                           : iconButton 
                        : disabledButton}
                     >
                        <SaveAltIcon />
                     </IconButton>
                     <IconButton 
                        onClick={resetEventLog}
                        disabled={props.recording 
                           ? true
                           : props.eventLog.length>1
                              ? false
                              : true
                        } 
                        style={props.eventLog.length>1 
                        ? props.recording 
                           ? disabledButton 
                           : iconButton 
                        : disabledButton}
                     >
                        <CachedIcon />
                     </IconButton>
                  </div>
               <table style={{width:'100%'}}>
                  <thead>
                     <tr>
                        <th>Note</th>
                        <th>Difference</th>
                     </tr>
                  </thead>
                  <tbody>
                     {props.eventLog.length<1 && 
                        <tr>
                           <td colSpan="2" className='instruction-message'>Press on 'Record' to start recording your creation</td> 
                        </tr>
                     }
                     {props.eventLog.map(note=>{
                        return(
                           <tr key={note.time}>
                              <td className='key-container'>{note.key}</td>
                              <td className='difference-container'>{note.difference}</td>
                           </tr>
                        )
                     })}
                  </tbody>
               </table>
            </>   
         }
      </div>
   )
}

const mapStateToProps = (state) => ({
   eventLog: state.pianoData.eventLog,
   side: state.pianoData.side,
   recording: state.pianoData.recording,
})


export default connect(mapStateToProps, {resetLog})(Playback)
