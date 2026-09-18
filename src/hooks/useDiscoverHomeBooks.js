import { useEffect, useRef, useState } from 'react'
import { getBooksBySubject } from '../services/booksApi'
import { getTrendingBooksDetails } from '../services/trendingBooksApi'
import {
  addBooksToIdentitySet,
  selectRecommendationBooks,
} from '../utils/recommendationSelection'
import {
  readRecommendationState,
  RECOMMENDATION_STORAGE_KEYS,
  writeRecommendationState,
} from '../utils/recommendationSessionStorage'

const HOME_SHELF_BOOK_LIMIT = 5
const HOME_CANDIDATE_POOL_SIZE = 12
const EMPTY_EXCLUDED_BOOK_IDS = []

/**
 * Charge les selections de la vue Decouvrir par defaut.
 *
 * Les sections sont volontairement chargees avec `Promise.allSettled`:
 * une selection indisponible ne bloque pas les autres, et la page affiche
 * un message de disponibilite partielle si au moins une requete echoue.
 *
 * @param {boolean} isSearchMode - Indique si la page affiche des resultats.
 * @param {Iterable<string|Object>} [excludedBookIds] - Identifiants a exclure plus tard depuis la bibliotheque.
 * @returns {Object} Livres et etats de chargement de la vue Decouvrir.
 */
