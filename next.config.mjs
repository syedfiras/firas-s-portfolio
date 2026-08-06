/** @type {import('next').NextConfig} */
const nextConfig = {
  outputFileTracingRoot: new URL('.', import.meta.url).pathname,
  eslint: {
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
