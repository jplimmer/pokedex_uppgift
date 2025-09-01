import { GroupResultItem } from './data/rest-api/types';

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

export interface TypeColour {
  name: string;
  colour: string;
}

export interface PokemonType extends TypeColour {
  id: number;
  pokemon: GroupResultItem[];
  sprite: string;
}
