'use client'

import { useCallback } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import useEmblaCarousel from 'embla-carousel-react'
import { ArrowUpRight, ChevronLeft, ChevronRight, Sparkles, ArrowRight } from 'lucide-react'
import type { RelatedCaseStudy } from '@/lib/service-data'

interface ServiceCaseStudiesProps {
  caseStudies: RelatedCaseStudy[]
  serviceTitle?: string
}

const SLUG_TO_THUMB: Record<string, string> = {
  satyapaan: '/casestudy-thumbs/Satyaapan.png',
  satyaapan: '/casestudy-thumbs/Satyaapan.png',
  'i4c-bank-portal': '/casestudy-thumbs/i4c.png',
  i4c: '/casestudy-thumbs/i4c.png',
  '14c': '/casestudy-thumbs/14c.png',
  'dine-desk': '/casestudy-thumbs/dinedesk.png',
  dinedesk: '/casestudy-thumbs/dinedesk.png',
  darpan: '/casestudy-thumbs/Darpan.png',
  ugo: '/casestudy-thumbs/UGO.png',
  uog: '/casestudy-thumbs/UGO.png',
  indispare: '/casestudy-thumbs/indispare.png',
  pixl: '/casestudy-thumbs/pixl-crm.png',
  'pixl-crm': '/casestudy-thumbs/pixl-crm.png',
  'ai-voice-agent': '/casestudy-thumbs/pixl-crm.png',
  'i-verify': '/casestudy-thumbs/i-verify.png',
  iverify: '/casestudy-thumbs/i-verify.png',
  radiantsa: '/casestudy-thumbs/rediantsage.png',
  'radiant-sage': '/casestudy-thumbs/rediantsage.png',
  'smart-healthcare-data-platform': '/casestudy-thumbs/rediantsage.png',
  protectly: '/casestudy-thumbs/protectly.png',
  skipr: '/images/portfolio/skipr.png',
  dovehouse: '/images/portfolio/dovehouse.png',
  pekt: '/images/portfolio/pekt.webp',
  'direct-owners': '/casestudy-thumbs/Dreamnest.png',
  crowdcounting: '/casestudy-thumbs/Crowd-Counting.png',
  'crowd-counting': '/casestudy-thumbs/Crowd-Counting.png',
  nigaah: '/casestudy-thumbs/Nigaah.png',
  'nigaah-videosurvelience': '/casestudy-thumbs/Nigaah.png',
  'unix-parts': '/casestudy-thumbs/unixparts.png',
  unixparts: '/casestudy-thumbs/unixparts.png',
}

// 6 diverse, high-impact enterprise case studies to guarantee smooth 3-at-a-time infinite looping
const DEFAULT_FALLBACK_STUDIES: RelatedCaseStudy[] = [
  {
    title: 'Satyaapan - Passport Verification at Scale',
    slug: 'satyapaan',
    category: 'Enterprise AI & Security',
    client: 'Telangana State Police',
    shortDescription:
      'Automated high-volume biometric screening, facial recognition matching, and exception routing across state registries.',
    image: '/casestudy-thumbs/Satyaapan.png',
    metrics: [
      { value: '1.96M', label: 'Profiles Processed' },
      { value: '99.4%', label: 'Biometric Accuracy' },
    ],
  },
  {
    title: 'I4C National Bank Fraud Portal',
    slug: 'i4c-bank-portal',
    category: 'Cyber Fraud Mitigation',
    client: 'National Cyber Crime Bureau',
    shortDescription:
      'Pan-India fraud intercept platform enabling instant banking account freezes and multi-crore fund recovery.',
    image: '/casestudy-thumbs/i4c.png',
    metrics: [
      { value: '₹100M+', label: 'Stolen Funds Intercepted' },
      { value: '<60s', label: 'Account Freeze Response' },
    ],
  },
  {
    title: 'Dine Desk - Smart Restaurant SaaS',
    slug: 'dine-desk',
    category: 'SaaS Platform Architecture',
    client: 'Enterprise Restaurant Network',
    shortDescription:
      'Multi-unit reservation engine, real-time waitlists, table management, and guest intelligence for high-traffic dining.',
    image: '/casestudy-thumbs/dinedesk.png',
    metrics: [
      { value: '3x', label: 'Table Turnover' },
      { value: '40%', label: 'No-Show Reduction' },
    ],
  },
  {
    title: 'Darpan - AI Facial Retrieval Engine',
    slug: 'darpan',
    category: 'Computer Vision & AI',
    client: 'State Law Enforcement',
    shortDescription:
      'Deep learning facial recognition system matching missing records in real-time across high-volume databases.',
    image: '/casestudy-thumbs/Darpan.png',
    metrics: [
      { value: '800+', label: 'High-Risk Cases' },
      { value: '65%', label: 'Speedup in Clearance' },
    ],
  },
  {
    title: 'RadiantSA - Clinical CTMS Platform',
    slug: 'radiantsa',
    category: 'Healthcare Cloud Architecture',
    client: 'Clinical Research Enterprise',
    shortDescription:
      'FDA-compliant clinical trial management system coordinating multi-center patient trials with zero audit defects.',
    image: '/casestudy-thumbs/rediantsage.png',
    metrics: [
      { value: '100%', label: 'Regulatory Compliance' },
      { value: '99.99%', label: 'Pipeline Reliability' },
    ],
  },
  {
    title: 'UGO - Fleet Routing & Supply Chain',
    slug: 'ugo',
    category: 'Supply Chain & Logistics',
    client: 'Global Logistics Enterprise',
    shortDescription:
      'Sub-second telemetry tracking and route optimization dispatch platform managing high-volume transport fleets.',
    image: '/casestudy-thumbs/UGO.png',
    metrics: [
      { value: '35%', label: 'Fuel Cost Savings' },
      { value: '99.9%', label: 'On-Time Dispatch' },
    ],
  },
]

