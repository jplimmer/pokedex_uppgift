import CardList from '@/components/card-list';
import RandomPokemonButton from '@/components/random-pokemon-button';
import SearchBar from '@/components/search-bar';
import { getAllPokemonNames, getRandomPokemon } from '@/lib/pokemonData';
import { navigateToSearchedPokemon } from '@/lib/search';

export default async function Home() {
  const pokemonList = await getAllPokemonNames();
  if (!pokemonList) {
    console.warn('Failed to fetch all pokemon names');
  }

  const featuredList = await getRandomPokemon(4);

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
          allResults={pokemonList}
          className="w-2/3 m-auto"
        />
      </section>
      <section className="content-grid full-width [background-image:linear-gradient(-10deg,_#f5e6fb,_#eef5fd)] pb-12">
        <h2 className="text-bold text-center text-4xl p-8">Featured Pokémon</h2>
        <CardList pokemonList={featuredList} />
      </section>
    </>
  );
}
