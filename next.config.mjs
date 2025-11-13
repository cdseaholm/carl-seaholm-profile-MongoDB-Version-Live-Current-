export default {
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: "Access-Control-Allow-Origin",
            value: "*",
          },
        ],
      },
    ];
  },
  webpack: (config, { dev }) => {
    if (!dev) {
      config.devtool = 'source-map';
    }

    return config;
  },
  images: {
    remotePatterns: [
      {
        hostname: 'utfs.io'
      }
    ]
  },
  experimental: {
    optimizePackageImports: ['@mantine/core', '@mantine/hooks'],
  },
  productionBrowserSourceMaps: true,
};