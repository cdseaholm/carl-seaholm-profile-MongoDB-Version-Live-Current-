/** @type {import('next').NextConfig} */
const nextConfig = {
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
  experimental: {
    serverComponentsExternalPackages: ['oslo'],
  },
  webpack: (config) => {
    config.externals.push('@node-rs/argon2', '@node-rs/bcrypt');
    return config;
  },
  images: {
    remotePatterns: [
      {
        hostname: 'utfs.io'
      }
    ]
  }

};

export default nextConfig;
