const mongoose = require('mongoose')

if (process.argv.length < 3) {
  console.log('give password as argument')
  process.exit(1)
}

const password = process.argv[2]

const url = 
  `mongodb+srv://fullstack-course:${password}@cluster0-ws80k.mongodb.net/phonebook?retryWrites=true&w=majority`

mongoose.connect(url, {useNewUrlParser: true})

const personSchema = new mongoose.Schema({
  name: String, 
  number: String, 
  id: Number,
})

const Person = mongoose.model('Person', personSchema)

const person = new Person({
  "name": "Arto Hellas",
  "number": "040-123456",
  "id": 1
})

person.save().then(response => {
  console.log('note saved!')
  mongoose.connection.close()
})