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
  webpack: (config) => {
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