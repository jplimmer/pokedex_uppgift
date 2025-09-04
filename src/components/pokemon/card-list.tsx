import { PokemonPromise } from '@/lib/types/types';
import Link from 'next/link';
import { PokemonCard } from './pokemon-card';
import { ROUTES } from '@/lib/constants';

export function CardList({
  pokemonPromises,
}: {
  pokemonPromises: PokemonPromise[];
}) {
  return (
    <ul className="grid grid-cols-[repeat(auto-fit,15rem)] gap-4 justify-center">
      {pokemonPromises.map((promise, i) => (
        <li key={i} className={`contents`}>
          <Link
            href={`${ROUTES.POKEDEX.href}/${promise.name}`}
            scroll={false}
            className="contents"
          >
            <PokemonCard pokemonPromise={promise.promise} inSubgrid={true} />
          </Link>
        </li>
      ))}
    </ul>
  );
}
