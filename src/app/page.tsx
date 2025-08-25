import FeaturedList from '@/components/Home/FeaturedList';
import HomeHeader from '@/components/Home/Header';
import SearchBar from '@/components/SearchBar';

export default function Home() {
  return (
    <main className="content-grid">
      <section className="content-grid full-width items-center gap-4 bg-gradient-to-br [background-image:linear-gradient(-10deg,_#C97FE4,_#AECDF6)]">
        <HomeHeader />
      </section>
      <section className="content-grid full-width bg-white py-4">
        <SearchBar className="w-2/3 m-auto" />
      </section>
      <section className="content-grid full-width bg-purple-100">
        <h2 className="text-bold text-center text-4xl p-8">Featured Pokémon</h2>
        <FeaturedList className="pb-12" />
      </section>
    </main>
  );
}
