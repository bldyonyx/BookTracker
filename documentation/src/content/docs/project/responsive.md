---
title: Responsive
description: Stratégie responsive utilisée pour adapter Dear Pages aux différentes tailles d'écran.
---

Dear Pages est conçu pour être utilisable sur **mobile, tablette et ordinateur**.

L'objectif n'est pas uniquement de réduire la taille des éléments, mais d'adapter la structure de l'interface à l'espace disponible.

## Breakpoints utilisés

Le responsive est principalement géré avec les breakpoints de **Tailwind CSS**.

L'application utilise surtout :

```text
Mobile       < 768 px
Tablette     ≥ 768 px    md
Desktop      ≥ 1024 px   lg
Large        ≥ 1280 px   xl
```

Le breakpoint `xl` est notamment utilisé sur les étagères de livres pour afficher une cinquième carte lorsque l'espace le permet.

## Layout principal

`PageLayout` est responsable de la structure commune des pages principales.

Sur mobile, il affiche :

- un header fixe en haut avec le nom Dear Pages ;
- un lien vers les paramètres ;
- une barre de navigation fixe en bas avec `MobileNav` ;
- un contenu avec `pt-14` pour ne pas passer sous le header ;
- un padding bas pour laisser la place à la navigation inférieure.

À partir de `md`, le header mobile et `MobileNav` disparaissent. La sidebar devient visible avec :

```text
md:flex
md:ml-46
md:w-[calc(100%-11.5rem)]
```

À partir de `lg`, la sidebar et la zone principale s'élargissent :

```text
lg:w-72
lg:ml-72
lg:w-[calc(100%-18rem)]
lg:p-4
lg:rounded-2xl
```

La structure peut être résumée ainsi :

```text
Mobile
┌─────────────────────┐
│ Header              │
├─────────────────────┤
│                     │
│ Contenu             │
│                     │
├─────────────────────┤
│ MobileNav           │
└─────────────────────┘

Tablette et desktop
┌──────────┬────────────────────────┐
│ Sidebar  │ Contenu principal      │
└──────────┴────────────────────────┘
```

Les routes de l'application ne changent pas selon l'écran. Seule leur présentation est adaptée.

## Navigation

La navigation principale est définie dans `components/layout/navigation.js`.

Sur mobile, `MobileNav` affiche :

- Accueil ;
- Découvrir ;
- Bibliothèque ;
- Collections.

Sur tablette et desktop, `Sidebar` affiche :

- Accueil ;
- Découvrir ;
- Ma bibliothèque ;
- Collections ;
- Paramètres.

Cette différence permet de garder la navigation mobile plus compacte tout en donnant plus d'entrées sur les écrans larges.

## Découvrir

La page Découvrir utilise plusieurs contraintes responsives.

Le champ de recherche est limité avec :

```text
max-w-[calc(100vw-3rem)]
md:max-w-2xl
```

Cela évite les débordements horizontaux sur mobile tout en gardant un champ confortable sur tablette et desktop.

Les headers internes passent de colonnes à lignes avec :

```text
md:flex-row
md:items-center
md:justify-between
```

## Étagères de livres

Les étagères de Découvrir utilisent une grille responsive :

```text
grid-cols-2
md:grid-cols-3
lg:grid-cols-4
xl:grid-cols-5
```

Les cartes sont limitées à :

```text
max-w-40
```

Le code masque aussi certaines cartes selon la largeur afin que le nombre affiché corresponde à la grille disponible :

- 2 cartes sur mobile ;
- 3 cartes à partir de `md` ;
- 4 cartes à partir de `lg` ;
- 5 cartes à partir de `xl`.

Cette logique est utilisée par :

- `DiscoverShelf`
- `ForYouSection`
- `ForYouRecommendations`

## Résultats de recherche

Les résultats de recherche utilisent une grille adaptée aux petits écrans :

```text
grid-cols-2
sm:grid-cols-[repeat(auto-fit,minmax(9rem,10rem))]
```

Sur mobile, deux colonnes sont forcées pour garder une lecture régulière. À partir de `sm`, la grille peut créer autant de colonnes que possible avec des cartes entre `9rem` et `10rem`.

## Gestion de l'overflow

Une attention particulière est portée aux éléments pouvant dépasser horizontalement sur les petits écrans.

Le layout utilise notamment :

```text
min-w-0
max-w-full
overflow-x-hidden
max-w-[calc(100vw-3rem)]
```

Ces contraintes aident les éléments flexibles, les champs de recherche et les grilles à se réduire correctement.

## État actuel

Le responsive principal est en place pour :

- le layout général ;
- la navigation mobile, tablette et desktop ;
- le tableau de bord ;
- la page Découvrir ;
- les étagères de recommandations ;
- les résultats de recherche.

Une passe finale restera nécessaire lorsque les pages liées à Firebase, à la bibliothèque réelle, aux collections persistantes et aux fiches de livres complètes seront terminées.
