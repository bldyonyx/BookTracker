const inFlightRequests = new Map()

/**
 * Shares a single network request between simultaneous callers of the same URL.
 * This is especially useful in React StrictMode development, where effects are
 * intentionally remounted and can otherwise issue duplicate identical fetches.
 *
 * @param {string} url - Fully built request URL.
 * @returns {Promise<Object>} Parsed JSON response.
 * @throws {Error} If the response is not successful.
 */
export async function fetchJsonOnce(url) {
  if (inFlightRequests.has(url)) {
    return inFlightRequests.get(url)
  }

  const request = fetch(url)
    .then((response) => {
      if (!response.ok) {
        throw new Error('Impossible de recuperer les donnees.')
      }

      return response.json()
    })
    .finally(() => {
      inFlightRequests.delete(url)
    })

  inFlightRequests.set(url, request)

  return request
}
