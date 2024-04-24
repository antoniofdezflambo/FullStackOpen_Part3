const mongoose = require('mongoose')

if (process.argv.length < 3) {
    console.log('give password as argument')
    process.exit(1)
}

const password = process.argv[2]

const url = process.env.MONGODB_URI

mongoose.set('strictQuery', false)

mongoose.connect(url)

const personSchema = new mongoose.Schema({
    name: String,
    number: String,
})

const Person = new mongoose.model('Person', personSchema)

if (process.argv.length < 5) {
    console.log('Phonebook:')
    Person.find({}).then(result => {
        result.forEach(person =>
            console.log(person.name, person.number)
        )
        mongoose.connection.close()
    })
}

if (process.argv[3] && process.argv[4]) {
    const person = new Person({
        name: process.argv[3],
        number: process.argv[4]
    })

    person.save().then(() => {
        console.log(`Added ${person.name} ${person.number} to phonebook`)
        mongoose.connection.close()
    })
}