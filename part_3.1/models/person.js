const mongoose = require('mongoose')


mongoose.connect(process.env.MONGOOSE_URI)
        .then(result => {
            console.log("Connected to MongoDB: Phonebook-app")
        })
        .catch(error => {
            console.log("Error connecting to MongoDB:", error.message)
        })

const personSchema = new mongoose.Schema({
    name: String,
    number: String
})

personSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
    }
})


module.exports = mongoose.model('Person', personSchema)
