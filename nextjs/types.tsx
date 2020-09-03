type MovieDataType = {
  image: string
  url: string
  title: string
  plot: string
  youtube: string
  genres: string[]
}

type VideoListType = {
  name: string
  predicate: (data: MovieDataType) => Boolean
  amount: number
}

const defaultMovieDate: MovieDataType = {
  image: '',
  url: '',
  title: '',
  plot: '',
  youtube: '',
  genres: [''],
}
const defaultVideoList: VideoListType = {
  name: '',
  predicate: () => true,
  amount: 10,
}

export type { VideoListType, MovieDataType }
export { defaultMovieDate, defaultVideoList }
