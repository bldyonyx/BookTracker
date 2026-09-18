---
title: Routing
description: Organisation de la navigation et des routes de Dear Pages avec React Router.
---


Dear Pages utilise **React Router** pour gérer la navigation entre les différentes pages de l'application sans recharger complètement le navigateur.

Les routes principales sont définies dans `App.jsx`.

## Structure des routes

```text
/
├── discover
├── library
├── books/:id
├── collections
├── collections/:id
└── settings

/login
/signup
/onboarding
```

## Pages principales

Les pages principales utilisent le composant `PageLayout`.

```jsx
<Route element={<PageLayout />}>
  <Route path="/" element={<Dashboard />} />
  <Route path="/discover" element={<Discover />} />
  <Route path="/library" element={<MyLibrary />} />
  <Route path="/books/:id" element={<BookPage />} />
  <Route path="/collections" element={<Collections />} />
  <Route path="/collections/:id" element={<CollectionPage />} />
  <Route path="/settings" element={<Settings />} />
</Route>
```

`PageLayout` contient les éléments communs à ces pages, notamment la navigation et la zone dans laquelle le contenu de la route active est affiché.

React Router utilise pour cela le composant `Outlet`.

## Routes indépendantes

Certaines pages ne doivent pas utiliser la navigation principale de l'application.

Elles sont donc placées en dehors de `PageLayout` :

```jsx
<Route path="/login" element={<Login />} />
<Route path="/signup" element={<SignUp />} />
<Route path="/onboarding" element={<Onboarding />} />
```

Cela permet notamment aux pages d'authentification et d'onboarding d'avoir leur propre mise en page.

## Routes dynamiques

Dear Pages utilise également des paramètres dans certaines URL.

### Livre

```text
/books/:id
```

Le paramètre `:id` permet d'identifier le livre dont la fiche doit être affichée.

Par exemple :

```text
/books/abc123
```

### Collection

```text
/collections/:id
```

Le même principe permet d'afficher une collection particulière selon son identifiant.

## Paramètres de recherche

La page Découvrir utilise aussi des paramètres d'URL pour choisir son mode d'affichage.

### Recherche

```text
/discover?q=roman
```

Lorsque `q` est présent, `Discover.jsx` affiche le mode recherche.

Le hook `useDiscoverSearch` synchronise l'input avec ce paramètre, lance la recherche Google Books et transmet les résultats à `SearchResults`.

### Recommandations étendues

```text
/discover?view=for-you
```

Lorsque `view=for-you` est présent, et qu'il n'y a pas de recherche active, la page affiche `ForYouRecommendations`.

Cette vue montre les recommandations par genre temporaire.

Si `q` existe, la recherche reste prioritaire sur `view=for-you`.

## Navigation responsive

La navigation s'adapte également à la taille de l'écran.

Sur les écrans plus larges, l'application utilise une **sidebar**.

Sur mobile, la navigation principale est déplacée vers une **barre de navigation inférieure** grâce au composant `MobileNav`.

Les routes restent cependant identiques : seule leur présentation change selon la taille de l'écran.
