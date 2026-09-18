---
title: Roadmap
description: État actuel du développement et prochaines étapes de Dear Pages.
---

Dear Pages est développé progressivement, en commençant par la structure générale de l'application avant d'ajouter les fonctionnalités liées aux données personnelles.

Cette roadmap présente l'état du projet et les principales étapes prévues pour la suite du développement.

:::note
Cette page évolue avec le projet. Elle doit rester alignée avec le code source : une fonctionnalité n'est cochée que lorsqu'elle existe réellement dans l'application.
:::

## Base du projet

Les fondations principales de l'application sont en place.

- [x] Création du projet avec React et Vite
- [x] Mise en place de Tailwind CSS v4
- [x] Création de la palette et de l'identité visuelle
- [x] Ajout des polices et textures
- [x] Mise en place de React Router
- [x] Définition des routes principales dans `App.jsx`
- [x] Création du layout responsive avec `PageLayout`
- [x] Navigation desktop, tablette et mobile
- [x] Création des composants UI de base
- [x] Nom officiel Dear Pages

## Dashboard

Le Dashboard constitue la première page principale développée.

- [x] Header du Dashboard
- [x] Recherche depuis le Dashboard
- [x] Section de lecture en cours
- [x] Objectif de lecture
- [x] Livres récemment ajoutés
- [x] Statistiques de lecture
- [x] Compagnon de lecture
- [x] Adaptation responsive

Certaines données affichées sont encore temporaires et seront reliées aux données utilisateur plus tard.

## API et données publiques

L'application possède maintenant deux sources de livres externes.

- [x] Configuration de la clé Google Books API
- [x] Création de `booksApi.js`
- [x] Recherche de livres avec `searchBooks`
- [x] Suggestions de recherche avec `getBookSuggestions`
- [x] Recherche par sujet avec `getBooksBySubject`
- [x] Utilisation de `maxResults` et `startIndex` pour les sélections par sujet
- [x] Normalisation des résultats Google Books avec `formatBook`
- [x] Création de `trendingBooksApi.js`
- [x] Récupération des tendances depuis Open Library
- [x] Normalisation des livres Open Library pour l'interface
- [x] Partage des requêtes identiques en cours avec `fetchJsonOnce`

## Découvrir

La page Découvrir est actuellement bien avancée.

- [x] Route `/discover`
- [x] Recherche depuis la page
- [x] Synchronisation de la recherche avec `?q=`
- [x] Autocomplétion avec suggestions
- [x] Affichage des résultats de recherche
- [x] État sans résultat
- [x] Navigation des cartes et suggestions vers `/books/:id`
- [x] Composant réutilisable `BookCard`
- [x] Vue de découverte par défaut
- [x] Section **Peut-être pour toi**
- [x] Section **Tendances du moment**
- [x] Section **Les incontournables**
- [x] Vue étendue `/discover?view=for-you`
- [x] Préférences temporaires de découverte
- [x] Rafraîchissement indépendant des tendances
- [x] Rafraîchissement indépendant des incontournables
- [x] Rafraîchissement indépendant par genre dans la vue étendue
- [x] Déduplication et logique anti-répétition des recommandations
- [x] Persistance des recommandations dans `sessionStorage`
- [x] Grilles responsives pour les étagères
- [x] Logique séparée en composants, hooks, services et utilitaires
- [ ] Polish visuel complet des états de chargement et d'erreur

## Recommandations

Le système actuel est temporaire mais fonctionnel.

- [x] Préférences temporaires dans `discoverPreferences.js`
- [x] Lots de candidats par sujet Google Books
- [x] Sélection aléatoire des livres affichés
- [x] Déduplication par ISBN, titre/auteur et identifiants source
- [x] Suivi des livres déjà vus pendant la session
- [x] Persistance par étagère ou par genre
- [x] Gestion de `startIndex` pour charger une nouvelle fenêtre Google Books
- [x] Préparation technique pour exclure plus tard les livres déjà présents dans la bibliothèque
- [ ] Préférences réellement liées au profil utilisateur
- [ ] Recommandations basées sur la bibliothèque personnelle
- [ ] Persistance durable avec Firebase

