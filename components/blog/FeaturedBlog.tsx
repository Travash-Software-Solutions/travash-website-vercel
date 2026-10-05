import Link from 'next/link'
import Image from 'next/image'
import { Calendar, ArrowRight, Sparkles } from 'lucide-react'
import { BlogPostItem } from './BlogCard'
import { getSanityImageUrl } from '@/lib/sanity.image'

export default function FeaturedBlog({ post }: { post: BlogPostItem }) {
  if (!post) return null

  const imageSource = post.featuredImage || post.coverImage
  const imageUrl = getSanityImageUrl(imageSource, 1200, 750)

  const postSlug = typeof post.slug === 'string' ? post.slug : (post.slug as any)?.current || ''

  const dateFormatted = post.publishedAt
    ? new Date(post.publishedAt).toLocaleDateString('en-US', {
        month: 'long',
        day: 'numeric',
        year: 'numeric',
      })
    : 'Featured Article'

  const firstCat = post.categories && post.categories.length > 0 ? post.categories[0] : null
  const categoryName =
    typeof firstCat === 'string'
      ? firstCat
      : firstCat?.title || post.category || 'Featured'

  return (
    <div className="w-full mb-14 font-['Plus_Jakarta_Sans',sans-serif]">
      {/* Section label */}
      <div className="flex items-center gap-2 mb-4">
        <span className="w-2.5 h-2.5 rounded-full bg-[#14B8A6] animate-pulse" />
        <span className="text-xs font-extrabold uppercase tracking-widest text-[#004771]">
          Featured Story
        </span>
      </div>

      <div className="bg-[#F8FAFC] rounded-3xl overflow-hidden border border-gray-200/80 shadow-md hover:shadow-xl transition-all duration-300 grid lg:grid-cols-12 items-center group">
        {/* Left: Cover Image */}
        <div className="lg:col-span-7 relative aspect-[16/10] sm:aspect-[16/9] w-full overflow-hidden bg-gray-100">
          <Link href={`/blogs/${postSlug}`} className="block w-full h-full">
            <Image
              src={imageUrl}
              alt={post.title}
              fill
              priority
              className="object-cover group-hover:scale-105 transition-transform duration-700"
              sizes="(max-width: 1024px) 100vw, 60vw"
            />
          </Link>
          <div className="absolute top-4 left-4 z-10 flex items-center gap-2 pointer-events-none">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#004771] text-white text-xs font-bold uppercase tracking-wider shadow-sm">
              <Sparkles className="w-3.5 h-3.5 text-[#14B8A6]" />
              <span>Featured</span>
            </span>
            {categoryName && categoryName !== 'Uncategorized' && (
              <span className="px-3 py-1 rounded-full bg-white/90 backdrop-blur-md text-[#0B1E3D] text-xs font-bold uppercase tracking-wider shadow-xs">
                {categoryName}
              </span>
            )}
          </div>
        </div>

        {/* Right: Content */}
        <div className="lg:col-span-5 p-6 sm:p-10 lg:p-12 flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold text-gray-500 mb-4">
              <Calendar className="w-3.5 h-3.5 text-[#14B8A6]" />
              <time dateTime={post.publishedAt}>{dateFormatted}</time>
            </div>

            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#121212] group-hover:text-[#004771] transition-colors leading-tight mb-4">
              <Link href={`/blogs/${postSlug}`}>
                {post.title}
              </Link>
            </h2>

            <p className="text-sm sm:text-base text-gray-600 leading-relaxed mb-6 line-clamp-3">
              {post.excerpt ||
                'Explore in-depth technical insights, engineering blueprints, and strategic architectural perspectives from Travash practitioners.'}
            </p>
          </div>

          <div className="pt-6 border-t border-gray-200 flex items-center justify-between">
            <div className="text-xs">
              <div className="font-bold text-[#0B1E3D]">{post.author?.name || 'Travash Editorial Team'}</div>
              <div className="text-gray-500">{post.author?.role || 'Insights & Architecture'}</div>
            </div>

            <Link
              href={`/blogs/${postSlug}`}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#004771] hover:bg-[#02487D] text-white text-xs sm:text-sm font-bold shadow-sm hover:shadow-md transition-all"
            >
              <span>Read Article</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
