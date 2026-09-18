---
title: Recommandations
description: Fonctionnement actuel des recommandations temporaires de Dear Pages.
---

Dear Pages possède déjà un système de recommandations pour la page **Découvrir**.

Ce système est volontairement temporaire : il permet de tester l'expérience de découverte avant l'arrivée de Firebase, de l'authentification et des vraies préférences utilisateur.

:::note
Les recommandations actuelles ne sont pas encore personnalisées avec un compte utilisateur réel. Elles utilisent des préférences définies dans le code et une persistance limitée à la session du navigateur.
:::

## Préférences temporaires

Les préférences utilisées actuellement sont définies dans :

```text
src/constants/discoverPreferences.js
```

Le tableau contient trois genres :

- `fantasy`
- `mystery`
- `classics`

Ces préférences servent à construire la section **Peut-être pour toi** et la vue étendue `/discover?view=for-you`.

Plus tard, ce tableau pourra être remplacé par les préférences du profil utilisateur.

## Sources des candidats

Les recommandations sont construites à partir de lots de candidats récupérés depuis les API externes.

Pour Google Books, le service `getBooksBySubject` recherche des livres avec :

```text
q=subject:<genre>
```

Il accepte aussi :

- `maxResults`, pour demander un lot plus grand que le nombre affiché ;
- `startIndex`, pour récupérer une nouvelle fenêtre de résultats lors d'un rafraîchissement.

Pour les tendances, le service `getTrendingBooksDetails` utilise Open Library et le tri `trending`.

## Sélection et déduplication

La sélection des recommandations est isolée dans :

```text
src/utils/recommendationSelection.js
```

La fonction principale est `selectRecommendationBooks`.

Elle applique plusieurs étapes :

1. Dédupliquer les livres reçus dans le lot de candidats.
2. Retirer les livres déjà vus pendant la session.
3. Retirer les livres exclus, ce qui prépare le futur branchement avec **Ma bibliothèque**.
4. Mélanger les livres restants de manière aléatoire.
5. Garder seulement le nombre nécessaire pour l'étagère.

Pour reconnaître les doublons, l'application construit plusieurs clés d'identité :

- ISBN, quand il existe ;
- couple titre + auteur principal normalisé ;
- identifiant Google Books ;
- identifiant Open Library ;
- identifiant local de l'objet.

Cette stratégie est importante car Google Books et Open Library n'utilisent pas les mêmes identifiants.

## Livres déjà vus

Chaque étagère conserve les livres déjà affichés sous forme de clés d'identité.

Cela évite de revoir immédiatement les mêmes livres après un rafraîchissement.

Les tendances peuvent recycler des livres déjà vus lorsque le lot disponible ne contient plus de nouveaux candidats éligibles. Ce comportement est activé avec `recycleSeenWhenExhausted`, car la source Open Library utilisée pour les tendances est plus fixe.

## Persistance de session

Les étagères de recommandations sont sauvegardées dans `sessionStorage` grâce à :

```text
src/utils/recommendationSessionStorage.js
```

Cette persistance garde pour une session :

- les livres actuellement affichés ;
- le `startIndex` lorsque l'étagère utilise une pagination Google Books ;
- les clés d'identité déjà vues.

Les clés commencent encore par :

```text
booktracker:recommendations
```

Ce préfixe est un identifiant technique conservé pour ne pas modifier inutilement le comportement du stockage local.

## Page Découvrir

Sur la vue de découverte par défaut, `useDiscoverHomeBooks` charge :

- **Peut-être pour toi** depuis Google Books avec le sujet `mystery` ;
- **Tendances du moment** depuis Open Library ;
- **Les incontournables** depuis Google Books avec le sujet `classics`.

Les tendances et les incontournables possèdent chacun un bouton de rafraîchissement.

Ces rafraîchissements sont indépendants : rafraîchir les tendances ne recharge pas les incontournables, et inversement.

## Vue étendue

La vue `/discover?view=for-you` est affichée par `ForYouRecommendations`.

Elle utilise `useForYouRecommendations` pour créer une section par préférence temporaire.

Chaque genre possède son propre état :

- livres affichés ;
- erreur ;
- chargement ;
- `startIndex`.

Le bouton de rafraîchissement d'un genre ne recharge que ce genre.

## Gestion des erreurs et du chargement

Les hooks utilisent des états de chargement et d'erreur séparés.

La page Découvrir utilise `Promise.allSettled` pour éviter qu'une requête échouée bloque toutes les autres étagères.

Actuellement, ces états sont fonctionnels :

- texte de chargement global ;
- message d'erreur global si certaines sélections échouent ;
- message d'erreur par étagère lors d'un rafraîchissement ;
- bouton désactivé pendant un rafraîchissement ;
- texte de chargement par genre lorsque la vue étendue charge une section vide.

Le polish visuel de ces états reste à améliorer.

## Préparation pour la bibliothèque

Les fonctions de sélection acceptent déjà `excludedBookIds`.

Pour l'instant, cet argument est vide par défaut.

Il prépare la future exclusion des livres déjà présents dans **Ma bibliothèque**, lorsque les données utilisateur existeront réellement.

## Actuel et prévu

### Actuel

- préférences temporaires dans le code ;
- recommandations par genres ;
- tendances Open Library ;
- incontournables Google Books ;
- déduplication et anti-répétition ;
- rafraîchissement indépendant par étagère ou par genre ;
- persistance avec `sessionStorage` ;
- préparation technique pour exclure les livres de la bibliothèque.

### Prévu

- préférences enregistrées dans le profil utilisateur ;
- exclusion réelle des livres déjà ajoutés à la bibliothèque ;
- recommandations basées sur les données de lecture ;
- persistance durable avec Firebase ;
- états visuels de chargement et d'erreur plus travaillés.
