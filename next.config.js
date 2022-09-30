/** @type {import('next').NextConfig} */
require("dotenv").config({ path: `${process.env.NODE_ENV}` });

const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,

  env: {
    domainAPI: process.env.DOMAIN_API,
  },
  webpack: (config, isServer) => {
    config.module.rules.push({
      test: /\.svg$/,
      use: ["@svgr/webpack"],
    });

    return config;
  },
};

module.exports = nextConfig;
