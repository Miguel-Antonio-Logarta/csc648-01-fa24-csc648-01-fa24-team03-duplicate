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
        hostname: "*", // this should be replaced with the actual hostname of vercel storage
      },
    ],
  },
};

export default nextConfig;
