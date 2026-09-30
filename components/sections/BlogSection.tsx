'use client'

import Image from 'next/image'
import Link from 'next/link'
import { ExternalLink } from 'lucide-react'

interface BlogPost {
  _id?: string
  title: string
  slug?: { current?: string }
  coverImage?: { asset?: { url: string } }
  imageUrl?: string
  excerpt?: string
  category?: string
  publishedAt?: string
}

interface BlogSectionData {
  heading?: string
  ctaLabel?: string
  ctaHref?: string
}

const PDF_POSTS: BlogPost[] = [
  {
    _id: '1',
    title: 'AI in Software Development: Automating and Optimizing IT Processes',
    imageUrl: '/home-img/pexels-silverkblack-23496667 2.png',
    category: 'AI & Automation',
    slug: { current: 'ai-software-development-automating-it-processes' },
  },
  {
    _id: '2',
    title: 'Cybersecurity Essentials for Digital Transformation - What Businesses...',
    imageUrl: '/home-img/what-is-cybersecurity 2.png',
    category: 'Cybersecurity',
    slug: { current: 'cybersecurity-essentials-digital-transformation' },
  },
  {
    _id: '3',
    title: 'Ethical AI: Balancing Innovation and Responsibility',
    imageUrl: '/home-img/Rectangle 9876.png',
    category: 'AI Ethics',
    slug: { current: 'ethical-ai-balancing-innovation-responsibility' },
  },
]

export default function BlogSection({
  sectionData,
  posts,
}: {
  sectionData?: BlogSectionData
  posts?: BlogPost[]
}) {
  const displayPosts =
    posts && posts.length > 0
      ? posts.length >= 3
        ? posts.slice(0, 3)
        : [...posts, ...PDF_POSTS.slice(posts.length, 3)]
      : PDF_POSTS

  const heading = sectionData?.heading || 'Latest Insights from Travash'

  return (
    <section className="py-12 lg:py-16 bg-white font-['Plus_Jakarta_Sans',sans-serif]">
      <div className="max-w-[80rem] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10 lg:mb-12">
          <h2 className="section-heading-title">
            {heading || 'Latest Insights from Travash'}
          </h2>
        </div>

        {/* 3-Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {displayPosts.map((post, idx) => {
            const fallback = PDF_POSTS[idx] || PDF_POSTS[0]
            const img =
              (typeof post.coverImage === 'string'
                ? post.coverImage
                : post.coverImage?.asset?.url) ||
              (typeof (post as any).featuredImage === 'string'
                ? (post as any).featuredImage
                : (post as any).featuredImage?.asset?.url) ||
              (typeof (post as any).mainImage === 'string'
                ? (post as any).mainImage
                : (post as any).mainImage?.asset?.url) ||
              post.imageUrl ||
              fallback.imageUrl

            const postSlug =
              typeof post.slug === 'string'
                ? post.slug
                : post.slug?.current || (post as any).slug || fallback.slug?.current || '#'

            return (
              <article
                key={post._id || idx}
                className="group flex flex-col bg-white overflow-hidden transition-all duration-300"
              >
                {/* Visual Thumbnail Link */}
                <Link
                  href={`/blogs/${postSlug}`}
                  className="relative aspect-[16/10] overflow-hidden bg-gray-100 rounded-xl block group-hover:opacity-95 transition-opacity cursor-pointer"
                >
                  <Image
                    src={img!}
                    alt={post.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                </Link>

                {/* Body */}
                <div className="pt-5 flex flex-col gap-3 flex-1 justify-between">
                  <Link href={`/blogs/${postSlug}`} className="hover:underline">
                    <h3 className="text-base sm:text-lg font-bold text-[#0B4785] leading-snug transition-colors line-clamp-2">
                      {post.title}
                    </h3>
                  </Link>

                  <Link
                    href={`/blogs/${postSlug}`}
                    className="inline-flex items-center gap-1 text-sm font-semibold text-[#0B4785] pt-2"
                  >
                    Read More
                    <span className="group-hover:translate-x-1 transition-transform">→</span>
                  </Link>
                </div>
              </article>
            )
          })}
        </div>
      </div>
    </section>
  )
}
