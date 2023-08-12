'use client';

import { Briefcase, Coffee, Filter, Plus } from 'lucide-react';

import { useFilter } from '@/providers/filter-provider';
import { useMode } from '@/providers/mode-provider';

import CafeItem from './cafe.item';
import { JobItem } from './job.item';
import { Pill } from './pill';
import { CAFES, JOBS } from './placholder';

function CafeList() {
  const { filter, onChangeFilter } = useFilter();
  const { setMode } = useMode();

  const locations = CAFES.map((cafe) => cafe.location);

  return (
    <div className="flex gap-[20px]">
      <div className="flex flex-col gap-[15px]">
        <div className="flex gap-[8px] items-center">
          <Filter size={14} />
          <h4>Filter</h4>
        </div>

        <div className="flex flex-col border-[1px] border-black/10 p-[10px] rounded-sm shadow-sm h-fit gap-[20px] w-[250px]">
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
            <Coffee size={14} />
            <h4>Cafe</h4>
            <span className="opacity-50 text-[14px]">{CAFES.length}</span>
          </div>
          <button
            type="button"
            onClick={() => alert('Tambah job')}
            className="text-[14px] flex gap-[5px] items-center rounded-md bg-black text-white py-[4px] px-[8px] hover:bg-black/80 transition border-[1px] border-white/40 "
          >
            <Plus size={14} />
            <span> Kirim Cafe</span>
          </button>
        </div>
        <div className="grid grid-cols-3 gap-[10px]">
          {CAFES.map((cafe, id) => (
            <CafeItem cafe={cafe} key={id} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default CafeList;
