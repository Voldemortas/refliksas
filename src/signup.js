import './assets/styles.scss'
import './login.js'

const header = () => {
  const element = document.createElement('header')
  element.setAttribute('class', 'header')
  element.innerHTML = `<div class="signIn"><a href="signup.html">Sign Up</a><a href="#" onclick="openLogin()">Sign In</a></div>
    <div class="header-text"><h1>Reflix</h1>This is the best video library platform you could have ever imagined!</div>
    <div class="searchBar"><input type="text" class="searchBar-input" placeholder="Find a movie!" /></div>`

  return element
}

const signUpForm = () => {
  const element = document.createElement('main')

  element.innerHTML += `<div class="signUpForm">
    <div>Hello, I bet you want to register bla bla bla</div>
    <div class="inputElement"><input type="email" class="inputElement-input" placeholder="email" /></div><br />
    <div class="inputElement"><input type="password" class="inputElement-input" placeholder="password" /></div><br />
    <div class="inputElement"><input type="password" class="inputElement-input" placeholder="repeat password" /></div><br />
    <div class="inputElement"><button class="inputElement-button" onclick="window.location = 'browse.html'">Register</button></div>
  </div>`
  return element
}

document.body.appendChild(header())
document.body.appendChild(signUpForm())
