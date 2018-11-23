const mongoose = require('mongoose')

// import environment variables from the .env file
require('dotenv').config({ path: 'variables.env' })

// connect to database and handle bad connections
mongoose.connect(process.env.DATABASE, { useNewUrlParser: true })
mongoose.Promise = global.Promise
mongoose.connection.on('error', err => {
    console.error('Error on databse connection: ', err.message)
})

// import all models

require('./models/Words')

// start the server ->

const app = require('./server')
app.set('port', process.env.PORT || 3000)

const server = app.listen(app.get('port'), function() {
    console.log(`Express running → PORT ${server.address().port}`);
})