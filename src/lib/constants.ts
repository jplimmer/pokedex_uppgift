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
  SPRITE_FALLBACK: '/pokeball.svg',
};
