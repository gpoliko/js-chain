const path = require('path')
const express = require('express')
const beersRouter = require('./routes/beer')

const server = express()

server.use(express.json())
server.use(express.static(path.join(__dirname, 'public')))
server.use('/api/v1/beers', beersRouter)

module.exports = server