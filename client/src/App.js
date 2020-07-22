import React, { useState ,useEffect } from 'react';
import { Provider } from "react-redux";
import store from './redux/store/store.js'
import { ApolloProvider } from '@apollo/client'
import { apolloClient } from './apollo/apolloClient'

import ToastifyContainer from "./components/Toastify/Toastify";
import Piano from './components/Instruments/Piano/Piano'
import MobilePiano from './components/Instruments/MobilePiano/MobilePiano'
import Title from "./components/Title/Title";
import Playback from "./components/Playback/Playback";
import AuthModal from './components/Auth/Auth'
import AutoLogin from './components/AutoLogin/AutoLogin'


function App() {

  const [mobile, setMobile] = useState(false)

  useEffect(() => {
    // setMobile((typeof window.orientation !== "undefined") 
    //   || (navigator.userAgent.indexOf('IEMobile') !== -1))
  }, [])

  return (
    <ApolloProvider client={apolloClient}>
      <Provider store={store}>
      {
        !mobile
          ? <>
              <AutoLogin />
              <ToastifyContainer />
              <div style={{display:'flex',flexDirection: 'column', justifyContent:'center', alignItems:'center', height: '100%'}}>
                <AuthModal />
                <Title />
                <Piano />
                <Playback />
              </div>
            </>
          : <MobilePiano />
      }
      </Provider>
    </ApolloProvider>
  );
}

export default App;
