import React, { useState } from 'react'
import { connect } from 'react-redux'
import { useLazyQuery } from '@apollo/client';

import { successToast, errorToast } from '../Toastify/Toast'
import { login } from '../../redux/actions/authActions'
import { LOGIN } from '../../apollo/queries'

export const Login = (props) => {
   const [email, setEmail] = useState('')
   const [password, setPassword] = useState('')

   const [ loginUser ] = useLazyQuery(LOGIN, {
      onCompleted: ({login}) => {
         props.login({
            id: login.id,
            email: login.email,
            username: login.username
         })
         successToast(`Welcome back, ${login.username}`)
      },
      onError: (err)=>{
         errorToast(err.message)
      }
   })

   const handleChange =(e)=>{
      switch (true) {
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


   return (
      <div className='styled-Inputs'>
         <div className="input-field">
            <input type="text" id="login-email" value={email} onChange={(e)=>handleChange(e)}/>
            <label htmlFor="login-email">Email</label>
         </div>
         <div className="input-field">
            <input type="password" id="login-password" value={password} onChange={(e)=>handleChange(e)}/>
            <label htmlFor="login-password">Password</label>
         </div>
         <button className='login-button' onClick={() => loginUser(
            { 
               variables: {
                  email,
                  password
               } 
            }
      )} disabled={email.length < 1 || password.length < 1}>Login</button>
      </div>
   )
}

const mapStateToProps = (state) => ({
   
})


export default connect(mapStateToProps, { login })(Login)
