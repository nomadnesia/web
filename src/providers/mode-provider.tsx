'use client';

import { createContext, type Dispatch, type SetStateAction, useContext, useState } from 'react';

import { useSearchParams } from 'next/navigation';

type Mode = 'job' | 'cafe';

interface ModeContext {
  mode: Mode;
  setMode: Dispatch<SetStateAction<Mode>>;
}

const ModeContextImpl = createContext<ModeContext>({
  mode: 'job',
  setMode: () => {},
});

function useMode() {
  return useContext(ModeContextImpl);
}
function ModeProvider({ children }: { children: React.ReactNode }) {
  const searchParams = useSearchParams();
  const [mode, setMode] = useState<Mode>(searchParams?.get('cafe') ? 'cafe' : 'job');

  return <ModeContextImpl.Provider value={{ mode, setMode }}>{children}</ModeContextImpl.Provider>;
}

export { ModeProvider, useMode };
