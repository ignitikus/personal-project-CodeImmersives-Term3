import mongoose from 'mongoose'


const CompositionSchema = new mongoose.Schema({
   name: String,
   author: {type: mongoose.Schema.Types.ObjectId, ref:'User'},
   composition: [],
}, {
   timestamps: true
})


export default mongoose.model('Composition', CompositionSchema)