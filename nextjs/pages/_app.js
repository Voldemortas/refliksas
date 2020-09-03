import '../styles/App.scss'
import Header from '../components/Header'
import { useEffect, useState } from 'react'
import fire from '../config/firebase'

const MyApp = props => {
  const { Component, pageProps } = props
  const [state, setState] = useState({ user: null, loaded: false })
  useEffect(() => {
    console.log('mount')
    fire.auth().onAuthStateChanged(function (user) {
      console.log('user', user)
      if (user) {
        setState({ user, loaded: true })
      } else {
        setState({ user: null, loaded: true })
      }
    })
  }, [])

  return (
    <>
      <Header {...state} />
      <Component {...pageProps} {...state} />
    </>
  )
}

export default MyApp
