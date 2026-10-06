'use client'

import { useState, useRef, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import {
  ChevronDown,
  Menu,
  X,
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
  Phone,
  Mail,
  CheckCircle2,
  ExternalLink,
} from 'lucide-react'

interface NavLink {
  label: string
  href: string
  hasDropdown?: boolean
}

interface MediaAsset {
  _id?: string
  title?: string
  mediaType?: string
  alt?: string
  image?: { asset?: { url: string } }
  file?: { asset?: { url: string } }
  externalUrl?: string
}

interface SiteSettings {
  logo?: { asset?: { url: string } }
  mediaLogo?: MediaAsset
  navLinks?: NavLink[]
  ctaLabel?: string
  ctaHref?: string
  contactEmail?: string
  contactPhone?: string
}

interface NavbarProps {
  settings?: SiteSettings
}

interface ServiceItem {
  name: string
  href: string
  description: string
  category: 'AI & Data' | 'Cloud & Software' | 'Experience & Teams'
  icon: any
  badge?: string
}

const ALL_SERVICES: ServiceItem[] = [
  // AI & Data
  {
    name: 'AI & Data Engineering',
    href: '/services/ai-data',
    description: 'Autonomous AI agents, private LLMs, vector search & RAG workflows.',
    category: 'AI & Data',
    icon: Bot,
    badge: 'AI-First',
  },
  {
    name: 'Data & Analytics Solutions',
    href: '/services/data-analytics-solutions',
    description: 'High-speed pipelines, enterprise BI dashboards & data warehousing.',
    category: 'AI & Data',
    icon: Database,
  },

  // Cloud & Software
  {
    name: 'Software Engineering',
    href: '/services/software',
    description: 'Full-stack web applications, microservices & mission-critical APIs.',
    category: 'Cloud & Software',
    icon: Code2,
  },
  {
    name: 'Cloud & DevOps',
    href: '/services/cloud',
    description: 'AWS/Azure/GCP cloud infrastructure, Kubernetes & automated CI/CD.',
    category: 'Cloud & Software',
    icon: Cloud,
  },
  {
    name: 'Enterprise Applications',
    href: '/services/enterprise',
    description: 'Legacy monolith modernization, custom ERP/CRM & workflow engines.',
    category: 'Cloud & Software',
    icon: Cpu,
  },

  // Experience & Teams
  {
    name: 'Digital Experiences',
    href: '/services/digital',
    description: 'Modern UX/UI design, design systems & responsive web platforms.',
    category: 'Experience & Teams',
    icon: Sparkles,
  },
  {
    name: 'Dedicated Tech Teams',
    href: '/services/dedicated-teams',
    description: 'Pre-vetted senior software squads embedded directly into your sprints.',
    category: 'Experience & Teams',
    icon: Users,
    badge: 'Popular',
  },
  {
    name: 'Quality Assurance & Testing',
    href: '/services/qa',
    description: 'Automated end-to-end testing, performance stress tests & security.',
    category: 'Experience & Teams',
    icon: ShieldCheck,
  },
  {
    name: 'Staff Augmentation',
    href: '/services/staff-augmentation',
    description: 'Elastic senior engineering capacity on demand without hiring lag.',
    category: 'Experience & Teams',
    icon: Briefcase,
  },
]

const DEFAULT_LINKS: NavLink[] = [
  { label: 'Home', href: '/' },
  { label: 'Services', href: '/services', hasDropdown: true },
  { label: 'Industries', href: '/industries' },
  { label: 'Our Work', href: '/portfolio' },
  { label: 'About', href: '/about-us', hasDropdown: true },
  { label: 'Careers', href: '/career' },
  { label: 'Blog', href: '/blogs' },
]

export default function Navbar({ settings }: NavbarProps) {
  const [menuOpen, setMenuOpen] = useState(false)
  const [servicesOpen, setServicesOpen] = useState(false)
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false)
  const timeoutRef = useRef<NodeJS.Timeout | null>(null)
  
  const [aboutOpen, setAboutOpen] = useState(false)
  const [mobileAboutOpen, setMobileAboutOpen] = useState(false)
  const aboutTimeoutRef = useRef<NodeJS.Timeout | null>(null)

  const navLinks = settings?.navLinks || DEFAULT_LINKS
  const ctaLabel = settings?.ctaLabel || 'Contact us'
  const ctaHref = settings?.ctaHref || '/contact-us'
  const contactEmail = settings?.contactEmail || 'contact@travash.com'
  const contactPhone = settings?.contactPhone || '(+91) 7416743434'
  const logoUrl =
    settings?.mediaLogo?.image?.asset?.url ||
    settings?.mediaLogo?.file?.asset?.url ||
    settings?.mediaLogo?.externalUrl ||
    settings?.logo?.asset?.url ||
    '/travash-latest-logo.svg'

  // Hover handlers for smooth mega menu appearance
  const handleMouseEnter = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current)
    setServicesOpen(true)
  }

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setServicesOpen(false)
    }, 200)
  }

  const handleAboutMouseEnter = () => {
    if (aboutTimeoutRef.current) clearTimeout(aboutTimeoutRef.current)
    setAboutOpen(true)
  }

  const handleAboutMouseLeave = () => {
    aboutTimeoutRef.current = setTimeout(() => {
      setAboutOpen(false)
    }, 200)
  }

  // Prevent background scrolling when mobile drawer is open & reset accordion on close
  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
      setMobileServicesOpen(false)
      setMobileAboutOpen(false)
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [menuOpen])

  return (
    <>
      <header className="sticky top-0 left-0 right-0 z-50 bg-white border-b border-gray-100/80 shadow-[0_1px_3px_rgba(0,0,0,0.04)] font-['Plus_Jakarta_Sans',sans-serif]">
        <nav className="max-w-[92rem] mx-auto px-4 sm:px-6 lg:px-10 h-[60px] sm:h-[68px] flex items-center justify-between gap-6">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 flex-shrink-0">
            <Image
              src={logoUrl}
              alt="Travash Software Solutions"
              width={100}
              height={42}
              priority
              className="h-7 sm:h-9 md:h-10 w-auto max-w-[110px] sm:max-w-[110px] object-contain transition-all"
            />
          </Link>

          {/* Desktop Nav — centered */}
          <ul className="hidden lg:flex items-center gap-0.5 xl:gap-1 flex-1 justify-center">
            {navLinks.map((link) => {
              const isAbout = link.label === 'About' || link.label === 'About Us'
              const isServices = link.label === 'Services' || (link.hasDropdown && !isAbout)

              if (isAbout) {
                return (
                  <li
                    key={link.label}
                    className="relative py-4"
                    onMouseEnter={handleAboutMouseEnter}
                    onMouseLeave={handleAboutMouseLeave}
                  >
                    <Link
                      href={link.href}
                      className={`flex items-center gap-1 text-[13.5px] font-medium px-3 py-2 rounded-lg transition-colors ${aboutOpen ? 'text-[#004771] bg-gray-50' : 'text-gray-600 hover:text-[#004771] hover:bg-gray-50'
                        }`}
                    >
                      <span>{link.label}</span>
                      <ChevronDown
                        size={13}
                        className={`transition-transform duration-200 ${aboutOpen ? 'rotate-180 text-[#004771]' : 'text-gray-400'
                          }`}
                      />
                    </Link>

                    {aboutOpen && (
                      <div className="absolute top-[60px] left-1/2 -translate-x-1/2 w-48 bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden animate-in fade-in-0 slide-in-from-top-2 duration-200 py-2 z-50">
                        <Link href="/about-us" onClick={() => setAboutOpen(false)} className="block px-5 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50 hover:text-[#004771] transition-colors">Company Overview</Link>
                        <Link href="/leadership" onClick={() => setAboutOpen(false)} className="block px-5 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50 hover:text-[#004771] transition-colors">Leadership</Link>
                      </div>
                    )}
                  </li>
                )
              }

              if (isServices) {
                return (
                  <li
                    key={link.label}
                    className="relative py-4"
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                  >
                    <Link
                      href="/services"
                      className={`flex items-center gap-1 text-[13.5px] font-medium px-3 py-2 rounded-lg transition-colors ${servicesOpen ? 'text-[#004771] bg-gray-50' : 'text-gray-600 hover:text-[#004771] hover:bg-gray-50'
                        }`}
                    >
                      <span>{link.label}</span>
                      <ChevronDown
                        size={13}
                        className={`transition-transform duration-200 ${servicesOpen ? 'rotate-180 text-[#004771]' : 'text-gray-400'
                          }`}
                      />
                    </Link>

                    {/* Desktop Full Mega Menu */}
                    {servicesOpen && (
                      <div className="fixed top-[60px] sm:top-[68px] left-0 right-0 z-50 flex justify-center px-4 sm:px-6 lg:px-8 pointer-events-auto animate-in fade-in-0 slide-in-from-top-2 duration-200">
                        <div
                          className="w-full max-w-7xl bg-white rounded-3xl shadow-[0_25px_60px_-15px_rgba(11,71,133,0.18)] border border-gray-200/90 overflow-hidden"
                          onMouseEnter={handleMouseEnter}
                          onMouseLeave={handleMouseLeave}
                        >
                          <div className="grid lg:grid-cols-12 p-6 sm:p-8 gap-8 items-stretch">
                            {/* Left Columns: Categorized Services (9 Cols) */}
                            <div className="lg:col-span-9 grid sm:grid-cols-3 gap-6 lg:gap-8">
                              {/* Pillar 1: AI & Data */}
                              <div className="space-y-4">
                                <div className="flex items-center gap-2 pb-2 border-b border-gray-100">
                                  <span className="w-2 h-2 rounded-full bg-[#14B8A6]" />
                                  <h4 className="text-xs font-extrabold uppercase tracking-wider text-gray-500">
                                    AI & Data Systems
                                  </h4>
                                </div>
                                <div className="space-y-2">
                                  {ALL_SERVICES.filter((s) => s.category === 'AI & Data').map((service) => {
                                    const Icon = service.icon
                                    return (
                                      <Link
                                        key={service.name}
                                        href={service.href}
                                        onClick={() => setServicesOpen(false)}
                                        className="group block p-3 rounded-2xl hover:bg-[#F8FAFC] border border-transparent hover:border-gray-200/70 transition-all"
                                      >
                                        <div className="flex items-start gap-3">
                                          <div className="w-9 h-9 rounded-xl bg-[#E0F2FE] text-[#004771] group-hover:bg-[#004771] group-hover:text-white flex items-center justify-center flex-shrink-0 mt-0.5 transition-colors shadow-2xs">
                                            <Icon className="w-4.5 h-4.5" />
                                          </div>
                                          <div>
                                            <div className="flex items-center gap-1.5">
                                              <span className="text-sm font-bold text-[#0B1E3D] group-hover:text-[#004771] transition-colors">
                                                {service.name}
                                              </span>
                                              {service.badge && (
                                                <span className="px-1.5 py-0.2 rounded text-[10px] font-extrabold bg-teal-50 text-teal-700 border border-teal-200">
                                                  {service.badge}
                                                </span>
                                              )}
                                            </div>
                                            <p className="text-xs text-gray-500 mt-0.5 line-clamp-2 leading-relaxed">
                                              {service.description}
                                            </p>
                                          </div>
                                        </div>
                                      </Link>
                                    )
                                  })}
                                </div>
                              </div>

                              {/* Pillar 2: Cloud & Software */}
                              <div className="space-y-4">
                                <div className="flex items-center gap-2 pb-2 border-b border-gray-100">
                                  <span className="w-2 h-2 rounded-full bg-[#004771]" />
                                  <h4 className="text-xs font-extrabold uppercase tracking-wider text-gray-500">
                                    Cloud & Core Software
                                  </h4>
                                </div>
                                <div className="space-y-2">
                                  {ALL_SERVICES.filter((s) => s.category === 'Cloud & Software').map((service) => {
                                    const Icon = service.icon
                                    return (
                                      <Link
                                        key={service.name}
                                        href={service.href}
                                        onClick={() => setServicesOpen(false)}
                                        className="group block p-3 rounded-2xl hover:bg-[#F8FAFC] border border-transparent hover:border-gray-200/70 transition-all"
                                      >
                                        <div className="flex items-start gap-3">
                                          <div className="w-9 h-9 rounded-xl bg-[#E0F2FE] text-[#004771] group-hover:bg-[#004771] group-hover:text-white flex items-center justify-center flex-shrink-0 mt-0.5 transition-colors shadow-2xs">
                                            <Icon className="w-4.5 h-4.5" />
                                          </div>
                                          <div>
                                            <div className="flex items-center gap-1.5">
                                              <span className="text-sm font-bold text-[#0B1E3D] group-hover:text-[#004771] transition-colors">
                                                {service.name}
                                              </span>
                                              {service.badge && (
                                                <span className="px-1.5 py-0.2 rounded text-[10px] font-extrabold bg-teal-50 text-teal-700 border border-teal-200">
                                                  {service.badge}
                                                </span>
                                              )}
                                            </div>
                                            <p className="text-xs text-gray-500 mt-0.5 line-clamp-2 leading-relaxed">
                                              {service.description}
                                            </p>
                                          </div>
                                        </div>
                                      </Link>
                                    )
                                  })}
                                </div>
                              </div>

                              {/* Pillar 3: Experience & Teams */}
                              <div className="space-y-4">
                                <div className="flex items-center gap-2 pb-2 border-b border-gray-100">
                                  <span className="w-2 h-2 rounded-full bg-[#02487D]" />
                                  <h4 className="text-xs font-extrabold uppercase tracking-wider text-gray-500">
                                    Experiences & Talent
                                  </h4>
                                </div>
                                <div className="space-y-2">
                                  {ALL_SERVICES.filter((s) => s.category === 'Experience & Teams').map((service) => {
                                    const Icon = service.icon
                                    return (
                                      <Link
                                        key={service.name}
                                        href={service.href}
                                        onClick={() => setServicesOpen(false)}
                                        className="group block p-3 rounded-2xl hover:bg-[#F8FAFC] border border-transparent hover:border-gray-200/70 transition-all"
                                      >
                                        <div className="flex items-start gap-3">
                                          <div className="w-9 h-9 rounded-xl bg-[#E0F2FE] text-[#004771] group-hover:bg-[#004771] group-hover:text-white flex items-center justify-center flex-shrink-0 mt-0.5 transition-colors shadow-2xs">
                                            <Icon className="w-4.5 h-4.5" />
                                          </div>
                                          <div>
                                            <div className="flex items-center gap-1.5">
                                              <span className="text-sm font-bold text-[#0B1E3D] group-hover:text-[#004771] transition-colors">
                                                {service.name}
                                              </span>
                                              {service.badge && (
                                                <span className="px-1.5 py-0.2 rounded text-[10px] font-extrabold bg-teal-50 text-teal-700 border border-teal-200">
                                                  {service.badge}
                                                </span>
                                              )}
                                            </div>
                                            <p className="text-xs text-gray-500 mt-0.5 line-clamp-2 leading-relaxed">
                                              {service.description}
                                            </p>
                                          </div>
                                        </div>
                                      </Link>
                                    )
                                  })}
                                </div>
                              </div>
                            </div>

                            {/* Right Column: Featured Callout Card (3 Cols) */}
                            <div className="lg:col-span-3 bg-gradient-to-br from-[#004771] via-[#02487D] to-[#0B1E3D] text-white rounded-2xl p-6 flex flex-col justify-between shadow-md relative overflow-hidden">
                              <div className="absolute -top-12 -right-12 w-32 h-32 bg-teal-400/20 rounded-full blur-2xl" />
                              <div className="relative z-10">
                                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white/15 backdrop-blur-md text-teal-300 text-[11px] font-extrabold uppercase tracking-wider mb-4">
                                  <Sparkles className="w-3 h-3 text-[#14B8A6]" />
                                  <span>Enterprise Advisory</span>
                                </span>
                                <h4 className="text-lg font-extrabold leading-snug mb-2">
                                  Architect Your Next Digital Breakthrough
                                </h4>
                                <p className="text-xs text-blue-100 leading-relaxed mb-6">
                                  Speak directly with our senior engineering directors to plan technical scope, AI adoption, or dedicated sprint capacity.
                                </p>
                              </div>

                              <div className="relative z-10 space-y-3">
                                <Link
                                  href="/contact-us"
                                  onClick={() => setServicesOpen(false)}
                                  className="w-full py-2.5 px-4 rounded-xl bg-white text-[#004771] hover:bg-[#E0F2FE] font-bold text-xs flex items-center justify-center gap-2 shadow-sm transition-colors"
                                >
                                  <span>Book Architecture Audit</span>
                                  <ArrowRight className="w-3.5 h-3.5" />
                                </Link>

                                <div className="text-[11px] text-blue-200/90 text-center">
                                  <span>90%+ Client Retention • 500+ Delivered</span>
                                </div>
                              </div>
                            </div>
                          </div>

                          {/* Mega Menu Footer Strip */}
                          <div className="bg-[#F8FAFC] px-8 py-3.5 border-t border-gray-100 flex flex-wrap items-center justify-between text-xs font-semibold text-gray-600">
                            <div className="flex items-center gap-6">
                              <Link
                                href="/services"
                                onClick={() => setServicesOpen(false)}
                                className="flex items-center gap-1.5 text-[#004771] hover:underline"
                              >
                                <span>Browse All 10 Services Overview</span>
                                <ArrowRight className="w-3 h-3" />
                              </Link>
                              <span className="text-gray-300 hidden sm:inline">|</span>
                              <Link
                                href="/portfolio"
                                onClick={() => setServicesOpen(false)}
                                className="hover:text-[#004771] transition-colors hidden sm:inline"
                              >
                                View Case Studies & Real Outcomes
                              </Link>
                            </div>
                            <div className="flex items-center gap-2 text-gray-500">
                              <span>Direct hotline:</span>
                              <a href={`tel:${contactPhone.replace(/[^\d+]/g, '')}`} className="font-bold text-gray-800 hover:text-[#004771]">
                                {contactPhone}
                              </a>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </li>
                )
              }

              return (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-[13.5px] font-medium text-gray-600 hover:text-[#004771] transition-colors px-3 py-2 rounded-lg hover:bg-gray-50 inline-block"
                  >
                    {link.label}
                  </Link>
                </li>
              )
            })}
          </ul>

          {/* Right: Contact Us outlined button & Mobile Toggle */}
          <div className="flex items-center gap-3 flex-shrink-0">
            <Link
              href={ctaHref}
              className="hidden sm:inline-flex items-center justify-center border border-[#004771] text-[#004771] hover:bg-[#004771] hover:text-white text-[13px] font-semibold px-5 py-2 rounded-lg transition-all duration-200"
            >
              {ctaLabel}
            </Link>

            {/* Mobile Hamburger */}
            <button
              onClick={() => setMenuOpen(true)}
              className="lg:hidden p-2 rounded-lg text-gray-600 hover:bg-gray-100 transition-colors"
              aria-label="Open navigation menu"
            >
              <Menu size={22} />
            </button>
          </div>
        </nav>
      </header>

      {/* Mobile Menu Drawer */}
      <div
        className={`fixed inset-0 z-50 lg:hidden transition-all duration-300 ${menuOpen ? 'pointer-events-auto' : 'pointer-events-none'
          }`}
      >
        {/* Backdrop */}
        <div
          className={`absolute inset-0 bg-[#0B1E3D]/50 backdrop-blur-sm transition-opacity duration-300 ${menuOpen ? 'opacity-100' : 'opacity-0'
            }`}
          onClick={() => setMenuOpen(false)}
        />

        {/* Drawer Content */}
        <div
          className={`absolute right-0 top-0 bottom-0 w-full max-w-sm sm:max-w-md bg-white shadow-2xl flex flex-col transition-transform duration-300 ${menuOpen ? 'translate-x-0' : 'translate-x-full'
            }`}
        >
          {/* Mobile Header */}
          <div className="flex items-center justify-between p-5 border-b border-gray-100 bg-white sticky top-0 z-10">
            <Image
              src={logoUrl}
              alt="Travash"
              width={130}
              height={36}
              className="h-7 w-auto max-w-[120px] object-contain"
            />
            <button
              onClick={() => setMenuOpen(false)}
              className="p-2 rounded-xl text-gray-500 hover:text-gray-900 hover:bg-gray-100 transition-colors cursor-pointer"
              aria-label="Close navigation menu"
            >
              <X size={22} />
            </button>
          </div>

          {/* Scrollable Navigation */}
          <nav className="flex flex-col p-4 sm:p-6 gap-1 flex-1 overflow-y-auto">
            {navLinks.map((link) => {
              const isAbout = link.label === 'About' || link.label === 'About Us'
              const isServices = link.label === 'Services' || (link.hasDropdown && !isAbout)

              if (isAbout) {
                return (
                  <div key={link.label} className="border-b border-gray-100 pb-2 mb-2">
                    <button
                      onClick={() => setMobileAboutOpen(!mobileAboutOpen)}
                      className="w-full flex items-center justify-between text-gray-800 hover:text-[#004771] hover:bg-gray-50 px-4 py-3 rounded-xl text-base font-bold transition-colors cursor-pointer"
                    >
                      <div className="flex items-center gap-2">
                        <span>{link.label}</span>
                      </div>
                      <ChevronDown
                        size={18}
                        className={`text-gray-500 transition-transform duration-200 ${mobileAboutOpen ? 'rotate-180 text-[#004771]' : ''
                          }`}
                      />
                    </button>

                    {mobileAboutOpen && (
                      <div className="pl-4 pr-1 pt-1 pb-2 space-y-1 animate-in fade-in-0 duration-200">
                        <Link
                          href="/about-us"
                          onClick={() => setMenuOpen(false)}
                          className="block px-4 py-2.5 rounded-xl text-sm font-semibold text-gray-600 hover:bg-gray-50 hover:text-[#004771] transition-colors"
                        >
                          Company Overview
                        </Link>
                        <Link
                          href="/leadership"
                          onClick={() => setMenuOpen(false)}
                          className="block px-4 py-2.5 rounded-xl text-sm font-semibold text-gray-600 hover:bg-gray-50 hover:text-[#004771] transition-colors"
                        >
                          Leadership
                        </Link>
                      </div>
                    )}
                  </div>
                )
              }

              if (isServices) {
                return (
                  <div key={link.label} className="border-b border-gray-100 pb-2 mb-2">
                    {/* Accordion Trigger */}
                    <button
                      onClick={() => setMobileServicesOpen(!mobileServicesOpen)}
                      className="w-full flex items-center justify-between text-gray-800 hover:text-[#004771] hover:bg-gray-50 px-4 py-3 rounded-xl text-base font-bold transition-colors cursor-pointer"
                    >
                      <div className="flex items-center gap-2">
                        <span>Services</span>
                        <span className="px-2 py-0.5 rounded-full bg-[#E0F2FE] text-[#004771] text-[11px] font-extrabold">
                          All 10
                        </span>
                      </div>
                      <ChevronDown
                        size={18}
                        className={`text-gray-500 transition-transform duration-200 ${mobileServicesOpen ? 'rotate-180 text-[#004771]' : ''
                          }`}
                      />
                    </button>

                    {/* All Services Submenu List */}
                    {mobileServicesOpen && (
                      <div className="pl-2 pr-1 pt-2 pb-2 space-y-1.5 animate-in fade-in-0 duration-200">
                        {ALL_SERVICES.map((service) => {
                          const Icon = service.icon
                          return (
                            <Link
                              key={service.name}
                              href={service.href}
                              onClick={() => setMenuOpen(false)}
                              className="flex items-start gap-3 p-2.5 rounded-xl hover:bg-[#F8FAFC] border border-transparent hover:border-gray-200/80 transition-colors group"
                            >
                              <div className="w-8 h-8 rounded-lg bg-[#E0F2FE] text-[#004771] flex items-center justify-center flex-shrink-0 mt-0.5 group-hover:bg-[#004771] group-hover:text-white transition-colors shadow-2xs">
                                <Icon className="w-4 h-4" />
                              </div>
                              <div className="flex-1 min-w-0">
                                <div className="flex items-center justify-between">
                                  <span className="text-xs sm:text-sm font-bold text-[#0B1E3D] group-hover:text-[#004771] transition-colors truncate">
                                    {service.name}
                                  </span>
                                  {service.badge && (
                                    <span className="px-1.5 py-0.2 rounded text-[9px] font-bold bg-teal-50 text-teal-700">
                                      {service.badge}
                                    </span>
                                  )}
                                </div>
                                <p className="text-[11px] text-gray-500 line-clamp-1 mt-0.5">
                                  {service.description}
                                </p>
                              </div>
                            </Link>
                          )
                        })}

                        {/* View All Services Link */}
                        <Link
                          href="/services"
                          onClick={() => setMenuOpen(false)}
                          className="flex items-center justify-center gap-1.5 text-xs font-extrabold text-[#004771] bg-[#E0F2FE]/60 hover:bg-[#E0F2FE] py-2.5 px-4 rounded-xl mt-2 transition-colors"
                        >
                          <span>Explore All Services Overview</span>
                          <ArrowRight className="w-3.5 h-3.5" />
                        </Link>
                      </div>
                    )}
                  </div>
                )
              }

              return (
                <Link
                  key={link.label}
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  className="text-gray-800 hover:text-[#004771] hover:bg-gray-50 px-4 py-3 rounded-xl text-base font-semibold transition-colors"
                >
                  {link.label}
                </Link>
              )
            })}
          </nav>

          {/* Drawer Footer */}
          <div className="p-5 border-t border-gray-100 bg-[#F8FAFC] space-y-3">
            <Link
              href={ctaHref}
              onClick={() => setMenuOpen(false)}
              className="block w-full text-center bg-[#004771] text-white text-sm font-bold px-5 py-3.5 rounded-xl hover:bg-[#02487D] transition-colors shadow-sm"
            >
              {ctaLabel}
            </Link>

            <div className="text-xs text-gray-500 space-y-1 text-center pt-1">
              <div>
                <a href={`mailto:${contactEmail}`} className="hover:text-[#004771]">
                  {contactEmail}
                </a>
              </div>
              <div>
                <a href={`tel:${contactPhone.replace(/[^\d+]/g, '')}`} className="font-semibold text-[#0B1E3D] hover:text-[#004771]">
                  {contactPhone}
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

