/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    // ✅ Skip ESLint during builds
    ignoreDuringBuilds: true,
  },
  compiler: {
    removeConsole: process.env.NODE_ENV === "production",
  },
  async redirects() {
    return [
      {
        source: "/dashboard",
        destination: "/dashboard/default",
        permanent: false,
      },
    ];
  },
}

export default nextConfig
