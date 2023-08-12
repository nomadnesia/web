import { Header } from '@/components/header';
import { List } from '@/components/list';
import { ModeProvider } from '@/providers/mode-provider';
import { SearchQueryProvider } from '@/providers/search-provider';

export default function HomePage() {
  return (
    <ModeProvider>
      <SearchQueryProvider>
        <main className="w-full min-w-screen">
          <Header />
          <List />
        </main>
      </SearchQueryProvider>
    </ModeProvider>
  );
}
