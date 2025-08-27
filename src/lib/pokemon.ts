import { routes } from './routes';
import { Pokemon, PokemonListItem } from './types';

const baseUrl = 'https://pokeapi.co/api/v2/';
const pokemonUrl = baseUrl + 'pokemon/';

export async function getNumberOfPokemon() {
  // const { count } = await fetch(pokemonUrl).then((res) => res.json());
  // return count;
  return 1025;
}

export async function fetchAllPokemon(limit = 20, offset = 0) {
  const queryString = `?limit=${limit}&offset=${offset}`;
  const response = await fetch(pokemonUrl + queryString);

  if (response.status !== 200) {
    return;
  }

  const { results: pokemonList }: { results: PokemonListItem[] } =
    await response.json();

  for (const p of pokemonList) {
    const id = getIdfromPokemonUrl(p.url);
    p['id'] = id;
  }

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

export async function getRandomPokemonIds(number: number) {
  const total = await getNumberOfPokemon();

  const pokemonIds = new Set<string>();

  while (pokemonIds.size < number) {
    const randomInt = Math.floor(Math.random() * total) + 1;
    const res = await fetchPokemonById(randomInt.toString());
    if (res) pokemonIds.add(randomInt.toString());
  }

  console.log('Selected IDs:', pokemonIds);
  return Array.from(pokemonIds);
}

export function getIdfromPokemonUrl(url: string) {
  const pathname = new URL(url).pathname;
  const id = pathname.split('pokemon/')[1]?.replace('/', '');
  return id;
}

export function getStatValue(pokemon: Pokemon, statName: string) {
  const stat = pokemon.stats.find(
    (s) => s.stat.name === statName.toLowerCase()
  );
  return stat?.base_stat ?? null;
}
