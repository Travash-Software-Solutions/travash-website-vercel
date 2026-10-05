import { Metadata } from 'next'
import { client } from '@/lib/sanity'
import { careerPageQuery, jobsQuery, siteSettingsQuery } from '@/lib/queries'

import Navbar from '@/components/sections/Navbar'
import CareerHero from '@/components/career/CareerHero'
import CareerBenefits from '@/components/career/CareerBenefits'
import JobList from '@/components/career/JobList'
import Contact from '@/components/sections/Contact'
import Footer from '@/components/sections/Footer'

export const dynamic = 'force-dynamic'
export const revalidate = 0

const DEFAULT_JOBS = [
  {
    title: 'Business Development Manager (BDM)',
    slug: 'business-development-manager',
    category: 'Business Development & Sales',
    employmentType: 'Full-time',
    location: 'Hyderabad, India (Hybrid)',
    experience: '3-6 Years',
    shortDescription:
      'Drive enterprise client acquisition, lead strategic B2B partnerships, and expand global IT software engineering revenue streams for Travash Software Solutions.',
  },
  {
    title: 'Digital Marketing Expert',
    slug: 'digital-marketing-expert',
    category: 'Marketing & Growth',
    employmentType: 'Full-time',
    location: 'Hyderabad, India (Hybrid)',
    experience: '3-5 Years',
    shortDescription:
      'Lead digital marketing campaigns, SEO strategy, inbound lead generation, and performance marketing to scale Travash’s global brand presence.',
  },
  {
    title: 'PHP Developer',
    slug: 'php-developer',
    category: 'Backend Development',
    employmentType: 'Full-time',
    location: 'Hyderabad, India (Hybrid)',
    experience: '3-5 Years',
    shortDescription:
      'Architect, develop, and optimize scalable web platforms using PHP, Laravel, and MySQL for enterprise SaaS and eCommerce solutions.',
  },
  {
    title: 'Frontend Developer',
    slug: 'frontend-developer',
    category: 'Frontend Development',
    employmentType: 'Full-time',
    location: 'Hyderabad, India (Hybrid)',
    experience: '2-4 Years',
    shortDescription:
      'Build responsive, high-performance user interfaces using React, Next.js, TypeScript, and modern design systems with pixel-perfect fidelity.',
  },
  {
    title: 'Java Developer',
    slug: 'java-developer',
    category: 'Software Engineering',
    employmentType: 'Full-time',
    location: 'Hyderabad, India (Hybrid)',
    experience: '4-7 Years',
    shortDescription:
      'Design and deploy microservices architectures, RESTful APIs, and enterprise cloud solutions using Spring Boot, Kafka, and PostgreSQL.',
  },
]

export async function generateMetadata(): Promise<Metadata> {
  try {
    const data = await client.fetch(careerPageQuery)
    const seo = data?.careerPage?.seo
    return {
      title: seo?.metaTitle || 'Careers — Engineering Opportunities & Culture | Travash',
      description:
        seo?.metaDescription ||
        'Join Travash Software Solutions. Explore career opportunities in frontend, backend, Java, AI, and full-stack engineering in a high-growth environment.',
    }
  } catch {
    return {
      title: 'Careers — Engineering Opportunities & Culture | Travash',
      description:
        'Join Travash Software Solutions. Explore career opportunities in frontend, backend, Java, AI, and full-stack engineering in a high-growth environment.',
    }
  }
}

async function getCareerData() {
  try {
    const res = await client.fetch(careerPageQuery)
    if (res) {
      return {
        careerPage: res.careerPage || null,
        jobs: res.jobs && res.jobs.length > 0 ? res.jobs : DEFAULT_JOBS,
        siteSettings: res.siteSettings || null,
      }
    }
  } catch {
    // fallback
  }

  try {
    const [jobs, siteSettings] = await Promise.all([
      client.fetch(jobsQuery),
      client.fetch(siteSettingsQuery),
    ])
    return {
      careerPage: null,
      jobs: jobs && jobs.length > 0 ? jobs : DEFAULT_JOBS,
      siteSettings,
    }
  } catch {
    return {
      careerPage: null,
      jobs: DEFAULT_JOBS,
      siteSettings: null,
    }
  }
}

export default async function CareerPage() {
  const { careerPage, jobs, siteSettings } = await getCareerData()

  return (
    <>
      <Navbar settings={siteSettings} />
      <main>
        <CareerHero data={careerPage?.hero} openPositionsCount={jobs.length} />
        <CareerBenefits data={careerPage?.benefitsSection} />
        <JobList jobs={jobs} header={careerPage?.jobsSection} />
        <Contact />
      </main>
      <Footer settings={siteSettings} />
    </>
  )
}
