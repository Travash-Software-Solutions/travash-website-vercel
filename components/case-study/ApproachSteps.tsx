'use client'

import { motion } from 'framer-motion'

interface ApproachStep {
  stepNumber?: string
  title: string
  description: string
}

export default function ApproachSteps({ steps }: { steps: ApproachStep[] }) {
  return (
    <div className="flex flex-col gap-4 sm:gap-5">
      {steps.map((step, idx) => {
        const stepNum = step.stepNumber || String(idx + 1).padStart(2, '0')
        return (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.5, delay: idx * 0.08, ease: [0.22, 1, 0.36, 1] }}
            className="group relative flex items-start gap-4 sm:gap-6 bg-white border border-gray-200/90 rounded-2xl p-5 sm:p-7 shadow-xs hover:border-[#0B4785]/50 hover:shadow-md transition-all duration-300"
          >
            {/* Step Number Badge */}
            <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-xl bg-gradient-to-br from-[#0B4785] to-[#0052FE] text-white font-bold text-sm sm:text-base flex items-center justify-center shrink-0 shadow-sm group-hover:scale-105 transition-all duration-300">
              {stepNum}
            </div>

            {/* Step Content */}
            <div className="flex-1 pt-0.5 sm:pt-1">
              <h3 className="text-base sm:text-lg font-bold text-[#121212] group-hover:text-[#0B4785] transition-colors duration-200 mb-1.5 leading-snug">
                {step.title}
              </h3>
              <p className="text-sm text-gray-600 leading-relaxed font-normal">
                {step.description}
              </p>
            </div>
          </motion.div>
        )
      })}
    </div>
  )
}
