import { Modal } from '@/components/Modal';
import PokemonCard from '@/components/PokemonCard';
import { fetchPokemonById } from '@/lib/pokemon';

export default async function CardModal({
  params,
}: {
  params: { id: string };
}) {
  const { id } = await params;

  const pokemon = await fetchPokemonById(id);

  if (!pokemon) return;

  return (
    <Modal dialogClassName="[background-image:linear-gradient(-10deg,_#C97FE4,_#AECDF6)]">
      <PokemonCard id={id} />
    </Modal>
  );
}
