import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  signInWithEmail,
  signInWithGoogle,
} from '../services/authService.js'

function Login() {
  const navigate = useNavigate()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  async function handleSubmit(event) {
    event.preventDefault()

    setError('')
    setIsLoading(true)

    try {
      await signInWithEmail(email.trim(), password)
      navigate('/')
    } catch (firebaseError) {
      console.error(firebaseError)
      setError('E-mail ou mot de passe incorrect.')
    } finally {
      setIsLoading(false)
    }
  }

  async function handleGoogleSignIn() {
    setError('')
    setIsLoading(true)

    try {
      await signInWithGoogle()
      navigate('/')
    } catch (firebaseError) {
      console.error(firebaseError)
      setError('Impossible de continuer avec Google pour le moment.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <main className="min-h-screen p-8">
      <h1 className="font-heading text-3xl font-bold text-darkwood">
        Se connecter
      </h1>

      <form
        onSubmit={handleSubmit}
        className="mt-8 flex max-w-sm flex-col gap-4"
      >
        <input
          type="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          placeholder="E-mail"
          required
        />

        <input
          type="password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          placeholder="Mot de passe"
          required
        />

        <button
          type="submit"
          disabled={isLoading}
        >
          {isLoading ? 'Connexion...' : 'Se connecter'}
        </button>
      </form>

      <button
        type="button"
        onClick={handleGoogleSignIn}
        disabled={isLoading}
        className="mt-6"
      >
        Continuer avec Google
      </button>

      {error && (
        <p className="mt-4 font-ui text-sm text-red-700">
          {error}
        </p>
      )}
    </main>
  )
}

export default Login