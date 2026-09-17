const BASE_URL = 'https://www.googleapis.com/books/v1/volumes'
const API_KEY = import.meta.env.VITE_GOOGLE_BOOKS_API_KEY

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