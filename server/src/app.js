const express = require('express')
const cors = require('cors')
const app = express()
const { getAllMovies } = require('./db')

app.use(cors())
const port = 3000

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
