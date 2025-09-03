import { getPokemonTypes } from '@/lib/data/rest-api/pokemon-type';
import { TypeFilterButton } from './type-filter-button';

export async function TypeFilterList() {
  const typesResult = await getPokemonTypes();
  if (!typesResult.success) {
    return <div>Error loading types</div>; // FIX
  }

  const types = typesResult.data;

  return (
    <ul className="grid grid-cols-[repeat(auto-fit,minmax(11ch,1fr))] gap-4 justify-items-center">
      {types.map((type, index) => (
        <li key={index}>
          <TypeFilterButton pokemonType={type} />
        </li>
      ))}
    </ul>
  );
}
