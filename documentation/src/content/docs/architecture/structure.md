---
title: Structure du projet
description: Organisation des fichiers et dossiers principaux de Dear Pages.
---

Dear Pages est organisé en plusieurs dossiers afin de séparer l'interface, les pages, les services, les hooks, les constantes et les ressources de l'application.

Cette organisation permet de garder le projet lisible et de faciliter son évolution à mesure que de nouvelles fonctionnalités sont ajoutées.

## Structure principale

Le dossier racine s'appelle encore `Booktracker` pour l'instant, car le dossier Windows et le dépôt n'ont pas encore été renommés.

```text
Booktracker/
├── documentation/
├── docs/
├── src/
│   ├── assets/
│   ├── components/
│   ├── constants/
│   ├── hooks/
│   ├── pages/
│   ├── services/
│   ├── utils/
│   ├── App.jsx
│   ├── index.css
│   └── main.jsx
├── .env
├── package.json
└── vite.config.js
```

## `src/assets`

Ce dossier contient les ressources visuelles utilisées par l'application :

- polices locales ;
- images ;
- textures.

## `src/components`

Ce dossier regroupe les composants React.

Il contient notamment :

```text
components/
├── books/
├── dashboard/
├── discover/
├── layout/
└── ui/
```

Cette séparation permet de distinguer les composants réutilisables, les composants de page et les composants de structure.

## `src/constants`

Ce dossier contient les valeurs partagées qui ne sont pas de la logique métier complète.

Aujourd'hui, il contient notamment les préférences temporaires utilisées pour les recommandations de Découvrir.

## `src/hooks`

Ce dossier regroupe les hooks personnalisés.

Les hooks de Découvrir centralisent l'état et les appels de données :

- `useDiscoverSearch.js`
- `useDiscoverHomeBooks.js`
- `useForYouRecommendations.js`

## `src/pages`

Ce dossier contient les composants utilisés directement dans les routes React Router.

On y retrouve par exemple :

- `Dashboard.jsx`
- `Discover.jsx`
- `MyLibrary.jsx`
- `BookPage.jsx`
- `Collections.jsx`
- `Settings.jsx`

Certaines pages existent déjà comme structure de route, mais leurs données réelles restent prévues pour les prochaines étapes.

## `src/services`

Ce dossier isole les appels aux sources externes.

```text
services/
├── booksApi.js
└── trendingBooksApi.js
```

`booksApi.js` communique avec Google Books.

`trendingBooksApi.js` communique avec Open Library.

## `src/utils`

Ce dossier contient la logique réutilisable qui n'est pas liée à l'affichage.

On y retrouve notamment :

- `inFlightRequest.js` pour partager une requête identique déjà en cours ;
- `recommendationSelection.js` pour sélectionner et dédupliquer les recommandations ;
- `recommendationSessionStorage.js` pour conserver les recommandations pendant la session.

## Documentation

Le projet possède deux documentations différentes :

```text
docs/              → documentation JSDoc générée
documentation/     → documentation Astro + Starlight
```

Le dossier racine `docs/` est généré par `npm run docs` et reste ignoré par Git.

Le dossier `documentation/src/content/docs/` contient les pages Starlight écrites à la main et doit être versionné.
