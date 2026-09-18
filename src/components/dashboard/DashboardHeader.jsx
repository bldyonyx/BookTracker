import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import flower from '../../assets/images/flower.png'
import Input from '../ui/Input'

function DashboardHeader() {
  const [search, setSearch] = useState('')
  const navigate = useNavigate()

  function handleSubmit(event) {
    event.preventDefault()

    const trimmedSearch = search.trim()

    if (!trimmedSearch) return

    navigate(`/discover?q=${encodeURIComponent(trimmedSearch)}`)
  }

  return (
    <header
      className="
        flex flex-col gap-5 py-4
        xl:flex-row xl:items-center xl:justify-between
      "
    >
      {/* Bonjour */}
      <div className="shrink-0">
        <h1 className="font-heading text-3xl font-bold text-darkwood md:text-4xl">
          Bonjour, Maya
        </h1>

        <p className="mt-2 font-ui text-sm font-semibold text-darkwood/60 md:text-base">
          Voici un aperçu de tes lectures.
        </p>
      </div>

      {/* Recherche + actions */}
      <div
        className="
          flex w-full min-w-0 items-center gap-3
          xl:w-auto
        "
      >
        {/* Recherche */}
        <form
          onSubmit={handleSubmit}
          className="min-w-0 flex-1 sm:max-w-lg xl:w-96 xl:flex-none"
        >
          <Input
            id="dashboard-search"
            type="search"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Rechercher un livre..."
            aria-label="Rechercher un livre"
            className="w-full !rounded-full px-6 py-3"
          />
        </form>

        {/* Notifications */}
        <button
          type="button"
          aria-label="Notifications"
          className="
            flex h-12 w-12 shrink-0 cursor-pointer
            items-center justify-center
            rounded-full border border-walnut/30
            bg-cream text-xl text-darkwood
            transition-transform
            hover:-translate-y-0.5
          "
        >
          ♡
        </button>

        {/* Profil */}
        <Link
          to="/settings"
          aria-label="Ouvrir les paramètres du profil"
          className="
            relative flex h-16 w-16 shrink-0 cursor-pointer
            items-center justify-center
            transition-transform
            hover:-translate-y-0.5
          "
        >
          <img
            src={flower}
            alt=""
            aria-hidden="true"
            className="absolute inset-0 h-full w-full object-contain"
          />

          <span
            className="
              relative z-10 flex h-10 w-10
              items-center justify-center
              rounded-full bg-cream
              font-heading text-lg font-bold text-darkwood
            "
          >
            M
          </span>
        </Link>
      </div>
    </header>
  )
}

export default DashboardHeader