const mainNavigationItems = [
  { label: 'Accueil', to: '/' },
  { label: 'Découvrir', to: '/discover' },
  { label: 'Bibliothèque', to: '/library' },
  { label: 'Collections', to: '/collections' },
]

const desktopNavigationItems = [
  mainNavigationItems[0],
  mainNavigationItems[1],
  { label: 'Ma bibliothèque', to: '/library' },
  mainNavigationItems[3],
  { label: 'Paramètres', to: '/settings' },
]

export { desktopNavigationItems, mainNavigationItems }
