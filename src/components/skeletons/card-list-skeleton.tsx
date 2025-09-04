import { PokemonCardSkeleton } from './pokemon-card-skeleton';

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
