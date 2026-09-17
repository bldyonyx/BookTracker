import { NavLink } from 'react-router-dom'
import { mainNavigationItems } from './navigation'

function MobileNav() {
  return (
    <nav
      aria-label="Navigation mobile principale"
      className="fixed bottom-0 left-0 z-20 w-dvw overflow-hidden border-t border-walnut/20 bg-parchment px-2 pb-3 pt-2 font-ui text-ink md:hidden"
    >
      <div className="flex w-full gap-1">
        {mainNavigationItems.map((item) => (
          <NavLink
            end={item.to === '/'}
            key={item.to}
            to={item.to}
            className={({ isActive }) =>
              [
                'flex min-h-14 min-w-0 flex-1 items-center justify-center rounded-md px-1 text-center text-[0.62rem] font-bold leading-tight transition-colors',
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
      </div>
    </nav>
  )
}

export default MobileNav
