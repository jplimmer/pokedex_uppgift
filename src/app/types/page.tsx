import CardList from '@/components/card-list';
import Pagination from '@/components/pagination';
import TypeFilterButton from '@/components/type-filter-button';
import {
  createPokemonPromises,
  getAllPokemonNames,
  getIdfromApiUrl,
} from '@/lib/data/rest-api/pokemon';
import { getPokemonTypes } from '@/lib/data/rest-api/pokemon-type';
import { NamedAPIResource } from '@/lib/types/types';
import { Metadata } from 'next';

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

  const matches: string[] = [];

  const typesResult = await getPokemonTypes();
  if (!typesResult.success) return;
  const types = typesResult.data;

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
    if (!allPokemonResult.success) return; // FIX
    matches.push(...allPokemonResult.data);
  }

  // Limit data querying and display with pagination
  const currentPage = Number(page) || 1;
  const pageLimit = Number(limit) || 20;
  const offset = (currentPage - 1) * pageLimit;
  const totalPages = Math.ceil(matches.length / pageLimit);

  const firstPageList = matches.slice(offset, offset + pageLimit);
  const firstPagePromises = createPokemonPromises(firstPageList);

  return (
    <div className="content-grid full-width [background-image:linear-gradient(-10deg,_#f5e6fb,_#eef5fd)] py-8">
      <div className="grid grid-rows-[auto_auto_1fr] space-y-8">
        <h2 className="text-4xl text-center">Types</h2>
        <Pagination
          totalPages={totalPages}
          className="mx-auto text-neutral-500"
        />
        <ul className="grid grid-cols-[repeat(auto-fit,minmax(11ch,1fr))] gap-4 justify-items-center">
          {types.map((type, index) => (
            <li key={index}>
              <TypeFilterButton pokemonType={type} />
            </li>
          ))}
        </ul>
        <CardList pokemonPromises={firstPagePromises} />
      </div>
    </div>
  );
}
