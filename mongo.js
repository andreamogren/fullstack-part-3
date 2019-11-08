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
const persons = []

console.log("persons outside forEach/find: ", persons)

const generateId = () => {
  Person.find({}).then(result => {
    console.log("RESULT: ", result)
    result.forEach(person => {
      console.log("person: ", person)
      persons.push(person)
      console.log("persons inside forEach: ", persons)
    })
    console.log(persons.length > 0)
  })
  maxId = persons.length > 0
  ? Math.max(...persons.map(n => n.id))
  : 0 
  return maxId 
}

const person = new Person({
  name: process.argv[3],
  number: process.argv[4],
  id: generateId()
})

person.save().then(response => {
  console.log('person saved!')
  mongoose.connection.close()
})