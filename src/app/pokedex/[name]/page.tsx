import PokemonCard from '@/components/pokemon-card';
import {
  fetchPokemonByNameOrId,
  getAllPokemonNames,
} from '@/lib/data/rest-api/pokemon';
import { capitaliseFirstLetter } from '@/utils/strings';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';

// Cache revalidates once per day
export const revalidate = 84600;

export async function generateStaticParams() {
  const pokemonList = await getAllPokemonNames();
  // Pre-generate Gen 1 Pokémon at build time
  return pokemonList.slice(0, 151).map((p) => ({ name: p }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ name: string }>;
}): Promise<Metadata> {
  const { name } = await params;
  const pokemon = await fetchPokemonByNameOrId(name);
  if (pokemon) {
    return {
      title: `Pokédex: ${capitaliseFirstLetter(pokemon.name)}`,
      description: `Pokédex entry for ${capitaliseFirstLetter(pokemon.name)}`,
    };
  } else {
    return {
      title: 'Pokédex',
      description: '',
    };
  }
}

export default async function PokedexResult({
  params,
}: {
  params: Promise<{ name: string }>;
}) {
  const { name } = await params;
  const allPokemon = await getAllPokemonNames();

  const match = allPokemon.find((p) => p.toLowerCase() === name.toLowerCase());
  if (!match) notFound();

  const pokemon = await fetchPokemonByNameOrId(name);
  if (!pokemon) notFound();

  return (
    <div className="content-grid full-width justify-items-center items-center [background-image:linear-gradient(-10deg,_#f5e6fb,_#eef5fd)]">
      <div className="w-[25ch]">
        <PokemonCard pokemon={pokemon} />
      </div>
    </div>
  );
}
