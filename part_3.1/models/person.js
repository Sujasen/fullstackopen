const mongoose        = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')


mongoose.connect(process.env.MONGOOSE_URI)
        .then(result => {
            console.log("Connected to MongoDB: Phonebook-app")
        })
        .catch(error => {
            console.log("Error connecting to MongoDB:", error.message)
        })

const personSchema = new mongoose.Schema({
    name: {
        type: String,
        unique: true,
        minlength: 3,
        required: true
     },
    number: {
        type: String,
        minlength: 8,
        required: true
    }
})

personSchema.plugin(uniqueValidator)

personSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
    }
})


module.exports = mongoose.model('Person', personSchema)
