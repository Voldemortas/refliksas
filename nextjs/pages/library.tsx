import * as React from 'react'
import { MovieDataType } from '../types'
import VideoCard from '../components/VideoCard'
import fire, { db } from '../config/firebase'

enum Loaded {
  inited,
  success,
  failed,
}

type StateType = {
  movies: MovieDataType[]
  loaded: Loaded
  favMovies: string[]
}

const Browse = () => {
  const [state, setState] = React.useState<StateType>({
    movies: [],
    loaded: Loaded.inited,
    favMovies: [],
  })
  async function remove(id: string) {
    try {
      await db
        .collection('favs')
        .doc(fire.auth().currentUser.uid)
        .set({ movies: state.favMovies.filter(e => e !== id) })

      setState({
        ...state,
        favMovies: state.favMovies.filter(e => e !== id),
      })
    } catch (e) {}
  }
  async function api() {
    const link = `http://localhost:3000/`
    let newState = { ...state }
    let data = { success: false, data: [] }
    try {
      newState.movies = (await (await fetch(link)).json()).movies
      //@ts-ignore
      let collections = (await db.collection('favs').get()).docs
        //@ts-ignore
        .filter(e => e.id === fire.auth().currentUser.uid)[0]
        .data().movies
      //@ts-ignore
      data = {
        //@ts-ignore
        success: collections
          //@ts-ignore
          .map(e => '#' + e)
          .includes(window.location.hash),
        //@ts-ignore
        data: collections,
      }
      newState = { ...newState, favMovies: data.data, loaded: Loaded.success }
    } catch (e) {
      newState.loaded = Loaded.failed
    }
    console.log('new', newState)
    setState({ ...state, ...newState })
  }

  React.useEffect(() => {
    //@ts-ignore
    if (fire.auth().currentUser === null) {
      window.location.replace('/')
    }
    if (state.loaded === Loaded.inited) {
      ;(async () => {
        await api()
        console.log(state)
      })()
    }
  })

  return (
    <main id="main">
      {state.favMovies
        .map(e => state.movies.filter(f => f.url === e)[0])
        .map(e => (
          <div style={{ position: 'relative', display: 'inline-block' }}>
            <span className="closeFav" onClick={() => remove(e.url)}>
              ×
            </span>
            <VideoCard {...e} />
          </div>
        ))}
    </main>
  )
}

export default Browse
