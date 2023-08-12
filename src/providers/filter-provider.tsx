'use client';

import {
  createContext,
  type Dispatch,
  type SetStateAction,
  useCallback,
  useContext,
  useState,
} from 'react';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';

interface FilterContext {
  filter: string | null;
  setFilter: Dispatch<SetStateAction<string | null>>;
  onChangeFilter: (filter: string) => void;
}

const FilterContextImpl = createContext<FilterContext>({
  filter: 'job',
  setFilter: () => {},
  onChangeFilter: () => {},
});

function useFilter() {
  return useContext(FilterContextImpl);
}
function FilterProvider({ children }: { children: React.ReactNode }) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();
  const [filter, setFilter] = useState<FilterContext['filter']>(searchParams?.get('filter'));

  const onChangeFilter = useCallback(
    (query: string) => {
      setFilter(query);
      const params = new URLSearchParams(searchParams.toString());
      params.set('filter', query);
      router.push(pathname + '?' + params);
    },
    [searchParams, router, pathname],
  );
  return (
    <FilterContextImpl.Provider value={{ filter, setFilter, onChangeFilter }}>
      {children}
    </FilterContextImpl.Provider>
  );
}

export { FilterProvider, useFilter };
