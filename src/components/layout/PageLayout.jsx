import { NavLink, Outlet } from 'react-router-dom'
import greenBackground from '../../assets/textures/green-bg.jpg'
import stripesBrown from '../../assets/textures/stripes-brown.jpg'
import MobileNav from './MobileNav'
import Sidebar from './Sidebar'

function PageLayout() {
  return (
    <div className="flex min-h-screen w-screen max-w-full overflow-x-hidden bg-parchment font-ui text-ink">
      <Sidebar />
      <div
        className="fixed left-0 top-0 z-20 flex h-14 w-dvw items-center justify-between gap-3 border-b border-walnut/20 bg-darkwood bg-cover bg-center bg-no-repeat px-4 text-cream md:hidden"
        style={{ backgroundImage: `url(${stripesBrown})` }}
      >
        <p className="min-w-0 truncate font-heading text-xl font-bold text-cream">Book Tracker</p>
        <NavLink
          to="/settings"
          className={({ isActive }) =>
            [
              'shrink-0 rounded-md px-3 py-2 text-xs font-bold transition-colors',
              'hover:bg-cream/10 hover:text-parchment',
              isActive
                ? 'bg-lime text-ink shadow-sm'
                : 'text-cream',
            ].join(' ')
          }
        >
          Paramètres
        </NavLink>
      </div>
      <main
        className="min-w-0 max-w-full flex-1 overflow-x-hidden bg-mintcream bg-cover bg-center bg-no-repeat pb-24 pt-14 text-darkwood md:pb-0 md:pt-0 [&>main]:bg-transparent"
        style={{ backgroundImage: `url(${greenBackground})` }}
      >
        <Outlet />
      </main>
      <MobileNav />
    </div>
  )
}

export default PageLayout
