'use client';

import { useCallback, useState } from 'react';
import { Search } from 'lucide-react';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

import { cn } from '@/lib/utils';

import { ModeSwitch } from '.';

function Header() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const [mode, setMode] = useState<'job' | 'cafe'>(searchParams?.get('cafe') ? 'cafe' : 'job');
  const [query, setQuery] = useState<string | null>(searchParams?.get('q') ?? null);

  const changeMode = useCallback(
    (checked: boolean) => {
      if (!searchParams) return;
      if (!pathname) return;
      const params = new URLSearchParams(searchParams.toString());
      /* Clear search query on switch */
      if (searchParams.get('q')) {
        setQuery(null);
        params.delete('q');
      }
      /* Enable cafe mode when true */
      if (checked) {
        params.set('cafe', 'true');
        router.push(pathname + '?' + params);
        setMode('cafe');
        return;
      }

      params.delete('cafe');
      setMode('job');
      router.push(pathname);

      return;
    },
    [searchParams, router, pathname],
  );

  const handleSearch = useCallback(
    (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      const params = new URLSearchParams(searchParams.toString());
      params.set('q', e.currentTarget.search.value);
      router.push(pathname + '?' + params);
    },
    [searchParams, router, pathname],
  );

  return (
    <section className="w-full min-h-[350px] h-fit relative bg-black">
      {mode === 'cafe' ? (
        <Image
          src={'/header-cafe.jpg'}
          alt="Cover"
          className="z-0 h-full opacity-50"
          objectFit="cover"
          layout="fill"
        />
      ) : (
        <Image
          src={'/header-work.jpg'}
          alt="Cover"
          className="z-0 h-full opacity-50"
          objectFit="cover"
          layout="fill"
        />
      )}
      <Link
        href="https://www.behance.net/ainaraza994c69"
        target="_blank"
        className="absolute bottom-2 left-2 z-10 text-[10px] text-white/50"
      >
        Art by Aleena
      </Link>
      <div className="flex flex-col z-5 absolute gap-[20px] w-full h-full items-center  justify-center">
        <div className="flex gap-[10px] group items-center">
          <p
            className={cn('text-white px-[4px] py-[2px] rounded-md transition text-[14px]', {
              'opacity-30 group-hover:opacity-50': mode === 'cafe',
              'bg-white/20': mode !== 'cafe',
            })}
          >
            Job
          </p>
          <ModeSwitch onCheckedChange={changeMode} checked={mode === 'cafe'} />
          <p
            className={cn('text-white px-[4px] py-[2px] rounded-md transition text-[14px]', {
              'opacity-30 group-hover:opacity-50': mode === 'job',
              'bg-white/20': mode !== 'job',
            })}
          >
            Cafe
          </p>
        </div>
        <h1 className="text-white font-medium tracking-tight leading-tight text-[36px] lg:text-[48px] w-full lg:max-w-[800px] md:max-w-[600px] px-[15px] text-center">
          {mode === 'job'
            ? 'Cari kerja remote dengan mudah dan nyaman'
            : 'Rekomendasi cafe terbaik untuk melakukan kerja remote'}
        </h1>
        <form
          onSubmit={handleSearch}
          className="flex bg-white rounded-full w-[90vw] lg:max-w-[800px] md:max-w-[600px] mx-[15px] mt-[10px]"
        >
          <input
            type="text"
            id="search"
            name="search"
            defaultValue={query ?? undefined}
            value={query ?? undefined}
            placeholder={
              mode === 'job' ? 'Cari software engineer, designer, ...' : 'Cari cafe, restoran, ...'
            }
            className="rounded-full w-full pl-[15px] py-[4px] h-[32px]"
          />
          <button
            type="submit"
            className="bg-transparent text-black py-[10px] pl-[10px] pr-[15px] rounded-full"
          >
            <Search size={16} />
          </button>
        </form>
      </div>
    </section>
  );
}

export { Header };
