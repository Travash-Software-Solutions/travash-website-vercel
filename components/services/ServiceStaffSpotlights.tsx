'use client'

import { motion } from 'framer-motion'
import { CheckCircle2, Users, Briefcase, Building2 } from 'lucide-react'

const SPOTLIGHTS = [
  {
    icon: Users,
    number: '01',
    title: 'Niche Technology Talent Sourcing',
    challenge:
      'Companies struggling to fill highly specialized, hard-to-find technical roles in a competitive market.',
    solution:
      'Utilizing our proprietary 8-step pioneering recruitment process—from client briefing to reference checks and onboarding—we source pre-screened, elite candidates.',
    impact:
      'We successfully deploy specialized candidates across Big Data (HDFS, Spark), Cloud Services (AWS, IBM Cloud), and Enterprise Security for top-tier clients.',
    tags: ['Big Data', 'Cloud Services', 'Enterprise Security'],
  },
  {
    icon: Briefcase,
    number: '02',
    title: 'Flexible Engagement Deployments (Contract-to-Hire)',
    challenge:
      'Scaling engineering capacity for short-term and long-term projects without absorbing massive hiring risks.',
    solution:
      'We provide seamless "Contract to Hire" and "Temp/Contingent hiring" solutions, where resources are contracted to work on client sites while we manage all payroll and offshore recruitment operations.',
    impact:
      'Clients gain immediate access to top talent with the flexibility to evaluate performance before making permanent hiring decisions.',
    tags: ['Contract to Hire', 'Temp Hiring', 'Offshore Recruitment'],
  },
  {
    icon: Building2,
    number: '03',
    title: 'Enterprise Recruitment Process Outsourcing (RPO)',
    challenge:
      'Enterprises needing to completely offload their massive, time-consuming recruitment pipelines.',
    solution:
      'We implement our RPO model, handling all recruitment processes from offshore using our robust infrastructure and a dedicated recruitment team that works exclusively for the client\'s business.',
    impact:
      'Total, end-to-end recruitment management executed in a time-bound manner with a high level of transparency on resource operations.',
    tags: ['RPO', 'End-to-End Recruitment', 'Offshore Operations'],
  },
]

export default function ServiceStaffSpotlights() {
  return (
    <section
      id="case-studies"
      className="py-16 sm:py-20 lg:py-24 bg-white font-['Plus_Jakarta_Sans',sans-serif] border-b border-gray-100"
    >
      <div className="max-w-[80rem] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.6 }}
          className="mb-12 sm:mb-16"
        >
          <span className="text-xs font-bold uppercase tracking-widest text-[#004771] block mb-2">
            CLIENT SUCCESS SPOTLIGHTS
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-[40px] font-bold text-[#121212] tracking-tight leading-tight max-w-2xl">
            How We Deliver Specialized Talent at Enterprise Scale
          </h2>
        </motion.div>

        {/* Spotlights Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8 mb-12">
          {SPOTLIGHTS.map((spot, idx) => {
            const Icon = spot.icon
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="bg-[#F4F8FC] rounded-2xl p-7 sm:p-8 border border-gray-200/60 flex flex-col gap-5 hover:shadow-md transition-shadow duration-300"
              >
                {/* Number + Icon */}
                <div className="flex items-center justify-between">
                  <div className="w-11 h-11 rounded-xl bg-[#004771] text-white flex items-center justify-center shadow-sm">
                    <Icon className="w-5 h-5" />
                  </div>
                  <span className="text-3xl font-extrabold text-[#004771]/10 select-none">
                    {spot.number}
                  </span>
                </div>

                {/* Title */}
                <h3 className="text-base sm:text-lg font-bold text-[#121212] leading-snug">
                  {spot.title}
                </h3>

                {/* Three pillars */}
                <div className="flex flex-col gap-4">
                  <div>
                    <p className="text-[11px] font-bold uppercase tracking-wider text-[#DC2626] mb-1">
                      The Challenge
                    </p>
                    <p className="text-xs sm:text-[13px] text-[#475569] leading-relaxed">
                      {spot.challenge}
                    </p>
                  </div>
                  <div>
                    <p className="text-[11px] font-bold uppercase tracking-wider text-[#004771] mb-1">
                      The Travash Solution
                    </p>
                    <p className="text-xs sm:text-[13px] text-[#475569] leading-relaxed">
                      {spot.solution}
                    </p>
                  </div>
                  <div>
                    <p className="text-[11px] font-bold uppercase tracking-wider text-[#059669] mb-1">
                      The Impact
                    </p>
                    <p className="text-xs sm:text-[13px] text-[#475569] leading-relaxed">
                      {spot.impact}
                    </p>
                  </div>
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-1.5 pt-2 border-t border-gray-200/60">
                  {spot.tags.map((tag, tIdx) => (
                    <span
                      key={tIdx}
                      className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-white border border-[#004771]/20 text-[#004771] text-[10px] font-bold"
                    >
                      <CheckCircle2 className="w-2.5 h-2.5" />
                      {tag}
                    </span>
                  ))}
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
