'use client'

import Link from 'next/link'
import { ArrowRight, Award, ShieldCheck, Users } from 'lucide-react'

interface AboutHeroProps {
  data?: {
    eyebrow?: string
    heading?: string
    description?: string
    credibilityBadges?: string[]
    primaryCTA?: { label?: string; href?: string }
    secondaryCTA?: { label?: string; href?: string }
    heroImage?: { asset?: { url: string } }
  }
}

export default function AboutHero({ data }: AboutHeroProps) {
  const eyebrow = data?.eyebrow || 'ABOUT TRAVASH'
  const heading =
    data?.heading ||
    'We are a team of great innovators, creators and differentiators with exceptional high standards.'
  const description =
    data?.description ||
    'Founded in 2005 with a clear vision: to transform technology from a business cost center into a powerful engine of growth, scalability, and competitive advantage for enterprises worldwide.'

  const badges =
    Array.isArray(data?.credibilityBadges) && data.credibilityBadges.length > 0
      ? data.credibilityBadges
      : ['Founded in 2005', '90%+ Client Retention', '500+ Delivered Solutions']

  const primaryLabel = data?.primaryCTA?.label || 'Speak with Our Team'
  const primaryHref = data?.primaryCTA?.href || '/contact-us'
  const secondaryLabel = data?.secondaryCTA?.label || 'Explore Careers & Team'
  const secondaryHref = data?.secondaryCTA?.href || '/career'

  return (
    <section className="relative pt-10 pb-12 sm:pt-14 sm:pb-14 lg:pt-16 lg:pb-16 bg-gradient-to-b from-[#F4F8FC] via-white to-white overflow-hidden font-['Plus_Jakarta_Sans',sans-serif]">
      {/* Decorative subtle background elements */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[450px] pointer-events-none opacity-40">
        <div className="absolute -top-24 left-1/4 w-96 h-96 bg-blue-200/50 rounded-full blur-3xl" />
        <div className="absolute top-12 right-1/4 w-96 h-96 bg-teal-100/50 rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-[92rem] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl text-left">
          {/* Eyebrow badge */}
          <div className="inline-flex items-start gap-2 px-3.5 py-1.5 rounded-full bg-[#E0F2FE] text-[#02487D] text-xs font-bold uppercase tracking-wider mb-4 sm:mb-5">
            <ShieldCheck className="w-4 h-4 text-[#14B8A6]" />
            <span>{eyebrow}</span>
          </div>

          {/* Heading */}
          <h1 className="text-2xl sm:text-4xl md:text-5xl lg:text-[54px] font-semibold text-[#0B1E3D] tracking-tight leading-[1.15] mb-4 sm:mb-6">
            {heading}
          </h1>

          {/* Description */}
          <p className="text-sm sm:text-base lg:text-lg text-gray-600 leading-relaxed max-w-3xl  mb-6 sm:mb-8">
            {description}
          </p>

          {/* Quick Credibility Badges */}
          <div className="flex flex-wrap items-center justify-start gap-3 sm:gap-6 pt-1 pb-6 sm:pb-8 text-xs sm:text-sm font-semibold text-gray-700">
            {badges.map((badge, idx) => (
              <div key={idx} className="flex items-center gap-2">
                {idx === 0 && <Award className="w-4 h-4 sm:w-5 sm:h-5 text-[#14B8A6]" />}
                {idx === 1 && <Users className="w-4 h-4 sm:w-5 sm:h-5 text-[#004771]" />}
                {idx > 1 && <span className="w-2.5 h-2.5 rounded-full bg-[#14B8A6]" />}
                <span>{badge}</span>
                {idx < badges.length - 1 && <div className="h-4 w-px bg-gray-300 hidden sm:block ml-2 sm:ml-4" />}
              </div>
            ))}
          </div>

          {/* Action CTAs */}
          <div className="flex flex-wrap items-start justify-start gap-3 sm:gap-4">
            <Link
              href={primaryHref}
              className="inline-flex items-center justify-center gap-2 px-6 sm:px-8 py-3 sm:py-3.5 rounded-xl bg-[#004771] hover:bg-[#02487D] text-white font-semibold text-sm sm:text-base shadow-md hover:shadow-lg transition-all"
            >
              <span>{primaryLabel}</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href={secondaryHref}
              className="inline-flex items-center justify-center gap-2 px-6 sm:px-8 py-3 sm:py-3.5 rounded-xl bg-white border border-gray-200 hover:border-[#004771] text-[#0B1E3D] hover:text-[#004771] font-semibold text-sm sm:text-base shadow-xs hover:bg-gray-50 transition-all"
            >
              <Users className="w-4 h-4 text-[#004771]" />
              <span>{secondaryLabel}</span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
