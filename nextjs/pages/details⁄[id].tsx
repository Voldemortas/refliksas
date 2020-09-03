import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import { MovieDataType } from '../types'
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
  const router = useRouter()
  console.log('route', router.query)
}

export default Main
