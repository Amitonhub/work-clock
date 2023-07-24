/** @type {import('next').NextConfig} */

const withPWA = require('next-pwa');
const nextConfig = {
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: 'http://localhost:5000/:path*' // Proxy to Backend
      }
    ]
  },
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
