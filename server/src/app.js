const express = require('express')
const cors = require('cors')
const app = express()
const { getAllMovies, findMovie } = require('./db')

app.use(cors())
const port = 3000

app.get('/search/:name', async (req, res) => {
  res.setHeader('Content-Type', 'application/json')
  res.send(await findMovie(req.params.name))
})
app.get('/', async (req, res) => {
  res.setHeader('Content-Type', 'application/json')
  res.send(await getAllMovies())
})

app.listen(port, () =>
  console.log(`Example app listening at http://localhost:${port}`),
)
