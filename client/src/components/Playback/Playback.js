import React, { useState } from 'react'
import { connect } from 'react-redux'
import PlayCircleOutlineIcon from '@material-ui/icons/PlayCircleOutline';
import SaveAltIcon from '@material-ui/icons/SaveAlt';
import IconButton from '@material-ui/core/IconButton';
import CachedIcon from '@material-ui/icons/Cached';
import { useLazyQuery, useMutation } from '@apollo/client';

import { errorToast } from '../Toastify/Toast'
import { GET_USER_COMPOSITIONS } from '../../apollo/queries'
import { SAVE_MUSIC_PIECE } from '../../apollo/mutations'
import { playBack } from '../Instruments/Piano/pianoNotes'
import { resetLog, togglePlaying, toggleActiveTab } from '../../redux/actions/eventLogActions'

import './Playback.css'

export const Playback = (props) => {

   const [userComps, setUserComps] = useState([])

   const [ getCompositions, { loading } ] = useLazyQuery(GET_USER_COMPOSITIONS, {
      onCompleted: ({userCompositions}) => {
         setUserComps([...userCompositions])
      },
      onError: (err)=>{
         errorToast(err.message)
      }
   })

   const [ saveMutation ] = useMutation(SAVE_MUSIC_PIECE)

   const saveComposition =async () =>{
      if(props.isAuth){
         const noTimeEventLog = props.eventLog.map(note=> {
            return {
               key: note.key,
               difference: note.difference         
            }
         })

         await saveMutation({
            variables:{
               author: props.user.id,
               composition: noTimeEventLog
            }
         })
      }else{
         console.log('Not authorized')
      }
   }

   const handleTabClick = async(mode) => {
      props.toggleActiveTab(mode)
      if(mode){
         if(loading) return setUserComps(['Loading ...'])
         await getCompositions({
            variables:{
               id: props.user.id
            }
         })
      }
   }

   const handleRecordingPlayback = ()=>{
      if(!props.isPlaying){
         playBack(props.eventLog, props.togglePlaying)
      }
   }

   const handlePiecePlayback = (comp)=>{
      if(!props.isPlaying){
         playBack(comp, props.togglePlaying)
      }
   }

   const playbackAndResetCheck = ()=>{
      if(props.recording) return true
      if(props.eventLog.length<1) return true
      return false
   }

   const saveCheck =()=>{
      if(props.recording) return true
      if(props.eventLog.length<1) return true
      return false
   }


   return (
      <div className={`noteListContainer ${props.side ? 'show-container': 'hide-container'}`}>
         <div className='tabs-container'>
            <div className={`recording-tab ${!props.activeTabIsSaved? 'active' :''}`} onClick={()=>handleTabClick(false)}>Recording</div>
            {props.user &&
               <div className={`saved-tab ${props.activeTabIsSaved? 'active' :''}`} onClick={()=>handleTabClick(true)}>Saved</div>
            }
         </div>
         {!props.activeTabIsSaved ? 
            <>
               <div className='buttons-container'>
                  <IconButton 
                     onClick={handleRecordingPlayback}
                     disabled={playbackAndResetCheck()} 
                     className={playbackAndResetCheck()?'disabledButton':'iconButton'}>
                     <PlayCircleOutlineIcon />
                  </IconButton>
                  <IconButton 
                     onClick={saveComposition}
                     disabled={saveCheck()} 
                     className={saveCheck()?'disabledButton':'iconButton'}>
                     <SaveAltIcon />
                  </IconButton>
                  <IconButton 
                     onClick={props.resetLog}
                     disabled={playbackAndResetCheck()} 
                     className={playbackAndResetCheck()?'disabledButton':'iconButton'}>
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
                           <td colSpan="2" className='instruction-message'>Press on 'Record' <br></br> to start recording your creation</td> 
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
            
            :<div className='saved-compositions-container'>
               {userComps.map((piece,i)=>{
                  return(
                     <div key={piece.id} className='saved-composition'>
                        <div>
                           {`Composition #${i+1}`}
                        </div>
                        <div onClick={()=>handlePiecePlayback(piece.composition)}>
                           <PlayCircleOutlineIcon />
                        </div>
                     </div>
                  )
               })}
            </div>
         }
      </div>
   )
}

const mapStateToProps = (state) => ({
   side: state.pianoData.side,
   eventLog: state.pianoData.eventLog,
   isPlaying: state.pianoData.playing,
   activeTabIsSaved: state.pianoData.activeTabIsSaved,
   recording: state.pianoData.recording,
   user: state.userData.user,
   isAuth: state.userData.isAuth,
})


export default connect(mapStateToProps, {resetLog, togglePlaying, toggleActiveTab})(Playback)
