'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'

interface Outcome {
  value: string
  label: string
  bg?: string
  border?: string
}

interface CaseStudy {
  projectName: string
  clientType: string
  image?: string
  outcomes: Outcome[]
  ctaLabel?: string
  ctaHref?: string
}

const CASE_STUDIES: CaseStudy[] = [
  {
    projectName: 'Passport verification system',
    clientType: 'Enterprise AI for Government Security\n(Processed 1.9M+ applications)',
    image: '/casestudy-thumbs/Satyaapan.png',
    outcomes: [
      {
        value: '1.96 Million',
        label: 'Passport applications processed',
        bg: 'bg-[#FFFBEA]',
        border: 'border-[#FEEA9F]',
      },
      {
        value: '800+',
        label: 'High-risk adverse cases',
        bg: 'bg-[#F0F5FF]',
        border: 'border-[#D6E4FF]',
      },
      {
        value: 'AI-Assisted Verification',
        label: 'Automated data extraction',
        bg: 'bg-[#FAF0FF]',
        border: 'border-[#EED5FD]',
      },
      {
        value: 'Telangana State Police',
        label: 'Govt. of Telangana',
        bg: 'bg-[#EEFBF3]',
        border: 'border-[#C6F5D8]',
      },
    ],
    ctaLabel: 'View Case Study',
    ctaHref: '/case-studies/satyapaan',
  },
  {
    projectName: 'Smart Healthcare Data Platform',
    clientType: 'Connected healthcare intelligence platform for modern clinical operations',
    image: '/casestudy-thumbs/rediantsage.png',
    outcomes: [
      {
        value: '3.5M+',
        label: 'Patient records analyzed',
        bg: 'bg-[#F0F5FF]',
        border: 'border-[#D6E4FF]',
      },
      {
        value: '99.9%',
        label: 'HIPAA compliant uptime',
        bg: 'bg-[#EEFBF3]',
        border: 'border-[#C6F5D8]',
      },
      {
        value: 'Real-time Analytics',
        label: 'Clinical diagnostic support',
        bg: 'bg-[#FFFBEA]',
        border: 'border-[#FEEA9F]',
      },
      {
        value: 'Global Health Network',
        label: 'Integrated across 40+ hospitals',
        bg: 'bg-[#FAF0FF]',
        border: 'border-[#EED5FD]',
      },
    ],
    ctaLabel: 'View Case Study',
    ctaHref: '/case-studies/radiantsa',
  },
  {
    projectName: 'Digital Banking & Cyber Fraud Mitigation Platform',
    clientType: 'Enterprise banking technology built for secure real-time fraud intercept',
    image: '/casestudy-thumbs/i4c.png',
    outcomes: [
      {
        value: '₹100M+',
        label: 'Daily secure fraud freezes',
        bg: 'bg-[#EEFBF3]',
        border: 'border-[#C6F5D8]',
      },
      {
        value: '< 60s',
        label: 'Average latency response',
        bg: 'bg-[#FFFBEA]',
        border: 'border-[#FEEA9F]',
      },
      {
        value: 'Fraud Shield AI',
        label: 'Zero-trust verification',
        bg: 'bg-[#F0F5FF]',
        border: 'border-[#D6E4FF]',
      },
      {
        value: 'National Anti-Fraud Network',
        label: 'Pan-India banking coverage',
        bg: 'bg-[#FAF0FF]',
        border: 'border-[#EED5FD]',
      },
    ],
    ctaLabel: 'View Case Study',
    ctaHref: '/case-studies/i4c-bank-portal',
  },
]

interface SanityCaseStudy {
  projectName?: string
  clientType?: string
  image?: { asset?: { url: string } }
  outcomes?: { value: string; label: string }[]
  ctaLabel?: string
  ctaHref?: string
}

interface CaseStudiesSectionData {
  heading?: string
  caseStudies?: SanityCaseStudy[]
}

