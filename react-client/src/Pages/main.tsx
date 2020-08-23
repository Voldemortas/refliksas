import React from 'react'
import '../App.scss'
import VideoList from '../Components/VideoList'
import { defaultVideoList } from '../types'

const Main = () => {
  return <VideoList {...defaultVideoList} name="Name" />
}

export default Main
