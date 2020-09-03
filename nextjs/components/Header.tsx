import * as React from 'react'
import Dialog from './Dialog'
import Link from 'next/link'
import Search from './Search'
import fire, { User } from '../config/firebase'

const Login = (props: { Ref: React.RefObject<HTMLDialogElement> }) => {
  const FormRef = React.useRef<HTMLFormElement>(null)
  const ErrorRef = React.useRef<HTMLDivElement>(null)
  React.useEffect(() => {
    if (FormRef.current !== null) {
      console.log('pavyko', FormRef.current)
      FormRef.current.addEventListener('submit', e => {
        e.preventDefault()
        handleLogin()
      })
    }
  }, [])
  const handleLogin = () => {
    if (FormRef.current !== null && ErrorRef.current !== null) {
      console.log('blet')
      const form = (FormRef.current as unknown) as HTMLInputElement[]
      const errorDiv = ErrorRef.current
      errorDiv.innerHTML = 'Loging in, please wait!'
      ;(async () => {
        let signUp = { user: null, message: null }

        try {
          //@ts-ignore
          signUp = await fire
            .auth()
            .signInWithEmailAndPassword(form[0].value, form[1].value)
        } catch (e) {
          signUp = e
        }
        if ((signUp.user || '') === '') {
          errorDiv.innerHTML = signUp.message || 'Error'
        } else {
          document.location.reload()
        }
      })()
    }
  }
  return (
    <Dialog title="Login" Ref={props.Ref}>
      <div className="signUpForm">
        <h3>Login</h3>
        <div ref={ErrorRef}></div>
        <form ref={FormRef} id="login">
          <div className="inputElement">
            <input
              type="email"
              className="inputElement-input"
              placeholder="email"
            />
          </div>
          <br />
          <div className="inputElement">
            <input
              type="password"
              className="inputElement-input"
              placeholder="password"
            />
          </div>
          <br />
          <div className="inputElement">
            <button className="inputElement-button">Login</button>
          </div>
          <br />
        </form>
        {/*<div className="clickable">Forgot password</div>//*/}
        <br />
      </div>
    </Dialog>
  )
}

const Register = (props: { Ref: React.RefObject<HTMLDialogElement> }) => {
  const FormRef = React.useRef<HTMLFormElement>(null)
  const ErrorRef = React.useRef<HTMLDivElement>(null)
  React.useEffect(() => {
    if (FormRef.current !== null) {
      FormRef.current.addEventListener('submit', e => {
        e.preventDefault()
        handleRegister()
      })
    }
  }, [])
  const handleRegister = () => {
    if (FormRef.current !== null && ErrorRef.current !== null) {
      const form = (FormRef.current as unknown) as HTMLInputElement[]
      const errorDiv = ErrorRef.current
      if (form[1].value !== form[2].value) {
        errorDiv.innerHTML = 'Passwords must match'
        return
      }
      errorDiv.innerHTML = 'Signing up, please wait!'
      ;(async () => {
        let signUp = { user: null, message: null }

        try {
          //@ts-ignore
          signUp = await fire
            .auth()
            .createUserWithEmailAndPassword(form[0].value, form[1].value)
        } catch (e) {
          signUp = e
        }
        if ((signUp.user || '') === '') {
          errorDiv.innerHTML = signUp.message || 'Error'
        } else {
          document.location.reload()
        }
      })()
    }
  }
  return (
    <Dialog title="Register" Ref={props.Ref}>
      <div className="signUpForm">
        <h3>Register</h3>
        <div ref={ErrorRef}></div>
        <form ref={FormRef} id="register">
          <div className="inputElement">
            <input
              type="email"
              className="inputElement-input"
              placeholder="Email"
            />
          </div>
          <br />
          <div className="inputElement">
            <input
              type="password"
              className="inputElement-input"
              placeholder="Password"
            />
          </div>
          <br />
          <div className="inputElement">
            <input
              type="password"
              className="inputElement-input"
              placeholder="Repeat Password"
            />
          </div>
          <br />
          <div className="inputElement">
            <button className="inputElement-button">Register</button>
          </div>
          <br />
        </form>
        <br />
      </div>
    </Dialog>
  )
}

const Header = () => {
  const logOut = () => {
    ;(async () => {
      //@ts-ignore
      await fire.auth().signOut()
      window.location.reload()
    })()
  }
  const LoginRef = React.useRef<HTMLDialogElement>(null)
  const RegisterRef = React.useRef<HTMLDialogElement>(null)
  const showModal = (element: React.RefObject<HTMLDialogElement>) => {
    if (element.current !== null) {
      element.current.showModal()
    }
  }
  return (
    <>
      <header className="header" id="header">
        <div className="signIn">
          {
            //@ts-ignore
            User().user === null ? (
              <>
                <span
                  className="clickable"
                  onClick={() => {
                    showModal(LoginRef)
                  }}
                >
                  Login
                </span>{' '}
                <span
                  className="clickable"
                  onClick={() => {
                    showModal(RegisterRef)
                  }}
                >
                  Register
                </span>
                <Login Ref={LoginRef} />
                <Register Ref={RegisterRef} />
              </>
            ) : (
              <>
                <Link href="browse">Favourites</Link>
                <span className="clickable" onClick={logOut}>
                  Log Out
                </span>
              </>
            )
          }
        </div>
        <div className="header-text">
          <h1>
            <a href="/">Reflix</a>
          </h1>
          This is the best video library platform you could have ever imagined!
        </div>
        <Search />
      </header>
    </>
  )
}

export default Header
