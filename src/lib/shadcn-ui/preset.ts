import type { Config } from 'tailwindcss';
//@ts-ignore
import animatePlugin from 'tailwindcss-animate';

import { shadcnPlugin } from './plugin';

export const shadcnPreset = {
  content: [],
  darkMode: ['class'],
  plugins: [animatePlugin, shadcnPlugin],
} satisfies Config;
