import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { MapPin, Mail, Phone } from 'lucide-react'

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
  footerLogo?: { asset?: { url: string } }
  mediaFooterLogo?: MediaAsset
  copyrightText?: string
  contactEmail?: string
  contactPhone?: string
  socialLinks?: { platform: string; url: string }[]
  menuLinks?: { label: string; href: string }[]
  serviceLinks?: { label: string; href: string }[]
  offices?: { label: string; address: string }[]
}

const SocialIcons: Record<string, () => React.ReactElement> = {
  facebook: () => (
    <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
    </svg>
  ),
  twitter: () => (
    <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  ),
  instagram: () => (
    <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
    </svg>
  ),
  linkedin: () => (
    <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6zM2 9h4v12H2z" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  ),
}

const DEFAULT_MENU_LINKS = [
  { label: 'Home', href: '/' },
  { label: 'About us', href: '/about-us' },
  { label: 'Services', href: '/services' },
  { label: 'Technologies', href: '/technologies' },
  { label: 'Works', href: '/portfolio' },
  { label: 'Careers', href: '/career' },
  { label: 'Blogs', href: '/blogs' },
  { label: 'Contact us', href: '/contact-us' },
]

const DEFAULT_SERVICE_LINKS = [
  { label: 'AI & Data Engineering', href: '/services/ai-data' },
  { label: 'Software Engineering', href: '/services/software' },
  { label: 'Digital Experiences', href: '/services/digital' },
  { label: 'Data & Analytics Solutions', href: '/services/analytics' },
  { label: 'Enterprise Applications', href: '/services/enterprise' },
  { label: 'Cloud & DevOps', href: '/services/cloud' },
  { label: 'Dedicated Talent & Teams', href: '/services/dedicated-teams' },
  { label: 'Quality Assurance & Testing', href: '/services/qa' },
  { label: 'Staff Augmentation', href: '/services/staff-augmentation' },
]

const DEFAULT_OFFICES = [
  {
    label: 'India',
    address: 'Sanali Spazio building, Inorbit Mall Road, Madhapur Plot No 19, Software Units Layout, Sy.No.64, Madhapur Hyderabad, Rangareddy Telangana 500081',
  },
  {
    label: 'Dubai',
    address: 'SAIF ZONE ADDRESS : Saif Office Q1 05 103/A Sharjah U.A.E',
  },
]

const DEFAULT_SOCIALS = [
  { platform: 'facebook', url: 'https://www.facebook.com/travashglobal' },
  { platform: 'twitter', url: 'https://x.com/travashglobal' },
  { platform: 'instagram', url: 'https://www.instagram.com/travashglobal/' },
  { platform: 'linkedin', url: 'https://www.linkedin.com/company/travash-software-solutions/' },
]

export default function Footer({ settings }: { settings?: SiteSettings }) {
  const logoUrl =
    settings?.mediaFooterLogo?.image?.asset?.url ||
    settings?.mediaFooterLogo?.file?.asset?.url ||
    settings?.mediaFooterLogo?.externalUrl ||
    settings?.footerLogo?.asset?.url ||
    '/travash-latest-logo.svg'

  const menuLinks = settings?.menuLinks && settings.menuLinks.length > 0 ? settings.menuLinks : DEFAULT_MENU_LINKS
  const serviceLinks = settings?.serviceLinks && settings.serviceLinks.length > 0 ? settings.serviceLinks : DEFAULT_SERVICE_LINKS
  const offices = settings?.offices && settings.offices.length > 0 ? settings.offices : DEFAULT_OFFICES
  const socialLinks = settings?.socialLinks && settings.socialLinks.length > 0 ? settings.socialLinks : DEFAULT_SOCIALS
  const copyright = settings?.copyrightText || '©2025 Travash Software Solutions Pvt. Ltd'
  const email = settings?.contactEmail || 'contact@travash.com'
  const phone = settings?.contactPhone || '(+91) 7416743434'

  return (
    <footer className="bg-white text-gray-700 border-t border-gray-200">
      <div className="max-w-[92rem] mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8">
          {/* Column 1: Brand, Socials & Legal */}
          <div className="lg:col-span-3 flex flex-col justify-between gap-6">
            <div className="flex flex-col gap-4">
              <Link href="/" className="inline-flex">
                <Image
                  src={logoUrl}
                  alt="Travash Software Solutions"
                  width={150}
                  height={40}
                  className="h-10 w-auto object-contain"
                />
              </Link>
              {/* Social Icons */}
              <div className="flex gap-2.5 pt-2">
                {socialLinks.map(({ platform, url }) => {
                  const key = platform.toLowerCase()
                  const Icon = SocialIcons[key]
                  return (
                    <a
                      key={platform}
                      href={url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center text-gray-600 hover:text-[#0B4785] hover:border-[#0B4785] hover:bg-gray-50 transition-all"
                      aria-label={platform}
                    >
                      {Icon ? <Icon /> : platform[0].toUpperCase()}
                    </a>
                  )
                })}
              </div>
            </div>

            <div className="text-xs text-gray-500 pt-4 flex flex-col gap-1.5">
              <p>{copyright}</p>
              <div className="flex gap-2">
                <Link href="/privacy" className="hover:text-[#0B4785] transition-colors">
                  Privacy Policy
                </Link>
                <span>|</span>
                <Link href="/terms" className="hover:text-[#0B4785] transition-colors">
                  Terms &amp; Conditions
                </Link>
              </div>
            </div>
          </div>

          {/* Column 2: Menu */}
          <div className="lg:col-span-2 flex flex-col gap-4">
            <h4 className="text-sm font-bold text-[#0B4785] tracking-tight">Menu</h4>
            <ul className="flex flex-col gap-2.5 text-sm">
              {menuLinks.map((link, i) => (
                <li key={i}>
                  <Link href={link.href} className="text-gray-600 hover:text-[#0B4785] transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Our Services */}
          <div className="lg:col-span-3 flex flex-col gap-4">
            <h4 className="text-sm font-bold text-[#0B4785] tracking-tight">Our Services</h4>
            <ul className="flex flex-col gap-2.5 text-sm">
              {serviceLinks.map((link, i) => (
                <li key={i}>
                  <Link href={link.href} className="text-gray-600 hover:text-[#0B4785] transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Contact & Locations */}
          <div className="lg:col-span-4 flex flex-col gap-4">
            <h4 className="text-sm font-bold text-[#0B4785] tracking-tight">Contact</h4>
            <div className="flex flex-col gap-4 text-sm text-gray-600">
              {offices.map((office, idx) => (
                <div key={idx}>
                  <p className="font-semibold text-gray-900 mb-0.5">{office.label}</p>
                  <p className="leading-relaxed text-xs sm:text-sm text-gray-600">
                    {office.address}
                  </p>
                </div>
              ))}

              {/* Email & Phone */}
              <div className="pt-2 flex flex-col gap-1.5 text-sm">
                <a
                  href={`mailto:${email}`}
                  className="text-gray-600 hover:text-[#0B4785] transition-colors"
                >
                  {email}
                </a>
                <a
                  href={`tel:${phone.replace(/\s+/g, '')}`}
                  className="text-gray-600 hover:text-[#0B4785] transition-colors font-medium"
                >
                  {phone}
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
