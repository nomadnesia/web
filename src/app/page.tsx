import { Header } from '@/components/header';
import { ModeProvider } from '@/providers/mode-provider';
import { SearchQueryProvider } from '@/providers/search-provider';

export default function HomePage() {
  return (
    <ModeProvider>
      <SearchQueryProvider>
        <main className="w-full min-w-screen">
          <Header />
        </main>
      </SearchQueryProvider>
    </ModeProvider>
  );
}
