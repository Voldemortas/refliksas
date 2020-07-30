const express = require('express')
const app = express()
const port = 3000
const { getAllMovies } = require('./db')

app.get('/', async (req, res) => {
  res.setHeader('Content-Type', 'application/json')
  res.send(await getAllMovies())
})
app.post('/', (req, res) => {
  console.log(req.body)
  return res.send(JSON.stringify(req.body))
})

app.listen(port, () =>
  console.log(`Example app listening at http://localhost:${port}`),
)
