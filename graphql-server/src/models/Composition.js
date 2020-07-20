import mongoose from 'mongoose'


const CompositionSchema = new mongoose.Schema({
   composition: [],
   author: {type: mongoose.Schema.Types.ObjectId, ref:'User'},
}, {
   timestamps: true
})


export default mongoose.model('Composition', CompositionSchema)