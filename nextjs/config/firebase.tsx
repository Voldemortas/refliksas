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
if (firebase.apps.length === 0) {
  try {
    firebase.initializeApp(firebaseConfig)
    console.log('Firebase initialized')
  } catch (err) {
    if (!/already exists/.test(err.message)) {
      console.error('Firebase initialization error', err.stack)
    }
  }
}

const fire = firebase
let db = firebase.firestore()
export { db }
export default fire
