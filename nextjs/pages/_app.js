import '../styles/App.scss'
import Header from '../components/Header'

const MyApp = props => {
  const { Component, pageProps } = props

  return (
    <>
      <Header />
      <Component {...pageProps} />
    </>
  )
}

export default MyApp
