import PokemonCard from '@/components/pokemon-card';
import {
  fetchPokemonByNameOrId,
  getAllPokemon,
} from '@/lib/data/rest-api/pokemon';

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
