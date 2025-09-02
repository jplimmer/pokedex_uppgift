export const ROUTES = {
  HOME: {
    href: '/',
    label: 'Home',
  },
  POKEDEX: {
    href: '/pokedex',
    label: 'Pokédex',
  },
  TYPES: {
    href: '/types',
    label: 'Types',
  },
  FAVOURITES: {
    href: '/favourites',
    label: 'Favourites',
  },
} as const;

export const ASSET_PATHS = {
  DICE: '/Dice.svg',
  FACEBOOK: '/Facebook.svg',
  INSTAGRAM: '/Instagram.svg',
  LOADING: '/pokeball.svg',
  LOGO: '/Logo.png',
  NOT_FOUND: '/nibble.webp',
  SEARCH: '/Search.svg',
  SPRITE_FALLBACK: '/pokeball.svg',
} as const;
