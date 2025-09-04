import { ASSET_PATHS } from '@/lib/constants';
import { pokemonCardStyle } from '../pokemon';
import Image from 'next/image';

export function CardListSkeleton({ numCards }: { numCards: number }) {
  const list = Array.from({ length: numCards }, (_, i) => i + 1);

  return (
    <ul className="grid grid-cols-[repeat(auto-fit,15rem)] gap-4 justify-center">
      {list.map((i) => (
        <li key={i}>
          <PokemonCardSkeleton />
        </li>
      ))}
    </ul>
  );
}

export function PokemonCardSkeleton() {
  return (
    <div className={`${pokemonCardStyle} relative w-full animate-pulse`}>
      <Image
        src={ASSET_PATHS.CARD_BACK}
        alt=""
        fill
        className="object-cover opacity-40 rounded-lg"
      />
    </div>
  );
}
