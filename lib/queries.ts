import { groq } from 'next-sanity'

// Reusable image fragment with expanded asset reference
const imageFragment = `{
  ...,
  asset->{ _id, url, metadata { dimensions, lqip } }
}`

// Reusable media library fragment
export const mediaFragment = `{
  _id,
  _type,
  title,
  mediaType,
  alt,
  caption,
  category,
  tags,
  image ${imageFragment},
  file {
    ...,
    asset->{ _id, url, size, extension, mimeType, originalFilename }
  },
  posterImage ${imageFragment},
  externalUrl
}`

// Full home page query — fetches everything in one request
export const homePageQuery = groq`
  {
    "homePage": {
      "hero": coalesce(
        *[_id == "heroSection"][0],
        *[_type == "heroSection"][0],
        *[_type == "homePage"][0].hero
      ) {
        eyebrowText,
        headingLine1,
        headingHighlight,
        headingLine2,
        subtext,
        primaryCta,
        secondaryCta,
        heroImage ${imageFragment},
        trustedByLabel,
        trustedByLogos[] {
          alt,
          name,
          websiteUrl,
          href,
          asset->{ _id, url, metadata { dimensions, lqip } },
          image ${imageFragment}
        }
      },
      "trustedBy": coalesce(
        *[_id == "trustedBySection"][0],
        *[_type == "trustedBySection"][0],
        *[_type == "homePage"][0].trustedBy
      ) {
        heading,
        label,
        logos[] {
          alt,
          name,
          websiteUrl,
          href,
          asset->{ _id, url, metadata { dimensions, lqip } },
          image ${imageFragment}
        }
      },
      "capabilities": coalesce(
        *[_id == "capabilitiesSection"][0],
        *[_type == "capabilitiesSection"][0],
        *[_type == "homePage"][0].capabilities
      ) {
        heading,
        cards[] {
          iconName,
          icon ${imageFragment},
          title,
          description,
          ctaLabel,
          ctaHref
        }
      },
      "caseStudies": coalesce(
        *[_id == "caseStudySection"][0],
        *[_type == "caseStudySection"][0],
        *[_type == "homePage"][0].caseStudies
      ) {
        heading,
        caseStudies[] {
          projectName,
          clientType,
          image ${imageFragment},
          outcomes[] { value, label },
          tags,
          clientName,
          clientLogo ${imageFragment},
          ctaLabel,
          ctaHref
        }
      },
      "stats": coalesce(
        *[_id == "statsSection"][0],
        *[_type == "statsSection"][0],
        *[_type == "homePage"][0].stats
      ) {
        stats[] { value, label }
      },
      "introVideo": coalesce(
        *[_id == "introVideoSection"][0],
        *[_type == "introVideoSection"][0],
        *[_type == "homePage"][0].introVideo
      ) {
        eyebrow,
        heading,
        videoThumbnail ${imageFragment},
        videoUrl
      },
      "testimonials": coalesce(
        *[_id == "testimonialSection"][0],
        *[_type == "testimonialSection"][0],
        *[_type == "homePage"][0].testimonials
      ) {
        heading,
        "testimonials": select(
          defined(selectedTestimonials) && count(selectedTestimonials) > 0 => selectedTestimonials[]-> {
            quote,
            "authorName": coalesce(clientName, authorName, name),
            "authorTitle": coalesce(
              select(defined(designation) && defined(company) => designation + " · " + company, designation),
              authorTitle,
              role
            ),
            "authorCompany": coalesce(company, authorCompany),
            "authorPhoto": coalesce(photo ${imageFragment}, authorPhoto ${imageFragment}, clientLogo ${imageFragment})
          },
          testimonials[] {
            "quote": coalesce(quote, @->quote),
            "authorName": coalesce(authorName, @->clientName, @->authorName, @->name),
            "authorTitle": coalesce(
              authorTitle,
              select(defined(@->designation) && defined(@->company) => @->designation + " · " + @->company, @->designation),
              @->authorTitle,
              @->role
            ),
            "authorCompany": coalesce(authorCompany, @->company, @->authorCompany),
            "authorPhoto": coalesce(authorPhoto ${imageFragment}, @->photo ${imageFragment}, @->clientLogo ${imageFragment})
          }
        )
      },
      "about": coalesce(
        *[_id == "aboutSection"][0],
        *[_type == "aboutSection"][0],
        *[_type == "homePage"][0].about
      ) {
        heading,
        paragraphs,
        image ${imageFragment},
        ctaLabel,
        ctaHref
      },
      "industries": coalesce(
        *[_id == "industriesSection"][0],
        *[_type == "industriesSection"][0],
        *[_type == "homePage"][0].industries
      ) {
        heading,
        industries[] {
          name,
          image ${imageFragment},
          href
        }
      },
      "blog": coalesce(
        *[_id == "blogSection"][0],
        *[_type == "blogSection"][0],
        *[_type == "homePage"][0].blog
      ) {
        heading,
        ctaLabel,
        ctaHref,
        "selectedPosts": selectedPosts[]-> {
          _id,
          _type,
          title,
          "slug": slug.current,
          "category": select(
            defined(categories[0]._ref) => categories[0]->title,
            defined(categories[0].title) => categories[0].title,
            defined(category) => category,
            "Insights"
          ),
          publishedAt,
          excerpt,
          featured,
          "coverImage": coalesce(featuredImage ${imageFragment}, coverImage ${imageFragment}, mainImage ${imageFragment})
        }
      },
      "contact": coalesce(
        *[_id == "contactSection"][0],
        *[_type == "contactSection"][0],
        *[_type == "homePage"][0].contact
      ) {
        heading,
        subheading,
        sideImage ${imageFragment},
        submitLabel,
        successMessage,
        notifyEmail
      },
      "seo": coalesce(
        *[_id == "homePage"][0].seo,
        *[_type == "homePage"][0].seo
      ) {
        metaTitle,
        metaDescription,
        ogImage ${imageFragment},
        canonicalUrl,
        noIndex
      }
    },
    "siteSettings": *[_type == "siteSettings"][0] {
      logo ${imageFragment},
      mediaLogo-> ${mediaFragment},
      navLinks[] { label, href },
      ctaLabel,
      ctaHref,
      footerLogo ${imageFragment},
      mediaFooterLogo-> ${mediaFragment},
      socialLinks[] { platform, url },
      menuLinks[] { label, href },
      serviceLinks[] { label, href },
      offices[] { label, address },
      contactEmail,
      contactPhone,
      copyrightText
    }
  }
`

