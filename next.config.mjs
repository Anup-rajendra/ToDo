/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["cdn.builder.io"],
    dangerouslyAllowSVG: true,
  },
  webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
    // Add the html-loader for handling HTML files
    config.module.rules.push({
      test: /\.html$/,
      use: "html-loader",
    });

    return config;
  },
  experimental: {
    appDir: true,
    serverComponentsExternalPackages: ["@prisma/client", "bcrypt"],
  },
  async redirects() {
    return [
      {
        source: "/",
        destination: "/sign-up",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
