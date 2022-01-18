const mongoose = require('mongoose')

if(process.argv.length < 3 || process.argv.length > 5)
{
    console.log('Please provide password, person name and number as an argument: node mongo.js <password> <person name> <person number>')
    process.exit(1)
}

const password   = process.argv[2]
const url = `mongodb+srv://fullstack-admin:${password}@cluster0.gpehu.mongodb.net/phonebook-app?retryWrites=true&w=majority`
mongoose.connect(url)

const personSchema = new mongoose.Schema({
    name: String,
    number: String
})

const Person = mongoose.model('Person', personSchema)

if(process.argv.length === 3){

    Person.find({}).then(result => {
        console.log("Phonebook:")
        result.forEach(temp => {
            console.log(`${temp.name} ${temp.number}`)
        })
        console.log('Done')
        mongoose.connection.close()
    })
    
} else if(process.argv.length === 5){

    const personName = process.argv[3]
    const personNum  = process.argv[4]

    const person = new Person ({
        name:   personName,
        number: personNum
    })
    
    person.save().then(result => {
        console.log(`Added ${personName} Number: ${personNum} to phonebook.`)
        mongoose.connection.close()
    })
}


