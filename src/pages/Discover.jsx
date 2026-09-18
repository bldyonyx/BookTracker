import Input from '../components/ui/Input'

function Discover() {
  return (
    <div className="p-6">
      {/* Header */}
      <header className="py-4">
        <h1 className="font-heading text-3xl font-bold text-darkwood md:text-4xl">
          Découvrir
        </h1>

        <p className="mt-2 font-ui text-sm font-semibold text-darkwood/60 md:text-base">
          Trouve ta prochaine lecture.
        </p>
      </header>

      {/* Recherche */}
      <section className="mt-8">
        <div className="w-full max-w-2xl">
          <Input
            id="discover-search"
            type="search"
            placeholder="Rechercher par titre, auteur ou mot-clé..."
            aria-label="Rechercher un livre"
          />
        </div>
      </section>
    </div>
  )
}

export default Discover