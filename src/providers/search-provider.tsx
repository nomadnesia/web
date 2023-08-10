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

interface SearchQueryContext {
  searchQuery: string | null;
  setSearchQuery: Dispatch<SetStateAction<string | null>>;
  onSearchQuery: (query: string) => void;
}

export const SearchQueryContextImpl = createContext<SearchQueryContext>({
  searchQuery: '',
  setSearchQuery: () => {},
  onSearchQuery: () => {},
});

export function useSearchQuery() {
  return useContext(SearchQueryContextImpl);
}

export function SearchQueryProvider({ children }: { children: React.ReactNode }) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState<string | null>(searchParams?.get('q'));

  const onSearchQuery = useCallback(
    (query: string) => {
      setSearchQuery(query);
      const params = new URLSearchParams(searchParams.toString());
      params.set('q', query);
      router.push(pathname + '?' + params);
    },
    [searchParams, router, pathname],
  );

  return (
    <SearchQueryContextImpl.Provider value={{ searchQuery, setSearchQuery, onSearchQuery }}>
      {children}
    </SearchQueryContextImpl.Provider>
  );
}
