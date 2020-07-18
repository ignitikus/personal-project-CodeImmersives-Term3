import React, { useState } from 'react'
import { connect } from 'react-redux'
import Modal from '@material-ui/core/Modal';
import grand_piano from '../../assets/grand_piano_90.svg'

import { closeModal, loginMode, registerMode, login, register } from '../../redux/actions/authActions'

import './Auth.css'


const pianoDIV ={
   width: '50%',
   height: '70%',
   padding: '20px',
   display: 'flex',
   borderRadius: '15px',
   outline: 'none',
   background: `url(${grand_piano}) no-repeat center`,
   backgroundSize: 'contain',
}


export const Auth = (props) => {

   const [username, setUsername] = useState('')
   const [email, setEmail] = useState('')
   const [password, setPassword] = useState('')

   const handleChange =(e)=>{
      switch (true) {
         case e.target.id==='register-username':
            setUsername(e.target.value)
            break;
         case e.target.id==='login-email' || e.target.id==='register-email':
            setEmail(e.target.value)
            break;
         case e.target.id==='login-password' || e.target.id==='register-password':
            setPassword(e.target.value)
            break;
         default:
            break;
      }
   }

   const handleSubmit = (mode)=>{
      switch (mode) {
         case 'login':
            props.login({
               email,
               password
            })
            break;
         case 'register':
            props.register({
               username,
               email,
               password
            })
            break;
         default:
            break;
      }
   }


   return (
      <Modal
        open={props.isOpen}
        onClose={props.closeModal}
        className='material-ui-modal'
      >
         <div style={pianoDIV}>
            <div className='inner-DIV'>
               <div className='styled-Form-Container'>
                  <div className='span-container'>
                     <span onClick={props.loginMode} className={`login-span ${props.mode ? 'active-mode': ''}`}>Login</span>
                     <span onClick={props.registerMode} className={`register-span ${!props.mode ? 'active-mode': ''}`}>Register</span>
                  </div>
                  {props.mode && 
                     <div className='styled-Inputs'>
                        <div className="input-field">
                           <input type="text" id="login-email" value={email} onChange={(e)=>handleChange(e)}/>
                           <label htmlFor="login-email">Email</label>
                        </div>
                        <div className="input-field">
                           <input type="text" id="login-password" value={password} onChange={(e)=>handleChange(e)}/>
                           <label htmlFor="login-password">Password</label>
                        </div>
                        <button className='login-button' onClick={()=>handleSubmit('login')}>Login</button>
                     </div>
                  }
                  {!props.mode && 
                     <div className='styled-Inputs'>
                        <div className="input-field">
                              <input type="text" id="register-username" value={username} onChange={(e)=>handleChange(e)}/>
                              <label htmlFor="register-username">Username</label>
                        </div>
                        <div className="input-field">
                              <input type="text" id="register-email" value={email} onChange={(e)=>handleChange(e)}/>
                              <label htmlFor="register-email">Email</label>
                        </div>
                        <div className="input-field">
                           <input type="text" id="register-password" value={password} onChange={(e)=>handleChange(e)}/>
                           <label htmlFor="register-password">Password</label>
                        </div>
                        <button className='register-button' onClick={()=>handleSubmit('register')}>Register</button>
                     </div>
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


export default connect(mapStateToProps, { closeModal, loginMode, registerMode, login, register })(Auth)
