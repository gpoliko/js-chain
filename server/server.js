const path = require('path')
const express = require('express')
const blocksRouter = require('./routes/routes.js')

const server = express()

server.use(express.json())
server.use(express.static(path.join(__dirname, 'public')))
server.use('/api/v1/blocks', blocksRouter)

module.exports = server