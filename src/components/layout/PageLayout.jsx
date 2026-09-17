import { Outlet } from 'react-router-dom'
import Sidebar from './Sidebar'

function PageLayout() {
  return (
    <div className="flex min-h-screen bg-parchment font-ui text-ink">
      <Sidebar />
      <main className="min-w-0 flex-1">
        <Outlet />
      </main>
    </div>
  )
}

export default PageLayout
