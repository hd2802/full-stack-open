const mongoose = require('mongoose')

if(process.argv.length < 3) {
    console.log('error: no password provided')
    process.exit(1)
}

const password = process.argv[2]

const url = `mongodb+srv://fullstack:${password}@full-stack-open-part3.pokuber.mongodb.net/?retryWrites=true&w=majority&appName=full-stack-open-part3`

mongoose.set('strictQuery', false)

mongoose.connect(url)

const personSchema = new mongoose.Schema({
    name: String,
    number: String,
})

const Person = mongoose.model('Person', personSchema)

if (process.argv.length < 5) {
    Person.find({}).then(result => {
        result.forEach(person => {
            console.log(`${person.name}, ${person.number}`)
        })
        mongoose.connection.close()
    })
} else {
    const name = process.argv[3]
    const number = process.argv[4]

    const person = new Person({
        name: `${name}`,
        number: `${number}`,
    })

    person.save().then(result => {
        console.log(`${name} added with number${number}`)
        mongoose.connection.close()
    })
}

