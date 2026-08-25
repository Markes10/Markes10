import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  output: process.env.GITHUB_PAGES === 'true' ? 'export' : 'standalone',
  basePath: process.env.GITHUB_PAGES === 'true' ? '/Markes10' : '',
  assetPrefix: process.env.GITHUB_PAGES === 'true' ? '/Markes10/' : undefined,
  typescript: {
    tsconfigPath:
      process.env.GITHUB_PAGES === 'true' ? './tsconfig.pages.json' : './tsconfig.json',
  },
  allowedDevOrigins: ['127.0.0.1'],
  turbopack: {
    root: __dirname,
  },
  reactStrictMode: false,
};

export default nextConfig;
