import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { client } from '@/lib/sanity'
import { jobBySlugQuery, allJobSlugsQuery, siteSettingsQuery } from '@/lib/queries'

import Navbar from '@/components/sections/Navbar'
import JobDetailContent, { JobDetailData } from '@/components/career/JobDetailContent'
import JobApplicationForm from '@/components/career/JobApplicationForm'
import Contact from '@/components/sections/Contact'
import Footer from '@/components/sections/Footer'

export const dynamic = 'force-dynamic'
export const revalidate = 0

interface PageProps {
  params: Promise<{ slug: string }>
}

const DEFAULT_JOB_DETAILS: Record<string, JobDetailData> = {
  'business-development-manager': {
    title: 'Business Development Manager (BDM)',
    slug: 'business-development-manager',
    category: 'Business Development & Sales',
    employmentType: 'Full-time',
    location: 'Hyderabad, India (Hybrid)',
    experience: '3-6 Years',
    salary: 'Competitive / Best in Industry + Performance Incentives',
    shortDescription:
      'Drive enterprise client acquisition, lead strategic B2B partnerships, and expand global IT software engineering revenue streams for Travash Software Solutions.',
    overview:
      'We are seeking a results-driven Business Development Manager (BDM) to spearhead our enterprise sales and client acquisition initiatives. You will identify new market opportunities, cultivate relationships with CXOs and engineering directors, manage end-to-end sales cycles, and present tailored IT service solutions in custom software development, cloud modernization, and dedicated engineering squads.',
    responsibilities: [
      'Identify, pitch, and close enterprise B2B accounts across North America, Europe, and India.',
      'Build and manage a robust pipeline of qualified enterprise leads through consultative selling and strategic outreach.',
      'Partner closely with solution architects to draft technical proposals, RFPs, scope documents, and commercial contracts.',
      'Establish long-term relationships with key decision-makers (CTOs, CIOs, VP of Engineering).',
      'Achieve and exceed quarterly and annual revenue targets while maintaining high account satisfaction.',
    ],
    requirements: [
      '3+ years of proven track record in B2B IT services sales, software consulting, or staff augmentation.',
      'Deep understanding of custom software engineering, cloud solutions, and agile squad models.',
      'Strong negotiation, presentation, and contract closure capabilities.',
      'Exceptional verbal and written business communication skills.',
    ],
    preferredSkills: [
      'Experience selling to US or international enterprise accounts.',
      'Familiarity with CRM tools (HubSpot, Salesforce) and LinkedIn Sales Navigator.',
    ],
    benefits: [
      'Attractive uncapped commission & performance bonuses',
      'Flexible hybrid work environment',
      'Comprehensive health & life insurance',
      'Global client exposure and fast-track leadership growth',
    ],
  },
  'digital-marketing-expert': {
    title: 'Digital Marketing Expert',
    slug: 'digital-marketing-expert',
    category: 'Marketing & Growth',
    employmentType: 'Full-time',
    location: 'Hyderabad, India (Hybrid)',
    experience: '3-5 Years',
    salary: 'Competitive / Based on experience',
    shortDescription:
      'Lead digital marketing campaigns, SEO strategy, inbound lead generation, and performance marketing to scale Travash’s global brand presence.',
    overview:
      'We are looking for a creative and analytical Digital Marketing Expert to own and execute our multi-channel growth strategies. In this role, you will lead SEO optimization, performance marketing (PPC/LinkedIn Ads), content strategy, social media growth, and conversion rate optimization (CRO) to drive qualified enterprise leads and establish Travash as a thought leader in software engineering.',
    responsibilities: [
      'Plan, execute, and optimize organic (SEO) and paid (Google Ads, LinkedIn Ads) marketing campaigns.',
      'Perform technical SEO audits, keyword research, and content optimization to drive organic enterprise traffic.',
      'Manage company social media presence (LinkedIn, Twitter, YouTube) and brand messaging.',
      'Collaborate with content creators and designers to publish high-converting landing pages, blogs, and whitepapers.',
      'Track, measure, and report campaign ROI and lead conversion metrics using Google Analytics 4, Search Console, and CRM tools.',
    ],
    requirements: [
      '3+ years of hands-on experience in digital marketing for IT services, B2B software, or tech agencies.',
      'Proven experience with Google Ads, LinkedIn Campaign Manager, Google Analytics 4, and SEO tools (AHrefs, SEMrush).',
      'Solid understanding of lead generation funnels, email marketing, and conversion rate optimization.',
      'Strong analytical skills with a data-driven approach to campaign budget allocation.',
    ],
    preferredSkills: [
      'Experience with marketing automation tools (HubSpot, Mailchimp).',
      'Basic HTML/CSS knowledge and WordPress/Sanity CMS familiarity.',
    ],
    benefits: [
      'Competitive compensation package',
      'Hybrid working model & flexible hours',
      'Comprehensive health insurance for self and family',
      'Professional development budget for certifications & events',
    ],
  },
  'php-developer': {
    title: 'PHP Developer',
    slug: 'php-developer',
    category: 'Backend Development',
    employmentType: 'Full-time',
    location: 'Hyderabad, India (Hybrid)',
    experience: '3-5 Years',
    salary: 'Competitive / Based on experience',
    shortDescription:
      'Architect, develop, and optimize scalable web platforms using PHP, Laravel, and MySQL for enterprise SaaS and eCommerce solutions.',
    overview:
      'We are looking for a skilled PHP Developer to join our backend engineering team. You will be responsible for developing robust web applications, building and consuming RESTful APIs, optimizing database queries, and collaborating with cross-functional teams to deliver secure, high-traffic software solutions.',
    responsibilities: [
      'Design, develop, and maintain clean, testable, and efficient PHP / Laravel codebases.',
      'Build resilient RESTful APIs for mobile and web frontend clients.',
      'Optimize complex MySQL queries, schemas, and indexing for low latency.',
      'Collaborate with frontend engineers and product managers in agile sprints.',
      'Conduct code reviews and ensure adherence to clean coding standards and security best practices.',
    ],
    requirements: [
      '3+ years of professional software development experience in PHP and Laravel.',
      'Strong proficiency with MySQL, query optimization, and relational database modeling.',
      'Working knowledge of Git, Linux environments, Docker, and CI/CD pipelines.',
      'Experience with REST APIs, authentication (OAuth/JWT), and third-party integrations.',
      'Strong analytical and problem-solving skills with attention to detail.',
    ],
    preferredSkills: [
      'Experience with Redis, Elasticsearch, or caching strategies.',
      'Knowledge of AWS or cloud infrastructure deployment.',
      'Familiarity with Vue.js or React is a plus.',
    ],
    benefits: [
      'Competitive compensation package',
      'Flexible hybrid working model',
      'Comprehensive health insurance',
      'Continuous learning & certification sponsorships',
      'Performance-based annual bonuses',
    ],
  },
  'frontend-developer': {
    title: 'Frontend Developer',
    slug: 'frontend-developer',
    category: 'Frontend Development',
    employmentType: 'Full-time',
    location: 'Hyderabad, India (Hybrid)',
    experience: '2-4 Years',
    salary: 'Competitive / Based on experience',
    shortDescription:
      'Build responsive, high-performance user interfaces using React, Next.js, TypeScript, and modern design systems with pixel-perfect fidelity.',
    overview:
      'We are seeking a passionate Frontend Developer to build fluid, high-performance web applications and digital experiences. You will translate UX wireframes and Figma designs into reusable, modular, and accessible components using React, Next.js, and TypeScript.',
    responsibilities: [
      'Develop modern, responsive web applications using React, Next.js, and TypeScript.',
      'Collaborate with UI/UX designers to translate Figma design tokens into clean code.',
      'Ensure web accessibility (WCAG), cross-browser compatibility, and SEO optimization.',
      'Optimize web performance, Core Web Vitals, and load times across mobile and desktop.',
      'Write unit and integration tests using Jest / React Testing Library.',
    ],
    requirements: [
      '2+ years of professional frontend engineering experience with React and modern JavaScript/TypeScript.',
      'Strong understanding of HTML5, modern CSS (Tailwind CSS), and responsive design.',
      'Experience with state management, Next.js App Router, and server-side rendering.',
      'Familiarity with Git version control and RESTful/GraphQL API consumption.',
    ],
    preferredSkills: [
      'Experience with animation libraries like Framer Motion.',
      'Knowledge of Headless CMS integration (Sanity, Contentful).',
      'Understanding of micro-frontends and modern bundling tooling.',
    ],
    benefits: [
      'Competitive compensation package',
      'Latest Apple MacBook Pro hardware setup',
      'Flexible working hours & hybrid schedule',
      'Health insurance for self and family',
      'Team retreats and hackathons',
    ],
  },
  'java-developer': {
    title: 'Java Developer',
    slug: 'java-developer',
    category: 'Software Engineering',
    employmentType: 'Full-time',
    location: 'Hyderabad, India (Hybrid)',
    experience: '4-7 Years',
    salary: 'Competitive / Based on experience',
    shortDescription:
      'Design and deploy microservices architectures, RESTful APIs, and enterprise cloud solutions using Spring Boot, Kafka, and PostgreSQL.',
    overview:
      'We are looking for an experienced Java Developer to architect and develop enterprise-grade backend systems. You will work on distributed microservices, event-driven architectures, and high-concurrency transactional systems powering fintech, healthcare, and enterprise clients.',
    responsibilities: [
      'Architect, develop, and deploy scalable Java backend services using Spring Boot.',
      'Design event-driven workflows utilizing Apache Kafka or RabbitMQ.',
      'Build and secure RESTful microservices and GraphQL endpoints.',
      'Work closely with DevOps to containerize and deploy services on Kubernetes and AWS/Azure.',
      'Troubleshoot performance bottlenecks, memory leaks, and optimize multithreaded systems.',
    ],
    requirements: [
      '4+ years of solid experience in core Java (Java 11/17+) and Spring Boot ecosystem.',
      'Proven track record in building distributed microservices and enterprise REST APIs.',
      'Hands-on experience with relational databases (PostgreSQL, MySQL) and ORM frameworks (Hibernate/JPA).',
      'Familiarity with Docker, Kubernetes, and automated CI/CD pipelines.',
    ],
    preferredSkills: [
      'Experience with Apache Kafka, Redis, and event sourcing patterns.',
      'Knowledge of cloud platforms (AWS / Azure) and infrastructure security.',
      'Understanding of PLM systems or enterprise ERP integration.',
    ],
    benefits: [
      'Industry-leading compensation & annual incentives',
      'Hybrid work model with flexible scheduling',
      'Comprehensive medical & life insurance coverage',
      'Generous paid time off and parental leave',
      'Direct mentorship from seasoned enterprise architects',
    ],
  },
}

