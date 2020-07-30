const mongoose = require('mongoose')

const movieSchema = new mongoose.Schema({
  title: String,
  image: String,
  description: String,
})

class reflixMovie {
  constructor(props) {
    this.title = props.title
    this.image = props.image
    this.description = props.description
  }
}

const Movie = mongoose.model('movie', movieSchema, 'movieCollection')

/**
 * @returns {Promise<{success: boolean, movies: reflixMovie[]}>}
 */

const getAllMovies = async () => {
  let result = []
  mongoose.connect('mongodb://localhost/reflix', {
    useNewUrlParser: true,
  })

  const db = mongoose.connection
  db.on('error', console.error.bind(console, 'connection error:'))
  try {
    return {
      success: true,
      movies: (
        await Movie.find(async (err, movies) => {
          if (err) return console.error(err)
          result = await movies
          mongoose.disconnect()
          return result
        })
      ).map((e) => new reflixMovie(e)),
    }
  } catch (e) {
    return { success: false, movies: [] }
  }
}

/**
 * @param {reflixMovie[]} movies
 * @returns {Promise<boolean>}
 */
const insertMovies = async (movies) => {
  let result = false
  mongoose.connect('mongodb://localhost/reflix', {
    useNewUrlParser: true,
  })

  const db = mongoose.connection
  db.on('error', console.error.bind(console, 'connection error:'))
  let formatedMovies = movies.map((e) => new Movie(e))
  try {
    await Movie.insertMany(formatedMovies, async (err, docs) => {
      result = err === null
      mongoose.disconnect()
    })
  } catch (e) {}
  return result
}

module.exports = { insertMovies, getAllMovies, reflixMovie }