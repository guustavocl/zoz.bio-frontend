/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  images: {
    domains: ["api.zoz.bio"],
  },
  serverRuntimeConfig: {
    prodUrl: 'http://172.19.0.50:3000',
    devUrl: 'http://127.0.0.1:3100'
  },
  publicRuntimeConfig: {
    prodUrl: 'https://api.zoz.bio',
    devUrl: 'http://127.0.0.1:3100'
  }
};

module.exports = nextConfig;
