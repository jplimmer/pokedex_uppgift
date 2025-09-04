import { pokemonCardStyle } from '../pokemon';
import Image from 'next/image';
import { ASSET_PATHS } from '@/lib/constants';

export function PokemonCardSkeleton() {
  return (
    <div
      className={`${pokemonCardStyle} relative w-full animate-pulse
    `}
    >
      <Image
        src={ASSET_PATHS.CARD_BACK}
        alt=""
        fill
        className="object-cover opacity-40 rounded-lg"
      />
    </div>
  );
}
