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
            {state.movies!.filter(props.predicate).map((e, i) => (
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
