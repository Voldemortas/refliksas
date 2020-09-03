import * as React from 'react'
import Link from 'next/link'
import { MovieDataType } from '../types'

const VideoCard = (props: MovieDataType) => {
  return (
    <div className="videoList-box">
      <div className="videoList-image">
        <Link href={'details#' + props.url}>
          <img src={props.image} />
        </Link>
      </div>
      <div className="videoList-title">
        <Link href={'details#' + props.url}>{props.title}</Link>
      </div>
    </div>
  )
}

export default VideoCard
