import './assets/styles.scss'
import VideoList from './VideoList.js'
;(async () => {
  document.body.appendChild(await VideoList('Most popular movies'))
  document.body.appendChild(
    await VideoList('Most popular Fantasy movies', (e) =>
      e.genres.includes('Fantasy'),
    ),
  )
  document.body.appendChild(
    await VideoList('Most popular Comedy movies', (e) =>
      e.genres.includes('Comedy'),
    ),
  )
})()
