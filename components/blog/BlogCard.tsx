import Link from 'next/link'
import Image from 'next/image'
import { Calendar, ArrowRight } from 'lucide-react'
import { getSanityImageUrl } from '@/lib/sanity.image'

export interface BlogPostItem {
  _id?: string
  title: string
  slug: string
  excerpt?: string
  featuredImage?: any
  coverImage?: any
  category?: string
  categories?: Array<{ title: string; slug?: string }>
  publishedAt?: string
  tags?: Array<{ title: string; slug?: string }> | string[]
  author?: {
    name?: string
    role?: string
    image?: any
    avatar?: any
  }
}

export default function BlogCard({ post }: { post: BlogPostItem }) {
  const imageSource = post.featuredImage || post.coverImage
  const imageUrl = getSanityImageUrl(imageSource, 800, 450)
  
  const dateFormatted = post.publishedAt
    ? new Date(post.publishedAt).toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
      })
    : 'Recent'

  const categoryName =
    post.categories && post.categories.length > 0
      ? post.categories[0].title
      : post.category || 'Insights'

  return (
    <article className="bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-xs hover:shadow-lg hover:border-gray-200 transition-all duration-300 flex flex-col group">
      {/* Cover Image */}
      <Link href={`/blogs/${post.slug}`} className="relative aspect-[16/9] w-full overflow-hidden bg-gray-100 block">
        <Image
          src={imageUrl}
          alt={post.title}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-500"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        {categoryName && (
          <div className="absolute top-3 left-3 z-10">
            <span className="px-2.5 py-1 rounded-md bg-[#004771]/90 backdrop-blur-md text-white text-[11px] font-bold uppercase tracking-wider shadow-xs">
              {categoryName}
            </span>
          </div>
        )}
      </Link>

      {/* Content */}
      <div className="p-6 flex-1 flex flex-col justify-between">
        <div>
          <div className="flex items-center gap-2 text-xs text-gray-500 mb-3">
            <Calendar className="w-3.5 h-3.5 text-[#14B8A6]" />
            <time dateTime={post.publishedAt}>{dateFormatted}</time>
          </div>

          <h3 className="text-lg font-bold text-[#121212] group-hover:text-[#004771] transition-colors leading-snug mb-3">
            <Link href={`/blogs/${post.slug}`} className="line-clamp-2">
              {post.title}
            </Link>
          </h3>

          <p className="text-sm text-gray-600 leading-relaxed line-clamp-3 mb-4">
            {post.excerpt || 'Explore practical strategies, engineering frameworks, and lessons learned from the field.'}
          </p>
        </div>

        {/* Footer info & Read More */}
        <div className="pt-4 border-t border-gray-100 flex items-center justify-between">
          <span className="text-xs font-semibold text-gray-500">
            {post.author?.name || 'Travash Editorial'}
          </span>
          <Link
            href={`/blogs/${post.slug}`}
            className="inline-flex items-center gap-1.5 text-xs font-bold text-[#004771] group-hover:text-[#02487D] transition-colors"
          >
            <span>Read More</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
    </article>
  )
}
