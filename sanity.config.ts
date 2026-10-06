import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { visionTool } from '@sanity/vision'
import { schemaTypes } from './sanity/schemaTypes'
import { media } from 'sanity-plugin-media'

import React from 'react'

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 's2k81yej'
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production'

function TravashStudioIcon() {
  return React.createElement('img', {
    src: 'https://travash.com/wp-content/uploads/2023/12/New-latest-logo.svg',
    alt: 'Travash',
    style: { height: '22px', width: 'auto', objectFit: 'contain' },
  })
}

function TravashStudioLogo() {
  return React.createElement(
    'div',
    {
      style: {
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        padding: '0 8px',
      },
    },
    React.createElement('img', {
      src: 'https://travash.com/wp-content/uploads/2023/12/New-latest-logo.svg',
      alt: 'Travash',
      style: { height: '26px', width: 'auto', objectFit: 'contain' },
    }),
    React.createElement(
      'span',
      {
        style: {
          fontWeight: 700,
          fontSize: '12px',
          color: '#0B4785',
          textTransform: 'uppercase',
          letterSpacing: '0.05em',
        },
      },
      'Studio'
    )
  )
}

const customStructure = (S: any) =>
  S.list()
    .title('Content')
    .items([
      // Expandable Home Page with Submenu Sections
      S.listItem()
        .title('Home Page')
        .id('homePage')
        .child(
          S.list()
            .title('Home Page Sections')
            .items([
              S.listItem()
                .title('Hero Section')
                .id('heroSection')
                .child(
                  S.document()
                    .title('Hero Section')
                    .schemaType('heroSection')
                    .documentId('heroSection')
                ),
              S.listItem()
                .title('Trusted By (Client Logos)')
                .id('trustedBySection')
                .child(
                  S.document()
                    .title('Trusted By (Client Logos)')
                    .schemaType('trustedBySection')
                    .documentId('trustedBySection')
                ),
              S.listItem()
                .title('Capabilities')
                .id('capabilitiesSection')
                .child(
                  S.document()
                    .title('Capabilities')
                    .schemaType('capabilitiesSection')
                    .documentId('capabilitiesSection')
                ),
              S.listItem()
                .title('Case Studies')
                .id('caseStudySection')
                .child(
                  S.document()
                    .title('Case Studies')
                    .schemaType('caseStudySection')
                    .documentId('caseStudySection')
                ),
              S.listItem()
                .title('Stats')
                .id('statsSection')
                .child(
                  S.document()
                    .title('Stats')
                    .schemaType('statsSection')
                    .documentId('statsSection')
                ),
              S.listItem()
                .title('Intro Video')
                .id('introVideoSection')
                .child(
                  S.document()
                    .title('Intro Video')
                    .schemaType('introVideoSection')
                    .documentId('introVideoSection')
                ),
              S.listItem()
                .title('Testimonials')
                .id('testimonialSection')
                .child(
                  S.document()
                    .title('Testimonials')
                    .schemaType('testimonialSection')
                    .documentId('testimonialSection')
                ),
              S.listItem()
                .title('About Us')
                .id('aboutSection')
                .child(
                  S.document()
                    .title('About Us')
                    .schemaType('aboutSection')
                    .documentId('aboutSection')
                ),
              S.listItem()
                .title('Industries We Serve')
                .id('industriesSection')
                .child(
                  S.document()
                    .title('Industries We Serve')
                    .schemaType('industriesSection')
                    .documentId('industriesSection')
                ),
              S.listItem()
                .title('Contact Us')
                .id('contactSection')
                .child(
                  S.document()
                    .title('Contact Us')
                    .schemaType('contactSection')
                    .documentId('contactSection')
                ),
              S.divider(),
              S.listItem()
                .title('All Home Page Fields (Full Document)')
                .id('homePageFull')
                .child(
                  S.document()
                    .title('Home Page (All Fields)')
                    .schemaType('homePage')
                    .documentId('homePage')
                ),
            ])
        ),

      // About Us Section (About Us & Leadership)
      S.listItem()
        .title('About Us & Leadership')
        .id('aboutSectionGroup')
        .child(
          S.list()
            .title('About Us & Leadership')
            .items([
              S.listItem()
                .title('About Us Page')
                .id('aboutPage')
                .child(
                  S.document()
                    .title('About Us Page')
                    .schemaType('aboutPage')
                    .documentId('aboutPage')
                ),
              S.listItem()
                .title('Leadership Page')
                .id('leadershipPage')
                .child(
                  S.document()
                    .title('Leadership Page')
                    .schemaType('leadershipPage')
                    .documentId('leadershipPage')
                ),
            ])
        ),

      // Careers
      S.listItem()
        .title('Careers')
        .id('careersSection')
        .child(
          S.list()
            .title('Careers Management')
            .items([
              S.listItem()
                .title('Career Page (Hero, Perks & SEO)')
                .id('careerPage')
                .child(
                  S.document()
                    .title('Career Page Configuration')
                    .schemaType('careerPage')
                    .documentId('careerPage')
                ),
              S.documentTypeListItem('job')
                .title('All Job Postings (Open Positions)'),
              S.divider(),
              S.documentTypeListItem('jobApplicationSubmission')
                .title('Received Candidate Applications'),
            ])
        ),

      // Singleton: Site Settings
      S.listItem()
        .title('Site Settings (Navbar & Footer)')
        .id('siteSettings')
        .child(
          S.document()
            .title('Site Settings')
            .schemaType('siteSettings')
            .documentId('siteSettings')
        ),

      // Media Library — powered by sanity-plugin-media (true bulk upload)
      // The "Media" tool appears in the top nav of Sanity Studio automatically.
      // Below we keep a quick-access link in the sidebar as well.
      S.listItem()
        .title('Media Library')
        .id('mediaLibrary')
        .child(
          S.documentTypeList('mediaItem')
            .title('Media Assets (Custom Metadata)')
        ),

      // Services
      S.documentTypeListItem('service').title('Services'),

      // Testimonial Library — reusable across all service pages
      S.documentTypeListItem('testimonial').title('Testimonials Library'),

      // Case Studies Listing Page (Hero & Page Content)
      S.listItem()
        .title('Case Studies Listing Page')
        .id('caseStudiesPage')
        .child(
          S.document()
            .title('Case Studies Listing Page')
            .schemaType('caseStudiesPage')
            .documentId('caseStudiesPage')
        ),

      // Case Studies (Detail Pages)
      S.documentTypeListItem('caseStudy').title('Case Studies (Detail Pages)'),

      // Technologies
      S.documentTypeListItem('technology').title('Technologies'),

      // Industries
      S.documentTypeListItem('industry').title('Industries'),

      S.divider(),

      // 📬 Form Submissions & Candidate Leads Section
      S.documentTypeListItem('enquirySubmission').title('📩 Website Enquiries (Contact Forms)'),
      S.documentTypeListItem('jobApplicationSubmission').title('💼 Job Applications (Careers)'),

      S.divider(),

      // Blog System
      S.documentTypeListItem('blogPost').title('Blog Posts (WordPress Migrated)'),
      S.documentTypeListItem('category').title('Blog Categories'),
      S.documentTypeListItem('tag').title('Blog Tags'),
      S.documentTypeListItem('author').title('Blog Authors'),
      S.documentTypeListItem('post').title('Legacy Posts'),
    ])

export default defineConfig({
  basePath: '/studio',
  projectId,
  dataset,
  title: 'Travash Software Solutions',
  icon: TravashStudioIcon,
  studio: {
    components: {
      logo: TravashStudioLogo,
    },
  },
  schema: {
    types: schemaTypes,
  },
  plugins: [
    structureTool({
      structure: customStructure,
    }),
    visionTool(),
    // Provides a full Media browser tab in Studio with true bulk drag-and-drop upload
    // Note: media() automatically registers itself as an asset source — no extra form config needed
    media(),
  ],
})

