import { createMDX } from 'fumadocs-mdx/next';

const withMDX = createMDX();

const config = {
  reactStrictMode: true,
  output: 'standalone',
  experimental: {
    webpackMemoryOptimizations: true,
    cpus: 1,
    workerThreads: false,
  },
  async rewrites() {
    return [
      {
        source: '/docs/:path*.mdx',
        destination: '/llms.mdx/docs/:path*',
      },
    ];
  },
  eslint: {
    ignoreDuringBuilds: true
  },
  images: { 
      domains: ['images-ext-1.discordapp.net', 'cdn.discordapp.com', 'media.discordapp.net'],
  }
};

export default withMDX(config);
