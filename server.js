const express = require('express')
const app = express()
const port = 3000
const bodyParser = require('body-parser')
const db = require('./dbconnection')
const response = require ('./response')

app.use(bodyParser.json())

app.get('/', (req, res) => {
  response(200, 'Hello World!')
})

app.post('/mahasiswa/put', (req, res) => {
  res.send('ini put data')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})