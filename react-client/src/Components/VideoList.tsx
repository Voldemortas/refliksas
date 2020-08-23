import * as React from 'react'
import VideoCard from './VideoCard'
import { VideoListType, MovieDataType } from '../types'

enum Loaded {
  inited,
  success,
  failed,
}

type StateType = {
  movies: MovieDataType[]
  loaded: Loaded
}

const VideoList = (props: VideoListType) => {
  const [state, setState] = React.useState<StateType>({
    movies: [],
    loaded: Loaded.inited,
  })
  React.useEffect(() => {
    console.log('state', state)
    const fetchApi = async () => {
      const link = `http://localhost:3000/`
      try {
        let data = await (await fetch(link)).json()
        console.log(data)
        setState({
          ...state,
          movies: data.movies,
          loaded: data.success ? Loaded.success : Loaded.failed,
        })
      } catch (e) {
        setState({ ...state, loaded: Loaded.failed })
      }
    }
    if (state.loaded === Loaded.inited) {
      ;(async () => {
        await fetchApi()
      })()
    }
  }, [state.loaded])

  console.log('state', state)
  return (
    <div className="listContainer">
      <h2>{props.name}</h2>{' '}
      <div className="videoList">
        {state.loaded === Loaded.success ? (
          <>
            {state.movies!.map((e, i) => (
              <VideoCard {...e} key={e.title + i} />
            ))}
          </>
        ) : state.loaded === Loaded.inited ? (
          <>Kraunama</>
        ) : (
          <>Nepavyko :(</>
        )}
      </div>
    </div>
  )
}

export default VideoList

/*
export default async function VideoList(
  name = '',
  predicate = () => true,
  amount = 10,
) {
  const element = document.createElement('div')
  const link = `http://localhost:3000/`
  element.setAttribute('class', 'videoList')
  let data = { success: false }

  try {
    data = await (await fetch(link)).json()
  } catch (e) {
    console.log(e)
  }
  if (data.success) {
    data = data.movies.filter(predicate)
    for (let i = 0; i < Math.min(data.length, 20); i++) {
      element.innerHTML += (await VideoCard(data[i])).outerHTML
    }
  } else {
    for (let i = 0; i < amount; i++) {
      element.innerHTML += `
  <div class="videoList-box">
    <div class="videoList-image"></div>
    <div class="videoList-title">
      Title
    </div>
  </div>`
    }
  }
  const container = document.createElement('div')
  container.setAttribute('class', 'listContainer')
  container.innerHTML = ` <h2>${name}</h2>`
  container.appendChild(element)
  return container
}
*/
