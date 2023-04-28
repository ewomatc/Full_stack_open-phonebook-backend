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

//get a single phonebook entry
app.get('/api/persons/:id', (req, res) => {
  const id = Number(req.params.id)

  const person = persons.find(person => person.id === id)
})

//delete a single phonbook entry by id
app.delete('/api/persons/:id', (req, res) => {
  const id = req.params.id

  Person.findByIdAndRemove(id)
    .then(res.status(204).end())
    .catch(err => next(err))
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
    .catch(err => next(err))
})

//update a phonebook entry
app.put('/api/persons/:id', (req, res, next) => {
  const {name, number} = req.body

  Person.findByIdAndUpdate(req.params.id, {name, number}, {new: true, runValidators: true, context: 'query'})
    .then(updatedPerson => {res.json(updatedPerson)})
    .catch(err => next(err))
})

//error handler middleware
const errorHandler = (err, req, res, next) => {
  console.log(err.message);

  if(err.name === 'CastError') {
    res.status(400).send(`Wrong id format`)
  } else if(err.name === 'ValidationError') {
    res.status(400).json(err.message)
  }
  next(err)
}
app.use(errorHandler)
//listen for requests
const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`server running on port ${PORT}`)
})