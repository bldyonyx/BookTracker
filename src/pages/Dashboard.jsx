import CurrentlyReading from '../components/dashboard/CurrentlyReading'

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

      <div className="mt-8 grid gap-6 xl:grid-cols-[minmax(0,2fr)_minmax(280px,1fr)]">
        <CurrentlyReading />

        <div className="rounded-3xl border border-darkwood/10 bg-cream/80 p-5 md:p-6">
          <h2 className="font-heading text-2xl font-bold text-darkwood">
            Objectif de lecture
          </h2>
        </div>
      </div>
    </div>
  )
}

export default Dashboard