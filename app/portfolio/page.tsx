import { Suspense } from 'react'
import type { Metadata } from 'next'
import { client } from '@/lib/sanity'
import { caseStudiesPageQuery } from '@/lib/queries'
import {
  getAllPortfolioProjects,
} from '@/lib/portfolioQueries'
import {
  DEFAULT_PORTFOLIO_PROJECTS,
  DEFAULT_INDUSTRIES,
  type PortfolioProject,
  type IndustryItem,
} from '@/lib/portfolio-data'

import Navbar from '@/components/sections/Navbar'
import Footer from '@/components/sections/Footer'
import Contact from '@/components/sections/Contact'
import Stats from '@/components/sections/Stats'
import Testimonials from '@/components/sections/Testimonials'

import PortfolioHero from '@/components/portfolio/PortfolioHero'
import PortfolioListingClient from '@/components/portfolio/PortfolioListingClient'

export const dynamic = 'force-dynamic'
export const revalidate = 0

export async function generateMetadata(): Promise<Metadata> {
  try {
    const pageData = await client.fetch(caseStudiesPageQuery)
    const title = pageData?.seo?.metaTitle || 'Our Work & Case Studies | Travash Software Solutions'
    const description =
      pageData?.seo?.metaDescription ||
      pageData?.hero?.description ||
      'Explore web applications, mobile apps, enterprise platforms, and AI solutions engineered by Travash for organizations across banking, government, healthcare, and real estate.'
    const ogImageUrl = pageData?.seo?.ogImage?.asset?.url

    return {
      title,
      description,
      openGraph: {
        title,
        description,
        type: 'website',
        ...(ogImageUrl ? { images: [{ url: ogImageUrl }] } : {}),
      },
      twitter: {
        card: 'summary_large_image',
        title,
        description,
        ...(ogImageUrl ? { images: [ogImageUrl] } : {}),
      },
    }
  } catch {
    return {
      title: 'Our Work & Case Studies | Travash Software Solutions',
      description:
        'Explore web applications, mobile apps, enterprise platforms, and AI solutions engineered by Travash for organizations across banking, government, healthcare, and real estate.',
    }
  }
}

