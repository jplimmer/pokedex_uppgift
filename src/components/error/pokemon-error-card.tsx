import { ASSET_PATHS } from '@/lib/constants';
import { pokemonCardStyle } from '../pokemon';
import Image from 'next/image';

export function PokemonErrorCard() {
  return (
    <div className={`${pokemonCardStyle} relative w-full`}>
      <Image
        src={ASSET_PATHS.ERROR}
        alt=""
        fill
        className="object-cover opacity-70 rounded-lg"
      />
    </div>
  );
}
