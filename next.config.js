/** @type {import('next').NextConfig} */
const nextConfig = {
  // Ignore ESLint issues during production builds to prevent CI failures
  eslint: {
    ignoreDuringBuilds: true,
  },
  // Optionally ignore TypeScript build errors (use with caution)
  typescript: {
    ignoreBuildErrors: true,
  },
}

module.exports = nextConfig
