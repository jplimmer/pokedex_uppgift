import FilterBar from '@/components/FilterBar';
import Pagination from '@/components/Pagination';
import PokemonCard from '@/components/PokemonCard';
import { fetchAllPokemon, fetchPokemonData } from '@/lib/pokemon';
import { routes } from '@/lib/routes';
import Link from 'next/link';

export default async function PokedexPage({
  searchParams,
}: {
  searchParams: { [key: string]: string | undefined };
}) {
  const { query = '', limit, page } = await searchParams;

  // Query all Pokemon
  const pokemonList = await fetchAllPokemon();
  if (!pokemonList) return;

  const matchesList = pokemonList.filter((p) => p.name.includes(query));

  // Limit data all and display with pagination
  const currentPage = Number(page) || 1;
  const pageLimit = Number(limit) || 20;
  const offset = (currentPage - 1) * pageLimit;
  const totalPages = Math.ceil(matchesList.length / pageLimit);

  const limitedList = matchesList.slice(offset, offset + pageLimit);

  const matchesData = await fetchPokemonData(limitedList);

  return (
    <div className="content-grid full-width [background-image:linear-gradient(-10deg,_#f5e6fb,_#eef5fd)] py-8">
      <div className="grid grid-rows-[auto_auto_1fr] space-y-8">
        <h2 className="text-4xl text-center">Pokédex</h2>
        <div className="flex justify-around items-center text-neutral-500">
          <FilterBar placeholder="Search Pokémon..." wait={400} className="" />
          <Pagination totalPages={totalPages} className="" />
        </div>
        <ul className="grid grid-cols-[repeat(auto-fit,minmax(25ch,1fr))] gap-4">
          {matchesData.map(
            (p, i) =>
              p.id && (
                <li key={i} className="w-full justify-items-center">
                  <Link href={`${routes.pokedex.href}/${p.id}`}>
                    <PokemonCard pokemon={p} className="bg-white" />
                  </Link>
                </li>
              )
          )}
        </ul>
      </div>
    </div>
  );
}
