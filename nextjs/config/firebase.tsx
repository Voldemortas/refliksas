import firebase from 'firebase'

const firebaseConfig = {
  apiKey: 'AIzaSyCvPb4-4lxErAgLzStpMP00BqlBasV12Ak',
  authDomain: 'tesadasasdasdas.firebaseapp.com',
  databaseURL: 'https://tesadasasdasdas.firebaseio.com',
  projectId: 'tesadasasdasdas',
  storageBucket: 'tesadasasdasdas.appspot.com',
  messagingSenderId: '176738691269',
  appId: '1:176738691269:web:6c8d045815c91246d8e8ac',
}

let firebaseUser = { user: null, inited: false }

try {
  firebase.initializeApp(firebaseConfig)
} catch (err) {
  if (!/already exists/.test(err.message)) {
    console.error('Firebase initialization error', err.stack)
  }
}

firebase.auth().onAuthStateChanged(function (user) {
  console.log(user)
  if (user) {
    firebaseUser = { ...firebaseUser, user: user, inited: true }
  } else {
    firebaseUser = { ...firebaseUser, inited: true }
  }
})

const User = () => {
  console.log(firebaseUser)
  return firebaseUser
}

const fire = firebase
let db = firebase.firestore()
export { db, User }
export default fire
