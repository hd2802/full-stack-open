const mongoose = require('mongoose')

if (process.argv.length < 3) {
  console.log('give password as argumnet')
  process.exit(1)
}
else {
  const password = process.argv[2]

  const url = `mongodb+srv://mhartlanddykes18:${password}@cluster0.dnetyax.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`

  mongoose.set('strictQuery', false)

  mongoose.connect(url)

  const personSchema = new mongoose.Schema({
    name: String,
    number: String
  })

  const Person = mongoose.model('Person', personSchema)

  if (process.argv.legnth === 5) {
    const person = new Person({
      name: process.argv[3],
      number: process.argv[4]
    })

    person.save().then(() => {
      console.log(`Person with name ${process.argv[3]} and number ${process.argv[4]} successfully saved`)
      mongoose.connection.close()
    })  
  }
  else {
    Person.find({}).then(result => {
      result.forEach(person => {
        console.log(`${person.name}, ${person.number}`)
      })
      mongoose.connection.close()
    })
  }
}

