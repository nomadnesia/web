'use client';

import { FilterProvider } from '@/providers/filter-provider';
import { useMode } from '@/providers/mode-provider';

import CafeList from './cafe.list';
import JobList from './job.list';

function List() {
  const { mode, setMode } = useMode();
  return (
    <FilterProvider>
      <section className="flex flex-col p-[24px]">
        <div className="min-w-[1200px] mx-auto flex flex-col gap-[20px]">
          {mode === 'cafe' ? <CafeList /> : <JobList />}
        </div>
      </section>
    </FilterProvider>
  );
}

export { List };
