import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  safelist: [
    'bg-[#CA3E47]',
    'hover:bg-[#CA3E47]/80',
    'bg-black/65',
    'hover:bg-black',
    'xs:text-xs',
    'md:text-lg',
    'lg:text-md',
    'text-[#0079FF]',
    'hover:bg-white/85',
    'hover:bg-black',
  ],
  theme: {
    extend: {
      colors: {
        background: 'var(--background)',
        foreground: 'var(--foreground)',
        primary: '#CA3E47',
        'primary-hover': '#CA3E47',
        'black-65': 'rgba(0, 0, 0, 0.65)',
      },
    },
  },
  plugins: [],
};
export default config;
