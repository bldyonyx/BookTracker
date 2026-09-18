import sleepingCat from '../../assets/images/cats/sleeping-cat.png'

function ReadingCompanion() {
  return (
    <section className="flex h-full min-w-0 items-center">
      <div
        className="
          flex w-full min-w-0
          flex-col items-center justify-center gap-4
          xl:flex-row xl:justify-center
          2xl:gap-6
        "
      >
        {/* Chat */}
        <div
          className="
            flex w-full items-center justify-center
            xl:w-1/2
          "
        >
          <img
            src={sleepingCat}
            alt="Petit chat tortoiseshell endormi"
            className="
              w-64 max-w-full object-contain
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
            xl:w-1/2
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