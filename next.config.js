/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    formats: ['image/avif', 'image/webp'],
    unoptimized: false,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'lh3.googleusercontent.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'rmatywxagjzdnhkhbwes.supabase.co',
        pathname: '/storage/v1/object/public/**',
      },
    ],
  },
  // SSG - generateStaticParams will pre-render pages at build time
  trailingSlash: true,
}

module.exports = nextConfig
