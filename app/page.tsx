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
    </main>
  );
}
