import Link from 'next/link';
import Image from 'next/image';

export default function Footer() {
  return (
    <div className="flex flex-col items-center p-12 gap-6 text-white m-auto">
      <Link href={'/'} className="flex items-center gap-3">
        <Image src="/Logo.png" alt="" width={44} height={44} />
        <span className="text-2xl font-jersey">Pokédex</span>
      </Link>
      <p className="text-lg">Explore the world of Pokémon</p>
      <div className="flex w-full items-center justify-evenly">
        <Link href={'/'}>
          <Image src="/Facebook.svg" alt="" width={32} height={32} />
        </Link>
        <Link href={'/'}>
          <Image src="/Instagram.svg" alt="" width={32} height={32} />
        </Link>
      </div>
    </div>
  );
}
