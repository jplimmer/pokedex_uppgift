import { NamedAPIResource } from '@/lib/types/types';

export interface Stat {
  base_stat: number;
  stat: {
    name: string;
  };
}

export type PokemonResultItem = {
  id: number;
  name: string;
  sprites: {
    front_default: string;
  };
  stats: Stat[];
  types: {
    slot: number;
    type: NamedAPIResource;
  }[];
};

export type PokemonTypeResultItem = {
  id: number;
  name: string;
  pokemon: {
    pokemon: NamedAPIResource;
    slot: number;
  }[];
};
