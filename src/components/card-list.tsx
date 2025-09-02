import { Pokemon } from '@/lib/types/types';
import Link from 'next/link';
import PokemonCard from './pokemon-card';
import { ROUTES } from '@/lib/constants';

export default function CardList({ pokemonList }: { pokemonList: Pokemon[] }) {
  return (
    <ul className="grid grid-cols-[repeat(auto-fit,28ch)] gap-4 justify-center">
      {pokemonList.map(
        (p, i) =>
          p.id && (
            // <li key={i} className="w-full justify-items-center">
            <li key={i} className={`grid grid-rows-subgrid row-span-4`}>
              <Link
                href={`${ROUTES.POKEDEX.href}/${p.name}`}
                scroll={false}
                className="contents"
              >
                <PokemonCard pokemon={p} inSubgrid={true} />
              </Link>
            </li>
          )
      )}
    </ul>
  );
}
