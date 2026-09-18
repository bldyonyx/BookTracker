import { Link } from 'react-router-dom'
import BookCard from '../books/BookCard'

function ForYouSection({
  books,
  preferences,
}) {
  if (books.length === 0) return null

  return (
    <section
      className="
        rounded-3xl
        border border-walnut/15
        bg-cream/65
        p-5
        sm:p-6
        lg:p-8
      "
    >
      {/* Header */}
      <div
        className="
          flex flex-col gap-5
          sm:flex-row sm:items-start sm:justify-between
        "
      >
        <div className="min-w-0">
          <p className="font-handwritten text-lg text-walnut">
            rien que pour toi ♡
          </p>

          <h2 className="mt-1 font-heading text-3xl font-bold text-darkwood">
            Peut-être pour toi
          </h2>

          <p className="mt-2 font-ui text-sm text-darkwood/60">
            Des livres choisis selon tes goûts de lecture.
          </p>

          {/* Préférences */}
          <div className="mt-4 flex flex-wrap items-center gap-2">
            {preferences.map((preference) => (
              <span
                key={preference}
                className="
                  rounded-full
                  bg-mintcream
                  px-3 py-1.5
                  font-ui text-xs font-bold
                  text-darkwood/70
                "
              >
                {preference}
              </span>
            ))}

            <Link
              to="/settings"
              className="
                ml-1
                font-ui text-xs
                text-darkwood/45
                underline
                decoration-darkwood/20
                underline-offset-3
                transition-colors
                hover:text-darkwood
              "
            >
              Modifier mes goûts
            </Link>
          </div>
        </div>

        {/* Action principale */}
        <button
          type="button"
          className="
            hidden shrink-0 cursor-pointer
            rounded-full
            border border-walnut/20
            bg-mintcream
            px-4 py-2
            font-ui text-xs font-bold
            text-darkwood
            transition-colors
            hover:bg-lime
            sm:block
          "
        >
          Voir toutes les suggestions →
        </button>
      </div>

      {/* Livres recommandés */}
      <div
        className="
          mt-7 grid
          grid-cols-2
          gap-5
          sm:grid-cols-4
          lg:gap-7
        "
      >
        {books.slice(0, 4).map((book) => (
          <div
            key={book.id}
            className="mx-auto w-full max-w-40"
          >
            <BookCard
              bookId={book.id}
              title={book.title}
              author={book.authors.join(', ')}
              cover={book.cover}
            />
          </div>
        ))}
      </div>

      {/* Action mobile */}
      <div className="mt-6 flex justify-end sm:hidden">
        <button
          type="button"
          className="
            cursor-pointer
            rounded-full
            border border-walnut/20
            bg-mintcream
            px-4 py-2
            font-ui text-xs font-bold
            text-darkwood
            transition-colors
            hover:bg-lime
          "
        >
          Voir toutes les suggestions →
        </button>
      </div>
    </section>
  )
}

export default ForYouSection