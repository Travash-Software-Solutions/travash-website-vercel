'use client'

import { motion } from 'framer-motion'
import { Layers, UserCheck, Database, GitBranch } from 'lucide-react'

interface ComplexityItem {
  title: string
  description: string
  icon?: string
}

const COMPLEXITY_ICONS: Record<string, typeof Layers> = {
  volume: Layers,
  identity: UserCheck,
  sources: Database,
  exception: GitBranch,
}

export default function ComplexityGrid({ items }: { items: ComplexityItem[] }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-6">
      {items.map((item, idx) => {
        const Icon = (item.icon && COMPLEXITY_ICONS[item.icon]) || Layers
        return (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.5, delay: idx * 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="bg-white border border-gray-200/90 rounded-2xl p-7 shadow-xs hover:border-[#0B4785]/40 hover:shadow-md transition-all duration-300 flex flex-col justify-between group"
          >
            <div>
              <div className="w-12 h-12 rounded-xl bg-[#EEF4FB] border border-[#D5E4F5] text-[#0B4785] flex items-center justify-center mb-5 group-hover:scale-110 group-hover:bg-[#0B4785] group-hover:text-white transition-all duration-300">
                <Icon className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold text-[#121212] group-hover:text-[#0B4785] transition-colors duration-200 mb-2 leading-snug">
                {item.title}
              </h3>
              <p className="text-sm text-gray-600 leading-relaxed font-normal">
                {item.description}
              </p>
            </div>
          </motion.div>
        )
      })}
    </div>
  )
}