function useDiscoverHomeBooks(
  isSearchMode,
  excludedBookIds = EMPTY_EXCLUDED_BOOK_IDS
) {
  const [forYouBooks, setForYouBooks] = useState([])
  const [trendingBooks, setTrendingBooks] = useState([])
  const [mustReadBooks, setMustReadBooks] = useState([])
  const [isDiscoverLoading, setIsDiscoverLoading] =
    useState(false)
  const [discoverError, setDiscoverError] = useState('')
  const [isTrendingRefreshing, setIsTrendingRefreshing] =
    useState(false)
  const [trendingRefreshError, setTrendingRefreshError] =
    useState('')
  const [isMustReadRefreshing, setIsMustReadRefreshing] =
    useState(false)
  const [mustReadRefreshError, setMustReadRefreshError] =
    useState('')
  const [mustReadStartIndex, setMustReadStartIndex] =
    useState(0)
  const trendingShownIdentityKeysRef = useRef(new Set())
  const mustReadShownIdentityKeysRef = useRef(new Set())

  useEffect(() => {
    if (isSearchMode) return

    let isActive = true

    async function loadDiscoverBooks() {
      const savedTrendingState = readRecommendationState(
        RECOMMENDATION_STORAGE_KEYS.trending
      )
      const savedMustReadState = readRecommendationState(
        RECOMMENDATION_STORAGE_KEYS.mustReads
      )

      setIsDiscoverLoading(true)
      setDiscoverError('')
      setTrendingRefreshError('')
      setMustReadRefreshError('')
      trendingShownIdentityKeysRef.current = new Set(
        savedTrendingState?.seenIdentityKeys || []
      )
      mustReadShownIdentityKeysRef.current = new Set(
        savedMustReadState?.seenIdentityKeys || []
      )

      if (savedTrendingState) {
        addBooksToIdentitySet(
          trendingShownIdentityKeysRef.current,
          savedTrendingState.books
        )
        setTrendingBooks(savedTrendingState.books)
      }

      if (savedMustReadState) {
        addBooksToIdentitySet(
          mustReadShownIdentityKeysRef.current,
          savedMustReadState.books
        )
        setMustReadBooks(savedMustReadState.books)
        setMustReadStartIndex(savedMustReadState.startIndex)
      }

      if (savedTrendingState || savedMustReadState) {
        setIsDiscoverLoading(false)
      }

      const results = await Promise.allSettled([
        getBooksBySubject('mystery', HOME_SHELF_BOOK_LIMIT),
        savedTrendingState
          ? Promise.resolve(savedTrendingState.books)
          : getTrendingBooksDetails(HOME_CANDIDATE_POOL_SIZE),
        savedMustReadState
          ? Promise.resolve(savedMustReadState.books)
          : getBooksBySubject(
              'classics',
              HOME_CANDIDATE_POOL_SIZE,
              0
            ),
      ])

      if (!isActive) return

      const [
        forYouResult,
        trendingResult,
        mustReadsResult,
      ] = results

      // Peut-être pour toi
      if (forYouResult.status === 'fulfilled') {
        setForYouBooks(forYouResult.value)
      } else {
        setForYouBooks([])
      }

      // Tendances du moment
      if (savedTrendingState) {
        setTrendingBooks(savedTrendingState.books)
      } else if (trendingResult.status === 'fulfilled') {
        const selectedTrendingBooks = selectRecommendationBooks(
          trendingResult.value,
          {
            limit: HOME_SHELF_BOOK_LIMIT,
            alreadyShownIdentityKeys:
              trendingShownIdentityKeysRef.current,
            excludedBookIds,
            recycleSeenWhenExhausted: true,
          }
        )

        addBooksToIdentitySet(
          trendingShownIdentityKeysRef.current,
          selectedTrendingBooks
        )
        setTrendingBooks(selectedTrendingBooks)
        if (selectedTrendingBooks.length) {
          writeRecommendationState(
            RECOMMENDATION_STORAGE_KEYS.trending,
            {
              books: selectedTrendingBooks,
              seenIdentityKeys:
                trendingShownIdentityKeysRef.current,
            }
          )
        }
      } else {
        setTrendingBooks([])
      }

      // Les incontournables
      if (savedMustReadState) {
        setMustReadBooks(savedMustReadState.books)
        setMustReadStartIndex(savedMustReadState.startIndex)
      } else if (mustReadsResult.status === 'fulfilled') {
        const selectedMustReadBooks = selectRecommendationBooks(
          mustReadsResult.value,
          {
            limit: HOME_SHELF_BOOK_LIMIT,
            alreadyShownIdentityKeys:
              mustReadShownIdentityKeysRef.current,
            excludedBookIds,
          }
        )

        addBooksToIdentitySet(
          mustReadShownIdentityKeysRef.current,
          selectedMustReadBooks
        )
        setMustReadBooks(selectedMustReadBooks)
        setMustReadStartIndex(0)
        if (selectedMustReadBooks.length) {
          writeRecommendationState(
            RECOMMENDATION_STORAGE_KEYS.mustReads,
            {
              books: selectedMustReadBooks,
              startIndex: 0,
              seenIdentityKeys:
                mustReadShownIdentityKeysRef.current,
            }
          )
        }
      } else {
        setMustReadBooks([])
      }

      const hasFailedRequest = results.some(
        (result) => result.status === 'rejected'
      )

      if (hasFailedRequest) {
        setDiscoverError(
          'Certaines sélections sont temporairement indisponibles.'
        )
      }

      setIsDiscoverLoading(false)
    }

    loadDiscoverBooks()

    return () => {
      isActive = false
    }
  }, [isSearchMode, excludedBookIds])

  async function refreshTrendingBooks() {
    if (isTrendingRefreshing) return

    setIsTrendingRefreshing(true)
    setTrendingRefreshError('')

    try {
      const books = await getTrendingBooksDetails(
        HOME_CANDIDATE_POOL_SIZE
      )
      const selectedBooks = selectRecommendationBooks(books, {
        limit: HOME_SHELF_BOOK_LIMIT,
        alreadyShownIdentityKeys:
          trendingShownIdentityKeysRef.current,
        excludedBookIds,
        recycleSeenWhenExhausted: true,
      })

      if (selectedBooks.length) {
        addBooksToIdentitySet(
          trendingShownIdentityKeysRef.current,
          selectedBooks
        )
        setTrendingBooks(selectedBooks)
        setTrendingRefreshError('')
        writeRecommendationState(
          RECOMMENDATION_STORAGE_KEYS.trending,
          {
            books: selectedBooks,
            seenIdentityKeys: trendingShownIdentityKeysRef.current,
          }
        )
      } else {
        setTrendingRefreshError(
          'Aucune nouvelle tendance disponible pour le moment.'
        )
      }
    } catch {
      setTrendingRefreshError(
        'Impossible de rafraichir les tendances pour le moment.'
      )
    } finally {
      setIsTrendingRefreshing(false)
    }
  }

  async function refreshMustReadBooks() {
    if (isMustReadRefreshing) return

    const nextStartIndex =
      mustReadStartIndex + HOME_CANDIDATE_POOL_SIZE

    setIsMustReadRefreshing(true)
    setMustReadRefreshError('')

    try {
      const books = await getBooksBySubject(
        'classics',
        HOME_CANDIDATE_POOL_SIZE,
        nextStartIndex
      )
      const selectedBooks = selectRecommendationBooks(books, {
        limit: HOME_SHELF_BOOK_LIMIT,
        alreadyShownIdentityKeys:
          mustReadShownIdentityKeysRef.current,
        excludedBookIds,
      })

      if (selectedBooks.length) {
        addBooksToIdentitySet(
          mustReadShownIdentityKeysRef.current,
          selectedBooks
        )
        setMustReadBooks(selectedBooks)
        setMustReadStartIndex(nextStartIndex)
        setMustReadRefreshError('')
        writeRecommendationState(
          RECOMMENDATION_STORAGE_KEYS.mustReads,
          {
            books: selectedBooks,
            startIndex: nextStartIndex,
            seenIdentityKeys: mustReadShownIdentityKeysRef.current,
          }
        )
      } else {
        setMustReadRefreshError(
          'Aucun nouvel incontournable disponible pour le moment.'
        )
        if (books.length) {
          setMustReadStartIndex(nextStartIndex)
          writeRecommendationState(
            RECOMMENDATION_STORAGE_KEYS.mustReads,
            {
              books: mustReadBooks,
              startIndex: nextStartIndex,
              seenIdentityKeys: mustReadShownIdentityKeysRef.current,
            }
          )
        }
      }
    } catch {
      setMustReadRefreshError(
        'Impossible de rafraichir les incontournables pour le moment.'
      )
    } finally {
      setIsMustReadRefreshing(false)
    }
  }

  return {
    forYouBooks,
    trendingBooks,
    mustReadBooks,
    isDiscoverLoading,
    discoverError,
    isTrendingRefreshing,
    trendingRefreshError,
    refreshTrendingBooks,
    isMustReadRefreshing,
    mustReadRefreshError,
    refreshMustReadBooks,
  }
}

export default useDiscoverHomeBooks
