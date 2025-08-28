import { unstable_cache } from 'next/cache';
import {
  GroupResultItem,
  Pokemon,
  PokemonType,
  PokemonTypeResultItem,
} from './types';
import { typeColours } from './colours';
import { getIdfromApiUrl } from '@/utils/utils';
import { getSprite } from './pokemonData';

const typeUrl = 'https://pokeapi.co/api/v2/type/';

export const getPokemonTypes = unstable_cache(async () => {
  try {
    const typesList = await fetchAllTypes();
    if (!typesList) return;

    const fetchPromises = typesList.map((type) => fetch(type.url));

    const responses = await Promise.all(fetchPromises);

    if (responses.some((res) => !res.ok)) {
      throw new Error('One or more requests failed');
    }

    const jsonPromises = responses.map((res) => res.json());
    const results: PokemonTypeResultItem[] = await Promise.all(jsonPromises);

    const allTypes: PokemonType[] = [];

    for (const result of results) {
      try {
        const type = await extractTypeData(result);
        allTypes.push(type!);
      } catch {
        console.warn(`Ignoring type "${result.name}"`);
        continue;
      }
    }

    return allTypes;
  } catch (error) {
    console.log(error);
    return null;
  }
});

const fetchAllTypes = async () => {
  // Add high limit to ensure all types fetched
  const queryString = '?limit=100';
  const response = await fetch(typeUrl + queryString);

  if (response.status !== 200) {
    return;
  }

  const { results: typesList }: { results: GroupResultItem[] } =
    await response.json();

  return typesList;
};

export const extractTypeData = async (
  item: PokemonTypeResultItem
): Promise<PokemonType> => {
  try {
    const pokemonIds = item.pokemon.map((p) => {
      return getIdfromApiUrl(p.pokemon.url);
    });

    const spritePokemon = item.pokemon[2].pokemon;
    const sprite = await getSprite(spritePokemon);

    const colour = typeColours.find((t) => t.name === item.name)?.color;

    return {
      id: item.id,
      name: item.name,
      pokemonIds: pokemonIds,
      sprite: sprite ?? '',
      colour: colour ?? '',
    };
  } catch (error) {
    throw new Error(
      `Error extracting type data for type "${item.name}": ${error}`
    );
  }
};
