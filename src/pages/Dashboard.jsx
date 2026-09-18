import CurrentlyReading from '../components/dashboard/CurrentlyReading'
import ReadingCompanion from '../components/dashboard/ReadingCompanion'
import ReadingGoal from '../components/dashboard/ReadingGoal'
import RecentlyAdded from '../components/dashboard/RecentlyAdded'
import ReadingStats from '../components/dashboard/ReadingStats'

function Dashboard() {
  return (
    <div className="p-6">
      <header>
        <h1 className="font-heading text-3xl font-bold text-darkwood">
          Bonjour, Maya
        </h1>

        <p className="mt-1 font-ui text-sm text-darkwood/60">
          Voici un aperçu de tes lectures.
        </p>
      </header>

      {/* Première rangée */}
      <div className="mt-8 grid gap-6 xl:grid-cols-[minmax(0,2fr)_minmax(280px,1fr)]">
        <CurrentlyReading />
        <ReadingGoal />
      </div>

      {/* Livres récemment ajoutés */}
      <div className="mt-6">
        <RecentlyAdded />
      </div>

      {/* Dernière rangée */}
      <div className="mt-6 grid items-center gap-4 xl:grid-cols-[minmax(620px,1.5fr)_minmax(0,1fr)]">
        <ReadingStats />
        <ReadingCompanion />
      </div>
    </div>
  )
}

export default Dashboard