import data from '@/lib/pages.json';
import Link from 'next/link';
import Image from 'next/image';

export default function NavBar() {
  return (
    <nav className="flex items-center justify-between py-4">
      <Link href={'/'} className="flex items-center gap-2">
        <Image src="/Logo.png" alt="" width={32} height={32} />
        <span className="font-bold">Pokédex</span>
      </Link>
      <ul className="flex gap-4">
        {data['pages'].map((link, index) => (
          <li key={index}>
            <Link
              href={link.href}
              className="p-2 text-lg hover:bg-amber-500/80"
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
