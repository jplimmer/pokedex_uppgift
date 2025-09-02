import { unstable_cache } from 'next/cache';
import { typeColours } from '../colours';
import { getSprite } from './pokemon';
import { PokemonTypeResultItem } from './types';
import { NamedAPIResource, PokemonType } from '@/lib/types/types';

const typeUrl = 'https://pokeapi.co/api/v2/type/';

export const getPokemonTypes = unstable_cache(async () => {
  try {
    const typesList = await fetchAllTypes();
    if (!typesList) throw new Error('Failed to fetch all Types');

    const fetchPromises = typesList.map((type) =>
      fetch(type.url).catch(() => null)
    );
    const responses = await Promise.all(fetchPromises);
    const successfulResponses = responses.filter(
      (res): res is Response => !!res && res?.ok
    );
    if (successfulResponses.length < responses.length) {
      console.log('Some responses failed.');
    }

    const data: PokemonTypeResultItem[] = await Promise.all(
      successfulResponses.map((res) => res.json())
    );

    const allTypes: PokemonType[] = [];
    const ignoredTypes: string[] = [];

    for (const item of data) {
      try {
        const type = await extractTypeData(item);
        allTypes.push(type!);
      } catch {
        ignoredTypes.push(item.name);
        continue;
      }
    }

    if (ignoredTypes) {
      console.warn(
        `The following Types could not be processed: ${ignoredTypes}`
      );
    }

    return allTypes;
  } catch (error) {
    console.log('Error getting Types data:', error);
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

  const { results }: { results: NamedAPIResource[] } = await response.json();

  return results;
};

const extractTypeData = async (
  item: PokemonTypeResultItem
): Promise<PokemonType> => {
  try {
    const pokemonList: NamedAPIResource[] = item.pokemon.map((p) => p.pokemon);

    const spritePokemon =
      item.pokemon.filter((p) => p.slot === 1)[1]?.pokemon ??
      item.pokemon[2].pokemon;
    const sprite = await getSprite(spritePokemon);

    const colour = typeColours.find((t) => t.name === item.name)?.colour;

    return {
      id: item.id,
      name: item.name,
      pokemon: pokemonList,
      sprite: sprite ?? '',
      colour: colour ?? '',
    };
  } catch (error) {
    throw new Error(
      `Error extracting type data for type "${item.name}": ${error}`
    );
  }
};

export const getTypeColour = (pokemonType: string) => {
  return (
    typeColours.find((t) => t.name.toLowerCase() === pokemonType.toLowerCase())
      ?.colour ?? ''
  );
};
