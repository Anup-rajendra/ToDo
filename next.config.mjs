/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["cdn.builder.io"],
    dangerouslyAllowSVG: true,
  },
};

export default nextConfig;
