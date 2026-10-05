'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Plus, Minus } from 'lucide-react'
import type { ServiceFAQ as FAQType } from '@/lib/service-data'

interface ServiceFAQProps {
  faqs: FAQType[]
  serviceTitle?: string
}

export default function ServiceFAQ({ faqs, serviceTitle }: ServiceFAQProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(0)

  if (!faqs || faqs.length === 0) return null

  const toggleFAQ = (idx: number) => {
    setOpenIndex((prev) => (prev === idx ? null : idx))
  }

  return (
    <section
      id="faq"
      className="py-14 sm:py-18 lg:py-24 bg-[#F8FAFC] font-['Plus_Jakarta_Sans',sans-serif] border-b border-gray-100 overflow-hidden"
    >
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header matching reference */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 sm:mb-16"
        >
          <span className="text-xs font-bold uppercase tracking-widest text-[#066095] block mb-2">
            Inquiries
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-[40px] font-semibold text-[#121212] tracking-tight leading-tight mb-3">
            Frequently Asked Questions
          </h2>
          <p className="text-sm sm:text-base text-gray-600 font-normal">
            Key insights into architecture security, multi-cloud strategy, migration timelines, and cost ROI.
          </p>
        </motion.div>

        {/* Accordion Container with border-t border-[#1C244B] style */}
        <div className="border-t border-[#1C244B]/20">
          {faqs.map((faq, idx) => {
            const isOpen = openIndex === idx
            const questionId = `faq-q-${idx}`
            const answerId = `faq-a-${idx}`

            return (
              <div
                key={idx}
                className="border-b border-[#1C244B]/15 transition-colors"
              >
                <button
                  id={questionId}
                  type="button"
                  aria-expanded={isOpen}
                  aria-controls={answerId}
                  onClick={() => toggleFAQ(idx)}
                  className="w-full py-6 sm:py-7 flex items-center justify-between gap-4 text-left cursor-pointer group"
                >
                  <span
                    className={`text-base sm:text-lg font-medium transition-colors ${
                      isOpen ? 'text-[#02487D] font-semibold' : 'text-[#1C244B] group-hover:text-[#02487D]'
                    }`}
                  >
                    {faq.question}
                  </span>
                  <div
                    className={`w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 transition-colors ${
                      isOpen
                        ? 'bg-[#02487D] text-white'
                        : 'bg-[#EEF4FB] text-[#1C244B] group-hover:bg-[#02487D] group-hover:text-white'
                    }`}
                  >
                    {isOpen ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                  </div>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      id={answerId}
                      role="region"
                      aria-labelledby={questionId}
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                    >
                      <div className="pb-6 sm:pb-7 pr-8 text-sm sm:text-base text-gray-600 leading-relaxed font-normal">
                        {faq.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
