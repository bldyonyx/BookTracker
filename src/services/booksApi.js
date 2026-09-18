const BASE_URL = 'https://www.googleapis.com/books/v1/volumes'
const API_KEY = import.meta.env.VITE_GOOGLE_BOOKS_API_KEY

/**
 * Formate un livre reçu depuis l'API Google Books
 * pour l'utiliser plus facilement dans l'application.
 *
 * @param {Object} item - Livre retourné par Google Books.
 * @returns {Object} Livre formaté pour Book Tracker.
 */
function formatBook(item) {
  const volumeInfo = item.volumeInfo

  return {
    id: item.id,
    googleBooksId: item.id,
    title: volumeInfo.title || 'Titre inconnu',
    authors: volumeInfo.authors || ['Auteur inconnu'],

    cover:
      volumeInfo.imageLinks?.extraLarge ||
      volumeInfo.imageLinks?.large ||
      volumeInfo.imageLinks?.medium ||
      volumeInfo.imageLinks?.small ||
      volumeInfo.imageLinks?.thumbnail ||
      volumeInfo.imageLinks?.smallThumbnail ||
      null,

    description: volumeInfo.description || '',
    categories: volumeInfo.categories || [],
    publishedDate: volumeInfo.publishedDate || '',
  }
}

/**
 * Recherche des livres dans l'API Google Books.
 *
 * @param {string} query - Recherche saisie par l'utilisateur.
 * @returns {Promise<Array>} Liste des livres trouvés et formatés.
 * @throws {Error} Si la requête vers Google Books échoue.
 */
export async function searchBooks(query) {
  const response = await fetch(
    `${BASE_URL}?q=${encodeURIComponent(query)}&langRestrict=fr&maxResults=20&key=${API_KEY}`
  )

  if (!response.ok) {
    throw new Error('Impossible de récupérer les livres.')
  }

  const data = await response.json()

  return data.items?.map(formatBook) || []
}

/**
 * Récupère quelques suggestions de livres à partir
 * de la recherche saisie par l'utilisateur.
 *
 * @param {string} query - Texte actuellement saisi.
 * @returns {Promise<Array>} Liste courte de livres suggérés.
 * @throws {Error} Si la requête vers Google Books échoue.
 */
export async function getBookSuggestions(query) {
  const trimmedQuery = query.trim()

  if (trimmedQuery.length < 2) {
    return []
  }

  const response = await fetch(
    `${BASE_URL}?q=${encodeURIComponent(trimmedQuery)}&langRestrict=fr&maxResults=5&key=${API_KEY}`
  )

  if (!response.ok) {
    throw new Error('Impossible de récupérer les suggestions.')
  }

  const data = await response.json()

  return data.items?.map(formatBook) || []
}

/**
 * Récupère des livres appartenant à une catégorie Google Books.
 *
 * Cette fonction est utilisée pour construire les différentes
 * sélections de la page Découvrir.
 *
 * @param {string} subject - Catégorie de livres à rechercher.
 * @param {number} [maxResults=10] - Nombre maximum de livres à récupérer.
 * @returns {Promise<Array>} Liste de livres formatés pour Book Tracker.
 * @throws {Error} Si la requête vers Google Books échoue.
 */
export async function getBooksBySubject(subject, maxResults = 10) {
  const response = await fetch(
    `${BASE_URL}?q=subject:${encodeURIComponent(subject)}&langRestrict=fr&maxResults=${maxResults}&key=${API_KEY}`
  )

  if (!response.ok) {
    throw new Error(
      'Impossible de récupérer cette sélection de livres.'
    )
  }

  const data = await response.json()

  return data.items?.map(formatBook) || []
}

/**
 * Recherche un livre Google Books à partir de son ISBN.
 *
 * @param {string} isbn - ISBN du livre à rechercher.
 * @returns {Promise<Object|null>} Livre formaté ou null si aucun résultat.
 * @throws {Error} Si la requête Google Books échoue.
 */
export async function getBookByIsbn(isbn) {
  if (!isbn) {
    return null
  }

  const response = await fetch(
    `${BASE_URL}?q=isbn:${encodeURIComponent(isbn)}&langRestrict=fr&maxResults=1&key=${API_KEY}`
  )

  if (!response.ok) {
    throw new Error(
      'Impossible de récupérer les informations du livre.'
    )
  }

  const data = await response.json()
  const item = data.items?.[0]

  return item ? formatBook(item) : null
}