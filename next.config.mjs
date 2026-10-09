/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    unoptimized: true,
  },
  transpilePackages: ["react-pdf", "pdfjs-dist"],
  webpack: (config) => {
    config.resolve.alias = {
      ...config.resolve.alias,
      canvas: false,
    };
    return config;
  },
  async rewrites() {
    return [
      {
        source: "/index.html",
        destination: "/landing",
      },
    ];
  },
};

export default nextConfig;
