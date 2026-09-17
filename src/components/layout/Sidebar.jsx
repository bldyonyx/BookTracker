import { NavLink } from 'react-router-dom'
import stripesBrown from '../../assets/textures/stripes-brown.jpg'
import { desktopNavigationItems } from './navigation'

function Sidebar() {
  return (
    <aside
      className="hidden min-h-screen w-46 shrink-0 flex-col border-r-2 border-cream/20 bg-darkwood bg-cover bg-center bg-no-repeat px-3 py-5 text-cream md:flex lg:w-72 lg:px-5 lg:py-6"
      style={{ backgroundImage: `url(${stripesBrown})` }}
    >
      <div className="mb-6 lg:mb-10">
        <NavLink
          to="/"
          className="font-heading text-2xl font-bold text-cream lg:text-3xl"
        >
          Book Tracker
        </NavLink>
      </div>

      <nav
        aria-label="Navigation principale"
        className="flex flex-col gap-1.5 font-ui lg:gap-2"
      >
        {desktopNavigationItems.map((item) => (
          <NavLink
            end={item.to === '/'}
            key={item.to}
            to={item.to}
            className={({ isActive }) =>
              [
                'rounded-md px-3 py-2.5 text-xs font-bold transition-all lg:px-4 lg:py-3 lg:text-sm',
                isActive
                  ? 'bg-lime text-ink shadow-sm'
                  : 'text-cream hover:translate-x-1 hover:text-lime',
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