export interface Pokemon {
  id: number;
  name: string;
  sprites: {
    front_default: string;
  };
  stats: Array<{
    base_stat: number;
    stat: {
      name: string;
    };
  }>;
  types: Array<{
    type: {
      name: string;
    };
  }>;
}

export interface PokemonListItem {
  name: string;
  url: string;
  id?: string;
}
