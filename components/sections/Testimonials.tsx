'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

interface Testimonial {
  quote: string
  authorName: string
  authorTitle: string
  authorPhoto?: string
}

// Name-keyed lookup to guarantee photos match author identity & gender
const AUTHOR_PHOTOS: Record<string, string> = {
  'imran khan': 'https://travash.com/wp-content/uploads/2026/08/imran-pixl-client-dubai-1.webp',
  'ross redfern': 'https://travash.com/wp-content/uploads/2026/08/swd-ross-travash-client.webp',
  'senior officer': 'https://travash.com/wp-content/uploads/2026/08/i4c-travash-client.png',
  'national coordinator': 'https://travash.com/wp-content/uploads/2026/08/i4c-travash-client.png',
  'senior leadership & national coordinator': 'https://travash.com/wp-content/uploads/2026/08/i4c-travash-client.png',
}

const TESTIMONIALS: Testimonial[] = [
  {
    quote:
      'Travash has been our trusted technology partner for nearly eight years. Handling luxury real estate marketing in Dubai requires flawless digital tools, and they consistently deliver. They successfully digitized our operations by building custom CRM apps and high-performance websites for our team and our high-profile clients. Their technical expertise, reliability, and deep understanding of the real estate industry have made them an invaluable part of our growth. We are extremely happy with their work and look forward to continuing this strong relationship.',
    authorName: 'Imran Khan',
    authorTitle: 'Managing Director - PIXL Group (Dubai, UAE)',
    authorPhoto: 'https://travash.com/wp-content/uploads/2026/08/imran-pixl-client-dubai-1.webp',
  },
  {
    quote:
      'The Satyaapan web application built by Travash has successfully solved our biggest challenge: identifying fraudulent activity and fake records during the passport verification process. Our officers use the platform daily to securely cross-reference applications, making the entire process highly convenient and incredibly efficient.',
    authorName: 'Senior Officer',
    authorTitle: 'Passport & Security Verification · Govt. of Telangana',
    authorPhoto: 'https://travash.com/wp-content/uploads/2026/08/i4c-travash-client.png',
  },
  {
    quote:
      'For six years, Travash has been the powerful engine driving our successful deliveries, and their recent work on the UGO logistics application is truly next-level. Architecting a highly complex supply chain platform demands immense expertise, and the team navigated intricate routing workflows with absolute precision.',
    authorName: 'Ross Redfern',
    authorTitle: 'Managing Director · SWD Group',
    authorPhoto: 'https://travash.com/wp-content/uploads/2026/08/swd-ross-travash-client.webp',
  },
]

interface SanityTestimonial {
  quote?: string
  authorName?: string
  authorTitle?: string
  authorCompany?: string
  authorPhoto?: { asset?: { url: string } }
}

interface TestimonialsSectionData {
  heading?: string
  testimonials?: SanityTestimonial[]
}

