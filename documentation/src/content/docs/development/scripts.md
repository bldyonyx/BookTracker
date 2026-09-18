---
title: Scripts
description: Commandes npm utilisées pour développer, construire et documenter Dear Pages.
---


Dear Pages utilise plusieurs scripts **npm** pour simplifier les tâches courantes de développement.

Les scripts sont définis dans le fichier `package.json` du projet principal.

## Lancer le serveur de développement

```bash
npm run dev
```

Cette commande démarre le serveur de développement Vite.

Elle permet de travailler sur l'application localement avec le rechargement automatique lorsque le code est modifié.

## Construire l'application

```bash
npm run build
```

Cette commande génère une version optimisée de Dear Pages destinée à la production.

Vite crée alors les fichiers nécessaires au déploiement.

## Prévisualiser le build

```bash
npm run preview
```

Cette commande permet de lancer localement la version générée par `npm run build`.

Elle est utile pour vérifier le comportement de la version de production avant son déploiement.

## Générer la documentation JSDoc

Dear Pages possède également un script permettant de générer automatiquement la documentation technique à partir des commentaires JSDoc présents dans le code.

```bash
npm run docs
```

Le script correspondant est :

```json
"docs": "jsdoc src -r -d docs"
```

JSDoc analyse récursivement le dossier `src` et génère la documentation dans :

```text
docs/
```

Ce dossier est généré automatiquement et n'est pas la documentation Astro/Starlight.

## Documentation Astro

La documentation du projet possède son propre `package.json` dans :

```text
documentation/
```

Pour la lancer :

```bash
cd documentation
npm run dev
```

Cette commande démarre le serveur Astro utilisé pour consulter la documentation actuelle.

## Deux projets npm

Dear Pages contient donc deux environnements npm distincts :

```text
BookTracker/
├── package.json
│   └── application React + Vite
│
└── documentation/
    └── package.json
        └── documentation Astro + Starlight
```

Les commandes doivent être exécutées depuis le dossier correspondant au projet que l'on souhaite utiliser.

:::tip
Avant d'exécuter une commande npm, vérifier le dossier courant permet d'éviter de lancer un script de la documentation dans l'application principale, ou inversement.
:::