// Recent blog posts (featured first, then 3 most recent)
export const recentPostsQuery = groq`
  *[_type in ["blogPost", "post"]] | order(coalesce(featured, false) desc, publishedAt desc, _createdAt desc) [0...3] {
    _id,
    _type,
    title,
    "slug": slug.current,
    "category": select(
      defined(categories[0]._ref) => categories[0]->title,
      defined(categories[0].title) => categories[0].title,
      defined(category) => category,
      "Insights"
    ),
    publishedAt,
    excerpt,
    featured,
    "coverImage": coalesce(featuredImage ${imageFragment}, coverImage ${imageFragment}, mainImage ${imageFragment})
  }
`

// Fetch single case study by slug
export const caseStudyBySlugQuery = groq`
  *[_type == "caseStudy" && slug.current == $slug][0] {
    _id,
    title,
    slug,
    eyebrow,
    category,
    industry,
    client,
    location,
    shortDescription,
    heroImage ${imageFragment},
    projectMeta[] { label, value },
    metrics[] { value, label, description },
    executiveSummary {
      title,
      subtitle,
      paragraphs
    },
    challenge {
      title,
      subtitle,
      headline,
      content,
      description,
      pointsLabel,
      points,
      takeaway
    },
    featureImage ${imageFragment},
    complexity {
      title,
      intro,
      items[] { title, description, icon }
    },
    approach {
      title,
      subtitle,
      intro,
      description,
      steps[] { stepNumber, title, description }
    },
    solution {
      title,
      subtitle,
      intro,
      description,
      items[] { title, description }
    },
    solutionArchitecture {
      title,
      intro,
      image ${imageFragment},
      caption
    },
    techStackTitle,
    techStackSubtitle,
    technologyStack[] {
      category,
      displayType,
      items[] {
        _type,
        "name": coalesce(name, @),
        icon,
        customImage ${imageFragment},
        "text": coalesce(text, @),
        badge
      },
      technologies,
      description
    },
    impact {
      title,
      subtitle,
      content,
      outcomes
    },
    beforeAfter {
      title,
      subtitle,
      beforeTitle,
      afterTitle,
      before,
      after
    },
    "testimonial": select(
      defined(testimonialRef._ref) => testimonialRef-> {
        "heading": "Client Perspective",
        "intro": "Insights, expectations, and feedback from the client's point of view.",
        "quote": quote,
        "author": coalesce(clientName, author, name),
        "name": coalesce(clientName, author, name),
        "designation": coalesce(designation, role),
        "role": coalesce(designation, role),
        "company": company,
        "image": coalesce(photo ${imageFragment}, clientLogo ${imageFragment}, avatarImage ${imageFragment})
      },
      defined(testimonial.quote) || defined(testimonial.heading) || defined(testimonial.author) => {
        "heading": coalesce(testimonial.heading, "Client Perspective"),
        "intro": coalesce(testimonial.intro, "Insights, expectations, and feedback from the client's point of view."),
        "quote": testimonial.quote,
        "author": coalesce(testimonial.author, testimonial.name, testimonial.clientName),
        "name": coalesce(testimonial.name, testimonial.author, testimonial.clientName),
        "designation": coalesce(testimonial.designation, testimonial.role),
        "role": coalesce(testimonial.role, testimonial.designation),
        "company": testimonial.company,
        "image": coalesce(testimonial.image ${imageFragment}, testimonial.photo ${imageFragment}, testimonial.clientLogo ${imageFragment})
      },
      null
    ),
    whyItMatters {
      title,
      subtitle,
      description,
      items
    },
    nextStep {
      heading,
      subtitle,
      content,
      primaryCTA { label, href },
      secondaryCTA { label, href }
    },
    contact {
      heading,
      description
    },
    relatedServices[]-> {
      _id,
      title,
      "slug": slug.current,
      menuTitle,
      shortDescription
    },
    seo {
      metaTitle,
      metaDescription,
      ogImage ${imageFragment}
    }
  }
`