## Authentification

L'authentification sera la prochaine grande phase de développement.

- [ ] Configuration de Firebase
- [ ] Création de compte
- [ ] Connexion
- [ ] Déconnexion
- [ ] Gestion de l'utilisateur connecté
- [ ] Onboarding d'un nouvel utilisateur
- [ ] Sauvegarde des préférences utilisateur

## Bibliothèque

La bibliothèque permettra de conserver les livres propres à chaque utilisateur.

- [ ] Ajouter un livre à la bibliothèque
- [ ] Retirer un livre
- [ ] Consulter sa bibliothèque réelle
- [ ] Gérer le statut de lecture
- [ ] Relier la bibliothèque au compte utilisateur
- [ ] Exclure les livres déjà ajoutés des recommandations
- [ ] Gérer les états vides et les erreurs

## Fiche d'un livre

Chaque livre disposera d'une page dédiée.

- [x] Route dynamique `/books/:id`
- [x] Cartes préparées pour naviguer vers la fiche d'un livre
- [ ] Afficher les informations détaillées réelles
- [ ] Ajouter le livre à la bibliothèque
- [ ] Modifier son statut de lecture
- [ ] Ajouter une note personnelle
- [ ] Ajouter ou modifier un avis personnel
- [ ] Ajouter le livre à une collection

## Collections

Les collections permettront de créer des regroupements personnalisés.

- [x] Routes `/collections` et `/collections/:id`
- [ ] Afficher les collections réelles
- [ ] Créer une collection
- [ ] Modifier une collection
- [ ] Supprimer une collection
- [ ] Afficher une collection persistante
- [ ] Ajouter et retirer des livres

## Paramètres

La page Paramètres permettra de gérer les informations et préférences liées à l'application.

- [x] Route `/settings`
- [x] Lien vers les paramètres depuis la navigation et le header
- [ ] Afficher les informations du compte
- [ ] Gérer les préférences persistantes
- [ ] Relier les préférences à Firebase

## Responsive et finition

Le responsive est vérifié progressivement pendant le développement, puis une passe finale sera réalisée sur l'ensemble de l'application.

- [x] Structure responsive principale
- [x] Dashboard responsive
- [x] Navigation mobile avec header et barre inférieure
- [x] Sidebar à partir de `md`
- [x] Layout élargi à partir de `lg`
- [x] Grilles responsives sur Découvrir
- [x] Affichage progressif de 2, 3, 4 puis 5 cartes selon la largeur
- [ ] Vérification complète de toutes les pages
- [ ] Accessibilité complète
- [ ] Polish visuel des chargements et erreurs
- [ ] Animations et micro-interactions finales
- [ ] Corrections visuelles finales

## Documentation

La documentation évolue en parallèle du projet.

- [x] Mise en place de JSDoc
- [x] Mise en place d'Astro et Starlight
- [x] Documentation de l'architecture
- [x] Documentation de Google Books API
- [x] Documentation d'Open Library
- [x] Documentation du système de recommandations temporaire
- [x] Documentation de l'environnement de développement
- [x] Documentation des choix techniques
- [ ] Mise à jour après l'implémentation de Firebase
- [ ] Mise à jour du modèle de données définitif
- [ ] Mise à jour finale selon l'application terminée

## Objectif final

L'objectif est d'obtenir une application personnelle permettant de suivre l'ensemble du parcours de lecture :

```text
Découvrir un livre
        ↓
Consulter sa fiche
        ↓
Ajouter à sa bibliothèque
        ↓
Choisir un statut
        ↓
Lire le livre
        ↓
Noter et écrire un avis
        ↓
Organiser dans des collections
```

La documentation sera mise à jour à mesure que ces étapes seront réellement implémentées.
