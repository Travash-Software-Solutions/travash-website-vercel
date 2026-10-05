import Image from 'next/image'
import { CheckCircle2, TrendingUp, Cpu, Globe2, Shield, Sparkles } from 'lucide-react'

interface CompanyStoryProps {
  data?: {
    eyebrow?: string
    heading?: string
    image?: { asset?: { url: string } }
    imageBadge?: string
    content?: string[]
    stats?: { value: string; label: string }[]
  }
}

export default function CompanyStory({ data }: CompanyStoryProps) {
  const eyebrow = data?.eyebrow || 'OUR HERITAGE & VISION'
  const heading = data?.heading || 'How Our Vision Became Reality'
  const imageUrl = data?.image?.asset?.url || '/About-us.png'
  const imageBadge = data?.imageBadge || 'Global Engineering & AI Lab'

  const paragraphs = data?.content && data.content.length > 0 ? data.content : [
    'Travash was founded in 2005 by a visionary Senior Technologist whose objective was to transform the way the modern enterprise viewed technology—evolving from a cost center into a strategic profit and growth center.',
    'Starting from initial engagements across the United States and subsequently expanding across Europe, the United Kingdom, and the Middle East, Travash has maintained an enviable track record of client retention exceeding 90%, navigating two decades of technological disruption with consistent engineering excellence.',
    'Today, with over 500+ successfully deployed software platforms, 250+ enterprise clients onboarded, and dedicated delivery centers in India and Dubai, we bridge strategy, product design, and deep technical execution across AI, Cloud, Enterprise Applications, and Data Engineering.',
  ]

  const stats = Array.isArray(data?.stats) && data.stats.length > 0 ? data.stats : [
    { value: '2005', label: 'Year Established' },
    { value: '500+', label: 'Projects Delivered' },
    { value: '90%+', label: 'Repeat Clients' },
  ]

  return (
    <section className="py-10 sm:py-12 lg:py-16 bg-white font-['Plus_Jakarta_Sans',sans-serif] border-b border-gray-100">
      <div className="max-w-[80rem] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left Column: Eyebrow, Title, Image */}
          <div className="lg:col-span-6">
            <span className="text-xs font-bold text-[#14B8A6] uppercase tracking-widest block mb-2 sm:mb-3">
              {eyebrow}
            </span>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#121212] tracking-tight leading-tight mb-4 sm:mb-6">
              {heading}
            </h2>

            {/* Image directly after title */}
            <div className="relative rounded-2xl sm:rounded-3xl overflow-hidden shadow-[0_12px_40px_rgba(0,71,113,0.12)] border border-gray-200/80 group bg-white">
              <div className="relative aspect-[16/10] w-full">
                <Image
                  src={imageUrl}
                  alt="Travash technology vision, innovation hub and enterprise engineering lab"
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-103"
                  sizes="(max-width: 1024px) 100vw, 600px"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0B1E3D]/85 via-[#0B1E3D]/20 to-transparent pointer-events-none" />
                <div className="absolute bottom-0 left-0 right-0 p-3.5 sm:p-5 flex items-center justify-between text-white">
                  <div className="inline-flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-full bg-black/45 backdrop-blur-md border border-white/20 text-[11px] sm:text-xs font-semibold">
                    <Sparkles className="w-3.5 h-3.5 text-[#14B8A6]" />
                    <span>{imageBadge}</span>
                  </div>
                  <span className="text-[11px] sm:text-xs font-bold text-white/90 tracking-wider uppercase bg-[#14B8A6]/25 px-2.5 py-1 rounded-md border border-[#14B8A6]/30">
                    Est. 2005
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Narrative Editorial Content & Stat Counters */}
          <div className="lg:col-span-6 lg:pl-2 flex flex-col justify-center">
            <div className="space-y-3.5 sm:space-y-4 text-gray-600">
              {paragraphs.map((p, idx) => (
                <p
                  key={idx}
                  className={`leading-relaxed text-sm sm:text-base ${
                    idx === 0 ? 'text-[#0B1E3D] font-medium text-base sm:text-lg leading-relaxed' : ''
                  }`}
                >
                  {p}
                </p>
              ))}
            </div>

            <div className="mt-6 pt-5 sm:mt-8 sm:pt-6 border-t border-gray-200/80 grid grid-cols-3 gap-3 sm:gap-6">
              {stats.map((stat, sIdx) => {
                const colors = ['text-[#004771]', 'text-[#14B8A6]', 'text-[#02487D]']
                return (
                  <div key={sIdx}>
                    <div className={`text-2xl sm:text-3xl lg:text-4xl font-extrabold ${colors[sIdx % colors.length]}`}>
                      {stat.value}
                    </div>
                    <div className="text-[11px] sm:text-xs font-semibold text-gray-500 mt-0.5">
                      {stat.label}
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

