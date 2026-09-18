import { useState } from 'react'
import { Link } from 'react-router-dom'
import StatusBadge from '../ui/StatusBadge'

const initialBooks = [
  {
    id: 1,
    title: 'The Hobbit',
    author: 'J.R.R. Tolkien',
    cover: 'https://placehold.co/240x360?text=The+Hobbit',
    status: 'reading',
  },
  {
    id: 2,
    title: 'Pride and Prejudice',
    author: 'Jane Austen',
    cover: 'https://placehold.co/240x360?text=Pride',
    status: 'reading',
  },
  {
    id: 3,
    title: 'Little Women',
    author: 'Louisa May Alcott',
    cover: 'https://placehold.co/240x360?text=Little+Women',
    status: 'reading',
  },
]

const statusOptions = [
  { value: 'to-read', label: 'À lire' },
  { value: 'reading', label: 'En cours' },
  { value: 'finished', label: 'Terminé' },
  { value: 'abandoned', label: 'Abandonné' },
]

function CurrentlyReading() {
  const [books, setBooks] = useState(initialBooks)
  const [selectedBookId, setSelectedBookId] = useState(initialBooks[0].id)
  const [isStatusOpen, setIsStatusOpen] = useState(false)

  const readingBooks = books.filter(
    (book) => book.status === 'reading'
  )

  const currentBook =
    readingBooks.find((book) => book.id === selectedBookId) ||
    readingBooks[0]

  function handleStatusChange(newStatus) {
    if (!currentBook) return

    const updatedBooks = books.map((book) =>
      book.id === currentBook.id
        ? { ...book, status: newStatus }
        : book
    )

    setBooks(updatedBooks)
    setIsStatusOpen(false)

    const remainingBooks = updatedBooks.filter(
      (book) => book.status === 'reading'
    )

    setSelectedBookId(remainingBooks[0]?.id ?? null)
  }

  if (readingBooks.length === 0) {
    return (
      <section className="rounded-3xl border border-darkwood/10 bg-cream/80 p-5 md:p-6">
        <h2 className="font-heading text-2xl font-bold text-darkwood">
          Lecture en cours
        </h2>

        <p className="mt-1 font-ui text-sm text-darkwood/60">
          Aucun livre en cours pour le moment.
        </p>
      </section>
    )
  }

  return (
    <section className="rounded-3xl border border-darkwood/10 bg-cream/80 p-5 md:p-6">
      <div>
        <h2 className="font-heading text-2xl font-bold text-darkwood">
          Lecture en cours
        </h2>

        <p className="mt-1 font-ui text-sm text-darkwood/60">
          Les livres que tu lis en ce moment.
        </p>
      </div>

      <div className="mt-6 grid items-center gap-8 sm:grid-cols-2">
        {/* Stack de couvertures */}
        <div className="flex items-center justify-center px-4">
          {readingBooks.map((book, index) => {
            const isSelected = book.id === currentBook.id

            return (
              <button
                key={book.id}
                type="button"
                onClick={() => {
                  setSelectedBookId(book.id)
                  setIsStatusOpen(false)
                }}
                className={`
                  relative cursor-pointer transition-all duration-300 ease-out
                  ${index === 0 ? '' : '-ml-20'}
                  ${isSelected ? '-translate-y-3' : 'hover:-translate-y-1'}
                `}
                style={{
                  zIndex: isSelected
                    ? readingBooks.length + 1
                    : readingBooks.length - index,
                }}
                aria-label={`Afficher ${book.title}`}
              >
                <img
                  src={book.cover}
                  alt={`Couverture de ${book.title}`}
                  className={`
                    aspect-2/3 w-32 rounded-xl object-cover shadow-md
                    transition-all duration-300
                    md:w-36 lg:w-40
                    ${
                      isSelected
                        ? 'scale-105 shadow-lg'
                        : 'opacity-80'
                    }
                  `}
                />
              </button>
            )
          })}
        </div>

        {/* Informations du livre sélectionné */}
        <div className="flex min-w-0 flex-col justify-center sm:min-h-52">
          <div>
            <StatusBadge status={currentBook.status} />
          </div>

          <h3 className="mt-3 font-heading text-2xl font-bold leading-tight text-darkwood">
            {currentBook.title}
          </h3>

          <p className="mt-1 font-ui text-sm text-darkwood/60">
            {currentBook.author}
          </p>

          <div className="mt-5 flex flex-wrap items-start gap-2">
            <Link
              to={`/books/${currentBook.id}`}
              className="rounded-full bg-darkwood px-4 py-2 font-ui text-xs font-bold text-cream transition-transform hover:-translate-y-0.5"
            >
              Voir la fiche
            </Link>

            <div className="relative">
              <button
                type="button"
                onClick={() => setIsStatusOpen((current) => !current)}
                className="cursor-pointer rounded-full border border-darkwood/20 px-4 py-2 font-ui text-xs font-bold text-darkwood transition-transform hover:-translate-y-0.5"
              >
                Changer le statut
              </button>

              {isStatusOpen && (
                <div className="absolute left-0 top-full z-20 mt-2 min-w-40 overflow-hidden rounded-2xl border border-darkwood/10 bg-cream p-2 shadow-lg">
                  {statusOptions.map((status) => (
                    <button
                      key={status.value}
                      type="button"
                      onClick={() => handleStatusChange(status.value)}
                      className="block w-full cursor-pointer rounded-xl px-3 py-2 text-left font-ui text-xs text-darkwood transition-colors hover:bg-darkwood/10"
                    >
                      {status.label}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Navigation entre les lectures */}
          <div className="mt-6 flex flex-wrap items-center gap-4">
            <div className="flex gap-2">
              {readingBooks.map((book) => (
                <button
                  key={book.id}
                  type="button"
                  onClick={() => {
                    setSelectedBookId(book.id)
                    setIsStatusOpen(false)
                  }}
                  className={`
                    h-2.5 w-2.5 cursor-pointer rounded-full
                    transition-all duration-300
                    ${
                      book.id === currentBook.id
                        ? 'scale-125 bg-darkwood'
                        : 'bg-darkwood/20 hover:bg-darkwood/40'
                    }
                  `}
                  aria-label={`Sélectionner ${book.title}`}
                />
              ))}
            </div>

            <p className="font-ui text-xs text-darkwood/50">
              {readingBooks.length}{' '}
              {readingBooks.length === 1
                ? 'lecture en cours'
                : 'lectures en cours'}
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

export default CurrentlyReading