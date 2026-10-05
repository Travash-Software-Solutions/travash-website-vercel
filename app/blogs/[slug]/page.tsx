import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { client } from '@/lib/sanity'
import { siteSettingsQuery } from '@/lib/queries'
import {
  getBlogBySlug,
  getRelatedBlogs,
  getAllBlogSlugs,
} from '@/lib/sanity.client'
import { getSanityImageUrl } from '@/lib/sanity.image'

import Navbar from '@/components/sections/Navbar'
import BlogDetailContent from '@/components/blog/BlogDetailContent'
import RelatedPosts from '@/components/blog/RelatedPosts'
import Contact from '@/components/sections/Contact'
import Footer from '@/components/sections/Footer'

export const revalidate = 60

interface PageProps {
  params: Promise<{ slug: string }>
}

const DEFAULT_ARTICLES: Record<string, any> = {
  'ai-in-software-development-automating-and-optimizing-it-processes': {
    title: 'AI in Software Development: Automating and Optimizing IT Processes',
    slug: 'ai-in-software-development-automating-and-optimizing-it-processes',
    category: 'AI & Automation',
    publishedAt: '2025-01-15T09:00:00.000Z',
    excerpt:
      'Artificial intelligence is dramatically transforming software development—streamlining testing, automating code reviews, and optimizing continuous deployment pipelines for enterprise teams.',
    coverImage: { asset: { url: '/home-img/Group 1000003287.png' } },
    author: { name: 'Travash AI Practice', role: 'Applied Machine Learning Lead' },
    tags: ['AI', 'Automation', 'DevOps', 'Software Engineering'],
  },
  'ethical-ai-balancing-innovation-and-responsibility': {
    title: 'Ethical AI: Balancing Innovation and Responsibility',
    slug: 'ethical-ai-balancing-innovation-and-responsibility',
    category: 'AI & Automation',
    publishedAt: '2025-01-10T10:30:00.000Z',
    excerpt:
      'As autonomous models and generative AI touch sensitive user data, discover actionable governance frameworks for enterprise safety, explainability, and compliance.',
    coverImage: { asset: { url: '/home-img/Group 1000003288.png' } },
    author: { name: 'Technology Strategy Group', role: 'Ethics & Governance' },
    tags: ['Ethical AI', 'Governance', 'Enterprise Compliance'],
  },
}

export async function generateStaticParams() {
  try {
    const slugs = await getAllBlogSlugs()
    if (slugs && slugs.length > 0) {
      return slugs.map((slug) => ({ slug }))
    }
  } catch {
    // fallback
  }
  return Object.keys(DEFAULT_ARTICLES).map((slug) => ({ slug }))
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params
  let post = await getBlogBySlug(slug)

  if (!post && DEFAULT_ARTICLES[slug]) {
    post = DEFAULT_ARTICLES[slug]
  }

  if (!post) {
    return { title: 'Article Not Found | Travash Insights' }
  }

  const metaTitle = post.seo?.metaTitle || `${post.title} | Travash Insights`
  const metaDescription =
    post.seo?.metaDescription ||
    post.excerpt ||
    `Read "${post.title}" on the Travash Software Solutions blog.`
  const ogImageUrl = getSanityImageUrl(post.seo?.ogImage || post.featuredImage || post.coverImage, 1200, 630)
  const canonicalUrl = post.seo?.canonicalUrl || `https://travash.com/blogs/${post.slug}`

  return {
    title: metaTitle,
    description: metaDescription,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title: post.seo?.ogTitle || metaTitle,
      description: post.seo?.ogDescription || metaDescription,
      url: `https://travash.com/blogs/${post.slug}`,
      siteName: 'Travash Software Solutions',
      images: [
        {
          url: ogImageUrl,
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ],
      type: 'article',
      publishedTime: post.publishedAt,
      modifiedTime: post.updatedAt || post.publishedAt,
      authors: post.author?.name ? [post.author.name] : ['Travash Software Solutions'],
    },
    twitter: {
      card: 'summary_large_image',
      title: post.seo?.ogTitle || metaTitle,
      description: post.seo?.ogDescription || metaDescription,
      images: [ogImageUrl],
    },
    robots: {
      index: !post.seo?.noIndex,
      follow: !post.seo?.noIndex,
    },
  }
}

export default async function BlogDetailPage({ params }: PageProps) {
  const { slug } = await params

  let [post, siteSettings] = await Promise.all([
    getBlogBySlug(slug),
    client.fetch(siteSettingsQuery).catch(() => null),
  ])

  if (!post && DEFAULT_ARTICLES[slug]) {
    post = DEFAULT_ARTICLES[slug]
  }

  if (!post) {
    notFound()
  }

  // Fetch related posts based on current categories
  const categoryTitles = post.categories?.map((c: any) => (typeof c === 'string' ? c : c.title)) || []
  let related = await getRelatedBlogs(slug, categoryTitles, 3)

  if (!related || related.length === 0) {
    related = Object.values(DEFAULT_ARTICLES).filter((a: any) => a.slug !== slug)
  }

  const postImageUrl = getSanityImageUrl(post.featuredImage || post.coverImage, 1200, 630)
  const articleUrl = `https://travash.com/blogs/${post.slug}`

  // JSON-LD Structured Data for BlogPosting
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.excerpt,
    image: [postImageUrl],
    datePublished: post.publishedAt,
    dateModified: post.updatedAt || post.publishedAt,
    author: {
      '@type': 'Person',
      name: post.author?.name || 'Travash Technology Practice',
    },
    publisher: {
      '@type': 'Organization',
      name: 'Travash Software Solutions',
      logo: {
        '@type': 'ImageObject',
        url: 'https://travash.com/travash-latest-logo.svg',
      },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': articleUrl,
    },
  }

  return (
    <>
      {/* Structured Data (JSON-LD) */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <Navbar settings={siteSettings} />
      <main className="py-12 sm:py-16 lg:py-20 bg-white dark:bg-white">
        <div className="max-w-[80rem] mx-auto px-4 sm:px-6 lg:px-8">
          <BlogDetailContent post={post} />
          <RelatedPosts posts={related} />
        </div>
        <Contact />
      </main>
      <Footer settings={siteSettings} />
    </>
  )
}
