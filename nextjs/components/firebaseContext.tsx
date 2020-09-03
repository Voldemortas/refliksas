import { createContext } from 'react'

const firebaseContext = createContext({ user: null, db: null, fire: null })

export default firebaseContext
