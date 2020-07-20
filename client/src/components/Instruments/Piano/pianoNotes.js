import {Howl} from 'howler'

import piano_C from "../../../assets/piano/39187__jobro__piano-ff-040.wav";
import piano_C_Sharp from "../../../assets/piano/39188__jobro__piano-ff-041.wav";
import piano_D from "../../../assets/piano/39189__jobro__piano-ff-042.wav";
import piano_D_Sharp from "../../../assets/piano/39190__jobro__piano-ff-043.wav";
import piano_E from "../../../assets/piano/39191__jobro__piano-ff-044.wav";
import piano_F from "../../../assets/piano/39193__jobro__piano-ff-045.wav";
import piano_F_Sharp from "../../../assets/piano/39194__jobro__piano-ff-046.wav";
import piano_G from "../../../assets/piano/39195__jobro__piano-ff-047.wav";
import piano_G_Sharp from "../../../assets/piano/39196__jobro__piano-ff-048.wav";
import piano_A from "../../../assets/piano/39197__jobro__piano-ff-049.wav";
import piano_A_Sharp from "../../../assets/piano/39198__jobro__piano-ff-050.wav";
import piano_B from "../../../assets/piano/39199__jobro__piano-ff-051.wav";

const note_C =  new Howl({src:[piano_C], volume: 0.35})
const note_C_Sharp =  new Howl({src:[piano_C_Sharp], volume: 0.35})
const note_D =  new Howl({src:[piano_D], volume: 0.35})
const note_D_Sharp =  new Howl({src:[piano_D_Sharp], volume: 0.35})
const note_E =  new Howl({src:[piano_E], volume: 0.35})
const note_F =  new Howl({src:[piano_F], volume: 0.35})
const note_F_Sharp =  new Howl({src:[piano_F_Sharp], volume: 0.35})
const note_G =  new Howl({src:[piano_G], volume: 0.35})
const note_G_Sharp =  new Howl({src:[piano_G_Sharp], volume: 0.35})
const note_A =  new Howl({src:[piano_A], volume: 0.35})
const note_A_Sharp =  new Howl({src:[piano_A_Sharp], volume: 0.35})
const note_B =  new Howl({src:[piano_B], volume: 0.35})

export const pianoFuncStart = (key)=>{
   switch (key) {
      case 'c':
         return note_C.play()
      case 'c#':
         return note_C_Sharp.play()
      case 'd':
         return note_D.play()
      case 'd#':
         return note_D_Sharp.play()
      case 'e':
         return note_E.play()
      case 'f':
         return note_F.play()
      case 'f#':
         return note_F_Sharp.play()
      case 'g':
         return note_G.play()
      case 'g#':
         return note_G_Sharp.play()
      case 'a':
         return note_A.play()
      case 'a#':
         return note_A_Sharp.play()
      case 'b':
         return note_B.play()
      default:
         break;
   }
}

export const playBack = (arr, togglePlaying)=>{
   for(const [index, note] of arr.entries()){
      togglePlaying(true)
      setTimeout(() => {
         pianoFuncStart(note.key)
         if(index === arr.length-1){
            togglePlaying(false)
         }
      }, note.difference);
   }
}