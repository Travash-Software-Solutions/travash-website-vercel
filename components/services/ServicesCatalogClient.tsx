'use client'

import { useState } from 'react'
import Link from 'next/link'
import Navbar from '@/components/sections/Navbar'
import Footer from '@/components/sections/Footer'
import Contact from '@/components/sections/Contact'
import {
  Bot,
  Database,
  Code2,
  Cloud,
  Layers,
  Sparkles,
  ShieldCheck,
  Users,
  Cpu,
  Briefcase,
  ArrowRight,
  CheckCircle2,
  Search,
  Award,
  Zap,
  Lock,
  Headphones,
} from 'lucide-react'

interface ServiceEntry {
  title: string
  slug: string
  href: string
  category: 'AI & Data' | 'Cloud & DevOps' | 'Software & Apps' | 'Talent & Teams'
  categoryLabel: string
  badge?: string
  description: string
  icon: any
  features: string[]
  technologies: string[]
}

const ALL_SERVICES_CATALOG: ServiceEntry[] = [
  {
    title: 'AI & Data Engineering',
    slug: 'ai-data',
    href: '/services/ai-data',
    category: 'AI & Data',
    categoryLabel: 'AI & Intelligent Systems',
    badge: 'Popular • AI-First',
    description:
      'Architect autonomous AI agents, private LLM fine-tuning, vector search pipelines, and multi-modal generative AI workflows that automate critical business decisions.',
    icon: Bot,
    features: [
      'Production-ready autonomous AI agent squads',
      'Private cloud LLM deployment & zero data leak',
      'RAG architectures & high-accuracy semantic search',
      'Continuous model evaluation & hallucination guards',
    ],
    technologies: ['Python', 'LangChain', 'Llama 3', 'Pinecone', 'FastAPI', 'OpenAI'],
  },
  {
    title: 'Data & Analytics Solutions',
    slug: 'data-analytics-solutions',
    href: '/services/data-analytics-solutions',
    category: 'AI & Data',
    categoryLabel: 'AI & Intelligent Systems',
    description:
      'Transform raw enterprise data into measurable growth. We engineer high-speed streaming pipelines, scalable cloud warehouses, and custom executive BI dashboards.',
    icon: Database,
    features: [
      'High-throughput real-time ETL & streaming pipelines',
      'Modern cloud data warehousing & lakehouse migration',
      'Executive BI reporting & automated metrics dashboards',
      'Strict data governance, privacy, and SOC2 compliance',
    ],
    technologies: ['Snowflake', 'PostgreSQL', 'Kafka', 'dbt', 'BigQuery', 'PowerBI'],
  },
  {
    title: 'Platform Engineering',
    slug: 'platform-engineering',
    href: '/services/platform-engineering',
    category: 'AI & Data',
    categoryLabel: 'AI & Intelligent Systems',
    description:
      'Build scalable multi-tenant SaaS foundations, internal developer platforms (IDP), and unified API architectures that empower teams to ship features 3x faster.',
    icon: Layers,
    features: [
      'Multi-tenant SaaS tenant isolation & licensing',
      'Internal developer portals & automated scaffolding',
      'High-concurrency GraphQL and REST gateway clusters',
      'Self-healing containerized microservices orchestration',
    ],
    technologies: ['Kubernetes', 'Go', 'Docker', 'GraphQL', 'AWS', 'Terraform'],
  },
  {
    title: 'Software Engineering',
    slug: 'software',
    href: '/services/software',
    category: 'Software & Apps',
    categoryLabel: 'Software & Core Architecture',
    badge: 'Core Practice',
    description:
      'Full-lifecycle software product development from conceptual architecture to high-load production deployment, combining clean code with modular scalability.',
    icon: Code2,
    features: [
      'Full-stack web application development',
      'Resilient backend microservices architecture',
      'High-security enterprise API integration',
      'Zero-technical-debt engineering standards',
    ],
    technologies: ['React', 'Next.js', 'Node.js', 'Java', 'TypeScript', 'PostgreSQL'],
  },
  {
    title: 'Cloud & DevOps Engineering',
    slug: 'cloud',
    href: '/services/cloud',
    category: 'Cloud & DevOps',
    categoryLabel: 'Cloud & DevOps',
    description:
      'Architect resilient multi-cloud infrastructure, automate zero-downtime CI/CD deployment pipelines, and optimize cloud infrastructure spend across AWS, Azure, and GCP.',
    icon: Cloud,
    features: [
      'Automated Terraform infrastructure-as-code (IaC)',
      'Zero-downtime blue/green & canary deployments',
      'Cost optimization & multi-cloud arbitrage audits',
      '24/7 proactive telemetry and incident response',
    ],
    technologies: ['AWS', 'Azure', 'Kubernetes', 'GitHub Actions', 'Terraform', 'Prometheus'],
  },
  {
    title: 'Enterprise Applications',
    slug: 'enterprise',
    href: '/services/enterprise',
    category: 'Software & Apps',
    categoryLabel: 'Software & Core Architecture',
    description:
      'Modernize legacy monoliths into agile microservices, integrate mission-critical ERPs and CRMs, and automate complex enterprise operational workflows.',
    icon: Cpu,
    features: [
      'Legacy modernization with zero operational disruption',
      'Custom ERP, CRM, and supply chain portal development',
      'Enterprise database migration & replication engines',
      'Role-based access control (RBAC) and enterprise SSO',
    ],
    technologies: ['Java Spring Boot', 'C# .NET', 'Oracle', 'Kafka', 'Redis', 'Angular'],
  },
  {
    title: 'Digital Experiences & UI/UX',
    slug: 'digital',
    href: '/services/digital',
    category: 'Software & Apps',
    categoryLabel: 'Software & Core Architecture',
    description:
      'Engineer accessible, high-conversion digital experiences, brand design systems, and responsive web platforms backed by behavioral user research.',
    icon: Sparkles,
    features: [
      'Conversion-optimized design systems & brand UI',
      'WCAG 2.1 AA accessible, responsive frontend code',
      'Complex interactive data visualization dashboards',
      'Micro-animations and fluid performance tuning',
    ],
    technologies: ['Next.js', 'Tailwind CSS', 'Figma', 'Framer Motion', 'TypeScript'],
  },
  {
    title: 'Dedicated Tech Teams',
    slug: 'dedicated-teams',
    href: '/services/dedicated-teams',
    category: 'Talent & Teams',
    categoryLabel: 'Elastic Talent & Teams',
    badge: 'Popular',
    description:
      'Scale your engineering capacity instantly with pre-vetted senior software engineers, AI researchers, and DevOps architects embedded directly into your sprint cycles.',
    icon: Users,
    features: [
      '100% senior-level vetted engineering talent',
      'Time-zone aligned sprint collaboration & daily standups',
      'Fast onboarding in under 10 business days',
      'Flexible contracts with zero recruitment overhead',
    ],
    technologies: ['Full-Stack Squads', 'Tech Leads', 'DevOps Engineers', 'QA Leads'],
  },
  {
    title: 'Quality Assurance & Automated Testing',
    slug: 'qa',
    href: '/services/qa',
    category: 'Talent & Teams',
    categoryLabel: 'Elastic Talent & Teams',
    description:
      'Ensure software reliability with automated end-to-end testing frameworks, stress benchmarks, and continuous security regression suites.',
    icon: ShieldCheck,
    features: [
      'Automated Cypress & Playwright E2E testing suites',
      'Load, stress, and high-concurrency performance audits',
      'Continuous security vulnerability and OWASP scans',
      'Cross-device, cross-browser regression test coverage',
    ],
    technologies: ['Playwright', 'Cypress', 'Jest', 'Postman', 'JMeter', 'SonarQube'],
  },
  {
    title: 'Staff Augmentation',
    slug: 'staff-augmentation',
    href: '/services/staff-augmentation',
    category: 'Talent & Teams',
    categoryLabel: 'Elastic Talent & Teams',
    description:
      'Bridge specialized technical skill gaps on demand with senior software specialists in AI, cloud architecture, and mission-critical systems.',
    icon: Briefcase,
    features: [
      'On-demand niche technology specialists',
      'Direct client communication and workflow integration',
      'Seamless scaling up or down as project demands shift',
      'Transparent hourly or monthly predictable billing',
    ],
    technologies: ['AI Specialists', 'Cloud Architects', 'Full-Stack Developers', 'Data Engineers'],
  },
]

