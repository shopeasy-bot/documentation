import { createMDX } from 'fumadocs-mdx/next';

const withMDX = createMDX();

/** @type {import('next').NextConfig} */
const config = {
  reactStrictMode: true,
  eslint: {
    ignoreDuringBuilds: true
  },
  images: { 
      domains: ['images-ext-1.discordapp.net', 'cdn.discordapp.com', 'media.discordapp.net'],
  }
};

export default withMDX(config);
