import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { client } from '@/lib/sanity'
import { serviceBySlugQuery, allServiceSlugsQuery, homePageQuery } from '@/lib/queries'
import {
  DEFAULT_DATA_ANALYTICS_SERVICE,
  FALLBACK_SERVICES,
  type ServiceData,
} from '@/lib/service-data'

import Navbar from '@/components/sections/Navbar'
import Footer from '@/components/sections/Footer'
import Contact from '@/components/sections/Contact'

import ServiceHero from '@/components/services/ServiceHero'
import ServiceHeroBanner from '@/components/services/ServiceHeroBanner'
import ServiceProblem from '@/components/services/ServiceProblem'
import ServiceSolutionOverview from '@/components/services/ServiceSolutionOverview'
import ServiceCapabilities from '@/components/services/ServiceCapabilities'
import ServiceProcess from '@/components/services/ServiceProcess'
import ServiceCaseStudies from '@/components/services/ServiceCaseStudies'
import EngagementModels from '@/components/services/EngagementModels'
import ServiceTechnologies from '@/components/services/ServiceTechnologies'
import ServiceTrust from '@/components/services/ServiceTrust'
import ServiceTestimonial from '@/components/services/ServiceTestimonial'
import ServiceFAQ from '@/components/services/ServiceFAQ'
import ServiceCTA from '@/components/services/ServiceCTA'
import ServiceStaffSpotlights from '@/components/services/ServiceStaffSpotlights'

export const dynamic = 'force-dynamic'
export const revalidate = 0

const SLUG_ALIASES: Record<string, string[]> = {
  qa: ['quality-assurance-testing', 'quality-assurance', 'qa-testing'],
  'quality-assurance': ['quality-assurance-testing', 'qa', 'qa-testing'],
  'quality-assurance-testing': ['quality-assurance', 'qa', 'qa-testing'],
  analytics: ['data-analytics-solutions', 'data-analytics'],
  'data-analytics': ['data-analytics-solutions', 'analytics'],
  'data-analytics-solutions': ['data-analytics', 'analytics'],
  'ai-data': ['ai-data-engineering', 'ai-automation'],
  'ai-automation': ['ai-data-engineering', 'ai-data'],
  'ai-data-engineering': ['ai-data', 'ai-automation'],
  software: ['software-engineering'],
  'software-engineering': ['software'],
  cloud: ['cloud-devops', 'cloud-and-devops'],
  'cloud-devops': ['cloud-and-devops', 'cloud'],
  'cloud-and-devops': ['cloud-devops', 'cloud'],
  digital: ['digital-experiences', 'digital-experiences-web-mobile'],
  'digital-experiences': ['digital-experiences-web-mobile', 'digital'],
  'digital-experiences-web-mobile': ['digital-experiences', 'digital'],
  enterprise: ['enterprise-applications'],
  'enterprise-applications': ['enterprise'],
  'dedicated-teams': ['dedicated-talent-and-teams', 'dedicated-talent'],
  'dedicated-talent': ['dedicated-teams', 'dedicated-talent-and-teams'],
  'dedicated-talent-and-teams': ['dedicated-teams', 'dedicated-talent'],
  staffing: ['staff-augmentation'],
  'staff-augmentation': ['staffing'],
  platform: ['platform-engineering'],
  'platform-engineering': ['platform'],
}

// Dynamic SEO Metadata Generation
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const slugAliases = SLUG_ALIASES[slug] || []

  try {
    const study: ServiceData | null = await client.fetch(serviceBySlugQuery, { slug, slugAliases })
    const data = study || FALLBACK_SERVICES[slug] || null

    if (!data) {
      return {
        title: 'Service Not Found | Travash',
      }
    }

    const title = data.seo?.metaTitle || `${data.title} | Travash Software Solutions`
    const description =
      data.seo?.metaDescription ||
      data.shortDescription ||
      'Enterprise software engineering, data architecture, and scalable technology solutions by Travash.'
    const ogImageUrl = data.seo?.ogImage?.asset?.url || (typeof data.hero?.heroImage === 'object' ? data.hero.heroImage?.asset?.url : undefined)
    const canonicalUrl = `https://travash.com/services/${slug}`

    return {
      title,
      description,
      alternates: {
        canonical: canonicalUrl,
      },
      openGraph: {
        title,
        description,
        url: canonicalUrl,
        siteName: 'Travash Software Solutions',
        type: 'website',
        ...(ogImageUrl ? { images: [{ url: ogImageUrl }] } : {}),
      },
      twitter: {
        card: 'summary_large_image',
        title,
        description,
        ...(ogImageUrl ? { images: [ogImageUrl] } : {}),
      },
      robots: {
        index: true,
        follow: true,
      },
    }
  } catch {
    return {
      title: 'Services | Travash Software Solutions',
    }
  }
}

