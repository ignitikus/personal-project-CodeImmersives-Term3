import React from 'react'
import { ReactComponent as LinkedIn } from '../../assets/linkedin.svg'
import GithubLogo from '../../assets/github.png' 
import Email from '../../assets/email.png' 

import './Footer.css'

export default function Footer({mode}) {
   return (
      <div className={ `footer-container ${mode ? 'piano-footer': 'soundboard-footer'}`}>
         <div className='copyright'>Niko Studio &copy;2020</div>
         <div className='contacts'>
            <a href="mailto:nikgnis@gmail.com"><img src={Email} alt="email link" className='icon'/></a>
            <a href="https://www.linkedin.com/in/nikolay-kim-392234aa" target='_blank'><LinkedIn className='icon'/></a>
            <a href="https://github.com/ignitikus" target='_blank'><img src={GithubLogo} alt="github logo" className='icon'/></a>
         </div>
      </div>
   )
}
