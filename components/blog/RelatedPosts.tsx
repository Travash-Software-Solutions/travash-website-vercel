import BlogCard, { BlogPostItem } from './BlogCard'

interface RelatedPostsProps {
  posts: BlogPostItem[]
}

export default function RelatedPosts({ posts }: RelatedPostsProps) {
  if (!posts || posts.length === 0) return null

  return (
    <section className="mt-20 pt-16 border-t border-gray-200 font-['Plus_Jakarta_Sans',sans-serif]">
      <div className="max-w-[84rem] mx-auto">
        <div className="mb-10 text-center sm:text-left">
          <span className="text-xs font-bold text-[#14B8A6] uppercase tracking-widest block mb-2">
            CONTINUE EXPLORING
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0B1E3D] tracking-tight">
            Related Insights & Engineering Perspectives
          </h2>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {posts.slice(0, 3).map((post) => (
            <BlogCard key={post._id || post.slug} post={post} />
          ))}
        </div>
      </div>
    </section>
  )
}
