import './assets/styles.scss'
import VideoCard from './VideoCard.js'

async function showFavs() {
  const link = `http://localhost:3000/`
  if (firebase.auth().currentUser === null) {
    setTimeout(showFavs, 200)
  } else {
    let favs = await isFav()
    let data = { success: false }
    try {
      data = await (await fetch(link)).json()
    } catch (e) {
      console.log(e)
    }
    if (data.success) {
      data = data.movies.filter((e) => favs.data.includes(e.url))
      console.log(data)
      for (let i = 0; i < data.length; i++) {
        document.getElementById('main').appendChild(await VideoCard(data[i]))
      }
    }
  }
}

const browse = () => {
  const element = document.createElement('main')
  element.setAttribute('id', 'main')
  return element
}

document.body.appendChild(browse())
;(async () => {
  setTimeout(showFavs, 200)
})()
