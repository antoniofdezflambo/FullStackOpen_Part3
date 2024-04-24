const mongoose = require('mongoose')

mongoose.set('strictQuery', false)

const url = process.env.MONGODB_URI

mongoose.connect(url)
    .then(() => console.log('Connecting to MongoDB'))
    .catch(error => console.log('Error connecting to MongoDB:', error))

const personSchema = new mongoose.Schema({
    name: {
        type: String,
        minLength: [3, 'Name too short'],
        required: true
    },
    number: String,
})

personSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
    }
})

module.exports = mongoose.model('Person', personSchema)
