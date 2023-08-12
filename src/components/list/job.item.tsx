import { Building, CircleDollarSign, MapPin } from 'lucide-react';

import Image from 'next/image';
import Link from 'next/link';

import { getCompanyLogo } from '@/lib/utils';

import type { Job } from './list';

function JobItem({ job }: { job: Job }) {
  return (
    <Link
      target="_blank"
      rel="noopener noreferrer"
      href={job.url}
      className="p-[15px] group transition hover:bg-black/[0.03] hover:border-black/[0.1] border-[1px] rounded-md border-black/10 flex gap-[15px]"
    >
      <div className="w-[30px] h-[30px] bg-black/10 rounded-full relative border-[0.1px] border-black/5">
        <Image
          src={getCompanyLogo(job.company.url)}
          alt={job.company.name}
          quality={100}
          width={30}
          height={30}
          className="rounded-full"
        />
      </div>
      <div className="flex flex-col gap-[5px]">
        <p className="text-[16px] font-medium">{job.position}</p>
        <div className="flex gap-[5px] items-center opacity-50">
          <Building size={14} />
          <p className="text-[14px]">{job.company.name}</p>
        </div>
        <div className="flex gap-[5px] items-center opacity-50">
          <CircleDollarSign size={14} />
          <p className="text-[14px]">{job.salary}</p>
        </div>
        <div className="flex gap-[5px] items-center opacity-50">
          <MapPin size={14} />
          <p className="text-[14px]">{job.company.location}</p>
        </div>
      </div>
      <p className="ml-auto text-[12px] group-hover:opacity-80 opacity-0 transition">↗</p>
    </Link>
  );
}

export { JobItem };
