import mongoose from 'mongoose'
import { hash } from 'bcryptjs'

const UserSchema = new mongoose.Schema({
   email: {
      type: String, 
      trim: true, 
      required: true, 
      unique: true
   },
   username: {
      type: String,
      trim: true,
      required: true,
      unique: true,
   },
   password: {
      type: String,
      trim: true,
      required: true
   }
}, {
   timestamps: true
})

UserSchema.pre('save', async function(){
   if(this.isModified('password')){
         this.password = await hash(this.password, 10)
   }
})

export default mongoose.model('User', UserSchema)