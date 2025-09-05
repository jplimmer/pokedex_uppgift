import { RandomPokemonButton } from '@/components/pokemon';
import { SearchBar } from '@/components/ui/';
import { navigateToSearchedPokemon } from '@/lib/actions/serverActions';
import { Suspense } from 'react';
import { CardListSkeleton } from '@/components/skeletons/';
import { FeaturedList } from '@/components/pokemon/featured-list';
import { getAllPokemonNames } from '@/lib/data/rest-api/pokemon';

export default function Home() {
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
          allResultsPromise={getAllPokemonNames()}
          placeholder="Search for a Pokémon..."
          className="w-2/3 m-auto"
        />
      </section>
      <section className="content-grid full-width [background-image:linear-gradient(-10deg,_#f5e6fb,_#eef5fd)] pb-12">
        <h2 className="text-center text-4xl p-8">Featured Pokémon</h2>
        <Suspense fallback={<CardListSkeleton numCards={4} />}>
          <FeaturedList number={4} />
        </Suspense>
      </section>
    </>
  );
}
