import React, { createContext, useContext, useState } from 'react'

import fire, { db } from './config/firebase'

const UserContext = createContext({ user: null, db, fire })

const UserProvider = ({ children }) => {
  const [user, setUser] = useState({ user: null, db, fire })
  //@ts-ignore
  fire.auth().onAuthStateChanged(auth => {
    setUser({ ...user, user: auth })
  })

  return (
    <UserContext.Provider value={{ user, db, fire }}>
      {children}
    </UserContext.Provider>
  )
}

const useUser = () => useContext(UserContext)
export { UserContext, useUser, UserProvider }
