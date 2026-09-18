import BookCard from '../books/BookCard'

function DiscoverShelf({
  title,
  description,
  books,
  error = '',
  isRefreshing = false,
  onRefresh,
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

        {onRefresh && (
          <button
            type="button"
            onClick={onRefresh}
            disabled={isRefreshing}
            aria-label={`Rafraichir ${title}`}
            className="
              grid size-10 shrink-0 place-items-center
              rounded-full border border-walnut/20
              bg-mintcream
              font-ui text-xl font-bold text-darkwood
              transition
              hover:bg-lime
              disabled:cursor-wait disabled:opacity-60
            "
          >
            <span
              className={
                isRefreshing
                  ? 'inline-block animate-spin'
                  : 'inline-block'
              }
              aria-hidden="true"
            >
              ↻
            </span>
          </button>
        )}
      </div>

      {error && (
        <p className="mt-3 font-ui text-sm text-darkwood/55">
          {error}
        </p>
      )}

      <div
        className="
          mt-6 grid
          grid-cols-2
          gap-5
          md:grid-cols-3
          lg:grid-cols-4
          xl:grid-cols-5
          lg:gap-8
        "
      >
        {books.map((book, index) => (
          <div
            key={book.id}
            className={`
              mx-auto w-full max-w-40
              ${index >= 2 ? 'hidden md:block' : ''}
              ${index >= 3 ? 'md:hidden lg:block' : ''}
              ${index >= 4 ? 'lg:hidden xl:block' : ''}
            `}
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
