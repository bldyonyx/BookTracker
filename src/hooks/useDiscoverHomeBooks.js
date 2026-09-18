import { useEffect, useState } from 'react'
import { getBooksBySubject } from '../services/booksApi'
import { getTrendingBooksDetails } from '../services/trendingBooksApi'

/**
 * Charge les selections de la vue Decouvrir par defaut.
 *
 * Les sections sont volontairement chargees avec `Promise.allSettled`:
 * une selection indisponible ne bloque pas les autres, et la page affiche
 * un message de disponibilite partielle si au moins une requete echoue.
 *
 * @param {boolean} isSearchMode - Indique si la page affiche des resultats.
 * @returns {Object} Livres et etats de chargement de la vue Decouvrir.
 */
function useDiscoverHomeBooks(isSearchMode) {
  const [forYouBooks, setForYouBooks] = useState([])
  const [trendingBooks, setTrendingBooks] = useState([])
  const [mustReadBooks, setMustReadBooks] = useState([])
  const [isDiscoverLoading, setIsDiscoverLoading] =
    useState(false)
  const [discoverError, setDiscoverError] = useState('')

  useEffect(() => {
    if (isSearchMode) return

    async function loadDiscoverBooks() {
      setIsDiscoverLoading(true)
      setDiscoverError('')

      const results = await Promise.allSettled([
        getBooksBySubject('mystery', 5),
        getTrendingBooksDetails(10),
        getBooksBySubject('classics', 10),
      ])

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
      if (trendingResult.status === 'fulfilled') {
        setTrendingBooks(trendingResult.value)
      } else {
        setTrendingBooks([])
      }

      // Les incontournables
      if (mustReadsResult.status === 'fulfilled') {
        setMustReadBooks(mustReadsResult.value)
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
  }, [isSearchMode])

  return {
    forYouBooks,
    trendingBooks,
    mustReadBooks,
    isDiscoverLoading,
    discoverError,
  }
}

export default useDiscoverHomeBooks
