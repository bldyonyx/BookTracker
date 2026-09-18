import { Link } from 'react-router-dom'
import flower from '../../assets/images/flower.png'

function HeaderActions({ className = '' }) {
  return (
    <div
      className={[
        'flex min-w-0 items-center gap-3 md:flex-1 md:justify-end',
        className,
      ].join(' ')}
    >
      {/* Notifications */}
      <button
        type="button"
        aria-label="Notifications"
        className="
          flex h-11 w-11 shrink-0 cursor-pointer
          items-center justify-center
          rounded-full border border-walnut/30
          bg-cream text-xl text-darkwood
          transition-transform
          hover:-translate-y-0.5
          md:h-12 md:w-12
        "
      >
        ♡
      </button>

      {/* Profil */}
      <Link
        to="/settings"
        aria-label="Ouvrir les paramètres du profil"
        className="
          relative flex h-14 w-14 shrink-0 cursor-pointer
          items-center justify-center
          transition-transform
          hover:-translate-y-0.5
          md:h-16 md:w-16
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
            relative z-10 flex h-9 w-9
            items-center justify-center
            rounded-full bg-cream
            font-heading text-base font-bold text-darkwood
            md:h-10 md:w-10 md:text-lg
          "
        >
          M
        </span>
      </Link>
    </div>
  )
}

export default HeaderActions
