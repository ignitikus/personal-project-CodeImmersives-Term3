import React, { useState, useEffect } from 'react';
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
import MidiPlayer from "./components/Instruments/MidiPlayer/MidiPlayer";

function App() {

  const [pianoMode, setPianoMode] = useState(true)

  const changeMode = ()=>{
    setPianoMode(!pianoMode)
    localStorage.setItem('mode', !pianoMode)
  }

  useEffect(() => {
    const modeFromLC = localStorage.getItem('mode')

    if(modeFromLC){
      setPianoMode(JSON.parse(modeFromLC))
    }else{
      setPianoMode(true)
    }
  }, [])

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
          {
            window.innerWidth >= 450 &&
            <>
              <AutoLogin />
              <ToastifyContainer />
            </>
          }
          <div className='main-content-container '>
            <div className= {`instrument-toggle ${pianoMode? '': 'right-indent'}`}>
              <div className='labels'>Piano</div>
              <label className="switch">
                  <input type="checkbox" onChange={changeMode} checked={!pianoMode}/>
                  <span className="slider round" style={{backgroundColor: 'red'}}></span>
              </label>
              <div className='labels'>Soundboard</div>
            </div>
            {
              pianoMode 
                ? <>
                    <AuthModal />
                    <Title />
                    <Piano />
                    <Playback />
                  </>
                : <MidiPlayer />
            }
          </div>
        </>
      </Provider>
    </ApolloProvider>
  );
}

export default App;

