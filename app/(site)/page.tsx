import { Metadata } from 'next'
import { client } from '@/lib/sanity'
import { homePageQuery, recentPostsQuery } from '@/lib/queries'

import Navbar from '@/components/sections/Navbar'
import Hero from '@/components/sections/Hero'
import TrustedBy from '@/components/sections/TrustedBy'
import Capabilities from '@/components/sections/Capabilities'
import CaseStudies from '@/components/sections/CaseStudies'
import Stats from '@/components/sections/Stats'
import IntroVideo from '@/components/sections/IntroVideo'
import Testimonials from '@/components/sections/Testimonials'
import About from '@/components/sections/About'
import Industries from '@/components/sections/Industries'
import BlogSection from '@/components/sections/BlogSection'
import LinkedInUpdates from '@/components/sections/LinkedInUpdates'
import Contact from '@/components/sections/Contact'
import Footer from '@/components/sections/Footer'

// Ensure live content updates immediately on Vercel upon publishing in Sanity CMS
export const dynamic = 'force-dynamic'
export const revalidate = 0

export async function generateMetadata(): Promise<Metadata> {
  try {
    const pageData = await client.fetch(homePageQuery)
    const seo = pageData?.homePage?.seo

    const title = seo?.metaTitle || 'Travash Software Solutions — AI, Enterprise & Cloud Software Engineering'
    const description =
      seo?.metaDescription ||
      'Travash Software Solutions delivers high-performance enterprise software, autonomous AI agent platforms, cloud architectures, and dedicated agile squads.'
    const ogImageUrl = seo?.ogImage?.asset?.url

    return {
      title,
      description,
      alternates: {
        canonical: seo?.canonicalUrl || 'https://travash.com',
      },
      robots: seo?.noIndex
        ? { index: false, follow: false }
        : { index: true, follow: true },
      openGraph: {
        title,
        description,
        url: seo?.canonicalUrl || 'https://travash.com',
        siteName: 'Travash Software Solutions',
        images: ogImageUrl ? [{ url: ogImageUrl }] : [],
        type: 'website',
      },
      twitter: {
        card: 'summary_large_image',
        title,
        description,
        images: ogImageUrl ? [ogImageUrl] : [],
      },
    }
  } catch {
    return {
      title: 'Travash Software Solutions — AI, Enterprise & Cloud Software Engineering',
      description:
        'Travash Software Solutions delivers high-performance enterprise software, autonomous AI agent platforms, cloud architectures, and dedicated agile squads.',
    }
  }
}

async function getPageData() {
  try {
    const [pageData, recentPosts] = await Promise.all([
      client.fetch(homePageQuery),
      client.fetch(recentPostsQuery),
    ])

    const selectedPosts = pageData?.homePage?.blog?.selectedPosts?.filter(Boolean) || []
    const posts = selectedPosts.length > 0 ? selectedPosts : (recentPosts || [])

    return { pageData, posts }
  } catch {
    // Return null data if Sanity is not configured — fallback to defaults in components
    return { pageData: null, posts: [] }
  }
}

export default async function HomePage() {
  const { pageData, posts } = await getPageData()

  const homePage = pageData?.homePage
  const siteSettings = pageData?.siteSettings

  return (
    <>
      <Navbar settings={siteSettings} />
      <main>
        <Hero data={homePage?.hero} />
        <TrustedBy
          label={
            homePage?.trustedBy?.heading ||
            homePage?.trustedBy?.label ||
            homePage?.hero?.trustedByLabel
          }
          logos={
            (homePage?.trustedBy?.logos && homePage.trustedBy.logos.length > 0)
              ? homePage.trustedBy.logos
              : homePage?.hero?.trustedByLogos
          }
        />
        <Capabilities data={homePage?.capabilities} />
        <CaseStudies data={homePage?.caseStudies} />
        <Stats data={homePage?.stats} />
        <IntroVideo data={homePage?.introVideo} />
        <Testimonials data={homePage?.testimonials} />
        <About data={homePage?.about} />
        <Industries data={homePage?.industries} />
        <BlogSection sectionData={homePage?.blog} posts={posts} />
        <LinkedInUpdates />
        <Contact data={homePage?.contact} />
      </main>
      <Footer settings={siteSettings} />
    </>
  )
}
