import * as React from 'react'
import { MovieDataType } from '../types'

const VideoCard = (props: MovieDataType) => {
  return (
    <div className="videoList-box">
      <div className="videoList-image">
        <a href={'details#' + props.url}>
          <img src={props.image} />
        </a>
      </div>
      <div className="videoList-title">
        <a href={'details#' + props.url}>{props.title}</a>
      </div>
    </div>
  )
}

export default VideoCard
