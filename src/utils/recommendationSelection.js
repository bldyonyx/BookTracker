function normalizeText(value) {
  return String(value || '')
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, ' ')
    .trim()
}

function normalizeIsbn(value) {
  return String(value || '')
    .replace(/[^0-9xX]/g, '')
    .toUpperCase()
}

function getBookIsbns(book) {
  return [...(book.isbns || []), book.isbn]
    .map(normalizeIsbn)
    .filter(Boolean)
}

/**
 * Builds stable matching keys for recommendations from the richest identifier
 * available. ISBN catches duplicate editions across APIs when present, the
 * normalized title/primary-author pair catches nearby editions, and source IDs
 * remain as a final fallback for books with sparse metadata.
 *
 * @param {Object} book - Formatted book from Google Books or Open Library.
 * @returns {Array<string>} Ordered identity keys for duplicate detection.
 */
export function getBookIdentityKeys(book) {
  const isbnKeys = getBookIsbns(book).map((isbn) => `isbn:${isbn}`)
  const title = normalizeText(book.title)
  const primaryAuthor = normalizeText(book.authors?.[0])
  const titleAuthorKey =
    title && primaryAuthor
      ? `title-author:${title}:${primaryAuthor}`
      : ''

  return [
    ...isbnKeys,
    titleAuthorKey,
    book.googleBooksId ? `google:${book.googleBooksId}` : '',
    book.openLibraryId ? `openlibrary:${book.openLibraryId}` : '',
    book.id ? `id:${book.id}` : '',
  ].filter(Boolean)
}

export function addBooksToIdentitySet(identitySet, books) {
  books.forEach((book) => {
    getBookIdentityKeys(book).forEach((key) => identitySet.add(key))
  })
}

function createExcludedIdentitySet(excludedBookIds) {
  const identitySet = new Set()

  Array.from(excludedBookIds || []).forEach((item) => {
    if (item && typeof item === 'object') {
      getBookIdentityKeys(item).forEach((key) => identitySet.add(key))
      return
    }

    const rawValue = String(item || '').trim()
    const normalizedIsbn = normalizeIsbn(rawValue)

    if (rawValue) identitySet.add(`id:${rawValue}`)
    if (normalizedIsbn) identitySet.add(`isbn:${normalizedIsbn}`)
  })

  return identitySet
}

function bookMatchesIdentitySet(book, identitySet) {
  return getBookIdentityKeys(book).some((key) => identitySet.has(key))
}

function dedupeBooks(books) {
  const seenIdentityKeys = new Set()
  const uniqueBooks = []

  books.forEach((book) => {
    const identityKeys = getBookIdentityKeys(book)
    const isDuplicate = identityKeys.some((key) =>
      seenIdentityKeys.has(key)
    )

    if (isDuplicate) return

    identityKeys.forEach((key) => seenIdentityKeys.add(key))
    uniqueBooks.push(book)
  })

  return uniqueBooks
}

function shuffleBooks(books) {
  const shuffledBooks = [...books]

  for (let index = shuffledBooks.length - 1; index > 0; index -= 1) {
    const swapIndex = Math.floor(Math.random() * (index + 1))
    ;[shuffledBooks[index], shuffledBooks[swapIndex]] = [
      shuffledBooks[swapIndex],
      shuffledBooks[index],
    ]
  }

  return shuffledBooks
}

function hasCover(book) {
  return Boolean(book.cover)
}

function selectBooksWithCoverPreference(books, limit) {
  const booksWithCovers = books.filter(hasCover)
  const booksWithoutCovers = books.filter((book) => !hasCover(book))

  if (booksWithCovers.length >= limit) {
    return shuffleBooks(booksWithCovers).slice(0, limit)
  }

  return [
    ...shuffleBooks(booksWithCovers),
    ...shuffleBooks(booksWithoutCovers).slice(
      0,
      limit - booksWithCovers.length
    ),
  ]
}

/**
 * Selects a compact recommendation shelf from a larger freshly fetched pool.
 * The function deduplicates editions, removes session-seen books, removes
 * future library exclusions, then shuffles the remaining eligible pool.
 * Seen books are recycled only when explicitly allowed and the fetched pool has
 * no unseen eligible alternatives.
 *
 * @param {Array<Object>} candidates - Larger API result window to sample from.
 * @param {Object} options - Selection options.
 * @param {number} options.limit - Maximum number of books to show.
 * @param {Set<string>} [options.alreadyShownIdentityKeys] - Session history.
 * @param {Iterable<string|Object>} [options.excludedBookIds] - Future library exclusions.
 * @param {boolean} [options.preferBooksWithCovers=false] - Whether cover-bearing books should be selected before coverless fallbacks.
 * @param {boolean} [options.recycleSeenWhenExhausted=false] - Whether a fixed candidate space may reuse seen books when no unseen candidates remain.
 * @returns {Array<Object>} Deduped, filtered, randomly sampled books.
 */
export function selectRecommendationBooks(
  candidates,
  {
    limit,
    alreadyShownIdentityKeys = new Set(),
    excludedBookIds = [],
    preferBooksWithCovers = false,
    recycleSeenWhenExhausted = false,
  }
) {
  const excludedIdentitySet =
    createExcludedIdentitySet(excludedBookIds)
  const uniqueBooks = dedupeBooks(candidates)
  const unseenBooks = uniqueBooks.filter(
    (book) =>
      !bookMatchesIdentitySet(book, alreadyShownIdentityKeys)
  )
  const eligibleUnseenBooks = unseenBooks.filter(
    (book) => !bookMatchesIdentitySet(book, excludedIdentitySet)
  )

  if (eligibleUnseenBooks.length) {
    if (preferBooksWithCovers) {
      return selectBooksWithCoverPreference(
        eligibleUnseenBooks,
        limit
      )
    }

    return shuffleBooks(eligibleUnseenBooks).slice(0, limit)
  }

  if (!recycleSeenWhenExhausted) {
    return []
  }

  const recyclableBooks = uniqueBooks.filter(
    (book) => !bookMatchesIdentitySet(book, excludedIdentitySet)
  )

  if (preferBooksWithCovers) {
    return selectBooksWithCoverPreference(recyclableBooks, limit)
  }

  return shuffleBooks(recyclableBooks).slice(0, limit)
}
