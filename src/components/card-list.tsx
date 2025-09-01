import { Pokemon } from '@/lib/app/types';
import Link from 'next/link';
import PokemonCard from './pokemon-card';
import { routes } from '@/lib/app/routes';

export default function CardList({ pokemonList }: { pokemonList: Pokemon[] }) {
  return (
    <ul className="grid grid-cols-[repeat(auto-fit,minmax(25ch,1fr))] gap-4">
      {pokemonList.map(
        (p, i) =>
          p.id && (
            <li key={i} className="w-full justify-items-center">
              <Link href={`${routes.pokedex.href}/${p.name}`} scroll={false}>
                <PokemonCard pokemon={p} />
              </Link>
            </li>
          )
      )}
    </ul>
  );
}
