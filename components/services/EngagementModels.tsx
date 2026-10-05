'use client'

import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { ArrowRight, Check } from 'lucide-react'
import type { ServiceEngagementModel } from '@/lib/service-data'

interface EngagementModelsProps {
  models: ServiceEngagementModel[]
  backgroundImage?: string
}

export default function EngagementModels({
  models,
  backgroundImage = '/images/services/engagement-bg.webp',
}: EngagementModelsProps) {
  if (!models || models.length === 0) return null

  return (
    <section
      id="engagement-models"
      className="relative py-16 sm:py-20 lg:py-28 font-['Plus_Jakarta_Sans',sans-serif] bg-cover bg-center bg-no-repeat overflow-hidden"
      style={{
        backgroundImage: `url('${backgroundImage}')`,
      }}
    >
      {/* Radial glow background */}
      <div className="absolute -top-24 left-1/3 w-96 h-96 bg-[#0284C7]/15 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-[80rem] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-12 sm:mb-16"
        >
          <span className="text-xs font-bold uppercase tracking-widest text-[#38BDF8] block mb-2">
            Tailored Collaboration
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-[42px] font-bold text-white tracking-tight leading-tight mb-3">
            Flexible Engagement Models
          </h2>
          <p className="text-base sm:text-lg text-white/85 font-normal">
            We provide senior technical talent and agile delivery pods structured around your roadmap.
          </p>
        </motion.div>

        {/* 4-Column Responsive Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {models.map((model, idx) => {
            const hasValidIcon =
              typeof model.icon === 'string' &&
              (model.icon.startsWith('/') ||
                model.icon.startsWith('http://') ||
                model.icon.startsWith('https://'))
            const iconSrc: string =
              hasValidIcon && model.icon ? model.icon : '/images/services/boosting.svg'

            const isPopular = model.badge?.toLowerCase().includes('popular')

            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.5, delay: idx * 0.1, ease: [0.22, 1, 0.36, 1] }}
                className={`rounded-2xl p-7 flex flex-col justify-between shadow-xl transition-all duration-300 relative group border ${isPopular
                  ? 'bg-white border-[#38BDF8] ring-2 ring-[#38BDF8]/20'
                  : 'bg-white border-white/10 hover:border-white/30'
                  }`}
              >
                <div>
                  {/* Top Row: Icon & Badge */}
                  <div className="flex items-center justify-between gap-2 mb-6">
                    <div className="w-12 h-12 rounded-xl bg-[#F0F7FF] flex items-center justify-center group-hover:scale-105 transition-transform">
                      <Image
                        src={iconSrc}
                        alt={model.title}
                        width={28}
                        height={28}
                        className="object-contain"
                        unoptimized
                      />
                    </div>

                    {model.badge && (
                      <span
                        className={`text-[11px] font-bold px-3 py-1 rounded-full uppercase tracking-wider ${isPopular
                          ? 'bg-[#02487D] text-white'
                          : 'bg-gray-100 text-gray-700'
                          }`}
                      >
                        {model.badge}
                      </span>
                    )}
                  </div>

                  <h3 className="text-xl font-bold text-[#121212] group-hover:text-[#02487D] transition-colors mb-3 leading-snug">
                    {model.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-gray-600 leading-relaxed font-normal mb-6">
                    {model.description}
                  </p>
                </div>

                {/* Bottom CTA Link */}
                <div className="pt-4 border-t border-gray-100">
                  <Link
                    href={model.cta?.href || '#contact'}
                    className="inline-flex items-center text-xs sm:text-sm font-bold text-[#02487D] group-hover:text-[#066095] transition-colors gap-1.5"
                  >
                    <span>{model.cta?.label || 'Get Started'}</span>
                    <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                  </Link>
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
