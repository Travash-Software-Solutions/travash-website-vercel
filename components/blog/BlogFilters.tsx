'use client'

import { useState, useMemo } from 'react'
import BlogCard, { BlogPostItem } from './BlogCard'
import { Search, BookOpen, ChevronDown } from 'lucide-react'

interface BlogFiltersProps {
  posts: BlogPostItem[]
  categories: Array<string | { title: string; slug: string }>
  initialCategory?: string
  initialTag?: string
}

const PAGE_SIZE = 9

export default function BlogFilters({
  posts,
  categories,
  initialCategory,
  initialTag,
}: BlogFiltersProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>(initialCategory || 'All')
  const [selectedTag, setSelectedTag] = useState<string>(initialTag || '')
  const [searchQuery, setSearchQuery] = useState<string>('')
  const [visibleCount, setVisibleCount] = useState<number>(PAGE_SIZE)

  // Normalize categories list to strings
  const categoryTitles = useMemo(() => {
    const cats = categories.map((c) => (typeof c === 'string' ? c : c.title)).filter(Boolean)
    return ['All', ...Array.from(new Set(cats))]
  }, [categories])

  // Filter posts
  const filteredPosts = useMemo(() => {
    return posts.filter((post) => {
      // Category match
      let matchCat = selectedCategory === 'All'
      if (!matchCat) {
        if (post.categories && Array.isArray(post.categories)) {
          matchCat = post.categories.some(
            (c) =>
              c.title?.toLowerCase() === selectedCategory.toLowerCase() ||
              c.slug?.toLowerCase() === selectedCategory.toLowerCase()
          )
        } else if (post.category) {
          matchCat = post.category.toLowerCase() === selectedCategory.toLowerCase()
        }
      }

      // Tag match
      let matchTag = !selectedTag
      if (!matchTag) {
        if (post.tags && Array.isArray(post.tags)) {
          matchTag = post.tags.some((t) => {
            const tagStr = typeof t === 'string' ? t : t.title || t.slug
            return tagStr?.toLowerCase() === selectedTag.toLowerCase()
          })
        }
      }

      // Search match
      const query = searchQuery.toLowerCase().trim()
      let matchSearch = true
      if (query) {
        const title = post.title?.toLowerCase() || ''
        const excerpt = post.excerpt?.toLowerCase() || ''
        const catStr =
          post.categories?.map((c) => c.title).join(' ').toLowerCase() || post.category?.toLowerCase() || ''
        const tagStr =
          post.tags?.map((t) => (typeof t === 'string' ? t : t.title)).join(' ').toLowerCase() || ''

        matchSearch =
          title.includes(query) ||
          excerpt.includes(query) ||
          catStr.includes(query) ||
          tagStr.includes(query)
      }

      return matchCat && matchTag && matchSearch
    })
  }, [posts, selectedCategory, selectedTag, searchQuery])

  // Paginated visible posts
  const visiblePosts = useMemo(() => {
    return filteredPosts.slice(0, visibleCount)
  }, [filteredPosts, visibleCount])

  const hasMore = visibleCount < filteredPosts.length

  const handleLoadMore = () => {
    setVisibleCount((prev) => prev + PAGE_SIZE)
  }

  return (
    <div className="font-['Plus_Jakarta_Sans',sans-serif]">
      {/* Search and Filters Bar */}
      <div className="mb-8 flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Category Filter Pills */}
        <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto pb-2 md:pb-0 scrollbar-none">
          {categoryTitles.map((cat) => (
            <button
              key={cat}
              onClick={() => {
                setSelectedCategory(cat)
                setVisibleCount(PAGE_SIZE)
              }}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold whitespace-nowrap transition-all ${
                selectedCategory.toLowerCase() === cat.toLowerCase()
                  ? 'bg-[#004771] text-white shadow-xs'
                  : 'bg-white text-gray-600 hover:text-gray-900 border border-gray-200 hover:border-gray-300'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Search Input */}
        <div className="relative w-full md:w-80 flex-shrink-0">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value)
              setVisibleCount(PAGE_SIZE)
            }}
            placeholder="Search blogs, topics, keywords..."
            className="w-full pl-10 pr-4 py-2 text-sm bg-white border border-gray-200 rounded-xl focus:outline-none focus:border-[#004771] transition-colors"
          />
        </div>
      </div>

      {/* Active tag indicator if filtered */}
      {selectedTag && (
        <div className="mb-6 flex items-center gap-2">
          <span className="text-xs text-gray-500">Filtered by tag:</span>
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-blue-50 text-blue-700 text-xs font-semibold">
            #{selectedTag}
            <button
              onClick={() => setSelectedTag('')}
              className="ml-1 hover:text-blue-900"
              title="Clear tag filter"
            >
              ×
            </button>
          </span>
        </div>
      )}

      {/* Results Count */}
      <div className="mb-6 flex items-center justify-between text-xs text-gray-500">
        <span>
          Showing <strong className="text-slate-800">{visiblePosts.length}</strong> of{' '}
          <strong className="text-slate-800">{filteredPosts.length}</strong> articles
        </span>
      </div>

      {/* Grid */}
      {visiblePosts.length > 0 ? (
        <>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {visiblePosts.map((post) => (
              <BlogCard key={post._id || post.slug} post={post} />
            ))}
          </div>

          {/* Load More Button */}
          {hasMore && (
            <div className="mt-12 text-center">
              <button
                onClick={handleLoadMore}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-white border border-gray-200 hover:border-[#004771] text-[#004771] font-bold text-sm shadow-xs hover:shadow-md transition-all group"
              >
                <span>Load More Articles</span>
                <ChevronDown className="w-4 h-4 group-hover:translate-y-0.5 transition-transform" />
              </button>
            </div>
          )}
        </>
      ) : (
        <div className="max-w-md mx-auto text-center py-16 bg-white rounded-2xl border border-gray-200 p-8">
          <div className="w-12 h-12 rounded-xl bg-gray-100 flex items-center justify-center mx-auto text-gray-400 mb-4">
            <BookOpen className="w-6 h-6" />
          </div>
          <h3 className="text-base font-bold text-[#121212] mb-1">No articles found</h3>
          <p className="text-xs sm:text-sm text-gray-500 mb-6">
            We couldn&apos;t find any articles matching &quot;{searchQuery || selectedCategory}&quot;.
          </p>
          <button
            onClick={() => {
              setSelectedCategory('All')
              setSelectedTag('')
              setSearchQuery('')
            }}
            className="px-4 py-2 rounded-lg bg-[#004771] text-white text-xs font-semibold hover:bg-[#02487D] transition-colors"
          >
            Reset Filters
          </button>
        </div>
      )}
    </div>
  )
}
