import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import Cookie from 'js-cookie'
import jwt_decode from 'jwt-decode'
import { useLazyQuery } from '@apollo/client';

import { errorToast } from '../Toastify/Toast'
import { GET_USER_BY_ID } from '../../apollo/queries'
import { login, userInfo } from '../../redux/actions/authActions'

export const AutoLogin = (props) => {
   const [getUserInfo] = useLazyQuery(GET_USER_BY_ID, {
      onCompleted: (user) => {
         props.userInfo(user)
      },
      onError: (err)=>{
         errorToast(err.message)
      }
   })

   useEffect(() => {
      if(!props.user){
         const access = Cookie.get('access-token')
         const refresh = Cookie.get('refresh-token')
         if(access){
            const decodedAccess = jwt_decode(access)
            props.login({
               id: decodedAccess._id,
               email: decodedAccess.email,
               username: decodedAccess.username
            })
         }else if(refresh){
            const decodedRefresh = jwt_decode(refresh)
            getUserInfo({
               variables: {
                  id: decodedRefresh.id
               }
            })
         }
      }
   }, [props, getUserInfo])

   return <></>
}

const mapStateToProps = (state) => ({
   user: state.userData.user
})


export default connect(mapStateToProps, { login, userInfo })(AutoLogin)
