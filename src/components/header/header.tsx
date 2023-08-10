'use client';

import { useCallback, useState } from 'react';

import Image from 'next/image';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

import { cn } from '@/lib/utils';

import { ModeSwitch } from '.';

function Header() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const [mode, setMode] = useState<'job' | 'cafe'>(searchParams?.get('cafe') ? 'cafe' : 'job');

  const changeMode = useCallback(
    (checked: boolean) => {
      if (!searchParams) return;
      const params = new URLSearchParams(searchParams.toString());
      if (checked) {
        params.set('cafe', 'true');
        router.push(pathname + '?' + params);
        setMode('cafe');
        return;
      }
      params.delete('cafe');
      setMode('job');
      if (!pathname) return;
      router.push(pathname);

      return;
    },
    [searchParams, router],
  );

  return (
    <section className="w-full h-[500px] relative">
      <Image
        src="https://mir-s3-cdn-cf.behance.net/project_modules/max_1200/5335b4153214395.632b797ad321d.jpg"
        alt="Cover"
        className="z-0"
        objectFit="cover"
        layout="fill"
      />
      <div className="flex flex-col z-5 absolute w-full h-full items-center justify-center">
        <div className="flex gap-[10px]">
          <p
            className={cn('text-white transition', {
              'opacity-50': mode === 'cafe',
            })}
          >
            Job
          </p>
          <ModeSwitch onCheckedChange={changeMode} checked={mode === 'cafe'} />
          <p
            className={cn('text-white', {
              'opacity-50': mode === 'job',
            })}
          >
            Cafe
          </p>
        </div>

        <h1 className="text-white font-medium tracking-tight text-[48px]">
          {mode === 'job'
            ? 'Cari kerja remote dengan mudah dan nyaman'
            : 'Cari rekomendasi cafe untuk kerja remote dengan mudah dan nyaman'}
        </h1>
      </div>
    </section>
  );
}

export { Header };
