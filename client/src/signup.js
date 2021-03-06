import './assets/styles.scss'

const signUpForm = () => {
  const element = document.createElement('main')

  element.innerHTML += `<div class="signUpForm">
    <div>Register and enjoy your stay!</div>
    <div id="error"></div>
    <form action="#" id="form">
      <div class="inputElement"><input type="email" id="email" class="inputElement-input" placeholder="email" /></div><br />
      <div class="inputElement"><input type="password" id="pass1" class="inputElement-input" placeholder="password" /></div><br />
      <div class="inputElement"><input type="password" id="pass2" class="inputElement-input" placeholder="repeat password" /></div><br />
      <div class="inputElement"><button class="inputElement-button" onclick="register()">Register</button></div>
    </form>
  </div>`
  return element
}

const script = () => {
  const element = document.createElement('script')
  element.innerHTML = `
const form = document.getElementById('form')
const errorDiv = document.getElementById('error')
const register = async () => {
  if(form.elements[1].value !== form.elements[2].value){
    errorDiv.innerHTML = 'Passwords must match'
    return
  }
  errorDiv.innerHTML = ''
  let signUp = {}
  try {
    signUp = await firebase.auth().createUserWithEmailAndPassword(form[0].value, form[1].value)
  } catch(e) {
    signUp = e
  }
  if((signUp.user || '') === ''){
    errorDiv.innerHTML = signUp.message || 'Error'
  }
} 
`
  return element
}

document.body.appendChild(signUpForm())
document.body.appendChild(script())
