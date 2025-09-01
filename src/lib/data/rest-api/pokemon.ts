import { PokemonResultItem } from './types';
import { getTypeColour } from './pokemon-type';
import { NamedAPIResource, Pokemon } from '@/lib/types/types';

const pokemonUrl = 'https://pokeapi.co/api/v2/pokemon/';

export const getNumberOfPokemon = async () => {
  const { count }: { count: number } = await fetch(pokemonUrl).then((res) =>
    res.json()
  );
  return count;
  // Hard-coded due to data-quality in API
  // return 1025;
};

export const getAllPokemon = async () => {
  const limit = await getNumberOfPokemon();
  const queryString = `?limit=${limit.toString()}`;
  const response = await fetch(pokemonUrl + queryString);

  if (response.status !== 200) {
    return [];
  }

  const { results }: { results: NamedAPIResource[] } = await response.json();

  return results;
};

export const getAllPokemonNames = async () => {
  const allPokemon = await getAllPokemon();
  if (!allPokemon) return [];

  return allPokemon.map((p) => p.name);
};

export const getPokemonData = async (list: NamedAPIResource[]) => {
  // Guard limit against excessive API calls
  const maxQueries = 20;
  if (list.length > maxQueries) {
    console.error(
      `Too many Pokémon (${list.length}) - a maximum of ${maxQueries} can be processed`
    );
    return [];
  }

  try {
    const fetchPromises = list.map((p) => fetch(p.url).catch(() => null));
    const responses = await Promise.all(fetchPromises);
    const successfulResponses = responses.filter(
      (res): res is Response => !!res && res?.ok
    );

    if (successfulResponses.length < responses.length) {
      console.log('Some responses failed.');
    }

    const data: PokemonResultItem[] = await Promise.all(
      successfulResponses.map((res) => res.json())
    );

    const allPokemon: Pokemon[] = [];
    const ignoredPokemon: string[] = [];

    for (const item of data) {
      try {
        const pokemon = await extractPokemonData(item);
        allPokemon.push(pokemon);
      } catch {
        ignoredPokemon.push(item.name);
        continue;
      }
    }

    if (ignoredPokemon.length !== 0) {
      console.warn(
        `The following Pokémon could not be processed: ${ignoredPokemon}`
      );
    }

    return allPokemon;
  } catch (error) {
    console.log('Error getting Pokémon data:', error);
    return [];
  }
};

const extractPokemonData = async (
  item: PokemonResultItem
): Promise<Pokemon> => {
  const primaryTypeName = item.types[0].type.name;
  try {
    return {
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
  } catch (error) {
    throw new Error(`Error extracting data for "${item.name}": ${error}`);
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
    return '/pokeball.svg';
  }
};

export async function fetchPokemonByNameOrId(identifier: string) {
  const response = await fetch(pokemonUrl + identifier.toString());

  if (response.status !== 200) {
    return null;
  }

  const result: PokemonResultItem = await response.json();

  try {
    const pokemon = await extractPokemonData(result);
    return pokemon;
  } catch (error) {
    console.error(`Failed to fetch data for "${identifier}":`, error);
    return null;
  }
}

export async function getRandomPokemon(number: number) {
  const pokemonNames = new Set<string>();
  const pokemonList: Pokemon[] = [];

  const allNames = await getAllPokemonNames();

  const total = allNames.length;

  while (pokemonNames.size < number) {
    const randomInt = Math.floor(Math.random() * total) + 1;
    const randomName = allNames[randomInt];
    // Check page exists before adding to set
    const res = await fetchPokemonByNameOrId(randomName.toString());
    if (res) {
      pokemonNames.add(randomName.toString());
      pokemonList.push(res);
    }
  }

  return pokemonList;
}

export function getIdfromApiUrl(url: string) {
  const pathname = new URL(url).pathname;
  const route = pathname.split('api/v2/')[1];
  const id = route.split('/')[1]?.replace('/', '');
  return id;
}
