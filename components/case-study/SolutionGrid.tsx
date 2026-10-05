'use client'

import { motion } from 'framer-motion'
import { CheckCircle2 } from 'lucide-react'

interface SolutionItem {
  title: string
  description: string
}

export default function SolutionGrid({ items }: { items: SolutionItem[] }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-6">
      {items.map((item, idx) => (
        <motion.div
          key={idx}
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.5, delay: idx * 0.1, ease: [0.22, 1, 0.36, 1] }}
          className="bg-white border border-gray-200/90 rounded-2xl p-6 sm:p-7 shadow-xs hover:border-[#0B4785]/40 hover:shadow-md transition-all duration-300 flex flex-col justify-between group h-full"
        >
          <div className="flex-1 flex flex-col">
            <div className="w-12 h-12 rounded-xl bg-[#EEFBF3] border border-[#C6F5D8] text-[#16A34A] flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300 shrink-0">
              <CheckCircle2 className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-[#121212] group-hover:text-[#0B4785] transition-colors duration-200 mb-2 leading-snug">
              {item.title}
            </h3>
            <p className="text-sm text-gray-600 leading-relaxed font-normal">
              {item.description}
            </p>
          </div>
        </motion.div>
      ))}
    </div>
  )
}
