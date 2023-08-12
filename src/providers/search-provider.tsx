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

const SearchQueryContextImpl = createContext<SearchQueryContext>({
  searchQuery: '',
  setSearchQuery: () => {},
  onSearchQuery: () => {},
});

function useSearchQuery() {
  return useContext(SearchQueryContextImpl);
}

function SearchQueryProvider({ children }: { children: React.ReactNode }) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState<SearchQueryContext['searchQuery']>(
    searchParams?.get('q'),
  );

  const onSearchQuery = useCallback(
    (query: string) => {
      setSearchQuery(query);
      const params = new URLSearchParams(searchParams.toString());
      params.set('q', query);
      // TODO: Why scroll back to the top?
      router.replace(pathname + '?' + params, { scroll: false });
    },
    [searchParams, router, pathname],
  );

  return (
    <SearchQueryContextImpl.Provider value={{ searchQuery, setSearchQuery, onSearchQuery }}>
      {children}
    </SearchQueryContextImpl.Provider>
  );
}

export { SearchQueryProvider, useSearchQuery };
