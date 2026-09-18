import { useEffect, useRef, useState } from 'react'
import Input from '../ui/Input'
import SearchSuggestions from './SearchSuggestions'

function DiscoverSearch({
  search,
  onSearchChange,
  onSubmit,
  onClear,
  suggestions,
  isSuggestionsLoading,
}) {
  const searchRef = useRef(null)
  const [isSuggestionsOpen, setIsSuggestionsOpen] = useState(false)

  /*
   * Ferme les suggestions lorsque l'utilisateur
   * clique en dehors de la zone de recherche.
   */
  useEffect(() => {
    function handleClickOutside(event) {
      if (
        searchRef.current &&
        !searchRef.current.contains(event.target)
      ) {
        setIsSuggestionsOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  /*
   * Ouvre les suggestions lorsqu'elles arrivent
   * pendant que l'utilisateur écrit.
   */
  useEffect(() => {
    if (suggestions.length > 0 || isSuggestionsLoading) {
      setIsSuggestionsOpen(true)
    }
  }, [suggestions, isSuggestionsLoading])

  function handleFocus() {
    if (search.trim().length >= 2) {
      setIsSuggestionsOpen(true)
    }
  }

  function handleChange(event) {
    onSearchChange(event.target.value)
    setIsSuggestionsOpen(true)
  }

  function handleClear() {
    setIsSuggestionsOpen(false)
    onClear()
  }

  return (
    <form
      ref={searchRef}
      onSubmit={onSubmit}
      className="
        relative w-full min-w-0
        max-w-[calc(100vw-3rem)]
        md:max-w-2xl
      "
    >
      <div className="relative">
        {/* Loupe */}
        <svg
          viewBox="0 0 24 24"
          aria-hidden="true"
          className="
            pointer-events-none
            absolute left-5 top-1/2 z-10
            h-5 w-5 -translate-y-1/2
            text-darkwood/50
          "
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
        >
          <circle cx="11" cy="11" r="6" />
          <path d="m16 16 4 4" />
        </svg>

        <Input
          id="discover-search"
          type="search"
          value={search}
          onChange={handleChange}
          onFocus={handleFocus}
          placeholder="Rechercher un titre, un auteur..."
          aria-label="Rechercher un livre"
          autoComplete="off"
          className="
            w-full
            !rounded-full
            py-3 pl-13 pr-12
          "
        />

        {/* Croix personnalisée */}
        {search && (
          <button
            type="button"
            onClick={handleClear}
            aria-label="Effacer la recherche"
            className="
              absolute right-4 top-1/2 z-10
              flex h-7 w-7
              -translate-y-1/2
              cursor-pointer
              items-center justify-center
              rounded-full
              font-ui text-xl
              text-darkwood/50
              transition-colors
              hover:text-darkwood
            "
          >
            ×
          </button>
        )}
      </div>

      {isSuggestionsOpen && (
        <SearchSuggestions
          suggestions={suggestions}
          isLoading={isSuggestionsLoading}
        />
      )}
    </form>
  )
}

export default DiscoverSearch
