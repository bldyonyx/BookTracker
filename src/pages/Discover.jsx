import { useSearchParams } from 'react-router-dom'
import DiscoverHome from '../components/discover/DiscoverHome'
import DiscoverSearch from '../components/discover/DiscoverSearch'
import SearchResults from '../components/discover/SearchResults'
import useDiscoverHomeBooks from '../hooks/useDiscoverHomeBooks'
import useDiscoverSearch from '../hooks/useDiscoverSearch'

const TEMPORARY_PREFERENCES = [
  'Fantasy',
  'Mystère',
  'Classiques',
]

function Discover() {
  const [searchParams, setSearchParams] = useSearchParams()

  const queryFromUrl = searchParams.get('q') || ''
  const isSearchMode = Boolean(queryFromUrl)

  const {
    search,
    setSearch,
    books,
    suggestions,
    isLoading,
    areSuggestionsLoading,
    error,
    handleSubmit,
    handleClearSearch,
    handleBackToDiscover,
  } = useDiscoverSearch(queryFromUrl, setSearchParams)

  const {
    forYouBooks,
    trendingBooks,
    mustReadBooks,
    isDiscoverLoading,
    discoverError,
  } = useDiscoverHomeBooks(isSearchMode)

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
      <section className={isSearchMode ? 'mt-6' : 'mt-8'}>
        <DiscoverSearch
          search={search}
          onSearchChange={setSearch}
          onSubmit={handleSubmit}
          onClear={handleClearSearch}
          submittedQuery={queryFromUrl}
          suggestions={suggestions}
          isSuggestionsLoading={areSuggestionsLoading}
        />
      </section>

      {/* Mode découverte */}
      {!isSearchMode && (
        <DiscoverHome
          forYouBooks={forYouBooks}
          trendingBooks={trendingBooks}
          mustReadBooks={mustReadBooks}
          preferences={TEMPORARY_PREFERENCES}
          isLoading={isDiscoverLoading}
          error={discoverError}
        />
      )}

      {/* Mode recherche */}
      {isSearchMode && (
        <SearchResults
          query={queryFromUrl}
          books={books}
          isLoading={isLoading}
          error={error}
          onBackToDiscover={handleBackToDiscover}
        />
      )}
    </div>
  )
}

export default Discover
