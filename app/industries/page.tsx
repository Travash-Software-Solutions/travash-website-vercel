import { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { client } from '@/lib/sanity'
import { siteSettingsQuery } from '@/lib/queries'
import { ALL_INDUSTRIES_LIST } from '@/lib/industry-data'
import Navbar from '@/components/sections/Navbar'
import Footer from '@/components/sections/Footer'
import Contact from '@/components/sections/Contact'
import {
  Sparkles,
  ArrowRight,
  ShieldCheck,
  TrendingUp,
  Award,
  Globe2,
} from 'lucide-react'

export const dynamic = 'force-dynamic'
export const revalidate = 0

export async function generateMetadata(): Promise<Metadata> {
  try {
    const siteSettings = await client.fetch(siteSettingsQuery)
    const seo = siteSettings?.seo
    return {
      title: seo?.metaTitle || 'Industry Expertise & Domain Solutions | Travash',
      description:
        seo?.metaDescription ||
        'Discover Travash deep technical domain expertise across Banking & FinTech, Government, Healthcare, E-Commerce, PropTech, Travel, HR Tech, and Manufacturing.',
      alternates: {
        canonical: seo?.canonicalUrl || 'https://travash.com/industries',
      },
      openGraph: {
        title: seo?.metaTitle || 'Industry Expertise & Domain Solutions | Travash',
        description:
          seo?.metaDescription ||
          'Discover Travash deep technical domain expertise across Banking & FinTech, Government, Healthcare, E-Commerce, PropTech, Travel, HR Tech, and Manufacturing.',
        url: seo?.canonicalUrl || 'https://travash.com/industries',
        siteName: 'Travash Software Solutions',
        type: 'website',
      },
    }
  } catch {
    return {
      title: 'Industry Expertise & Domain Solutions | Travash',
      description:
        'Discover Travash deep technical domain expertise across Banking & FinTech, Government, Healthcare, E-Commerce, PropTech, Travel, HR Tech, and Manufacturing.',
    }
  }
}

async function getIndustriesPageData() {
  try {
    const siteSettings = await client.fetch(siteSettingsQuery)
    return { siteSettings }
  } catch {
    return { siteSettings: null }
  }
}

export default async function IndustriesDirectoryPage() {
  const { siteSettings } = await getIndustriesPageData()

  return (
    <>
      <Navbar settings={siteSettings} />
      <main className="bg-[#F8FAFC] font-['Plus_Jakarta_Sans',sans-serif]">
        {/* Header */}
        <section className="relative pt-16 pb-16 lg:pt-24 lg:pb-20 bg-gradient-to-b from-[#EBF3FB] via-white to-[#F8FAFC] overflow-hidden">
          <div className="max-w-[92rem] mx-auto px-4 sm:px-6 lg:px-8 text-left relative z-10">
            <div className="inline-flex items-start gap-2 px-3.5 py-1.5 rounded-full bg-[#E0F2FE] text-[#004771] text-xs font-semibold uppercase tracking-wider mb-5">
              <Sparkles className="w-3.5 h-3.5 text-[#14B8A6]" />
              <span>INDUSTRY-SPECIFIC ENGINEERING</span>
            </div>
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-semibold text-[#0B1E3D] tracking-tight leading-[1.15] max-w-4xl mb-6">
              Deep Domain Expertise Across 8+ Global Verticals
            </h1>
            <p className="text-base sm:text-lg lg:text-xl text-gray-600 max-w-3xl leading-relaxed mb-8">
              We engineer specialized digital platforms tailored to complex regulatory environments, high-concurrency transaction demands, and industry-specific workflows.
            </p>

            {/* Quick stats ribbon */}
            <div className="flex flex-wrap items-center justify-start gap-6 sm:gap-10 pt-2 pb-4 text-xs sm:text-sm font-semibold text-gray-700">
              <div className="flex items-center gap-2">
                <Award className="w-4 h-4 text-[#14B8A6]" />
                <span>500+ Delivered Platforms</span>
              </div>
              <div className="flex items-center gap-2">
                <Globe2 className="w-4 h-4 text-[#004771]" />
                <span>Global Clients Across 4 Continents</span>
              </div>
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-[#02487D]" />
                <span>Zero-Trust Security Compliant</span>
              </div>
            </div>
          </div>
        </section>

        {/* Industries Grid */}
        <section className="py-5 sm:py-10 lg:py-10">
          <div className="max-w-[80rem] mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {ALL_INDUSTRIES_LIST.map((industry) => (
                <Link
                  key={industry.slug}
                  href={`/industries/${industry.slug}`}
                  className="bg-white rounded-3xl overflow-hidden border border-gray-200/90 shadow-xs hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group flex flex-col justify-between"
                >
                  {/* Card Media Banner */}
                  <div className="relative aspect-[16/9] w-full overflow-hidden bg-slate-100">
                    <Image
                      src={industry.heroImage}
                      alt={industry.title}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0B1E3D]/80 via-transparent to-transparent" />
                    <div className="absolute bottom-3 left-4 right-4 text-white">
                      <span className="text-[10px] font-extrabold uppercase tracking-widest text-teal-300 block mb-0.5">
                        {industry.eyebrow}
                      </span>
                      <h3 className="text-lg font-bold text-white group-hover:text-teal-200 transition-colors">
                        {industry.title}
                      </h3>
                    </div>
                  </div>

                  {/* Card Content */}
                  <div className="p-6 sm:p-7 flex-1 flex flex-col justify-between">
                    <div>
                      <p className="text-xs sm:text-sm text-gray-600 line-clamp-3 leading-relaxed mb-6">
                        {industry.tagline}
                      </p>

                      {/* Highlight Metric */}
                      <div className="p-3.5 rounded-xl bg-[#F8FAFC] border border-gray-100 flex items-center justify-between mb-4">
                        <span className="text-xs font-semibold text-gray-500">
                          {industry.metrics[0]?.label}
                        </span>
                        <span className="text-sm font-extrabold text-[#004771]">
                          {industry.metrics[0]?.value}
                        </span>
                      </div>
                    </div>

                    {/* Action footer */}
                    <div className="pt-4 border-t border-gray-100 flex items-center justify-between text-xs font-bold text-[#004771] group-hover:text-[#14B8A6] transition-colors">
                      <span>Explore Industry Solutions</span>
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        <Contact />
      </main>
      <Footer settings={siteSettings} />
    </>
  )
}