const OUTCOME_STYLES = [
  { bg: 'bg-[#E8FAF5]', border: 'border-[#A3EEDC]' },
  { bg: 'bg-[#FFFBEA]', border: 'border-[#FEEA9F]' },
  { bg: 'bg-[#F0F5FF]', border: 'border-[#D6E4FF]' },
  { bg: 'bg-[#FAF0FF]', border: 'border-[#EED5FD]' },
]

/**
 * Resolves a case study's specific detail page route.
 * Filters out generic listing pages like /work or /portfolio.
 */
function getDetailHref(rawHref?: string, projectName?: string): string {
  const LIST_PAGES = ['/work', '/portfolio', '/case-studies', '/work/', '/portfolio/', '/case-studies/']
  
  if (rawHref && !LIST_PAGES.includes(rawHref.trim())) {
    // If it's a specific slug route, return it directly
    if (rawHref.startsWith('/case-studies/') || rawHref.startsWith('/portfolio/')) {
      return rawHref
    }
  }

  // Infer detail route from project name or raw href string
  const str = `${projectName || ''} ${rawHref || ''}`.toLowerCase()
  if (str.includes('passport') || str.includes('satya') || str.includes('verification')) {
    return '/case-studies/satyapaan'
  }
  if (str.includes('health') || str.includes('radiant') || str.includes('medical') || str.includes('clinical')) {
    return '/case-studies/radiantsa'
  }
  if (str.includes('bank') || str.includes('fraud') || str.includes('i4c') || str.includes('cyber')) {
    return '/case-studies/i4c-bank-portal'
  }
  if (str.includes('voice') || str.includes('pixl') || str.includes('agent')) {
    return '/case-studies/pixl'
  }
  if (str.includes('rental') || str.includes('direct') || str.includes('vacation')) {
    return '/case-studies/direct-owners'
  }
  if (str.includes('ugo') || str.includes('supply') || str.includes('fleet')) {
    return '/case-studies/ugo'
  }

  return '/case-studies/satyapaan'
}

