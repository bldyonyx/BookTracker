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
    `${BASE_URL}?q=${encodeURIComponent(query)}&key=${API_KEY}`
  )

  if (!response.ok) {
    throw new Error('Impossible de récupérer les livres.')
  }

  const data = await response.json()

  return data.items?.map(formatBook) || []
}