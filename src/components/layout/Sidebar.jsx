import { NavLink } from 'react-router-dom'
import { desktopNavigationItems } from './navigation'

function Sidebar() {
  return (
    <aside className="hidden min-h-screen w-46 shrink-0 flex-col border-r border-walnut/20 bg-parchment px-3 py-5 text-ink md:flex lg:w-72 lg:px-5 lg:py-6">
      <div className="mb-6 lg:mb-10">
        <p className="font-heading text-2xl font-bold text-darkwood lg:text-3xl">Book Tracker</p>
      </div>

      <nav aria-label="Navigation principale" className="flex flex-col gap-1.5 font-ui lg:gap-2">
        {desktopNavigationItems.map((item) => (
          <NavLink
            end={item.to === '/'}
            key={item.to}
            to={item.to}
            className={({ isActive }) =>
              [
                'rounded-md px-3 py-2.5 text-xs font-bold transition-colors lg:px-4 lg:py-3 lg:text-sm',
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
