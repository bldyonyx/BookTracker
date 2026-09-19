import {
  createContext,
  useContext,
  useEffect,
  useState,
} from 'react'
import { onAuthStateChanged } from 'firebase/auth'
import { auth } from '../services/firebase.js'

const AuthContext = createContext(null)

/**
 * Provides the current Firebase authentication state
 * to the entire Dear Pages application.
 *
 * @param {{ children: React.ReactNode }} props
 * @returns {React.ReactNode}
 */
export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [isAuthLoading, setIsAuthLoading] = useState(true)

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(
      auth,
      (firebaseUser) => {
        setUser(firebaseUser)
        setIsAuthLoading(false)
      }
    )

    return unsubscribe
  }, [])

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthLoading,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

/**
 * Gives components access to the current authentication state.
 *
 * @returns {{
 *   user: import('firebase/auth').User | null,
 *   isAuthLoading: boolean
 * }}
 */
export function useAuth() {
  return useContext(AuthContext)
}