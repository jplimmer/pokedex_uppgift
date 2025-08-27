import { routes } from './routes';
import { Pokemon, GroupResultItem } from './types';

const pokemonUrl = 'https://pokeapi.co/api/v2/pokemon/';

export async function getNumberOfPokemon() {
  // const { count } = await fetch(pokemonUrl).then((res) => res.json());
  // return count;
  return 1025;
}

export async function fetchAllPokemon(limit?: number, offset = 0) {
  let queryLimit = limit;

  if (!queryLimit) {
    queryLimit = await getNumberOfPokemon();
  }
  const queryString = `?limit=${queryLimit.toString()}&offset=${offset.toString()}`;
  const response = await fetch(pokemonUrl + queryString);

  if (response.status !== 200) {
    return;
  }

  const { results: pokemonList }: { results: GroupResultItem[] } =
    await response.json();

  // for (const p of pokemonList) {
  //   const id = getIdfromPokemonUrl(p.url);
  //   p['id'] = id;
  // }

  return pokemonList;
}

export async function fetchPokemonById(id: string) {
  const response = await fetch(pokemonUrl + id);

  if (response.status !== 200) {
    return;
  }

  const pokemon: Pokemon = await response.json();

  return pokemon;
}

export async function fetchPokemonBySearchParam(identifier: string) {
  const response = await fetch(pokemonUrl + identifier);

  if (response.status !== 200) {
    return;
  }

  const { id } = await response.json();
  console.log(`${routes.pokedex}/${id}`);
  return id;
}

export async function getRandomPokemon(number: number) {
  const pokemonIds = new Set<string>();
  const pokemonList: Pokemon[] = [];

  const total = await getNumberOfPokemon();

  while (pokemonIds.size < number) {
    const randomInt = Math.floor(Math.random() * total) + 1;
    // Check page exists before adding to set
    const res = await fetchPokemonById(randomInt.toString());
    if (res) {
      pokemonIds.add(randomInt.toString());
      pokemonList.push(res);
    }
  }

  return pokemonList;
}

// function getIdfromPokemonUrl(url: string) {
//   const pathname = new URL(url).pathname;
//   const id = pathname.split('pokemon/')[1]?.replace('/', '');
//   return id;
// }

export function getStatValue(pokemon: Pokemon, statName: string) {
  const stat = pokemon.stats.find(
    (s) => s.stat.name === statName.toLowerCase()
  );
  return stat?.base_stat ?? null;
}

export async function fetchPokemonData(
  list: GroupResultItem[]
): Promise<Pokemon[]> {
  const fetchPromises = list.map((item) => fetch(item.url));

  try {
    const responses = await Promise.all(fetchPromises);

    if (responses.some((res) => !res.ok)) {
      throw new Error('One or more requests failed');
    }

    const jsonPromises = responses.map((res) => res.json());
    const pokemonData: Pokemon[] = await Promise.all(jsonPromises);
    return pokemonData;
  } catch (error) {
    console.error('Error fetching data for Pokémon list:', error);
    return [];
  }
}