// Case Studies Listing Page (Singleton) Query
export const caseStudiesPageQuery = groq`
  *[_type == "caseStudiesPage"][0] {
    _id,
    hero {
      eyebrow,
      heading,
      headingHighlight,
      description,
      backgroundImage ${imageFragment},
      badges
    },
    featuredSection {
      badge,
      title,
      subtitle
    },
    cta {
      heading,
      description,
      buttonText,
      buttonHref
    },
    seo {
      metaTitle,
      metaDescription,
      ogImage ${imageFragment}
    }
  }
`

// Portfolio Page Query — fetches all portfolio case studies, industries, technologies, and shared sections
export const portfolioPageQuery = groq`
  {
    "listingPage": *[_type == "caseStudiesPage"][0] {
      _id,
      hero {
        eyebrow,
        heading,
        headingHighlight,
        description,
        backgroundImage ${imageFragment},
        badges
      },
      featuredSection {
        badge,
        title,
        subtitle
      },
      cta {
        heading,
        description,
        buttonText,
        buttonHref
      },
      seo {
        metaTitle,
        metaDescription,
        ogImage ${imageFragment}
      }
    },
    "projects": *[_type == "caseStudy" && coalesce(portfolioVisible, true) == true] | order(coalesce(portfolioOrder, 100) asc, _createdAt desc) {
      _id,
      title,
      "slug": slug.current,
      portfolioTitle,
      cardDescription,
      shortDescription,
      category,
      industry,
      projectType,
      "industries": coalesce(
        industries[]->name,
        industries
      ),
      "technologies": coalesce(
        technologies[]->name,
        technologies
      ),
      featured,
      portfolioOrder,
      portfolioVisible,
      caseStudyUrl,
      cardImage ${imageFragment},
      cardImageAlt,
      featureImage ${imageFragment},
      heroImage ${imageFragment},
      metrics[] { value, label }
    },
    "industries": *[_type == "industry"] | order(name asc) {
      _id,
      name,
      "slug": slug.current,
      description
    },
    "technologies": *[_type == "technology"] | order(name asc) {
      _id,
      name,
      "slug": slug.current,
      category,
      icon ${imageFragment}
    },
    "pageData": {
      "stats": coalesce(
        *[_id == "statsSection"][0],
        *[_type == "statsSection"][0],
        *[_type == "homePage"][0].stats
      ) {
        stats[] { value, label }
      },
      "testimonials": coalesce(
        *[_id == "testimonialSection"][0],
        *[_type == "testimonialSection"][0],
        *[_type == "homePage"][0].testimonials
      ) {
        heading,
        testimonials[] {
          quote,
          authorName,
          authorTitle,
          authorCompany,
          authorPhoto ${imageFragment}
        }
      },
      "contact": coalesce(
        *[_id == "contactSection"][0],
        *[_type == "contactSection"][0],
        *[_type == "homePage"][0].contact
      ) {
        heading,
        subheading,
        sideImage ${imageFragment},
        submitLabel,
        successMessage,
        notifyEmail
      }
    },
    "siteSettings": *[_type == "siteSettings"][0] {
      logo ${imageFragment},
      navLinks[] { label, href },
      ctaLabel,
      ctaHref,
      footerLogo ${imageFragment},
      socialLinks[] { platform, url },
      menuLinks[] { label, href },
      serviceLinks[] { label, href },
      offices[] { label, address },
      contactEmail,
      contactPhone,
      copyrightText
    }
  }
`