export default function ServiceCaseStudies({ caseStudies, serviceTitle }: ServiceCaseStudiesProps) {
  // Use exactly what Sanity selected — never pad with unrelated fallbacks.
  // If admin picked some studies, clone them to reach the 6-slide minimum for
  // smooth 3-at-a-time looping. Only use defaults when nothing is selected.
  const displayedStudies: RelatedCaseStudy[] = (() => {
    const sanityList = Array.isArray(caseStudies) && caseStudies.length > 0
      ? [...caseStudies]
      : null

    // Nothing selected in Sanity → show defaults
    if (!sanityList) return DEFAULT_FALLBACK_STUDIES

    // Enough slides → use as-is
    if (sanityList.length >= 6) return sanityList

    // Clone selected studies until we hit 6 for carousel loop smoothness
    const padded = [...sanityList]
    const original = [...sanityList]
    while (padded.length < 6) {
      padded.push(...original)
    }
    return padded
  })()

  // Embla Carousel: Exactly 3 visible cards on web with loop enabled
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
    align: 'start',
    skipSnaps: false,
    slidesToScroll: 1,
    dragFree: false,
  })

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev()
  }, [emblaApi])

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext()
  }, [emblaApi])

  return (
    <section
      id="case-studies"
      className="py-14 sm:py-16 lg:py-20 bg-[#F8FAFC] font-['Plus_Jakarta_Sans',sans-serif] border-b border-gray-200/70 overflow-hidden relative"
    >
      {/* Subtle ambient glows */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-blue-100/30 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-10 w-80 h-80 bg-teal-100/25 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-[80rem] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header with Navigation Arrows */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-5 mb-8 sm:mb-10">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.5 }}
            className="max-w-2xl"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#EAF3FA] text-[#066095] text-[11px] font-bold uppercase tracking-wider mb-2.5">
              <Sparkles className="w-3.5 h-3.5 text-[#066095]" />
              <span>Proven Execution</span>
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-[38px] font-bold text-gray-900 tracking-tight leading-[1.2]">
              {serviceTitle ? `${serviceTitle} Case Studies` : 'Featured Case Studies & ROI'}
            </h2>
            <p className="text-sm sm:text-base text-gray-600 leading-relaxed font-normal mt-2">
              Explore how we engineer scalable architectures, automate high-throughput data pipelines, and deliver measurable business ROI.
            </p>
          </motion.div>

          {/* Header Controls: Circular Prev/Next Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="flex items-center gap-3 self-start md:self-end"
          >
            {/* Circular Prev Button */}
            <button
              type="button"
              onClick={scrollPrev}
              aria-label="Previous Case Study"
              className="w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-white hover:bg-[#02487D] text-gray-700 hover:text-white border border-gray-200 shadow-2xs hover:shadow-md transition-all duration-200 flex items-center justify-center cursor-pointer active:scale-95"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

            {/* Circular Next Button */}
            <button
              type="button"
              onClick={scrollNext}
              aria-label="Next Case Study"
              className="w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-[#02487D] hover:bg-[#0B3B6D] text-white border border-[#02487D] shadow-2xs hover:shadow-md transition-all duration-200 flex items-center justify-center cursor-pointer active:scale-95"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </motion.div>
        </div>

        {/* Embla Carousel Viewport: EXACTLY 3 AT A TIME ON WEB (lg:flex-[0_0_33.333333%]) */}
        <div
          className="overflow-hidden cursor-grab active:cursor-grabbing -mx-3 sm:-mx-4 lg:-mx-6 px-3 sm:px-4 lg:px-6 py-2"
          ref={emblaRef}
        >
          <div className="flex touch-pan-y -ml-6">
            {displayedStudies.map((study, idx) => {
              // Prefer the Sanity-resolved hero image, then the local slug→thumb map,
              // then any raw string set on the study, then a safe placeholder.
              const sanityImg =
                study.heroImage?.asset?.url ||
                study.featureImage?.asset?.url
              const thumbFromMap = study.slug ? SLUG_TO_THUMB[study.slug] : undefined
              const rawImage = sanityImg || thumbFromMap || study.image
              const isValidPath =
                typeof rawImage === 'string' &&
                (rawImage.startsWith('/') || rawImage.startsWith('http'))
              const imageSrc = isValidPath ? rawImage : '/casestudy-thumbs/Satyaapan.png'

              const href =
                study.slug === 'satyapaan' || study.slug?.includes('satyapaan')
                  ? '/case-studies/satyapaan'
                  : `/case-studies/${study.slug}`

              return (
                <div
                  key={`${study.slug}-${idx}`}
                  className="flex-[0_0_88%] sm:flex-[0_0_50%] lg:flex-[0_0_33.333333%] min-w-0 pl-6"
                >
                  {/* Card Container */}
                  <div className="bg-white border border-gray-200/90 rounded-2xl overflow-hidden shadow-2xs hover:border-[#02487D]/50 hover:shadow-lg transition-all duration-300 flex flex-col justify-between h-full group">
                    <div>
                      {/* Compact Image Frame */}
                      <div className="relative w-full aspect-[16/10] overflow-hidden bg-gray-100">
                        <Image
                          src={imageSrc}
                          alt={study.title}
                          fill
                          className="object-cover transition-transform duration-500 group-hover:scale-105"
                          sizes="(max-width: 640px) 88vw, (max-width: 1024px) 50vw, 420px"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-transparent pointer-events-none" />

                        {/* Category Tag */}
                        <div className="absolute top-3 left-3 bg-[#02487D]/95 backdrop-blur-md text-white rounded-full px-3 py-1 text-[11px] font-bold tracking-wide shadow-2xs">
                          {study.category || 'Case Study'}
                        </div>

                        {/* Client Tag */}
                        {study.client && (
                          <div className="absolute bottom-3 left-3 bg-black/60 backdrop-blur-md text-white text-[11px] font-medium px-2.5 py-0.5 rounded">
                            {study.client}
                          </div>
                        )}
                      </div>

                      {/* Content Body */}
                      <div className="p-5 sm:p-6">
                        <h3 className="text-lg font-bold text-gray-900 group-hover:text-[#02487D] transition-colors leading-snug mb-2.5 line-clamp-2">
                          {study.title}
                        </h3>

                        {study.shortDescription && (
                          <p className="text-xs sm:text-sm text-gray-600 leading-relaxed font-normal mb-3 line-clamp-2">
                            {study.shortDescription}
                          </p>
                        )}
                      </div>
                    </div>

                    {/* Card CTA Link Button */}
                    <div className="p-5 pt-0 sm:p-6 sm:pt-0">
                      <Link
                        href={href}
                        className="btn-global !h-[46px] rounded-[5px] w-full inline-flex items-center justify-center bg-[#02487D] hover:bg-[#0B3B6D] text-white font-semibold text-xs sm:text-sm transition-all duration-200 shadow-2xs group-hover:shadow-xs active:scale-98 whitespace-nowrap"
                      >
                        <span className="whitespace-nowrap">View Case Study</span>
                        <ArrowUpRight className="w-4 h-4 ml-1.5 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                      </Link>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* Bottom Bar: Drag Instruction and Prominent "View All Case Studies" Button */}
        <div className="mt-8 pt-5 border-t border-gray-200/60 flex flex-col sm:flex-row items-center justify-between gap-4">
          {/* Left: Drag or Swipe Hint */}
          <div className="flex items-center gap-1.5 text-xs text-gray-500 font-medium">
            <span>Drag or swipe to browse all case studies</span>
            <ArrowRight className="w-3.5 h-3.5 text-gray-400" />
          </div>

          {/* Right: Prominent "View All Case Studies" Button */}
          <Link
            href="/work"
            className="btn-global !h-[46px] rounded-[5px] !w-auto min-w-[210px] px-6 inline-flex items-center justify-center bg-[#02487D] hover:bg-[#066095] text-white font-bold text-xs uppercase tracking-wider shadow-xs hover:shadow-md transition-all active:scale-95 whitespace-nowrap group"
          >
            <span className="whitespace-nowrap">View All Case Studies</span>
            <ArrowUpRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </Link>
        </div>
      </div>
    </section>
  )
}

