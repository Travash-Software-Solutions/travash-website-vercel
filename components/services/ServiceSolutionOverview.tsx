'use client'

import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { Database, Users, Eye, ArrowRight } from 'lucide-react'
import type { ServiceSolutionOverview as SolutionType } from '@/lib/service-data'

const BENEFIT_ICONS: Record<string, typeof Database> = {
  database: Database,
  users: Users,
  eye: Eye,
}

export default function ServiceSolutionOverview({ solution }: { solution: SolutionType }) {
  const rawImage =
    (typeof solution.image === 'string' ? solution.image : solution.image?.asset?.url) ||
    (typeof solution.solutionImage === 'string' ? solution.solutionImage : solution.solutionImage?.asset?.url)
  const isValidPath = typeof rawImage === 'string' && (rawImage.startsWith('/') || rawImage.startsWith('http'))
  const imageSrc = isValidPath ? rawImage : '/images/services/eradicate.webp'

  return (
    <section
      id="solution"
      className="relative py-14 sm:py-18 lg:py-24 bg-[#E7F2F7] text-black font-['Plus_Jakarta_Sans',sans-serif] overflow-x-clip"
    >
      <div className="max-w-[80rem] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14">
          {/* Left Column: Sticky Image */}
          <div className="lg:col-span-5 relative h-full">
            <div className="lg:sticky lg:top-28 z-10 self-start">
              <motion.div
                initial={{ opacity: 0, scale: 0.96, x: -25 }}
                whileInView={{ opacity: 1, scale: 1, x: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.6 }}
                className="relative w-full aspect-[16/11] rounded-2xl overflow-hidden shadow-2xl border border-white/10 group bg-white"
              >
                <Image
                  src={imageSrc}
                  alt="How Travash Solves It - Eradicate Data Silos"
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-103"
                  sizes="(max-width: 1024px) 100vw, 500px"
                />
                <div className="absolute inset-0 bg-gradient-to-tr from-[#02487D]/40 via-transparent to-transparent pointer-events-none" />
              </motion.div>
            </div>
          </div>

          {/* Right Column: Title, Description & 3 Feature Items */}
          <motion.div
            initial={{ opacity: 0, x: 25 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="lg:col-span-7 flex flex-col items-start"
          >
            <h2 className="text-3xl sm:text-4xl lg:text-[44px] font-bold text-[#121212] tracking-tight leading-tight mb-4">
              {solution.heading || 'How Travash Solves It'}
            </h2>
            <p className="text-black/85 text-base sm:text-lg leading-relaxed font-normal mb-8 max-w-2xl">
              {solution.description ||
                'We do not just visualize data; we fix the plumbing underneath it. We deploy senior data architects who untangle your fragmented systems and build a secure, centralized single source of truth.'}
            </p>

            {/* 3 Strategic Benefit Cards */}
            {solution.benefits && solution.benefits.length > 0 && (
              <div className="flex flex-col gap-4 w-full mb-8">
                {solution.benefits.map((benefit, idx) => {
                  const Icon = (benefit.icon && BENEFIT_ICONS[benefit.icon]) || Database
                  return (
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0, y: 15 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, margin: '-30px' }}
                      transition={{ duration: 0.4, delay: idx * 0.1 }}
                      className="flex items-start gap-4 p-4 sm:p-5 rounded-2xl bg-[#F8FAFC] backdrop-blur-md border border-white/15 hover:bg-white/15 transition-all duration-200"
                    >
                      <div className="w-11 h-11 rounded-xl bg-white text-[#02487D] flex items-center justify-center flex-shrink-0 shadow-sm mt-0.5">
                        <Icon className="w-5 h-5" />
                      </div>
                      <div>
                        <h3 className="text-base sm:text-lg font-bold text-[#121212] mb-1 leading-snug">
                          {benefit.title}
                        </h3>
                        <p className="text-xs sm:text-sm text-black/80 leading-relaxed font-normal">
                          {benefit.description}
                        </p>
                      </div>
                    </motion.div>
                  )
                })}
              </div>
            )}

            {/* Consultation CTA */}
            {solution.cta && (
              <Link
                href={solution.cta.href || '#contact'}
                className="btn-global h-[66px] rounded-[5px] !w-auto min-w-[260px] max-w-full inline-flex items-center justify-center bg-white text-[#02487D] hover:bg-gray-100 font-bold px-8 text-sm sm:text-base transition-all duration-200 shadow-md active:scale-95 whitespace-nowrap"
              >
                <span className="whitespace-nowrap">{solution.cta.label}</span>
                <ArrowRight className="w-4 h-4 ml-2 flex-shrink-0" />
              </Link>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  )
}
