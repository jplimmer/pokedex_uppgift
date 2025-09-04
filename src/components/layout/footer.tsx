import Link from 'next/link';
import Image from 'next/image';
import { ASSET_PATHS } from '@/lib/constants';

export function Footer() {
  return (
    <div className="flex flex-col items-center p-12 gap-6 text-white m-auto">
      <Link href={'/'} className="flex items-center gap-3">
        <Image src={ASSET_PATHS.LOGO} alt="" width={44} height={44} />
        <span className="text-2xl font-jersey">Pokédex</span>
      </Link>
      <p className="text-lg">Explore the world of Pokémon</p>
      <div className="flex w-full items-center justify-evenly">
        <Link href={'/'}>
          <Image src={ASSET_PATHS.FACEBOOK} alt="" width={32} height={32} />
        </Link>
        <Link href={'/'}>
          <Image src={ASSET_PATHS.INSTAGRAM} alt="" width={32} height={32} />
        </Link>
      </div>
    </div>
  );
}
