import { useEffect, useState } from 'react'
import { TEMPORARY_DISCOVER_PREFERENCES } from '../constants/discoverPreferences'
import { getBooksBySubject } from '../services/booksApi'

const RECOMMENDATIONS_PER_GENRE = 5

function createInitialGenreState() {
  return TEMPORARY_DISCOVER_PREFERENCES.reduce(
    (state, preference) => ({
      ...state,
      [preference.subject]: {
        books: [],
        error: '',
        isLoading: false,
        startIndex: 0,
      },
    }),
    {}
  )
}

/**
 * Charge les recommandations personnalisees de la vue etendue.
 *
 * Les preferences sont temporaires et centralisees ici pour pouvoir remplacer
 * plus tard ce tableau par les genres du profil Firebase sans changer le
 * composant d'affichage. Chaque genre conserve son propre `startIndex` afin
 * qu'un rafraichissement ne recharge que la section concernee.
 *
 * @param {boolean} isEnabled - Indique si la vue recommandations est active.
 * @returns {Object} Preferences, livres par genre et action de rafraichissement.
 */
function useForYouRecommendations(isEnabled) {
  const [genreState, setGenreState] = useState(
    createInitialGenreState
  )

  useEffect(() => {
    if (!isEnabled) return

    let isActive = true

    async function loadInitialRecommendations() {
      setGenreState((currentState) => {
        const nextState = { ...currentState }

        TEMPORARY_DISCOVER_PREFERENCES.forEach(
          ({ subject }) => {
            nextState[subject] = {
              ...nextState[subject],
              error: '',
              isLoading: true,
            }
          }
        )

        return nextState
      })

      const results = await Promise.allSettled(
        TEMPORARY_DISCOVER_PREFERENCES.map(
          ({ subject }) =>
            getBooksBySubject(
              subject,
              RECOMMENDATIONS_PER_GENRE,
              0
            )
        )
      )

      if (!isActive) return

      setGenreState((currentState) => {
        const nextState = { ...currentState }

        results.forEach((result, index) => {
          const { subject } =
            TEMPORARY_DISCOVER_PREFERENCES[index]

          nextState[subject] = {
            books:
              result.status === 'fulfilled'
                ? result.value
                : [],
            error:
              result.status === 'rejected'
                ? 'Cette selection est temporairement indisponible.'
                : '',
            isLoading: false,
            startIndex: 0,
          }
        })

        return nextState
      })
    }

    loadInitialRecommendations()

    return () => {
      isActive = false
    }
  }, [isEnabled])

  async function refreshGenre(subject) {
    const currentGenre = genreState[subject]

    if (!currentGenre || currentGenre.isLoading) return

    const nextStartIndex =
      currentGenre.startIndex + RECOMMENDATIONS_PER_GENRE

    setGenreState((currentState) => ({
      ...currentState,
      [subject]: {
        ...currentState[subject],
        error: '',
        isLoading: true,
      },
    }))

    try {
      const books = await getBooksBySubject(
        subject,
        RECOMMENDATIONS_PER_GENRE,
        nextStartIndex
      )

      setGenreState((currentState) => ({
        ...currentState,
        [subject]: {
          books: books.length
            ? books
            : currentState[subject].books,
          error: books.length
            ? ''
            : 'Aucune nouvelle suggestion disponible pour ce genre.',
          isLoading: false,
          startIndex: books.length
            ? nextStartIndex
            : currentState[subject].startIndex,
        },
      }))
    } catch {
      setGenreState((currentState) => ({
        ...currentState,
        [subject]: {
          ...currentState[subject],
          error: 'Impossible de rafraichir ce genre pour le moment.',
          isLoading: false,
        },
      }))
    }
  }

  return {
    preferences: TEMPORARY_DISCOVER_PREFERENCES,
    genreState,
    refreshGenre,
  }
}

export default useForYouRecommendations
