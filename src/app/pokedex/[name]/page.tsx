import PokemonCard from '@/components/pokemon-card';
import {
  fetchPokemonByNameOrId,
  getAllPokemon,
} from '@/lib/data/rest-api/pokemon';
import { capitaliseFirstLetter } from '@/utils/strings';
import { Metadata } from 'next';

export async function generateStaticParams() {
  const pokemonList = await getAllPokemon();
  if (pokemonList) {
    return pokemonList.map((p) => ({
      name: p.name,
    }));
  } else {
    console.warn('Static params could not be generated, getAllPokemon failed');
  }
}

export async function generateMetadata({
  params,
}: {
  params: { name: string };
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
  params: { name: string };
}) {
  const { name } = await params;
  const pokemon = await fetchPokemonByNameOrId(name);
  if (!pokemon) return;

  return (
    <div className="content-grid full-width justify-items-center items-center [background-image:linear-gradient(-10deg,_#f5e6fb,_#eef5fd)]">
      <div className="w-[25ch]">
        <PokemonCard pokemon={pokemon} />
      </div>
    </div>
  );
}
