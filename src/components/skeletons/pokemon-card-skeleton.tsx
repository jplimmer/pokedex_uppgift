import { pokemonCardStyle } from '../pokemon';

export function PokemonCardSkeleton() {
  return (
    <div className={`${pokemonCardStyle} bg-neutral-100 animate-pulse`}></div>
  );
}
