export interface GroupResultItem {
  name: string;
  url: string;
}

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

export type PokemonTypeResultItem = {
  id: number;
  name: string;
  pokemon: {
    pokemon: GroupResultItem;
  }[];
};

export interface PokemonType {
  id: number;
  name: string;
  pokemonIds: string[];
  sprite: string;
  colour: string;
}
