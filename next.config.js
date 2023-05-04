// /** @type {import('next').NextConfig} */
// const nextConfig = {
// 	experimental: {
// 	  appDir: true,
// 	},
//   }
  
//   const withMDX = require('@next/mdx')()
//   module.exports = withMDX(nextConfig)
module.exports = {
    webpack5: true,
    webpack: (config) => {
        config.resolve.fallback = { fs: false };

        return config;
    },
    // env: {
    //     HOST: 'localhost:3000',
    //   },
};