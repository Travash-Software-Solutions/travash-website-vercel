import { Cpu, Layers, Sparkles } from 'lucide-react'

interface TechnologyHeroProps {
  heading?: string
  description?: string
  eyebrow?: string
}

export default function TechnologyHero({ heading, description, eyebrow }: TechnologyHeroProps) {
  const eyebrowText = eyebrow || 'TECHNOLOGY EXPERTISE'
  const h1 = heading || 'Technology That Powers Digital Transformation'
  const desc =
    description ||
    'From modern frontend frameworks and cloud-native microservices to enterprise data engineering and sovereign AI agents, explore the robust technology stacks we deploy across mission-critical enterprise environments.'

  return (
    <section className="relative pt-12 pb-14 lg:pt-20 lg:pb-16 bg-gradient-to-b from-[#F4F8FC] via-white to-white overflow-hidden font-['Plus_Jakarta_Sans',sans-serif]">
      {/* Decorative background glows */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[380px] pointer-events-none opacity-40">
        <div className="absolute -top-16 left-1/4 w-80 h-80 bg-blue-200/50 rounded-full blur-3xl" />
        <div className="absolute top-10 right-1/4 w-80 h-80 bg-teal-100/50 rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-[80rem] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#E0F2FE] text-[#02487D] text-xs font-bold uppercase tracking-wider mb-6">
            <Cpu className="w-3.5 h-3.5 text-[#14B8A6]" />
            <span>{eyebrowText}</span>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-semibold text-[#121212] tracking-tight leading-[1.15] mb-5">
            {h1}
          </h1>

          <p className="text-base sm:text-lg text-gray-600 leading-relaxed max-w-2xl mx-auto">
            {desc}
          </p>
        </div>
      </div>
    </section>
  )
}
