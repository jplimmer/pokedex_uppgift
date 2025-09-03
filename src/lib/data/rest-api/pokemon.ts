import { PokemonResultItem } from './types';
import { getTypeColour } from './pokemon-type';
import { NamedAPIResource, Pokemon, Result } from '@/lib/types/types';
import { ASSET_PATHS } from '@/lib/constants';

const pokemonUrl = 'https://pokeapi.co/api/v2/pokemon/';

export const getNumberOfPokemon = async (): Promise<Result<number, string>> => {
  try {
    const response = await fetch(pokemonUrl);
    if (response.status !== 200) {
      return {
        success: false,
        error: `HTTP error for ${pokemonUrl}: ${response.status}`,
      };
    }
    const { count }: { count: number } = await response.json();
    return { success: true, data: count };
  } catch (error) {
    const errorMsg = `Failed to fetch number of Pokémon: ${error instanceof Error ? error.message : 'Unknown error'}`;
    console.error(errorMsg);
    return { success: false, error: errorMsg };
  }
};

export const getAllPokemon = async (): Promise<
  Result<NamedAPIResource[], string>
> => {
  console.time('getAllPokemon()');

  try {
    const limitResult = await getNumberOfPokemon();
    if (!limitResult.success) {
      return { success: false, error: limitResult.error };
    }

    const queryString = `${pokemonUrl}?limit=${limitResult.data.toString()}`;
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
    const errorMsg = `Failed to fetch all Pokémon: ${error instanceof Error ? error.message : 'Unknown error'}`;
    console.error(errorMsg);
    return { success: false, error: errorMsg };
  } finally {
    console.timeEnd('getAllPokemon()');
  }
};

export const getAllPokemonNames = async (): Promise<
  Result<string[], string>
> => {
  const allPokemonResult = await getAllPokemon();
  if (!allPokemonResult.success)
    return {
      success: false,
      error: allPokemonResult.error,
    };

  const names = allPokemonResult.data.map((p) => p.name);
  return { success: true, data: names };
};

export const getPokemonData = async (
  list: NamedAPIResource[]
): Promise<Result<Pokemon[], string>> => {
  console.time('getPokemonData() - TOTAL');

  // Guard limit against excessive API calls
  const maxQueries = 20;
  if (list.length > maxQueries) {
    const errorMsg = `Too many Pokémon (${list.length}) - a maximum of ${maxQueries} can be processed`;
    console.error(errorMsg);
    return { success: false, error: errorMsg };
  }

  try {
    // Fetch data for all Pokémon in list
    // console.time('getPokemonData - fetchPromises');
    const fetchPromises = list.map((p) =>
      fetch(p.url, { cache: 'force-cache' }).catch(() => null)
    );
    const responses = await Promise.all(fetchPromises);
    // console.timeEnd('getPokemonData - fetchPromises');

    // console.time('getPokemonData - filter successful');
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
    // console.timeEnd('getPokemonData - filter successful');

    // Parse responses to JSON
    // console.time('getPokemonData - parse JSONs');
    const data: PokemonResultItem[] = await Promise.all(
      successfulResponses.map((res) => res.json())
    );
    // console.timeEnd('getPokemonData - parse JSONs');

    // Extract required Pokémon data
    // console.time('getPokemonData - extractPokemonData');
    const allPokemon: Pokemon[] = [];
    const ignoredPokemon: string[] = [];

    for (const item of data) {
      const pokemonResult = await extractPokemonData(item);

      if (pokemonResult.success) {
        allPokemon.push(pokemonResult.data);
      } else {
        ignoredPokemon.push(item.name);
        console.debug(`Failed to process ${item.name}: ${pokemonResult.error}`);
      }
    }

    if (ignoredPokemon.length > 0) {
      console.warn(
        `The following Pokémon could not be processed: ${ignoredPokemon.join(', ')}`
      );
    }
    // console.timeEnd('getPokemonData - extractPokemonData');

    return { success: true, data: allPokemon };
  } catch (error) {
    const errorMsg = `Error fetching Pokémon data: ${error instanceof Error ? error.message : 'Unknown error'}`;
    console.error(errorMsg);
    return { success: false, error: errorMsg };
  } finally {
    console.timeEnd('getPokemonData() - TOTAL');
  }
};

const extractPokemonData = async (
  item: PokemonResultItem
): Promise<Result<Pokemon, string>> => {
  try {
    const primaryTypeName = item.types[0]?.type.name ?? 'unknown';

    const pokemon: Pokemon = {
      id: item.id,
      name: item.name,
      sprites: {
        primary: item.sprites.front_default ?? null,
      },
      stats: {
        hp: getStatValue(item, 'hp'),
        attack: getStatValue(item, 'attack'),
        defense: getStatValue(item, 'defense'),
      },
      primaryType: {
        name: primaryTypeName,
        colour: getTypeColour(primaryTypeName),
      },
      types: item.types.map((t) => ({
        name: t.type.name,
        colour: getTypeColour(t.type.name),
      })),
    };
    return { success: true, data: pokemon };
  } catch (error) {
    const errorMsg = error instanceof Error ? error.message : 'Unknown error';
    return {
      success: false,
      error: `Error extracting data for "${item.name}": ${errorMsg}`,
    };
  }
};

const getStatValue = (pokemon: PokemonResultItem, statName: string) => {
  const stat = pokemon.stats.find(
    (s) => s.stat.name === statName.toLowerCase()
  );
  return stat?.base_stat.toString() ?? '-';
};

export const getSprite = async (item: NamedAPIResource) => {
  try {
    const pokemonData: PokemonResultItem = await fetch(item.url).then((res) =>
      res.json()
    );
    const sprite = pokemonData.sprites.front_default;
    if (!sprite) throw new Error('No sprite found for Pokémon');
    return sprite;
  } catch (error) {
    console.log(`Error fetching sprite for type "${item.name}":`, error);
    return ASSET_PATHS.SPRITE_FALLBACK;
  }
};

export const fetchPokemonByNameOrId = async (
  identifier: string
): Promise<Result<Pokemon, string>> => {
  try {
    const queryString = pokemonUrl + identifier.toString();
    const response = await fetch(queryString);

    if (response.status !== 200) {
      return {
        success: false,
        error: `HTTP error for ${queryString}: ${response.status}`,
      };
    }

    const result: PokemonResultItem = await response.json();
    const pokemonResult = await extractPokemonData(result);
    if (!pokemonResult.success) {
      return { success: false, error: pokemonResult.error };
    }
    return { success: true, data: pokemonResult.data };
  } catch (error) {
    const errorMsg = `Failed to fetch data for "${identifier}": ${error instanceof Error ? error.message : 'Unknown error'}`;
    console.error(errorMsg);
    return {
      success: false,
      error: errorMsg,
    };
  }
};

export const getRandomPokemonNames = async (
  number: number
): Promise<Result<string[], string>> => {
  const pokemonSet = new Set<string>();

  const allNamesResult = await getAllPokemonNames();
  if (!allNamesResult.success) {
    return { success: false, error: allNamesResult.error };
  }

  const total = allNamesResult.data.length;

  while (pokemonSet.size < number) {
    const randomInt = Math.floor(Math.random() * total) + 1;
    const randomName = allNamesResult.data[randomInt];
    pokemonSet.add(randomName.toString());
  }
  return { success: true, data: [...pokemonSet] };
};

export const getIdfromApiUrl = (url: string) => {
  const pathname = new URL(url).pathname;
  const route = pathname.split('api/v2/')[1];
  const id = route.split('/')[1]?.replace('/', '');
  return id;
};
