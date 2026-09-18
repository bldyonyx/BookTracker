import sleepingCat from '../../assets/images/cats/sleeping-cat.png'

function ReadingCompanion() {
  return (
    <section className="flex h-full min-w-0 items-center justify-center">
      <div
        className="
          flex w-full min-w-0
          flex-col items-center justify-center gap-4
          md:flex-row md:gap-6
          xl:gap-4
          2xl:gap-6
        "
      >
        {/* Chat */}
        <div
          className="
            flex items-center justify-center
            md:w-auto md:flex-1
          "
        >
          <img
            src={sleepingCat}
            alt="Petit chat tortoiseshell endormi"
            className="
              w-64 max-w-full object-contain
              md:w-64
              lg:w-72
              xl:w-full xl:max-w-72
              2xl:max-w-80
            "
          />
        </div>

        {/* Petite note */}
        <div
          className="
            w-full max-w-64
            rounded-2xl
            border border-darkwood/10
            bg-cream/80
            px-5 py-5
            text-center
            md:w-64 md:shrink-0
            2xl:max-w-72
            2xl:px-7
          "
        >
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