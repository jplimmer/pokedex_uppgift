import PokemonCard from '@/components/PokemonCard';
import { getNumberOfPokemon, fetchPokemonById } from '@/lib/pokemon';

export async function generateStaticParams() {
  const maxId = await getNumberOfPokemon();

  return Array.from({ length: maxId }, (_, i) => ({
    id: String(i + 1),
  }));
}

export default async function PokedexResult({
  params,
}: {
  params: { id: string };
}) {
  const { id } = await params;
  const pokemon = await fetchPokemonById(id);

  if (!pokemon) return;

  return (
    <div className="content-grid full-width justify-items-center items-center [background-image:linear-gradient(-10deg,_#f5e6fb,_#eef5fd)]">
      <div className="w-[25ch]">
        <PokemonCard id={id} />
      </div>
    </div>
  );
}
