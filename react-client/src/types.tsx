type MovieDataType = {
  image: string
  url: string
  title: string
}

type VideoListType = {
  name: string
  predicate: (data: MovieDataType) => Boolean
  amount: number
}

const defaultMovieDate: MovieDataType = { image: '', url: '', title: '' }
const defaultVideoList: VideoListType = {
  name: '',
  predicate: () => true,
  amount: 10,
}

export type { VideoListType, MovieDataType }
export { defaultMovieDate, defaultVideoList }
