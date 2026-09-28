import Link from 'next/link'
import { ArrowRight, Briefcase, Sparkles, Trophy, Users, CheckCircle2 } from 'lucide-react'

const ICON_MAP: Record<string, any> = {
  trophy: Trophy,
  users: Users,
  briefcase: Briefcase,
  sparkles: Sparkles,
  check: CheckCircle2,
}

interface CareerHeroProps {
  data?: {
    eyebrow?: string
    heading?: string
    description?: string
    highlights?: Array<{ label?: string; icon?: string }>
    primaryCTA?: { label?: string; href?: string }
    secondaryCTA?: { label?: string; href?: string }
  }
  heading?: string
  description?: string
  eyebrow?: string
  openPositionsCount?: number
}

export default function CareerHero({
  data,
  heading,
  description,
  eyebrow,
  openPositionsCount = 3,
}: CareerHeroProps) {
  const eyebrowText = data?.eyebrow || eyebrow || 'CAREERS AT TRAVASH'
  const h1 = data?.heading || heading || 'Travash is Built for Innovators.'
  const desc =
    data?.description ||
    description ||
    'Travash is more than just a software company—it is a place where passionate developers, designers, and technologists come together to build innovative digital solutions. Work on real-world engineering problems with collaborative teams and limitless room for growth.'

  const primaryCTA = {
    label: data?.primaryCTA?.label || 'View Open Positions',
    href: data?.primaryCTA?.href || '#open-positions',
  }

  const secondaryCTA = {
    label: data?.secondaryCTA?.label || 'Life at Travash',
    href: data?.secondaryCTA?.href || '#life-at-travash',
  }

  const customHighlights = data?.highlights && data.highlights.length > 0 ? data.highlights : null

  return (
    <section className="relative pt-5 pb-5 lg:pt-5 lg:pb-5 bg-gradient-to-b from-[#F4F8FC] via-white to-white overflow-hidden font-['Plus_Jakarta_Sans',sans-serif]">
      {/* Decorative background glows */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[450px] pointer-events-none opacity-40">
        <div className="absolute -top-20 left-1/3 w-96 h-96 bg-teal-100/50 rounded-full blur-3xl" />
        <div className="absolute top-10 right-1/4 w-96 h-96 bg-blue-200/50 rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-[94rem] px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl text-left">
          {/* Eyebrow badge */}
          <div className="inline-flex items-start gap-2 px-3.5 py-1.5 rounded-full bg-[#E0F2FE] text-[#02487D] text-xs font-bold uppercase tracking-wider mb-6">
            <Sparkles className="w-4 h-4 text-[#14B8A6]" />
            <span>{eyebrowText}</span>
          </div>

          {/* Heading */}
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-semibold text-[#0B1E3D] tracking-tight leading-[1.15] mb-6">
            {h1}
          </h1>

          {/* Description */}
          <p className="text-base sm:text-lg lg:text-xl text-gray-600 leading-relaxed  mb-10">
            {desc}
          </p>

          {/* Key highlights */}
          <div className="flex flex-wrap items-start justify-start gap-4 sm:gap-8 pt-2 pb-8 text-sm font-semibold text-gray-700">
            {customHighlights ? (
              customHighlights.map((item, idx) => {
                const iconKey = (item.icon || '').toLowerCase()
                const IconComponent = ICON_MAP[iconKey] || Briefcase
                return (
                  <div key={idx} className="flex items-center gap-2">
                    <IconComponent className="w-5 h-5 text-[#14B8A6]" />
                    <span>
                      {item.label?.replace('{count}', String(openPositionsCount)) || ''}
                    </span>
                    {idx < customHighlights.length - 1 && (
                      <div className="h-4 w-px bg-gray-300 hidden sm:block ml-4" />
                    )}
                  </div>
                )
              })
            ) : (
              <>
                <div className="flex items-center gap-2">
                  <Trophy className="w-5 h-5 text-[#14B8A6]" />
                  <span>Coveted Work-Life Balance</span>
                </div>
                <div className="h-4 w-px bg-gray-300 hidden sm:block" />
                <div className="flex items-center gap-2">
                  <Users className="w-5 h-5 text-[#004771]" />
                  <span>Hybrid & Flexible Culture</span>
                </div>
                <div className="h-4 w-px bg-gray-300 hidden sm:block" />
                <div className="flex items-center gap-2">
                  <Briefcase className="w-5 h-5 text-[#14B8A6]" />
                  <span>{openPositionsCount} Open Positions Available</span>
                </div>
              </>
            )}
          </div>

          {/* Action CTAs */}
          <div className="flex flex-wrap items-start justify-start gap-4">
            <a
              href={primaryCTA.href}
              className="inline-flex items-center justify-center gap-2 px-6 sm:px-8 py-3.5 rounded-xl bg-[#004771] hover:bg-[#02487D] text-white font-semibold text-sm sm:text-base shadow-md hover:shadow-lg transition-all"
            >
              <span>{primaryCTA.label}</span>
              <ArrowRight className="w-4 h-4" />
            </a>
            <a
              href={secondaryCTA.href}
              className="inline-flex items-center justify-center px-6 sm:px-8 py-3.5 rounded-xl bg-white border border-gray-200 hover:border-gray-300 text-[#0B1E3D] font-semibold text-sm sm:text-base shadow-xs hover:bg-gray-50 transition-all"
            >
              {secondaryCTA.label}
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
