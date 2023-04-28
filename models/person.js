const mongoose = require('mongoose')


const url = process.env.MONGODB_URI
console.log(`connecting to ---- `, url)

mongoose.connect(url, {useUnifiedTopology: true, useNewUrlParser: true})
  .then(() => {
    console.log('connected to database');
  }) .catch(err => {
    console.log('error connecting to db ---- ', err);
  })

const personSchema = new mongoose.Schema({
  name: String,
  number: String
})


module.exports = mongoose.model('Person', personSchema)
