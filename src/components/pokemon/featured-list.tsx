import {
  createPokemonPromises,
  getRandomPokemonNames,
} from '@/lib/data/rest-api/pokemon';
import { CardList } from './card-list';

export async function FeaturedList({ number }: { number: number }) {
  // Get PokemonPromises for FeaturedList, with fallback list
  let featuredPokemon = ['pikachu', 'venasaur', 'charizard', 'blastoise'];

  const randomResult = await getRandomPokemonNames(number);
  if (randomResult.success) {
    featuredPokemon = randomResult.data;
  }

  const featuredPromises = createPokemonPromises(featuredPokemon);

  return <CardList pokemonPromises={featuredPromises} />;
}