// Query for generating static params for case studies
export const allCaseStudySlugsQuery = groq`
  *[_type == "caseStudy" && defined(slug.current)] {
    "slug": slug.current
  }
`

// Query for a single service by slug with resolved references
export const serviceBySlugQuery = groq`
  *[_type == "service" && (slug.current == $slug || (defined($slugAliases) && slug.current in $slugAliases))] | order(_updatedAt desc)[0] {
    _id,
    _type,
    title,
    "slug": slug.current,
    menuTitle,
    shortDescription,
    icon ${imageFragment},
    hero {
      eyebrow,
      title,
      description,
      primaryCTA { label, href },
      secondaryCTA { label, href },
      heroImage ${imageFragment},
      heroBgImage ${imageFragment},
      heroImageAlt,
      highlights
    },
    problemSection {
      label,
      title,
      headline,
      description,
      image ${imageFragment},
      sideImage ${imageFragment},
      painPoints[] {
        title,
        description
      }
    },
    solutionOverview {
      heading,
      description,
      image ${imageFragment},
      solutionImage ${imageFragment},
      benefits[] {
        icon,
        title,
        description
      },
      cta { label, href }
    },
    capabilitiesImage ${imageFragment},
    capabilitiesSection {
      eyebrow,
      heading,
      image ${imageFragment}
    },
    capabilities[] {
      title,
      shortDescription,
      problem,
      solution,
      businessImpact,
      icon,
      image ${imageFragment},
      customImage ${imageFragment},
      technologies,
      optionalCTA { label, href }
    },
    process {
      heading,
      description,
      processImage ${imageFragment},
      steps[] {
        number,
        title,
        description,
        icon,
        image ${imageFragment}
      }
    },
    relatedCaseStudies[]-> {
      _id,
      title,
      "slug": slug.current,
      category,
      client,
      shortDescription,
      heroImage ${imageFragment},
      featureImage ${imageFragment},
      metrics[] { value, label, description }
    },
    engagementModels[] {
      title,
      description,
      icon,
      badge,
      cta { label, href }
    },
    technologyStack[] {
      category,
      technologies,
      description
    },
    trustSection {
      heading,
      description,
      trustImage ${imageFragment},
      sideImage ${imageFragment},
      backgroundImage ${imageFragment},
      stats[] { value, label, description },
      trustPoints
    },
    testimonial {
      quote,
      author,
      role,
      company,
      badge,
      image ${imageFragment}
    },
    // Resolved reference array — preferred over legacy testimonial object
    testimonials[]-> {
      _id,
      clientName,
      designation,
      company,
      quote,
      categories,
      badge,
      photo ${imageFragment},
      clientLogo ${imageFragment}
    },
    faqs[] {
      question,
      answer
    },
    finalCTA {
      heading,
      description,
      backgroundImage ${imageFragment},
      advisorImage ${imageFragment},
      primaryCTA { label, href },
      secondaryCTA { label, href }
    },
    seo {
      metaTitle,
      metaDescription,
      ogImage ${imageFragment},
      canonicalUrl,
      noIndex
    }
  }
`

