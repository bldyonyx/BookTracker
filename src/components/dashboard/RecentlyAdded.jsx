import { Link } from 'react-router-dom'
import BookCard from '../books/BookCard'

const recentBooks = [
  {
    id: 1,
    title: 'The Hobbit',
    author: 'J.R.R. Tolkien',
    cover: 'https://placehold.co/240x360?text=The+Hobbit',
  },
  {
    id: 2,
    title: 'Pride and Prejudice',
    author: 'Jane Austen',
    cover: 'https://placehold.co/240x360?text=Pride',
  },
  {
    id: 3,
    title: 'Little Women',
    author: 'Louisa May Alcott',
    cover: 'https://placehold.co/240x360?text=Little+Women',
  },
  {
    id: 4,
    title: 'Jane Eyre',
    author: 'Charlotte Brontë',
    cover: 'https://placehold.co/240x360?text=Jane+Eyre',
  },
  {
    id: 5,
    title: 'The Secret Garden',
    author: 'Frances Hodgson Burnett',
    cover: 'https://placehold.co/240x360?text=Secret+Garden',
  },
]

function RecentlyAdded() {
  return (
    <section className="rounded-3xl border border-darkwood/10 bg-cream/80 p-5 md:p-6">
      {/* Header */}
      <div className="flex items-start justify-between gap-4">
        <div>
          <h2 className="font-heading text-2xl font-bold text-darkwood">
            Ajoutés récemment
          </h2>

          <p className="mt-1 font-ui text-sm text-darkwood/60">
            Les derniers livres ajoutés à ta bibliothèque.
          </p>
        </div>

        <Link
          to="/library"
          className="shrink-0 font-ui text-sm font-bold text-darkwood transition-opacity hover:opacity-60"
        >
          Voir tout →
        </Link>
      </div>

      {/* Preview des derniers livres */}
      <div className="hide-scrollbar mt-6 flex gap-6 overflow-x-auto pb-2 lg:grid lg:grid-cols-5 lg:gap-8 lg:overflow-visible">
        {recentBooks.map((book) => (
          <div
            key={book.id}
            className="w-36 shrink-0 sm:w-40 lg:mx-auto lg:w-full lg:max-w-40"
          >
            <Link
              to={`/books/${book.id}`}
              className="block"
              aria-label={`Voir la fiche de ${book.title}`}
            >
              <BookCard
                title={book.title}
                author={book.author}
                cover={book.cover}
              />
            </Link>
          </div>
        ))}
      </div>
    </section>
  )
}

export default RecentlyAdded