import { NavLink } from 'react-router-dom'

const navigationItems = [
  { label: 'Accueil', to: '/' },
  { label: 'Découvrir', to: '/discover' },
  { label: 'Ma bibliothèque', to: '/library' },
  { label: 'Collections', to: '/collections' },
  { label: 'Paramètres', to: '/settings' },
]

function Sidebar() {
  return (
    <aside className="flex min-h-screen w-64 shrink-0 flex-col border-r border-walnut/20 bg-parchment px-5 py-6 text-ink">
      <div className="mb-10">
        <p className="font-heading text-3xl font-bold text-darkwood">Book Tracker</p>
      </div>

      <nav aria-label="Navigation principale" className="flex flex-col gap-2 font-ui">
        {navigationItems.map((item) => (
          <NavLink
            end={item.to === '/'}
            key={item.to}
            to={item.to}
            className={({ isActive }) =>
              [
                'rounded-md px-4 py-3 text-sm font-bold transition-colors',
                'hover:bg-sage/20 hover:text-forest',
                isActive
                  ? 'bg-forest text-parchment shadow-sm'
                  : 'text-ink',
              ].join(' ')
            }
          >
            {item.label}
          </NavLink>
        ))}
      </nav>
    </aside>
  )
}

export default Sidebar
