---
title: Firebase
description: Utilisation prévue de Firebase pour l'authentification et les données personnelles de Dear Pages.
---


Dear Pages prévoit d'utiliser **Firebase** pour gérer les données personnelles liées à chaque utilisateur.

Contrairement à Google Books et Open Library, qui fournissent les informations publiques des livres, Firebase permettra de conserver les informations propres à l'utilisation de l'application.

:::note
L'intégration Firebase de Dear Pages n'est pas encore implémentée. Cette page décrit l'architecture actuellement prévue et pourra évoluer pendant le développement.
:::

## Rôle de Firebase

Firebase sera principalement utilisé pour deux besoins :

- l'authentification des utilisateurs ;
- la sauvegarde de leurs données personnelles.

Les informations publiques concernant les livres continueront à provenir de Google Books et d'Open Library.

## Authentification

Firebase Authentication permettra de créer et identifier les comptes utilisateurs.

Le parcours prévu comprend notamment :

```text
Création de compte
        │
        ▼
   Connexion
        │
        ▼
Identification de l'utilisateur
        │
        ▼
Accès à ses données personnelles
```

Les pages prévues pour ce parcours existent déjà dans la structure du projet :

```text
pages/
├── Login.jsx
├── SignUp.jsx
└── Onboarding.jsx
```

L'onboarding permettra de préparer l'expérience d'un nouvel utilisateur après la création de son compte.

## Données personnelles

Chaque utilisateur devra disposer de ses propres données.

La structure envisagée est organisée autour de son identifiant :

```text
users/
└── userId/
    ├── profile/
    ├── library/
    ├── collections/
    ├── preferences/
    └── reviews/
```

Cette structure est encore provisoire.

## Bibliothèque

La bibliothèque permettra d'enregistrer la relation entre l'utilisateur et les livres qu'il souhaite suivre.

Les données pourront notamment contenir :

- l'identifiant du livre ;
- le statut de lecture ;
- la date d'ajout ;
- une note personnelle ;
- certaines informations nécessaires à l'affichage.

Le modèle exact sera défini lors de l'implémentation de la bibliothèque.

## Collections

Les collections permettront à l'utilisateur de créer ses propres regroupements de livres.

Une collection devra appartenir à un utilisateur et pourra contenir plusieurs références de livres.

Par exemple :

```text
collections/
└── collectionId/
    ├── name
    └── books
```

La structure définitive dépendra des besoins identifiés pendant l'implémentation.

## Préférences

Firebase pourra également conserver certaines préférences liées au compte ou à l'utilisation de l'application.

Cela permettra de retrouver les mêmes réglages après une nouvelle connexion.

## Services Firebase

La logique Firebase ne sera pas placée directement dans les composants React.

Elle sera séparée dans des services dédiés, selon le même principe que `booksApi.js`.

L'organisation prévue pourra par exemple contenir :

```text
services/
├── booksApi.js
├── authService.js
├── libraryService.js
└── collectionsService.js
```

Cette séparation permettra de garder les composants principalement responsables de l'interface.

## Flux des données

Le fonctionnement général prévu peut être représenté ainsi :

```text
Google Books / Open Library
      │
      ▼
Informations publiques
      │
      ▼
   Dear Pages
      │
      ├──────────────► Interface React
      │
      ▼
   Firebase
      │
      ├── compte
      ├── bibliothèque
      ├── collections
      ├── avis
      └── préférences
```

Les sources publiques de livres et Firebase ont donc deux responsabilités différentes :

**Google Books et Open Library fournissent les informations sur les livres.**

**Firebase conservera les informations personnelles de l'utilisateur.**

## Évolution

Cette architecture sera précisée lorsque l'authentification et la bibliothèque seront implémentées.

La documentation sera alors mise à jour pour refléter la structure Firebase réellement utilisée plutôt que l'architecture prévue.
