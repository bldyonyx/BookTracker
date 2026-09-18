---
title: Sources de livres
description: Utilisation actuelle de Google Books et Open Library dans Dear Pages.
---

Dear Pages utilise actuellement deux sources externes pour afficher des livres :

- **Google Books API**, pour la recherche, les suggestions et les sélections par sujet ;
- **Open Library**, pour les livres tendance.

Les appels à ces API sont isolés dans des services afin d'éviter de faire les requêtes directement dans les composants React.

```text
src/services/
├── booksApi.js
└── trendingBooksApi.js
```

## Google Books API

Google Books est la source principale pour rechercher des livres.

Le service concerné est :

```text
src/services/booksApi.js
```

L'URL de base utilisée est :

```text
https://www.googleapis.com/books/v1/volumes
```

La clé API est récupérée depuis une variable d'environnement Vite :

```js
const API_KEY = import.meta.env.VITE_GOOGLE_BOOKS_API_KEY
```

La variable attendue est :

```text
VITE_GOOGLE_BOOKS_API_KEY=...
```

:::note
Cette clé est utilisée côté frontend. Elle peut donc être visible par le navigateur et doit être limitée depuis Google Cloud plutôt que considérée comme un secret serveur.
:::

## Recherche

La fonction `searchBooks` lance la recherche principale de la page Découvrir.

Elle utilise :

- la recherche saisie par l'utilisateur ;
- `langRestrict=fr` ;
- `maxResults=20`.

La recherche est déclenchée lorsque l'URL contient un paramètre :

```text
/discover?q=...
```

Le hook `useDiscoverSearch` lit ce paramètre, appelle `searchBooks`, puis transmet les résultats à `SearchResults`.

## Suggestions

La fonction `getBookSuggestions` sert à l'autocomplétion du champ de recherche.

Elle est appelée lorsque la saisie contient au moins deux caractères et qu'elle est différente de la recherche déjà soumise.

Le hook `useDiscoverSearch` applique un debounce de 300 ms avant d'appeler le service.

Les suggestions utilisent :

- `langRestrict=fr` ;
- `maxResults=5`.

Chaque suggestion peut ensuite mener vers :

```text
/books/:id
```

## Sélections par sujet

La fonction `getBooksBySubject` récupère des livres par catégorie Google Books.

Elle construit une requête avec :

```text
q=subject:<subject>
```

Elle accepte aussi :

- `maxResults`, pour choisir la taille du lot de candidats ;
- `startIndex`, pour récupérer une autre fenêtre de résultats.

Cette fonction est utilisée pour :

- **Peut-être pour toi** sur la vue Découvrir ;
- **Les incontournables** avec le sujet `classics` ;
- les sections de la vue `/discover?view=for-you`.

## Modèle normalisé Google Books

Les données retournées par Google Books sont transformées par `formatBook`.

Le modèle actuel contient :

```js
{
  id: item.id,
  googleBooksId: item.id,
  title,
  authors,
  isbn,
  isbns,
  cover,
  description,
  categories,
  publishedDate,
}
```

La couverture est choisie en testant plusieurs tailles, de `extraLarge` à `smallThumbnail`.

Lorsque certaines informations manquent, le service fournit des valeurs par défaut comme :

- `Titre inconnu` ;
- `Auteur inconnu` ;
- chaîne vide pour la description ;
- tableau vide pour les catégories.

## Open Library

Open Library est utilisé pour l'étagère **Tendances du moment**.

Le service concerné est :

```text
src/services/trendingBooksApi.js
```

Il utilise l'endpoint :

```text
https://openlibrary.org/search.json
```

La requête actuelle demande les livres tendance avec :

```text
q=trending_z_score:{0 TO *]
sort=trending
fields=key,title,author_name,isbn,cover_i
```

Le service récupère un lot plus large que le nombre affiché, filtre les livres sans couverture, puis normalise les résultats.

## Modèle normalisé Open Library

Le modèle actuel des tendances contient :

```js
{
  id,
  openLibraryId,
  title,
  authors,
  isbn,
  isbns,
  cover,
}
```

La couverture est construite avec :

```text
https://covers.openlibrary.org/b/id/<cover_i>-L.jpg?default=false
```

## Identifiants différents

Google Books et Open Library n'utilisent pas les mêmes identifiants.

Un livre Google Books possède notamment :

- `id`
- `googleBooksId`

Un livre Open Library possède notamment :

- `id`
- `openLibraryId`

Pour éviter les doublons entre sources ou éditions, les recommandations ne se basent pas seulement sur `id`. Elles utilisent aussi l'ISBN et le couple titre + auteur principal lorsque ces informations existent.

## Ce qui n'est pas fait actuellement

Dear Pages ne fait plus d'enrichissement Google Books par ISBN pour chaque livre tendance.

Les tendances utilisent directement les informations retournées par Open Library : titre, auteur, ISBN et couverture.

Les données personnelles comme les statuts de lecture, la bibliothèque, les notes et les avis ne proviennent ni de Google Books ni d'Open Library. Elles seront ajoutées plus tard avec Firebase.
