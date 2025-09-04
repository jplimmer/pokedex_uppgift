import { PokemonCard } from '@/components/pokemon';
import {
  createPokemonPromises,
  fetchPokemonByNameOrId,
  getAllPokemonNames,
} from '@/lib/data/rest-api/pokemon';
import { capitaliseFirstLetter } from '@/utils/strings';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';

// Cache revalidates once per day
export const revalidate = 84600;

export async function generateStaticParams() {
  const allPokemonResult = await getAllPokemonNames();
  if (allPokemonResult.success) {
    // Pre-generate Gen 1 Pokémon at build time
    return allPokemonResult.data.slice(0, 151).map((p) => ({ name: p }));
  } else {
    console.warn('Pokémon names not found, no dynamic pages pre-rendered');
    return [];
  }
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ name: string }>;
}): Promise<Metadata> {
  const { name } = await params;
  const pokemonResult = await fetchPokemonByNameOrId(name);
  if (pokemonResult.success) {
    return {
      title: `Pokédex: ${capitaliseFirstLetter(pokemonResult.data.name)}`,
      description: `Pokédex entry for ${capitaliseFirstLetter(pokemonResult.data.name)}`,
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
  const allPokemonResult = await getAllPokemonNames();
  if (!allPokemonResult.success) return; // FIX

  const match = allPokemonResult.data.find(
    (p) => p.toLowerCase() === name.toLowerCase()
  );
  if (!match) notFound();

  const pokemonPromise = createPokemonPromises([match])[0];

  return (
    <div className="content-grid full-width justify-items-center items-center [background-image:linear-gradient(-10deg,_#f5e6fb,_#eef5fd)]">
      <div className="w-[25ch]">
        <PokemonCard pokemonPromise={pokemonPromise.promise} />
      </div>
    </div>
  );
}
