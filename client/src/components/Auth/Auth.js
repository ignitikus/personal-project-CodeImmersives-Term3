import React from 'react'
import { connect } from 'react-redux'
import Modal from '@material-ui/core/Modal';

import Login from './Login'
import Register from './Register'

import grand_piano from '../../assets/grand_piano_90.svg'
import { closeModal, loginMode, registerMode } from '../../redux/actions/authActions'

import './Auth.css'

const pianoDIV ={
   background: `url(${grand_piano}) no-repeat center`,
}


export const Auth = (props) => {

   return (
      <Modal
        open={props.isOpen}
        onClose={props.closeModal}
        className='material-ui-modal'
      >
         <div style={pianoDIV} className='piano-svg'>
            <div className='inner-DIV'>
               <div className='styled-Form-Container'>
                  <div className='span-container'>
                     <span 
                        onClick={props.loginMode} 
                        className={`login-span ${props.mode ? 'active-mode': ''}`}
                     >Login</span>
                     <span
                        onClick={props.registerMode} 
                        className={`register-span ${!props.mode ? 'active-mode': ''}`}
                     >Register</span>
                  </div>
                  {props.mode 
                     ?<Login />
                     :<Register />
                  }
               </div>
            </div>
         </div>
      </Modal>
   )
}

const mapStateToProps = (state) => ({
   isOpen: state.userData.modalOpen,
   mode: state.userData.isLoginMode
})


export default connect(mapStateToProps, { closeModal, loginMode, registerMode })(Auth)