export default async function PortfolioPage() {
  let sanityProjects: any[] = []
  let listingPageData: any = null

  try {
    const [fetchedSanity, pageData] = await Promise.all([
      getAllPortfolioProjects(),
      client.fetch(caseStudiesPageQuery).catch(() => null),
    ])
    listingPageData = pageData
    if (fetchedSanity && Array.isArray(fetchedSanity)) {
      sanityProjects = fetchedSanity
    }
  } catch (err) {
    console.warn('Sanity portfolio projects fetch fallback triggered:', err)
  }

  // Create lookup of Sanity projects by slug
  const sanitySlugMap = new Map<string, any>()
  for (const p of sanityProjects) {
    if (!p || !p.slug) continue
    const slugKey = String(p.slug).toLowerCase().trim()
    const existing = sanitySlugMap.get(slugKey)
    if (!existing) {
      sanitySlugMap.set(slugKey, p)
    } else if (p._type === 'caseStudy' && existing._type !== 'caseStudy') {
      sanitySlugMap.set(slugKey, p)
    }
  }

  // Master list of 11 approved active case study slugs to display on the portfolio page
  const UPDATED_PORTFOLIO_SLUGS = [
    'pekt',
    'satyapaan',
    'direct-owners',
    'ugo',
    'indispare',
    'i4c-bank-portal',
    'dovehouse',
    'skipr',
    'darpan',
    'i-verify',
    'dine-desk',
    // Gemba is controlled by the admin toggle — always include in data,
    // visibility is handled client-side by GembaToggleWrapper
    'gemba',
  ]

  // Map and filter default projects to include ONLY approved case studies that are set visible
  const projects: PortfolioProject[] = DEFAULT_PORTFOLIO_PROJECTS
    .filter((p) => {
      const slug = p.slug.toLowerCase().trim()
      const slugKey = slug === 'i4c' ? 'i4c-bank-portal' : slug === 'dinedesk' ? 'dine-desk' : slug
      const sp = sanitySlugMap.get(slugKey)

      // If Sanity project explicitly sets portfolioVisible to false, filter it out
      if (sp && sp.portfolioVisible === false) {
        return false
      }

      return (
        UPDATED_PORTFOLIO_SLUGS.includes(slug) ||
        (slug === 'i4c' && UPDATED_PORTFOLIO_SLUGS.includes('i4c-bank-portal')) ||
        (slug === 'dinedesk' && UPDATED_PORTFOLIO_SLUGS.includes('dine-desk'))
      )
    })
    .map((fallback) => {
      const slugKey = fallback.slug.toLowerCase().trim()
      const sp = sanitySlugMap.get(slugKey) || {}

      let orderIdx = UPDATED_PORTFOLIO_SLUGS.indexOf(slugKey)
      if (orderIdx === -1 && slugKey === 'i4c') {
        orderIdx = UPDATED_PORTFOLIO_SLUGS.indexOf('i4c-bank-portal')
      }
      if (orderIdx === -1 && slugKey === 'dinedesk') {
        orderIdx = UPDATED_PORTFOLIO_SLUGS.indexOf('dine-desk')
      }

      return {
        ...fallback,
        ...sp,
        title: sp.title || fallback.title,
        portfolioTitle: sp.portfolioTitle || fallback.portfolioTitle || fallback.title,
        slug: fallback.slug,
        cardDescription:
          sp.cardDescription ||
          sp.excerpt ||
          sp.shortDescription ||
          fallback.cardDescription ||
          fallback.shortDescription,
        cardImage: sp.cardImage || sp.featuredImage || sp.heroImage || fallback.cardImage,
        category: fallback.category,
        industry: fallback.industry,
        projectType: fallback.projectType,
        projectTypes:
          Array.isArray(sp.projectTypes) && sp.projectTypes.length > 0
            ? sp.projectTypes
            : fallback.projectTypes,
        technologies:
          sp.technologies && sp.technologies.length > 0 ? sp.technologies : fallback.technologies,
        metrics: sp.metrics && sp.metrics.length > 0 ? sp.metrics : fallback.metrics,
        portfolioOrder: orderIdx !== -1 ? orderIdx + 1 : fallback.portfolioOrder || 100,
      }
    })
    .sort((a, b) => (a.portfolioOrder || 100) - (b.portfolioOrder || 100))

  const industries: IndustryItem[] = DEFAULT_INDUSTRIES

  return (
    <>
      <Navbar />
      <main id="main-content" className="min-h-screen bg-white">
        {/* Hero Section */}
        <PortfolioHero
          totalCount={projects.length}
          eyebrow={listingPageData?.hero?.eyebrow}
          heading={listingPageData?.hero?.heading}
          headingHighlight={listingPageData?.hero?.headingHighlight}
          description={listingPageData?.hero?.description}
          badges={listingPageData?.hero?.badges}
        />

        {/* Dynamic Client Filter & Grid Section */}
        <div id="projects-grid">
          <Suspense
            fallback={
              <div className="py-24 text-center">
                <div className="inline-block w-8 h-8 border-4 border-[#02487D] border-t-transparent rounded-full animate-spin mb-4" />
                <p className="text-sm font-medium text-[#64748B]">Loading case studies...</p>
              </div>
            }
          >
            <PortfolioListingClient
              initialProjects={projects}
              industries={industries}
            />
          </Suspense>
        </div>


        {/* Proven Scale Stats */}
        <Stats />

        {/* Global Testimonials */}
        <Testimonials />

        {/* Contact & Consultation Section */}
        <Contact />
      </main>
      <Footer />
    </>
  )
}
