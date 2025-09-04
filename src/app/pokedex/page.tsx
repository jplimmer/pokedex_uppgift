import { CardListWrapper } from '@/components/pokemon/card-list-wrapper';
import { CardListSkeleton } from '@/components/skeletons/card-list-skeleton';
import { PaginationSkeleton } from '@/components/skeletons/pagination-skeleton';
import { FilterBar, Pagination } from '@/components/ui';
import {
  createPokemonPromises,
  getAllPokemonNames,
} from '@/lib/data/rest-api/pokemon';
import { Metadata } from 'next';
import { Suspense } from 'react';

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
  const currentPage = Number(page) || 1;
  const pageLimit = Number(limit) || 20;
  const offset = (currentPage - 1) * pageLimit;

  const fetchMatchesData = async (query: string, pageLimit: number) => {
    const allPokemonResult = await getAllPokemonNames();
    if (!allPokemonResult.success) {
      return { matches: [], totalPages: 0 };
    }

    const matches = allPokemonResult.data.filter((p) =>
      p.toLowerCase().includes(query.toLowerCase())
    );

    const totalPages = Math.ceil(matches.length / pageLimit);

    return { matches: matches, totalPages: totalPages };
  };

  const getTotalPages = async () => {
    const { totalPages } = await fetchMatchesData(query, pageLimit);
    return totalPages;
  };

  const getFirstPagePromises = async () => {
    const { matches } = await fetchMatchesData(query, pageLimit);
    const firstPageList = matches.slice(offset, offset + pageLimit);
    return createPokemonPromises(firstPageList);
  };

  return (
    <div className="content-grid full-width [background-image:linear-gradient(-10deg,_#f5e6fb,_#eef5fd)] py-8">
      <div className="grid grid-rows-[auto_auto_1fr] items-center space-y-8">
        <h2 className="text-4xl text-center">Pokédex</h2>
        <div className="flex flex-wrap gap-4 justify-around items-center text-neutral-500">
          <FilterBar placeholder="Search Pokémon..." wait={400} className="" />
          <Suspense fallback={<PaginationSkeleton />}>
            <Pagination pagesPromise={getTotalPages()} />
          </Suspense>
        </div>
        <Suspense fallback={<CardListSkeleton numCards={pageLimit} />}>
          <CardListWrapper promiseGenerator={getFirstPagePromises} />
        </Suspense>
      </div>
    </div>
  );
}
