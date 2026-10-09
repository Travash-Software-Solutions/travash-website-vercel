import { Metadata } from 'next'
import Image from 'next/image'
import Navbar from '@/components/sections/Navbar'
import Footer from '@/components/sections/Footer'
import Contact from '@/components/sections/Contact'
import { Mail, ArrowRight, Briefcase } from 'lucide-react'
import * as LucideIcons from 'lucide-react'
import { client } from '@/lib/sanity'
import { leadershipPageQuery, aboutPageQuery } from '@/lib/queries'
import { PortableText } from '@portabletext/react'

export const dynamic = 'force-dynamic'
export const revalidate = 0

async function getLeadershipData() {
  try {
    const data = await client.fetch(`{
      "leadershipPage": ${leadershipPageQuery},
      "aboutPage": ${aboutPageQuery}
    }`)
    return data || {}
  } catch {
    return {}
  }
}

export async function generateMetadata(): Promise<Metadata> {
  try {
    const data = await client.fetch(`{ "leadershipPage": ${leadershipPageQuery} }`)
    const seo = data?.leadershipPage?.leadershipPage?.seo
    if (seo) {
      return {
        title: seo.metaTitle || 'Leadership | Travash Software Solutions',
        description: seo.metaDescription,
        openGraph: {
          images: seo.ogImage?.asset?.url ? [seo.ogImage.asset.url] : [],
        },
      }
    }
  } catch (e) {}
  
  return {
    title: 'Leadership | Gaurav Gupta | Travash Software Solutions',
    description: 'Gaurav Gupta, Managing Director at Travash Software Solutions. With over 24 years of experience, he brings expertise in software architecture, enterprise systems, and product strategy.',
  }
}

// Helper to render dynamic Lucide icons
const IconComponent = ({ name, className }: { name: string; className?: string }) => {
  const Icon = (LucideIcons as any)[name]
  if (!Icon) return <Briefcase className={className} />
  return <Icon className={className} />
}

