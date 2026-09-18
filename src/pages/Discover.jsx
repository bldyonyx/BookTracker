import { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import BookCard from '../components/books/BookCard'
import DiscoverSearch from '../components/discover/DiscoverSearch'
import DiscoverShelf from '../components/discover/DiscoverShelf'
import ForYouSection from '../components/discover/ForYouSection'
import {
  getBookSuggestions,
  getBooksBySubject,
  searchBooks,
} from '../services/booksApi'

const TEMPORARY_PREFERENCES = [
  'Fantasy',
  'Mystère',
  'Classiques',
]

function Discover() {
  const [searchParams, setSearchParams] = useSearchParams()

  const queryFromUrl = searchParams.get('q') || ''
  const isSearchMode = Boolean(queryFromUrl)

  const [search, setSearch] = useState(queryFromUrl)

  // Recherche
  const [books, setBooks] = useState([])
  const [suggestions, setSuggestions] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [areSuggestionsLoading, setAreSuggestionsLoading] =
    useState(false)
  const [error, setError] = useState('')

  // Découverte
  const [forYouBooks, setForYouBooks] = useState([])
  const [classicBooks, setClassicBooks] = useState([])
  const [fantasyBooks, setFantasyBooks] = useState([])
  const [isDiscoverLoading, setIsDiscoverLoading] = useState(false)
  const [discoverError, setDiscoverError] = useState('')

  /*
   * Garde l'input synchronisé avec la recherche
   * présente dans l'URL.
   */
  useEffect(() => {
    setSearch(queryFromUrl)
  }, [queryFromUrl])

  /*
   * Charge les sélections de la page Découvrir.
   *
   * Les préférences sont temporaires jusqu'à la mise
   * en place de Firebase et de l'onboarding.
   */
  useEffect(() => {
    if (isSearchMode) return

    async function loadDiscoverBooks() {
      try {
        setIsDiscoverLoading(true)
        setDiscoverError('')

        const [forYou, classics, fantasy] = await Promise.all([
          getBooksBySubject('mystery', 4),
          getBooksBySubject('classics', 10),
          getBooksBySubject('fantasy', 10),
        ])

        setForYouBooks(forYou)
        setClassicBooks(classics)
        setFantasyBooks(fantasy)
      } catch (err) {
        setDiscoverError(err.message)
      } finally {
        setIsDiscoverLoading(false)
      }
    }

    loadDiscoverBooks()
  }, [isSearchMode])

  /*
   * Lance la recherche principale lorsque ?q=
   * est présent dans l'URL.
   */
  useEffect(() => {
    if (!queryFromUrl) {
      setBooks([])
      setError('')
      return
    }

    async function loadBooks() {
      try {
        setIsLoading(true)
        setError('')

        const results = await searchBooks(queryFromUrl)

        setBooks(results)
      } catch (err) {
        setError(err.message)
        setBooks([])
      } finally {
        setIsLoading(false)
      }
    }

    loadBooks()
  }, [queryFromUrl])

  /*
   * Attend 300 ms après la saisie avant
   * de récupérer les suggestions.
   */
  useEffect(() => {
    const trimmedSearch = search.trim()

    if (
      trimmedSearch.length < 2 ||
      trimmedSearch === queryFromUrl
    ) {
      setSuggestions([])
      setAreSuggestionsLoading(false)
      return
    }

    setAreSuggestionsLoading(true)

    const timeout = setTimeout(async () => {
      try {
        const results = await getBookSuggestions(trimmedSearch)

        setSuggestions(results)
      } catch {
        setSuggestions([])
      } finally {
        setAreSuggestionsLoading(false)
      }
    }, 300)

    return () => clearTimeout(timeout)
  }, [search, queryFromUrl])

  function handleSubmit(event) {
    event.preventDefault()

    const trimmedSearch = search.trim()

    if (!trimmedSearch) return

    setSuggestions([])
    setSearchParams({ q: trimmedSearch })
  }

  function handleClearSearch() {
    setSearch('')
    setSuggestions([])
    setAreSuggestionsLoading(false)
    setSearchParams({})
  }

  function handleBackToDiscover() {
    setSearch('')
    setSuggestions([])
    setAreSuggestionsLoading(false)
    setSearchParams({})
  }

  return (
    <div className="p-6">
      {/* Header */}
      <header className="py-4">
        <h1 className="font-heading text-3xl font-bold text-darkwood md:text-4xl">
          Découvrir
        </h1>

        <p className="mt-2 font-ui text-sm font-semibold text-darkwood/60 md:text-base">
          Trouve ta prochaine lecture.
        </p>
      </header>

      {/* Recherche */}
      <section className="mt-8">
        <DiscoverSearch
          search={search}
          onSearchChange={setSearch}
          onSubmit={handleSubmit}
          onClear={handleClearSearch}
          suggestions={suggestions}
          isSuggestionsLoading={areSuggestionsLoading}
        />
      </section>

      {/* Mode découverte */}
      {!isSearchMode && (
        <div className="mt-10 space-y-12">
          {isDiscoverLoading && (
            <p className="font-ui text-sm text-darkwood/60">
              Préparation de tes découvertes...
            </p>
          )}

          {discoverError && (
            <p className="font-ui text-sm text-darkwood">
              {discoverError}
            </p>
          )}

          {!isDiscoverLoading && !discoverError && (
            <>
              <ForYouSection
                books={forYouBooks}
                preferences={TEMPORARY_PREFERENCES}
              />

              <DiscoverShelf
                title="Les classiques"
                description="Quelques histoires intemporelles à découvrir."
                books={classicBooks}
              />

              <DiscoverShelf
                title="Fantasy & imaginaire"
                description="Un peu de magie pour ta prochaine lecture."
                books={fantasyBooks}
              />
            </>
          )}
        </div>
      )}

      {/* Mode recherche */}
      {isSearchMode && (
        <section className="mt-10">
          <button
            type="button"
            onClick={handleBackToDiscover}
            className="
              cursor-pointer
              font-ui text-sm font-bold
              text-darkwood/60
              transition-colors
              hover:text-darkwood
            "
          >
            ← Retour aux découvertes
          </button>

          {isLoading && (
            <p className="mt-8 font-ui text-sm text-darkwood/60">
              Recherche en cours...
            </p>
          )}

          {error && (
            <p className="mt-8 font-ui text-sm text-darkwood">
              {error}
            </p>
          )}

          {!isLoading && !error && (
            <>
              {/* Header des résultats */}
              <div
                className="
                  mt-8
                  flex flex-col gap-4
                  sm:flex-row sm:items-end sm:justify-between
                "
              >
                <div>
                  <h2 className="font-heading text-2xl font-bold text-darkwood">
                    Résultats pour « {queryFromUrl} »
                  </h2>

                  <p className="mt-1 font-ui text-sm text-darkwood/60">
                    {books.length} livre
                    {books.length > 1 ? 's' : ''} trouvé
                    {books.length > 1 ? 's' : ''}
                  </p>
                </div>

                <button
                  type="button"
                  className="
                    w-fit cursor-pointer
                    rounded-full
                    border border-walnut/20
                    bg-cream
                    px-5 py-2.5
                    font-ui text-sm font-bold
                    text-darkwood
                    transition-colors
                    hover:bg-mintcream
                  "
                >
                  Filtrer
                </button>
              </div>

              {/* Livres trouvés */}
              {books.length > 0 && (
                <div
                  className="
                    mt-8 grid
                    grid-cols-2
                    gap-x-5 gap-y-8
                    sm:grid-cols-3
                    lg:grid-cols-4
                    xl:grid-cols-5
                    2xl:grid-cols-6
                  "
                >
                  {books.map((book) => (
                    <BookCard
                      key={book.id}
                      bookId={book.id}
                      title={book.title}
                      author={book.authors.join(', ')}
                      cover={book.cover}
                    />
                  ))}
                </div>
              )}

              {/* Aucun résultat */}
              {books.length === 0 && (
                <div
                  className="
                    mt-8 rounded-2xl
                    border border-walnut/10
                    bg-cream/70
                    px-6 py-10
                    text-center
                  "
                >
                  <p className="font-heading text-xl font-bold text-darkwood">
                    Aucun livre trouvé
                  </p>

                  <p className="mt-2 font-ui text-sm text-darkwood/60">
                    Essaie avec un autre titre, auteur ou mot-clé.
                  </p>
                </div>
              )}
            </>
          )}
        </section>
      )}
    </div>
  )
}

export default Discover