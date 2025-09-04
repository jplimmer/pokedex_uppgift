import { PokemonPromise } from '@/lib/types/types';
import { CardList } from './card-list';

export async function CardListWrapper({
  promiseGenerator,
}: {
  promiseGenerator: () => Promise<PokemonPromise[]>;
}) {
  const pokemonPromises = await promiseGenerator();

  return <CardList pokemonPromises={pokemonPromises} />;
}