// Static generation for known slugs
export async function generateStaticParams() {
  try {
    const slugs: { slug: string }[] = await client.fetch(allServiceSlugsQuery)
    if (slugs && slugs.length > 0) {
      return slugs.map((item) => ({ slug: item.slug }))
    }
  } catch {
    // Fallback
  }
  return [
    { slug: 'data-analytics' },
    { slug: 'data-analytics-solutions' },
    { slug: 'ai-data-engineering' },
    { slug: 'software-engineering' },
  ]
}

async function getServiceData(slug: string) {
  const slugAliases = SLUG_ALIASES[slug] || []
  try {
    const [fetchedService, pageData] = await Promise.all([
      client.fetch(serviceBySlugQuery, { slug, slugAliases }),
      client.fetch(homePageQuery),
    ])

    const service: ServiceData | null =
      fetchedService || FALLBACK_SERVICES[slug] || null

    return {
      service,
      siteSettings: pageData?.siteSettings,
    }
  } catch {
    return {
      service: FALLBACK_SERVICES[slug] || null,
      siteSettings: null,
    }
  }
}

export default async function ServiceDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const { service, siteSettings } = await getServiceData(slug)

  if (!service) {
    notFound()
  }

  const serviceUrl = `https://travash.com/services/${slug}`
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: service.title,
    description: service.shortDescription || service.hero?.subtitle,
    provider: {
      '@type': 'Organization',
      name: 'Travash Software Solutions',
      url: 'https://travash.com',
      logo: 'https://travash.com/travash-latest-logo.svg'
    },
    areaServed: 'Worldwide',
    url: serviceUrl
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Navbar settings={siteSettings} />
      <main className="min-h-screen bg-gradient-to-b from-[#F4F8FC] via-white to-white font-['Plus_Jakarta_Sans',sans-serif] overflow-x-clip">
        {/* 1. Service Hero */}
        {service.hero && (
          <div id="overview">
            <ServiceHero hero={service.hero} serviceTitle={service.title} />
          </div>
        )}

        {/* 1b. Hero Banner Image */}
        <ServiceHeroBanner slug={slug} heroImage={service.hero?.heroImage || service.hero?.heroBgImage} />

        {/* 2. Business Problem Section */}
        {service.problemSection && (
          <div id="the-problem">
            <ServiceProblem problem={service.problemSection} />
          </div>
        )}

        {/* 3. How Travash Solves It (Solution Overview) */}
        {service.solutionOverview && (
          <div id="solution-overview">
            <ServiceSolutionOverview solution={service.solutionOverview} />
          </div>
        )}

        {/* 4. Detailed Service Capabilities ("What We Build") */}
        {service.capabilities && service.capabilities.length > 0 && (
          <ServiceCapabilities
            capabilities={service.capabilities}
            serviceTitle={service.menuTitle || service.title}
            capabilitiesImage={service.capabilitiesImage}
            capabilitiesSection={service.capabilitiesSection}
          />
        )}

        {/* 5. Engineering / Delivery Process */}
        {service.process && service.process.steps && service.process.steps.length > 0 && (
          <ServiceProcess process={service.process} />
        )}

        {/* 6. Relevant Case Studies or Staff Spotlights */}
        {slug === 'staff-augmentation' ? (
          <ServiceStaffSpotlights />
        ) : (
          slug !== 'dedicated-teams' &&
          service.relatedCaseStudies &&
          service.relatedCaseStudies.length > 0 && (
            <ServiceCaseStudies
              caseStudies={service.relatedCaseStudies}
              serviceTitle={service.menuTitle || service.title}
            />
          )
        )}

        {/* 7. Flexible Engagement Models */}
        {service.engagementModels && service.engagementModels.length > 0 && (
          <EngagementModels
            models={service.engagementModels}
            backgroundImage={service.engagementBgImage}
          />
        )}

        {/* 8. Technology Ecosystem */}
        {service.technologyStack && service.technologyStack.length > 0 && (
          <ServiceTechnologies technologyStack={service.technologyStack} />
        )}

        {/* 9. Why Travash / Trust Section */}
        {service.trustSection && (
          <ServiceTrust trust={service.trustSection} />
        )}

        {/* 10. Testimonials — shows when references are selected OR legacy object exists */}
        {(
          (service.testimonials && service.testimonials.length > 0) ||
          (service.testimonial && service.testimonial.quote)
        ) && (
          <ServiceTestimonial
            testimonial={service.testimonial}
            testimonials={service.testimonials}
          />
        )}

        {/* 11. Frequently Asked Questions */}
        {service.faqs && service.faqs.length > 0 && (
          <ServiceFAQ faqs={service.faqs} serviceTitle={service.title} />
        )}

        {/* 12. Final Call to Action & Consultation Form */}
        {service.finalCTA ? (
          <ServiceCTA cta={service.finalCTA} />
        ) : (
          <Contact />
        )}
      </main>
      <Footer settings={siteSettings} />
    </>
  )
}