// Query for generating static params for all services
export const allServiceSlugsQuery = groq`
  *[_type == "service" && defined(slug.current)] {
    "slug": slug.current
  }
`

// Query all industries for portfolio filter
export const allIndustriesQuery = groq`
  *[_type == "industry"] | order(name asc) {
    _id,
    name,
    "slug": slug.current,
    description
  }
`

// Query all technologies
export const allTechnologiesQuery = groq`
  *[_type == "technology"] | order(order asc, name asc) {
    _id,
    name,
    "slug": slug.current,
    category,
    "categoryTitle": categoryRef->title,
    icon ${imageFragment},
    description,
    website,
    featured,
    order
  }
`

// Query all technology categories
export const technologyCategoriesQuery = groq`
  *[_type == "technologyCategory"] | order(order asc, title asc) {
    _id,
    title,
    "slug": slug.current,
    description,
    order
  }
`

// Leadership Page query
export const leadershipPageQuery = groq`
  {
    "leadershipPage": *[_type == "leadershipPage"][0] {
      hero {
        eyebrow,
        name,
        role,
        description,
        linkedinUrl,
        contactEmail,
        image ${imageFragment}
      },
      biography,
      careerHighlights[] {
        value,
        label,
        iconName
      },
      seo {
        metaTitle,
        metaDescription,
        ogImage ${imageFragment}
      }
    }
  }
`

// About Page query
export const aboutPageQuery = groq`
  {
    "aboutPage": *[_type == "aboutPage"][0] {
      hero {
        eyebrow,
        heading,
        description,
        credibilityBadges,
        primaryCTA { label, href },
        secondaryCTA { label, href },
        heroImage ${imageFragment}
      },
      leadershipHeader {
        eyebrow,
        heading,
        subheading
      },
      leadership[] {
        name,
        role,
        experienceYears,
        bio,
        image ${imageFragment},
        linkedinUrl,
        highlights
      },
      timelineHeader {
        eyebrow,
        heading,
        subheading
      },
      timeline[] {
        year,
        title,
        phase,
        metrics,
        description,
        highlights
      },
      story {
        eyebrow,
        heading,
        image ${imageFragment},
        imageBadge,
        content,
        stats[] {
          value,
          label
        }
      },
      missionVision {
        eyebrow,
        heading,
        missionTitle,
        missionDescription,
        missionBadge,
        visionTitle,
        visionDescription,
        visionBadge
      },
      valuesHeader {
        eyebrow,
        heading,
        subheading
      },
      values[] {
        title,
        description,
        iconName
      },
      teams {
        eyebrow,
        heading,
        description
      },
      culture {
        heading,
        cardHeading,
        description,
        cardFooter
      },
      culturePillars[] {
        title,
        desc,
        iconName
      },
      teamShowcase {
        badge,
        heading,
        description,
        image ${imageFragment},
        highlights[] {
          label,
          value,
          iconName
        },
        ctaText,
        ctaHref
      },
      seo {
        metaTitle,
        metaDescription,
        ogImage ${imageFragment}
      }
    },
    "siteSettings": *[_type == "siteSettings"][0] {
      ...,
      logo ${imageFragment},
      footerLogo ${imageFragment}
    }
  }
`

// Career Page Queries
export const careerPageQuery = groq`
  {
    "careerPage": coalesce(
      *[_id == "careerPage"][0],
      *[_type == "careerPage"][0]
    ) {
      hero {
        eyebrow,
        heading,
        description,
        highlights[] {
          label,
          icon
        },
        primaryCTA { label, href },
        secondaryCTA { label, href }
      },
      benefitsSection {
        eyebrow,
        heading,
        description,
        benefits[] {
          title,
          desc,
          icon
        }
      },
      jobsSection {
        eyebrow,
        heading,
        description
      },
      seo {
        metaTitle,
        metaDescription,
        ogImage ${imageFragment}
      }
    },
    "jobs": *[_type == "job" && active != false] | order(order asc, publishedAt desc) {
      _id,
      title,
      "slug": slug.current,
      category,
      employmentType,
      location,
      experience,
      salary,
      shortDescription,
      active,
      publishedAt
    },
    "siteSettings": *[_type == "siteSettings"][0] {
      ...,
      logo ${imageFragment},
      footerLogo ${imageFragment}
    }
  }
`

