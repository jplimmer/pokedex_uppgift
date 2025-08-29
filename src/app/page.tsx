import FeaturedList from '@/components/Home/FeaturedList';
import HomeHeader from '@/components/Home/Header';
import SearchBar from '@/components/SearchBar';
import { getAllPokemon } from '@/lib/pokemonData';
import { navigateToSearchedPokemon } from '@/lib/search';

export default async function Home() {
  const allPokemon = await getAllPokemon();
  let pokemonList: string[] = [];
  if (allPokemon) {
    pokemonList = allPokemon.map((p) => p.name);
  } else {
    console.warn('Failed to fetch all pokemon');
  }

  return (
    <>
      <section className="content-grid full-width items-center gap-4 [background-image:linear-gradient(-10deg,_#C97FE4,_#AECDF6)]">
        <HomeHeader />
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
        <FeaturedList />
      </section>
    </>
  );
}
