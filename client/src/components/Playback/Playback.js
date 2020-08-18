import React, { useState, useEffect, useRef } from 'react'
import { connect } from 'react-redux'
import PlayCircleOutlineIcon from '@material-ui/icons/PlayCircleOutline';
import SaveAltIcon from '@material-ui/icons/SaveAlt';
import IconButton from '@material-ui/core/IconButton';
import CachedIcon from '@material-ui/icons/Cached';
import CancelIcon from '@material-ui/icons/Cancel';
import Modal from '@material-ui/core/Modal';
import { useQuery, useLazyQuery, useMutation } from '@apollo/client';

import { errorToast, infoToast, successToast } from '../Toastify/Toast'
import { GET_USER_COMPOSITIONS, LOGIN } from '../../apollo/queries'
import { SAVE_MUSIC_PIECE, DELETE_COMPOSITION_BY_ID } from '../../apollo/mutations'
import { playBack } from '../Instruments/Piano/pianoNotes'
import { resetLog, togglePlaying, toggleActiveTab, toggleSaveModal } from '../../redux/actions/eventLogActions'
import { login } from '../../redux/actions/authActions'

import './Playback.css'

export const Playback = (props) => {

   const [isPassOpen, setIsPassOpen] = useState(false)
   const [userComps, setUserComps] = useState([])
   const [passCheck, setPassCheck] = useState('')
   const [compositionName, setCompositionName] = useState(`Composition #${userComps.length+1}`)
   
   const inputRef = useRef()

   const { loading, error, data } = useQuery(GET_USER_COMPOSITIONS,{
      variables:{
         id: props.user ? props.user.id : null
      }
   })


   const [ loginUser ] = useLazyQuery(LOGIN, {
      onCompleted: ({login}) => {
         props.login({
            id: login.id,
            email: login.email,
            username: login.username
         })
         successToast(`Password checks out. You can continue`)
      },
      onError: (err)=>{
         errorToast(err.message)
      }
   })

   const [ saveMutation ] = useMutation(SAVE_MUSIC_PIECE)
   const [ deleteMutation ] = useMutation(DELETE_COMPOSITION_BY_ID)

   useEffect(() => {
      if(data) {
         setUserComps([...data.userCompositions])
      }
      if(error){
         console.log(error)
         if(!error.message === 'Failed to fetch') errorToast(error.message)
      }
   }, [data, error])


   const openModal = ()=>{
      props.toggleSaveModal(true)
      setCompositionName(`Composition #${userComps.length+1}`)
   }

   const openPassCheck = () => setIsPassOpen(true)
   const closePassCheck = () => setIsPassOpen(false)
   const handlePassChange = (e) => setPassCheck(e.target.value)
   const handleTabClick = async(mode) => props.toggleActiveTab(mode)

   const closeModal = ()=>{
      props.toggleSaveModal(false)
      setCompositionName(`Composition #${userComps.length+1}`)
   }

   const handleNameChange = (e)=>{
      if(e.target.value.match(/^[-@./#&+\w\s]*$/)){
         setCompositionName(e.target.value)
      }
   }

   const handlePassSubmit= async()=>{
      try {
         await loginUser({
            variables: {
               email: props.user.email,
               password: passCheck
            }
         })
         setIsPassOpen(false)
      } catch (err) {
         errorToast(err.message)
      }
   }

   const saveComposition = async () =>{
      if(props.isAuth){
         const noTimeEventLog = props.eventLog.map(note=> {
            return {
               key: note.key,
               difference: note.difference         
            }
         })

         await saveMutation({
            refetchQueries: [{
               query: GET_USER_COMPOSITIONS,
               variables: {
                  id: props.user.id
               }
            }],
            variables:{
               name: compositionName,
               author: props.user.id,
               composition: noTimeEventLog
            }
         })

         infoToast(`${compositionName} is saved`)
         props.toggleSaveModal(false)
      }else{
         openPassCheck()
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
   
   const handlePieceDeletion = async(id)=>{
      if(props.isAuth){
         try {
            await deleteMutation({
               refetchQueries: [{
                  query: GET_USER_COMPOSITIONS,
                  variables: {
                     id: props.user.id
                  }
               }],
               variables:{
                  id
               }
            })
         } catch (err) {
            errorToast(err.message)
         }
      }else{
         openPassCheck()
      }
   }

   const playbackAndResetCheck = ()=>{
      if(props.recording) return true
      if(props.eventLog.length<1) return true
      if(props.isPlaying) return true
      return false
   }

   const saveCheck =()=>{
      if(!props.user) return true
      if(props.recording) return true
      if(props.eventLog.length<1) return true
      if(props.isPlaying) return true
      return false
   }

   return (
      <div className={`noteListContainer ${props.side ? 'show-container': 'hide-container'}`}>
         <Modal open={props.isSaveModalOpen} onClose={closeModal} className='material-ui-modal'>
            <div className='naming-container'>
               <div className='modal-title'>Composition name:</div>
               <input 
                  className='modal-input'
                  type="text" 
                  value={compositionName}
                  onChange={handleNameChange}
                  onClick={()=>inputRef.current.select()}
                  autoFocus={true}
                  ref={inputRef}
                  maxLength='25'
               />
               <div className='modal-buttons-container'>
                  <div className='modal-button' onClick={saveComposition}>Save</div>
                  <div className='modal-button' onClick={closeModal}>Cancel</div>
               </div>
            </div>
         </Modal>
         <Modal open={isPassOpen} onClose={closePassCheck} className='material-ui-modal'>
            <div className='verification-container'>
               <div className='verification-title'>Verification:</div>
               <input 
                  className='verification-input'
                  type="password" 
                  value={passCheck}
                  onChange={handlePassChange}
                  autoFocus={true}
                  placeholder='Type in your password'
                  ref={inputRef}
               />
               <div className='modal-buttons-container'>
                  <div className='verification-button' onClick={handlePassSubmit}>Submit</div>
                  <div className='verification-button' onClick={closePassCheck}>Cancel</div>
               </div>
            </div>
         </Modal>
         <div className='tabs-container'>
            <div className={`recording-tab ${!props.activeTabIsSaved? 'active' :''}`} onClick={()=>handleTabClick(false)}>Recording</div>
            {props.user &&
               <div className={`saved-tab ${props.activeTabIsSaved? 'active' :''}`} onClick={()=>handleTabClick(true)}>Saved</div>
            }
         </div>
         {!props.activeTabIsSaved 
            ? <>
                  <div className='buttons-container'>
                     <IconButton 
                        onClick={handleRecordingPlayback}
                        disabled={playbackAndResetCheck()} 
                        className={playbackAndResetCheck()?'disabledButton':'iconButton'}>
                        <PlayCircleOutlineIcon />
                     </IconButton>
                     <IconButton 
                        onClick={openModal}
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
                  <table className='notes-table'>
                     {props.eventLog.length<1
                        ? <thead className='instruction-message'>
                              <tr>
                                 <td colSpan="2">Press on 'Record' <br></br> to start recording your creation</td> 
                              </tr>
                           </thead>
                        : <thead className='note-diff-head'>
                              <tr className='note-diff'>
                                 <th>Note</th>
                                 <th>Diff</th>
                              </tr>
                        </thead>
                     }
                     <tbody>
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
               {loading 
                  ?<div>Loading...</div>
                  : userComps.length > 0
                     ? userComps.map((piece,i)=>{
                        return(
                           <div key={piece.id} className='saved-composition'>
                              <div className='composition-name'>
                                 {piece.name}
                              </div>
                              <div className='saved-icon-buttons'>
                                 <PlayCircleOutlineIcon 
                                    disabled={props.isPlaying ? true : false}
                                    className={`play-icon ${props.isPlaying ?'disabledButton':'iconButton'}`} 
                                    onClick={()=>handlePiecePlayback(piece.composition)}
                                 />
                                 <CancelIcon 
                                    disabled={props.isPlaying ? true : false}
                                    className={`delete-icon ${props.isPlaying ?'disabledButton':'iconButton'}`}
                                    onClick={()=>handlePieceDeletion(piece.id)}
                                 />
                              </div>
                           </div>
                           )
                        })
                     : <div>You have no saved compositions</div>
               }
            </div>
         }
      </div>
   )
}

const mapStateToProps = (state) => ({
   side: state.pianoData.side,
   eventLog: state.pianoData.eventLog,
   isPlaying: state.pianoData.playing,
   recording: state.pianoData.recording,
   activeTabIsSaved: state.pianoData.activeTabIsSaved,
   isSaveModalOpen: state.pianoData.isSaveModalOpen,
   user: state.userData.user,
   isAuth: state.userData.isAuth,
})


export default connect(mapStateToProps, {resetLog, togglePlaying, toggleActiveTab, login, toggleSaveModal})(Playback)
