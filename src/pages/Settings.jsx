import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext.jsx'
import { logOut } from '../services/authService.js'

function Settings() {
  const navigate = useNavigate()
  const { user } = useAuth()

  const [error, setError] = useState('')
  const [isLoggingOut, setIsLoggingOut] = useState(false)

  async function handleLogout() {
    setError('')
    setIsLoggingOut(true)

    try {
      await logOut()
      navigate('/login')
    } catch (firebaseError) {
      console.error(firebaseError)
      setError('Impossible de te déconnecter pour le moment.')
      setIsLoggingOut(false)
    }
  }

  return (
    <main>
      <h1>Settings</h1>

      {user && (
        <div className="mt-6">
          <p>{user.displayName}</p>
          <p>{user.email}</p>

          <button
            type="button"
            onClick={handleLogout}
            disabled={isLoggingOut}
            className="mt-4"
          >
            {isLoggingOut ? 'Déconnexion...' : 'Se déconnecter'}
          </button>

          {error && (
            <p className="mt-3 font-ui text-sm text-red-700">
              {error}
            </p>
          )}
        </div>
      )}
    </main>
  )
}

export default Settings