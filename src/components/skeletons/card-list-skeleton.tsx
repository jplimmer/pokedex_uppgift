import { PokemonCardSkeleton } from './pokemon-card-skeleton';

export function CardListSkeleton({ numCards }: { numCards: number }) {
  const list = Array.from({ length: numCards }, (_, i) => i + 1);

  return (
    <ul className="grid grid-cols-[repeat(auto-fit,13rem)] gap-4 justify-center">
      {list.map((i) => (
        <li key={i} className="grid grid-rows-subgrid row-span-4">
          <PokemonCardSkeleton />
        </li>
      ))}
    </ul>
  );
}
