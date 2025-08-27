import { getRandomPokemonIds } from '@/lib/pokemon';
import PokemonCard from '../PokemonCard';
import Link from 'next/link';
import { routes } from '@/lib/routes';

export default async function FeaturedList({
  number = 4,
  className,
}: {
  number?: number;
  className?: string;
}) {
  const selectedIds = await getRandomPokemonIds(number);

  return (
    <ul
      className={`grid gap-4 grid-cols-[repeat(auto-fit,minmax(25ch,1fr))] content-stretch ${className}`}
    >
      {selectedIds.map((id, index) => (
        <li key={index}>
          <Link href={`${routes.pokedex.href}/${id}`} scroll={false}>
            <PokemonCard id={id} />
          </Link>
        </li>
      ))}
    </ul>
  );
}
