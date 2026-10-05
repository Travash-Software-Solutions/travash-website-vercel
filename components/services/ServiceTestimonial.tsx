'use client'

import { useState } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { urlFor } from '@/lib/sanity'
import type { ServiceTestimonial as LegacyTestimonialType, SanityTestimonial } from '@/lib/service-data'

interface Props {
  /** Legacy single-object testimonial (backward compat) */
  testimonial?: LegacyTestimonialType
  /** New: array of referenced testimonial documents — preferred when present */
  testimonials?: SanityTestimonial[]
}

// Name and company keyed lookup for verified client portraits
const CLIENT_AVATARS: Record<string, string> = {
  chander: 'https://cdn.sanity.io/images/s2k81yej/production/dee849f0d9b94d874c7902a0052c214d309d34bc-350x320.png',
  radiantsa: 'https://cdn.sanity.io/images/s2k81yej/production/dee849f0d9b94d874c7902a0052c214d309d34bc-350x320.png',
  'radiantsa (ctms)': 'https://cdn.sanity.io/images/s2k81yej/production/dee849f0d9b94d874c7902a0052c214d309d34bc-350x320.png',
  ctms: 'https://cdn.sanity.io/images/s2k81yej/production/dee849f0d9b94d874c7902a0052c214d309d34bc-350x320.png',
  'imran khan': 'https://travash.com/wp-content/uploads/2026/08/imran-pixl-client-dubai-1.webp',
  pixl: 'https://travash.com/wp-content/uploads/2026/08/imran-pixl-client-dubai-1.webp',
  'senior officer': 'https://travash.com/wp-content/uploads/2026/08/i4c-travash-client.png',
  'national coordinator': 'https://travash.com/wp-content/uploads/2026/08/i4c-travash-client.png',
  'senior leadership & national coordinator': 'https://travash.com/wp-content/uploads/2026/08/i4c-travash-client.png',
  'national anti-fraud network': 'https://travash.com/wp-content/uploads/2026/08/i4c-travash-client.png',
  i4c: 'https://travash.com/wp-content/uploads/2026/08/i4c-travash-client.png',
  'ross redfern': 'https://travash.com/wp-content/uploads/2026/08/swd-ross-travash-client.webp',
  'swd group': 'https://travash.com/wp-content/uploads/2026/08/swd-ross-travash-client.webp',
  'david burn': 'https://cdn.sanity.io/images/s2k81yej/production/03e1bfe5c72a898954b3cb4fa01cd0e7b6f8a2d3-350x320.png',
  'direct owners': 'https://cdn.sanity.io/images/s2k81yej/production/03e1bfe5c72a898954b3cb4fa01cd0e7b6f8a2d3-350x320.png',
  'operations director': 'https://cdn.sanity.io/images/s2k81yej/production/018360e1d493a20b9a7a3436bb569bc0bbfe25b5-300x260.webp',
  ugo: 'https://cdn.sanity.io/images/s2k81yej/production/018360e1d493a20b9a7a3436bb569bc0bbfe25b5-300x260.webp',
  'founder & ceo': 'https://cdn.sanity.io/images/s2k81yej/production/6ac8bfa7016c85cd2a8365fb68f150e6fe7b9673-828x730.webp',
  'ai voice agent client': 'https://cdn.sanity.io/images/s2k81yej/production/6ac8bfa7016c85cd2a8365fb68f150e6fe7b9673-828x730.webp',
  indispare: 'https://cdn.sanity.io/images/s2k81yej/production/eb618fd321fceb80ae039150f431ad9f507d303c-550x350.jpg',
  'bhushan gupta': 'https://cdn.sanity.io/images/s2k81yej/production/eb618fd321fceb80ae039150f431ad9f507d303c-550x350.jpg',
  'delivery head': 'https://cdn.sanity.io/images/s2k81yej/production/58a2b2713b6d61850c64017d66727c02caa90151-130x83.svg',
  infosys: 'https://cdn.sanity.io/images/s2k81yej/production/58a2b2713b6d61850c64017d66727c02caa90151-130x83.svg',
  'senior commissioner': 'https://cdn.sanity.io/images/s2k81yej/production/c7716eed43afd71bfba1d16b06f53533f4f93e11-350x320.png',
  'telangana police': 'https://cdn.sanity.io/images/s2k81yej/production/c7716eed43afd71bfba1d16b06f53533f4f93e11-350x320.png',
  'telangana state police': 'https://cdn.sanity.io/images/s2k81yej/production/c7716eed43afd71bfba1d16b06f53533f4f93e11-350x320.png',
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function resolveAvatar(explicitImage: any, authorName?: string, company?: string): string {
  // 1. Sanity asset url (pre-expanded from GROQ)
  if (explicitImage?.asset?.url) {
    return explicitImage.asset.url
  }

  // 2. urlFor if it's a Sanity image object/reference
  if (explicitImage?.asset?._ref || explicitImage?._type === 'image') {
    try {
      const url = urlFor(explicitImage).url()
      if (url) return url
    } catch {
      // ignore
    }
  }

  // 3. Direct url string from CMS or props
  if (typeof explicitImage === 'string' && (explicitImage.startsWith('/') || explicitImage.startsWith('http'))) {
    // If it's a stale placeholder imran-khan image, check if the actual author is someone else
    if (explicitImage.includes('imran-khan') && authorName && !authorName.toLowerCase().includes('imran')) {
      // Fall through to name/company lookup below
    } else {
      return explicitImage
    }
  }

  // 4. Name/Company key lookup
  const cleanName = (authorName || '').trim().toLowerCase()
  const cleanCompany = (company || '').trim().toLowerCase()

  for (const [key, val] of Object.entries(CLIENT_AVATARS)) {
    if (cleanName.includes(key) || cleanCompany.includes(key)) {
      return val
    }
  }

  // 5. Default based on author
  if (cleanName.includes('imran')) {
    return '/images/services/imran-khan.png'
  }

  return '/images/avatar-placeholder.svg'
}

export default function ServiceTestimonial({ testimonial, testimonials }: Props) {
  // Normalise to a unified shape for rendering
  type NormalItem = {
    quote: string
    author: string
    role: string
    company: string
    avatarImage: string
    isLogo?: boolean
  }

  function normaliseSanity(t: SanityTestimonial): NormalItem {
    const avatar = resolveAvatar(t.photo, t.clientName, t.company)
    const isLogo =
      avatar.endsWith('.svg') ||
      Boolean(t.company?.toLowerCase().includes('infosys')) ||
      Boolean(t.clientName?.toLowerCase().includes('infosys'))
    return {
      quote: t.quote,
      author: t.clientName,
      role: t.designation,
      company: t.company || '',
      avatarImage: avatar,
      isLogo,
    }
  }

  function normaliseLegacy(t: LegacyTestimonialType): NormalItem {
    const avatar = resolveAvatar(t.image || t.avatarImage, t.author, t.company)
    const isLogo =
      avatar.endsWith('.svg') ||
      Boolean(t.company?.toLowerCase().includes('infosys')) ||
      Boolean(t.author?.toLowerCase().includes('infosys'))
    return {
      quote: t.quote,
      author: t.author,
      role: t.role,
      company: t.company,
      avatarImage: avatar,
      isLogo,
    }
  }

  // Priority: new reference array → legacy single object → nothing
  let list: NormalItem[] = []

  if (testimonials && testimonials.length > 0) {
    list = testimonials.map(normaliseSanity)
  } else if (testimonial && testimonial.quote) {
    list = [normaliseLegacy(testimonial)]
  }

  // If no testimonials are selected, hide the section entirely
  if (list.length === 0) return null

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [currentIndex, setCurrentIndex] = useState(0)
  const current = list[currentIndex] || list[0]

  return (
    <section
      id="testimonial"
      className="py-14 sm:py-18 lg:py-24 bg-[#F8FAFC] font-['Plus_Jakarta_Sans',sans-serif] border-b border-gray-100 overflow-hidden"
    >
      <div className="max-w-[80rem] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.6 }}
          className="text-center mb-10 sm:mb-14"
        >
          <h2 className="text-3xl sm:text-4xl lg:text-[40px] font-semibold text-[#121212] tracking-tight leading-tight">
            What Technical Leaders Say
          </h2>
        </motion.div>

        {/* Testimonial card */}
        <div className="max-w-5xl mx-auto">
          <div className="bg-white border border-gray-100/90 rounded-[28px] sm:rounded-[36px] lg:rounded-[40px] p-6 sm:p-10 lg:p-12 shadow-[0_4px_30px_rgba(0,0,0,0.03)] transition-all">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
                className="grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-12 items-center"
              >
                {/* Left: author photo */}
                <div className="md:col-span-4 flex justify-center md:justify-start">
                  <div
                    className={`relative w-full max-w-[280px] sm:max-w-[320px] aspect-[4/3] rounded-2xl sm:rounded-[20px] overflow-hidden shadow-xs ${
                      current.isLogo ? 'bg-white border border-gray-100 p-6 flex items-center justify-center' : 'bg-gray-100'
                    }`}
                  >
                    <Image
                      src={current.avatarImage}
                      alt={current.author}
                      fill
                      priority
                      className={current.isLogo ? 'object-contain p-4' : 'object-cover object-top'}
                      sizes="(max-width: 768px) 100vw, 320px"
                      unoptimized={current.avatarImage.endsWith('.svg')}
                    />
                  </div>
                </div>

                {/* Right: quote + credits */}
                <div className="md:col-span-8 flex flex-col justify-center">
                  <p className="text-gray-600 sm:text-gray-700 text-sm sm:text-base lg:text-[16px] xl:text-[17px] leading-relaxed font-normal">
                    {current.quote}
                  </p>

                  <div className="mt-6 sm:mt-8">
                    <h4 className="text-base sm:text-lg font-bold text-[#02487D] leading-snug">
                      {current.author}
                    </h4>
                    <p className="text-xs sm:text-sm text-gray-500 font-normal mt-0.5">
                      {current.role ? `${current.role}, ` : ''}{current.company}
                    </p>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Pagination dots — only when multiple testimonials */}
          {list.length > 1 && (
            <div className="flex items-center justify-center gap-2 mt-8">
              {list.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentIndex(idx)}
                  aria-label={`Go to testimonial ${idx + 1}`}
                  className={`transition-all duration-300 rounded-full cursor-pointer ${
                    currentIndex === idx
                      ? 'w-2.5 h-2.5 bg-[#02487D]'
                      : 'w-2 h-2 bg-gray-300 hover:bg-gray-400'
                  }`}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
