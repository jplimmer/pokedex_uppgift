import Image from 'next/image';

export default function HomeHeader() {
  return (
    <>
      <h1 className="text-center mt-14 text-8xl font-extrabold text-transparent bg-gradient-to-r from-purple-800 to-blue-800 [background-clip:text]">
        Gotta catch &apos;em all!
      </h1>
      <p className="text-center text-white text-xl">
        Discover, search and explore the amazing world of Pokémon. Find
        <br /> your favourite and learn about their stats.
      </p>
      <button className="btn-primary w-1/3 m-auto">
        <Image src="/Dice.svg" width={25} height={25} alt="Dice" />
        <span>Random Pokémon</span>
      </button>
    </>
  );
}
