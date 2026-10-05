import Image from 'next/image'
import { Sparkles, Code2, Users2, Rocket, Lightbulb } from 'lucide-react'

interface CultureSectionProps {
  teams?: {
    eyebrow?: string
    heading?: string
    description?: string
  }
  culture?: {
    heading?: string
    cardHeading?: string
    description?: string
    cardFooter?: string
  }
  pillars?: {
    title: string
    desc: string
    iconName?: string
  }[]
}

const DEFAULT_PILLARS = [
  {
    iconName: 'Code2',
    title: 'Craftsmanship Over Shortcuts',
    desc: 'Clean, secure, test-driven architectures built to scale gracefully without technical debt.',
  },
  {
    iconName: 'Lightbulb',
    title: 'Continuous Mastery',
    desc: 'Dedicated R&D time for engineers to explore generative AI, sovereign LLMs, and modern cloud patterns.',
  },
  {
    iconName: 'Users2',
    title: 'Radical Collaboration',
    desc: 'Cross-functional squads where designers, architects, and product strategists work side-by-side.',
  },
  {
    iconName: 'Rocket',
    title: 'Client-Obsessed Delivery',
    desc: 'We measure success not by lines of code deployed, but by actual business velocity and outcomes achieved.',
  },
]

const pillarIconMap: Record<string, any> = {
  Code2,
  Lightbulb,
  Users2,
  Rocket,
  Sparkles,
}

export default function CultureSection({ teams, culture, pillars }: CultureSectionProps) {
  const teamsEyebrow = teams?.eyebrow || 'THE PEOPLE BEHIND TRAVASH'
  const teamsHeading = teams?.heading || 'Our Teams'
  const teamsDesc =
    teams?.description ||
    'At Travash Software Solutions, our team is the backbone of our success. We are a passionate group of developers, designers, and innovators dedicated to building cutting-edge software solutions that drive businesses forward.'

  const cultureHeading = culture?.heading || 'Our Culture'
  const cultureCardHeading = culture?.cardHeading || 'Fostering an Environment Where Great Engineers Thrive'
  const cultureDesc =
    culture?.description ||
    'At Travash, we cultivate a culture of innovation, excellence, and collaboration. Our team thrives on cutting-edge technology, problem-solving, and client-centric strategies. We empower talent, embrace diversity, and drive digital transformation with passion and purpose—delivering impact that lasts.'
  const cultureCardFooter =
    culture?.cardFooter || 'Work-Life Balance • Psychological Safety • High Velocity'

  const activePillars = Array.isArray(pillars) && pillars.length > 0 ? pillars : DEFAULT_PILLARS

  return (
    <section className="py-10 sm:py-14 lg:py-16 bg-white font-['Plus_Jakarta_Sans',sans-serif] border-b border-gray-100">
      <div className="max-w-[80rem] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top: Teams Introduction */}
        <div className="max-w-3xl mx-auto text-center mb-8 sm:mb-12">
          <span className="text-xs font-bold text-[#14B8A6] uppercase tracking-widest block mb-2">
            {teamsEyebrow}
          </span>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#0B1E3D] tracking-tight mb-3">
            {teamsHeading} & {cultureHeading}
          </h2>
          <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
            {teamsDesc}
          </p>
        </div>

        {/* Culture Narrative & Pillars */}
        <div className="grid lg:grid-cols-12 gap-6 sm:gap-8 lg:gap-10 items-stretch max-w-6xl mx-auto">
          {/* Left: Culture Statement card */}
          <div className="lg:col-span-5 bg-gradient-to-br from-[#004771] to-[#02487D] text-white p-6 sm:p-8 lg:p-9 rounded-2xl sm:rounded-3xl shadow-md relative overflow-hidden flex flex-col justify-between">
            <div className="absolute top-0 right-0 w-48 h-48 bg-white/5 rounded-full blur-xl pointer-events-none" />
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-white text-xs font-bold mb-4 sm:mb-6">
                <Sparkles className="w-3.5 h-3.5 text-[#14B8A6]" />
                <span>HOW WE WORK</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-extrabold mb-3 leading-snug !text-white">
                {cultureCardHeading}
              </h3>
              <p className="text-xs sm:text-sm text-gray-200 leading-relaxed">
                {cultureDesc}
              </p>
            </div>
            <div className="pt-5 mt-6 border-t border-white/10 text-xs font-semibold text-[#14B8A6]">
              {cultureCardFooter}
            </div>
          </div>

          {/* Right: Culture Pillars */}
          <div className="lg:col-span-7 grid sm:grid-cols-2 gap-3.5 sm:gap-4 lg:gap-5">
            {activePillars.map((pillar, idx) => {
              const Icon = (pillar.iconName && pillarIconMap[pillar.iconName]) || Code2
              return (
                <div
                  key={idx}
                  className="bg-[#F8FAFC] rounded-2xl p-4 sm:p-5 border border-gray-100 shadow-2xs hover:border-gray-200 transition-colors"
                >
                  <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-[#E0F2FE] text-[#004771] flex items-center justify-center mb-3">
                    <Icon className="w-4 h-4 sm:w-5 sm:h-5" />
                  </div>
                  <h4 className="text-sm sm:text-base font-bold text-[#0B1E3D] mb-1">{pillar.title}</h4>
                  <p className="text-xs text-gray-600 leading-relaxed">{pillar.desc}</p>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
