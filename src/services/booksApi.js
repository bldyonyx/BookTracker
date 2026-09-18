import { fetchJsonOnce } from '../utils/inFlightRequest'

const BASE_URL = 'https://www.googleapis.com/books/v1/volumes'
const API_KEY = import.meta.env.VITE_GOOGLE_BOOKS_API_KEY

/**
 * Formate un livre recu depuis l'API Google Books
 * pour l'utiliser plus facilement dans l'application.
 *
 * @param {Object} item - Livre retourne par Google Books.
 * @returns {Object} Livre formate pour Dear Pages.
 */
function formatBook(item) {
  const volumeInfo = item.volumeInfo
  const isbns =
    volumeInfo.industryIdentifiers
      ?.map((identifier) => identifier.identifier)
      .filter(Boolean) || []

  return {
    id: item.id,
    googleBooksId: item.id,
    title: volumeInfo.title || 'Titre inconnu',
    authors: volumeInfo.authors || ['Auteur inconnu'],
    isbn: isbns[0] || null,
    isbns,

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

async function getGoogleBooksData(url, message) {
  try {
    return await fetchJsonOnce(url)
  } catch {
    throw new Error(message)
  }
}

/**
 * Recherche des livres dans l'API Google Books.
 *
 * @param {string} query - Recherche saisie par l'utilisateur.
 * @returns {Promise<Array>} Liste des livres trouves et formates.
 * @throws {Error} Si la requete vers Google Books echoue.
 */
export async function searchBooks(query) {
  const data = await getGoogleBooksData(
    `${BASE_URL}?q=${encodeURIComponent(query)}&langRestrict=fr&maxResults=20&key=${API_KEY}`,
    'Impossible de recuperer les livres.'
  )

  return data.items?.map(formatBook) || []
}

/**
 * Recupere quelques suggestions de livres a partir
 * de la recherche saisie par l'utilisateur.
 *
 * @param {string} query - Texte actuellement saisi.
 * @returns {Promise<Array>} Liste courte de livres suggeres.
 * @throws {Error} Si la requete vers Google Books echoue.
 */
export async function getBookSuggestions(query) {
  const trimmedQuery = query.trim()

  if (trimmedQuery.length < 2) {
    return []
  }

  const data = await getGoogleBooksData(
    `${BASE_URL}?q=${encodeURIComponent(trimmedQuery)}&langRestrict=fr&maxResults=5&key=${API_KEY}`,
    'Impossible de recuperer les suggestions.'
  )

  return data.items?.map(formatBook) || []
}

/**
 * Recupere des livres appartenant a une categorie Google Books.
 *
 * Cette fonction est utilisee pour construire les differentes
 * selections de la page Decouvrir.
 *
 * @param {string} subject - Categorie de livres a rechercher.
 * @param {number} [maxResults=10] - Nombre maximum de livres a recuperer.
 * @param {number} [startIndex=0] - Position du premier resultat Google Books.
 * @returns {Promise<Array>} Liste de livres formates pour Dear Pages.
 * @throws {Error} Si la requete vers Google Books echoue.
 */
export async function getBooksBySubject(
  subject,
  maxResults = 10,
  startIndex = 0
) {
  const data = await getGoogleBooksData(
    `${BASE_URL}?q=subject:${encodeURIComponent(subject)}&langRestrict=fr&maxResults=${maxResults}&startIndex=${startIndex}&key=${API_KEY}`,
    'Impossible de recuperer cette selection de livres.'
  )

  return data.items?.map(formatBook) || []
}

/**
 * Recherche un livre Google Books a partir de son ISBN.
 *
 * @param {string} isbn - ISBN du livre a rechercher.
 * @returns {Promise<Object|null>} Livre formate ou null si aucun resultat.
 * @throws {Error} Si la requete Google Books echoue.
 */
export async function getBookByIsbn(isbn) {
  if (!isbn) {
    return null
  }

  const data = await getGoogleBooksData(
    `${BASE_URL}?q=isbn:${encodeURIComponent(isbn)}&langRestrict=fr&maxResults=1&key=${API_KEY}`,
    'Impossible de recuperer les informations du livre.'
  )
  const item = data.items?.[0]

  return item ? formatBook(item) : null
}
