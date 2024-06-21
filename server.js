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
  const sql = `SELECT * FROM mahasiswa WHERE nim = ${nim}`
  db.query(sql, (error, fields) => {
    if (error) throw error
    response(200, fields, 'Success', res)
  })
})

app.post('/mahasiswa/post', (req, res) => {
  const { nim, nama, alamat, jurusan } = req.body
  const sql = `INSERT INTO mahasiswa (nim, nama, alamat, jurusan) VALUES (${nim}, '${nama}', '${alamat}', '${jurusan}')`

  db.query(sql, (error, fields) => {
    if (error) response(500, 'Invalid', 'Failed Add Data', res)
    if (fields?.affectedRows) {
      const data = {
        isSuccess: fields.affectedRows,
        id: fields.insertId
      }
      response(200, data, 'Success Add Data', res)
    }
  })
})

app.put('/mahasiswa/put', (req, res) => {
  const {nim, nama , alamat, jurusan} = req.body
  const sql = `UPDATE mahasiswa SET nama = '${nama}', alamat = '${alamat}', jurusan = '${jurusan}' WHERE nim = ${nim}`

  db.query(sql, (error, fields) => { 
    if (fields?.affectedRows) {
      const data = {
        isSuccess: fields.affectedRows,
        message: fields.message
      }
    response(200, data, 'Success Update Data', res)
    } else {
      response (500, 'Invalid NIM', 'Failed Update Data', res)
    } 
  })
})

app.delete('/mahasiswa/delete', (req, res) => {
  const { nim } = req.body
  const sql = `DELETE FROM mahasiswa WHERE nim = ${nim}`
  db.query(sql, (error, fields) => {
    if (fields?.affectedRows) {
      const data = {
        isDeleted: fields.affectedRows,
      }
    response(200, data, 'Success Delete Data', res)
    } else {
      response (500, 'Invalid Data', 'Failed Delete Data', res)
    }
  })
})
  
app.listen(port, () => {
  console.log(`app listenin' on port ${port} shizz`)
})