export async function generateStaticParams() {
  try {
    const slugs = await client.fetch(allJobSlugsQuery)
    if (slugs && slugs.length > 0) {
      return slugs.map((s: { slug: string }) => ({ slug: s.slug }))
    }
  } catch {
    // fallback
  }
  return Object.keys(DEFAULT_JOB_DETAILS).map((slug) => ({ slug }))
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params
  let jobData: JobDetailData | null = null

  try {
    jobData = await client.fetch(jobBySlugQuery, { slug })
  } catch {
    // fallback
  }

  if (!jobData && DEFAULT_JOB_DETAILS[slug]) {
    jobData = DEFAULT_JOB_DETAILS[slug]
  }

  if (!jobData) {
    return { title: 'Position Not Found | Travash Careers' }
  }

  const canonicalUrl = `https://travash.com/career/${slug}`
  const metaTitle = `${jobData.title} — Careers at Travash`
  const metaDesc = jobData.shortDescription || `Apply for the ${jobData.title} opening at Travash Software Solutions.`

  return {
    title: metaTitle,
    description: metaDesc,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title: metaTitle,
      description: metaDesc,
      url: canonicalUrl,
      type: 'website',
      siteName: 'Travash Software Solutions',
    },
    twitter: {
      card: 'summary_large_image',
      title: metaTitle,
      description: metaDesc,
    },
    robots: {
      index: true,
      follow: true,
    },
  }
}

