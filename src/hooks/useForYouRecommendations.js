import { useEffect, useRef, useState } from 'react'
import { TEMPORARY_DISCOVER_PREFERENCES } from '../constants/discoverPreferences'
import { getBooksBySubject } from '../services/booksApi'
import {
  addBooksToIdentitySet,
  selectRecommendationBooks,
} from '../utils/recommendationSelection'
import {
  readRecommendationState,
  RECOMMENDATION_STORAGE_KEYS,
  writeRecommendationState,
} from '../utils/recommendationSessionStorage'

const RECOMMENDATIONS_PER_GENRE = 5
const CANDIDATE_POOL_SIZE = 12
const EMPTY_EXCLUDED_BOOK_IDS = []

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
 * @param {Iterable<string|Object>} [excludedBookIds] - Identifiants a exclure plus tard depuis la bibliotheque.
 * @returns {Object} Preferences, livres par genre et action de rafraichissement.
 */
function useForYouRecommendations(
  isEnabled,
  excludedBookIds = EMPTY_EXCLUDED_BOOK_IDS
) {
  const [genreState, setGenreState] = useState(
    createInitialGenreState
  )
  const shownIdentityKeysByGenreRef = useRef({})

  useEffect(() => {
    if (!isEnabled) return

    let isActive = true
    const savedStateBySubject =
      TEMPORARY_DISCOVER_PREFERENCES.reduce(
        (state, { subject }) => ({
          ...state,
          [subject]: readRecommendationState(
            RECOMMENDATION_STORAGE_KEYS.forYouGenre(subject)
          ),
        }),
        {}
      )
    const preferencesToFetch =
      TEMPORARY_DISCOVER_PREFERENCES.filter(
        ({ subject }) => !savedStateBySubject[subject]
      )

    shownIdentityKeysByGenreRef.current =
      TEMPORARY_DISCOVER_PREFERENCES.reduce(
        (state, { subject }) => ({
          ...state,
          [subject]: new Set(
            savedStateBySubject[subject]?.seenIdentityKeys || []
          ),
        }),
        {}
      )

    TEMPORARY_DISCOVER_PREFERENCES.forEach(({ subject }) => {
      const savedState = savedStateBySubject[subject]

      if (!savedState) return

      addBooksToIdentitySet(
        shownIdentityKeysByGenreRef.current[subject],
        savedState.books
      )
    })

    async function loadInitialRecommendations() {
      setGenreState((currentState) => {
        const nextState = { ...currentState }

        TEMPORARY_DISCOVER_PREFERENCES.forEach(
          ({ subject }) => {
            const savedState = savedStateBySubject[subject]

            nextState[subject] = {
              ...nextState[subject],
              books: savedState
                ? savedState.books
                : nextState[subject].books,
              error: '',
              isLoading: !savedState,
              startIndex: savedState
                ? savedState.startIndex
                : nextState[subject].startIndex,
            }
          }
        )

        return nextState
      })

      if (!preferencesToFetch.length) return

      const results = await Promise.allSettled(
        preferencesToFetch.map(
          ({ subject }) =>
            getBooksBySubject(
              subject,
              CANDIDATE_POOL_SIZE,
              0
            )
        )
      )

      if (!isActive) return

      setGenreState((currentState) => {
        const nextState = { ...currentState }

        results.forEach((result, index) => {
          const { subject } = preferencesToFetch[index]
          const shownIdentityKeys =
            shownIdentityKeysByGenreRef.current[subject] ||
            new Set()
          const books =
            result.status === 'fulfilled'
              ? selectRecommendationBooks(result.value, {
                  limit: RECOMMENDATIONS_PER_GENRE,
                  alreadyShownIdentityKeys: shownIdentityKeys,
                  excludedBookIds,
                })
              : []

          addBooksToIdentitySet(shownIdentityKeys, books)
          shownIdentityKeysByGenreRef.current[subject] =
            shownIdentityKeys

          if (result.status === 'fulfilled' && books.length) {
            writeRecommendationState(
              RECOMMENDATION_STORAGE_KEYS.forYouGenre(subject),
              {
                books,
                startIndex: 0,
                seenIdentityKeys: shownIdentityKeys,
              }
            )
          }

          nextState[subject] = {
            books,
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
  }, [isEnabled, excludedBookIds])

  async function refreshGenre(subject) {
    const currentGenre = genreState[subject]

    if (!currentGenre || currentGenre.isLoading) return

    const nextStartIndex =
      currentGenre.startIndex + CANDIDATE_POOL_SIZE

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
        CANDIDATE_POOL_SIZE,
        nextStartIndex
      )
      const shownIdentityKeys =
        shownIdentityKeysByGenreRef.current[subject] ||
        new Set()
      const selectedBooks = selectRecommendationBooks(books, {
        limit: RECOMMENDATIONS_PER_GENRE,
        alreadyShownIdentityKeys: shownIdentityKeys,
        excludedBookIds,
      })

      setGenreState((currentState) => ({
        ...currentState,
        [subject]: {
          books: selectedBooks.length
            ? selectedBooks
            : currentState[subject].books,
          error: selectedBooks.length
            ? ''
            : 'Aucune nouvelle suggestion disponible pour ce genre.',
          isLoading: false,
          startIndex: selectedBooks.length || books.length
            ? nextStartIndex
            : currentState[subject].startIndex,
        },
      }))

      if (selectedBooks.length) {
        addBooksToIdentitySet(shownIdentityKeys, selectedBooks)
        shownIdentityKeysByGenreRef.current[subject] =
          shownIdentityKeys
        writeRecommendationState(
          RECOMMENDATION_STORAGE_KEYS.forYouGenre(subject),
          {
            books: selectedBooks,
            startIndex: nextStartIndex,
            seenIdentityKeys: shownIdentityKeys,
          }
        )
      } else if (books.length) {
        writeRecommendationState(
          RECOMMENDATION_STORAGE_KEYS.forYouGenre(subject),
          {
            books: currentGenre.books,
            startIndex: nextStartIndex,
            seenIdentityKeys: shownIdentityKeys,
          }
        )
      }
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
