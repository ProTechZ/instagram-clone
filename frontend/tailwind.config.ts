import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/components/*.{js,jsx,ts,tsx}',
    './src/pages/*.{js,jsx,ts,tsx}',
    './src/utils/*.{js,jsx,ts,tsx}',
    './src/*.{js,jsx,ts,tsx}',
    './public/index.html',
  ],
};

export default config;
