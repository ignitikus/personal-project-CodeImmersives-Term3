import React from 'react'
import { connect } from 'react-redux'

import { openModal } from '../../redux/actions/authActions'
import { ReactComponent as Clef } from '../../assets/treble_clef_1.svg'
import { ReactComponent as Exit } from '../../assets/running-man-exit.svg'
import './Title.css'


export function Title(props) {
   return (
      <> 
         {
            props.user 
            ?<Exit className='exit-sign' onClick={props.openModal}/>
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

export default connect(mapStateToProps, {openModal})(Title)