export default function CaseStudies({ data }: { data?: CaseStudiesSectionData }) {
  const [currentIdx, setCurrentIdx] = useState(0)

  const activeStudies =
    data?.caseStudies && data.caseStudies.length > 0
      ? data.caseStudies.map((s, i) => {
        const fallback = CASE_STUDIES[i % CASE_STUDIES.length]
        const rawHref = s.ctaHref || fallback.ctaHref
        const detailHref = getDetailHref(rawHref, s.projectName || fallback.projectName)

        return {
          projectName: s.projectName || fallback.projectName,
          clientType: s.clientType || fallback.clientType,
          image: s.image?.asset?.url || fallback.image,
          outcomes:
            s.outcomes && s.outcomes.length > 0
              ? s.outcomes.map((o, idx) => ({
                value: o.value,
                label: o.label,
                bg: OUTCOME_STYLES[idx % OUTCOME_STYLES.length].bg,
                border: OUTCOME_STYLES[idx % OUTCOME_STYLES.length].border,
              }))
              : fallback.outcomes,
          ctaLabel: s.ctaLabel && s.ctaLabel !== 'View All' ? s.ctaLabel : 'View Case Study',
          ctaHref: detailHref,
        }
      })
      : CASE_STUDIES.map((s) => ({
        ...s,
        ctaHref: getDetailHref(s.ctaHref, s.projectName),
      }))

  const current = activeStudies[currentIdx % activeStudies.length]
  const heading = data?.heading || 'Built on Results, Not Promises'

  const nextSlide = () => {
    setCurrentIdx((prev) => (prev + 1) % activeStudies.length)
  }

  const prevSlide = () => {
    setCurrentIdx((prev) => (prev - 1 + activeStudies.length) % activeStudies.length)
  }

  const [touchStart, setTouchStart] = useState<number | null>(null)

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.touches[0].clientX)
  }

  const handleTouchEnd = (e: React.TouchEvent) => {
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
    <section className="py-12 lg:py-16 
    bg-gradient-to-b from-[#ffffff] to-[#F2F2F2] font-['Plus_Jakarta_Sans',sans-serif] overflow-hidden">
      <div className="max-w-[80rem] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <div className="text-center mb-10 lg:mb-14">
          <h2 className="section-heading-title">
            {heading}
          </h2>
        </div>

        {/* Big Rounded Case Study Container matching exact gradient */}
        <div
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
          className="border border-gray-200/80 rounded-[24px] sm:rounded-[28px] p-5 sm:p-8 lg:p-10 shadow-[0_6px_30px_rgba(0,0,0,0.06)]"
          style={{ background: 'linear-gradient(180deg, #FFFFFF 0%, #F5F5F5 100%)' }}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIdx}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.45, ease: [0.25, 0.1, 0.25, 1.0] }}
              className="grid lg:grid-cols-12 gap-6 sm:gap-8 lg:gap-12 items-center"
            >
              {/* Left Column: Clean Image Link */}
              <Link
                href={current.ctaHref}
                className="lg:col-span-5 relative rounded-2xl overflow-hidden aspect-[4/3] flex items-center justify-center  border border-gray-100 group cursor-pointer"
              >
                <Image
                  src={current.image || '/casestudy-thumbs/Satyaapan.png'}
                  alt={current.projectName}
                  fill
                  unoptimized
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  sizes="(max-width: 1024px) 100vw, 450px"
                />
              </Link>

              {/* Right Column: Case Study Details & 2x2 Outcome Grid */}
              <div className="lg:col-span-7 flex flex-col justify-between">
                <div>
                  <Link href={current.ctaHref} className="hover:underline">
                    <h3 className="text-xl sm:text-2xl lg:text-[28px] font-[600] text-[#0B4785] tracking-tight break-words leading-snug">
                      {current.projectName}
                    </h3>
                  </Link>
                  <p className="text-gray-500 text-[13px] sm:text-[14px] font-normal mt-1.5 mb-5 sm:mb-6 whitespace-pre-line">
                    {current.clientType}
                  </p>

                  <p className="text-[11px] sm:text-xs font-bold text-gray-700 uppercase tracking-widest mb-3">
                    Key Outcomes
                  </p>

                  {/* 2x2 Outcome Grid */}
                  <div className="grid grid-cols-2 gap-2.5 sm:gap-3 mb-5 sm:mb-7">
                    {current.outcomes.map((item, idx) => (
                      <div
                        key={idx}
                        className={`${item.bg || 'bg-gray-50'} border ${item.border || 'border-gray-200'
                          } rounded-xl p-3 sm:p-4 flex flex-col justify-center`}
                      >
                        <span className="text-sm sm:text-base font-bold text-gray-900 leading-tight">
                          {item.value}
                        </span>
                        <span className="text-[11px] sm:text-[12px] text-gray-500 mt-0.5 sm:mt-1 leading-snug font-normal">
                          {item.label}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Bottom Row: CTA + Slider Nav */}
                <div className="flex flex-col sm:flex-row items-center sm:justify-between gap-4 pt-2">
                  <Link
                    href={current.ctaHref}
                    className="inline-flex items-center justify-center bg-[#0B4785] hover:bg-[#083566] text-white font-semibold px-7 py-3 rounded-[10px] text-[14px] transition-all duration-200 shadow-sm w-full sm:w-auto"
                  >
                    {current.ctaLabel || 'View Case Study'}
                  </Link>

                  <div className="flex items-center gap-2.5">
                    <button
                      onClick={prevSlide}
                      className="w-10 h-10 rounded-full border border-gray-300 hover:border-gray-400 bg-white hover:bg-gray-50 transition-all flex items-center justify-center cursor-pointer active:scale-95 shadow-sm"
                      aria-label="Previous case study"
                    >
                      <Image
                        src="/home-img/Group 1000003288.png"
                        alt="Previous"
                        width={40}
                        height={40}
                      />
                    </button>
                    <button
                      onClick={nextSlide}
                      className="w-10 h-10 rounded-full border border-gray-300 hover:border-gray-400 bg-white hover:bg-gray-50 transition-all flex items-center justify-center cursor-pointer active:scale-95 shadow-sm"
                      aria-label="Next case study"
                    >
                      <Image
                        src="/home-img/Group 1000003287-1.png"
                        alt="Next"
                        width={40}
                        height={40}
                      />
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  )
}

