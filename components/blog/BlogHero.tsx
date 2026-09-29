import { Sparkles, BookOpen } from 'lucide-react'

interface BlogHeroProps {
  heading?: string
  description?: string
  eyebrow?: string
}

export default function BlogHero({ heading, description, eyebrow }: BlogHeroProps) {
  const eyebrowText = eyebrow || 'INSIGHTS & IDEAS'
  const h1 = heading || 'Latest Insights from Travash'
  const desc =
    description ||
    'Explore perspectives on AI, software engineering, cybersecurity, cloud architecture, data pipelines, and digital transformation written by practicing engineers.'

  return (
    <section className="relative pt-12 pb-14 lg:pt-20 lg:pb-16 bg-gradient-to-b from-[#F4F8FC] via-white to-white overflow-hidden font-['Plus_Jakarta_Sans',sans-serif]">
      {/* Decorative background glows */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[380px] pointer-events-none opacity-40">
        <div className="absolute -top-16 left-1/4 w-80 h-80 bg-teal-100/50 rounded-full blur-3xl" />
        <div className="absolute top-10 right-1/4 w-80 h-80 bg-blue-200/50 rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-[94rem] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-left">
          <div className="inline-flex items-start gap-2 px-3.5 py-1.5 rounded-full bg-[#E0F2FE] text-[#02487D] text-xs font-bold uppercase tracking-wider mb-6">
            <BookOpen className="w-3.5 h-3.5 text-[#14B8A6]" />
            <span>{eyebrowText}</span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-semibold text-[#0B1E3D] tracking-tight leading-[1.15] mb-5">
            {h1}
          </h1>

          <p className="text-base sm:text-lg text-gray-600 leading-relaxed max-w-2xl ">
            {desc}
          </p>
        </div>
      </div>
    </section>
  )
}
