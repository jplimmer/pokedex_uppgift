import { LoadingSpinner } from '@/components/loading';
import { Modal } from '@/components/ui';
import { PokemonCard } from '@/components/pokemon/';
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
    <Modal dialogClassName="[background-image:linear-gradient(-10deg,_#C97FE4,_#AECDF6)]">
      <Suspense
        fallback={
          <div className="flex justify-center items-center w-[15rem] aspect-[5/7]">
            <LoadingSpinner />
          </div>
        }
      >
        <PokemonCard pokemonPromise={pokemonPromise.promise} />
      </Suspense>
    </Modal>
  );
}
