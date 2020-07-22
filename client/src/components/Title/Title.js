import React from 'react'
import { connect } from 'react-redux'

import { openModal, logoutUser } from '../../redux/actions/authActions'
import { toggleActiveTab, resetLog } from '../../redux/actions/eventLogActions'
import { ReactComponent as Clef } from '../../assets/treble_clef_1.svg'
import { ReactComponent as Exit } from '../../assets/running-man-exit.svg'
import './Title.css'


export function Title(props) {

   return (
      <> 
         {
            props.user 
            ?<Exit className='exit-sign' onClick={()=>{
               props.logoutUser()
               props.resetLog()
               props.toggleActiveTab(false)
            }}/>
            :<Clef className='clef-key' onClick={props.openModal}/>
         }
         <div id='title'>
            Itsy Bitsy Piano
         </div>
      </>
   )
}


const mapStateToProps = (state) => ({
   user: state.userData.user
})

export default connect(mapStateToProps, { openModal, logoutUser, toggleActiveTab, resetLog })(Title)
