'use client';

import { getRandomPokemon } from '@/lib/data/rest-api/pokemon';
import { routes } from '@/lib/app/routes';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

export default function RandomPokemonButton() {
  const router = useRouter();

  const handleRandomSelection = async () => {
    const randomPokemon = await getRandomPokemon(1);

    if (randomPokemon) {
      router.push(`${routes.pokedex.href}/${randomPokemon[0].name}`, {
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
        src="/Dice.svg"
        width={25}
        height={25}
        alt="Dice"
        className="h-auto w-auto"
      />
      <span>Random Pokémon</span>
    </button>
  );
}
