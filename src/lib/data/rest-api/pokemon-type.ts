import { unstable_cache } from 'next/cache';
import { typeColours } from '../colours';
import { getSprite } from './pokemon';
import { PokemonTypeResultItem } from './types';
import { NamedAPIResource, PokemonType, Result } from '@/lib/types/types';
import { ASSET_PATHS } from '@/lib/constants';
import { getTodayKey } from '@/utils/storage';

const typeUrl = 'https://pokeapi.co/api/v2/type/';

export const getPokemonTypes = unstable_cache(
  async (): Promise<Result<PokemonType[], string>> => {
    console.time('getPokemonTypes() - TOTAL');

    try {
      const typesListResult = await fetchAllTypes();
      if (!typesListResult.success) {
        return { success: false, error: typesListResult.error };
      }

      console.time('getPokemonTypes - fetchPromises');
      const fetchPromises = typesListResult.data.map((type) =>
        fetch(type.url).catch(() => null)
      );
      const responses = await Promise.all(fetchPromises);
      console.timeEnd('getPokemonTypes - fetchPromises');

      const successfulResponses = responses.filter(
        (res): res is Response => !!res && res?.ok
      );

      if (successfulResponses.length < responses.length) {
        console.log(
          `${responses.length - successfulResponses.length} requests failed.`
        );
      }

      if (successfulResponses.length === 0) {
        return { success: false, error: 'All Pokémon data requests failed' };
      }

      // Parse responses to JSON
      console.time('getPokemonTypes - parse JSONs');
      const data: PokemonTypeResultItem[] = await Promise.all(
        successfulResponses.map((res) => res.json())
      );
      console.timeEnd('getPokemonTypes - parse JSONs');

      // Extract required PokémonType data
      console.time('getPokemonTypes - extractTypeData');
      const allTypes: PokemonType[] = [];
      const ignoredTypes: string[] = [];

      for (const item of data) {
        const typeResult = await extractTypeData(item);

        if (typeResult.success) {
          allTypes.push(typeResult.data);
        } else {
          ignoredTypes.push(item.name);
          console.debug(`Failed to process ${item.name}: ${typeResult.error}`);
        }
      }

      if (ignoredTypes.length > 0) {
        console.warn(
          `The following Types could not be processed: ${ignoredTypes.join(', ')}`
        );
      }
      console.timeEnd('getPokemonTypes - extractTypeData');

      return { success: true, data: allTypes };
    } catch (error) {
      const errorMsg = `Error fetching Types data: ${error instanceof Error ? error.message : 'Unknown error'}`;
      console.error(errorMsg);
      return { success: false, error: errorMsg };
    } finally {
      console.timeEnd('getPokemonTypes() - TOTAL');
    }
  },
  ['pokemon-types-cache', getTodayKey()],
  { tags: ['daily-data'], revalidate: 60 * 60 * 24 }
);

const fetchAllTypes = async (): Promise<Result<NamedAPIResource[], string>> => {
  try {
    console.time('fetchAllTypes()');

    // Add high limit to ensure all types fetched
    const queryString = `${typeUrl}?limit=100`;
    const response = await fetch(queryString);

    if (response.status !== 200) {
      return {
        success: false,
        error: `HTTP error for ${queryString}: ${response.status}`,
      };
    }

    const { results }: { results: NamedAPIResource[] } = await response.json();

    return { success: true, data: results };
  } catch (error) {
    const errorMsg = `Failed to fetch all types: ${error instanceof Error ? error.message : 'Unknown error'}`;
    console.error(errorMsg);
    return { success: false, error: errorMsg };
  } finally {
    console.timeEnd('fetchAllTypes()');
  }
};

const extractTypeData = async (
  item: PokemonTypeResultItem
): Promise<Result<PokemonType, string>> => {
  try {
    const pokemonList: NamedAPIResource[] = item.pokemon.map((p) => p.pokemon);
    if (pokemonList.length === 0) {
      return { success: false, error: 'No Pokémon of type found' };
    }

    const spritePokemon =
      item.pokemon.filter((p) => p.slot === 1)[1]?.pokemon ||
      item.pokemon[2]?.pokemon ||
      null;

    const sprite = spritePokemon
      ? await getSprite(spritePokemon)
      : ASSET_PATHS.SPRITE_FALLBACK;

    const colour = typeColours.find((t) => t.name === item.name)?.colour;

    const pokemonType: PokemonType = {
      id: item.id,
      name: item.name,
      pokemon: pokemonList,
      sprite: sprite,
      colour: colour ?? '',
    };

    return { success: true, data: pokemonType };
  } catch (error) {
    const errorMsg = `Error extracting type data for "${item.name}": ${error instanceof Error ? error.message : 'Unknown error'}`;
    console.error(errorMsg);
    return { success: false, error: errorMsg };
  }
};

export const getTypeColour = (pokemonType: string) => {
  return (
    typeColours.find((t) => t.name.toLowerCase() === pokemonType.toLowerCase())
      ?.colour ?? 'white'
  );
};
