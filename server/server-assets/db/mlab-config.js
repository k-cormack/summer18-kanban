var mongoose = require('mongoose')
var connectionString = 'mongodb://kcormack:Abcd6789@ds014658.mlab.com:14658/summer18-kanban' //Changed!
var connection = mongoose.connection


mongoose.connect(connectionString, { useMongoClient: true })

connection.on('error', err => {
  console.log('ERROR FROM DATABASE: ', err)
})


connection.once('open', () => {
  console.log('Connected to Database')
})