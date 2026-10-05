import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { client } from '@/lib/sanity'
import { portfolioProjectBySlugQuery, allPortfolioSlugsQuery } from '@/lib/portfolioQueries'
import { caseStudyBySlugQuery, homePageQuery } from '@/lib/queries'
import {
  FALLBACK_CASE_STUDIES,
  type CaseStudyData,
} from '@/lib/case-study-data'
import { DEFAULT_PORTFOLIO_PROJECTS } from '@/lib/portfolio-data'

import Navbar from '@/components/sections/Navbar'
import Footer from '@/components/sections/Footer'

import CaseStudyHero from '@/components/case-study/CaseStudyHero'
import CaseStudyMetrics from '@/components/case-study/CaseStudyMetrics'
import ExecutiveSummary from '@/components/case-study/ExecutiveSummary'
import TheComplexity from '@/components/case-study/TheComplexity'
import TheChallenge from '@/components/case-study/TheChallenge'
import CaseStudyContentSection from '@/components/case-study/CaseStudyContentSection'
import ProjectVisual from '@/components/case-study/ProjectVisual'
import ApproachSteps from '@/components/case-study/ApproachSteps'
import SolutionGrid from '@/components/case-study/SolutionGrid'
import ArchitectureSection from '@/components/case-study/ArchitectureSection'
import TechnologyStack from '@/components/case-study/TechnologyStack'
import TheImpact from '@/components/case-study/TheImpact'
import BeforeAfterComparison from '@/components/case-study/BeforeAfterComparison'
import ClientPerspective from '@/components/case-study/ClientPerspective'
import WhyItMatters from '@/components/case-study/WhyItMatters'
import CaseStudyNextStep from '@/components/case-study/CaseStudyNextStep'
import CaseStudyContact from '@/components/case-study/CaseStudyContact'
import { cleanCaseStudyContent, sanitizeScrapedText } from '@/lib/case-study-cleaner'
import { getSanityImageUrl } from '@/lib/sanity.image'

import { CheckCircle2 } from 'lucide-react'

export const dynamic = 'force-dynamic'
export const revalidate = 0

