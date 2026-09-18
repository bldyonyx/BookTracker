import sleepingCat from '../../assets/images/cats/sleeping-cat.png'

function ReadingCompanion() {
  return (
    <section className="flex h-full min-h-48 items-center">
      <div className="flex w-full items-center justify-evenly gap-6">
        <img
          src={sleepingCat}
          alt="Petit chat tortoiseshell endormi"
          className="w-72 shrink-0 object-contain 2xl:w-80"
        />

        <div className="shrink-0 rounded-2xl border border-darkwood/10 bg-cream/80 px-7 py-5 text-center">
          <p className="font-handwritten text-xl leading-relaxed text-darkwood">
            Encore un chapitre,
            <br />
            puis juste un dernier...
            <br />
            ♡
          </p>
        </div>
      </div>
    </section>
  )
}

export default ReadingCompanion