import Link from 'next/link';
import Image from 'next/image';

export default function Footer() {
  return (
    <div className="flex flex-col items-center p-8 gap-4 text-white m-auto">
      <Link href={'/'} className="flex items-center gap-2">
        <Image src="/Logo.png" alt="" width={32} height={32} />
        <span className="font-bold">Pokédex</span>
      </Link>
      <p>Explore the world of Pokémon</p>
      <div className="flex w-full items-center justify-evenly">
        <Link href={'/'}>
          <Image
            src="/Facebook.svg"
            alt=""
            width={32}
            height={32}
            className="h-auto w-auto"
          />
        </Link>
        <Link href={'/'}>
          <Image
            src="/Instagram.svg"
            alt=""
            width={32}
            height={32}
            className="h-auto w-auto"
          />
        </Link>
      </div>
    </div>
  );
}
