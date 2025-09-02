import { ASSET_PATHS } from '@/lib/constants';
import Image from 'next/image';

export default function Loading() {
  return (
    <div className="flex flex-col items-center justify-center bg-white">
      <Image
        src={ASSET_PATHS.LOADING}
        alt=""
        width={200}
        height={200}
        className="animate-spin"
      />
      <p className="text-3xl">Loading...</p>
    </div>
  );
}
