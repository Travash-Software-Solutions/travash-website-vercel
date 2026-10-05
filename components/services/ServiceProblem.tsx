'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'
import { AlertTriangle, CheckCircle2 } from 'lucide-react'
import type { ServiceProblemSection } from '@/lib/service-data'

export default function ServiceProblem({ problem }: { problem: ServiceProblemSection }) {
  const imageSrc =
    (typeof problem.image === 'string' ? problem.image : problem.image?.asset?.url) ||
    (typeof problem.sideImage === 'string' ? problem.sideImage : problem.sideImage?.asset?.url) ||
    '/images/services/critical.webp'

  return (
    <section id="problem" className="relative py-12 sm:py-16 lg:py-20 bg-white font-['Plus_Jakarta_Sans',sans-serif] border-b border-gray-100 overflow-x-clip">
      <div className="max-w-[80rem] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          {/* Left Column: Problem Narrative */}
          <motion.div
            initial={{ opacity: 0, x: -25 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-6 flex flex-col justify-center"
          >
            <span className="text-xs font-bold uppercase tracking-widest text-[#066095] block mb-2">
              {problem.label || 'The Problem:'}
            </span>
            <h2 className="text-2xl sm:text-3xl lg:text-[40px] font-semibold text-[#121212] tracking-tight leading-[1.2] mb-6">
              {problem.headline || problem.title || 'You are making critical decisions based on outdated spreadsheets.'}
            </h2>
            <p className="text-gray-600 text-base sm:text-lg leading-relaxed font-normal mb-8">
              {problem.description}
            </p>

            {/* Pain Points List */}
            {problem.painPoints && problem.painPoints.length > 0 && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {problem.painPoints.map((point, idx) => (
                  <div
                    key={idx}
                    className="p-4 rounded-xl bg-[#F8FAFC] border border-gray-200/80 flex items-start gap-3"
                  >
                    <div className="w-6 h-6 rounded-md bg-[#FEE2E2] text-[#DC2626] flex items-center justify-center flex-shrink-0 mt-0.5">
                      <AlertTriangle className="w-3.5 h-3.5" />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-[#121212] mb-1 leading-snug">
                        {point.title}
                      </h4>
                      <p className="text-xs text-gray-600 leading-relaxed font-normal">
                        {point.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </motion.div>

          {/* Right Column: Original Reference Image critical.webp */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96, x: 25 }}
            whileInView={{ opacity: 1, scale: 1, x: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="lg:col-span-6 flex justify-center"
          >
            <div className="relative w-full max-w-xl aspect-[16/11] rounded-2xl overflow-hidden shadow-lg border border-gray-100 group">
              <Image
                src={imageSrc}
                alt="Critical decisions based on outdated spreadsheets"
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-103"
                sizes="(max-width: 1024px) 100vw, 600px"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent pointer-events-none" />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
