---
title: Variables d'environnement
description: Configuration des variables d'environnement utilisées par Dear Pages.
---


Dear Pages utilise des **variables d'environnement** pour conserver certaines valeurs de configuration en dehors du code source.

Elles sont définies dans un fichier `.env` placé à la racine du projet.

## Fichier `.env`

La structure est actuellement la suivante :

```text
BookTracker/
├── .env
├── src/
├── package.json
└── vite.config.js
```

Le fichier contient notamment la clé utilisée pour accéder à Google Books API :

```text
VITE_GOOGLE_BOOKS_API_KEY=VOTRE_CLE_API
```

La vraie valeur de la clé n'est pas écrite dans la documentation ni directement dans le code source.

## Variables avec Vite

Vite expose au code frontend les variables dont le nom commence par :

```text
VITE_
```

La clé Google Books peut donc être récupérée dans JavaScript avec :

```js
const API_KEY = import.meta.env.VITE_GOOGLE_BOOKS_API_KEY
```

Cette valeur est ensuite utilisée par le service `booksApi.js` lors des requêtes vers Google Books.

## Pourquoi utiliser `.env` ?

Utiliser une variable d'environnement évite d'écrire directement une valeur de configuration dans le code.

Au lieu d'avoir :

```js
const API_KEY = 'ma-cle-api'
```

le projet utilise :

```js
const API_KEY = import.meta.env.VITE_GOOGLE_BOOKS_API_KEY
```

La configuration peut ainsi être modifiée sans changer le code du service.

## Git

Le fichier `.env` ne doit pas être ajouté au dépôt Git.

Le `.gitignore` du projet contient :

```text
.env
.env.local
.env.*.local
```

Cela évite de publier accidentellement les valeurs utilisées dans l'environnement local.

## Clé API côté frontend

Une variable `VITE_` utilisée dans l'application React est intégrée au code envoyé au navigateur lors du build.

La clé Google Books ne doit donc pas être considérée comme un secret inaccessible à l'utilisateur.

Pour limiter son utilisation, la clé peut être restreinte depuis Google Cloud aux services et origines nécessaires au projet.

:::note
Le fichier `.env` évite notamment de versionner directement la valeur dans Git, mais il ne transforme pas une clé utilisée côté frontend en secret serveur.
:::

## Après une modification

Après l'ajout ou la modification d'une variable dans `.env`, il peut être nécessaire de redémarrer le serveur Vite :

```bash
npm run dev
```

Cela permet à Vite de recharger les variables de l'environnement.
