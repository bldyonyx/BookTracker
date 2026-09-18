---
title: Fonctionnalités
description: Les principales fonctionnalités développées et prévues dans Dear Pages.
---

Dear Pages est une application personnelle de suivi de lecture conçue pour permettre à l'utilisateur d'organiser sa bibliothèque, suivre ses lectures et découvrir de nouveaux livres.

L'application est pensée comme un espace **privé et personnel** : les notes, avis, collections et informations de lecture appartiennent uniquement à l'utilisateur.

## Tableau de bord

Le tableau de bord donne un aperçu rapide de l'activité de lecture.

Il permet notamment de retrouver :

- le livre actuellement en cours de lecture ;
- l'objectif de lecture ;
- les livres récemment ajoutés ;
- quelques statistiques de lecture ;
- un petit compagnon de lecture.

Les données affichées sur le tableau de bord sont encore temporaires. Elles seront reliées aux données utilisateur lorsque Firebase et l'authentification seront ajoutés.

## Découvrir des livres

La page **Découvrir** est actuellement la partie la plus avancée de l'application.

Elle permet de rechercher des livres grâce à l'API Google Books, d'afficher des suggestions pendant la saisie et de consulter les résultats sous forme de cartes.

Les résultats peuvent contenir différentes informations selon les données disponibles :

- titre ;
- auteur ;
- couverture ;
- description ;
- catégories ;
- date de publication.

La vue de découverte affiche aussi :

- une section **Peut-être pour toi** basée sur des préférences temporaires ;
- des livres **Tendances du moment** récupérés depuis Open Library ;
- une sélection **Les incontournables** basée sur Google Books ;
- des boutons de rafraîchissement indépendants pour certaines étagères ;
- une vue étendue de recommandations personnalisées accessible avec `/discover?view=for-you`.

Les recommandations utilisent pour l'instant des préférences temporaires et `sessionStorage`. Elles ne sont pas encore reliées à un compte utilisateur.

## Ma bibliothèque

La bibliothèque personnelle permettra de conserver les livres ajoutés par l'utilisateur et de les organiser selon leur état de lecture.

Elle constituera la partie personnelle de l'application, contrairement aux informations publiques récupérées depuis Google Books ou Open Library.

:::note
La bibliothèque réelle, les statuts persistants et les données liées au compte ne sont pas encore implémentés.
:::

## Fiche d'un livre

Chaque livre possède une page dédiée permettant de consulter ses informations plus en détail.

Les cartes de livres de la page Découvrir sont déjà préparées pour naviguer vers `/books/:id`.

Cette page servira également de point d'accès aux actions personnelles liées au livre, comme son ajout à la bibliothèque, son statut de lecture, sa note ou son avis.

## Notes et avis personnels

L'utilisateur pourra attribuer une note à un livre et rédiger un avis personnel.

Ces informations ne sont pas publiques et ne constituent pas un système social de critiques ou de profils publics.

## Collections

Les collections permettront de créer des groupes de livres personnalisés indépendamment de leur statut de lecture.

Elles pourront par exemple servir à regrouper des livres selon un thème, une envie ou une sélection personnelle.

## Compte et préférences

Dear Pages prévoit un système d'authentification permettant de conserver les données propres à chaque utilisateur.

Les préférences de l'application seront accessibles depuis les paramètres. Pour l'instant, les préférences utilisées dans Découvrir sont définies dans le code et servent de solution temporaire.

:::note
Dear Pages est encore en cours de développement. La recherche, les suggestions, les étagères de découverte et les recommandations temporaires existent déjà, mais Firebase, l'authentification, la bibliothèque réelle, les collections persistantes, les notes et les avis restent prévus.
:::
