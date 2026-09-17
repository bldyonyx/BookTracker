import { NavLink, Outlet } from 'react-router-dom'
import MobileNav from './MobileNav'
import Sidebar from './Sidebar'

function PageLayout() {
  return (
    <div className="flex min-h-screen w-screen max-w-full overflow-x-hidden bg-parchment font-ui text-ink">
      <Sidebar />
      <div className="fixed left-0 top-0 z-20 flex h-14 w-dvw items-center justify-between gap-3 border-b border-walnut/20 bg-parchment px-4 md:hidden">
        <p className="min-w-0 truncate font-heading text-xl font-bold text-darkwood">Book Tracker</p>
        <NavLink
          to="/settings"
          className={({ isActive }) =>
            [
              'shrink-0 rounded-md px-3 py-2 text-xs font-bold transition-colors',
              'hover:bg-sage/20 hover:text-forest',
              isActive
                ? 'bg-forest text-parchment shadow-sm'
                : 'text-ink',
            ].join(' ')
          }
        >
          Paramètres
        </NavLink>
      </div>
      <main className="min-w-0 max-w-full flex-1 overflow-x-hidden pb-24 pt-14 md:pb-0 md:pt-0">
        <Outlet />
      </main>
      <MobileNav />
    </div>
  )
}

export default PageLayout
