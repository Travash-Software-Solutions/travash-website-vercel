import { Compass, Eye, CheckCircle2 } from 'lucide-react'

interface MissionVisionProps {
  data?: {
    eyebrow?: string
    heading?: string
    missionTitle?: string
    missionDescription?: string
    missionBadge?: string
    visionTitle?: string
    visionDescription?: string
    visionBadge?: string
  }
}

export default function MissionVision({ data }: MissionVisionProps) {
  const eyebrow = data?.eyebrow || 'PURPOSE & DIRECTION'
  const heading = data?.heading || 'Defining Our Purpose: Mission & Vision'
  const missionTitle = data?.missionTitle || 'Our Mission'
  const missionDescription =
    data?.missionDescription ||
    'To empower global enterprises, forward-thinking startups, and public-sector institutions with production-grade digital solutions, transforming software from an operational cost into a sustainable profit and growth driver.'
  const missionBadge = data?.missionBadge || 'Engineering excellence with measurable ROI'

  const visionTitle = data?.visionTitle || 'Our Vision'
  const visionDescription =
    data?.visionDescription ||
    'To be the world’s most trusted technology partner, renowned for engineering rigor, innovative AI acceleration, and enduring client partnerships exceeding 90% retention.'
  const visionBadge = data?.visionBadge || 'Built for high-trust, multi-year technological leadership'

  return (
    <section className="py-10 sm:py-12 lg:py-14 bg-white font-['Plus_Jakarta_Sans',sans-serif] border-b border-gray-100">
      <div className="max-w-[84rem] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center  mb-8 sm:mb-10">
          <span className="text-xs font-bold text-[#14B8A6] uppercase tracking-widest block mb-2">
            {eyebrow}
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#121212] tracking-tight">
            {heading}
          </h2>
        </div>

        <div className="grid md:grid-cols-2 gap-6 sm:gap-8 max-w-5xl mx-auto">
          {/* Mission Card */}
          <div className="relative rounded-2xl sm:rounded-3xl p-6 sm:p-8 lg:p-9 bg-gradient-to-br from-[#0B1E3D] to-[#004771] text-white shadow-lg overflow-hidden flex flex-col justify-between">
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-2xl pointer-events-none" />
            <div>
              <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-xl sm:rounded-2xl bg-white/10 backdrop-blur-md flex items-center justify-center text-[#14B8A6] mb-4 sm:mb-5">
                <Compass className="w-5 h-5 sm:w-6 sm:h-6" />
              </div>
              <h3 className="text-lg !text-white sm:text-xl font-bold mb-2.5 sm:mb-3 tracking-tight">{missionTitle}</h3>
              <p className="text-xs sm:text-sm lg:text-base text-gray-200 leading-relaxed">{missionDescription}</p>
            </div>
            <div className="mt-6 pt-4 sm:mt-8 sm:pt-5 border-t border-white/10 flex items-center gap-2 text-xs font-semibold text-[#14B8A6]">
              <CheckCircle2 className="w-4 h-4 shrink-0" />
              <span>{missionBadge}</span>
            </div>
          </div>

          {/* Vision Card */}
          <div className="relative rounded-2xl sm:rounded-3xl p-6 sm:p-8 lg:p-9 bg-[#EEF4FB] text-[#0B1E3D] border border-blue-100 shadow-xs flex flex-col justify-between">
            <div>
              <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-xl sm:rounded-2xl bg-[#004771] flex items-center justify-center text-white mb-4 sm:mb-5">
                <Eye className="w-5 h-5 sm:w-6 sm:h-6" />
              </div>
              <h3 className="text-lg sm:text-xl font-bold mb-2.5 sm:mb-3 tracking-tight">{visionTitle}</h3>
              <p className="text-xs sm:text-sm lg:text-base text-gray-600 leading-relaxed">{visionDescription}</p>
            </div>
            <div className="mt-6 pt-4 sm:mt-8 sm:pt-5 border-t border-gray-200 flex items-center gap-2 text-xs font-semibold text-[#004771]">
              <CheckCircle2 className="w-4 h-4 text-[#14B8A6] shrink-0" />
              <span>{visionBadge}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
