const { type } = require('express/lib/response')
const mongoose = require('mongoose')

if (process.argv.length < 3) {
  console.log('Please provide the password as an argument: node mongo.js <password>')
  process.exit(1)
}

const password = process.argv[2]

const url =
  `mongodb+srv://Ign:${password}@cluster0.deu4w.mongodb.net/personApp?retryWrites=true&w=majority`

mongoose.connect(url)

const personSchema = new mongoose.Schema({
  name: String,
  number: String
})

const Person = mongoose.model('Person', personSchema)

const person = new Person({
  name: process.argv[3],
  number: process.argv[4]
})

//person.save().then(result => {
  //console.log(`added ${person.name} number ${person.number} to phonebook`)
  //mongoose.connection.close()
//})
//Person.find({}).then(result => {
  //result.forEach(person => {
    //console.log(person)
  //})
  //mongoose.connection.close()
//})

if (process.argv.length === 5) {
  person.save().then(() => {
    console.log(`added ${process.argv[3]} ${process.argv[4]} to phonebook`)
    mongoose.connection.close()
  })
}

if (process.argv.length === 3) {
  Person.find({}).then((result) => {
    console.log('phonebook:')
    result.forEach((person) => {
      console.log(`${person.name} ${person.number}`)
    })
    mongoose.connection.close()
  })
}

if (process.argv.length === 4 || process.argv.length >5) {
  console.log(
    'Please provide the right number of arguments. If the name you are trying to add containes spaces, wrap it in quotes.',
  )
  mongoose.connection.close()
}
