import { Modal } from '@/components/Modal';
import PokemonCard from '@/components/PokemonCard';
import { getPokemonById } from '@/lib/pokemon';

export default async function CardModal({
  params,
}: {
  params: { id: string };
}) {
  const { id } = await params;

  const pokemon = await getPokemonById(id);

  if (!pokemon) return;

  return (
    <Modal dialogClassName="[background-image:linear-gradient(-10deg,_#C97FE4,_#AECDF6)]">
      <PokemonCard id={id} />
    </Modal>
  );
}
