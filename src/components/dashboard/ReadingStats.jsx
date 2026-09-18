function ReadingStats() {
  const totalBooks = 28
  const currentlyReading = 3
  const favoriteGenre = 'Fantasy'

  return (
    <section className="flex h-full flex-col rounded-3xl border border-darkwood/10 bg-cream/80 p-5 md:p-6">
      <div>
        <h2 className="font-heading text-2xl font-bold text-darkwood">
          Tes lectures
        </h2>

        <p className="mt-1 font-ui text-sm text-darkwood/60">
          Un petit aperçu de ta bibliothèque.
        </p>
      </div>

      <div className="flex flex-1 items-center">
        <div className="grid w-full grid-cols-3 items-center">
          {/* Nombre total de livres */}
          <div className="text-center">
            <p className="font-heading text-4xl font-bold text-darkwood">
              {totalBooks}
            </p>

            <p className="mt-1 font-ui text-xs text-darkwood/50">
              livres
            </p>
          </div>

          {/* Livres en cours */}
          <div className="border-x border-darkwood/10 text-center">
            <p className="font-heading text-4xl font-bold text-darkwood">
              {currentlyReading}
            </p>

            <p className="mt-1 font-ui text-xs text-darkwood/50">
              en cours
            </p>
          </div>

          {/* Genre le plus lu */}
          <div className="text-center">
            <p className="font-heading text-xl font-bold text-darkwood">
              {favoriteGenre}
            </p>

            <p className="mt-1 font-ui text-xs text-darkwood/50">
              genre le plus lu
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

export default ReadingStats