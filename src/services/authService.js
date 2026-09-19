import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
} from 'firebase/auth'
import { ref, set } from 'firebase/database'
import { auth, database } from './firebase.js'

const googleProvider = new GoogleAuthProvider()

/**
 * Creates the initial private profile stored for a Dear Pages user.
 *
 * @param {import('firebase/auth').User} user
 * @param {string} [displayName]
 * @returns {Promise<void>}
 */
async function createUserProfile(user, displayName = '') {
  const userRef = ref(database, `users/${user.uid}/profile`)

  await set(userRef, {
    displayName: displayName || user.displayName || '',
    email: user.email || '',
    photoURL: user.photoURL || '',
    createdAt: Date.now(),
  })
}

/**
 * Creates a Dear Pages account using an email address and password.
 *
 * @param {string} email
 * @param {string} password
 * @param {string} displayName
 * @returns {Promise<import('firebase/auth').User>}
 */
export async function signUpWithEmail(
  email,
  password,
  displayName
) {
  const credential = await createUserWithEmailAndPassword(
    auth,
    email,
    password
  )

  await createUserProfile(credential.user, displayName)

  return credential.user
}

/**
 * Signs in to Dear Pages using an email address and password.
 *
 * @param {string} email
 * @param {string} password
 * @returns {Promise<import('firebase/auth').User>}
 */
export async function signInWithEmail(email, password) {
  const credential = await signInWithEmailAndPassword(
    auth,
    email,
    password
  )

  return credential.user
}

/**
 * Signs in with Google and creates or updates
 * the user's Dear Pages profile.
 *
 * @returns {Promise<import('firebase/auth').User>}
 */
export async function signInWithGoogle() {
  const credential = await signInWithPopup(
    auth,
    googleProvider
  )

  await createUserProfile(credential.user)

  return credential.user
}

/**
 * Signs the current user out of Dear Pages.
 *
 * @returns {Promise<void>}
 */
export async function logOut() {
  await signOut(auth)
}