// Adapt any Sanity project or fallback into standard CaseStudyData shape
function adaptToCaseStudyData(raw: any, slug: string): CaseStudyData | null {
  const fallback = FALLBACK_CASE_STUDIES[slug]

  if (!raw && !fallback) return null

  if (fallback) {
    const combinedGallery =
      (Array.isArray(raw?.gallery) && raw.gallery.length > 0 ? raw.gallery : null) ||
      fallback.gallery ||
      []

    return {
      ...fallback,
      _id: raw?._id || fallback._id,
      slug: fallback.slug || { current: slug },
      title: (typeof raw?.title === 'string' && raw.title.trim()) || fallback.title,
      eyebrow: raw?.eyebrow || fallback.eyebrow,
      category: raw?.category || fallback.category,
      industry: (typeof raw?.industry === 'string' ? raw.industry : raw?.industry?.title || raw?.industry?.name) || fallback.industry,
      client: (typeof raw?.client === 'string' ? raw.client : raw?.client?.title || raw?.client?.name) || fallback.client,
      location: raw?.location || fallback.location,
      shortDescription: raw?.shortDescription || fallback.shortDescription,
      heroImage: raw?.heroImage || raw?.featuredImage || fallback.heroImage,
      featureImage: raw?.featureImage || raw?.featuredImage || fallback.featureImage,
      gallery: combinedGallery,
      projectMeta:
        Array.isArray(raw?.projectMeta) && raw.projectMeta.length > 0
          ? raw.projectMeta
          : fallback.projectMeta,
      metrics:
        Array.isArray(raw?.metrics) && raw.metrics.length > 0
          ? raw.metrics
          : fallback.metrics,
      executiveSummary: raw?.executiveSummary
        ? {
            ...fallback.executiveSummary,
            ...raw.executiveSummary,
            paragraphs:
              Array.isArray(raw.executiveSummary.paragraphs) &&
              raw.executiveSummary.paragraphs.length > 0
                ? raw.executiveSummary.paragraphs
                : fallback.executiveSummary?.paragraphs,
          }
        : fallback.executiveSummary,
      challenge: raw?.challenge
        ? {
            ...fallback.challenge,
            ...raw.challenge,
            subtitle: raw.challenge.subtitle || raw.challenge.headline || fallback.challenge?.subtitle,
            content: raw.challenge.content || (raw.challenge as any).description || fallback.challenge?.content,
            pointsLabel: raw.challenge.pointsLabel || fallback.challenge?.pointsLabel,
            points:
              Array.isArray(raw.challenge.points) && raw.challenge.points.length > 0
                ? raw.challenge.points
                : fallback.challenge?.points,
            takeaway: raw.challenge.takeaway || fallback.challenge?.takeaway,
          }
        : fallback.challenge,
      complexity: raw?.complexity
        ? {
            ...fallback.complexity,
            ...raw.complexity,
            items:
              Array.isArray(raw.complexity.items) && raw.complexity.items.length > 0
                ? raw.complexity.items
                : fallback.complexity?.items,
          }
        : fallback.complexity,
      approach: raw?.approach
        ? {
            ...fallback.approach,
            ...raw.approach,
            steps:
              Array.isArray(raw.approach.steps) && raw.approach.steps.length > 0
                ? raw.approach.steps
                : fallback.approach?.steps,
          }
        : fallback.approach,
      solution: raw?.solution
        ? {
            ...fallback.solution,
            ...raw.solution,
            items:
              Array.isArray(raw.solution.items) && raw.solution.items.length > 0
                ? raw.solution.items
                : fallback.solution?.items,
          }
        : fallback.solution,
      solutionArchitecture: {
        ...fallback.solutionArchitecture,
        ...(raw?.solutionArchitecture || {}),
        title: raw?.solutionArchitecture?.title || fallback.solutionArchitecture?.title,
        intro: raw?.solutionArchitecture?.intro || fallback.solutionArchitecture?.intro,
        caption: raw?.solutionArchitecture?.caption || fallback.solutionArchitecture?.caption,
        image:
          raw?.solutionArchitecture?.image ||
          fallback.solutionArchitecture?.image ||
          (combinedGallery.length > 0 ? combinedGallery[combinedGallery.length - 1] : null) ||
          { asset: { url: '/casestudy-img/arctature-daigram.webp' } },
      },
      techStackTitle: raw?.techStackTitle || (fallback as any)?.techStackTitle,
      techStackSubtitle: raw?.techStackSubtitle || (fallback as any)?.techStackSubtitle,
      technologyStack:
        Array.isArray(raw?.technologyStack) && raw.technologyStack.length > 0
          ? raw.technologyStack
          : fallback.technologyStack,
      impact: raw?.impact
        ? {
            ...fallback.impact,
            ...raw.impact,
            outcomes:
              Array.isArray(raw.impact.outcomes) && raw.impact.outcomes.length > 0
                ? raw.impact.outcomes
                : fallback.impact?.outcomes,
          }
        : fallback.impact,
      beforeAfter: raw?.beforeAfter
        ? {
            ...fallback.beforeAfter,
            ...raw.beforeAfter,
            before:
              Array.isArray(raw.beforeAfter.before) && raw.beforeAfter.before.length > 0
                ? raw.beforeAfter.before
                : fallback.beforeAfter?.before,
            after:
              Array.isArray(raw.beforeAfter.after) && raw.beforeAfter.after.length > 0
                ? raw.beforeAfter.after
                : fallback.beforeAfter?.after,
          }
        : fallback.beforeAfter,
      testimonial: raw?.testimonial && (raw.testimonial.quote || raw.testimonial.author)
        ? {
            heading: raw.testimonial.heading || fallback.testimonial?.heading || 'Client Perspective',
            intro: raw.testimonial.intro || fallback.testimonial?.intro || "Insights, expectations, and feedback from the client's point of view.",
            quote: raw.testimonial.quote || fallback.testimonial?.quote,
            author:
              raw.testimonial.author ||
              raw.testimonial.name ||
              fallback.testimonial?.author ||
              'Executive Stakeholder',
            role:
              raw.testimonial.role ||
              raw.testimonial.designation ||
              fallback.testimonial?.role,
            company:
              raw.testimonial.company ||
              fallback.testimonial?.company ||
              fallback.title,
            image: raw.testimonial.image || fallback.testimonial?.image,
          }
        : fallback.testimonial,
      whyItMatters: raw?.whyItMatters
        ? {
            ...fallback.whyItMatters,
            ...raw.whyItMatters,
            items:
              Array.isArray(raw.whyItMatters.items) && raw.whyItMatters.items.length > 0
                ? raw.whyItMatters.items
                : fallback.whyItMatters?.items,
          }
        : fallback.whyItMatters,
      nextStep: raw?.nextStep
        ? {
            ...fallback.nextStep,
            ...raw.nextStep,
          }
        : fallback.nextStep,
      contact: (raw as any)?.contact || (fallback as any).contact,
      content: fallback.content || [],
      seo: {
        ...fallback.seo,
        metaTitle:
          raw?.seo?.metaTitle ||
          fallback.seo?.metaTitle ||
          `${fallback.title} | Travash Software Solutions`,
        metaDescription:
          raw?.seo?.metaDescription ||
          fallback.seo?.metaDescription ||
          fallback.shortDescription,
        ogImage: raw?.seo?.ogImage || fallback.seo?.ogImage,
      },
    }
  }

  // Synthesis for any project without a pre-baked static fallback
  const defaultProj = DEFAULT_PORTFOLIO_PROJECTS.find((p) => p.slug === slug)

  const rawTitle = typeof raw?.title === 'string' ? sanitizeScrapedText(raw.title, '') : ''
  const title = rawTitle || defaultProj?.title || raw?.title || slug

  const industry =
    typeof raw?.industry === 'string'
      ? raw.industry
      : raw?.industry?.title ||
        raw?.industry?.name ||
        raw?.industryName ||
        defaultProj?.industry ||
        'Enterprise Technology'

  const service =
    raw?.serviceType ||
    (Array.isArray(raw?.services) && raw.services[0]
      ? typeof raw.services[0] === 'string'
        ? raw.services[0]
        : raw.services[0]?.title || raw.services[0]?.name
      : defaultProj?.category || 'Custom Software Development')

  let techList: string[] = (raw?.technologies || raw?.techStack || [])
    .map((t: any) => (typeof t === 'string' ? t : t?.title || t?.name || ''))
    .filter(Boolean)
  if (techList.length === 0 && defaultProj?.technologies) {
    techList = (defaultProj.technologies as any[])
      .map((t: any) => (typeof t === 'string' ? t : t?.name || t?.title || ''))
      .filter(Boolean)
  }

  const challengesList = Array.isArray(raw?.challenges) ? raw.challenges : []
  const solutionsList = Array.isArray(raw?.solutions) ? raw.solutions : []
  const metricsList =
    Array.isArray(raw?.metrics) && raw.metrics.length > 0
      ? raw.metrics
      : defaultProj?.metrics && defaultProj.metrics.length > 0
      ? defaultProj.metrics
      : [
          { value: '100%', label: 'Delivery SLA Compliance' },
          { value: '24/7', label: 'Continuous Reliability' },
          { value: '<1s', label: 'Optimized Query Response' },
          { value: raw?.client || title, label: 'client-badge' },
        ]

  const fallbackThumb = defaultProj?.cardImage || `/images/portfolio/${slug}.webp`
  const heroImage = raw?.heroImage || raw?.featuredImage || raw?.cardImage || fallbackThumb
  const featureImage = raw?.featureImage || raw?.featuredImage || raw?.cardImage || fallbackThumb

  const cleanExcerpt = sanitizeScrapedText(raw?.excerpt, '')
  const cleanDesc = sanitizeScrapedText(raw?.description, '')
  const fallbackShortDesc =
    defaultProj?.shortDescription ||
    defaultProj?.cardDescription ||
    `${title} enterprise platform engineered by Travash.`
  const shortDescription = cleanExcerpt || cleanDesc || fallbackShortDesc

  const rawSummaryParas = Array.isArray(raw?.executiveSummary?.paragraphs)
    ? raw.executiveSummary.paragraphs
        .map((p: string) => sanitizeScrapedText(p, ''))
        .filter(Boolean)
    : []

  const executiveSummary =
    rawSummaryParas.length > 0
      ? {
          title: raw?.executiveSummary?.title || 'Executive Summary',
          subtitle:
            raw?.executiveSummary?.subtitle ||
            `Modernizing operations through custom digital engineering for ${title}.`,
          paragraphs: rawSummaryParas,
        }
      : {
          title: 'Executive Summary',
          subtitle: `Modernizing operations through custom digital engineering for ${title}.`,
          paragraphs: [
            cleanDesc || cleanExcerpt || fallbackShortDesc,
            'Through user-centric design, resilient architecture, and modern automation, Travash delivered measurable performance improvements and seamless user experiences.',
          ],
        }

  const challengeContent =
    sanitizeScrapedText(raw?.challenge?.content, '') ||
    cleanDesc ||
    `The primary objective was establishing an integrated, secure, and intuitive workflow for ${title}.`

  return {
    _id: raw?._id || `proj-${slug}`,
    title,
    slug: { current: slug },
    eyebrow: 'CASE STUDY',
    category: service,
    industry,
    client: raw?.client || title,
    location: raw?.location || 'Global / Enterprise',
    shortDescription,
    featureImage,
    heroImage,
    projectMeta: [
      { label: 'Industry', value: industry },
      { label: 'Solution', value: title },
      { label: 'Capabilities', value: service },
      { label: 'Platform', value: raw?.platform || 'Enterprise Web & Cloud' },
    ],
    metrics: metricsList,
    executiveSummary,
    complexity:
      raw?.complexity ||
      (challengesList.length > 0
        ? {
            title: 'The Complexity',
            intro: 'Key operational challenges and engineering constraints encountered during development.',
            items: challengesList.map((c: any, i: number) => ({
              title: (typeof c === 'string' ? c : c.title || `CHALLENGE ${i + 1}`).toUpperCase(),
              description: typeof c === 'string' ? c : c.description || c.title,
            })),
          }
        : undefined),
    challenge:
      raw?.challenge
        ? {
            title: raw.challenge.title || 'The Challenge',
            subtitle: raw.challenge.subtitle || raw.challenge.headline || 'Overcoming architectural hurdles and manual inefficiencies.',
            content: sanitizeScrapedText(raw.challenge.content, '') || cleanDesc || challengeContent,
            pointsLabel: raw.challenge.pointsLabel || 'Key Operational Challenges:',
            points:
              Array.isArray(raw.challenge.points) && raw.challenge.points.length > 0
                ? raw.challenge.points
                : challengesList.length > 0
                ? challengesList.map((c: any) => (typeof c === 'string' ? c : c.title || c.description))
                : [
                    'Fragmented workflows requiring manual intervention and administrative overhead',
                    'Need for real-time synchronization and high-availability data handling',
                    'Demanding security, data protection, and auditability standards',
                    'Scalable infrastructure capable of supporting rapid transaction growth',
                  ],
            takeaway: raw.challenge.takeaway,
          }
        : {
            title: 'The Challenge',
            subtitle: 'Overcoming architectural hurdles and manual inefficiencies.',
            content: challengeContent,
            points:
              challengesList.length > 0
                ? challengesList.map((c: any) => (typeof c === 'string' ? c : c.title || c.description))
                : [
                    'Fragmented workflows requiring manual intervention and administrative overhead',
                    'Need for real-time synchronization and high-availability data handling',
                    'Demanding security, data protection, and auditability standards',
                    'Scalable infrastructure capable of supporting rapid transaction growth',
                  ],
          },
    approach:
      raw?.approach || {
        title: 'Travash Approach',
        intro: 'Systematic Discovery, Engineering, and Iterative Deployment',
        steps: [
          {
            stepNumber: '01',
            title: 'Discover',
            description: 'Collaborated with key stakeholders to map workflow friction and technical dependencies.',
          },
          {
            stepNumber: '02',
            title: 'Architect',
            description: 'Formulated a modular, secure architecture optimized for high uptime and responsive performance.',
          },
          {
            stepNumber: '03',
            title: 'Implement',
            description: 'Developed intuitive UI components backed by robust microservices and secure database layers.',
          },
          {
            stepNumber: '04',
            title: 'Validate',
            description: 'Executed rigorous automated testing and security audits prior to full-scale deployment.',
          },
        ],
      },
    solution:
      raw?.solution || {
        title: 'The Solution',
        intro: `${title} – Engineered for Scale, Usability, and Speed`,
        items:
          solutionsList.length > 0
            ? solutionsList.map((s: any) => ({
                title: typeof s === 'string' ? s : s.title,
                description: typeof s === 'string' ? s : s.description || s.title,
              }))
            : [
                {
                  title: 'Automated Core Workflows',
                  description: 'Streamlined data capture and processing to minimize administrative delays.',
                },
                {
                  title: 'Responsive User Experience',
                  description: 'Designed clean, intuitive interfaces that maximize employee and user productivity.',
                },
                {
                  title: 'Robust Data Integrity',
                  description: 'Ensured high-level encryption and continuous backup protection across all interactions.',
                },
              ],
      },
    techStackTitle: raw?.techStackTitle,
    techStackSubtitle: raw?.techStackSubtitle,
    technologyStack:
      raw?.technologyStack && Array.isArray(raw.technologyStack) && raw.technologyStack.length > 0
        ? raw.technologyStack
        : FALLBACK_CASE_STUDIES[slug]?.technologyStack ||
          (techList.length > 0
            ? [
                {
                  category: 'Core Architecture',
                  technologies: techList.slice(0, 2),
                },
                {
                  category: 'Data & Infrastructure',
                  technologies: techList.slice(2, 4),
                },
                {
                  category: 'Interface & Services',
                  technologies: techList.slice(4),
                },
              ].filter((c) => c.technologies.length > 0)
            : undefined),
    impact:
      raw?.impact || {
        title: 'The Impact',
        subtitle: 'Measurable Operational Enhancements and Business Value',
        content: `The implementation of ${title} established automated efficiency and empowered stakeholders with immediate visibility.`,
        outcomes: [
          'Significant reduction in manual processing latency and error rates',
          'Enhanced user engagement and satisfaction across all user segments',
          'High-availability uptime and scalable system performance',
          'Zero security infractions with end-to-end data protection',
        ],
      },
    beforeAfter: raw?.beforeAfter,
    testimonial: raw?.testimonial && (raw.testimonial.quote || raw.testimonial.author)
      ? {
          heading: raw.testimonial.heading || 'Client Perspective',
          intro: raw.testimonial.intro || "Insights, expectations, and feedback from the client's point of view.",
          quote: raw.testimonial.quote,
          author: raw.testimonial.author || raw.testimonial.name || 'Executive Stakeholder',
          role: raw.testimonial.role || raw.testimonial.designation || 'Client Leadership',
          company: raw.testimonial.company || title,
          image: raw.testimonial.image || { asset: { url: '/images/avatar-placeholder.svg' } },
        }
      : FALLBACK_CASE_STUDIES[slug]?.testimonial || undefined,
    whyItMatters:
      raw?.whyItMatters || {
        title: 'Why This Matters',
        subtitle: 'Is Your Organization Facing Similar Scale Challenges?',
        items: [
          'Eliminating manual bottlenecks in core business processes',
          'Modernizing legacy software infrastructure with modern web standards',
          'Integrating disparate data sources into a unified single pane of glass',
          'Delivering dependable, secure user experiences for mission-critical operations',
        ],
      },
    nextStep:
      raw?.nextStep || {
        heading: 'The Next Step',
        content: `Accelerate your organization's digital transformation. Travash combines custom software engineering, AI-assisted workflows, and deep architecture expertise to build scalable platforms tailored to your business goals.`,
        primaryCTA: { label: 'Discuss Your Initiative', href: '#contact' },
        secondaryCTA: { label: 'Explore Engineering Consultation', href: '#contact' },
      },
    contact: raw?.contact,
    gallery: raw.gallery || [],
    solutionArchitecture: raw.solutionArchitecture || {
      title: 'Solution Architecture',
      intro: `Distributed, cloud-resilient system architecture engineered for ${title} to ensure high availability and sub-second transaction throughput.`,
      image:
        raw.gallery && raw.gallery.length > 0
          ? raw.gallery[raw.gallery.length - 1]
          : { asset: { url: '/casestudy-img/arctature-daigram.webp' } },
      caption: `Figure: ${title} Cloud Architecture & Enterprise Workflow Infrastructure`,
    },
    content: cleanCaseStudyContent(raw?.content),
    seo: {
      metaTitle: raw?.seo?.metaTitle || `${title} Case Study | Travash Software Solutions`,
      metaDescription: sanitizeScrapedText(raw?.seo?.metaDescription, '') || shortDescription,
    },
  }
}

