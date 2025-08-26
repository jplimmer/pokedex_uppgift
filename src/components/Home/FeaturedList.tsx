import { getNumberOfPokemon } from '@/lib/pokemon';
import PokemonCard from '../PokemonCard';
import Link from 'next/link';
import { getUniqueRandomInts } from '@/utils/utils';

export default async function FeaturedList({
  number = 4,
  className,
}: {
  number?: number;
  className?: string;
}) {
  const total = await getNumberOfPokemon();
  const selected = getUniqueRandomInts(number, total);

  return (
    <ul
      className={`grid gap-4 grid-cols-[repeat(auto-fit,minmax(25ch,1fr))] content-stretch ${className}`}
    >
      {selected.map((n, index) => (
        <li key={index}>
          <Link href={`/pokemon/${n}`}>
            <PokemonCard id={n} />
          </Link>
        </li>
      ))}
    </ul>
  );
}
