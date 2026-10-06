import { siteSettings } from './siteSettings'
import { mediaItem } from './mediaItem'
import { bulkMediaUpload } from './bulkMediaUpload'
import { testimonial } from './testimonial'
import { heroSection } from './heroSection'
import { trustedBySection } from './trustedBySection'
import { capabilitiesSection } from './capabilitiesSection'
import { caseStudySection } from './caseStudySection'
import { statsSection } from './statsSection'
import { introVideoSection } from './introVideoSection'
import { testimonialSection } from './testimonialSection'
import { aboutSection } from './aboutSection'
import { industriesSection } from './industriesSection'
import { post, blogSection } from './post'
import { contactSection } from './contactSection'
import { homePage } from './homePage'
import { caseStudy } from './caseStudy'
import { service } from './service'
import { technology } from './technology'
import { industry } from './industry'

import { aboutPage } from './aboutPage'
import { leadershipPage } from './leadershipPage'
import { careerPage } from './careerPage'
import { job } from './job'
import { technologyCategory } from './technologyCategory'

// Blog system schemas
import { blogPost } from './blogPost'
import { category } from './category'
import { tag } from './tag'
import { author } from './author'

// Portfolio system schemas
import { portfolioProject } from './portfolioProject'
import { portfolioService } from './portfolioService'
import { caseStudiesPage } from './caseStudiesPage'

// Form Submissions schemas
import { enquirySubmission } from './enquirySubmission'
import { jobApplicationSubmission } from './jobApplicationSubmission'

export const schemaTypes = [
  // Singletons / documents
  siteSettings,
  testimonial,
  mediaItem,
  bulkMediaUpload,
  homePage,
  aboutPage,
  leadershipPage,
  careerPage,
  caseStudiesPage,
  caseStudy,
  portfolioProject,
  portfolioService,
  service,
  technology,
  technologyCategory,
  industry,
  blogPost,
  category,
  tag,
  author,
  post,
  job,
  enquirySubmission,
  jobApplicationSubmission,
  // Section objects
  heroSection,
  trustedBySection,
  capabilitiesSection,
  caseStudySection,
  statsSection,
  introVideoSection,
  testimonialSection,
  aboutSection,
  industriesSection,
  blogSection,
  contactSection,
]
