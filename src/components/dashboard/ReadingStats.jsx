function ReadingStats() {
  const totalBooks = 28
  const currentlyReading = 3
  const favoriteGenre = 'Fantasy'

  return (
    <section className="h-full rounded-3xl border border-darkwood/10 bg-cream/80 p-4 sm:p-5 md:p-6">
      <div>
        <h2 className="font-heading text-2xl font-bold text-darkwood">
          Tes lectures
        </h2>

        <p className="mt-1 font-ui text-xs text-darkwood/60 sm:text-sm">
          Un petit aperçu de ta bibliothèque.
        </p>
      </div>

      {/* Statistiques */}
      <div className="mt-6 grid grid-cols-2 sm:grid-cols-3">
        {/* Nombre total de livres */}
        <div className="flex flex-col items-center px-2 text-center sm:px-4">
          <p className="font-heading text-3xl font-bold text-darkwood sm:text-4xl">
            {totalBooks}
          </p>

          <p className="mt-1 font-ui text-xs font-bold text-darkwood">
            livres
          </p>

          <p className="mt-0.5 font-ui text-[0.65rem] text-darkwood/50 sm:text-xs">
            dans ta bibliothèque
          </p>
        </div>

        {/* Livres en cours */}
        <div className="flex flex-col items-center border-l border-darkwood/15 px-2 text-center sm:border-x sm:px-4">
          <p className="font-heading text-3xl font-bold text-darkwood sm:text-4xl">
            {currentlyReading}
          </p>

          <p className="mt-1 font-ui text-xs font-bold text-darkwood">
            en cours
          </p>

          <p className="mt-0.5 font-ui text-[0.65rem] text-darkwood/50 sm:text-xs">
            actuellement
          </p>
        </div>

        {/* Genre le plus lu */}
        <div className="col-span-2 mt-5 flex flex-col items-center border-t border-darkwood/15 pt-5 text-center sm:col-span-1 sm:mt-0 sm:border-t-0 sm:pt-0">
          <p className="font-heading text-2xl font-bold text-darkwood">
            {favoriteGenre}
          </p>

          <p className="mt-1 font-ui text-xs text-darkwood/50">
            genre le plus lu
          </p>
        </div>
      </div>
    </section>
  )
}

export default ReadingStats