import React from 'react';
import { Provider } from "react-redux";
import store from './redux/store/store.js'
import { ApolloProvider } from '@apollo/client'
import { apolloClient } from './apollo/apolloClient'

import ToastifyContainer from "./components/Toastify/Toastify";
import Piano from './components/Instruments/Piano/Piano'
import Title from "./components/Title/Title";
import Playback from "./components/Playback/Playback";
import AuthModal from './components/Auth/Auth'
import AutoLogin from './components/AutoLogin/AutoLogin'

function App() {
  return (
    // provides Apollo client functions to all children components
    <ApolloProvider client={apolloClient}>
      <Provider store={store}>
        <>
          {/* Auto logins user if access token is present in cookies.
            if access token is  missing, 
            refresh token would be used to retrieve user info
            but without ability to make changes.
          */}
          <AutoLogin />
          <ToastifyContainer />
          <div className='main-content-container'>
            {/* Holds login and register modal */}
            <AuthModal />
            {/* Holds title, login/register icon, and logout icon */}
            <Title />
            <Piano />
            {/* Holds sidebar*/}
            <Playback />
          </div>
        </>
      </Provider>
    </ApolloProvider>
  );
}

export default App;
