'use client';

import { ASSET_PATHS, ROUTES } from '@/lib/constants';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';

export function NavBar() {
  const pathname = usePathname();

  return (
    <nav className="flex items-center justify-between">
      <Link href={'/'} className="flex items-center gap-3 h-full py-4">
        <Image src={ASSET_PATHS.LOGO} alt="" width={44} height={44} />
        <span className="text-2xl font-jersey text-transparent bg-gradient-to-r from-purple-800 to-blue-800 [background-clip:text]">
          Pokédex
        </span>
      </Link>
      <ul className="flex h-full">
        {Object.values(ROUTES).map((route, index) => {
          const isActive = pathname === route.href;

          return (
            <li key={index} className="flex h-full">
              <Link
                href={route.href}
                className={`flex items-center text-lg hover:bg-amber-500/80 h-full p-4 ${
                  isActive ? 'underline underline-offset-8' : ''
                }`}
              >
                {route.label}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
