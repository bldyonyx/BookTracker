import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { getDatabase } from 'firebase/database'

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  databaseURL: import.meta.env.VITE_FIREBASE_DATABASE_URL,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
}

/**
 * Firebase application instance used by Dear Pages.
 */
const app = initializeApp(firebaseConfig)

/**
 * Firebase Authentication instance.
 *
 * Handles account creation, login, logout and authentication providers
 * such as Google.
 */
export const auth = getAuth(app)

/**
 * Firebase Realtime Database instance.
 *
 * Stores private user data such as library books, collections,
 * preferences and reviews.
 */
export const database = getDatabase(app)

export default app