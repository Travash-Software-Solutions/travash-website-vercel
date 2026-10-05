'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'
import type { ServiceProcess as ProcessType } from '@/lib/service-data'

export default function ServiceProcess({ process }: { process: ProcessType }) {
  const steps = process.steps || []

  return (
    <section
      id="process"
      className="py-14 sm:py-18 lg:py-24 bg-white font-['Plus_Jakarta_Sans',sans-serif] border-b border-gray-100 overflow-hidden"
    >
      <div className="max-w-[80rem] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-12 sm:mb-16"
        >
          <span className="text-xs font-bold uppercase tracking-widest text-[#066095] block mb-2">
            Engineering Methodology
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-[40px] font-semibold text-[#121212] tracking-tight leading-tight mb-4">
            {process.heading || 'Our Infrastructure Engineering Process'}
          </h2>
          {process.description && (
            <p className="text-base sm:text-lg text-gray-600 leading-relaxed font-normal">
              {process.description}
            </p>
          )}
        </motion.div>

        {/* 4-Step Process Grid with Real Process Icon */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {steps.map((step, idx) => {
            const stepNum = step.number || String(idx + 1).padStart(2, '0')
            const stepImgUrl = typeof step.image === 'string' ? step.image : step.image?.asset?.url
            const hasValidIcon =
              typeof step.icon === 'string' &&
              (step.icon.startsWith('/') ||
                step.icon.startsWith('http://') ||
                step.icon.startsWith('https://'))
            const iconSrc: string =
              stepImgUrl || (hasValidIcon && step.icon ? step.icon : '/images/services/process-icon.svg')

            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.5, delay: idx * 0.1, ease: [0.22, 1, 0.36, 1] }}
                className="bg-[#F8FAFC] border border-gray-200/90 rounded-2xl p-6 sm:p-7 flex flex-col justify-between hover:border-[#02487D]/40 hover:shadow-md transition-all duration-300 group"
              >
                <div>
                  {/* Top Row: Icon & Step Number */}
                  <div className="flex items-center justify-between mb-5">
                    <div className="w-14 h-14 rounded-2xl bg-white border border-gray-200/80 p-2.5 flex items-center justify-center shadow-2xs group-hover:scale-105 transition-transform">
                      <Image
                        src={iconSrc}
                        alt={step.title}
                        width={36}
                        height={36}
                        className="object-contain"
                        unoptimized
                      />
                    </div>
                    <span className="text-2xl font-bold text-[#02487D]/25 font-mono">
                      {stepNum}
                    </span>
                  </div>

                  {/* Title & Description */}
                  <h3 className="text-lg font-bold text-[#121212] group-hover:text-[#02487D] transition-colors mb-2 leading-snug">
                    {step.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-gray-600 leading-relaxed font-normal">
                    {step.description}
                  </p>
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
