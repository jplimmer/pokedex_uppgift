import { CardListWrapper } from '@/components/pokemon';
import { CardListSkeleton, PaginationSkeleton } from '@/components/skeletons';
import { Pagination } from '@/components/ui';
import {
  createPokemonPromises,
  getAllPokemonNames,
  getIdfromApiUrl,
} from '@/lib/data/rest-api/pokemon';
import { getPokemonTypes } from '@/lib/data/rest-api/pokemon-type';
import { NamedAPIResource } from '@/lib/types/types';
import { Metadata } from 'next';
import { Suspense } from 'react';

export const metadata: Metadata = {
  title: 'Pokédex: Types',
  description: 'Filter Pokémon by type',
};

export default async function TypesPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const { type, page, limit } = await searchParams;
  const typeParams = type ? (Array.isArray(type) ? type : [type]) : [];
  const currentPage = Number(page) || 1;
  const pageLimit = Number(limit) || 20;
  const offset = (currentPage - 1) * pageLimit;

  const getTypes = async () => {
    const typesResult = await getPokemonTypes();
    if (!typesResult.success) {
      return [];
    }
    return typesResult.data;
  };

  async function fetchMatchesData(typeParams: string[], pageLimit: number) {
    const matches: string[] = [];

    const types = await getTypes();

    if (typeParams.length !== 0) {
      // Get combined list of pokemon for all selected types
      const seenUrls = new Set();
      const combinedList: NamedAPIResource[] = [];

      for (const t of typeParams) {
        // Get all Pokémon from each type
        const typeIndex = types.findIndex((type) => type.name === t);
        if (typeIndex !== -1 && types[typeIndex].pokemon) {
          // Add to matchesList if not already there
          types[typeIndex].pokemon.forEach((item) => {
            if (!seenUrls.has(item.url)) {
              seenUrls.add(item.url);
              combinedList.push(item);
            }
          });
        }
      }
      // Sort list by ID
      const sortedList = combinedList.sort((a, b) => {
        const aId = getIdfromApiUrl(a.url);
        const bId = getIdfromApiUrl(b.url);
        return parseInt(aId) - parseInt(bId);
      });
      matches.push(...sortedList.map((p) => p.name));
    } else {
      // Get all Pokémon if no type filter specified
      const allPokemonResult = await getAllPokemonNames();
      if (!allPokemonResult.success) {
        return { matches: [], totalPages: 0 };
      }
      matches.push(...allPokemonResult.data);
    }

    const totalPages = Math.ceil(matches.length / pageLimit);

    return { matches: matches, totalPages: totalPages };
  }

  const getTotalPages = async () => {
    const { totalPages } = await fetchMatchesData(typeParams, pageLimit);
    return totalPages;
  };

  const getFirstPagePromises = async () => {
    const { matches } = await fetchMatchesData(typeParams, pageLimit);
    const firstPageList = matches.slice(offset, offset + pageLimit);
    return createPokemonPromises(firstPageList);
  };

  return (
    <>
      <Suspense
        fallback={<PaginationSkeleton className="mx-auto text-neutral-500" />}
      >
        <Pagination
          pagesPromise={getTotalPages()}
          className="mx-auto text-neutral-500"
        />
      </Suspense>
      <Suspense fallback={<CardListSkeleton numCards={pageLimit} />}>
        <CardListWrapper promiseGenerator={getFirstPagePromises} />
      </Suspense>
    </>
  );
}
