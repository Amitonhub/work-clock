/** @type {import('next').NextConfig} */

const withPWA = require('next-pwa');
const nextConfig = {
  experimental: {
    appDir: true,
  },
  typescript: {
    ignoreBuildErrors: true,
 },
}

module.exports = nextConfig, withPWA({
  pwa: {
    dest: 'public',
    swSrc: 'serviceWorker.js',
  },
});