export default function Testimonials({ data }: { data?: TestimonialsSectionData }) {
  const [currentIdx, setCurrentIdx] = useState(0)
  const [isPaused, setIsPaused] = useState(false)
  const [touchStart, setTouchStart] = useState<number | null>(null)

  const activeList =
    data?.testimonials && data.testimonials.length > 0
      ? data.testimonials.map((t, i) => {
          const fb = TESTIMONIALS[i % TESTIMONIALS.length]
          const name = t.authorName || fb.authorName
          const cleanKey = name.trim().toLowerCase()
          const resolvedPhoto =
            t.authorPhoto?.asset?.url ||
            AUTHOR_PHOTOS[cleanKey] ||
            fb.authorPhoto

          let title = t.authorTitle || fb.authorTitle
          if (t.authorCompany && title && !title.toLowerCase().includes(t.authorCompany.trim().toLowerCase())) {
            title = `${title} · ${t.authorCompany.trim()}`
          } else if (!title && t.authorCompany) {
            title = t.authorCompany.trim()
          }

          return {
            quote: t.quote || fb.quote,
            authorName: name,
            authorTitle: title,
            authorPhoto: resolvedPhoto,
          }
        })
      : TESTIMONIALS

  const total = activeList.length
  const current = activeList[currentIdx % total]

  // Slower, comfortable reading speed (7.5s interval), pauses on hover and touch
  useEffect(() => {
    if (isPaused || total <= 1) return
    const interval = setInterval(() => {
      setCurrentIdx((prev) => (prev + 1) % total)
    }, 7500)
    return () => clearInterval(interval)
  }, [isPaused, total])

  const prevSlide = () => setCurrentIdx((prev) => (prev - 1 + total) % total)
  const nextSlide = () => setCurrentIdx((prev) => (prev + 1) % total)

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.touches[0].clientX)
    setIsPaused(true)
  }

  const handleTouchEnd = (e: React.TouchEvent) => {
    setIsPaused(false)
    if (touchStart === null) return
    const diff = touchStart - e.changedTouches[0].clientX
    if (diff > 50) {
      nextSlide()
    } else if (diff < -50) {
      prevSlide()
    }
    setTouchStart(null)
  }

  return (
    <section
      className="py-12 lg:py-16 bg-[#F8FAFC] font-['Plus_Jakarta_Sans',sans-serif] overflow-hidden"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div className="max-w-[80rem] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10 lg:mb-12">
          <h2 className="section-heading-title">
            {data?.heading || 'Trusted by Businesses Worldwide'}
          </h2>
        </div>

        {/* Big Testimonial Container Card */}
        <div
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
          className="bg-white rounded-[32px] sm:rounded-[36px] p-6 sm:p-10 lg:p-14 shadow-[0_4px_25px_rgba(0,0,0,0.04)] border border-gray-200/80 transition-all duration-300"
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIdx}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.45, ease: [0.25, 0.1, 0.25, 1.0] }}
              className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-center"
            >
              {/* Left: Rectangular photo */}
              <div className="lg:col-span-4 relative rounded-2xl overflow-hidden aspect-[4/3] bg-gray-100 shadow-sm border border-gray-100 flex items-center justify-center">
                <Image
                  src={current.authorPhoto || 'https://travash.com/wp-content/uploads/2026/08/imran-pixl-client-dubai-1.webp'}
                  alt={current.authorName}
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 380px"
                />
              </div>

              {/* Right: Quote and author credentials */}
              <div className="lg:col-span-8 flex flex-col justify-between gap-6">
                <p className="text-gray-700 text-sm sm:text-base lg:text-[17px] leading-relaxed font-normal">
                  &ldquo;{current.quote.replace(/^["'\s]+|["'\s]+$/g, '')}&rdquo;
                </p>
                <div className="pt-2">
                  <p className="font-bold text-[#0B4785] text-lg sm:text-xl">{current.authorName}</p>
                  <p className="text-sm text-gray-500 font-normal mt-0.5">
                    {current.authorTitle}
                  </p>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Interactive Navigation: Prev Arrow, Pagination Dots, Next Arrow */}
        <div className="flex items-center justify-center gap-4 sm:gap-6 mt-8">
          <button
            onClick={prevSlide}
            className="w-10 h-10 rounded-full border border-[#0B4785]/30 text-[#0B4785] hover:bg-[#0B4785] hover:text-white flex items-center justify-center transition-all duration-200 cursor-pointer shadow-sm active:scale-95 bg-white"
            aria-label="Previous testimonial"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-2.5">
            {activeList.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentIdx(i)}
                className={`rounded-full transition-all duration-300 cursor-pointer ${
                  i === currentIdx
                    ? 'w-6 h-2.5 bg-[#0B4785] rounded-full'
                    : 'w-2.5 h-2.5 bg-gray-300 hover:bg-gray-400'
                }`}
                aria-label={`Go to testimonial ${i + 1}`}
              />
            ))}
          </div>

          <button
            onClick={nextSlide}
            className="w-10 h-10 rounded-full border border-[#0B4785]/30 text-[#0B4785] hover:bg-[#0B4785] hover:text-white flex items-center justify-center transition-all duration-200 cursor-pointer shadow-sm active:scale-95 bg-white"
            aria-label="Next testimonial"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </section>
  )
}
