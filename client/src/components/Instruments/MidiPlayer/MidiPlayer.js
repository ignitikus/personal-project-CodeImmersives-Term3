import React, { useRef, useState, useEffect } from 'react'
import MIDISounds from 'midi-sounds-react'
import Select from 'react-select'

import { ReactComponent as Burger } from '../../../assets/burger.svg'
import Close from '../../../assets/close-x.png'

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
   const [burgerMenu, setBurgerMenu] = useState(false)
   const [showInstrumentList, setShowInstrumentList] = useState(false)
   const [currentInstrument, setCurrentInstrument] = useState(0)

   const customSelect = {
      container: () => ({
         width: `${buttonSize}px`,
         position: 'relative',
         boxSizing: 'border-box',
      }),
      
      menu: (provided, state) => ({
         ...provided,
         width: '300px',
      }),
   }
   const customSelect2 = {
      container: (provided) => ({
         width: '100%',
         position: 'relative',
         boxSizing: 'border-box',
         paddingTop: '10px',
      }),
      
      menu: (provided, state) => ({
         ...provided,
      }),

      menuList: (provided, state) => ({
         ...provided,
         maxHeight: '550px'
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
   
   const changeInstrumentButton =(button)=>{
      setShowInstrumentList(true)
      setCurrentInstrument(button)
   }

   const handleInstrumentChange = (e)=>{
      setShowInstrumentList(false)
      selectedInstrument(e, currentInstrument.key)
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
      setBurgerMenu(false)
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
   
   useEffect(() => {
      document.title = 'Soundboard'
      restoreSettings()
      setInstrumentList(createSelectItems())
      playMidi.current.setMasterVolume(volume/100)
      playMidi.current.cacheInstrument(0)
   }, [])

   return (
      <> 
         <Burger className='burger-menu' onClick={()=>setBurgerMenu(!burgerMenu)}/>
         {
            showInstrumentList &&
            <div className='instruments-modal'>
               <div className='instruments-modal-select'>
                  <Select 
                     options={instrumentList}
                     styles={customSelect2}
                     menuIsOpen={true}
                     onChange={handleInstrumentChange}
                  />
               </div>
            </div>
         }
         {
            burgerMenu && 
               <div className='burger-modal'>
                  <div className='burger-modal-menu'>
                     <div className='input-number burger-input'>
                        <img src={Close} alt="close-button" className='close-button-cross' onClick={()=>setBurgerMenu(false)}/>
                        <div className='burger-labelForRangeSliders'>Master Volume: {volume}</div>
                        <input 
                           type="range" 
                           min='1' 
                           max='100' 
                           value={volume} 
                           onChange={handleVolumeChange}
                        />
                        <div className='burger-labelForRangeSliders'>Number of buttons: {buttons.length}</div>
                        <input 
                           type="range" 
                           min='1' 
                           max='9' 
                           value={numberOfButtons} 
                           onChange={handleNumberChange}
                        />
                        <div className='burger-labelForRangeSliders'>Button size in pixels: {buttonSize}x{buttonSize}</div>
                        <input 
                           type="range" 
                           min='30' 
                           max='110' 
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
                           <div>Instrument:</div>
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
               </div>
         }
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
                              <>
                                 <Select 
                                    options={instrumentList}
                                    styles={customSelect}
                                    className='select-container'
                                    onChange={(e)=>selectedInstrument(e, button.key)}
                                 />
                                 <button className='change-instrument-button' onClick={()=>changeInstrumentButton(button)}>change</button>
                              </>
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