import { keyframes } from 'styled-components'

export const singleShake = keyframes`
   25%{
      transform: rotate(15deg);
      fill: firebrick;
   }
   50%{
      transform: rotate(-30deg);
      fill: crimson;
   }
   75%{
      transform: rotate(5deg);
      fill: lightcoral;
   }
   100%{
      transform: rotate(0deg);
   }
`
export const doubleShake = keyframes`
   0%{
      transform: rotate(0deg);
      fill: red;
   }

   16%{
      transform: rotate(14deg);
      fill: red;
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