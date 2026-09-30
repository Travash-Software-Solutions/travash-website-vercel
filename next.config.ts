import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.sanity.io',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'travash.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        pathname: '/**',
      },
    ],
  },
  // Transpile Sanity packages so Turbopack can handle their TS source files
  transpilePackages: [
    'sanity',
    'next-sanity',
    '@sanity/sdk-react',
    '@sanity/workbench',
    '@sanity/ui',
  ],
  // Also exclude from server bundling
  serverExternalPackages: ['@sanity/client'],
  async redirects() {
    const defaultRedirects = [
      {
        source: '/:path*',
        has: [
          {
            type: 'host' as const,
            value: 'www.travash.com',
          },
        ],
        destination: 'https://travash.com/:path*',
        permanent: true,
      },
      {
        source: '/about',
        destination: '/about-us',
        permanent: true,
      },
      {
        source: '/careers',
        destination: '/career',
        permanent: true,
      },
      {
        source: '/blog',
        destination: '/blogs',
        permanent: true,
      },
      {
        source: '/contact',
        destination: '/contact-us',
        permanent: true,
      },
    ]

    try {
      // eslint-disable-next-line @typescript-eslint/no-require-imports
      const fs = require('fs')
      // eslint-disable-next-line @typescript-eslint/no-require-imports
      const path = require('path')
      const seen = new Set(defaultRedirects.map((r) => r.source))

      const filesToLoad = [
        path.resolve(process.cwd(), 'migration/redirects.json'),
        path.resolve(process.cwd(), 'migration/portfolio/redirects.json'),
      ]

      for (const filePath of filesToLoad) {
        if (fs.existsSync(filePath)) {
          const raw = JSON.parse(fs.readFileSync(filePath, 'utf8'))
          for (const item of raw) {
            if (
              item.source &&
              item.destination &&
              item.source !== item.destination &&
              !seen.has(item.source)
            ) {
              seen.add(item.source)
              defaultRedirects.push({
                source: item.source,
                destination: item.destination,
                permanent: true,
              })
            }
          }
        }
      }
    } catch {
      // fallback to default redirects
    }

    return defaultRedirects
  },
  async rewrites() {
    return [
      {
        source: '/travash-landing',
        destination: '/travash-landing/index.html',
      },
      {
        source: '/landing',
        destination: '/travash-landing/index.html',
      },
    ]
  },
}

export default nextConfig
// refreshed for case study detail updates and html sanitization
