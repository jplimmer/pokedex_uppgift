import { unstable_cache } from 'next/cache';
import { typeColours } from '../colours';
import { getSprite } from './pokemon';
import { PokemonTypeResultItem } from './types';
import { NamedAPIResource, PokemonType } from '@/lib/types/types';
import { ASSET_PATHS } from '@/lib/constants';
import { getTodayKey } from '@/utils/storage';

const typeUrl = 'https://pokeapi.co/api/v2/type/';

export const getPokemonTypes = unstable_cache(
  async () => {
    try {
      console.time('get pokémon types');
      const typesList = await fetchAllTypes();
      if (!typesList) throw new Error('Failed to fetch all Types');

      console.time('fetch jsons');
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
      console.timeEnd('fetch jsons');

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
    } finally {
      console.timeEnd('get pokémon types');
    }
  },
  ['pokemon-types-cache', getTodayKey()],
  { tags: ['daily-data'], revalidate: 60 * 60 * 24 }
);

const fetchAllTypes = async () => {
  console.time('fetch all types');
  // Add high limit to ensure all types fetched
  const queryString = '?limit=100';
  const response = await fetch(typeUrl + queryString);

  if (response.status !== 200) {
    return;
  }

  const { results }: { results: NamedAPIResource[] } = await response.json();

  console.timeEnd('fetch all types');
  return results;
};

const extractTypeData = async (
  item: PokemonTypeResultItem
): Promise<PokemonType> => {
  console.time(`${item.name}`);
  try {
    const pokemonList: NamedAPIResource[] = item.pokemon.map((p) => p.pokemon);
    if (pokemonList.length === 0) throw new Error('No pokemon found');

    const spritePokemon =
      item.pokemon.filter((p) => p.slot === 1)[1]?.pokemon ||
      item.pokemon[2]?.pokemon ||
      null;

    const sprite = spritePokemon
      ? await getSprite(spritePokemon)
      : ASSET_PATHS.SPRITE_FALLBACK;

    const colour = typeColours.find((t) => t.name === item.name)?.colour;

    return {
      id: item.id,
      name: item.name,
      pokemon: pokemonList,
      sprite: sprite,
      colour: colour ?? '',
    };
  } catch (error) {
    throw new Error(
      `Error extracting type data for type "${item.name}": ${error}`
    );
  } finally {
    console.timeEnd(`${item.name}`);
  }
};

export const getTypeColour = (pokemonType: string) => {
  return (
    typeColours.find((t) => t.name.toLowerCase() === pokemonType.toLowerCase())
      ?.colour ?? ''
  );
};
