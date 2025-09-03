import { CardList, RandomPokemonButton } from '@/components/pokemon';
import { SearchBar } from '@/components/ui/';
import {
  createPokemonPromises,
  getAllPokemonNames,
  getRandomPokemonNames,
} from '@/lib/data/rest-api/pokemon';
import { navigateToSearchedPokemon } from '@/lib/actions/serverActions';

export default async function Home() {
  // Get list of results for SearchBar
  let pokemonList: string[] | undefined = undefined;
  const pokemonListResult = await getAllPokemonNames();
  if (pokemonListResult.success) {
    pokemonList = pokemonListResult.data;
  }

  // Get PokemonPromises for FeaturedList, with fallback list
  let featuredPokemon = ['pikachu', 'venasaur', 'charizard', 'blastoise'];

  const randomResult = await getRandomPokemonNames(4);
  if (randomResult.success) {
    featuredPokemon = randomResult.data;
  }

  const featuredPromises = createPokemonPromises(featuredPokemon);

  return (
    <>
      <section className="content-grid full-width items-center gap-4 [background-image:linear-gradient(-10deg,_#C97FE4,_#AECDF6)]">
        <h1 className="text-center mt-14 text-8xl font-extrabold text-transparent bg-gradient-to-r from-purple-800 to-blue-800 [background-clip:text]">
          Gotta catch &apos;em all!
        </h1>
        <p className="text-center text-white text-xl">
          Discover, search and explore the amazing world of Pokémon. Find
          <br /> your favourite and learn about their stats.
        </p>
        <RandomPokemonButton />
      </section>
      <section className="content-grid full-width bg-white py-8">
        <SearchBar
          searchAction={navigateToSearchedPokemon}
          placeholder="Search for a Pokémon..."
          allResults={pokemonList}
          className="w-2/3 m-auto"
        />
      </section>
      <section className="content-grid full-width [background-image:linear-gradient(-10deg,_#f5e6fb,_#eef5fd)] pb-12">
        <h2 className="text-bold text-center text-4xl p-8">Featured Pokémon</h2>
        <CardList pokemonPromises={featuredPromises} />
      </section>
    </>
  );
}
