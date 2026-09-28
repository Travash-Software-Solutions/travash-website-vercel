'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import {
  ArrowLeft,
  Calendar,
  Clock,
  Tag,
  Share2,
  Check,
  ExternalLink,
} from 'lucide-react'
import PortableTextRenderer from './PortableTextRenderer'
import { getSanityImageUrl } from '@/lib/sanity.image'

function LinkedInIcon({ className = 'w-4 h-4' }: { className?: string }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24">
      <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z" />
    </svg>
  )
}

function TwitterIcon({ className = 'w-4 h-4' }: { className?: string }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  )
}

function FacebookIcon({ className = 'w-4 h-4' }: { className?: string }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24">
      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
    </svg>
  )
}

export interface BlogDetailProps {
  post: {
    _id?: string
    title: string
    slug: string
    excerpt?: string
    content?: any[]
    body?: any[]
    featuredImage?: any
    coverImage?: any
    category?: string
    categories?: Array<{ title: string; slug: string }>
    tags?: Array<{ title: string; slug: string }> | string[]
    keywords?: string[]
    author?: {
      name?: string
      role?: string
      bio?: string
      image?: any
      avatar?: any
    }
    publishedAt?: string
    updatedAt?: string
    originalWordPressUrl?: string
  }
}

export default function BlogDetailContent({ post }: BlogDetailProps) {
  const [copied, setCopied] = useState(false)

  const imageSource = post.featuredImage || post.coverImage
  const imageUrl = getSanityImageUrl(imageSource, 1400, 800)

  const publishedDateFormatted = post.publishedAt
    ? new Date(post.publishedAt).toLocaleDateString('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric',
    })
    : null

  const updatedDateFormatted = post.updatedAt
    ? new Date(post.updatedAt).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    })
    : null

  // Estimated reading time (~220 wpm)
  const rawText = post.excerpt || ''
  const words = rawText.split(/\s+/).length + 600
  const readingTime = `${Math.max(3, Math.round(words / 220))} min read`

  const currentCategory =
    post.categories && post.categories.length > 0
      ? post.categories[0]
      : post.category
        ? { title: post.category, slug: post.category.toLowerCase().replace(/\s+/g, '-') }
        : null

  // Share URLs
  const shareUrl = typeof window !== 'undefined' ? window.location.href : `https://travash.com/blogs/${post.slug}`
  const shareText = encodeURIComponent(post.title)

  const handleCopy = () => {
    if (typeof navigator !== 'undefined') {
      navigator.clipboard.writeText(shareUrl)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

  const contentBlocks = post.content || post.body

  return (
    <article className="max-w-[84rem] mx-auto font-['Plus_Jakarta_Sans',sans-serif]">
      {/* Top Breadcrumbs */}
      <nav aria-label="Breadcrumb" className="mb-6 flex items-center gap-2 text-xs font-semibold text-gray-500">
        <Link href="/" className="hover:text-[#004771] transition-colors">
          Home
        </Link>
        <span>/</span>
        <Link href="/blogs" className="hover:text-[#004771] transition-colors">
          Blogs
        </Link>
        {currentCategory && (
          <>
            <span>/</span>
            <Link
              href={`/blogs/category/${currentCategory.slug}`}
              className="hover:text-[#004771] transition-colors"
            >
              {currentCategory.title}
            </Link>
          </>
        )}
      </nav>

      {/* Category Pill */}
      {currentCategory && (
        <div className="mb-4">
          <Link
            href={`/blogs/category/${currentCategory.slug}`}
            className="inline-block px-3.5 py-1 rounded-full bg-sky-50 dark:bg-sky-950/40 text-[#004771] dark:text-sky-300 text-xs font-bold uppercase tracking-wider hover:bg-sky-100 transition-colors"
          >
            {currentCategory.title}
          </Link>
        </div>
      )}

      {/* Article Title */}
      <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#0B1E3D] tracking-tight leading-[1.2] mb-6">
        {post.title}
      </h1>

      {/* Author & Meta Bar */}
      <div className="flex flex-wrap items-center justify-between gap-4 py-4 border-y border-gray-200 text-xs sm:text-sm text-gray-600 mb-8">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-[#004771] text-white flex items-center justify-center font-bold text-sm shadow-xs">
            {post.author?.name ? post.author.name.charAt(0).toUpperCase() : 'T'}
          </div>
          <div>
            <div className="font-bold text-[#0B1E3D]">
              {post.author?.name || 'Travash Editorial Team'}
            </div>
            <div className="text-xs text-gray-500">
              {post.author?.role || 'Engineering & Architecture'}
            </div>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-4 text-xs">
          {publishedDateFormatted && (
            <div className="flex items-center gap-1.5 text-gray-600">
              <Calendar className="w-4 h-4 text-[#14B8A6]" />
              <time dateTime={post.publishedAt}>{publishedDateFormatted}</time>
            </div>
          )}

          <div className="flex items-center gap-1.5 text-gray-600">
            <Clock className="w-4 h-4 text-[#004771]" />
            <span>{readingTime}</span>
          </div>

          {updatedDateFormatted && (
            <span className="hidden sm:inline text-gray-400 italic">
              (Updated {updatedDateFormatted})
            </span>
          )}
        </div>
      </div>

      {/* Hero Featured Image */}
      <div className="relative aspect-[16/9] w-full rounded-2xl sm:rounded-3xl overflow-hidden shadow-lg mb-12 border border-gray-200 bg-gray-100">
        <Image
          src={imageUrl}
          alt={post.title}
          fill
          priority
          className="object-cover"
          sizes="(max-width: 1024px) 100vw, 900px"
        />
      </div>

      {/* Article Body Content */}
      <div className="article-body font-normal text-slate-800">
        {contentBlocks && Array.isArray(contentBlocks) && contentBlocks.length > 0 ? (
          <PortableTextRenderer value={contentBlocks} />
        ) : (
          <div className="prose prose-lg max-w-none text-gray-700 space-y-6">
            <p className="text-lg sm:text-xl font-medium text-[#0B1E3D] leading-relaxed">
              {post.excerpt}
            </p>
            <p className="leading-relaxed">
              As organizations scale their modern enterprise applications, adopting scalable cloud primitives, automated CI/CD pipelines, and domain-driven design becomes instrumental in driving sustained competitive advantage.
            </p>
          </div>
        )}
      </div>

      {/* Tags Section */}
      {post.tags && post.tags.length > 0 && (
        <div className="mt-12 pt-6 border-t border-gray-200 dark:border-slate-800">
          <div className="flex flex-wrap items-center gap-2">
            <Tag className="w-4 h-4 text-gray-400 mr-1" />
            {post.tags.map((tag, idx) => {
              const tagTitle = typeof tag === 'string' ? tag : tag.title
              const tagSlug = typeof tag === 'string' ? tag.toLowerCase().replace(/\s+/g, '-') : tag.slug
              return (
                <Link
                  key={idx}
                  href={`/blogs/tag/${tagSlug}`}
                  className="px-3 py-1 rounded-lg bg-gray-50 dark:bg-slate-800 border border-gray-200 dark:border-slate-700 text-xs font-semibold text-[#0B1E3D] hover:border-[#004771] hover:text-[#004771] transition-colors"
                >
                  #{tagTitle}
                </Link>
              )
            })}
          </div>
        </div>
      )}

      {/* Social Sharing & Original URL Footer */}
      <div className="mt-8 p-6 rounded-2xl bg-[#F8FAFC] border border-gray-200 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2 text-xs sm:text-sm font-bold text-gray-700">
          <Share2 className="w-4 h-4 text-[#004771]" />
          <span>Share this article:</span>
        </div>

        <div className="flex items-center gap-3">
          <a
            href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="p-2.5 rounded-xl bg-white border border-gray-200 hover:bg-[#0077b5] hover:text-white text-gray-700 transition-colors"
            title="Share on LinkedIn"
          >
            <LinkedInIcon className="w-4 h-4" />
          </a>
          <a
            href={`https://twitter.com/intent/tweet?text=${shareText}&url=${encodeURIComponent(shareUrl)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="p-2.5 rounded-xl bg-white border border-gray-200 hover:bg-black hover:text-white text-gray-700 transition-colors"
            title="Share on X"
          >
            <TwitterIcon className="w-4 h-4" />
          </a>
          <a
            href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="p-2.5 rounded-xl bg-white border border-gray-200 hover:bg-[#1877f2] hover:text-white text-gray-700 transition-colors"
            title="Share on Facebook"
          >
            <FacebookIcon className="w-4 h-4" />
          </a>
          <button
            onClick={handleCopy}
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-white border border-gray-200 hover:border-[#004771] text-xs font-semibold text-gray-700 transition-colors"
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-500" />
                <span className="text-emerald-600">Copied!</span>
              </>
            ) : (
              <span>Copy Link</span>
            )}
          </button>
        </div>
      </div>

      {/* Author Bio Box */}
      {post.author && (
        <div className="mt-8 p-6 rounded-2xl bg-white border border-gray-200 flex items-start gap-4 shadow-xs">
          <div className="w-12 h-12 rounded-full bg-[#004771] text-white flex-shrink-0 flex items-center justify-center font-bold text-lg">
            {post.author.name ? post.author.name.charAt(0).toUpperCase() : 'T'}
          </div>
          <div>
            <h4 className="text-base font-bold text-[#0B1E3D]">
              Written by {post.author.name || 'Travash Editorial Team'}
            </h4>
            <p className="text-xs text-gray-500 mb-2">
              {post.author.role || 'Technology Practice Lead'}
            </p>
            <p className="text-sm text-gray-600 leading-relaxed">
              {post.author.bio ||
                'Travash practitioners specialize in building high-scale cloud platforms, mission-critical custom applications, and enterprise AI automation architectures.'}
            </p>
          </div>
        </div>
      )}
    </article>
  )
}
