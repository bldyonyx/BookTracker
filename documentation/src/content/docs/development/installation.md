---
title: Installation
description: Installation et lancement du projet Dear Pages en environnement de développement.
---


Dear Pages est une application React créée avec **Vite**.

Cette page présente les étapes nécessaires pour récupérer le projet et le lancer dans un environnement de développement.

## Prérequis

Avant d'installer le projet, il est nécessaire d'avoir :

- **Node.js**
- **npm**
- **Git**

Un éditeur de code comme Visual Studio Code peut également être utilisé pour travailler sur le projet.

## Récupérer le projet

Le projet peut être cloné depuis son dépôt GitHub :

```bash
git clone https://github.com/bldyonyx/BookTracker.git
```

Puis entrer dans le dossier :

```bash
cd BookTracker
```

## Installer les dépendances

Les dépendances de l'application sont définies dans `package.json`.

Pour les installer :

```bash
npm install
```

Cette commande crée notamment le dossier `node_modules` nécessaire au fonctionnement du projet.

## Variables d'environnement

Dear Pages utilise une variable d'environnement pour accéder à Google Books API.

Il faut créer un fichier `.env` à la racine du projet :

```text
BookTracker/
├── .env
├── src/
├── package.json
└── vite.config.js
```

Puis ajouter la variable :

```text
VITE_GOOGLE_BOOKS_API_KEY=VOTRE_CLE_API
```

La valeur réelle de la clé ne doit pas être écrite dans la documentation.

Le fichier `.env` est ignoré par Git.

Les variables d'environnement sont détaillées dans la page **Variables d'environnement** de cette documentation.

## Lancer l'application

Une fois les dépendances installées et l'environnement configuré :

```bash
npm run dev
```

Vite démarre alors le serveur de développement et affiche l'adresse locale permettant d'ouvrir Dear Pages dans le navigateur.

## Build de production

Pour générer une version destinée à la production :

```bash
npm run build
```

Vite génère alors les fichiers optimisés de l'application dans le dossier de build.

## Documentation du projet

La documentation Astro/Starlight possède son propre environnement.

Depuis la racine du projet :

```bash
cd documentation
npm install
npm run dev
```

La documentation est alors lancée avec le serveur de développement Astro.

:::note
L'application React principale et la documentation Astro sont deux projets distincts. Chacun possède ses propres dépendances et son propre `package.json`.
:::

## Documentation JSDoc

La référence technique JSDoc est générée depuis le projet principal.

Depuis la racine de Dear Pages :

```bash
npm run docs
```

Les fichiers générés sont placés dans :

```text
docs/
```

Ce dossier contient une documentation générée automatiquement et est différent du projet Astro situé dans `documentation/`.

## Résumé

Pour lancer l'application principale :

```bash
git clone https://github.com/bldyonyx/BookTracker.git
cd BookTracker
npm install
npm run dev
```

Pour lancer la documentation :

```bash
cd documentation
npm install
npm run dev
```
