const express = require('express')

const app = express()

//persons array
let persons = [
  { 
    id: 1,
    name: "Arto Hellas", 
    number: "040-123456"
  },
  { 
    id: 2,
    name: "Ada Lovelace", 
    number: "39-44-5323523"
  },
  { 
    id: 3,
    name: "Dan Abramov", 
    number: "12-43-234345"
  },
  { 
    id: 4,
    name: "Mary Poppendieck", 
    number: "39-23-6423122"
  }
]
//get request for all persons
app.get('/api/persons', (req, res) => {
  res.json(persons)
  console.log('GET request made for persons')
})

//get info page
app.get('/info', (req, res) => {
  const currentPersons = persons.length  

  res.send(`Phonebook has info for ${currentPersons} people

  ${Date()}`)

})

//get a single phonebook entry
app.get('/api/persons/:id', (req, res) => {
  const id = Number(req.params.id)

  const person = persons.find(person => person.id === id)
  //send a person response if person id exists, send a 404 if it doesnt
  if(person) {
    res.json(person)
    console.log(`request made for note: ${person.id}`);
  } else {
    res.status(404).end()
  }
})

//delete a single phonbook entry by id
app.delete('/api/persons/:id', (req, res) => {
  const id = Number(req.params.id)

  persons = persons.filter(person => person.id !== id)
  console.log('data deleted successfully')
  res.status(204).end()
})

//post a new phonebook entry
const newId = Math.floor(Math.random() * 10)

app.post('/api/persons', (request, response) => {
  const body = request.body

  if (!body.name || !body.number || persons.hasOwnProperty('name')) {
    return response.status(400).json({ 
      error: 'record already exists' 
    })
  }

  const entry = {
    name: body.name,
    number: body.number,
    id: newId
  }

  persons = persons.concat(entry)
  response.json(entry)
})

//listen for requests
const PORT = 3000
app.listen(PORT, () => {
  console.log(`server running on port ${PORT}`)
})