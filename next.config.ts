import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { hostname: 'pokeapi.com' },
      { hostname: 'raw.githubusercontent.com' },
    ],
  },
};

export default nextConfig;
