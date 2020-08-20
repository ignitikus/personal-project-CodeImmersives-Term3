import React, { useRef, useState, useEffect } from 'react'
import MIDISounds from 'midi-sounds-react'
import Select from 'react-select'

import './MidiPlayer.css'

export default function MidiPlayer() {
   const playMidi = useRef(null)

   const [numberOfButtons, setNumberOfButtons] = useState(1)
   const [buttons, setButtons] = useState([{key: 0, instrument: 0}])
   const [buttonSize, setButtonSize] = useState(50)
   const [instrumentList, setInstrumentList] = useState([])
   const [volume, setVolume] = useState(50)
   const [keyEditing, setKeyEditing] = useState(false)
   const [showButtonInstrument, setShowButtonInstrument] = useState(false)

   const customSelect = {
      container: () => ({
         width: `${buttonSize}px`,
         position: 'relative',
         boxSizing: 'border-box'
      }),
      
      menu: (provided, state) => ({
         ...provided,
         width: '300px',
      }),
   }

   const styledButton = {
      width: `${buttonSize}px`,
      height: `${buttonSize}px`,
      margin: '10px'
   }

   const createSelectItems = ()=> {
		if (playMidi.current) {
         let items = [];
         for (let i = 0; i < playMidi.current.player.loader.instrumentKeys().length; i++) {
            items.push({ value: i , label: '' + (i + 0) + '. ' + playMidi.current.player.loader.instrumentInfo(i).title });
         }
			return items;
		}
	}

   const playSound = (instrument) =>{
      playMidi.current.playChordNow(instrument, [60], 1)
   }

   const handleNumberChange = (e)=> {
      if(e.target.value>0){
         setNumberOfButtons(e.target.value)
         if(buttons.length !== Number(e.target.value)){
            if(Number(e.target.value) < buttons.length){
               setButtons(buttons.slice(0, Number(e.target.value)))
            }else{
               const newButtons = []
               for(let i = 0 ; i < Number(e.target.value) - buttons.length; ++i ){
                  newButtons.push({key: buttons.length + i, instrument: 0})
               }
               setButtons([...buttons, ...newButtons])
            }
         }
      }
   }

   const handleButtonSizeChange = (e) => {
      if(e.target.value<=175){
         setButtonSize(e.target.value)
      }
   }

   const selectedInstrument = (e, button) => {
      playMidi.current.cacheInstrument(e.value)
      const buttonsCopy = [...buttons]
      buttonsCopy[button].instrument = e.value
      setButtons(buttonsCopy)
   }

   const handleVolumeChange = (e) => {
      setVolume(e.target.value)
      playMidi.current.setMasterVolume(e.target.value/100)
   }

   const handleToggleChange =()=>{
      setKeyEditing(!keyEditing)
   }
   const handleShowButtonInstrument =()=>{
      setShowButtonInstrument(!showButtonInstrument)
   }

   const handleSave = () =>{
      localStorage.setItem('volume', volume)
      localStorage.setItem('edit-toggle', keyEditing)
      localStorage.setItem('button-size', buttonSize)
      localStorage.setItem('show-instrument-number', showButtonInstrument)
      localStorage.setItem('buttons-number', numberOfButtons)
      localStorage.setItem('buttons', JSON.stringify(buttons))
   }

   const restoreSettings = () => {
      const masterVolume = localStorage.getItem('volume')
      const editToggle = JSON.parse(localStorage.getItem('edit-toggle'))
      const showInstrument = JSON.parse(localStorage.getItem('show-instrument-number'))
      const buttonSize = localStorage.getItem('button-size')
      const buttonQuantity = localStorage.getItem('buttons-number')
      const instruments = JSON.parse(localStorage.getItem('buttons'))

      if(masterVolume)setVolume(masterVolume)
      if(editToggle)setKeyEditing(editToggle)
      if(showInstrument)setShowButtonInstrument(showInstrument)
      if(buttonSize)setButtonSize(buttonSize)
      if(buttonQuantity)setNumberOfButtons(buttonQuantity)
      if(instruments){
         setButtons(instruments)
         for(const entry of instruments){
            playMidi.current.cacheInstrument(entry.instrument)
         }
      }

   }

   const loadMobile = () =>{
      setNumberOfButtons(6)
      setButtons([
         {key: 0, instrument: 0},
         {key: 1, instrument: 0},
         {key: 2, instrument: 0},
         {key: 3, instrument: 0},
         {key: 4, instrument: 0},
         {key: 5, instrument: 0},
         {key: 6, instrument: 0},
         {key: 7, instrument: 0},
         {key: 8, instrument: 0},
      ])
      setButtonSize(90)
      setKeyEditing(false)
      setKeyEditing(true)
      setShowButtonInstrument(false)
   }

   const checkIfMobile = () => {
      if(window.innerWidth <= 700) {
         loadMobile()
      }
   }
   
   useEffect(() => {
      document.title = 'Soundboard'
      restoreSettings()
      checkIfMobile()
      setInstrumentList(createSelectItems())
      playMidi.current.setMasterVolume(volume/100)
      playMidi.current.cacheInstrument(0)
      
   }, [])


   return (
      <> 
         <div className='rightDrawer'>
            <div className='input-number'>
               <div className='labelForRangeSliders'>Master Volume: {volume}</div>
               <input 
                  type="range" 
                  min='1' 
                  max='100' 
                  value={volume} 
                  onChange={handleVolumeChange}
               />
               <div className='labelForRangeSliders'>Number of buttons: {buttons.length}</div>
               <input 
                  type="range" 
                  min='1' 
                  max='32' 
                  value={numberOfButtons} 
                  onChange={handleNumberChange}
               />
               <div className='labelForRangeSliders'>Button size in pixels: {buttonSize}x{buttonSize}</div>
               <input 
                  type="range" 
                  min='30' 
                  max='175' 
                  value={buttonSize} 
                  onChange={handleButtonSizeChange}
               />
               <div className='toggle edit-toggle'>
                  <div>Edit Keys:</div>
                  <label className="switch">
                     <input type="checkbox" onChange={handleToggleChange} checked={keyEditing}/>
                     <span className="slider round"></span>
                  </label>
               </div>
               <div className='toggle'>
                  <div>Show Instrument Number:</div>
                  <label className="switch">
                     <input type="checkbox" onChange={handleShowButtonInstrument} checked={showButtonInstrument}/>
                     <span className="slider round"></span>
                  </label>
               </div>
               <div className='save-button'>
                  <button onClick={handleSave}>
                     Save Settings
                  </button>
               </div>
            </div>
         </div>
         <div className='main-container'>
            <MIDISounds 
               ref={playMidi}
               instruments={[3]} 
            />
            <div className='midi-buttons-container'>
               {
                  buttons.map(button=>{
                     return(
                        <div key={button.key} className='single-button'>
                           <button 
                              onMouseDown={()=>playSound(button.instrument)} 
                              style={styledButton} 
                              className='musical-button'
                           >
                              {showButtonInstrument && button.instrument}
                           </button>
                           {keyEditing && 
                              <Select 
                                 options={instrumentList}
                                 styles={customSelect}
                                 className='select-container'
                                 onChange={(e)=>selectedInstrument(e, button.key)}
                              />
                           }
                        </div>
                     )
                  })
               }
            </div>
         </div>
      </>
   )
}