// Jobs Queries
export const jobsQuery = groq`
  *[_type == "job" && active != false] | order(order asc, publishedAt desc) {
    _id,
    title,
    "slug": slug.current,
    category,
    employmentType,
    location,
    experience,
    salary,
    shortDescription,
    active,
    publishedAt
  }
`

export const jobBySlugQuery = groq`
  *[_type == "job" && slug.current == $slug][0] {
    _id,
    title,
    "slug": slug.current,
    category,
    employmentType,
    location,
    experience,
    salary,
    shortDescription,
    overview,
    responsibilities,
    requirements,
    preferredSkills,
    benefits,
    active,
    publishedAt,
    seo {
      metaTitle,
      metaDescription
    }
  }
`

export const allJobSlugsQuery = groq`
  *[_type == "job" && defined(slug.current)] {
    "slug": slug.current
  }
`

// Blog Queries
export const blogsQuery = groq`
  *[_type == "post"] | order(publishedAt desc) {
    _id,
    title,
    "slug": slug.current,
    excerpt,
    coverImage ${imageFragment},
    category,
    publishedAt,
    featured,
    tags,
    author {
      name,
      role,
      avatar ${imageFragment}
    }
  }
`

export const featuredBlogQuery = groq`
  *[_type == "post" && featured == true][0] {
    _id,
    title,
    "slug": slug.current,
    excerpt,
    coverImage ${imageFragment},
    category,
    publishedAt,
    author {
      name,
      role,
      avatar ${imageFragment}
    }
  }
`

export const blogBySlugQuery = groq`
  *[_type == "post" && slug.current == $slug][0] {
    _id,
    title,
    "slug": slug.current,
    excerpt,
    coverImage ${imageFragment},
    category,
    publishedAt,
    tags,
    author {
      name,
      role,
      avatar ${imageFragment}
    },
    body,
    relatedPosts[]-> {
      _id,
      title,
      "slug": slug.current,
      excerpt,
      coverImage ${imageFragment},
      category,
      publishedAt
    },
    seo {
      metaTitle,
      metaDescription
    }
  }
`

export const allBlogSlugsQuery = groq`
  *[_type == "post" && defined(slug.current)] {
    "slug": slug.current
  }
`

export const blogCategoriesQuery = groq`
  array::unique(*[_type == "post" && defined(category)].category)
`

// Site Settings & Contact Query
export const siteSettingsQuery = groq`
  *[_type == "siteSettings"][0] {
    ...,
    logo ${imageFragment},
    mediaLogo-> ${mediaFragment},
    footerLogo ${imageFragment},
    mediaFooterLogo-> ${mediaFragment}
  }
`

// Unified Blog Queries (supports both new blogPost and existing post documents)
export const allBlogsUnifiedQuery = groq`
  *[_type in ["blogPost", "post"]] | order(publishedAt desc) {
    _id,
    _type,
    title,
    "slug": slug.current,
    excerpt,
    "featuredImage": coalesce(featuredImage ${imageFragment}, coverImage ${imageFragment}),
    publishedAt,
    updatedAt,
    featured,
    wordpressId,
    originalWordPressUrl,
    "categories": select(
      defined(categories[0]._ref) => categories[]->{ _id, title, "slug": slug.current, description },
      defined(categories[0].title) => categories[] { _id, title, "slug": slug.current, description },
      defined(category) => [{ "title": category, "slug": category }]
    ),
    "tags": select(
      defined(tags[0]._ref) => tags[]->{ _id, title, "slug": slug.current },
      defined(tags[0].title) => tags[] { _id, title, "slug": slug.current },
      tags
    ),
    "author": select(
      defined(author._ref) => author->{ _id, name, "slug": slug.current, image ${imageFragment}, bio },
      defined(author.name) => {
        "name": author.name,
        "role": author.role,
        "image": coalesce(author.image ${imageFragment}, author.avatar ${imageFragment})
      }
    )
  }
`