export default async function JobDetailPage({ params }: PageProps) {
  const { slug } = await params

  let job: JobDetailData | null = null
  let siteSettings: any = null

  try {
    const [fetchedJob, settings] = await Promise.all([
      client.fetch(jobBySlugQuery, { slug }),
      client.fetch(siteSettingsQuery),
    ])
    job = fetchedJob
    siteSettings = settings
  } catch {
    // continue to fallback
  }

  if (!job && DEFAULT_JOB_DETAILS[slug]) {
    job = DEFAULT_JOB_DETAILS[slug]
  }

  if (!job) {
    notFound()
  }

  const canonicalUrl = `https://travash.com/career/${job.slug}`
  
  // JSON-LD Structured Data for JobPosting
  const jsonLd = {
    '@context': 'https://schema.org/',
    '@type': 'JobPosting',
    title: job.title,
    description: job.overview || job.shortDescription,
    datePosted: new Date().toISOString().split('T')[0],
    validThrough: new Date(new Date().setMonth(new Date().getMonth() + 6)).toISOString().split('T')[0],
    employmentType: job.employmentType?.toUpperCase().replace('-', '_').replace(' ', '_') || 'FULL_TIME',
    hiringOrganization: {
      '@type': 'Organization',
      name: 'Travash Software Solutions',
      sameAs: 'https://travash.com',
      logo: 'https://travash.com/travash-latest-logo.svg'
    },
    jobLocation: {
      '@type': 'Place',
      address: {
        '@type': 'PostalAddress',
        addressLocality: job.location?.split(',')[0]?.trim() || 'Hyderabad',
        addressRegion: job.location?.split(',')[1]?.split('(')[0]?.trim() || 'Telangana',
        addressCountry: 'IN'
      }
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
      <main className="py-12 sm:py-16 lg:py-20 bg-white">
        <div className="max-w-[80rem] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-12 gap-10 lg:gap-12 items-start max-w-6xl mx-auto">
            {/* Left Column: Job Details */}
            <div className="lg:col-span-7">
              <JobDetailContent job={job} />
            </div>

            {/* Right Column: Sticky Application Form */}
            <div className="lg:col-span-5 lg:sticky lg:top-28">
              <JobApplicationForm jobTitle={job.title} jobSlug={job.slug} />
            </div>
          </div>
        </div>
      </main>
      <Footer settings={siteSettings} />
    </>
  )
}
