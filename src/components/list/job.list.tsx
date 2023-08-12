import { Briefcase, Coffee, Filter, Plus } from 'lucide-react';

import { useFilter } from '@/providers/filter-provider';
import { useMode } from '@/providers/mode-provider';
import { useSearchQuery } from '@/providers/search-provider';

import CafeItem from './cafe.item';
import { JobItem } from './job.item';
import type { Job } from './list';
import { Pill } from './pill';
import { CAFES, JOBS } from './placholder';

function JobList() {
  const { filter, onChangeFilter } = useFilter();
  const { searchQuery, setSearchQuery, onSearchQuery } = useSearchQuery();
  const { setMode } = useMode();

  const filteredJobs: Job[] =
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
        <div className="flex gap-[8px] items-center">
          <Filter size={14} />
          <h4>Filter</h4>
        </div>

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
          <div className="flex gap-[8px] items-center">
            <Briefcase size={14} />
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
          {filteredJobs.map((job, id) => (
            <JobItem job={job} key={id} />
          ))}
        </div>
      </div>
      <div className="flex flex-col gap-[10px]">
        <div className="flex gap-[8px] items-center">
          <Coffee size={14} />
          <h4>Rekomendasi cafe</h4>
          <button
            type="button"
            onClick={(e) => setMode('cafe')}
            className="text-[12px] opacity-50 hover:opacity-100 transition ml-auto"
          >
            Cari cafe →
          </button>
        </div>

        <div className="flex flex-col gap-[10px] w-[250px]">
          {CAFES.map((cafe) => (
            <CafeItem cafe={cafe} key={cafe.id} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default JobList;
