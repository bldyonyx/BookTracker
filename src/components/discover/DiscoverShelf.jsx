import BookCard from '../books/BookCard'

function DiscoverShelf({
  title,
  description,
  books,
}) {
  if (books.length === 0) return null

  return (
    <section>
      <div className="flex items-end justify-between gap-4">
        <div>
          <h2 className="font-heading text-2xl font-bold text-darkwood">
            {title}
          </h2>

          {description && (
            <p className="mt-1 font-ui text-sm text-darkwood/60">
              {description}
            </p>
          )}
        </div>

        <button
          type="button"
          className="
            hidden shrink-0 cursor-pointer
            font-ui text-sm font-bold text-darkwood/60
            transition-colors
            hover:text-darkwood
            sm:block
          "
        >
          Voir plus →
        </button>
      </div>

      <div
        className="
          mt-5 flex gap-5
          overflow-x-auto
          pb-3
        "
      >
        {books.map((book) => (
          <div
            key={book.id}
            className="
              w-32 shrink-0
              sm:w-36
              lg:w-40
            "
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
    </section>
  )
}

export default DiscoverShelf