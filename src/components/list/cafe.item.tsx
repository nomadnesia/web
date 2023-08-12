import { MapPin, Star } from 'lucide-react';

import Image from 'next/image';
import Link from 'next/link';

import type { Cafe } from './list';

function CafeItem({ cafe }: { cafe: Cafe }) {
  return (
    <Link
      target="_blank"
      rel="noopener noreferrer"
      href={cafe.url}
      className="border-[1px] rounded-md border-black/10 flex flex-col transition hover:bg-black/[0.03] hover:border-black/[0.1]"
    >
      <div className="relative w-full h-[150px]">
        <Image src={cafe.image} alt={cafe.name} quality={100} fill className="object-cover" />
      </div>
      <div className="flex flex-col gap-[5px] p-[10px]">
        <p className="font-medium">{cafe.name}</p>
        <div className="flex gap-[5px] items-center opacity-50">
          <MapPin size={14} />
          <p className="text-[14px]">{cafe.location}</p>
        </div>
        <div className="flex gap-[5px] items-center opacity-50">
          <Star size={14} />
          <p className="text-[14px]">{cafe.rating}</p>
        </div>
      </div>
    </Link>
  );
}

export { CafeItem };
