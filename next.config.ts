import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "vl.imgix.net",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        pathname: "/**",
      },
      {
        protocol: 'https',
        hostname: 'cache1.pakwheels.com',
        pathname: "/**",
      },
      {
        protocol: 'https',
        hostname: 'cache2.pakwheels.com',
        pathname: "/**",
      },
      {
        protocol: 'https',
        hostname: 'cache3.pakwheels.com',
        pathname: "/**",
      },
      {
        protocol: 'https',
        hostname: 'cache4.pakwheels.com',
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;