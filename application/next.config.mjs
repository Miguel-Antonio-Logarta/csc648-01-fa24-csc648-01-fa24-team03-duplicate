/** @type {import('next').NextConfig} */

const nextConfig = {
  eslint: {
    // Warning: This allows production builds to successfully complete even if
    // your project has ESLint errors.
    // ignoreDuringBuilds: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com",
      },
      {
        protocol: "https",
        hostname: "9otnordlgmffpjra.public.blob.vercel-storage.com"
      },
      {
        protocol: "https",
        hostname: "cdn.builder.io"
      }
    ],
  },
};

export default nextConfig;
