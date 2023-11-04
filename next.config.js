/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  output: "standalone",
  images: {
    domains: ["googleusercontent.com"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com",
        pathname: "/**/**",
      },
    ],
  },
  // webpack(config) {
  //   config.infrastructureLogging = { debug: /PackFileCache/ };
  //   return config;
  // },
};

module.exports = nextConfig;
