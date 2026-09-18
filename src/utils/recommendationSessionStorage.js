const STORAGE_PREFIX = 'booktracker:recommendations'

export const RECOMMENDATION_STORAGE_KEYS = {
  trending: `${STORAGE_PREFIX}:discover:trending`,
  mustReads: `${STORAGE_PREFIX}:discover:must-reads`,
  forYouGenre: (subject) => `${STORAGE_PREFIX}:for-you:${subject}`,
}

function getSessionStorage() {
  if (typeof window === 'undefined') return null

  try {
    return window.sessionStorage
  } catch {
    return null
  }
}

function isValidRecommendationState(value) {
  return (
    value &&
    typeof value === 'object' &&
    Array.isArray(value.books) &&
    Array.isArray(value.seenIdentityKeys) &&
    (typeof value.startIndex === 'number' ||
      value.startIndex === undefined)
  )
}

/**
 * Reads a recommendation shelf snapshot from sessionStorage. Invalid or
 * corrupted data is ignored so hooks can safely fall back to their normal
 * initial API load.
 *
 * @param {string} key - sessionStorage key for one recommendation shelf.
 * @returns {Object|null} Saved books, startIndex, and seen identity keys.
 */
export function readRecommendationState(key) {
  const storage = getSessionStorage()

  if (!storage) return null

  try {
    const parsedValue = JSON.parse(storage.getItem(key))

    if (!isValidRecommendationState(parsedValue)) return null

    return {
      books: parsedValue.books,
      startIndex: parsedValue.startIndex || 0,
      seenIdentityKeys: parsedValue.seenIdentityKeys,
    }
  } catch {
    return null
  }
}

/**
 * Persists one recommendation shelf snapshot for the current browser session.
 * Writes are best-effort because storage may be unavailable or full.
 *
 * @param {string} key - sessionStorage key for one recommendation shelf.
 * @param {Object} state - Snapshot to save.
 * @param {Array<Object>} state.books - Currently displayed books.
 * @param {number} [state.startIndex=0] - Current pagination cursor.
 * @param {Iterable<string>} state.seenIdentityKeys - Session seen identities.
 */
export function writeRecommendationState(
  key,
  { books, startIndex = 0, seenIdentityKeys }
) {
  const storage = getSessionStorage()

  if (!storage) return

  try {
    storage.setItem(
      key,
      JSON.stringify({
        books,
        startIndex,
        seenIdentityKeys: Array.from(seenIdentityKeys || []),
      })
    )
  } catch {
    // Storage is optional; recommendation refresh should still work.
  }
}
