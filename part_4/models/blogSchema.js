// MongoDB Blog Schema
const mongoose = require('mongoose')

const blogSchema = new mongoose.Schema({
    author:String,
    likes: Number,
    title: {
      type:String,
      required: true
    },
    url:  {
      type:String,
       required: true
    },
    
})

blogSchema.set('toJSON', {
    transform: (document, returnedObject) => {
      returnedObject.id = returnedObject._id.toString()
      delete returnedObject._id
      delete returnedObject.__v
    }
  })

module.exports =  mongoose.model('Blog', blogSchema)