import data from '@/lib/pages.json';
import Link from 'next/link';
import Image from 'next/image';

export default function NavBar() {
  return (
    <nav className="flex items-center justify-between">
      <Link href={'/'} className="flex items-center gap-2">
        <Image src="/Logo.png" alt="" width={32} height={32} />
        <span className="font-bold">Pokédex</span>
      </Link>
      <ul className="flex h-full">
        {data['pages'].map((link, index) => (
          <li key={index} className="flex h-full">
            <Link
              href={link.href}
              className="flex items-center text-lg hover:bg-amber-500/80 h-full p-4"
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
