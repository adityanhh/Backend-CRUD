const express = require('express')
const app = express()
const port = 3000
const bodyParser = require('body-parser')
const db = require('./dbconnection')
const response = require ('./response')

app.use(bodyParser.json())

app.get('/', (req, res) => {
  response(200, 'API Ready','Success', res)
})
app.get('/mahasiswa', (req, res) => {
  const sql = 'SELECT * FROM mahasiswa'
  db.query(sql, (error, fields) => {
    if (error) throw error
    response(200, fields,'Success maz', res)
  })
})

app.get('/mahasiswa/:nim', (req, res) => {
  const nim = req.params.nim
  response(200, `Get mahasiswa by spesific nim ${nim}`, 'Success', res)
})

app.post('/mahasiswa/post', (req, res) => {
  console.log('jalan')
  response(200, 'ini post data', 'ini message', res)
})

app.put('/mahasiswa/put', (req, res) => {
  response(200, 'ini put/edit data', 'ini message', res)
})

app.delete('/mahasiswa/delete', (req, res) => {
  response(200, 'ini delete data', 'ini message', res)
})
  
app.listen(port, () => {
  console.log(`app listenin' on port ${port} shizz`)
})