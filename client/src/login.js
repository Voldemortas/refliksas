const Login = () => {
  const element = document.createElement('dialog')
  element.setAttribute('id', 'login')
  element.innerHTML = `
  <div class="dialog-close" onclick="closeLogin()">&#215;</div>
  <div class="signUpForm">
    <h3>Login</h3>
    <div id="error"></div>
    <form id="form">
      <div class="inputElement"><input type="email" class="inputElement-input" placeholder="email" /></div><br />
      <div class="inputElement"><input type="password" class="inputElement-input" placeholder="password" /></div><br />
      <div class="inputElement"><button class="inputElement-button" onclick="login()">Login</button></div><br />
    </form>
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
  const form = document.getElementById('form')
  const errorDiv = document.getElementById('error')
  form.addEventListener('submit', () => {
    event.preventDefault();
  }) 
  const login = async () => {
    errorDiv.innerHTML = ''
    let login = {}
    try {
      signUp = await firebase.auth().signInWithEmailAndPassword(form[0].value, form[1].value)
    } catch(e) {
      signUp = e
    }
    if((signUp.user || '') === ''){
      errorDiv.innerHTML = signUp.message || 'Error'
    }else{
      window.location = 'browse.html'
    }
  }
  `
  return element
}

document.body.appendChild(Login())
document.body.appendChild(Script())