export const blogBySlugUnifiedQuery = groq`
  *[_type in ["blogPost", "post"] && slug.current == $slug][0] {
    _id,
    _type,
    title,
    "slug": slug.current,
    excerpt,
    "featuredImage": coalesce(featuredImage ${imageFragment}, coverImage ${imageFragment}),
    publishedAt,
    updatedAt,
    featured,
    wordpressId,
    originalWordPressUrl,
    keywords,
    "content": coalesce(content, body),
    "categories": select(
      defined(categories[0]._ref) => categories[]->{ _id, title, "slug": slug.current, description },
      defined(categories[0].title) => categories[] { _id, title, "slug": slug.current, description },
      defined(category) => [{ "title": category, "slug": category }]
    ),
    "tags": select(
      defined(tags[0]._ref) => tags[]->{ _id, title, "slug": slug.current },
      defined(tags[0].title) => tags[] { _id, title, "slug": slug.current },
      tags
    ),
    "author": select(
      defined(author._ref) => author->{ _id, name, "slug": slug.current, image ${imageFragment}, bio },
      defined(author.name) => {
        "name": author.name,
        "role": author.role,
        "image": coalesce(author.image ${imageFragment}, author.avatar ${imageFragment})
      }
    ),
    seo {
      metaTitle,
      metaDescription,
      canonicalUrl,
      ogTitle,
      ogDescription,
      ogImage ${imageFragment},
      noIndex
    }
  }
`

export const featuredBlogsUnifiedQuery = groq`
  *[_type in ["blogPost", "post"] && featured == true] | order(publishedAt desc) {
    _id,
    _type,
    title,
    "slug": slug.current,
    excerpt,
    "featuredImage": coalesce(featuredImage ${imageFragment}, coverImage ${imageFragment}),
    publishedAt,
    updatedAt,
    featured,
    "categories": select(
      defined(categories[0]._ref) => categories[]->{ _id, title, "slug": slug.current },
      defined(category) => [{ "title": category, "slug": category }]
    ),
    "author": select(
      defined(author._ref) => author->{ name, image ${imageFragment} },
      defined(author.name) => { "name": author.name, "image": author.avatar ${imageFragment} }
    )
  }
`

export const relatedBlogsUnifiedQuery = groq`
  *[_type in ["blogPost", "post"] && slug.current != $currentSlug] | order(publishedAt desc) [0...$limit] {
    _id,
    _type,
    title,
    "slug": slug.current,
    excerpt,
    "featuredImage": coalesce(featuredImage ${imageFragment}, coverImage ${imageFragment}),
    publishedAt,
    "categories": select(
      defined(categories[0]._ref) => categories[]->{ title, "slug": slug.current },
      defined(category) => [{ "title": category, "slug": category }]
    ),
    "author": select(
      defined(author._ref) => author->{ name, image ${imageFragment} },
      defined(author.name) => { "name": author.name, "image": author.avatar ${imageFragment} }
    )
  }
`

export const allCategoriesQuery = groq`
  *[_type == "category"] | order(title asc) {
    _id,
    title,
    "slug": slug.current,
    description,
    "count": count(*[_type == "blogPost" && references(^._id)])
  }
`

export const allTagsQuery = groq`
  *[_type == "tag"] | order(title asc) {
    _id,
    title,
    "slug": slug.current,
    "count": count(*[_type == "blogPost" && references(^._id)])
  }
`

export const allAuthorsQuery = groq`
  *[_type == "author"] | order(name asc) {
    _id,
    name,
    "slug": slug.current,
    image ${imageFragment},
    bio
  }
`

export const searchBlogsUnifiedQuery = groq`
  *[_type in ["blogPost", "post"] && (title match $searchTerm || excerpt match $searchTerm || keywords[] match $searchTerm)] | order(publishedAt desc) {
    _id,
    _type,
    title,
    "slug": slug.current,
    excerpt,
    "featuredImage": coalesce(featuredImage ${imageFragment}, coverImage ${imageFragment}),
    publishedAt,
    "categories": select(
      defined(categories[0]._ref) => categories[]->{ title, "slug": slug.current },
      defined(category) => [{ "title": category, "slug": category }]
    ),
    "author": select(
      defined(author._ref) => author->{ name, image ${imageFragment} },
      defined(author.name) => { "name": author.name, "image": author.avatar ${imageFragment} }
    )
  }
`

export const allBlogSlugsUnifiedQuery = groq`
  *[_type in ["blogPost", "post"] && defined(slug.current)] {
    "slug": slug.current
  }
`




