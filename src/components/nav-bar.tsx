import { ROUTES } from '@/lib/constants';
import Link from 'next/link';
import Image from 'next/image';

export default function NavBar() {
  return (
    <nav className="flex items-center justify-between">
      <Link href={'/'} className="flex items-center gap-3 h-full py-4">
        <Image src="/Logo.png" alt="" width={44} height={44} />
        <span className="text-2xl font-jersey text-transparent bg-gradient-to-r from-purple-800 to-blue-800 [background-clip:text]">
          Pokédex
        </span>
      </Link>
      <ul className="flex h-full">
        {Object.values(ROUTES).map((route, index) => (
          <li key={index} className="flex h-full">
            <Link
              href={route.href}
              className="flex items-center text-lg hover:bg-amber-500/80 h-full p-4"
            >
              {route.label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
