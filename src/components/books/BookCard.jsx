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
        <div
          className="
            relative
            flex h-full w-full
            items-center justify-center
           bg-sage/20
            p-4
          "
        >
          {/* Bordure intérieure façon couverture de livre */}
          <div
            className="
              absolute inset-2
              rounded-lg
              border border-olive/20
            "
          />

          {/* Contenu du fallback */}
          <div className="relative text-center">
            <span
              aria-hidden="true"
              className="
                font-heading
                text-3xl
                text-olive/40
              "
            >
              ♡
            </span>

            <p
              className="
                mt-3
                font-ui text-[10px]
                leading-relaxed
                text-darkwood/40
              "
            >
              Couverture
              <br />
              indisponible
            </p>
          </div>
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
          <h3 className="line-clamp-3 break-words font-heading text-lg font-bold leading-tight text-darkwood">
            <Link
              to={`/books/${bookId}`}
              className="transition-colors hover:text-walnut"
            >
              {title}
            </Link>
          </h3>
        ) : (
          <h3 className="line-clamp-3 break-words font-heading text-lg font-bold leading-tight text-darkwood">
            {title}
          </h3>
        )}

        <p className="mt-1 line-clamp-2 break-words font-ui text-sm text-darkwood/60">
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
