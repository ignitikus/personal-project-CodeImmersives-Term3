import React, { useState } from 'react'
import { connect } from 'react-redux'
import { useQuery, useMutation } from '@apollo/client';
import CancelIcon from '@material-ui/icons/Cancel';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import Tooltip from '@material-ui/core/Tooltip';

import { successToast, errorToast } from '../Toastify/Toast'
import { register } from "../../redux/actions/authActions";
import { GET_USERS } from '../../apollo/queries'
import { REGISTER } from '../../apollo/mutations'


export const Register = (props) => {
   const [username, setUsername] = useState('')
   const [userNameDuplicate, setUserNameDuplicate] = useState(false)
   const [email, setEmail] = useState('')
   const [emailDuplicate, setEmailDuplicate] = useState(false)
   const [emailRegex, setEmailRegex] = useState(false)
   const [password, setPassword] = useState('')
   const [passwordValidation, setPasswordValidation] = useState(false)

   const { loading, error, data } = useQuery(GET_USERS)
   const [ registerMutation ] = useMutation(REGISTER)


   let userNames = []
   let emailList = []
   if(!error && !loading){
      userNames = data.users.map(user=> user.username)
      emailList = data.users.map(user=> user.email)
   }

   const handleChange =(e)=>{
      switch (true) {
         case e.target.id==='register-username':
            setUsername(e.target.value)
            setUserNameDuplicate(userNames.includes(e.target.value))
            break;
         case e.target.id==='login-email' || e.target.id==='register-email':
            setEmail(e.target.value)
            if(e.target.value.match(/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/)){
               setEmailRegex(true)
               if(emailList.includes(e.target.value)){
                  setEmailDuplicate(true)
               }else{
                  setEmailDuplicate(false)
               }
            }else{
               setEmailRegex(false)
               setEmailDuplicate(true)
            }
            break;
         case e.target.id==='login-password' || e.target.id==='register-password':
            setPassword(e.target.value)
            if(e.target.value.match(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,30}$/)){
               setPasswordValidation(true)
            }else{
               setPasswordValidation(false)
            }
            break;
         default:
            break;
      }
   }

   const handleSubmit = async()=>{
      try {
         const result = await registerMutation({
            variables: {
               username,
               email,
               password
            }
         })
         props.register({
            id: result.data.register.id,
            username: result.data.register.username,
            email: result.data.register.email
         })
         successToast(`Welcome, ${result.data.register.username}!`)
      } catch (error) {
         error.message
            .split('ValidationError:')[1]
               .split('.')
                  .map(message=>errorToast(message))
      }
   }

   return (
      <div className='styled-Inputs'>
         <div className="input-field">
               <input type="text" id="register-username" value={username} onChange={(e)=>handleChange(e)}/>
               <label htmlFor="register-username" className={`${username.length>0? 'custom-label': '' }`}>Username</label>
               {
                  username.length>3 
                     ?userNameDuplicate
                        ?<div className='cross-icon'>
                           <Tooltip title={<span style={{fontSize: '1.5em'}}>Username already in use</span>} placement='top-start' arrow>
                              <CancelIcon />
                           </Tooltip>
                        </div>
                        :<div className='check-icon'>
                           <CheckCircleIcon />
                        </div>
                     : null
               }
         </div>
         <div className="input-field">
               <input type="text" id="register-email" value={email} onChange={(e)=>handleChange(e)}/>
               <label htmlFor="register-email" className={`${email.length>0? 'custom-label': '' }`}>Email</label>
               {
                  email.length>0 
                     ? emailRegex
                        ? emailDuplicate
                           ?<div className='cross-icon'>
                              <Tooltip title={<span style={{fontSize: '1.5em'}}>Email already registered</span>} placement='top-start' arrow>
                                 <CancelIcon />
                              </Tooltip>
                           </div>
                           :<div className='check-icon'>
                              <CheckCircleIcon />
                           </div>
                        : <div className='cross-icon'>
                              <Tooltip title={<span style={{fontSize: '1.5em'}}>Must be a valid email format</span>} placement='top-start' arrow>
                                 <CancelIcon />
                              </Tooltip>
                           </div>
                     : null
               }
         </div>
         <div className="input-field">
            <input type="password" id="register-password" value={password} onChange={(e)=>handleChange(e)}/>
            <label htmlFor="register-password" className={`${password.length>0? 'custom-label': '' }`}>Password</label>
            {
               password.length>0
                  ? passwordValidation
                     ?<div className='check-icon'>
                        <CheckCircleIcon />
                     </div>
                     :<div className='cross-icon'>
                        <Tooltip title={<span style={{fontSize: '1.5em'}}>Password must have at least one lowercase letter, one uppercase letter, one digit, and one special character</span>} placement='top-start' arrow>
                           <CancelIcon />
                        </Tooltip>
                     </div>
                  : null
            }
         </div>
         <button 
            className={`register-button ${!(!userNameDuplicate && !emailDuplicate && passwordValidation && emailRegex && username.length>3)? 'disabled-button': ''}`}
            onClick={()=>handleSubmit()}
            disabled={!(!userNameDuplicate && !emailDuplicate && passwordValidation && emailRegex && username.length>3)}
         >Register</button>
      </div>
   )
}

const mapStateToProps = (state) => ({
   
})


export default connect(mapStateToProps, {register})(Register)
