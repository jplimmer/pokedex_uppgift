import { Modal } from '@/components/Modal';
import PokemonCard from '@/components/PokemonCard';
import { fetchPokemonByNameOrId } from '@/lib/pokemonData';

export default async function CardModal({
  params,
}: {
  params: { name: string };
}) {
  const { name } = await params;

  const pokemon = await fetchPokemonByNameOrId(name);

  if (!pokemon) return;

  return (
    <Modal dialogClassName="min-w-[40ch] [background-image:linear-gradient(-10deg,_#C97FE4,_#AECDF6)]">
      <PokemonCard pokemon={pokemon} />
    </Modal>
  );
}
