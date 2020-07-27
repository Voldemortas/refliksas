const Login = () => {
  const element = document.createElement('dialog')
  element.setAttribute('id', 'login')
  element.innerHTML = `
  <div class="dialog-close" onclick="closeLogin()">&#215;</div>
  <div class="signUpForm">
    <h3>Login</h3>
    <div class="inputElement"><input type="email" class="inputElement-input" placeholder="email" /></div><br />
    <div class="inputElement"><input type="password" class="inputElement-input" placeholder="password" /></div><br />
    <div class="inputElement"><button class="inputElement-button" onclick="window.location = 'browse.html'">Login</button></div><br />
    
    <a href="#">Forgot password</a><br />
  </div>
  `
  return element
}

const Script = () => {
  const element = document.createElement('script')
  element.innerHTML = `
  function openLogin(){
    document.getElementById('login').showModal()
  }
  function closeLogin(){
    document.getElementById('login').close()
  }
  `
  return element
}

document.body.appendChild(Login())
document.body.appendChild(Script())
