'use client';

import { getRandomPokemonNames } from '@/lib/data/rest-api/pokemon';
import { ASSET_PATHS, ROUTES } from '@/lib/constants';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

export default function RandomPokemonButton() {
  const router = useRouter();

  const handleRandomSelection = async () => {
    const randomPokemonResult = await getRandomPokemonNames(1);

    if (randomPokemonResult.success) {
      router.push(`${ROUTES.POKEDEX.href}/${randomPokemonResult.data[0]}`, {
        scroll: false,
      });
    } else {
      console.error('No random Pokémon found, Link not set');
    }
  };

  return (
    <button
      onClick={handleRandomSelection}
      className="btn-primary w-1/3 m-auto"
    >
      <Image
        src={ASSET_PATHS.DICE}
        width={25}
        height={25}
        alt="Dice"
        className="h-auto w-auto"
      />
      <span>Random Pokémon</span>
    </button>
  );
}
