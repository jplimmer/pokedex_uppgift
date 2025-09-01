export interface GroupResultItem {
  name: string;
  url: string;
}

export type PokemonResultItem = {
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
  types: {
    slot: number;
    type: GroupResultItem;
  }[];
};

export type PokemonTypeResultItem = {
  id: number;
  name: string;
  pokemon: {
    pokemon: GroupResultItem;
    slot: number;
  }[];
};
