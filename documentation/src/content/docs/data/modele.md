---
title: Modèle de données
description: Organisation des données utilisées par Dear Pages.
---

Dear Pages utilise actuellement deux grandes catégories de données :

1. les **informations publiques des livres**, récupérées depuis Google Books ou Open Library ;
2. les **données temporaires d'interface**, utilisées pour afficher des exemples, des recommandations et des états de page.

Les données personnelles persistantes seront ajoutées plus tard avec Firebase.

## Livre Google Books

Les données reçues depuis Google Books sont transformées par `formatBook` dans `booksApi.js`.

Un livre Google Books possède actuellement la structure suivante :

```js
{
  id: 'abc123',
  googleBooksId: 'abc123',
  title: 'Titre du livre',
  authors: ['Auteur'],
  isbn: '978...',
  isbns: ['978...', '...'],
  cover: 'https://...',
  description: 'Description du livre',
  categories: ['Fantasy'],
  publishedDate: '2026',
}
```

### Propriétés

| Propriété | Type | Description |
| --- | --- | --- |
| `id` | `string` | Identifiant du volume Google Books utilisé par l'interface |
| `googleBooksId` | `string` | Identifiant source Google Books |
| `title` | `string` | Titre du livre |
| `authors` | `string[]` | Liste des auteurs |
| `isbn` | `string \| null` | Premier ISBN disponible |
| `isbns` | `string[]` | Liste des ISBN disponibles |
| `cover` | `string \| null` | URL de la meilleure couverture disponible |
| `description` | `string` | Description du livre |
| `categories` | `string[]` | Catégories associées au livre |
| `publishedDate` | `string` | Date de publication fournie par Google Books |

## Livre Open Library

Les tendances viennent d'Open Library et sont normalisées dans `trendingBooksApi.js`.

Le modèle actuel est plus court :

```js
{
  id: 'OL...',
  openLibraryId: '/works/OL...',
  title: 'Titre du livre',
  authors: ['Auteur'],
  isbn: '978...',
  isbns: ['978...', '...'],
  cover: 'https://covers.openlibrary.org/...',
}
```

Open Library ne fournit pas exactement les mêmes champs que Google Books. Les tendances utilisent donc directement les informations disponibles : identifiant, titre, auteurs, ISBN et couverture.

## Valeurs par défaut

Toutes les éditions disponibles dans les API ne possèdent pas les mêmes informations.

Les services fournissent donc certaines valeurs par défaut.

Par exemple :

```js
title: volumeInfo.title || 'Titre inconnu'

authors: volumeInfo.authors || ['Auteur inconnu']

description: volumeInfo.description || ''

categories: volumeInfo.categories || []

publishedDate: volumeInfo.publishedDate || ''
```

Pour la couverture Google Books, plusieurs tailles sont testées avant d'utiliser `null` si aucune image n'est disponible.

Cela permet à l'interface de recevoir une structure cohérente même lorsque certaines informations sont absentes de l'API.

## Identité d'un livre

Pour les recommandations, un simple `id` ne suffit pas toujours.

Google Books et Open Library peuvent représenter le même livre avec des identifiants différents.

Dear Pages construit donc plusieurs clés d'identité dans `recommendationSelection.js` :

- ISBN ;
- titre normalisé + auteur principal ;
- identifiant Google Books ;
- identifiant Open Library ;
- identifiant local.

Ces clés servent à éviter les doublons et les répétitions dans les étagères de recommandations.

## État temporaire des recommandations

Les recommandations utilisent un état de session sauvegardé dans `sessionStorage`.

Chaque étagère peut conserver :

```js
{
  books: [],
  startIndex: 0,
  seenIdentityKeys: [],
}
```

Cet état n'est pas une donnée utilisateur durable. Il sert seulement à garder les mêmes recommandations pendant la session du navigateur et à éviter les répétitions immédiates.

## Données personnelles prévues

Les informations provenant de Google Books ou Open Library ne permettent pas de savoir ce que le livre représente pour un utilisateur.

Dear Pages devra donc conserver séparément des informations personnelles comme :

```text
Bibliothèque
├── livre
├── statut de lecture
├── note personnelle
├── avis personnel
└── date d'ajout
```

Ces données seront liées au compte de l'utilisateur avec Firebase.

:::note
Le modèle Firebase définitif n'est pas encore implémenté. Sa structure pourra évoluer pendant le développement des fonctionnalités de bibliothèque, de notes et de collections.
:::

## Statut de lecture

Un livre ajouté à la bibliothèque pourra être associé à un statut représentant son état dans le parcours de lecture.

Par exemple, l'application pourra distinguer :

```text
À lire
En cours
Terminé
Abandonné
```

Le statut appartiendra à l'utilisateur et non au livre lui-même.

Deux utilisateurs pourraient donc avoir le même livre avec des statuts différents.

## Notes, avis et collections

Une note ou un avis représente également une donnée personnelle.

Ces informations ne doivent donc pas être ajoutées directement à l'objet public provenant d'une API externe.

Les collections représenteront des regroupements personnalisés créés par l'utilisateur.

La structure exacte sera définie lors de l'implémentation de Firebase, de la bibliothèque et des collections persistantes.

## Principe général

La séparation peut être résumée ainsi :

**Google Books et Open Library décrivent les livres.**

**Firebase décrira la relation entre l'utilisateur et les livres.**

Cette distinction permet de garder un modèle de données plus clair et d'éviter de mélanger les données publiques provenant d'API externes avec les données privées de l'application.
