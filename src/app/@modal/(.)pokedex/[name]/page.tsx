import LoadingSpinner from '@/components/loading/loading-spinner';
import { Modal } from '@/components/modal';
import PokemonCard from '@/components/pokemon-card';
import { createPokemonPromises } from '@/lib/data/rest-api/pokemon';
import { Suspense } from 'react';

export default async function CardModal({
  params,
}: {
  params: Promise<{ name: string }>;
}) {
  const { name } = await params;
  const pokemonPromise = createPokemonPromises([name])[0];

  return (
    <Modal dialogClassName="w-[40ch] [background-image:linear-gradient(-10deg,_#C97FE4,_#AECDF6)]">
      <Suspense fallback={<LoadingSpinner />}>
        <PokemonCard pokemonPromise={pokemonPromise.promise} />
      </Suspense>
    </Modal>
  );
}
