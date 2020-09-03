import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import { MovieDataType } from '../../types'
import firebase, { db } from '../../config/firebase'

enum Loaded {
  inited,
  success,
  failed,
}

type StateType = {
  movies: MovieDataType[]
  loaded: Loaded
  main: MovieDataType | null
  fav: Loaded
  favMovie: string[]
}

const Main = props => {
  const id = useRouter().query.id as string
  const ref = React.useRef<HTMLButtonElement>(null)
  async function toggleFav() {
    if (ref.current === null) {
      return
    }
    const element = ref.current!
    element.setAttribute('disabled', 'true')
    try {
      if (state.favMovie.includes(id)) {
        try {
          await db
            .collection('favs')
            .doc(firebase.auth().currentUser.uid)
            .set({
              movies: state.favMovie.filter(e => e !== id),
            })
          // prettier-ignore-end
          setState({
            ...state,
            favMovie: state.favMovie.filter(e => e !== id),
          })
        } catch (e) {}
      } else {
        try {
          await db
            .collection('favs')
            .doc(firebase.auth().currentUser.uid)
            .set({
              movies: [...state.favMovie, id],
            })
          setState({
            ...state,
            favMovie: [...state.favMovie, id],
          })
        } catch (e) {}
      }
    } catch (e) {}
    element.removeAttribute('disabled')
  }

  const [state, setState] = useState<StateType>({
    loaded: Loaded.inited,
    movies: [],
    main: null,
    fav: Loaded.inited,
    favMovie: [],
  })
  useEffect(() => {
    ;(async () => {
      let newState = { ...state }
      if (state.loaded === Loaded.inited) {
        try {
          let data = {
            success: true,
            data: (await (await fetch('http://localhost:3000/')).json()).movies,
          }
          newState = { ...newState, loaded: Loaded.success, movies: data.data }
        } catch (e) {
          newState = { ...newState, loaded: Loaded.failed }
        }
      }
      if (state.fav === Loaded.inited) {
        if (firebase.auth().currentUser === null) {
          newState = { ...newState, fav: Loaded.failed }
        }
        let data = { success: false, data: [] }
        try {
          let collections = (await db.collection('favs').get()).docs
            .filter(e => e.id === firebase.auth().currentUser.uid)[0]
            .data().movies
          //@ts-ignore
          data = {
            //@ts-ignore
            success: collections
              //@ts-ignore
              .map(e => e)
              .includes(id),
            //@ts-ignore
            data: collections,
          }
          newState = { ...newState, favMovie: data.data, fav: Loaded.success }
        } catch (e) {
          newState = { ...newState, fav: Loaded.failed }
        }
      }
      if (
        state.loaded === Loaded.success &&
        state.movies.filter(e => e.url !== id).length === 0
      ) {
        newState = { ...newState, loaded: Loaded.failed }
      } else {
        newState = {
          ...newState,
          main: state.movies.filter(e => e.url === id)[0] || null,
        }
      }
      if (
        state.loaded === Loaded.inited ||
        state.fav === Loaded.inited ||
        state.main === null
      ) {
        setState({ ...state, ...newState })
      }
    })()
  })
  return (
    <main>
      <div className="details">
        <h1 id="movie-title">
          {state.main === null ? 'A Pretty Long Title' : state.main.title}
        </h1>
        <div className="details-grid">
          <div className="details-grid-image" id="details-grid-image">
            {state.main === null ? (
              'Image placeholder'
            ) : (
              <img src={state.main.image} alt="image" />
            )}
          </div>
          <div className="details-grid-player" id="details-grid-player">
            {state.main === null ? (
              'Video placeholder'
            ) : (
              <iframe
                width="100%"
                height="100%"
                src={`https://www.youtube.com/embed/${state.main.youtube}`}
                frameBorder="0"
                allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen={true}
              ></iframe>
            )}
          </div>
          <div className="details-grid-button" id="details-grid-button">
            <b>
              {firebase.auth().currentUser !== null ? (
                <button ref={ref} onClick={toggleFav}>
                  {state.favMovie.includes(id) ? 'Remove from' : 'Add to'}{' '}
                  favorites
                </button>
              ) : (
                <></>
              )}
              Genres:{' '}
              {state.main !== null ? state.main.genres.join(', ') : <></>}
            </b>
          </div>
          <div className="details-grid-info" id="details-grid-info">
            {state.main === null
              ? `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin
            convallis pharetra neque vel pulvinar. Aliquam arcu mi, condimentum
            vitae pretium sed, porta eget sem. Suspendisse vitae dignissim enim.
            Pellentesque purus diam, mollis eget varius sit amet, auctor et
            nisl. Mauris volutpat est et enim lacinia cursus. Donec in eros
            tellus. Nam nulla ante, interdum ac euismod sit amet, tempus id sem.
            Duis tempus diam eros. Sed nibh ipsum, sodales id vestibulum sit
            amet, ultrices tristique risus. Praesent fringilla lacus sed lectus
            tempor ultrices interdum nec lectus. Nunc sed viverra nisl, nec
            tristique eros. Vestibulum in nulla nec lorem viverra eleifend
            fermentum non diam. Morbi maximus vulputate nunc, nec lobortis nisi
            dignissim in. Donec eu porta leo, a faucibus est. Morbi in felis
            eleifend, venenatis ex a, pulvinar mauris. Morbi ut libero non elit
            congue aliquam eget id velit.`
              : state.main.plot}
          </div>
        </div>
      </div>
    </main>
  )
}

export default Main