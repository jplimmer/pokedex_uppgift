import { Pokemon } from '@/components/PokemonCard';

const baseUrl = 'https://pokeapi.co/api/v2/';
const pokemonUrl = baseUrl + 'pokemon/';

export async function getNumberOfPokemon() {
  // const { count } = await fetch(pokemonUrl).then((res) => res.json());
  // return count;
  return 1025;
}

export async function getPokemonById(id: string) {
  const response = await fetch(pokemonUrl + id);

  if (response.status !== 200) {
    return;
  }

  const pokemon: Pokemon = await response.json();

  return pokemon;
}

export async function getRandomPokemonIds(number: number) {
  const total = await getNumberOfPokemon();

  const pokemonIds = new Set<string>();

  while (pokemonIds.size < number) {
    const randomInt = Math.floor(Math.random() * total) + 1;
    const res = await getPokemonById(randomInt.toString());
    if (res) pokemonIds.add(randomInt.toString());
  }

  console.log('Selected IDs:', pokemonIds);
  return Array.from(pokemonIds);
}

export function getStatValue(pokemon: Pokemon, statName: string) {
  const stat = pokemon.stats.find(
    (s) => s.stat.name === statName.toLowerCase()
  );
  return stat?.base_stat ?? null;
}
