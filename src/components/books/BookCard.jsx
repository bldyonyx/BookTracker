import { Link } from 'react-router-dom'
import StatusBadge from '../ui/StatusBadge'

function BookCard({
  bookId,
  title,
  author,
  cover,
  status,
}) {
  const coverContent = (
    <div className="aspect-2/3 overflow-hidden rounded-xl bg-cream">
      {cover ? (
        <img
          src={cover}
          alt={`Couverture de ${title}`}
          className="
            h-full w-full object-cover
            transition-transform duration-200
            group-hover:scale-[1.02]
          "
        />
      ) : (
        <div className="flex h-full items-center justify-center p-4 text-center">
          <span className="font-ui text-xs text-darkwood/50">
            Couverture indisponible
          </span>
        </div>
      )}
    </div>
  )

  return (
    <article className="w-full">
      {bookId ? (
        <Link
          to={`/books/${bookId}`}
          className="group block"
          aria-label={`Voir ${title}`}
        >
          {coverContent}
        </Link>
      ) : (
        coverContent
      )}

      <div className="mt-3 text-center">
        {bookId ? (
          <h3 className="font-heading text-lg font-bold leading-tight text-darkwood">
            <Link
              to={`/books/${bookId}`}
              className="transition-colors hover:text-walnut"
            >
              {title}
            </Link>
          </h3>
        ) : (
          <h3 className="font-heading text-lg font-bold leading-tight text-darkwood">
            {title}
          </h3>
        )}

        <p className="mt-1 font-ui text-sm text-darkwood/60">
          {author || 'Auteur inconnu'}
        </p>

        {status && (
          <div className="mt-2 flex justify-center">
            <StatusBadge status={status} />
          </div>
        )}
      </div>
    </article>
  )
}

export default BookCard