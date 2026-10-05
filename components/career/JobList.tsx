'use client'

import { useState, useMemo } from 'react'
import JobCard, { JobItem } from './JobCard'
import { Search, Briefcase, Filter } from 'lucide-react'

interface JobListProps {
  jobs: JobItem[]
  header?: {
    eyebrow?: string
    heading?: string
    description?: string
  }
}

export default function JobList({ jobs, header }: JobListProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>('All')
  const [searchQuery, setSearchQuery] = useState<string>('')

  // Derive unique categories
  const categories = useMemo(() => {
    const cats = new Set<string>()
    jobs.forEach((j) => {
      if (j.category) cats.add(j.category)
    })
    return ['All', ...Array.from(cats)]
  }, [jobs])

  // Filter jobs
  const filteredJobs = useMemo(() => {
    return jobs.filter((job) => {
      const matchCategory = selectedCategory === 'All' || job.category === selectedCategory
      const query = searchQuery.toLowerCase().trim()
      const matchSearch =
        !query ||
        job.title.toLowerCase().includes(query) ||
        (job.shortDescription && job.shortDescription.toLowerCase().includes(query)) ||
        (job.location && job.location.toLowerCase().includes(query))

      return matchCategory && matchSearch
    })
  }, [jobs, selectedCategory, searchQuery])

  return (
    <section id="open-positions" className="py-16 sm:py-20 lg:py-24 bg-[#F8FAFC] font-['Plus_Jakarta_Sans',sans-serif]">
      <div className="max-w-[80rem] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <span className="text-xs font-bold text-[#14B8A6] uppercase tracking-widest block mb-2">
            {header?.eyebrow || 'JOIN OUR TEAM'}
          </span>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#121212] tracking-tight">
            {header?.heading || 'Explore Open Positions'}
          </h2>
          <p className="text-sm sm:text-base text-gray-600 mt-3 leading-relaxed">
            {header?.description ||
              'Find the role where you can make a tangible mark on enterprise software and scale your engineering capabilities.'}
          </p>
        </div>

        {/* Filter Bar & Search */}
        <div className="max-w-5xl mx-auto mb-10 flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Category Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto pb-2 md:pb-0 scrollbar-none">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold whitespace-nowrap transition-all ${selectedCategory === cat
                    ? 'bg-[#004771] text-white shadow-xs'
                    : 'bg-white text-gray-600 hover:text-gray-900 border border-gray-200 hover:border-gray-300'
                  }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Search Input */}
          <div className="relative w-full md:w-72 flex-shrink-0">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by title or keyword..."
              className="w-full pl-10 pr-4 py-2 text-sm bg-white border border-gray-200 rounded-xl focus:outline-none focus:border-[#004771] transition-colors"
            />
          </div>
        </div>

        {/* Jobs Grid */}
        {filteredJobs.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {filteredJobs.map((job) => (
              <JobCard key={job._id || job.slug} job={job} />
            ))}
          </div>
        ) : (
          <div className="max-w-md mx-auto text-center py-16 bg-white rounded-2xl border border-gray-200 p-8">
            <div className="w-12 h-12 rounded-xl bg-gray-100 flex items-center justify-center mx-auto text-gray-400 mb-4">
              <Briefcase className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-[#121212] mb-1">No positions found</h3>
            <p className="text-xs sm:text-sm text-gray-500 mb-6">
              We couldn't find any roles matching &quot;{searchQuery || selectedCategory}&quot;. Try resetting filters or reach out directly.
            </p>
            <button
              onClick={() => {
                setSelectedCategory('All')
                setSearchQuery('')
              }}
              className="px-4 py-2 rounded-lg bg-[#004771] text-white text-xs font-semibold hover:bg-[#02487D] transition-colors"
            >
              Reset Filters
            </button>
          </div>
        )}
      </div>
    </section>
  )
}
