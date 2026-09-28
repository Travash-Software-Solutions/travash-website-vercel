import { MessageSquare, ShieldCheck, Clock, Sparkles, PhoneCall } from 'lucide-react'

interface ContactHeroProps {
  heading?: string
  description?: string
  eyebrow?: string
}

export default function ContactHero({ heading, description, eyebrow }: ContactHeroProps) {
  const eyebrowText = eyebrow || 'CONNECT WITH OUR ENGINEERS'
  const h1 = heading || "Let's Architect Your Next Breakthrough"
  const desc =
    description ||
    'Share your requirements below, and our enterprise consulting specialists will reach out promptly to discuss your technical architecture, scope, and delivery timeline.'

  return (
    <section className="relative pt-14 pb-12 lg:pt-20 lg:pb-16 bg-gradient-to-b from-[#F4F8FC] via-white to-white overflow-hidden font-['Plus_Jakarta_Sans',sans-serif]">
      {/* Background glow elements */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[380px] pointer-events-none opacity-40">
        <div className="absolute -top-20 left-1/4 w-88 h-88 bg-blue-200/50 rounded-full blur-3xl" />
        <div className="absolute top-10 right-1/4 w-88 h-88 bg-teal-100/50 rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-[80rem] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          {/* Eyebrow badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#E0F2FE] text-[#02487D] text-xs font-bold uppercase tracking-wider mb-6 shadow-2xs">
            <Sparkles className="w-3.5 h-3.5 text-[#14B8A6]" />
            <span>{eyebrowText}</span>
          </div>

          {/* Heading */}
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-semibold text-[#0B1E3D] tracking-tight leading-[1.15] mb-5">
            {h1}
          </h1>

          {/* Description */}
          <p className="text-base sm:text-lg lg:text-xl text-gray-600 leading-relaxed max-w-2xl mx-auto mb-8">
            {desc}
          </p>

          {/* Quick Trust Chips */}
          <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-6 text-xs sm:text-sm font-semibold text-gray-600">
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white border border-gray-200/80 shadow-2xs">
              <Clock className="w-4 h-4 text-[#14B8A6]" />
              <span>Response &lt; 24 Business Hours</span>
            </div>
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white border border-gray-200/80 shadow-2xs">
              <ShieldCheck className="w-4 h-4 text-[#004771]" />
              <span>Enterprise Mutual NDA</span>
            </div>
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white border border-gray-200/80 shadow-2xs">
              <PhoneCall className="w-4 h-4 text-emerald-600" />
              <span>Direct Tech Lead Discussion</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

