import CardList from '@/components/card-list';
import Pagination from '@/components/pagination';
import TypeFilterButton from '@/components/type-filter-button';
import { getAllPokemon, getPokemonData } from '@/lib/pokemonData';
import { getPokemonTypes } from '@/lib/pokemonTypeData';
import { GroupResultItem } from '@/lib/types';

export default async function TypesPage({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const { type, page, limit } = await searchParams;
  const typeParams = Array.isArray(type) ? type : type ? [type] : [];

  const matchesList: GroupResultItem[] = [];

  const types = await getPokemonTypes();
  if (!types) return;

  if (typeParams.length !== 0) {
    // Get all Pokémon matching type parameters
    for (const t of typeParams) {
      const typeIndex = types.findIndex((type) => type.name === t);
      if (typeIndex !== -1 && types[typeIndex].pokemon) {
        matchesList.push(...types[typeIndex].pokemon);
      }
    }
  } else {
    // Get all Pokémon if no type filter specified
    const allPokemon = await getAllPokemon();
    if (!allPokemon) return;
    matchesList.push(...allPokemon);
  }

  // Limit data querying and display with pagination
  const currentPage = Number(page) || 1;
  const pageLimit = Number(limit) || 20;
  const offset = (currentPage - 1) * pageLimit;
  const totalPages = Math.ceil(matchesList.length / pageLimit);

  const limitedList = matchesList.slice(offset, offset + pageLimit);

  const matchesData = await getPokemonData(limitedList);

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
        <CardList pokemonList={matchesData} />
      </div>
    </div>
  );
}
