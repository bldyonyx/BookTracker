---
title: Composants
description: Organisation et rôle des principaux composants React de Dear Pages.
---

Dear Pages utilise des **composants React** pour diviser l'interface en éléments plus petits, réutilisables et plus faciles à maintenir.

Les composants sont regroupés selon leur rôle dans l'application : les pages coordonnent les vues, les composants affichent l'interface, les hooks centralisent l'état, les services appellent les API et les utilitaires isolent la logique réutilisable.

## Composants d'interface

Le dossier `components/ui` contient les éléments génériques pouvant être utilisés à plusieurs endroits dans l'application.

On y retrouve notamment :

- `Button`
- `Input`
- `Select`
- `Modal`
- `StatusBadge`
- `Card`

L'objectif est d'éviter de recréer les mêmes éléments d'interface dans chaque page et de conserver une apparence cohérente.

## Composants liés aux livres

Les composants spécifiques à l'affichage des livres sont placés dans :

```text
components/books/
```

### `BookCard`

`BookCard` affiche les informations principales d'un livre : couverture, titre, auteur et éventuellement un statut.

Il peut recevoir un `bookId`. Lorsque cet identifiant existe, la couverture et le titre deviennent des liens vers :

```text
/books/:id
```

Cela permet aux cartes utilisées dans Découvrir, les résultats de recherche et les recommandations de préparer la navigation vers une fiche de livre.

Sa largeur n'est pas imposée directement par le composant : elle dépend du conteneur dans lequel il est utilisé.

## Page Découvrir

La page `Discover.jsx` coordonne trois modes d'affichage :

- la vue de découverte par défaut ;
- la recherche, lorsque l'URL contient `?q=...` ;
- la vue étendue des recommandations, lorsque l'URL contient `?view=for-you`.

`Discover.jsx` ne contient pas directement toute la logique. Il assemble les hooks et les composants spécialisés.

```text
pages/
└── Discover.jsx

components/discover/
├── DiscoverHome.jsx
├── DiscoverSearch.jsx
├── DiscoverShelf.jsx
├── SearchResults.jsx
├── SearchSuggestions.jsx
├── ForYouSection.jsx
└── ForYouRecommendations.jsx
```

### `DiscoverHome`

`DiscoverHome` affiche la vue de découverte par défaut.

Il reçoit déjà les livres, les erreurs et les états de chargement depuis le hook `useDiscoverHomeBooks`.

Il affiche ensuite :

- `ForYouSection` pour une sélection personnalisée courte ;
- une étagère **Tendances du moment** ;
- une étagère **Les incontournables**.

### `DiscoverSearch`

`DiscoverSearch` affiche le champ de recherche.

Il reçoit l'état de recherche depuis `useDiscoverSearch`, ouvre le panneau de suggestions pendant la saisie et le ferme lorsque l'utilisateur clique en dehors de la zone de recherche.

### `SearchSuggestions`

`SearchSuggestions` affiche les suggestions d'autocomplétion.

Chaque suggestion est un lien vers `/books/:id`. Si les suggestions sont en cours de chargement, le composant affiche un état simple de recherche.

### `SearchResults`

`SearchResults` affiche les résultats de recherche Google Books.

Il gère trois situations visibles :

- recherche en cours ;
- erreur ;
- résultats ou message **Aucun livre trouvé**.

Ces états sont fonctionnels, mais leur polish visuel reste simple et pourra être amélioré plus tard.

### `DiscoverShelf`

`DiscoverShelf` affiche une rangée responsive de cartes de livres.

Il peut recevoir un bouton de rafraîchissement. Les étagères **Tendances du moment** et **Les incontournables** peuvent donc être rafraîchies indépendamment.

### `ForYouSection`

`ForYouSection` affiche la sélection courte **Peut-être pour toi** sur la page Découvrir.

Il montre les préférences temporaires actuellement utilisées et propose un lien vers `/discover?view=for-you` pour afficher davantage de recommandations.

### `ForYouRecommendations`

`ForYouRecommendations` affiche la vue étendue des recommandations personnalisées.

Elle présente une section par genre temporaire et permet de rafraîchir chaque genre indépendamment.

## Hooks de Découvrir

La logique de Découvrir est séparée dans des hooks afin d'éviter de mélanger les appels API, l'état et le JSX.

### `useDiscoverSearch`

`useDiscoverSearch` centralise la recherche.

Il synchronise l'input avec le paramètre d'URL `?q=`, lance la recherche Google Books lorsque ce paramètre existe et récupère les suggestions avec un debounce de 300 ms.

Il expose aussi les handlers pour soumettre, effacer la recherche et revenir à la vue Découvrir.

### `useDiscoverHomeBooks`

`useDiscoverHomeBooks` charge les livres de la vue Découvrir par défaut.

Il récupère :

- une sélection **Peut-être pour toi** depuis Google Books avec le sujet `mystery` ;
- les tendances depuis Open Library ;
- les incontournables depuis Google Books avec le sujet `classics`.

Il utilise `Promise.allSettled` pour qu'une étagère indisponible ne bloque pas les autres.

Il gère aussi le rafraîchissement indépendant des tendances et des incontournables.

### `useForYouRecommendations`

`useForYouRecommendations` charge la vue étendue des recommandations.

Il utilise les préférences temporaires définies dans `constants/discoverPreferences.js`, récupère les livres par sujet Google Books et conserve un état séparé par genre.

Chaque genre possède ses propres livres, son erreur, son état de chargement et son `startIndex`.

## Services et utilitaires

Les appels externes sont isolés dans les services :

- `booksApi.js` pour Google Books ;
- `trendingBooksApi.js` pour Open Library.

Les utilitaires gardent la logique transversale hors des composants :

- `inFlightRequest.js` partage une requête identique déjà en cours ;
- `recommendationSelection.js` déduplique, filtre et mélange les recommandations ;
- `recommendationSessionStorage.js` sauvegarde temporairement les étagères dans `sessionStorage`.

Cette séparation rend l'architecture plus facile à expliquer : la page décide quoi afficher, les composants affichent, les hooks orchestrent les données, les services appellent les API et les utilitaires appliquent les règles de sélection.

## Composants du tableau de bord

Le tableau de bord est séparé en plusieurs composants :

```text
components/dashboard/
├── DashboardHeader.jsx
├── CurrentlyReading.jsx
├── ReadingGoal.jsx
├── RecentlyAdded.jsx
├── ReadingStats.jsx
└── ReadingCompanion.jsx
```

Certaines données affichées dans ces composants sont encore temporaires et seront reliées aux données utilisateur dans une phase suivante.

## Composants de layout

Les composants responsables de la structure générale sont regroupés dans :

```text
components/layout/
```

### `PageLayout`

`PageLayout` définit la structure commune des pages principales.

Il contient notamment :

- la navigation ;
- les arrière-plans et textures ;
- la zone principale de contenu ;
- le composant `Outlet` utilisé par React Router.

### `Sidebar`

`Sidebar` représente la navigation principale à partir du breakpoint `md`.

Elle est compacte en tablette puis plus large à partir de `lg`.

### `MobileNav`

`MobileNav` fournit une navigation inférieure adaptée aux petits écrans.

Le système permet donc de conserver les mêmes routes tout en adaptant leur présentation selon la taille de l'écran.

:::note
Tous les composants n'ont pas besoin d'être séparés davantage. Un composant est extrait lorsqu'il représente une partie identifiable de l'interface, lorsqu'il peut être réutilisé ou lorsqu'il évite de mélanger trop de responsabilités dans une page.
:::
