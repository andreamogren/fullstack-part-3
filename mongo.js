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

Person.find({}).then(result => {
  console.log(result)
/*   result.forEach(person => {
    console.log("person: ", person)
    persons.concat(person)
    console.log("persons inside forEach: ", persons)
  }) */
})

console.log("persons outside forEach/find: ", persons)

const generateId = () => {
  const maxId = persons.length > 0
    ? Math.max(...persons.map(n => n.id))
    : 0
    return maxId + 1
}

console.log("generateId: ", generateId())

mongoose.connection.close()

/*const person = new Person({
  name: process.argv[3],
  number: process.argv[4],
  id: 1
})

person.save().then(response => {
  console.log('note saved!')
  mongoose.connection.close()
})*/