import type { Metadata } from 'next';
import { Jaldi, Jersey_10 } from 'next/font/google';
import './globals.css';
import NavBar from '@/components/nav-bar';
import Footer from '@/components/footer';

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
  modal,
}: Readonly<{
  children: React.ReactNode;
  modal: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${jaldi.variable} ${jersey.variable} antialiased flex flex-col min-h-svh`}
      >
        <header className="content-grid full-width bg-white">
          <NavBar />
        </header>
        <main className="flex-1 content-grid full-width">
          {children}
          {modal}
        </main>
        <footer className="content-grid full-width bg-neutral-700">
          <Footer />
        </footer>
      </body>
    </html>
  );
}