// Generate Dynamic SEO Metadata
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params

  let raw: any = null
  try {
    raw = await client.fetch(caseStudyBySlugQuery, { slug }, { cache: 'no-store', next: { revalidate: 0 } })
    if (!raw) {
      raw = await client.fetch(portfolioProjectBySlugQuery, { slug }, { cache: 'no-store', next: { revalidate: 0 } })
    }
  } catch {
    // fallback
  }

  const data = adaptToCaseStudyData(raw, slug)

  if (!data) {
    return {
      title: 'Case Study Not Found | Travash Software Solutions',
    }
  }

  const title =
    data.seo?.metaTitle || `${data.title} | Travash Software Solutions`
  const description =
    data.seo?.metaDescription ||
    data.shortDescription ||
    'Explore enterprise technology solutions and case studies by Travash.'

  const ogImageUrl =
    data.seo?.ogImage?.asset?.url ||
    (typeof data.featureImage === 'string'
      ? data.featureImage
      : data.featureImage?.asset?.url) ||
    (typeof data.heroImage === 'string'
      ? data.heroImage
      : data.heroImage?.asset?.url)

  const canonicalUrl = `https://travash.com/portfolio/${slug}/`

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
      type: 'article',
      siteName: 'Travash Software Solutions',
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
}

export default async function PortfolioProjectDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params

  let rawProject: any = null
  let siteSettings: any = null

  try {
    const [caseStudyResult, projectResult, homeResult] = await Promise.all([
      client.fetch(caseStudyBySlugQuery, { slug }, { cache: 'no-store', next: { revalidate: 0 } }),
      client.fetch(portfolioProjectBySlugQuery, { slug }, { cache: 'no-store', next: { revalidate: 0 } }),
      client.fetch(homePageQuery, {}, { cache: 'no-store', next: { revalidate: 0 } }),
    ])
    rawProject = caseStudyResult || projectResult
    siteSettings = homeResult?.siteSettings || null
  } catch (err) {
    console.warn(`Sanity fetch error for portfolio slug ${slug}:`, err)
  }

  const caseStudy = adaptToCaseStudyData(rawProject, slug)

  if (!caseStudy) {
    notFound()
  }

  const articleUrl = `https://travash.com/portfolio/${slug}`
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: caseStudy.title,
    description: caseStudy.shortDescription,
    image: [
      (caseStudy.heroImage || caseStudy.featureImage) 
        ? getSanityImageUrl(caseStudy.heroImage || caseStudy.featureImage, 1200)
        : 'https://travash.com/home-img/Group%201000003287.png'
    ],
    author: {
      '@type': 'Organization',
      name: 'Travash Software Solutions'
    },
    publisher: {
      '@type': 'Organization',
      name: 'Travash Software Solutions',
      logo: {
        '@type': 'ImageObject',
        url: 'https://travash.com/travash-latest-logo.svg'
      }
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': articleUrl
    }
  }

  return (
    <>
      {/* Structured Data (JSON-LD) */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Navbar settings={siteSettings} />
      <main className="min-h-screen bg-white font-['Plus_Jakarta_Sans',sans-serif]">
        {/* 1. Hero Section with Metadata Stack & Mockup */}
        <CaseStudyHero data={caseStudy} />

        {/* 2. Key Metrics 4-Card Row */}
        <CaseStudyMetrics data={caseStudy} />

        {/* 3. Executive Summary */}
        {caseStudy.executiveSummary && (
          <ExecutiveSummary
            title={caseStudy.executiveSummary.title || 'Executive Summary'}
            paragraphs={caseStudy.executiveSummary.paragraphs}
          />
        )}

        {/* 4. The Challenge */}
        {caseStudy.challenge && (
          <TheChallenge
            title={caseStudy.challenge.title || 'The Challenge'}
            headline={caseStudy.challenge.subtitle}
            description={caseStudy.challenge.content || (caseStudy.challenge as any).description}
            points={caseStudy.challenge.points}
            pointsLabel={caseStudy.challenge.pointsLabel || 'OFFICIALS NEEDED TO IDENTIFY :'}
            takeaway={caseStudy.challenge.takeaway}
          />
        )}

        {/* 5. Center Laptop Visual Mockup */}
        <ProjectVisual
          imageSrc={
            (caseStudy.featureImage && getSanityImageUrl(caseStudy.featureImage, 1800) !== '/home-img/Group 1000003287.png'
              ? getSanityImageUrl(caseStudy.featureImage, 1800)
              : undefined) ||
            (caseStudy.heroImage && getSanityImageUrl(caseStudy.heroImage, 1800) !== '/home-img/Group 1000003287.png'
              ? getSanityImageUrl(caseStudy.heroImage, 1800)
              : undefined) ||
            (typeof caseStudy.featureImage === 'string' ? caseStudy.featureImage : undefined) ||
            (typeof caseStudy.heroImage === 'string' ? caseStudy.heroImage : undefined) ||
            '/home-img/satyapaan-min 2.png'
          }
          alt={caseStudy.title}
        />

        {/* 6. The Complexity */}
        {caseStudy.complexity && (
          <TheComplexity
            title={caseStudy.complexity.title || 'The Complexity'}
            intro={caseStudy.complexity.intro}
            items={caseStudy.complexity.items}
          />
        )}

        {/* 7. Travash Approach */}
        {caseStudy.approach && Array.isArray(caseStudy.approach.steps) && caseStudy.approach.steps.length > 0 && (
          <CaseStudyContentSection
            id="approach"
            title={caseStudy.approach.title || 'Travash Approach'}
            subtitle={
              caseStudy.approach.subtitle ||
              (caseStudy.approach.intro && !caseStudy.approach.description
                ? caseStudy.approach.intro
                : undefined)
            }
            description={
              caseStudy.approach.description ||
              (caseStudy.approach.subtitle ? caseStudy.approach.intro : undefined)
            }
            variant="gray"
          >
            <ApproachSteps steps={caseStudy.approach.steps} />
          </CaseStudyContentSection>
        )}

        {/* 8. The Solution */}
        {caseStudy.solution && Array.isArray(caseStudy.solution.items) && caseStudy.solution.items.length > 0 && (
          <CaseStudyContentSection
            id="solution"
            title={caseStudy.solution.title || 'The Solution'}
            subtitle={
              caseStudy.solution.subtitle ||
              (caseStudy.solution.intro && !caseStudy.solution.description
                ? caseStudy.solution.intro
                : undefined)
            }
            description={
              caseStudy.solution.description ||
              (caseStudy.solution.subtitle ? caseStudy.solution.intro : undefined)
            }
            variant="blue"
          >
            <SolutionGrid items={caseStudy.solution.items} />
          </CaseStudyContentSection>
        )}

        {/* 9. Solution Architecture */}
        <ArchitectureSection
          slug={slug}
          client={typeof caseStudy.client === 'string' ? caseStudy.client : caseStudy.title}
          title={caseStudy.solutionArchitecture?.title || 'Solution\nArchitecture'}
          intro={caseStudy.solutionArchitecture?.intro}
          imageSrc={
            getSanityImageUrl(caseStudy.solutionArchitecture?.image, 1400) ||
            (slug === 'satyapaan' ? '/casestudy-img/arctature-daigram.webp' : undefined)
          }
          caption={caseStudy.solutionArchitecture?.caption}
          isSatyaapan={slug === 'satyapaan' || !!caseStudy.solutionArchitecture?.isSatyaapan}
        />

        {/* 10. Enterprise Technology Stack */}
        <TechnologyStack
          title={caseStudy.techStackTitle || 'Enterprise\nTechnology Stack'}
          subtitle={caseStudy.techStackSubtitle}
          items={caseStudy.technologyStack}
        />

        {/* 11. The Impact */}
        {caseStudy.impact && (
          <TheImpact
            title={caseStudy.impact.title || 'The Impact'}
            subtitle={caseStudy.impact.subtitle}
            content={
              caseStudy.impact.content ||
              (Array.isArray(caseStudy.impact.outcomes) && caseStudy.impact.outcomes.length > 0
                ? undefined
                : 'Turning High-Volume Manual Verification Into an AI-Assisted Digital Workflow Reduced manual effort and accelerated verification turnaround times.')
            }
            outcomes={caseStudy.impact.outcomes}
          />
        )}

        {/* 12. Before vs. After Comparison */}
        {caseStudy.beforeAfter && (
          <BeforeAfterComparison
            title={caseStudy.beforeAfter.title}
            subtitle={caseStudy.beforeAfter.subtitle}
            beforeTitle={caseStudy.beforeAfter.beforeTitle}
            afterTitle={caseStudy.beforeAfter.afterTitle}
            before={caseStudy.beforeAfter.before}
            after={caseStudy.beforeAfter.after}
          />
        )}

        {/* 13. Client Perspective / Testimonial */}
        {caseStudy.testimonial && (
          <ClientPerspective
            data={caseStudy.testimonial}
            heading={(caseStudy.testimonial as any)?.heading}
            intro={(caseStudy.testimonial as any)?.intro}
          />
        )}

        {/* 14. Why This Matters */}
        {caseStudy.whyItMatters && (
          <WhyItMatters
            title={caseStudy.whyItMatters.title}
            subtitle={caseStudy.whyItMatters.subtitle}
            items={caseStudy.whyItMatters.items}
            description={caseStudy.whyItMatters.description}
          />
        )}

        {/* 15. The Next Step Banner */}
        <CaseStudyNextStep
          heading={caseStudy.nextStep?.heading || 'The Next Step'}
          subtitle={
            caseStudy.nextStep?.subtitle ||
            'Looking to Modernize a High-Volume Verification or Public-Safety Workflow?'
          }
          content={caseStudy.nextStep?.content}
          primaryCTA={caseStudy.nextStep?.primaryCTA}
          secondaryCTA={caseStudy.nextStep?.secondaryCTA}
        />

        {/* 16. Contact Form */}
        <CaseStudyContact
          heading={
            caseStudy.contact?.heading ||
            'Ready to automate and solve operational bottlenecks?'
          }
          description={
            caseStudy.contact?.description ||
            'At Travash, we engineer enterprise-grade AI and automation solutions that solve complex business challenges and streamline operations. Visit travash.com to connect with our digital transformation experts.'
          }
        />
      </main>

      {/* 17. Global Footer */}
      <Footer settings={siteSettings} />
    </>
  )
}
