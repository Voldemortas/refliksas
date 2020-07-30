import './assets/styles.scss'
import VideoList from './VideoList.js'
import './login.js'

const header = () => {
  const element = document.createElement('header')
  element.setAttribute('class', 'header')
  element.innerHTML = `<div class="signIn"><a href="signup.html">Sign Up</a><a href="#" onclick="openLogin()">Sign In</a></div>
    <div class="header-text"><h1>Reflix</h1>This is the best video library platform you could have ever imagined!</div>
    <div class="searchBar"><input type="text" class="searchBar-input" placeholder="Find a movie!" /></div>`

  return element
}

document.body.appendChild(header())
document.body.appendChild(VideoList('Most popular movies'))