const CATEGORIES = [
  'All Services',
  'AI & Data',
  'Cloud & DevOps',
  'Software & Apps',
  'Talent & Teams',
] as const

interface ServicesCatalogClientProps {
  siteSettings?: any
}

export default function ServicesCatalogClient({ siteSettings }: ServicesCatalogClientProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>('All Services')
  const [searchQuery, setSearchQuery] = useState('')

  const filteredServices = ALL_SERVICES_CATALOG.filter((service) => {
    const matchesCategory =
      selectedCategory === 'All Services' || service.category === selectedCategory
    const matchesSearch =
      service.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      service.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      service.technologies.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()))

    return matchesCategory && matchesSearch
  })

  return (
    <>
      <Navbar settings={siteSettings} />
      <main className="bg-white font-['Plus_Jakarta_Sans',sans-serif] min-h-screen">
        {/* Header Hero */}
        <section className="relative pt-16 pb-14 lg:pt-24 lg:pb-20 bg-gradient-to-b from-[#F4F8FC] via-white to-white overflow-hidden">
          {/* Decorative Backdrops */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[450px] pointer-events-none opacity-40">
            <div className="absolute -top-20 left-1/4 w-96 h-96 bg-blue-200/50 rounded-full blur-3xl" />
            <div className="absolute top-10 right-1/4 w-96 h-96 bg-teal-100/50 rounded-full blur-3xl" />
          </div>

          <div className="max-w-[94rem]  px-4 sm:px-6 lg:px-8 text-left relative z-10">
            <div className="inline-flex items-start gap-2 px-3.5 py-1.5 rounded-full bg-[#E0F2FE] text-[#004771] text-xs font-bold uppercase tracking-wider mb-5 shadow-2xs max-w-4xl">
              <Sparkles className="w-3.5 h-3.5 text-[#14B8A6]" />
              <span>ENTERPRISE ENGINEERING CAPABILITIES</span>
            </div>

            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-semibold text-[#0B1E3D] tracking-tight leading-[1.15]  mb-6 max-w-4xl">
              Engineering Rigor Meets Artificial Intelligence
            </h1>

            <p className="text-base sm:text-lg lg:text-xl text-gray-600 max-w-4xl text-left leading-relaxed mb-10">
              From mission-critical microservices and high-throughput data platforms to sovereign AI agent systems and dedicated agile squads, explore how we accelerate enterprise scale.
            </p>

            {/* Credibility Ribbons */}
            <div className="flex flex-wrap items-start justify-start gap-6 sm:gap-10 text-xs sm:text-sm font-semibold text-gray-700">
              <div className="flex items-start gap-2">
                <Award className="w-4 h-4 text-[#14B8A6]" />
                <span>20 Years Experience (Est. 2005)</span>
              </div>
              <div className="flex items-start gap-2">
                <Users className="w-4 h-4 text-[#004771]" />
                <span>90%+ Repeat Client Retention</span>
              </div>
              <div className="flex items-start gap-2">
                <ShieldCheck className="w-4 h-4 text-[#02487D]" />
                <span>500+ Delivered Enterprise Systems</span>
              </div>
            </div>
          </div>
        </section>

        {/* Filter & Search Bar */}
        <section className="py-8 bg-white border-y border-gray-200/80 sticky top-16 sm:top-20 z-30 shadow-xs">
          <div className="max-w-[80rem] mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
              {/* Category Filter Pills */}
              <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
                {CATEGORIES.map((cat) => {
                  const isSelected = selectedCategory === cat
                  return (
                    <button
                      key={cat}
                      onClick={() => setSelectedCategory(cat)}
                      className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${isSelected
                          ? 'bg-[#004771] text-white shadow-sm ring-2 ring-[#E0F2FE]'
                          : 'bg-[#F8FAFC] text-gray-600 hover:bg-gray-100 hover:text-gray-900 border border-gray-200/80'
                        }`}
                    >
                      {cat}
                    </button>
                  )
                })}
              </div>

              {/* Search Box */}
              <div className="relative w-full md:w-72">
                <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search services or tech..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-[#F8FAFC] rounded-xl pl-9 pr-4 py-2 text-xs sm:text-sm text-[#0B1E3D] placeholder:text-gray-400 border border-gray-200 focus:outline-none focus:border-[#004771] focus:bg-white transition-all shadow-2xs"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Services Grid */}
        <section className="py-16 sm:py-20 lg:py-24">
          <div className="max-w-[80rem] mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between mb-8">
              <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">
                Showing {filteredServices.length} {filteredServices.length === 1 ? 'Service' : 'Services'}
              </span>
              <span className="text-xs font-semibold text-[#004771]">
                Enterprise-Grade SLAs Guaranteed
              </span>
            </div>

            {filteredServices.length === 0 ? (
              <div className="text-center py-20 bg-white rounded-3xl border border-gray-200">
                <p className="text-base text-gray-600">No services match your search criteria.</p>
                <button
                  onClick={() => {
                    setSelectedCategory('All Services')
                    setSearchQuery('')
                  }}
                  className="mt-4 text-sm font-bold text-[#004771] hover:underline cursor-pointer"
                >
                  Clear filters
                </button>
              </div>
            ) : (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredServices.map((service) => {
                  const Icon = service.icon
                  return (
                    <div
                      key={service.slug}
                      className="bg-white rounded-3xl p-7 sm:p-8 border border-gray-200/90 shadow-xs hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group flex flex-col justify-between"
                    >
                      <div>
                        {/* Header: Icon & Badges */}
                        <div className="flex items-start justify-between gap-2 mb-5">
                          <div className="w-12 h-12 rounded-2xl bg-[#E0F2FE] text-[#004771] group-hover:bg-[#004771] group-hover:text-white flex items-center justify-center transition-all shadow-2xs">
                            <Icon className="w-6 h-6" />
                          </div>
                          {service.badge && (
                            <span className="px-2.5 py-1 rounded-full bg-teal-50 text-teal-700 border border-teal-200 text-xs font-bold">
                              {service.badge}
                            </span>
                          )}
                        </div>

                        {/* Title & Description */}
                        <h3 className="text-xl font-bold text-[#0B1E3D] group-hover:text-[#004771] transition-colors mb-2">
                          {service.title}
                        </h3>

                        <p className="text-xs sm:text-sm text-gray-600 leading-relaxed mb-6">
                          {service.description}
                        </p>

                        {/* Key Features / Offerings */}
                        <div className="space-y-2 mb-6 pt-4 border-t border-gray-100">
                          {service.features.map((feat, fIdx) => (
                            <div key={fIdx} className="flex items-start gap-2 text-xs text-gray-700">
                              <CheckCircle2 className="w-3.5 h-3.5 text-[#14B8A6] flex-shrink-0 mt-0.5" />
                              <span>{feat}</span>
                            </div>
                          ))}
                        </div>

                        {/* Tech Stack Pills */}
                        <div className="flex flex-wrap gap-1.5 mb-6">
                          {service.technologies.map((tech, tIdx) => (
                            <span
                              key={tIdx}
                              className="px-2 py-0.5 rounded-md bg-[#F8FAFC] border border-gray-200/70 text-gray-600 text-[11px] font-semibold"
                            >
                              {tech}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Footer Actions */}
                      <div className="pt-4 border-t border-gray-100 flex items-center justify-between">
                        <Link
                          href={service.href}
                          className="text-xs font-extrabold text-[#004771] hover:text-[#02487D] flex items-center gap-1.5 group-hover:underline"
                        >
                          <span>Explore Capability</span>
                          <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                        </Link>
                        <Link
                          href="/contact-us"
                          className="text-[11px] font-bold text-gray-500 hover:text-gray-900"
                        >
                          Inquire
                        </Link>
                      </div>
                    </div>
                  )
                })}
              </div>
            )}
          </div>
        </section>

        {/* Why Partner with Travash Section */}
        <section className="py-16 sm:py-20 bg-white border-y border-gray-100">
          <div className="max-w-[80rem] mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto text-center mb-14">
              <span className="text-xs font-bold text-[#14B8A6] uppercase tracking-widest block mb-2">
                THE TRAVASH ADVANTAGE
              </span>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#0B1E3D] tracking-tight">
                Why Global Enterprises Choose Travash
              </h2>
              <p className="text-sm sm:text-base text-gray-600 mt-2">
                Engineering excellence honed over two decades, zero vendor lock-in, and direct access to senior technical leaders.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
              <div className="p-8 rounded-3xl bg-[#F8FAFC] border border-gray-100">
                <div className="w-12 h-12 rounded-2xl bg-[#E0F2FE] text-[#004771] flex items-center justify-center mb-5 shadow-2xs">
                  <Headphones className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-[#0B1E3D] mb-2">Direct Principal Architect Access</h3>
                <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                  No layers of account managers. You will speak directly with principal engineering directors who evaluate technical scope and architectural viability.
                </p>
              </div>

              <div className="p-8 rounded-3xl bg-[#F8FAFC] border border-gray-100">
                <div className="w-12 h-12 rounded-2xl bg-[#E0F2FE] text-[#004771] flex items-center justify-center mb-5 shadow-2xs">
                  <Lock className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-[#0B1E3D] mb-2">Zero Vendor Lock-In</h3>
                <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                  We build upon open industry standards, containerized microservices, and clean modular codebases that your internal teams can maintain and expand seamlessly.
                </p>
              </div>

              <div className="p-8 rounded-3xl bg-[#F8FAFC] border border-gray-100">
                <div className="w-12 h-12 rounded-2xl bg-[#E0F2FE] text-[#004771] flex items-center justify-center mb-5 shadow-2xs">
                  <Zap className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-[#0B1E3D] mb-2">High-Velocity Agile Squads</h3>
                <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                  Distributed engineering squads operating across India and the UAE to ensure round-the-clock progress, continuous integration, and rapid sprint velocity.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <Contact />
      </main>
      <Footer settings={siteSettings} />
    </>
  )
}
