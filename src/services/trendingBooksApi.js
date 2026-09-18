const OPEN_LIBRARY_SEARCH_URL = 'https://openlibrary.org/search.json'
const OPEN_LIBRARY_COVERS_URL = 'https://covers.openlibrary.org/b/id'

/**
 * Récupère les livres actuellement tendance sur Open Library.
 *
 * Open Library fournit ici directement les informations nécessaires
 * à l'affichage du rayon "Tendances du moment", y compris les couvertures.
 *
 * @param {number} [limit=10] - Nombre maximum de livres à retourner.
 * @returns {Promise<Array>} Livres tendance formatés pour Book Tracker.
 * @throws {Error} Si la requête Open Library échoue.
 */
export async function getTrendingBooksDetails(limit = 10) {
  const params = new URLSearchParams({
    q: 'trending_z_score:{0 TO *]',
    sort: 'trending',
    limit: String(limit * 3),
    fields: 'key,title,author_name,isbn,cover_i',
  })

  const response = await fetch(
    `${OPEN_LIBRARY_SEARCH_URL}?${params.toString()}`
  )

  if (!response.ok) {
    throw new Error('Impossible de récupérer les tendances.')
  }

  const data = await response.json()

  return (data.docs || [])
    .filter((book) => book.cover_i)
    .slice(0, limit)
    .map((book) => ({
      id: book.key.replace('/works/', ''),
      openLibraryId: book.key,
      title: book.title || 'Titre inconnu',
      authors: book.author_name || ['Auteur inconnu'],
      isbn: book.isbn?.[0] || null,
      cover: `${OPEN_LIBRARY_COVERS_URL}/${book.cover_i}-L.jpg?default=false`,
    }))
}