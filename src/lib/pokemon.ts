import { Pokemon } from '@/components/PokemonCard';

const baseUrl = 'https://pokeapi.co/api/v2/';
const pokemonUrl = baseUrl + 'pokemon/';

export async function getNumberOfPokemon() {
  const { count } = await fetch(pokemonUrl).then((res) => res.json());
  // console.log(count);
  return count;
}

export async function getPokemonById(id: number) {
  const idStr = id.toString();
  const response = await fetch(pokemonUrl + idStr);

  if (response.status !== 200) {
    return;
  }

  const pokemon: Pokemon = await response.json();
  // console.log(pokemon);

  return pokemon;
}

export function getStatValue(pokemon: Pokemon, statName: string) {
  const stat = pokemon.stats.find(
    (s) => s.stat.name === statName.toLowerCase()
  );
  return stat?.base_stat ?? null;
}
