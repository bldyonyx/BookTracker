import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  signInWithGoogle,
  signUpWithEmail,
} from '../services/authService.js'

function SignUp() {
  const navigate = useNavigate()

  const [displayName, setDisplayName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  async function handleSubmit(event) {
    event.preventDefault()

    setError('')
    setIsLoading(true)

    try {
      await signUpWithEmail(
        email.trim(),
        password,
        displayName.trim()
      )

      navigate('/')
    } catch (firebaseError) {
      console.error(firebaseError)
      setError("Impossible de créer ton compte pour le moment.")
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
        Créer un compte
      </h1>

      <form
        onSubmit={handleSubmit}
        className="mt-8 flex max-w-sm flex-col gap-4"
      >
        <input
          type="text"
          value={displayName}
          onChange={(event) => setDisplayName(event.target.value)}
          placeholder="Ton nom"
          required
        />

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
          minLength={6}
          required
        />

        <button
          type="submit"
          disabled={isLoading}
        >
          {isLoading ? 'Création...' : 'Créer mon compte'}
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

export default SignUp