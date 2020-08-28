import React from 'react'
import '../App.scss'
import VideoList from '../Components/VideoList'
import { defaultVideoList } from '../types'

const Main = () => {
  return (
    <>
      <VideoList
        {...defaultVideoList}
        name="Most popular Fantasy movies"
        predicate={(e) => e.genres.includes('Fantasy')}
      />{' '}
      <VideoList
        {...defaultVideoList}
        name="Most popular Comedy movies"
        predicate={(e) => e.genres.includes('Comedy')}
      />
    </>
  )
}

export default Main
