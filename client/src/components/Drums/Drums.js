import React, { useState } from 'react'
import { ReactComponent as Drum } from '../../assets/drum.svg'
import styled, {keyframes, css} from 'styled-components'

const rotate = keyframes`
   0%{
      transform: rotate(0deg);
   }

   16%{
      transform: rotate(14deg);
   }

   32%{
      transform: rotate(-14deg);
   }

   64%{
      transform: rotate(14deg);
   }

   85%{
      transform: rotate(-14deg);
   }

   100%{
      transform: rotate(0deg);
   }
`

const DrumsContainer = styled.div`
   margin: 20px;
   width: 10em;
   height: 10em;
`



export default function Drums() {

   const [animate, setAnimate] = useState(false)


   const drumAnimation = ()=>{
      setAnimate(true)
      setTimeout(() => {
         setAnimate(false)
      }, 1000);
   }

   const StyledDrum = styled(Drum)`
      width: 100%;
      height: 100%;
      animation: ${animate ? css`${rotate} 0.5s ease-in-out` : 'initial'};
      animation-direction: alternate;
      background: transparent;
   `
   return (
      <DrumsContainer onClick={()=>drumAnimation()}>
         <StyledDrum />
      </DrumsContainer>
   )
}
