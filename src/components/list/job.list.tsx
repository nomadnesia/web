import { Building, CircleDollarSign, MapPin, Plus, Star } from 'lucide-react';

import Image from 'next/image';
import Link from 'next/link';

import { getCompanyLogo } from '@/lib/utils';
import { useFilter } from '@/providers/filter-provider';
import { useSearchQuery } from '@/providers/search-provider';

import { Pill } from './pill';
import { CAFES, JOBS } from './placholder';

function JobList() {
  const { filter, onChangeFilter } = useFilter();
  const { searchQuery, setSearchQuery, onSearchQuery } = useSearchQuery();

  const filteredJobs =
    searchQuery && searchQuery?.length > 0
      ? JOBS.filter((job) => {
          job.position.toLowerCase().includes(searchQuery.toLowerCase());
        })
      : JOBS;

  const categories = JOBS.flatMap((job) =>
    job.category.flatMap((category) => ({ name: category.name, id: category.id })),
  );
  const locations = JOBS.map((job) => job.company.location);

  return (
    <div className="flex gap-[20px]">
      <div className="flex flex-col gap-[15px]">
        <h4>Filter</h4>
        <div className="flex flex-col border-[1px] border-black/10 p-[10px] rounded-sm shadow-sm h-fit gap-[20px] w-[250px]">
          <div className="flex flex-col gap-[10px]">
            <p className="opacity-80 text-[14px] font-medium">Kategori</p>
            <div className="flex flex-wrap gap-[5px]">
              {categories.map(({ id, name }) => (
                <Pill
                  key={id}
                  isSelected={filter === name.toLocaleLowerCase()}
                  onClick={(e) => onChangeFilter(name.toLocaleLowerCase())}
                >
                  {name}
                </Pill>
              ))}
            </div>
          </div>
          <div className="flex flex-col gap-[10px]">
            <p className="opacity-80 text-[14px] font-medium">Lokasi</p>
            <div className="flex flex-wrap gap-[5px]">
              {locations.map((item, id) => (
                <Pill key={id} isSelected={filter === item.toLocaleLowerCase()}>
                  {item}
                </Pill>
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-[10px] w-full">
        <div className="flex items-center justify-between w-full">
          <div className="flex gap-[5px] items-center">
            <h4>Pekerjaan</h4>
            <span className="opacity-50 text-[14px]">{filteredJobs.length}</span>
          </div>

          <button
            type="button"
            onClick={() => alert('Tambah job')}
            className="text-[14px] flex gap-[5px] items-center rounded-md bg-black text-white py-[4px] px-[8px] hover:bg-black/80 transition border-[1px] border-white/40 "
          >
            <Plus size={14} />
            <span> Kirim Pekerjaan</span>
          </button>
        </div>
        <div className="flex flex-col gap-[10px]">
          {filteredJobs.map((job) => (
            <Link
              target="_blank"
              rel="noopener noreferrer"
              href={job.url}
              key={job.id}
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
          ))}
        </div>
      </div>
      <div className="flex flex-col gap-[10px]">
        <div className="flex gap-[5px] items-center">
          <h4>Rekomendasi cafe</h4>
          <span className="opacity-50 text-[14px]">{filteredJobs.length}</span>
        </div>
        <div className="flex flex-col gap-[10px] w-[250px]">
          {CAFES.map((cafe) => (
            <Link
              target="_blank"
              rel="noopener noreferrer"
              href={cafe.url}
              key={cafe.id}
              className="border-[1px] rounded-md border-black/10 flex flex-col transition hover:bg-black/[0.03] hover:border-black/[0.1]"
            >
              <div className="relative w-full h-[150px]">
                <Image
                  src={cafe.image}
                  alt={cafe.name}
                  quality={100}
                  fill
                  className="object-cover"
                />
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
          ))}
        </div>
      </div>
    </div>
  );
}

export default JobList;
