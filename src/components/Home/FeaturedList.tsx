import { getRandomPokemon } from '@/lib/pokemonData';
import CardList from '../CardList';

export default async function FeaturedList({
  number = 4,
}: {
  number?: number;
}) {
  const selectedPokemon = await getRandomPokemon(number);

  return <CardList pokemonList={selectedPokemon} />;
}
