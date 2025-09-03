'use server';

import { redirect } from 'next/navigation';
import { ROUTES } from '../constants';
import { fetchPokemonByNameOrId } from '../data/rest-api/pokemon';

export async function navigateToSearchedPokemon(formData: FormData) {
  const searchTerm = formData.get('search') as string;
  if (!searchTerm) return; // FIX

  const pokemonResult = await fetchPokemonByNameOrId(searchTerm);
  if (!pokemonResult.success) return; // FIX

  redirect(`${ROUTES.POKEDEX.href}/${pokemonResult.data.name}`);
}
