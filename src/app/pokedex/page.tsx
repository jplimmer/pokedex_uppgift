import CardList from '@/components/card-list';
import FilterBar from '@/components/filter-bar';
import Pagination from '@/components/pagination';
import {
  createPokemonPromises,
  getAllPokemonNames,
} from '@/lib/data/rest-api/pokemon';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Pokédex: All',
  description: 'Search all Pokémon',
};

export default async function PokedexPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | undefined }>;
}) {
  const { query = '', limit, page } = await searchParams;

  // Query all Pokemon
  const allPokemonResult = await getAllPokemonNames();
  if (!allPokemonResult.success) return; // FIX

  const matchesList = allPokemonResult.data.filter((p) =>
    p.toLowerCase().includes(query.toLowerCase())
  );

  // Limit data querying and display with pagination
  const currentPage = Number(page) || 1;
  const pageLimit = Number(limit) || 20;
  const offset = (currentPage - 1) * pageLimit;
  const totalPages = Math.ceil(matchesList.length / pageLimit);

  const firstPageList = matchesList.slice(offset, offset + pageLimit);
  const firstPagePromises = createPokemonPromises(firstPageList);

  return (
    <div className="content-grid full-width [background-image:linear-gradient(-10deg,_#f5e6fb,_#eef5fd)] py-8">
      <div className="grid grid-rows-[auto_auto_1fr] space-y-8">
        <h2 className="text-4xl text-center">Pokédex</h2>
        <div className="flex flex-wrap gap-4 justify-around items-center text-neutral-500">
          <FilterBar placeholder="Search Pokémon..." wait={400} />
          <Pagination totalPages={totalPages} />
        </div>
        <CardList pokemonPromises={firstPagePromises} />
      </div>
    </div>
  );
}
