import React from 'react'
import { connect } from 'react-redux'

import { openModal } from '../../redux/actions/authActions'
import { ReactComponent as Clef } from '../../assets/treble_clef_1.svg'
import './Title.css'


export function Title(props) {
   return (
      <> 
         <Clef className='clef-key' onClick={props.openModal}/>
         <div id='title'>
            Itsy Bitsy Piano
         </div>
      </>
   )
}


const mapStateToProps = (state) => ({
   
})

export default connect(mapStateToProps, {openModal})(Title)
