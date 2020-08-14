import './assets/styles.scss'
import VideoList from './VideoList.js'
;(async () => {
  document.body.appendChild(await VideoList('Most popular movies'))
})()
