/** @type {import('next').NextConfig} */
const nextConfig = {
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