export default async function LeadershipPage() {
  const data = await getLeadershipData()
  const siteSettings = data?.aboutPage?.aboutPage?.siteSettings || {}
  
  // Try to use the dedicated leadership page first
  const pageData = data?.leadershipPage?.leadershipPage || {}
  const hero = pageData.hero || {}
  const bio = pageData.biography || []
  const highlights = pageData.careerHighlights || []

  // Fallbacks if CMS is empty
  const name = hero.name || 'Gaurav Gupta'
  const role = hero.role || 'Managing Director | Travash Software Solutions'
  const eyebrow = hero.eyebrow || 'Leadership'
  const description = hero.description || '"A Clear Vision for Technology. A Practical Understanding of Business."'
  const contactEmail = hero.contactEmail || 'contact@travash.com'
  const linkedinUrl = hero.linkedinUrl || 'https://www.linkedin.com/in/gauravgupta5/'
  const leaderImage = hero.image?.asset?.url || data?.aboutPage?.aboutPage?.leadership?.[0]?.image?.asset?.url

  return (
    <>
      <Navbar settings={siteSettings} />
      <main className="bg-white min-h-screen font-['Plus_Jakarta_Sans',sans-serif]">
        {/* Hero Section matching about-us */}
        <section className="relative pt-10 pb-12 sm:pt-14 sm:pb-14 lg:pt-16 lg:pb-16 bg-gradient-to-b from-[#F4F8FC] via-white to-white overflow-hidden">
          {/* Decorative subtle background elements */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[450px] pointer-events-none opacity-40">
            <div className="absolute -top-24 left-1/4 w-96 h-96 bg-blue-200/50 rounded-full blur-3xl" />
            <div className="absolute top-12 right-1/4 w-96 h-96 bg-teal-100/50 rounded-full blur-3xl" />
          </div>

          <div className="relative max-w-[92rem] mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col lg:flex-row gap-12 lg:gap-16 items-center justify-between w-full">
              
              {/* Profile Image - Left Side */}
              <div className="w-full lg:w-2/5 flex justify-center lg:justify-start relative">
                <div className="absolute top-4 left-4 w-60 h-60 bg-teal-100 rounded-full blur-3xl opacity-60" />
                <div className="relative w-full max-w-xs sm:max-w-sm lg:max-w-[340px] aspect-[4/4] rounded-3xl overflow-hidden shadow-lg border-4 border-white bg-gray-50 z-10 flex items-center justify-center">
                  {leaderImage ? (
                    <Image
                      src={leaderImage}
                      alt={name}
                      fill
                      sizes="(max-width: 768px) 100vw, 340px"
                      className="object-cover object-top"
                    />
                  ) : (
                    <div className="text-center p-6">
                      <div className="w-16 h-16 mx-auto mb-3 bg-gray-200 rounded-full flex items-center justify-center">
                        <Briefcase className="w-7 h-7 text-gray-400" />
                      </div>
                      <p className="text-gray-500 font-medium text-xs">{name}<br/>Profile Image</p>
                    </div>
                  )}
                </div>
              </div>

              {/* Text & Tagline - Right Side */}
              <div className="w-full lg:w-3/5 flex flex-col items-start justify-center text-left">
                {/* Eyebrow badge */}
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#E0F2FE] text-[#02487D] text-xs font-bold uppercase tracking-wider mb-4 sm:mb-5">
                  <Briefcase className="w-3.5 h-3.5 text-[#14B8A6]" />
                  <span>{eyebrow}</span>
                </div>

                <h1 className="text-3xl sm:text-5xl lg:text-6xl font-semibold text-[#121212] tracking-tight leading-[1.15] mb-2 sm:mb-3">
                  {name}
                </h1>
                
                <h2 className="text-xl sm:text-2xl text-[#004771] font-semibold mb-6">
                  {role}
                </h2>

                {/* Tagline quote box */}
                <p className="text-base sm:text-lg lg:text-xl text-gray-700 leading-relaxed max-w-3xl font-medium border-l-4 border-[#004771] pl-4 sm:pl-5 py-2 bg-[#E0F2FE]/40 rounded-r-xl">
                  Gaurav Gupta established Travash Software Solutions with a conviction that continues to guide the company: <span className="text-[#004771] font-bold">technology should create meaningful value for the businesses and people who rely on it.</span>
                </p>
              </div>

            </div>
          </div>
        </section>

        {/* Content Section */}
        <section className="py-16 sm:py-24 relative overflow-hidden bg-white">
          <div className="max-w-[80rem] mx-auto px-4 sm:px-6 lg:px-8 relative z-10 flex flex-col lg:flex-row gap-16 lg:gap-24">
            
            {/* Left Col: Main Body Text */}
            <div className="flex-1 max-w-4xl">
              <div className="prose prose-lg sm:prose-xl prose-blue max-w-none text-gray-700 leading-relaxed space-y-6">
                {bio && bio.length > 0 ? (
                  <PortableText value={bio} />
                ) : (
                  <>
                    <p className="text-lg sm:text-xl font-medium text-gray-700 leading-relaxed">
                      With over <strong className="text-[#004771]">24 years of experience</strong> in the IT industry, Gaurav brings expertise in Product Lifecycle Management (PLM), software architecture, and enterprise systems. His work with organisations including GE, John Deere, Satyam, and Geometric Software gave him firsthand insight into complex business environments and the importance of connecting technical decisions with commercial priorities.
                    </p>
                    
                    <h3 className="text-2xl font-bold text-[#0B1E3D] mt-12 mb-4">Building Travash Around Client Needs</h3>
                    <p>
                      Gaurav recognised that the success of a software project depends as much on understanding the business as it does on engineering. He built Travash around that understanding, bringing together technical expertise, thoughtful problem-solving, and a commitment to delivery.
                    </p>
                    <p>
                      Under his leadership, the company serves startups and enterprises across the United States, the United Kingdom, Europe, and the Middle East. Its capabilities span custom web and mobile applications, enterprise software, MVP development, and offshore development services. A client retention rate of over 90% reflects the lasting relationships Travash has developed over the years.
                    </p>

                    <h3 className="text-2xl font-bold text-[#0B1E3D] mt-12 mb-4">An Entrepreneurial Perspective</h3>
                    <p>
                      Beyond Travash, Gaurav founded <strong>Indispare</strong>, an industrial parts marketplace that combines technology with supply chain innovation. This venture extends his interest in solving practical business problems and creating opportunities through digital platforms.
                    </p>
                    <p>
                      His experience as both a technology professional and an entrepreneur informs how he approaches product strategy, guides distributed teams, and helps clients move from an initial concept to a working solution.
                    </p>

                    <h3 className="text-2xl font-bold text-[#0B1E3D] mt-12 mb-4">Guiding the Way Forward</h3>
                    <p>
                      An Electrical Engineering graduate of Delhi College of Engineering, Gaurav combines an analytical foundation with a belief in the people behind every successful project.
                    </p>
                    <p>
                      At Travash, his focus remains on building capable teams, earning client confidence, and delivering software that supports business growth. He is motivated by the challenge of solving difficult problems—and by seeing the work make a useful difference.
                    </p>
                  </>
                )}
              </div>
            </div>

            {/* Right Col: Quick Facts Sidebar */}
            <div className="w-full lg:w-80 shrink-0">
              <div className="sticky top-28 bg-[#F8FAFC] rounded-2xl p-6 sm:p-8 border border-gray-100 shadow-sm">
                <h3 className="text-lg font-bold text-[#0B1E3D] mb-6 border-b border-gray-200 pb-4">Career Highlights</h3>
                
                <ul className="space-y-6">
                  {highlights && highlights.length > 0 ? (
                    highlights.map((highlight: any, idx: number) => (
                      <li key={idx} className="flex gap-4">
                        <div className="w-10 h-10 shrink-0 bg-[#E0F2FE] text-[#004771] rounded-full flex items-center justify-center">
                          <IconComponent name={highlight.iconName} className="w-5 h-5" />
                        </div>
                        <div>
                          <h4 className="text-sm font-bold text-[#0B1E3D]">{highlight.value}</h4>
                          <p className="text-xs text-gray-500 mt-1">{highlight.label}</p>
                        </div>
                      </li>
                    ))
                  ) : (
                    <>
                      <li className="flex gap-4">
                        <div className="w-10 h-10 shrink-0 bg-[#E0F2FE] text-[#004771] rounded-full flex items-center justify-center">
                          <IconComponent name="Globe" className="w-5 h-5" />
                        </div>
                        <div>
                          <h4 className="text-sm font-bold text-[#0B1E3D]">24+ Years</h4>
                          <p className="text-xs text-gray-500 mt-1">IT Industry Experience</p>
                        </div>
                      </li>
                      <li className="flex gap-4">
                        <div className="w-10 h-10 shrink-0 bg-[#E0F2FE] text-[#004771] rounded-full flex items-center justify-center">
                          <IconComponent name="BookOpen" className="w-5 h-5" />
                        </div>
                        <div>
                          <h4 className="text-sm font-bold text-[#0B1E3D]">Expertise</h4>
                          <p className="text-xs text-gray-500 mt-1">PLM, Enterprise Systems, Software Architecture</p>
                        </div>
                      </li>
                      <li className="flex gap-4">
                        <div className="w-10 h-10 shrink-0 bg-[#E0F2FE] text-[#004771] rounded-full flex items-center justify-center">
                          <IconComponent name="GraduationCap" className="w-5 h-5" />
                        </div>
                        <div>
                          <h4 className="text-sm font-bold text-[#0B1E3D]">Education</h4>
                          <p className="text-xs text-gray-500 mt-1">Electrical Engineering, Delhi College of Engineering</p>
                        </div>
                      </li>
                    </>
                  )}
                </ul>
                
                <div className="mt-8 pt-6 border-t border-gray-200">
                  <a href="/about-us" className="group flex items-center gap-2 text-sm font-bold text-[#004771] hover:text-[#02487D] transition-colors">
                    <span>Read About Travash</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </a>
                </div>
              </div>
            </div>

          </div>
        </section>
        
        <Contact />
      </main>
      <Footer settings={siteSettings} />
    </>
  )
}
