import type { Metadata } from 'next';
import { Jaldi, Jersey_10 } from 'next/font/google';
import './globals.css';
import NavBar from '@/components/NavBar';
import Footer from '@/components/Footer';

const jaldi = Jaldi({
  subsets: ['latin'],
  weight: '400',
  variable: '--font-jaldi',
});

const jersey = Jersey_10({
  subsets: ['latin'],
  weight: '400',
  variable: '--font-jersey',
});

export const metadata: Metadata = {
  title: 'Pokédex',
  description: 'Explore the world of Pokémon',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${jaldi.variable} ${jersey.variable} antialiased`}>
        <header className="content-grid bg-white">
          <NavBar />
        </header>
        {children}
        <footer className="content-grid bg-neutral-700">
          <Footer />
        </footer>
      </body>
    </html>
  );
}
