import { Link } from 'react-router-dom'
import flower from '../../assets/images/flower.png'

function HeaderActions() {
  return (
    <div className="flex shrink-0 items-center gap-3">
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
  )
}

export default HeaderActions