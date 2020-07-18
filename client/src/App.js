import React from 'react';
import { Provider } from "react-redux";
import store from './redux/store/store.js'

import Piano from './components/Instruments/Piano/Piano'
import Title from "./components/Title/Title";
import Playback from "./components/Playback/Playback";
import AuthModal from './components/Auth/Auth'

function App() {
  return (
    <Provider store={store}>
      <div style={{display:'flex',flexDirection: 'column', justifyContent:'center', alignItems:'center', height: '100%'}}>
        <AuthModal />
        <Title />
        <Piano />
        <Playback />
      </div>
    </Provider>
  );
}

export default App;
