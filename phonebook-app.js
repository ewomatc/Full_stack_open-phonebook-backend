require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const Person = require('./models/person')

const app = express()
app.use(express.json())


//get request for all persons
app.get('/api/persons', (req, res) => {
  Person.find({})
    .then(result => res.json(result), console.log('REQUEST MADE FOR ALL NOTES'))
    .catch(err =>  console.log(err.message))
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
  const id = req.params.id

  Person.findByIdAndRemove(id)
    .then(res.status(204).end())
    .catch(err => {console.log(err.message)})
})

//post a new phonebook entry
app.post('/api/persons', (req, res) => {
  const body = req.body

  newEntry = new Person({
    name: body.name,
    number: body.number
  })

  newEntry.save()
    .then(result => res.json(result))
    .catch(err => console.log(err.message))
})


//error handler middleware
const errorHandler = (err, req, res, next) => {
  console.log(err.message);

  if(err.name === CastError) {
    res.status(404).send(`Wrong id format`)
  }
  next(err)
}
app.use(errorHandler)
//listen for requests
const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`server running on port ${PORT}`)
})