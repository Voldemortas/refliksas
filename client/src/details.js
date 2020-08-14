import './assets/styles.scss'
import VideoList from './VideoList.js'

const movieDetails = () => {
  const element = document.createElement('main')

  element.innerHTML += `<div class="details">
  <h1 id="movie-title">A Pretty Long Title</h1>
  <div class="details-grid">
    <div class="details-grid-image" id="details-grid-image">Image placeholder</div>
    <div class="details-grid-player" id="details-grid-player">Video placeholder</div>
    <div class="details-grid-button" id="details-grid-button"><b>Genres: </b></div>
    <div class="details-grid-info" id="details-grid-info">
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin convallis pharetra neque vel pulvinar. Aliquam arcu mi, condimentum vitae pretium sed, porta eget sem. Suspendisse vitae dignissim enim. Pellentesque purus diam, mollis eget varius sit amet, auctor et nisl. Mauris volutpat est et enim lacinia cursus. Donec in eros tellus. Nam nulla ante, interdum ac euismod sit amet, tempus id sem. Duis tempus diam eros. Sed nibh ipsum, sodales id vestibulum sit amet, ultrices tristique risus. Praesent fringilla lacus sed lectus tempor ultrices interdum nec lectus. Nunc sed viverra nisl, nec tristique eros. Vestibulum in nulla nec lorem viverra eleifend fermentum non diam. Morbi maximus vulputate nunc, nec lobortis nisi dignissim in. Donec eu porta leo, a faucibus est. Morbi in felis eleifend, venenatis ex a, pulvinar mauris. Morbi ut libero non elit congue aliquam eget id velit.
    </div>  
  </div>
</div>`
  return element
}

document.body.appendChild(movieDetails())

const loadData = async () => {
  const hash = document.location.hash
  let data = { data: null }
  try {
    data = {
      success: true,
      data: (await (await fetch('http://localhost:3000/')).json()).movies,
    }
  } catch (e) {
    data = { success: false, error: e }
  }
  if (data.success) {
    data.data = data.data.filter((e) => '#' + e.url === hash)[0]
    let movie = data.data
    const title = document.getElementById('movie-title')
    const img = document.getElementById('details-grid-image')
    const video = document.getElementById('details-grid-player')
    const button = document.getElementById('details-grid-button')
    const plot = document.getElementById('details-grid-info')
    title.innerHTML = movie.title
    img.innerHTML = '<img src="' + movie.image + '" />'
    video.innerHTML = `<iframe width="100%" height="100%" src="https://www.youtube.com/embed/${movie.youtube}" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`
    plot.innerHTML = movie.plot
    button.innerHTML = '<b>Genres: ' + movie.genres.join(', ') + '</b>'
  }
  return data
}

;(async () => {
  let data = await loadData()
  let predicate = (e) => true
  if (data.success) {
    console.log(data)
    predicate = (e) => {
      for (let i = 0; i < e.genres.length; i++) {
        if (data.data.genres.includes(e.genres[i])) {
          return true
        }
      }
      return false
    }
  }
  document.body.appendChild(await VideoList('Similar movies', predicate))
})()

const isLogged = () => {
  if (firebase.auth().currentUser === null) {
    setTimeout(isLogged, 500)
  } else {
    document.getElementById('details-grid-button').innerHTML =
      `<button>Add to Favourites</button>` +
      document.getElementById('details-grid-button').innerHTML
  }
}
isLogged()

window.addEventListener(
  'hashchange',
  () => {
    window.location.reload()
  },
  false,
)
