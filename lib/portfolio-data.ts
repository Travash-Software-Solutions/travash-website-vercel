export interface PortfolioProject {
  _id?: string
  _type?: string
  title: string
  slug: string
  portfolioTitle?: string
  cardDescription?: string
  shortDescription?: string
  category?: string
  industry?: string
  projectType?: string
  projectTypes?: string[]
  industries?: string[]
  technologies?: string[] | { name: string; icon?: string }[]
  featured?: boolean
  portfolioOrder?: number
  portfolioVisible?: boolean
  caseStudyUrl?: string
  cardImage?: { asset?: { url: string } } | string
  cardImageAlt?: string
  featureImage?: { asset?: { url: string } } | string
  heroImage?: { asset?: { url: string } } | string
  metrics?: { value: string; label: string }[]
}

export interface IndustryItem {
  _id?: string
  name: string
  slug: string
  description?: string
}

export interface TechnologyItem {
  _id?: string
  name: string
  slug: string
  category?: string
  icon?: { asset?: { url: string } } | string
}

export const DEFAULT_PORTFOLIO_PROJECTS: PortfolioProject[] = [
  {
    _id: 'proj-pixl',
    title: 'How We Built a Human-Sounding Voice AI Agent that Quadrupled Site Visits for Pixl',
    portfolioTitle: 'Pixl - AI Voice Calling Agent',
    slug: 'pixl',
    cardDescription:
      'Sub-3-second conversational voice agent qualifying real estate buyers, booking live site visits, and automating 100% of HubSpot CRM logging.',
    shortDescription:
      'Sub-3-second conversational voice agent qualifying real estate buyers, booking live site visits, and automating 100% of HubSpot CRM logging.',
    category: 'Artificial Intelligence',
    industry: 'Real Estate & PropTech',
    projectType: 'AI Voice Automation',
    industries: ['Real Estate & PropTech', 'Technology'],
    technologies: ['GPT-4', 'Deepgram STT', 'Neural TTS', 'Twilio SIP', 'HubSpot API'],
    featured: true,
    portfolioOrder: 1,
    cardImage: '/casestudy-thumbs/pixl-crm.png',
    metrics: [
      { value: '< 3s', label: 'Speed-to-Lead' },
      { value: '+310%', label: 'Site Visits Booked' },
    ],
  },
  {
    _id: 'proj-satyapaan',
    title: 'AI-Powered Passport Verification at Scale: 1.96 Million Applications Processed',
    portfolioTitle: 'Satyapaan - AI Passport Verification',
    slug: 'satyapaan',
    cardDescription:
      'Automated high-throughput passport identity screening, facial recognition matching, and adverse case anomaly detection at state scale.',
    shortDescription:
      'Automated high-throughput passport identity screening, facial recognition matching, and adverse case anomaly detection at state scale.',
    category: 'Artificial Intelligence',
    industry: 'Government & Public Sector',
    projectType: 'Web Application',
    industries: ['Government & Public Sector', 'Technology'],
    technologies: ['Java', 'Python', 'Face Recognition', 'MySQL', 'DARPAN API'],
    featured: true,
    portfolioOrder: 2,
    cardImage: '/casestudy-thumbs/Satyaapan.png',
    metrics: [
      { value: '1.96M', label: 'Profiles Processed' },
      { value: '99.4%', label: 'Biometric Accuracy' },
    ],
  },
  {
    _id: 'proj-directowner',
    title: 'Direct Owners: Commission-Free Vacation Rentals Marketplace',
    portfolioTitle: 'Direct Owners - Vacation Rentals',
    slug: 'direct-owners',
    cardDescription:
      'Peer-to-peer vacation rental web app engineered from scratch with zero commission, dynamic date blocking, and interactive map search.',
    shortDescription:
      'Peer-to-peer vacation rental web app engineered from scratch with zero commission, dynamic date blocking, and interactive map search.',
    category: 'Hospitality and Travel',
    industry: 'Hospitality and Travel',
    projectType: 'Web Application',
    industries: ['Hospitality and Travel', 'Technology'],
    technologies: ['React', 'Node.js', 'PostgreSQL', 'Stripe', 'Mapbox'],
    featured: true,
    portfolioOrder: 3,
    cardImage: '/images/portfolio/direct-owners.png',
    metrics: [
      { value: '0%', label: 'Guest Commission' },
      { value: '100%', label: 'Direct Host Payouts' },
    ],
  },
  {
    _id: 'proj-ugo',
    title: 'Multi-Portal Supply Chain & Inventory Engine for EGO UK',
    portfolioTitle: 'UGO (EGO UK) - Supply Chain Engine',
    slug: 'ugo',
    cardDescription:
      'Unified B2B/B2C multi-portal inventory engine with real-time stock sync, multi-tier dealer pricing, and warehouse integration.',
    shortDescription:
      'Unified B2B/B2C multi-portal inventory engine with real-time stock sync, multi-tier dealer pricing, and warehouse integration.',
    category: 'Supply Chain & Commerce',
    industry: 'Industrial & Logistics',
    projectType: 'Enterprise Web Platform',
    industries: ['Industrial & Logistics', 'Technology', 'Manufacturing'],
    technologies: ['React', 'Node.js', 'PostgreSQL', 'Redis', 'REST APIs'],
    featured: true,
    portfolioOrder: 4,
    cardImage: '/casestudy-thumbs/UGO.png',
    metrics: [
      { value: '99.8%', label: 'Sync Accuracy' },
      { value: '< 200ms', label: 'Pricing Engine Latency' },
    ],
  },
  {
    _id: 'proj-indispare',
    title: 'Indispare: Pan-India B2B Industrial E-Commerce Marketplace',
    portfolioTitle: 'Indispare - B2B Industrial Marketplace',
    slug: 'indispare',
    cardDescription:
      'High-throughput enterprise marketplace connecting nationwide manufacturers, distributors, and buyers with GST invoicing and credit line workflows.',
    shortDescription:
      'High-throughput enterprise marketplace connecting nationwide manufacturers, distributors, and buyers with GST invoicing and credit line workflows.',
    category: 'B2B E-Commerce Marketplace',
    industry: 'Industrial & Manufacturing',
    projectType: 'Web Application',
    industries: ['Industrial & Manufacturing', 'E-Commerce', 'Technology'],
    technologies: ['Next.js', 'Node.js', 'PostgreSQL', 'Elasticsearch', 'RazorpayX'],
    featured: true,
    portfolioOrder: 5,
    cardImage: '/casestudy-thumbs/indispare.png',
    metrics: [
      { value: '45,000+', label: 'Active SKUs' },
      { value: '100%', label: 'Tax & GST Automated' },
    ],
  },
  {
    _id: 'proj-i4c',
    title: 'I4C National Bank Portal: Pan-India Financial Fraud Mitigation',
    portfolioTitle: 'I4C Bank Portal - Cyber Fraud Intercept',
    slug: 'i4c-bank-portal',
    cardDescription:
      'Pan-India real-time fraud mitigation coordination application enabling instant banking account freezes and recovered funds.',
    shortDescription:
      'Pan-India real-time fraud mitigation coordination application enabling instant banking account freezes and recovered funds.',
    category: 'Cyber Fraud Mitigation',
    industry: 'Banking & Financial Services',
    projectType: 'Web Application',
    industries: ['Banking & Financial Services', 'Government & Public Sector'],
    technologies: ['React', 'Node.js', 'Kafka', 'Redis', 'PostgreSQL'],
    featured: true,
    portfolioOrder: 6,
    cardImage: '/casestudy-thumbs/i4c.png',
    metrics: [
      { value: '₹100M+', label: 'Fraud Intercepted' },
      { value: '<60s', label: 'Account Freeze' },
    ],
  },
  {
    _id: 'proj-dovehouse',
    title: 'High-Speed Web Architecture: Danish Minimalist Digital Presence for Dovehouse Capital',
    portfolioTitle: 'Dovehouse - High-Speed Web Architecture',
    slug: 'dovehouse',
    cardDescription:
      'Zero-latency Danish Minimalist Single Page Application (SPA) with Framer Motion visual storytelling humanizing AI algorithmic trading.',
    shortDescription:
      'Zero-latency Danish Minimalist Single Page Application (SPA) with Framer Motion visual storytelling humanizing AI algorithmic trading.',
    category: 'High-Performance Web Architecture',
    industry: 'Financial Services',
    projectType: 'Web Application',
    industries: ['Banking & Financial Services', 'Technology'],
    technologies: ['React', 'Next.js', 'Tailwind CSS', 'Framer Motion'],
    featured: true,
    portfolioOrder: 7,
    cardImage: '/images/portfolio/dovehouse.png',
    metrics: [
      { value: '< 0.8s', label: 'Page Load Time' },
      { value: 'Zero Latency', label: 'SPA Transitions' },
    ],
  },
  {
    _id: 'proj-pekt',
    title: 'PEKT: Dynamic Automation for Streamlining All Construction Management Activities',
    portfolioTitle: 'PEKT - Dynamic Construction Management',
    slug: 'pekt',
    cardDescription:
      'A centralized mobile platform designed to eliminate on-site tracking fragmentation and automate daily construction workflows.',
    shortDescription:
      'A centralized mobile platform designed to eliminate on-site tracking fragmentation and automate daily construction workflows.',
    category: 'Construction Management Mobile App',
    industry: 'Real Estate & Construction',
    projectType: 'Mobile Application',
    industries: ['Real Estate & Construction', 'Technology'],
    technologies: ['React Native', 'UI/UX Design', 'PHP (Laravel)', 'MySQL'],
    featured: true,
    portfolioOrder: 8,
    cardImage: '/images/portfolio/pekt.webp',
    metrics: [
      { value: '40%', label: 'Time Savings' },
      { value: '60%', label: 'Productivity Improvement' },
    ],
  },
  {
    _id: 'proj-skipr',
    title: 'SKIPR VPN: Fully Autonomous, Agentic Zero-Knowledge Privacy SaaS',
    portfolioTitle: 'Skipr - Autonomous Agentic VPN',
    slug: 'skipr',
    cardDescription:
      'Non-custodial, credential-free VPN engineered from scratch with autonomous AI agents managing infrastructure and scheduled server burns.',
    shortDescription:
      'Non-custodial, credential-free VPN engineered from scratch with autonomous AI agents managing infrastructure and scheduled server burns.',
    category: 'Cybersecurity & Privacy',
    industry: 'Technology',
    projectType: 'Mobile & Cloud SaaS',
    industries: ['Technology', 'Security'],
    technologies: ['React Native', 'Node.js', 'Python AI Agents', 'OpenVPN', 'AWS'],
    featured: true,
    portfolioOrder: 9,
    cardImage: '/images/portfolio/skipr.png',
    metrics: [
      { value: 'Zero PII', label: 'Zero Knowledge' },
      { value: '100%', label: 'Autonomous Agents' },
    ],
  },
  {
    _id: 'proj-darpan',
    title: 'Darpan: AI Facial Recognition & Missing Person Retrieval Engine',
    portfolioTitle: 'Darpan - AI Facial Retrieval',
    slug: 'darpan',
    cardDescription:
      'Deep learning computer vision system matching missing records in real-time across state-wide photo databases.',
    shortDescription:
      'Deep learning computer vision system matching missing records in real-time across state-wide photo databases.',
    category: 'Artificial Intelligence',
    industry: 'Government & Public Sector',
    projectType: 'Mobile Application',
    industries: ['Government & Public Sector', 'Technology'],
    technologies: ['Flutter', 'TensorFlow', 'Computer Vision', 'Python'],
    featured: false,
    portfolioOrder: 10,
    cardImage: '/casestudy-thumbs/Darpan.png',
    metrics: [
      { value: '800+', label: 'High-Risk Cases' },
      { value: '65%', label: 'Turnaround Speedup' },
    ],
  },
  {
    _id: 'proj-iverify',
    title: 'i-Verify: Next-Gen Background Screening & Biometric Trust Platform',
    portfolioTitle: 'i-Verify - Identity Screening',
    slug: 'i-verify',
    cardDescription:
      'Comprehensive candidate identity and credential verification portal utilizing document AI and automated registry lookup.',
    shortDescription:
      'Comprehensive candidate identity and credential verification portal utilizing document AI and automated registry lookup.',
    category: 'Verification & Trust',
    industry: 'Technology',
    projectType: 'Web Application',
    industries: ['Technology', 'Recruitment & HR'],
    technologies: ['React', 'Node.js', 'Document AI', 'MongoDB', 'OCR'],
    featured: false,
    portfolioOrder: 11,
    cardImage: '/casestudy-thumbs/i-verify.png',
    metrics: [
      { value: '500K+', label: 'Verifications' },
      { value: '85%', label: 'Time Reduction' },
    ],
  },
  {
    _id: 'proj-dinedesk',
    title: 'Dine Desk: Enterprise Restaurant Management & Smart Reservation SaaS',
    portfolioTitle: 'Dine Desk - Hospitality SaaS',
    slug: 'dine-desk',
    cardDescription:
      'Multi-unit reservation engine, live waitlist tracking, dynamic table allocation, and guest analytics for restaurant chains.',
    shortDescription:
      'Multi-unit reservation engine, live waitlist tracking, dynamic table allocation, and guest analytics for restaurant chains.',
    category: 'Hospitality & SaaS',
    industry: 'Hospitality and Travel',
    projectType: 'Web Application',
    industries: ['Hospitality and Travel', 'Technology'],
    technologies: ['React', 'React Native', 'Node.js', 'WebSockets'],
    featured: false,
    portfolioOrder: 12,
    cardImage: '/casestudy-thumbs/dinedesk.png',
    metrics: [
      { value: '3x', label: 'Table Turnover' },
      { value: '40%', label: 'No-Show Reduction' },
    ],
  },
  {
    _id: 'proj-ledray',
    title: 'Ledray: Architectural Lighting Interactive Catalog & 3D Configurator',
    portfolioTitle: 'Ledray - Lighting E-Commerce',
    slug: 'ledray',
    cardDescription:
      'High-performance product catalog with interactive 3D lighting simulation, photometrics calculation, and B2B ordering.',
    shortDescription:
      'High-performance product catalog with interactive 3D lighting simulation, photometrics calculation, and B2B ordering.',
    category: 'E-Commerce & 3D',
    industry: 'E-Commerce & Retail',
    projectType: 'Website Development',
    industries: ['E-Commerce & Retail', 'Technology'],
    technologies: ['Three.js', 'Next.js', 'Tailwind CSS', 'Shopify API'],
    featured: false,
    portfolioOrder: 13,
    cardImage: '/images/portfolio/ledray.webp',
    metrics: [
      { value: '4.2x', label: 'User Engagement' },
      { value: '100%', label: 'Mobile Responsive' },
    ],
  },
  {
    _id: 'proj-konvino',
    title: 'Konvino: Sommelier Cellar Management & Beverage Distribution Portal',
    portfolioTitle: 'Konvino - Beverage Logistics',
    slug: 'konvino',
    cardDescription:
      'Curated beverage discovery, inventory barcode scanning, and direct winery distribution for hospitality operators.',
    shortDescription:
      'Curated beverage discovery, inventory barcode scanning, and direct winery distribution for hospitality operators.',
    category: 'Hospitality Tech',
    industry: 'Hospitality and Travel',
    projectType: 'Mobile Application',
    industries: ['Hospitality and Travel', 'E-Commerce & Retail'],
    technologies: ['Swift', 'Kotlin', 'Laravel', 'Stripe'],
    featured: false,
    portfolioOrder: 14,
    cardImage: '/images/portfolio/konvino.webp',
    metrics: [
      { value: '10K+', label: 'Bottles Managed' },
      { value: '99.5%', label: 'Order Accuracy' },
    ],
  },
  {
    _id: 'proj-medimee',
    title: 'Medimee: HIPAA-Compliant Telehealth & Electronic Health Records',
    portfolioTitle: 'Medimee - Telehealth & EHR',
    slug: 'medimee',
    cardDescription:
      'Encrypted video consultations, digital prescription delivery, and patient vitals tracking in one secure healthcare app.',
    shortDescription:
      'Encrypted video consultations, digital prescription delivery, and patient vitals tracking in one secure healthcare app.',
    category: 'Healthcare & Telemedicine',
    industry: 'Healthcare',
    projectType: 'Web Application',
    industries: ['Healthcare', 'Health & Wellness'],
    technologies: ['React', 'WebRTC', 'Node.js', 'HIPAA AWS'],
    featured: false,
    portfolioOrder: 15,
    cardImage: '/images/portfolio/medimee.webp',
    metrics: [
      { value: '100%', label: 'HIPAA Compliant' },
      { value: '4.9★', label: 'Patient Rating' },
    ],
  },
  {
    _id: 'proj-gratus',
    title: 'Gratus: Corporate Peer Recognition & Micro-Rewards Employee SaaS',
    portfolioTitle: 'Gratus - Employee Recognition SaaS',
    slug: 'gratus',
    cardDescription:
      'Gamified peer recognition platform with Slack integration, points redemption catalog, and culture pulse metrics.',
    shortDescription:
      'Gamified peer recognition platform with Slack integration, points redemption catalog, and culture pulse metrics.',
    category: 'Enterprise SaaS',
    industry: 'Technology',
    projectType: 'Web Application',
    industries: ['Technology', 'Recruitment & HR'],
    technologies: ['Vue.js', 'Node.js', 'Slack API', 'PostgreSQL'],
    featured: false,
    portfolioOrder: 16,
    cardImage: '/images/portfolio/gratus.png',
    metrics: [
      { value: '88%', label: 'Active Participation' },
      { value: '25%', label: 'Retention Boost' },
    ],
  },
  {
    _id: 'proj-gemba',
    title: 'Gemba – Smarter Maintenance for Industrial Performance',
    portfolioTitle: 'Gemba – Industrial Maintenance Platform',
    slug: 'gemba',
    cardDescription:
      'Custom maintenance software that helps industrial teams track machine breakdowns, understand downtime and make faster maintenance decisions.',
    shortDescription:
      'Custom maintenance software that helps industrial teams track machine breakdowns, understand downtime and make faster maintenance decisions.',
    category: 'Manufacturing Software',
    industry: 'Manufacturing & Industrial Operations',
    projectType: 'Web & Desktop Application',
    industries: ['Manufacturing & Industrial Operations', 'Technology'],
    technologies: ['React', 'Node.js', 'WebSockets', 'MongoDB'],
    featured: false,
    portfolioOrder: 17,
    cardImage: '/images/portfolio/gemba.png',
    metrics: [
      { value: '30%', label: 'Downtime Reduction' },
      { value: '100+', label: 'Breakdowns Tracked' },
      { value: '25%', label: 'Equipment Availability Improvement' },
      { value: '50%', label: 'Faster Resolution' },
    ],
  },
  {
    _id: 'proj-wiggett',
    title: 'Wiggett Group: Electrical Safety & Construction Compliance Mobile App',
    portfolioTitle: 'Wiggett Group - Field Inspection App',
    slug: 'wiggett-app',
    cardDescription:
      'Offline-first field inspection app for commercial electricians, generating instant BS 7671 safety certificates.',
    shortDescription:
      'Offline-first field inspection app for commercial electricians, generating instant BS 7671 safety certificates.',
    category: 'Field Operations',
    industry: 'Real Estate',
    projectType: 'Mobile Application',
    industries: ['Real Estate', 'Manufacturing'],
    technologies: ['React Native', 'Express', 'PostgreSQL', 'PDF Engine'],
    featured: false,
    portfolioOrder: 18,
    cardImage: '/images/portfolio/wiggett-app.png',
    metrics: [
      { value: '4x', label: 'Faster Certs' },
      { value: 'Zero', label: 'Paper Forms' },
    ],
  },
  {
    _id: 'proj-spencer',
    title: 'Spencer: Commercial Workspace Design & Fit-Out Showcase Website',
    portfolioTitle: 'Spencer - Workspace Architecture',
    slug: 'spencer',
    cardDescription:
      'Modern digital portfolio showcasing corporate interior transformations, sustainability certifications, and project case studies.',
    shortDescription:
      'Modern digital portfolio showcasing corporate interior transformations, sustainability certifications, and project case studies.',
    category: 'Corporate Web',
    industry: 'Real Estate',
    projectType: 'Website Development',
    industries: ['Real Estate'],
    technologies: ['Next.js', 'Tailwind CSS', 'Framer Motion'],
    featured: false,
    portfolioOrder: 19,
    cardImage: '/images/portfolio/spencer.png',
    metrics: [
      { value: '99/100', label: 'Lighthouse Score' },
      { value: '<1s', label: 'Load Time' },
    ],
  },
  {
    _id: 'proj-kalsi',
    title: 'Kalsi Estate: Commercial Property Portfolio & Asset Management',
    portfolioTitle: 'Kalsi Estate - Commercial Property',
    slug: 'kalsi-estate',
    cardDescription:
      'Interactive investor portal displaying prime industrial and retail real estate assets, tenant tenancy, and financial yields.',
    shortDescription:
      'Interactive investor portal displaying prime industrial and retail real estate assets, tenant tenancy, and financial yields.',
    category: 'Real Estate & Finance',
    industry: 'Real Estate',
    projectType: 'Website Development',
    industries: ['Real Estate', 'Banking & Financial Services'],
    technologies: ['Next.js', 'Tailwind CSS', 'Interactive Maps'],
    featured: false,
    portfolioOrder: 20,
    cardImage: '/images/portfolio/kalsi-estate.png',
    metrics: [
      { value: '£50M+', label: 'Asset Portfolio' },
      { value: 'Live', label: 'Availability Map' },
    ],
  },
  {
    _id: 'proj-gridproperties',
    title: 'Grid Properties: Modern Architectural Development & Leasing Showcase',
    portfolioTitle: 'Grid Properties - Urban Development',
    slug: 'grid-properties',
    cardDescription:
      'Sleek urban property showcase with interactive floor plan viewer, specification downloads, and direct agent inquiry.',
    shortDescription:
      'Sleek urban property showcase with interactive floor plan viewer, specification downloads, and direct agent inquiry.',
    category: 'Real Estate & Design',
    industry: 'Real Estate',
    projectType: 'Website Development',
    industries: ['Real Estate'],
    technologies: ['React', 'Tailwind CSS', 'Mapbox', 'HubSpot'],
    featured: false,
    portfolioOrder: 21,
    cardImage: '/images/portfolio/grid-properties.png',
    metrics: [
      { value: '2.5x', label: 'Lead Capture' },
      { value: 'HD', label: 'Floor Plan Renders' },
    ],
  },
  {
    _id: 'proj-soultrips',
    title: 'Soul Trips: Curated Wellness Travel & Experiential Retreat Booking',
    portfolioTitle: 'Soul Trips - Experiential Travel',
    slug: 'soul-trips',
    cardDescription:
      'Bespoke retreat itineraries, payment plans, and host management for transformative worldwide wellness travel.',
    shortDescription:
      'Bespoke retreat itineraries, payment plans, and host management for transformative worldwide wellness travel.',
    category: 'Travel & Wellness',
    industry: 'Hospitality and Travel',
    projectType: 'Web Application',
    industries: ['Hospitality and Travel', 'Health & Wellness'],
    technologies: ['Next.js', 'Stripe', 'Tailwind CSS', 'Sanity CMS'],
    featured: false,
    portfolioOrder: 22,
    cardImage: '/images/portfolio/soul-trips.png',
    metrics: [
      { value: '100%', label: 'Online Bookings' },
      { value: '18+', label: 'Global Destinations' },
    ],
  },
  {
    _id: 'proj-alexander',
    title: 'Alexander Johnson Group: Private Wealth Advisory & M&A Showcase',
    portfolioTitle: 'Alexander Johnson - Wealth Advisory',
    slug: 'alexander-johnson-group',
    cardDescription:
      'Sophisticated institutional web presence communicating cross-border corporate finance, transaction history, and advisory.',
    shortDescription:
      'Sophisticated institutional web presence communicating cross-border corporate finance, transaction history, and advisory.',
    category: 'Financial Advisory',
    industry: 'Banking & Financial Services',
    projectType: 'Website Development',
    industries: ['Banking & Financial Services'],
    technologies: ['Next.js', 'Tailwind CSS', 'TypeScript'],
    featured: false,
    portfolioOrder: 23,
    cardImage: '/images/portfolio/alexander-johnson-group.png',
    metrics: [
      { value: 'Tier-1', label: 'Institutional Grade' },
      { value: 'Global', label: 'Investor Reach' },
    ],
  },
  {
    _id: 'proj-asak',
    title: 'Asak: Contemporary Minimalist Fashion E-Commerce Experience',
    portfolioTitle: 'Asak - Luxury E-Commerce',
    slug: 'asak',
    cardDescription:
      'Headless e-commerce storefront with fluid page transitions, instant filtering, and sub-second checkout speeds.',
    shortDescription:
      'Headless e-commerce storefront with fluid page transitions, instant filtering, and sub-second checkout speeds.',
    category: 'Luxury Retail',
    industry: 'E-Commerce & Retail',
    projectType: 'Website Development',
    industries: ['E-Commerce & Retail'],
    technologies: ['Next.js', 'Shopify Storefront API', 'Tailwind CSS'],
    featured: false,
    portfolioOrder: 24,
    cardImage: '/images/portfolio/asak.png',
    metrics: [
      { value: '1.2s', label: 'Average Page Load' },
      { value: '+32%', label: 'Checkout Conversion' },
    ],
  },
  {
    _id: 'proj-arabianhills',
    title: 'Arbain Hills Estate: Ultra-Luxury Gated Community & Villa Portal',
    portfolioTitle: 'Arbain Hills Estate - Luxury Villas',
    slug: 'arabian-hills',
    cardDescription:
      'Virtual 3D masterplan navigation, villa inventory status, and VIP private broker lounge for Dubai luxury development.',
    shortDescription:
      'Virtual 3D masterplan navigation, villa inventory status, and VIP private broker lounge for Dubai luxury development.',
    category: 'Luxury Real Estate',
    industry: 'Real Estate',
    projectType: 'Website Development',
    industries: ['Real Estate', 'Banking & Financial Services'],
    technologies: ['Next.js', '3D Masterplan Engine', 'Tailwind CSS'],
    featured: false,
    portfolioOrder: 25,
    cardImage: '/images/portfolio/arabian-hills.png',
    metrics: [
      { value: '$1.2B+', label: 'Development Value' },
      { value: '3D', label: 'Interactive Masterplan' },
    ],
  },
  {
    _id: 'proj-nigaah',
    title: 'Nigaah: AI Video Surveillance & Real-Time Monitoring',
    portfolioTitle: 'Nigaah - AI Surveillance',
    slug: 'nigaah-videosurvelience',
    cardDescription:
      'AI video surveillance platform using real-time CCTV feeds for crowd counting and public entry/exit monitoring.',
    shortDescription:
      'AI video surveillance platform using real-time CCTV feeds for crowd counting and public entry/exit monitoring.',
    category: 'Artificial Intelligence',
    industry: 'Government & Public Sector',
    projectType: 'Web Application',
    industries: ['Government & Public Sector', 'Technology'],
    technologies: ['Python', 'OpenCV', 'PyTorch', 'TensorRT'],
    featured: false,
    portfolioOrder: 26,
    cardImage: '/casestudy-thumbs/Nigaah.png',
    metrics: [
      { value: '99.2%', label: 'Detection Accuracy' },
      { value: '30 FPS', label: 'Real-Time Inference' },
    ],
  },
  {
    _id: 'proj-crowdcounting',
    title: 'CrowdCounting: Real-Time CCTV AI Crowd Analytics',
    portfolioTitle: 'CrowdCounting - AI Vision',
    slug: 'crowdcounting',
    cardDescription:
      'An AI platform that uses real-time CCTV feeds to count people at entry and exit points accurately.',
    shortDescription:
      'An AI platform that uses real-time CCTV feeds to count people at entry and exit points accurately.',
    category: 'Artificial Intelligence',
    industry: 'Technology',
    projectType: 'Web Application',
    industries: ['Technology', 'Government & Public Sector'],
    technologies: ['Python', 'YOLO', 'DeepSORT', 'WebSockets'],
    featured: false,
    portfolioOrder: 27,
    cardImage: '/casestudy-thumbs/Crowd-Counting.png',
    metrics: [
      { value: '99.5%', label: 'Counting Accuracy' },
      { value: 'Live', label: 'Density Heatmap' },
    ],
  },
]

export const DEFAULT_INDUSTRIES: IndustryItem[] = [
  { name: 'Artificial intelligence (AI)', slug: 'ai' },
  { name: 'Banking', slug: 'banking' },
  { name: 'E-Commerce & Retail', slug: 'ecommerce-retail' },
  { name: 'Finance', slug: 'finance' },
  { name: 'Government & Public Sector', slug: 'government-public-sector' },
  { name: 'Health & Wellness', slug: 'health-wellness' },
  { name: 'Hospitality and Travel', slug: 'hospitality-and-travel' },
  { name: 'Industrial Management', slug: 'industrial-management' },
  { name: 'Inventory Engine', slug: 'inventory-engine' },
  { name: 'Logistics & Supply Chain', slug: 'logistics-supply-chain' },
  { name: 'Onsite Job Management', slug: 'onsite-job-management' },
  { name: 'Real Estate', slug: 'real-estate' },
  { name: 'Recruitment & HR', slug: 'recruitment-hr' },
  { name: 'Repairs', slug: 'repairs' },
  { name: 'Technology', slug: 'technology' },
]

export const PROJECT_TYPE_FILTERS = [
  'All',
  'Web Application',
  'Mobile Application',
  'Website Development',
] as const
