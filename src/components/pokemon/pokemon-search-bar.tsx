import { navigateToSearchedPokemon } from '@/lib/actions/serverActions';
import { SearchBar } from '../ui';
import { getAllPokemonNames } from '@/lib/data/rest-api/pokemon';

export async function PokemonSearchBar({ className }: { className?: string }) {
  // Get list of results for SearchBar
  let pokemonList: string[] | undefined = undefined;
  const pokemonListResult = await getAllPokemonNames();
  if (pokemonListResult.success) {
    pokemonList = pokemonListResult.data;
  }

  return (
    <SearchBar
      searchAction={navigateToSearchedPokemon}
      placeholder="Search for a Pokémon..."
      allResults={pokemonList}
      className={className}
    />
  );
}
