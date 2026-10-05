import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { client } from '@/lib/sanity'
import { siteSettingsQuery, allIndustriesQuery } from '@/lib/queries'
import { INDUSTRIES_MAP, ALL_INDUSTRIES_LIST, type IndustryDetailData } from '@/lib/industry-data'
import Navbar from '@/components/sections/Navbar'
import Footer from '@/components/sections/Footer'
import Contact from '@/components/sections/Contact'
import {
  ShieldCheck,
  CheckCircle2,
  ArrowRight,
  Sparkles,
  Zap,
  TrendingUp,
  Cpu,
  Layers,
  Lock,
  ChevronRight,
} from 'lucide-react'

export const dynamic = 'force-dynamic'
export const revalidate = 0

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const industry = INDUSTRIES_MAP[slug] || null

  if (!industry) {
    return {
      title: 'Industry Solutions | Travash',
    }
  }

  const canonicalUrl = `https://travash.com/industries/${slug}`

  return {
    title: `${industry.title} Software Engineering & AI Solutions | Travash`,
    description: industry.overview.slice(0, 160),
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title: `${industry.title} | Travash Software Solutions`,
      description: industry.overview.slice(0, 160),
      url: canonicalUrl,
      siteName: 'Travash Software Solutions',
      type: 'website',
      images: industry.heroImage ? [{ url: industry.heroImage }] : [],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${industry.title} | Travash Software Solutions`,
      description: industry.overview.slice(0, 160),
      images: industry.heroImage ? [industry.heroImage] : [],
    },
    robots: {
      index: true,
      follow: true,
    },
  }
}

export async function generateStaticParams() {
  return ALL_INDUSTRIES_LIST.map((ind) => ({ slug: ind.slug }))
}

async function getIndustryPageData() {
  try {
    const siteSettings = await client.fetch(siteSettingsQuery)
    return { siteSettings }
  } catch {
    return { siteSettings: null }
  }
}

export default async function IndustryDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const industry: IndustryDetailData | undefined = INDUSTRIES_MAP[slug]

  if (!industry) {
    notFound()
  }

  const { siteSettings } = await getIndustryPageData()

  const industryUrl = `https://travash.com/industries/${slug}`
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: `${industry.title} Industry Solutions`,
    description: industry.overview,
    publisher: {
      '@type': 'Organization',
      name: 'Travash Software Solutions',
      logo: {
        '@type': 'ImageObject',
        url: 'https://travash.com/travash-latest-logo.svg'
      }
    },
    url: industryUrl
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Navbar settings={siteSettings} />
      <main className="min-h-screen bg-white font-['Plus_Jakarta_Sans',sans-serif] overflow-x-hidden">
        {/* 1. Industry Hero Section */}
        <section className="relative pt-14 pb-16 lg:pt-20 lg:pb-24 bg-gradient-to-b from-[#F4F8FC] via-white to-white overflow-hidden">
          {/* Subtle Background Glows */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[450px] pointer-events-none opacity-40">
            <div className="absolute -top-20 left-1/4 w-96 h-96 bg-blue-200/50 rounded-full blur-3xl" />
            <div className="absolute top-10 right-1/4 w-96 h-96 bg-teal-100/50 rounded-full blur-3xl" />
          </div>

          <div className="relative max-w-[94rem] mx-auto px-4 sm:px-6 lg:px-8">
            {/* Breadcrumbs */}
            <div className="flex items-center gap-2 text-xs font-semibold text-gray-500 mb-6">
              <Link href="/" className="hover:text-[#004771]">Home</Link>
              <ChevronRight className="w-3.5 h-3.5" />
              <Link href="/industries" className="hover:text-[#004771]">Industries</Link>
              <ChevronRight className="w-3.5 h-3.5" />
              <span className="text-[#004771] font-bold">{industry.title}</span>
            </div>

            <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-center">
              {/* Left Column: Heading & Value Proposition */}
              <div className="lg:col-span-7 space-y-6">
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#E0F2FE] text-[#004771] text-xs font-bold uppercase tracking-wider shadow-2xs">
                  <Sparkles className="w-3.5 h-3.5 text-[#14B8A6]" />
                  <span>{industry.eyebrow}</span>
                </div>

                <h1 className="text-3xl sm:text-5xl lg:text-6xl font-Semibold text-[#0B1E3D] tracking-tight leading-[1.15]">
                  {industry.title}
                </h1>

                <p className="text-lg sm:text-xl text-gray-600 leading-relaxed max-w-2xl">
                  {industry.tagline}
                </p>

                <div className="flex flex-wrap items-center gap-4 pt-2">
                  <Link
                    href="/contact-us"
                    className="px-6 sm:px-8 py-3.5 rounded-xl bg-[#004771] hover:bg-[#02487D] text-white font-bold text-sm sm:text-base shadow-md hover:shadow-lg transition-all flex items-center gap-2"
                  >
                    <span>Consult Industry Specialist</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                  <Link
                    href="/portfolio"
                    className="px-6 sm:px-8 py-3.5 rounded-xl bg-white border border-gray-200 hover:border-gray-300 text-[#0B1E3D] font-bold text-sm sm:text-base shadow-xs hover:bg-gray-50 transition-all"
                  >
                    View Related Case Studies
                  </Link>
                </div>
              </div>

              {/* Right Column: Visual Card */}
              <div className="lg:col-span-5">
                <div className="relative aspect-[4/3] rounded-3xl overflow-hidden shadow-[0_16px_50px_rgba(11,71,133,0.14)] border border-gray-200/90 group">
                  <Image
                    src={industry.heroImage}
                    alt={industry.title}
                    fill
                    priority
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                    sizes="(max-width: 1024px) 100vw, 500px"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0B1E3D]/90 via-[#0B1E3D]/25 to-transparent" />
                  <div className="absolute bottom-6 left-6 right-6 text-white">
                    <span className="text-xs font-bold uppercase tracking-wider text-teal-300 block mb-1">
                      Targeted Engineering Practice
                    </span>
                    <h3 className="text-lg !text-white font-bold">
                      Proven Enterprise Execution
                    </h3>
                  </div>
                </div>
              </div>
            </div>

            {/* Metrics Ribbon */}
            <div className="mt-16 pt-12 border-t border-gray-100 grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8">
              {industry.metrics.map((m, idx) => (
                <div key={idx} className="p-6 rounded-2xl bg-[#F8FAFC] border border-gray-100">
                  <div className="text-3xl sm:text-4xl font-extrabold text-[#004771] mb-1">
                    {m.value}
                  </div>
                  <div className="text-xs sm:text-sm font-semibold text-gray-600 leading-snug">
                    {m.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 2. Overview Narrative */}
        <section className="py-16 sm:py-20 bg-white border-y border-gray-100">
          <div className="max-w-[80rem] mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto text-center space-y-6">
              <span className="text-xs font-bold text-[#14B8A6] uppercase tracking-widest block">
                STRATEGIC OVERVIEW
              </span>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#0B1E3D] tracking-tight">
                Architecting High-Consequence Digital Systems for {industry.title}
              </h2>
              <p className="text-base sm:text-lg text-gray-600 leading-relaxed">
                {industry.overview}
              </p>
            </div>
          </div>
        </section>

        {/* 3. Industry Challenges & Proven Solutions */}
        <section className="py-16 sm:py-24 bg-[#F8FAFC]">
          <div className="max-w-[80rem] mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-14">
              <span className="text-xs font-bold text-[#14B8A6] uppercase tracking-widest block mb-2">
                COMMON BOTTLENECK REMOVAL
              </span>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#0B1E3D] tracking-tight">
                Key Industry Challenges We Solve
              </h2>
              <p className="text-sm sm:text-base text-gray-600 mt-2">
                How our engineering squads tackle the most complex operational and technical pain points in this vertical.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-6 sm:gap-8 max-w-6xl mx-auto">
              {industry.challenges.map((c, idx) => (
                <div
                  key={idx}
                  className="bg-white rounded-3xl p-7 sm:p-8 border border-gray-200/90 shadow-xs hover:shadow-lg transition-all flex flex-col justify-between"
                >
                  <div>
                    <div className="w-10 h-10 rounded-xl bg-[#E0F2FE] text-[#004771] flex items-center justify-center font-extrabold text-sm mb-5 shadow-2xs">
                      0{idx + 1}
                    </div>
                    <h3 className="text-lg font-bold text-[#0B1E3D] mb-3">
                      {c.title}
                    </h3>
                    <div className="space-y-3 text-xs sm:text-sm">
                      <div className="p-3.5 rounded-xl bg-red-50/60 border border-red-100 text-gray-700">
                        <span className="font-bold text-red-600 block mb-1">Challenge:</span>
                        {c.problem}
                      </div>
                      <div className="p-3.5 rounded-xl bg-teal-50/60 border border-teal-100 text-gray-700">
                        <span className="font-bold text-teal-700 block mb-1">Our Engineering Solution:</span>
                        {c.solution}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 4. Core Capabilities for This Industry */}
        <section className="py-16 sm:py-24 bg-white border-b border-gray-100">
          <div className="max-w-[80rem] mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-14">
              <span className="text-xs font-bold text-[#14B8A6] uppercase tracking-widest block mb-2">
                PRACTICE CAPABILITIES
              </span>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#0B1E3D] tracking-tight">
                Specialized Technical Capabilities
              </h2>
              <p className="text-sm sm:text-base text-gray-600 mt-2">
                Bespoke systems, integrations, and intelligent automation built specifically for {industry.title}.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
              {industry.capabilities.map((cap, idx) => (
                <div
                  key={idx}
                  className="p-6 rounded-2xl bg-[#F8FAFC] border border-gray-100 hover:border-[#004771]/30 hover:bg-white transition-all shadow-2xs hover:shadow-md"
                >
                  <div className="w-10 h-10 rounded-xl bg-[#004771] text-white flex items-center justify-center mb-4 shadow-2xs">
                    <Zap className="w-5 h-5 text-teal-300" />
                  </div>
                  <h3 className="text-base font-bold text-[#0B1E3D] mb-2">
                    {cap.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                    {cap.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 5. Technologies & Compliance Badges */}
        <section className="py-16 sm:py-20 bg-[#F8FAFC]">
          <div className="max-w-[80rem] mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-10 items-center">
              {/* Tech Stack */}
              <div className="bg-white rounded-3xl p-8 border border-gray-200/80 shadow-xs">
                <div className="flex items-center gap-2 mb-4">
                  <Cpu className="w-5 h-5 text-[#004771]" />
                  <h3 className="text-lg font-bold text-[#0B1E3D]">Core Technologies & Frameworks</h3>
                </div>
                <p className="text-xs sm:text-sm text-gray-600 mb-6">
                  Selected for exceptional concurrency, rock-solid security, and high developer velocity.
                </p>
                <div className="flex flex-wrap gap-2">
                  {industry.technologies.map((t, idx) => (
                    <span
                      key={idx}
                      className="px-3.5 py-1.5 rounded-xl bg-[#F8FAFC] border border-gray-200 text-gray-800 text-xs font-bold"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              {/* Compliance & Standards */}
              <div className="bg-gradient-to-br from-[#004771] to-[#02487D] text-white rounded-3xl p-8 shadow-md">
                <div className="flex items-center gap-2 mb-4">
                  <ShieldCheck className="w-5 h-5 text-teal-300" />
                  <h3 className="text-lg font-bold">Strict Regulatory & Security Compliance</h3>
                </div>
                <p className="text-xs sm:text-sm text-blue-100 mb-6 leading-relaxed">
                  Every line of code and cloud deployment adheres to rigorous international security frameworks.
                </p>
                <div className="flex flex-wrap gap-2.5">
                  {industry.compliance.map((c, idx) => (
                    <span
                      key={idx}
                      className="px-3.5 py-1.5 rounded-xl bg-white/15 border border-white/20 text-white text-xs font-bold flex items-center gap-1.5"
                    >
                      <CheckCircle2 className="w-3.5 h-3.5 text-teal-300" />
                      <span>{c}</span>
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 6. Case Study Highlight (If applicable) */}
        {industry.caseStudyHighlight && (
          <section className="py-16 sm:py-20 bg-white border-t border-gray-100">
            <div className="max-w-[80rem] mx-auto px-4 sm:px-6 lg:px-8">
              <div className="max-w-5xl mx-auto bg-gradient-to-br from-[#F8FAFC] to-[#EEF4FB] rounded-3xl p-8 sm:p-12 border border-blue-100/80 flex flex-col md:flex-row items-center justify-between gap-8">
                <div className="space-y-3 max-w-2xl">
                  <span className="text-xs font-bold uppercase tracking-wider text-[#14B8A6]">
                    FEATURED OUTCOME
                  </span>
                  <h3 className="text-xl sm:text-2xl font-extrabold text-[#0B1E3D]">
                    {industry.caseStudyHighlight.title}
                  </h3>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    {industry.caseStudyHighlight.description}
                  </p>
                  <div className="text-xs font-semibold text-gray-500">
                    Client: <span className="font-bold text-[#0B1E3D]">{industry.caseStudyHighlight.client}</span>
                  </div>
                </div>

                <div className="text-center md:text-right flex-shrink-0">
                  <div className="text-4xl sm:text-5xl font-extrabold text-[#004771]">
                    {industry.caseStudyHighlight.metric}
                  </div>
                  <div className="text-xs font-bold text-gray-500 uppercase tracking-wider mt-1 mb-4">
                    {industry.caseStudyHighlight.metricLabel}
                  </div>
                  <Link
                    href={industry.caseStudyHighlight.href}
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#004771] hover:bg-[#02487D] text-white text-xs font-bold transition-all shadow-sm"
                  >
                    <span>Read Full Case Study</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* 7. Contact Section */}
        <Contact />
      </main>
      <Footer settings={siteSettings} />
    </>
  )
}
