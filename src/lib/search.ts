'use server';

import { redirect } from 'next/navigation';
import { routes } from './routes';
import { fetchPokemonByNameOrId } from './pokemonData';

export async function navigateToSearchedPokemon(formData: FormData) {
  const searchTerm = formData.get('search') as string;
  if (!searchTerm) return;

  const pokemon = await fetchPokemonByNameOrId(searchTerm);
  if (!pokemon) return;

  redirect(`${routes.pokedex.href}/${pokemon.name}`);
}
