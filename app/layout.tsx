import type { Metadata } from 'next'
import { Plus_Jakarta_Sans } from 'next/font/google'
import './globals.css'

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700', '800'],
  variable: '--font-plus-jakarta',
  display: 'swap',
})

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://travash.com'

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    default: 'Travash — AI-Assisted Software & Product Development',
    template: '%s | Travash',
  },
  description:
    'Travash is an AI-assisted software and product development company, partnering with startups and enterprises to build high-impact digital products.',
  keywords: [
    'AI-Assisted Software',
    'Software Development Company',
    'Product Development',
    'Enterprise Software',
    'Web Development',
    'Mobile App Development',
    'Cloud & DevOps',
    'Travash',
  ],
  alternates: {
    canonical: '/',
  },
  icons: {
    icon: [
      { url: '/favicon.ico' },
      { url: '/favicon.png', type: 'image/png' },
    ],
    apple: [{ url: '/apple-icon.png', sizes: '180x180', type: 'image/png' }],
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: BASE_URL,
    siteName: 'Travash',
    title: 'Travash — AI-Assisted Software & Product Development',
    description:
      'Travash is an AI-assisted software and product development company, partnering with startups and enterprises to build high-impact digital products.',
    images: [
      {
        url: `${BASE_URL}/home-img/Group%201000003287.png`,
        width: 1200,
        height: 630,
        alt: 'Travash — AI-Assisted Software & Product Development',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Travash — AI-Assisted Software & Product Development',
    description:
      'Travash is an AI-assisted software and product development company, partnering with startups and enterprises to build high-impact digital products.',
    images: [`${BASE_URL}/home-img/Group%201000003287.png`],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Organization',
      '@id': `${BASE_URL}/#organization`,
      name: 'Travash Software Solutions',
      alternateName: 'Travash',
      url: BASE_URL,
      logo: {
        '@type': 'ImageObject',
        '@id': `${BASE_URL}/#logo`,
        url: `${BASE_URL}/travash-latest-logo.svg`,
        caption: 'Travash Software Solutions',
      },
      image: `${BASE_URL}/travash-latest-logo.svg`,
      description:
        'Travash is an AI-assisted software and product development company, partnering with startups and enterprises to build high-impact digital products.',
      contactPoint: [
        {
          '@type': 'ContactPoint',
          telephone: '+91-7416743434',
          contactType: 'customer service',
          email: 'contact@travash.com',
          availableLanguage: ['English', 'Hindi'],
        },
      ],
      sameAs: [
        'https://www.linkedin.com/company/travash-software-solutions/',
        'https://www.facebook.com/travashglobal',
        'https://www.instagram.com/travashglobal/',
        'https://x.com/travashglobal',
      ],
    },
    {
      '@type': 'WebSite',
      '@id': `${BASE_URL}/#website`,
      url: BASE_URL,
      name: 'Travash',
      description: 'Travash is an AI-assisted software and product development company.',
      publisher: {
        '@id': `${BASE_URL}/#organization`,
      },
      inLanguage: 'en-US',
    },
    {
      '@type': 'ProfessionalService',
      '@id': `${BASE_URL}/#professionalService`,
      name: 'Travash Software Solutions',
      url: BASE_URL,
      logo: `${BASE_URL}/travash-latest-logo.svg`,
      priceRange: '$$',
      telephone: '+91-7416743434',
      email: 'contact@travash.com',
    },
  ],
}

type LayoutProps = {
  children: React.ReactNode
}

export default function RootLayout({ children }: LayoutProps) {
  return (
    <html lang="en" className={plusJakartaSans.variable}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className={`${plusJakartaSans.className} antialiased`}>{children}</body>
    </html>
  )
}
