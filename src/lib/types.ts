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

export interface Pokemon {
  id: number;
  name: string;
  sprites: {
    primary: string;
  };
  stats: {
    hp: string;
    attack: string;
    defense: string;
    specialAttack?: string;
    specialDefense?: string;
    speed?: string;
    accuracy?: string;
    evasion?: string;
  };
  primaryType: TypeColour;
  types: TypeColour[];
}

export type PokemonTypeResultItem = {
  id: number;
  name: string;
  pokemon: {
    pokemon: GroupResultItem;
    slot: number;
  }[];
};

export interface TypeColour {
  name: string;
  colour: string;
}

export interface PokemonType extends TypeColour {
  id: number;
  pokemon: GroupResultItem[];
  sprite: string;
}
