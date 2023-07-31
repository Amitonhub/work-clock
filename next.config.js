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

// module.exports = (phase, { defaultConfig }) => {
//   return {
//     ...defaultConfig,

//     webpack: (config) => {
//       config.resolve = {
//         ...config.resolve,
//         fallback: {
//           "fs": false,
//           "path": false,
//           "os": false,
//         }
//       }
//       return config
//     },
//   }
// }