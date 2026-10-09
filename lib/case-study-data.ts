export interface TechnicalHighlight {
  label: string
  value: string
  subtext: string
  icon?: 'zap' | 'lock' | 'shield' | 'layers' | 'cpu' | 'database' | 'globe' | 'check' | 'clock' | 'smartphone' | 'chart'
}

export interface WalkthroughStep {
  stepNumber?: string
  title: string
  description: string
  subItems?: { label: string; text: string }[]
  callout?: { title: string; text: string; badge?: string }
}

export interface CaseStudyData {
  _id?: string
  title: string
  slug: { current: string }
  eyebrow?: string
  category?: string
  industry?: string
  client?: string
  location?: string
  shortDescription?: string
  heroImage?: { asset?: { url: string } }
  projectMeta?: { label: string; value: string }[]
  metrics?: { value: string; label: string; description?: string }[]
  executiveSummary?: {
    title?: string
    subtitle?: string
    paragraphs: string[]
  }
  challenge?: {
    title?: string
    subtitle?: string
    content?: string
    points: string[]
    pointsLabel?: string
    takeaway?: string
  }
  featureImage?: { asset?: { url: string } } | string
  complexity?: {
    title?: string
    intro?: string
    items: { title: string; description: string; icon?: string }[]
  }
  approach?: {
    title?: string
    subtitle?: string
    intro?: string
    description?: string
    steps: { stepNumber?: string; title: string; description: string }[]
  }
  solution?: {
    title?: string
    subtitle?: string
    intro?: string
    description?: string
    items: { title: string; description: string }[]
  }
  solutionArchitecture?: {
    title?: string
    intro?: string
    image?: { asset?: { url: string } }
    caption?: string
    isSatyaapan?: boolean
  }
  techStackTitle?: string
  techStackSubtitle?: string
  technologyStack?: {
    category: string
    technologies: string[]
    description?: string
  }[]
  impact?: {
    title?: string
    subtitle?: string
    content?: string
    outcomes: string[]
  }
  beforeAfter?: {
    title?: string
    subtitle?: string
    beforeTitle?: string
    afterTitle?: string
    before: string[]
    after: string[]
  }
  testimonial?: {
    heading?: string
    intro?: string
    quote: string
    author: string
    role?: string
    company?: string
    image?: { asset?: { url: string } } | string
  }
  whyItMatters?: {
    title?: string
    subtitle?: string
    description?: string
    items: string[]
  }
  nextStep?: {
    heading?: string
    subtitle?: string
    content?: string
    primaryCTA?: { label: string; href: string }
    secondaryCTA?: { label: string; href: string }
  }
  contact?: {
    heading?: string
    description?: string
  }
  technicalHighlights?: TechnicalHighlight[]
  walkthroughSteps?: WalkthroughStep[]
  gallery?: any[]
  content?: any
  seo?: {
    metaTitle?: string
    metaDescription?: string
    ogImage?: { asset?: { url: string } }
  }
}

// ----------------------------------------------------------------------
// 1. Pixl: AI Voice Agent (Real Estate & PropTech)
// ----------------------------------------------------------------------
export const DEFAULT_PIXL_DATA: CaseStudyData = {
  _id: 'caseStudy-pixl',
  title: 'How We Built a Human-Sounding Voice AI Agent that Quadrupled Site Visits for Pixl',
  slug: { current: 'pixl' },
  eyebrow: 'CASE STUDY',
  category: 'Enterprise AI & Voice Automation',
  industry: 'Real Estate & PropTech',
  client: 'Pixl',
  location: 'Global / UAE & USA',
  shortDescription:
    'How Travash engineered a bespoke, low-latency AI Voice Calling Agent that connects with inbound prospects in under 3 seconds, qualifies buyer intent, and quadrupled confirmed site visits for Pixl.',
  heroImage: { asset: { url: '/casestudy-thumbs/pixl-crm.png' } },
  featureImage: '/casestudy-thumbs/pixl-crm.png',
  projectMeta: [
    { label: 'CLIENT', value: 'Pixl' },
    { label: 'SOLUTION', value: 'Bespoke Conversational Voice AI Agent' },
    { label: 'INDUSTRY', value: 'Real Estate & PropTech' },
    {
      label: 'CAPABILITIES',
      value: 'Conversational LLMs • Voice AI (STT/TTS) • RAG Knowledge Base • Telephony SIP • Automated CRM Sync',
    },
  ],
  metrics: [
    {
      value: '< 3s',
      label: 'Speed-to-Lead Response Time',
      description: 'Dropped from 4.2 hours to sub-3-second instant outbound calls',
    },
    {
      value: '+310%',
      label: 'Confirmed Site Visits',
      description: 'Increase in booked appointments month-over-month',
    },
    {
      value: '72%',
      label: 'Administrative Workload Drop',
      description: 'Eliminated repetitive qualification overhead for sales consultants',
    },
    {
      value: '100%',
      label: 'HubSpot CRM Automation',
      description: 'Transcripts, summaries, scores, and recordings logged with zero manual entry',
    },
  ],
  executiveSummary: {
    title: 'Executive Snapshot',
    subtitle: 'If you manage sales in real estate, time is your biggest competitor.',
    paragraphs: [
      'When a prospective buyer submits an enquiry on Facebook, Google, or a property portal, they are at peak interest. If your team calls them within three minutes, your chances of booking a viewing are exceptionally high. Wait an hour, and that lead has already moved on to three other listings.',
      'Our client, Pixl, a rapidly scaling real estate agency handling high-volume residential and commercial developments, hit an operational bottleneck: lead decay during off-hours, sales fatigue from repetitive qualification calls, and inconsistent CRM records. Travash engineered a bespoke, low-latency AI Voice Calling Agent that listens, pauses naturally, answers complex property specifications on the fly, and guides every conversation toward confirmed calendar site visits.',
    ],
  },
  challenge: {
    title: 'The Backstory',
    subtitle: 'The Speed-to-Lead Dilemma in High-Volume Real Estate Sales',
    content: 'Pixl encountered three critical operational bottlenecks that capped conversion velocity:',
    points: [
      'Lead Decay: Enquiries flooded in 24/7, but human sales agents could only respond during office hours, leaving hot prospects waiting for hours.',
      'Administrative Fatigue: Experienced consultants spent over 65% of their working day asking basic qualification questions instead of closing deals.',
      'Inconsistent CRM Data: Busy agents took sketchy notes or forgot to update HubSpot altogether, leaving management with incomplete pipeline visibility.',
    ],
  },
  complexity: {
    title: 'Engineering Complexity',
    intro:
      'Replacing human sales calls with an automated agent requires sub-second telephony latency, contextual reasoning, and dynamic speech synthesis.',
    items: [
      {
        title: 'SUB-SECOND SPEED-TO-LEAD',
        description: 'Outbound calls must be triggered within 3 seconds of web submission while the prospect is still looking at the property listing.',
      },
      {
        title: 'NATURAL SPEECH CADENCES',
        description: 'Eliminates robotic IVR menus through neural TTS, voice activity detection (VAD), and natural conversational pauses.',
      },
      {
        title: 'DYNAMIC RAG KNOWLEDGE',
        description: 'Vector-indexed access to live floor plans, pricing tiers, zoning rules, and local neighborhood amenities.',
      },
      {
        title: 'LIVE SIP HANDOVER',
        description: 'Executes instantaneous live telephony handovers to human sales consultants when ultra-high-budget intent is detected.',
      },
    ],
  },
  approach: {
    title: 'Travash Approach',
    intro: 'A Voice Agent that Chats Like a Real Person with Single-Minded Focus on Site Visit Conversion.',
    steps: [
      {
        stepNumber: '01',
        title: 'Multi-Channel Ingestion',
        description: 'Configure real-time webhooks capturing inbound lead payloads from Facebook Ads, Google Ads, portals, WhatsApp, and websites.',
      },
      {
        stepNumber: '02',
        title: 'Sub-Second Voice Orchestration',
        description: 'Trigger automated outbound telephony via Twilio SIP trunking within 3 seconds of lead creation.',
      },
      {
        stepNumber: '03',
        title: 'RAG Knowledge Retrieval',
        description: 'Pair GPT-4 with Pinecone vector search to access real-time property inventory, pricing tiers, and community specifications.',
      },
      {
        stepNumber: '04',
        title: 'Intelligent Lead Qualification',
        description: 'Autonomously score leads across budget, location, purchasing timeline (0–30 days vs 1–3 months), and financing status.',
      },
      {
        stepNumber: '05',
        title: 'Calendar Booking & CRM Sync',
        description: 'Confirm site visits directly into agent calendars and push structured summaries, recordings, and scores to HubSpot.',
      },
    ],
  },
  solution: {
    title: 'The Solution',
    intro: 'End-to-End Voice AI Orchestration Converting Raw Inquiries into Confirmed Calendar Bookings',
    items: [
      {
        title: 'Multi-Channel Lead Ingestion',
        description: 'Custom webhooks capture lead payloads across ad networks, portals, WhatsApp, and websites within milliseconds.',
      },
      {
        title: 'Sub-Second Speed-to-Lead',
        description: 'AI agent dials the prospective buyer within 3 seconds of enquiry submission while interest is at its absolute peak.',
      },
      {
        title: 'Natural Context-Aware Dialogue',
        description: 'Powered by GPT-4 and vector search, answering intricate property specifications and layout questions accurately on the fly.',
      },
      {
        title: 'Automated Calendar Booking & SIP Handover',
        description: 'Negotiates available viewing slots on team calendars in real time, or executes sub-second SIP transfer to human consultants.',
      },
    ],
  },
  solutionArchitecture: {
    title: 'Solution Architecture',
    intro:
      'Multichannel Ingestion → Voice AI Orchestrator (<3s) → Natural Dialogue (LLMs + RAG) → Lead Qualification → SIP Transfer / Calendar Booking → Automated HubSpot Sync.',
    image: { asset: { url: '/casestudy-img/arctature-daigram.webp' } },
    caption: 'Figure: Pixl Low-Latency Conversational Voice AI & CRM Orchestration Architecture',
  },
  technologyStack: [
    {
      category: 'Conversational Intelligence',
      technologies: ['OpenAI GPT-4', 'GPT-4.1 Turbo', 'Contextual Prompt Chains'],
      description: 'Contextual reasoning, intent recognition, and multi-turn real estate dialogue management.',
    },
    {
      category: 'Knowledge Retrieval (RAG)',
      technologies: ['Pinecone Vector DB', 'Weaviate', 'Semantic Embeddings'],
      description: 'Sub-50ms property specification, layout, and pricing retrieval.',
    },
    {
      category: 'Voice & Speech AI',
      technologies: ['Deepgram STT', 'Neural TTS', 'Voice Activity Detection (VAD)'],
      description: 'Human-like cadences, zero robotic pauses, and natural interruption handling.',
    },
    {
      category: 'Telephony & Automation',
      technologies: ['Twilio SIP Trunking', 'n8n Enterprise', 'FastAPI', 'HubSpot API'],
      description: 'Telephony routing, microservice orchestration, and automated two-way CRM sync.',
    },
  ],
  impact: {
    title: 'Measurable Business Impact',
    subtitle: 'In the first 90 days following deployment, Pixl transformed its sales pipeline into an automated growth engine.',
    content:
      'Operational efficiencies delivered a complete return on technology investment within 60 days. Sales representatives reclaimed 25+ hours per week to focus 100% of their working time on conducting viewings and closing deals.',
    outcomes: [
      'Speed-to-lead plummeted from 4.2 hours to < 3 seconds (instant outbound outreach)',
      'Inbound lead coverage scaled from 38% (office hours only) to 100% (24/7/365 availability)',
      '+310% increase in confirmed site visits booked month-over-month',
      'Sales consultants reclaimed 25+ hours per week previously spent on repetitive vetting',
      'Cost per qualified lead dropped by 64%',
      '100% automated CRM data logging in HubSpot with zero manual entry',
    ],
  },
  beforeAfter: {
    title: 'Operational Metrics: Before vs. After',
    subtitle: 'From Manual Delays to Instant Conversational Execution',
    beforeTitle: 'BEFORE TRAVASH',
    afterTitle: 'AFTER TRAVASH',
    before: [
      '4.2 Hours average speed-to-lead response time',
      '~38% inbound lead coverage (limited to office hours)',
      'Baseline site visit appointment rate',
      '15 minutes of manual CRM data entry per call',
      'High cost per qualified lead due to severe lead decay',
    ],
    after: [
      '< 3 Seconds instant outbound speed-to-lead',
      '100% coverage (24/7/365 across all marketing channels)',
      '+310% increase in confirmed appointments booked',
      '0 minutes CRM time (100% automated sync with audio & transcripts)',
      '64% reduction in acquisition cost per qualified lead',
    ],
  },
  testimonial: {
    quote:
      'Deploying Travash Voice AI transformed our sales floor. Our consultants stopped chasing unvetted leads and now spend 100% of their working hours conducting viewings and closing deals. It paid for itself in under 60 days.',
    author: 'Pixl Sales Leadership',
    role: 'Head of Sales Operations',
    company: 'Pixl Real Estate',
  },
  whyItMatters: {
    title: 'Why This Matters for High-Ticket Sales',
    subtitle: 'Does Your Business Suffer from Lead Decay and Administrative Gridlock?',
    items: [
      'Eliminating lead decay by reaching buyers while their inquiry is top of mind',
      'Relieving top-performing sales consultants from routine qualification calls',
      'Achieving 100% pipeline visibility with automated structured CRM data',
      'Operating 24/7 across global investor time zones with zero incremental staff costs',
    ],
  },
  nextStep: {
    heading: 'The Next Step',
    content:
      'Ready to automate your sales pipeline and eliminate manual admin? Travash partners with growing companies to design, build, and deploy production-ready AI agents, automated workflow engines, and enterprise integrations tailored specifically to your operational goals.',
    primaryCTA: { label: 'Schedule an AI Strategy Call', href: '#contact' },
    secondaryCTA: { label: 'Request Voice AI Architecture Demo', href: '#contact' },
  },
  technicalHighlights: [
    { label: 'Speed-to-Lead', value: '< 3s', subtext: 'Trigger-to-call telephony latency', icon: 'zap' },
    { label: 'Intelligence', value: 'GPT-4 + RAG', subtext: 'Contextual inventory knowledge base', icon: 'cpu' },
    { label: 'CRM Sync', value: '100% Auto', subtext: 'Instant HubSpot structured payload', icon: 'database' },
    { label: 'Coverage', value: '24/7/365', subtext: 'Zero lead decay across all time zones', icon: 'globe' },
  ],
  walkthroughSteps: [
    {
      stepNumber: '01',
      title: 'Multi-Channel Lead Ingestion & Webhook Dispatch',
      description:
        'The moment a prospect submits an enquiry through Facebook Lead Ads, Google Search, property portals, WhatsApp, or the Pixl website, the payload is captured instantly by custom webhooks and routed to the Voice Calling Engine.',
      subItems: [
        { label: 'Instant Dispatch', text: 'Zero queue delay with sub-50ms webhook ingress.' },
        { label: 'Payload Normalization', text: 'Sanitizes prospect name, phone, channel source, and initial property interest.' },
      ],
    },
    {
      stepNumber: '02',
      title: 'Sub-Second Speed-to-Lead Outbound Call',
      description:
        'Within 3 seconds of receiving the enquiry, the AI Voice Agent initiates an outbound phone call via Twilio SIP trunking. The buyer receives a call while their phone is still in hand, capitalizing on peak buying intent.',
      subItems: [
        { label: 'Natural Opening', text: '"Hello! Thank you for your interest in Pixl. I noticed you were looking at our 2-bedroom layouts—how can I help you find the right fit?"' },
      ],
    },
    {
      stepNumber: '03',
      title: 'Natural, Context-Aware Dialogue via RAG Vector Engine',
      description:
        'Using Large Language Models paired with Retrieval-Augmented Generation over Pinecone, the AI acts as a knowledgeable consultant, answering intricate questions on floor plans, pricing tiers, and local amenities.',
      subItems: [
        { label: 'Qualification Checks', text: 'Systematically assesses buying vs renting, preferred locality, budget, timeline, and financing needs.' },
      ],
    },
    {
      stepNumber: '04',
      title: 'Automated Real-Time Lead Scoring',
      description:
        'Based on multi-turn dialogue analysis, the AI dynamically categorizes the lead into Hot (immediate 0-30 day intent), Warm (1-3 months, flexible), or Cold (research phase).',
      callout: {
        title: 'Dynamic Lead Tiering',
        text: 'Hot leads trigger instant calendar booking or immediate live SIP transfer to human closers.',
        badge: 'Zero Delay',
      },
    },
    {
      stepNumber: '05',
      title: 'Calendar Booking & Sub-Second SIP Handover',
      description:
        'For site visits, the AI checks team calendars in real time, negotiates convenient viewing slots, and locks the appointment. For urgent high-ticket buyers, it executes a sub-second SIP transfer directly to a human consultant with pre-call screen notes.',
      subItems: [
        { label: 'Calendar Sync', text: 'Google Calendar / Outlook real-time slot reservation.' },
        { label: 'SIP Transfer', text: 'Sub-second transfer with context briefing on consultant screen.' },
      ],
    },
    {
      stepNumber: '06',
      title: '100% Automated HubSpot CRM Synchronization',
      description:
        'Immediately after the call, the system pushes a structured record into HubSpot CRM including full audio recording link, text transcript, AI call summary, lead score, and confirmed site visit date.',
      subItems: [
        { label: 'Zero Manual Entry', text: 'Eliminates 15 minutes of administrative overhead per call.' },
      ],
    },
  ],
}

// ----------------------------------------------------------------------
// 2. Satyaapan: AI-Powered Passport Verification (Government / Public Safety)
// ----------------------------------------------------------------------
export const DEFAULT_SATYAPAAN_DATA: CaseStudyData = {
  _id: 'caseStudy-satyapaan',
  title: 'AI-Powered Passport Verification at Scale: 1.96 Million Applications Processed',
  slug: { current: 'satyapaan' },
  eyebrow: 'CASE STUDY',
  category: 'Enterprise AI / Public Sector',
  industry: 'Government & Public Sector',
  client: 'Telangana State Police',
  location: 'Telangana, India',
  shortDescription:
    'Satyaapan is a web-based passport verification platform developed by Travash to help Telangana State Police automate high-volume identity screening, identify potential anomalies and route applications requiring further investigation to authorized officials.',
  heroImage: { asset: { url: '/casestudy-img/Satyaapan-Passport-Verification-System.png' } },
  featureImage: '/casestudy-img/Satyaapan-Passport-Verification-System.png',
  projectMeta: [
    { label: 'CLIENT', value: 'Telangana State Police' },
    { label: 'SOLUTION', value: 'Satyaapan – Passport Verification System' },
    { label: 'INDUSTRY', value: 'Government / Public Safety' },
    {
      label: 'CAPABILITIES',
      value: 'Web Application Development • AI-Assisted Verification • Facial Recognition • Data Extraction • Workflow Automation',
    },
  ],
  metrics: [
    {
      value: '1.96 Million',
      label: 'Passport applications processed',
      description: 'Handled at state scale with automated verification checks',
    },
    {
      value: '800+',
      label: 'High-risk adverse cases identified and intercepted',
      description: 'Identified fraudulent identities and duplicate applications',
    },
    {
      value: 'AI-Assisted Verification',
      label: 'Automated data extraction, facial recognition and real-time matching',
      description: 'Integrated directly with state law enforcement databases',
    },
    {
      value: 'Telangana State Police',
      label: 'client-badge',
      description: 'Public safety digital transformation initiative',
    },
  ],
  executiveSummary: {
    title: 'Executive Summary',
    subtitle: 'Passport verification at scale requires both operational efficiency and rigorous identity screening.',
    paragraphs: [
      'Processing millions of passport applications requires immense administrative resources and flawless security protocols. Historically, relying on manual verification created a severe operational gridlock for the government. Officials struggled to efficiently verify if applicants were attempting to secure duplicate passports using fraudulent identities or fake details.',
      'Travash Software Solutions engineered Satyaapan, an advanced web application whose name translates directly to "Truth Verification". The platform combines automated data extraction, facial recognition, real-time matching against relevant internal records and an automated clearance or hold workflow. Applications that pass verification proceed through an automated clearance process, while potential anomalies are placed on hold and routed to the relevant officer for investigation.',
      'The platform has successfully processed 1,960,000 passport applications and helped identify and intercept 800+ high-risk adverse cases.',
    ],
  },
  challenge: {
    title: 'The Challenge',
    subtitle: 'High-Volume Passport Verification Was Creating an Administrative Bottleneck',
    content:
      'The existing verifcation process relied heavily on manual checks, making it difficult to efficiently screen large volumes of applications.',
    points: [
      'Duplicate passport attempts',
      'Fraudulent identities or false information',
      'Relevant matches against criminal records',
      'Applications requiring further investigation',
    ],
    pointsLabel: 'OFFICIALS NEEDED TO IDENTIFY :',
    takeaway:
      'The challenge was to reduce repetitive manual screening without removing human involvement from sensitive investigation decisions.',
  },
  complexity: {
    title: 'The Complexity',
    intro:
      'Satyaapan needed to operate within a sensitive public-safety workflow where application volume, identity verification and appropriate escalation were all critical.',
    items: [
      {
        title: 'HIGH APPLICATION VOLUME',
        description: 'The platform needed to support passport verification at a scale that ultimately reached 1.96 million processed applications.',
      },
      {
        title: 'IDENTITY VERIFICATION',
        description: 'Applicant information had to be evaluated to identify potentially fraudulent identities and duplicate application attempts.',
      },
      {
        title: 'FACIAL RECOGNITION',
        description: 'Biometric facial matching cross-referenced against digital images of persons of interest related to crime.',
      },
      {
        title: 'MULTIPLE VERIFICATION SOURCES',
        description: 'The workflow incorporated relevant records and integrations, including DARPAN technology and AFIS (Automated Fingerprint Identification System).',
      },
      {
        title: 'AUTOMATED APPLICATION ROUTING',
        description: 'The platform needed to distinguish applications that could proceed from applications that should be placed on hold.',
      },
      {
        title: 'HUMAN INVESTIGATION',
        description: 'Potential anomalies had to be escalated to the relevant manager or officer rather than treated as an automated final decision.',
      },
    ],
  },
  approach: {
    title: 'Travash Approach',
    subtitle: 'Automate Routine Screening. Surface Exceptions for Investigation.',
    intro:
      'Travash approached Satyaapan as an intelligent verification workflow rather than simply an administrative portal.',
    steps: [
      {
        stepNumber: '01',
        title: 'Discover',
        description: 'Understand the passport verification process, operational bottlenecks and the information officials needed to evaluate applications.',
      },
      {
        stepNumber: '02',
        title: 'Architect',
        description: 'Design a centralized web application capable of supporting automated data extraction, identity screening and application routing.',
      },
      {
        stepNumber: '03',
        title: 'Implement',
        description: 'Build biometric and database integrations linking RPO data feeds with internal law enforcement registries.',
      },
      {
        stepNumber: '04',
        title: 'Validate & Deploy',
        description: 'Execute state-wide field testing across Special Branch verification centers to ensure sub-second response times.',
      },
      {
        stepNumber: '05',
        title: 'Escalate',
        description: 'Allow clear applications to proceed while routing potential anomalies to authorized officials for further investigation.',
      },
    ],
  },
  solution: {
    title: 'The Solution',
    subtitle: 'Satyaapan – An Intelligent Digital Verification Workflow',
    intro:
      'Travash developed Satyaapan as a centralized custom web application that automates critical stages of passport verification.',
    items: [
      {
        title: 'Automated Data Extraction',
        description: 'Batch processing extracts text information from application documents without manual transcription.',
      },
      {
        title: 'Facial Recognition & Record Matching',
        description: 'Biometric scan cross-references both text and facial images against internal government databases and digital records of persons of interest.',
      },
      {
        title: 'Automated Clearance or Hold Workflow',
        description: 'Passed applications generate a digital clearance report; flagged applications are placed on strict hold and routed to investigating officers.',
      },
    ],
  },
  solutionArchitecture: {
    title: 'Solution Architecture',
    intro:
      'Regional Passport Office (RPO) → Satyaapan Verification Platform → Automated Data Extraction + Facial Recognition → Real-Time Matching Against Relevant Records → Automated Verification Workflow (Clear vs Flagged).',
    image: { asset: { url: '/casestudy-img/arctature-daigram.webp' } },
    caption: 'Figure: Satyaapan Multi-Tier AI Verification & Escalation Architecture',
    isSatyaapan: true,
  },
  technologyStack: [
    {
      category: 'Backend Architecture',
      technologies: ['Java', 'Laravel'],
      description: 'High-throughput enterprise application logic and secure session management.',
    },
    {
      category: 'Database Infrastructure',
      technologies: ['MySQL Enterprise'],
      description: 'Adhering to strict government data privacy, security, and integrity standards.',
    },
    {
      category: 'Frontend Interface',
      technologies: ['HTML5', 'CSS3', 'jQuery'],
      description: 'Fast, responsive interface designed for Special Branch law enforcement personnel.',
    },
    {
      category: 'Advanced Integrations & AI Automation',
      technologies: [
        'DARPAN technology, AFIS (Automated Fingerprint Identification System)',
        'Artificial Intelligence, Automated Data Extraction, Advanced Facial Recognition, Real-Time Matching',
      ],
      description: 'Biometric and law enforcement registry integration with real-time matching algorithms.',
    },
  ],
  impact: {
    title: 'The Impact',
    subtitle: 'Turning High-Volume Manual Verification Into an AI-Assisted Digital Workflow',
    content:
      'By deploying Satyaapan, Travash resolved one of the state’s most complex security challenges. We automated a highly sensitive process, enabling the government to seamlessly manage nearly two million passport applications through a centralized platform.',
    outcomes: [
      '1,960,000 passport applications successfully processed at state-wide scale',
      '800+ high-risk adverse cases identified and intercepted before passport issuance',
      'Automated routine screening of text documents, facial biometrics, and criminal records',
      'Clear separation between routine approvals and exception cases requiring investigation',
      'More focused human investigation directing officer attention toward genuine anomalies',
      'Centralized verification workflow replacing fragmented paper-based communication',
    ],
  },
  beforeAfter: {
    title: 'Before vs. After Comparison',
    subtitle: 'From Manual Verification to Intelligent Screening',
    beforeTitle: 'BEFORE SATYAPAAN',
    afterTitle: 'AFTER SATYAPAAN',
    before: [
      'Heavy dependence on manual screening across thousands of daily files',
      'Manual review of application information across disconnected portals',
      'Difficult identity cross-referencing against physical criminal logbooks',
      'Significant administrative effort required across every single application',
      'Manual clearance handling creating massive application backlogs',
    ],
    after: [
      'AI-assisted verification workflow processing applications digitally in minutes',
      'Automated data extraction directly from RPO files and documents',
      'Facial recognition and real-time matching against DARPAN and AFIS databases',
      'Routine and exception cases follow distinct, automated dual-track paths',
      'Centralized enterprise platform supporting 1.96M processed applications',
    ],
  },
  testimonial: {
    quote:
      'The Satyaapan web application built by Travash has successfully solved our biggest challenge: identifying fraudulent activity and fake records during the passport verification process. Our officers use the platform daily to securely cross-reference applications, making the entire process highly convenient and incredibly efficient. Our top officials have praised the Travash team for their dedication, technical expertise, and the reliable yearly maintenance they continue to provide. We are extremely happy with the results.',
    author: 'Telangana Police Dept (team)',
    role: '',
    company: 'Telangana Police Dept',
    image: { asset: { url: '/casestudy-img/Telangana_Police_Logo.png.bv.webp' } },
  },
  whyItMatters: {
    title: 'Why This Matters',
    subtitle: 'Could Your Organization Have a Similar Challenge?',
    description:
      'This case study is highly relevant for civic authorities, enterprises, and public-sector leaders evaluating scalable, automated identity solutions.',
    items: [
      'High-volume application or identity verification requiring strict compliance',
      'Manual document and data screening causing severe administrative delays',
      'Fraud or duplicate-record detection across vast historical databases',
      'Facial or identity matching requirements across multiple state registries',
      'Cases requiring automated screening followed by authorized human decision-making',
    ],
  },
  nextStep: {
    heading: 'The Next Step',
    content:
      'Looking to Modernize a High-Volume Verification or Public-Safety Workflow? Travash combines custom software development, web application development, AI-assisted automation and system integration to help organizations modernize complex operational workflows.',
    primaryCTA: { label: 'Discuss a Public Safety Technology Initiative', href: '#contact' },
    secondaryCTA: { label: 'Discuss an AI / Automation POC', href: '#contact' },
  },
  technicalHighlights: [
    { label: 'Volume', value: '1.96M', subtext: 'Passport files verified', icon: 'shield' },
    { label: 'Interceptions', value: '800+', subtext: 'High-risk adverse cases stopped', icon: 'lock' },
    { label: 'Biometrics', value: 'AFIS + Face', subtext: 'DARPAN & police registries', icon: 'cpu' },
    { label: 'Workflow', value: 'Dual-Track', subtext: 'Automated clear vs officer hold', icon: 'layers' },
  ],
  walkthroughSteps: [
    {
      stepNumber: '01',
      title: 'Automated Application Ingestion',
      description:
        'Instead of relying on physical paperwork, Special Branch (SB) Units download the digital applications from the Regional Passport Office portal and upload them directly onto the secure verification system.',
      subItems: [
        { label: 'Digital Intake', text: 'Secure SFTP / API batch ingestion directly from RPO data feeds.' },
        { label: 'Encrypted Staging', text: 'Files staged in tamper-proof isolated memory ready for batch processing.' },
      ],
    },
    {
      stepNumber: '02',
      title: 'Intelligent Data Extraction',
      description:
        'Upon submission, the system utilizes automated batch processing to instantly extract the applicant’s text data from provided documents and emails, eliminating manual data entry.',
      subItems: [
        { label: 'Automated OCR', text: 'High-accuracy optical character extraction of biographical records.' },
        { label: 'Format Validation', text: 'Cross-checks address, date of birth, and identity credentials.' },
      ],
    },
    {
      stepNumber: '03',
      title: 'Advanced Facial Recognition & Real-Time Matching',
      description:
        'The system deploys powerful facial recognition technology to scan and analyse the applicant’s digital photograph. The AI cross-references extracted text and biometric scans against internal government databases and digital crime records.',
      subItems: [
        { label: 'Biometric Search', text: 'Searches AFIS and DARPAN biometric repositories in sub-seconds.' },
        { label: 'Watchlist Check', text: 'Flags persons of interest and historical duplicate passport applications.' },
      ],
    },
    {
      stepNumber: '04',
      title: 'The Automated Decision Engine (Pass vs. Hold)',
      description:
        'Based on real-time data matching, the system autonomously determines the next step: clearance granted for clean records, or instant hold and officer routing for detected anomalies.',
      callout: {
        title: 'Automated Exception Governance',
        text: 'Clean files receive system-generated clearance reports; flagged files freeze issuance and alert investigating officers.',
        badge: 'Zero Compromise',
      },
    },
  ],
}

// ----------------------------------------------------------------------
// 3. Direct Owners: AI Voice Agent (Pixl)
// ----------------------------------------------------------------------
export const DEFAULT_DIRECTOWNERS_DATA: CaseStudyData = {
  _id: 'caseStudy-direct-owners',
  title: 'AI Voice Agent: How We Built a Human-Sounding Voice AI Agent that Quadrupled Site Visits',
  slug: { current: 'direct-owners' },
  eyebrow: 'CASE STUDY',
  category: 'AI Voice Agent',
  industry: 'Real Estate',
  client: 'Pixl',
  location: 'Global / Enterprise',
  shortDescription:
    'Natural language processing, automated lead qualification, and real-time CRM syncing engineered for Pixl to eliminate speed-to-lead bottlenecks and quadruple confirmed site visits.',
  heroImage: { asset: { url: '/casestudy-thumbs/Dreamnest.png' } },
  featureImage: '/casestudy-thumbs/Dreamnest.png',
  projectMeta: [
    { label: 'CLIENT', value: 'Pixl' },
    { label: 'SOLUTION', value: 'AI Voice Agent' },
    { label: 'INDUSTRY', value: 'Real Estate' },
    {
      label: 'CAPABILITIES',
      value:
        'Conversational Intelligence • Knowledge Retrieval (RAG) • Voice & Speech AI • Telephony Infrastructure • Workflow Automation',
    },
  ],
  metrics: [
    {
      value: '< 3s',
      label: 'Average speed-to-lead response time',
      description: 'Average speed-to-lead response time across all inbound channels',
    },
    {
      value: '+310%',
      label: 'Increase in confirmed site visits',
      description: 'Increase in confirmed site visit appointments month-over-month',
    },
    {
      value: 'Conversational AI',
      label: 'Core Technology',
      description: 'Natural language processing, automated lead qualification, and real-time CRM syncing',
    },
    {
      value: '24/7/365',
      label: 'Inbound Lead Coverage',
      description: 'Pixl Real Estate Agency automated frontline qualification availability',
    },
  ],
  executiveSummary: {
    title: 'Executive Summary',
    subtitle: 'Pixl Real Estate Agency',
    paragraphs: [
      'The AI Voice Agent is an advanced conversational AI solution engineered to automate frontline sales inquiries, streamline lead qualification, and manage multichannel ingestion instantly. Designed for enterprise scalability, it delivers natural, human-like voice interactions to eliminate lead decay and elevate the digital customer experience.',
    ],
  },
  challenge: {
    title: 'The Challenge',
    subtitle:
      'Real estate sales teams needed to modernize legacy lead-response workflows and eliminate speed-to-lead bottlenecks.',
    content:
      'The existing inquiry process relied heavily on manual agent availability, leaving hot prospects waiting for hours outside of office times and causing rapid lead decay.',
    pointsLabel: 'SALES TEAMS NEEDED TO IDENTIFY :',
    points: [
      'Overcoming manual administrative fatigue with modern automated qualification solutions',
      'Ensuring sub-second response latency and 24/7 conversational availability',
      'Establishing instantaneous CRM data syncing and frictionless buyer journeys',
      'Integrating distributed multi-channel inquiries into a unified voice orchestrator',
    ],
    takeaway:
      'The challenge was to reduce repetitive manual lead qualification without removing human involvement from hot lead conversions and complex sales negotiations.',
  },
  complexity: {
    title: 'The Complexity',
    intro: 'Scaling conversational speed-to-lead required solving multi-tier operational challenges:',
    items: [
      {
        title: 'HIGH INQUIRY VOLUME',
        description:
          'Handling 24/7 inbound leads from Facebook, Google, and property portals simultaneously without response latency.',
      },
      {
        title: 'NATURAL CONVERSATION FLOW',
        description:
          'Utilizing LLMs and Retrieval-Augmented Generation (RAG) to understand user intent, pause naturally, and answer complex property questions in real-time.',
      },
      {
        title: 'LIVE CRM SYNCING',
        description:
          'Securely extracting data, scoring leads (Hot/Warm/Cold), and updating HubSpot records during active calls.',
      },
      {
        title: 'EXCEPTION HANDLING',
        description:
          'Accurately identifying high-intent buyers and executing a sub-second SIP transfer to human agents with full context.',
      },
    ],
  },
  approach: {
    title: 'Travash Approach',
    subtitle: 'Automate Routine Qualification. Surface Hot Leads for Live Agents.',
    intro: 'Automate Routine Qualification. Surface Hot Leads for Live Agents.',
    steps: [
      {
        stepNumber: '01',
        title: 'DISCOVER',
        description:
          'Mapped out existing sales workflows and identified the most repetitive qualification questions causing administrative fatigue.',
      },
      {
        stepNumber: '02',
        title: 'ARCHITECT',
        description:
          'Designed a highly scalable, low-latency AI voice infrastructure using advanced Large Language Models (LLMs) and RAG.',
      },
      {
        stepNumber: '03',
        title: 'INTEGRATE',
        description:
          'Connected the conversational AI engine seamlessly with HubSpot CRM and Twilio SIP telephony networks.',
      },
      {
        stepNumber: '04',
        title: 'AUTOMATE',
        description:
          'Deployed autonomous AI agents to initiate outbound calls within 3 seconds of multichannel lead ingestion.',
      },
      {
        stepNumber: '05',
        title: 'ESCALATE',
        description:
          'Engineered a smart routing protocol to instantly transfer hot leads to human agents or automatically book calendar site visits.',
      },
    ],
  },
  solution: {
    title: 'The Solution',
    subtitle: 'AI Voice Agent – An Intelligent Conversational Sales Workflow',
    intro: 'AI Voice Agent – An Intelligent Conversational Sales Workflow',
    items: [
      {
        title: 'SUB-SECOND SPEED-TO-LEAD',
        description:
          'Initiates an outbound phone call within 3 seconds of a prospect submitting an inquiry, eliminating lead decay.',
      },
      {
        title: 'NATURAL HUMAN-LIKE DIALOGUE',
        description:
          'Leverages LLMs and Vector DBs to manage conversational nuance, understand intent, and answer precise property queries.',
      },
      {
        title: 'AUTOMATED LEAD SCORING',
        description:
          'Dynamically categorizes prospects as Hot, Warm, or Cold based on budget, timeline, and intent.',
      },
      {
        title: 'SEAMLESS LIVE HANDOVER',
        description:
          'Executes instant SIP transfers to human consultants for hot leads or automatically books site visits into team calendars.',
      },
    ],
  },
  solutionArchitecture: {
    title: 'Enterprise Voice AI Architecture',
    intro:
      'Distributed multi-channel inquiry ingestion → Low-latency Twilio SIP Telephony & Deepgram STT/TTS → GPT-4 + Vector DB (RAG) Orchestration → Live HubSpot CRM Sync & Smart Sub-Second Agent Transfer.',
    image: { asset: { url: '/casestudy-img/arctature-daigram.webp' } },
    caption: 'Figure: AI Voice Agent Autonomous Lead Qualification & Telephony Routing Architecture',
  },
  techStackTitle: 'Enterprise Technology Stack',
  techStackSubtitle:
    'Engineered with a high-throughput, sub-second latency voice intelligence stack to ensure human-like responsiveness and seamless CRM automation:',
  technologyStack: [
    {
      category: 'BACKEND ARCHITECTURE',
      technologies: ['Python (FastAPI)', 'Node.js', 'PostgreSQL', 'MongoDB'],
      description: 'Asynchronous event routing and real-time state management.',
    },
    {
      category: 'DATABASE & INFRASTRUCTURE',
      technologies: ['AWS', 'Google Cloud (Docker)', 'HubSpot CRM'],
      description: 'Elastic cloud containers and real-time CRM data synchronization.',
    },
    {
      category: 'ADVANCED INTEGRATIONS',
      technologies: ['Twilio & SIP Trunking', 'n8n Enterprise', 'Deepgram (STT/TTS)'],
      description: 'Carrier-grade SIP telephony networks and ultra-low-latency voice synthesis.',
    },
    {
      category: 'AI & AUTOMATION',
      technologies: ['OpenAI GPT-4', 'Pinecone / Weaviate Vector DB (RAG)'],
      description: 'Domain-specific property knowledge retrieval and intent-guided dialogue.',
    },
  ],
  impact: {
    title: 'The Impact',
    subtitle: 'Turning High-Volume Lead Ingestion Into a High-Speed Growth Engine',
    content:
      'Through strategic AI architecture and scalable cloud software engineering, Travash enabled Pixl to achieve immediate operational velocity and complete ROI within 60 days.',
    outcomes: [
      'Eliminated 4.2-hour average response times, dropping speed-to-lead to under 3 seconds',
      'Achieved a 310% month-over-month increase in confirmed site visit appointments',
      'Reduced repetitive administrative workload for the sales team by 72%',
      'Empowered leadership with 100% automated HubSpot CRM logging, capturing transcripts, summaries, and lead scores',
    ],
  },
  beforeAfter: {
    title: 'Before vs. After',
    subtitle: 'Transformation from manual response bottlenecks to autonomous 24/7 speed-to-lead execution.',
    beforeTitle: 'BEFORE AI VOICE AGENT',
    afterTitle: 'AFTER AI VOICE AGENT',
    before: [
      '4.2-hour average speed-to-lead, causing hot prospects to lose interest.',
      '~38% inbound lead coverage, limited strictly to standard office hours.',
      '15 minutes of manual CRM logging per call, creating massive administrative fatigue.',
      'Sales reps spent 65% of their day asking basic qualification questions.',
    ],
    after: [
      '< 3 seconds response time, engaging buyers while they are at peak intent.',
      '100% (24/7/365) coverage, answering inquiries around the clock.',
      '0 minutes of manual entry; 100% automated HubSpot CRM sync.',
      '+310% increase in booked site visits as reps focus entirely on closing deals.',
    ],
  },
  testimonial: {
    heading: 'Client Perspective',
    quote:
      'We needed a solution that could scale instantly, operate around the clock, and connect with prospective buyers immediately—without feeling like a rigid, frustrating automated phone system. Travash\'s AI Voice Agent transformed our sales pipeline into an automated growth engine, allowing our consultants to stop chasing unvetted leads and spend 100% of their time conducting viewings and closing deals.',
    author: 'Leadership Team',
    role: 'Sales Leadership',
    company: 'Pixl',
    image: {
      asset: {
        url: 'https://cdn.sanity.io/images/s2k81yej/production/03e1bfe5c72a898954b3cb4fa01cd0e7b6f8a2d3-350x320.png',
      },
    },
  },
  whyItMatters: {
    title: 'Why This Matters',
    subtitle:
      'THIS CASE STUDY IS RELEVANT FOR ORGANIZATIONS MANAGING high-volume sales pipelines, rapid lead decay, and CRM automation.',
    description:
      'The objective wasn\'t simply to introduce an IVR system; it was to build a natural, context-aware dialogue engine. By automating routine qualification with human-like precision, enterprises can scale their sales efforts infinitely and secure a complete return on technology investment within 60 days.',
    items: [
      'High-volume sales pipelines experiencing rapid lead decay outside office hours',
      'Sales teams spending over 60% of their time on repetitive basic qualification questions',
      'Need for real-time, zero-latency CRM data synchronization and automated scoring',
      'Desire to harness human-sounding Conversational AI without sacrificing conversion rates',
    ],
  },
  nextStep: {
    heading: 'The Next Step',
    subtitle: 'Looking to Modernize a High-Volume Sales Pipeline or Speed-to-Lead Workflow?',
    content:
      'Start with one clearly defined process to evaluate whether this high-tech, low-friction approach is right for your organization.',
    primaryCTA: { label: 'Discuss an AI Voice Agent Initiative', href: '#contact' },
    secondaryCTA: { label: 'Schedule an AI Discovery Session', href: '#contact' },
  },
  contact: {
    heading: 'Ready to automate and solve operational bottlenecks?',
    description:
      'At Travash, we engineer enterprise-grade conversational AI and automation workflows that eliminate lead decay and scale customer acquisition. Visit travash.com to connect with our digital transformation experts.',
  },
  technicalHighlights: [
    { label: 'Speed to Lead', value: '< 3s', subtext: 'Immediate outbound engagement', icon: 'zap' },
    { label: 'Conversion', value: '+310%', subtext: 'Confirmed site visits surge', icon: 'chart' },
    { label: 'Admin Reduced', value: '72%', subtext: 'Repetitive workload eliminated', icon: 'clock' },
    { label: 'Coverage', value: '24/7/365', subtext: 'Zero inbound lead decay', icon: 'shield' },
  ],
  walkthroughSteps: [
    {
      stepNumber: '01',
      title: 'Multichannel Lead Ingestion & Sub-3-Second Trigger',
      description:
        'Captures inquiries instantly from Facebook Ads, Google Search, and property portals, immediately initiating an outbound call via high-throughput SIP trunks.',
      subItems: [
        { label: 'Speed-to-Lead', text: 'Sub-3s response time while buyer interest is at its absolute peak.' },
        { label: 'Webhook Ingestion', text: 'Zero latency webhook listeners routing inquiries to the AI orchestrator.' },
      ],
    },
    {
      stepNumber: '02',
      title: 'Human-Sounding Speech Synthesis & Natural Dialogue',
      description:
        'Leverages ultra-fast streaming STT (Deepgram) and fine-tuned LLMs with natural pause handling, human tonality, and localized accents.',
      subItems: [
        { label: 'Zero Awkward Latency', text: 'Streaming audio pipeline responds in sub-500ms.' },
      ],
    },
    {
      stepNumber: '03',
      title: 'Retrieval-Augmented Generation (RAG) Property Knowledge',
      description:
        'Connects directly to property listing databases and vectorized brochures to provide exact specifications, pricing, and floor plans in real time.',
    },
    {
      stepNumber: '04',
      title: 'Dynamic Lead Scoring & Instant HubSpot CRM Synchronization',
      description:
        'Automatically scores prospect intent (Hot, Warm, Cold), generates call transcripts, and logs structured deal records directly into HubSpot without manual rep intervention.',
      callout: {
        title: 'Zero Admin Fatigue',
        text: 'Saves 15 minutes of manual CRM logging per call, reclaiming 25+ hours weekly for sales reps.',
        badge: 'Automated',
      },
    },
    {
      stepNumber: '05',
      title: 'Smart SIP Telephony Transfer & Instant Calendar Booking',
      description:
        'Transfers high-intent buyers directly to human sales reps with full caller context, or seamlessly reserves a viewing slot directly into the consultant calendar.',
    },
  ],
}

// ----------------------------------------------------------------------
// 4. UGO: Multi-Portal Supply Chain & Inventory Engine for EGO (UK)
// ----------------------------------------------------------------------
export const DEFAULT_UGO_DATA: CaseStudyData = {
  _id: 'caseStudy-ugo',
  title: 'Architecting a Multi-Portal Supply Chain & Inventory Engine for EGO (UK)',
  slug: { current: 'ugo' },
  eyebrow: 'CASE STUDY',
  category: 'Logistics & Supply Chain Management',
  industry: 'Logistics & Supply Chain',
  client: 'EGO (UK)',
  location: 'United Kingdom',
  shortDescription:
    'Custom-built enterprise web application unifying five stakeholder groups (Admins, Clients, Sellers, Buyers, Carriers) with granular stock auditing, pipeline management, and frictionless mobile carrier sign-offs via temporary URLs.',
  heroImage: { asset: { url: '/casestudy-thumbs/UGO.png' } },
  featureImage: '/casestudy-thumbs/UGO.png',
  projectMeta: [
    { label: 'CLIENT', value: 'EGO (UK)' },
    { label: 'SOLUTION', value: 'UGO – Multi-Portal Supply Chain & Logistics Engine' },
    { label: 'INDUSTRY', value: 'Supply Chain / Asset Recovery / Logistics' },
    {
      label: 'CAPABILITIES',
      value: 'Multi-Portal Web Architecture • Role-Based Access Control • Stock Auditing • Frictionless Carrier E-Sign',
    },
  ],
  metrics: [
    {
      value: '5 Stakeholders',
      label: 'Unified Digital Ecosystem',
      description: 'Admins, Clients, Sellers, Buyers, and Logistics Carriers connected seamlessly',
    },
    {
      value: '100% Digital',
      label: 'Carrier Sign-Offs',
      description: 'Frictionless temporary URL mobile sign-off eliminating paper manifests',
    },
    {
      value: 'Real-Time',
      label: 'Inbound & Outbound NR Tracking',
      description: 'Continuous pipeline synchronization across master admin and stakeholder dashboards',
    },
    {
      value: 'High Security',
      label: 'Role-Based Data Isolation',
      description: 'Engineered for strict commercial privacy and relational audit integrity',
    },
  ],
  executiveSummary: {
    title: 'Executive Impact Snapshot',
    subtitle: 'Eliminating Supply Chain Fragmentation Across Complex Multi-Party Logistics',
    paragraphs: [
      'In the complex supply chain and asset recovery industry, the greatest threat to profitability is fragmented communication. Our UK-based client, EGO, was managing an intricate operational pipeline involving five independent stakeholder groups: the internal administrative team, corporate clients, product sellers, end-buyers, and logistics carriers.',
      'Managing the flow of inventory—specifically tracking inbound and outbound products, categorising stock, and executing accurate stock audits—requires absolute precision. Travash engineered a comprehensive, custom-built enterprise web application designed to act as the central nervous system for EGO’s entire operation, unifying all parties while digitizing carrier handovers via shareable web links.',
    ],
  },
  challenge: {
    title: 'The Operational Challenge',
    subtitle: 'Paper Trails, Stock Discrepancies, and Logistics Handover Latency',
    content:
      'Fragmented systems and manual data entry created serious operational vulnerabilities for EGO:',
    points: [
      'Logistics Bottlenecks: Relying on physical paperwork meant admin teams waited days for delivery verification.',
      'Data Silos: Disjointed communication between clients, sellers, and buyers led to persistent stock discrepancies.',
      'Audit Complexity: Difficulty conducting real-time stock audits across multi-location warehouse inventories.',
      'Privacy & Governance: Need for strict role-based access control so external parties only accessed their specific operational pipeline.',
    ],
  },
  complexity: {
    title: 'Multi-Portal Ecosystem',
    intro:
      'Rather than building a single monolithic view, Travash mapped a multi-portal architecture tailored to each user type with strict RBAC:',
    items: [
      {
        title: 'EGO MASTER ADMIN PORTAL',
        description: 'Central command for master data, user governance, pipeline lifecycles, NR categories, and comprehensive stock audits.',
      },
      {
        title: 'ISOLATED STAKEHOLDER PORTALS',
        description: 'Tailored dashboards for Corporate Clients, Product Sellers, and Buyers to track inventory and order progress transparently.',
      },
      {
        title: 'FRICTIONLESS CARRIER WEB PAGE',
        description: 'Temporary tokenized URL sent to carriers for mobile inspection and on-screen digital signature sign-off.',
      },
      {
        title: 'INSTANT ADMIN SYNCHRONIZATION',
        description: 'Carrier mobile sign-off immediately marks client process as complete in the central database in real time.',
      },
    ],
  },
  approach: {
    title: 'Travash Approach',
    intro: 'A Unified, Role-Based Digital Ecosystem for Real-Time Operational Velocity.',
    steps: [
      {
        stepNumber: '01',
        title: 'Pipeline & Stakeholder Mapping',
        description: 'Analyzed the operational lifecycle of inventory from inbound intake to final buyer handoff across five user roles.',
      },
      {
        stepNumber: '02',
        title: 'Multi-Portal RBAC Architecture',
        description: 'Engineered distinct portal interfaces with role-based access control ensuring absolute commercial data isolation.',
      },
      {
        stepNumber: '03',
        title: 'Inventory & Stock Audit Modules',
        description: 'Developed granular NR category structures and real-time inventory reconciliation workflows.',
      },
      {
        stepNumber: '04',
        title: 'Temporary URL E-Signature Flow',
        description: 'Created secure, token-protected mobile sign-off links for drivers without requiring app installation.',
      },
      {
        stepNumber: '05',
        title: 'Real-Time Telemetry Sync',
        description: 'Connected carrier mobile sign-offs to instant database updates triggering automated client notifications.',
      },
    ],
  },
  solution: {
    title: 'The Solution',
    intro: 'Key Modules of the EGO Custom Web Application',
    items: [
      {
        title: 'The EGO Master Admin Portal (Central Command)',
        description: 'Allows administrators to manage Master Data, track operational pipelines, configure NR categories, and execute real-time stock audits.',
      },
      {
        title: 'Dedicated Stakeholder Portals (Client, Buyer, Seller)',
        description: 'Secure, isolated environments for external parties to monitor their specific orders and track inventory progress transparently.',
      },
      {
        title: 'Frictionless Carrier Web Page (Digital Sign-off)',
        description: 'Secure temporary web link allowing carriers to review consignment details on mobile devices and digitally sign on screen.',
      },
      {
        title: 'Inbound / Outbound NR Logistics Automation',
        description: 'Automated status progression synchronizing physical warehouse handoffs with master enterprise financial records.',
      },
    ],
  },
  solutionArchitecture: {
    title: 'Application Architecture',
    intro:
      'EGO Master Admin Portal → Client / Seller / Buyer Portals → Inbound / Outbound NR Logistics → Carrier Web Page (Temporary URL) → Real-Time Synchronization → Master Database.',
    image: { asset: { url: '/casestudy-img/arctature-daigram.webp' } },
    caption: 'Figure: EGO Multi-Portal Real-Time Supply Chain Architecture',
  },
  technologyStack: [
    {
      category: 'Backend Architecture',
      technologies: ['Custom PHP Enterprise', 'Modular MVC Engine'],
      description: 'Engineered for complex relational business logic and rapid high-concurrency data processing.',
    },
    {
      category: 'Database Infrastructure',
      technologies: ['MySQL Enterprise (Relational Structuring)'],
      description: 'Multi-tiered Master Data, granular NR product cataloging, and immutable audit logs.',
    },
    {
      category: 'Frontend Interface',
      technologies: ['HTML5', 'CSS3', 'Modern JavaScript (ES6+)'],
      description: 'Responsive layout ensuring the Carrier Portal functions flawlessly on all smartphone screens.',
    },
    {
      category: 'Security & Access Protocols',
      technologies: ['Role-Based Access Control (RBAC)', 'Token-Based Temporary URLs', 'AES Encryption'],
      description: 'Guarantees strict data isolation and tamper-proof digital signature capture.',
    },
  ],
  impact: {
    title: 'The Digital Transformation Impact',
    subtitle: 'From Paper Delays to Instant, Digitally Signed Supply Chain Velocity',
    content:
      'The custom EGO web application modernized supply chain operations by replacing disjointed communications with a centralized, role-based platform.',
    outcomes: [
      'Total Operational Transparency: Clients, buyers, and sellers monitor live pipelines, slashing inbound support queries',
      'Inventory Precision: Granular NR product categorisation and audit modules eliminated stock discrepancies',
      'Logistics Velocity: Carrier web sign-offs transformed multi-day paper handovers into instantaneous real-time completions',
      'Zero App Install Friction: Delivery drivers complete sign-offs directly in mobile web browsers in seconds',
      'Robust Audit Trails: Every signature and status change is cryptographically logged with timestamps',
    ],
  },
  beforeAfter: {
    title: 'Operational Evolution: Before vs. After',
    subtitle: 'Modernizing Supply Chain Handover Workflows',
    beforeTitle: 'BEFORE TRAVASH',
    afterTitle: 'AFTER TRAVASH',
    before: [
      'Fragmented phone and email chains across clients, sellers, and buyers',
      'Physical paper manifests causing multi-day delays in delivery verification',
      'Frequent inventory discrepancies and manual warehouse stocktaking',
      'Zero real-time visibility for corporate clients waiting on status reports',
      'Disjointed data causing billing delays and carrier payment disputes',
    ],
    after: [
      'Centralized multi-portal architecture with dedicated stakeholder dashboards',
      'Instantaneous carrier digital sign-offs via secure mobile web links',
      'Granular real-time stock audits and NR product categorisation',
      '100% live pipeline transparency across all active consignments',
      'Instant automated status completion syncing directly to administrative records',
    ],
  },
  testimonial: {
    quote:
      "Trying to force our UK logistics operations into rigid, off-the-shelf software was an absolute nightmare. We needed a system that adapted to our unique workflows, not the other way around. Travash stepped in, mapped out our exact operational DNA, and built a bespoke internal application that fits us like a glove. Everything from our internal tracking to dispatch is finally unified exactly how we work on the floor. They didn't just build an app; they engineered a flawless digital extension of our business.",
    author: 'Operations Director',
    role: 'Operations Director',
    company: 'UGO',
    image: { asset: { url: '/images/avatar-placeholder.svg' } },
  },
  whyItMatters: {
    title: 'Why This Matters for Enterprise Supply Chains',
    subtitle: 'Are Disjointed Stakeholders and Paper Trails Slowing Down Your Operations?',
    items: [
      'Unifying multiple external parties without compromising administrative master security',
      'Eliminating slow paper manifests through frictionless browser-based mobile sign-offs',
      'Maintaining 100% audit precision across multi-location warehouse inventories',
      'Providing end clients with self-service visibility into their active pipelines',
    ],
  },
  nextStep: {
    heading: 'The Next Step',
    content:
      'Looking to streamline complex logistics, inventory, or multi-party operational pipelines? Travash engineers bespoke web platforms designed to unite stakeholders and accelerate business velocity.',
    primaryCTA: { label: 'Discuss a Logistics Platform Initiative', href: '#contact' },
    secondaryCTA: { label: 'Explore Custom Portal Architecture', href: '#contact' },
  },
  technicalHighlights: [
    { label: 'Portals', value: '5 Hubs', subtext: 'Admin, Client, Seller, Buyer, Carrier', icon: 'layers' },
    { label: 'Carrier Link', value: 'Zero Install', subtext: 'Tokenized temporary mobile URL', icon: 'smartphone' },
    { label: 'Security', value: 'Strict RBAC', subtext: 'Commercial data isolation', icon: 'lock' },
    { label: 'Auditing', value: 'Real-Time', subtext: 'Granular NR product classification', icon: 'database' },
  ],
  walkthroughSteps: [
    {
      stepNumber: '01',
      title: 'EGO Master Admin Portal (Central Command)',
      description:
        'The core engine where the internal EGO team orchestrates the entire operation. Administrators manage Master Data, configure user governance across Clients, Sellers, and Buyers, track dynamic pipelines, and execute comprehensive stock audits.',
      subItems: [
        { label: 'Master Governance', text: 'Sets global rules, permissions, and system configurations.' },
        { label: 'NR Classification', text: 'Granular inventory categorisation for recovery and re-marketing.' },
      ],
    },
    {
      stepNumber: '02',
      title: 'Dedicated Stakeholder Portals (Client, Buyer, Seller)',
      description:
        'Secure, isolated environments for external parties. Clients, Buyers, and Sellers log in to monitor their specific pipelines, submit inventory requests, and track progress without accessing administrative records.',
      subItems: [
        { label: 'Data Isolation', text: 'Role-based access control prevents unauthorized pipeline visibility.' },
      ],
    },
    {
      stepNumber: '03',
      title: 'Frictionless Carrier Web Page (Digital Sign-Off)',
      description:
        'When an outbound or inbound process is ready, a secure temporary web page is generated and shared with the carrier via SMS or messaging. The driver reviews consignment details on their mobile screen and signs digitally.',
      callout: {
        title: 'Zero App Friction',
        text: 'Carriers do not need an app or login. One tap on the temporary link opens the signature pad directly in their mobile browser.',
        badge: 'Instant Handover',
      },
    },
    {
      stepNumber: '04',
      title: 'Real-Time Data Synchronization & Process Completion',
      description:
        'Once signed, the digital proof of signature is securely routed back to the EGO Admin dashboard in real time, immediately marking the client process as complete and generating audit documentation.',
    },
  ],
}

// ----------------------------------------------------------------------
// 5. Indispare: Pan-India B2B E-Commerce Marketplace
// ----------------------------------------------------------------------
export const DEFAULT_INDISPARE_DATA: CaseStudyData = {
  _id: 'caseStudy-indispare',
  title: 'Indispare – Pan-India B2B E-Commerce Marketplace Development',
  slug: { current: 'indispare' },
  eyebrow: 'CASE STUDY',
  category: 'B2B Marketplace & Mobile Engineering',
  industry: 'Industrial Manufacturing & E-Commerce',
  client: 'Indispare',
  location: 'Pan-India',
  shortDescription:
    'Comprehensive B2B industrial spare parts procurement ecosystem featuring React web and mobile apps, AI-powered product search, automated RFQ price comparisons, and pin-code logistics routing.',
  heroImage: { asset: { url: '/casestudy-thumbs/indispare.png' } },
  featureImage: '/casestudy-thumbs/indispare.png',
  projectMeta: [
    { label: 'CLIENT', value: 'Indispare' },
    { label: 'SOLUTION', value: 'Pan-India B2B Industrial E-Commerce Ecosystem' },
    { label: 'INDUSTRY', value: 'Industrial Manufacturing / B2B E-Commerce' },
    {
      label: 'CAPABILITIES',
      value: 'Web App (React) • Mobile Apps (iOS/Android) • Elasticsearch AI Search • RFQ Automation • Logistics Engine',
    },
  ],
  metrics: [
    {
      value: '40%',
      label: 'Conversion Rate',
      description: 'Achieved across registered manufacturing and industrial buyers',
    },
    {
      value: '200%',
      label: 'Revenue Growth',
      description: 'Delivered in the months following nationwide marketplace rollout',
    },
    {
      value: '1M+ SKUs',
      label: 'Product Varieties Cataloged',
      description: 'Managed across 300+ onboarded sellers and 15 industrial categories',
    },
    {
      value: '98%',
      label: 'On-Time Delivery Rate',
      description: 'Automated courier selection powered by pin-code logistics routing',
    },
  ],
  executiveSummary: {
    title: 'Executive Impact Snapshot',
    subtitle: 'Overcoming Procurement Gridlock in Industrial Manufacturing',
    paragraphs: [
      'Unforeseen equipment failure leads to costly factory downtime. For the Indian manufacturing sector, the primary hurdle isn’t just the breakdown itself, but the extended downtime caused by fragmented procurement processes.',
      'Before Indispare, there was no centralized platform for buyers to easily purchase, and sellers to easily list, industrial spare parts. The industry relied on manual phone calls, delayed delivery, pricing ambiguity, and risk of counterfeit components. Travash engineered Indispare as a comprehensive Pan-India digital procurement solution featuring React web apps, cross-platform mobile apps, AI-powered search, and automated RFQ price comparisons.',
    ],
  },
  challenge: {
    title: 'The Operational Challenge',
    subtitle: 'Procurement Gridlock, Shipment Delays, and Counterfeit Risks',
    content:
      'Industrial manufacturing plants faced crippling operational bottlenecks when sourcing critical spare components:',
    points: [
      'Delayed Delivery & Complex Procurement: Lack of real-time ordering and persistent monitoring caused shipment delays.',
      'Pricing & Quality Ambiguity: Buyers struggled with limited price comparison and high exposure to counterfeit parts.',
      'Absence of Technical Transparency: Difficulties evaluating exact technical specs and lack of warranty tracking.',
      'High Catalog Complexity: Sourcing across 1M+ distinct industrial part numbers without structured search indexing.',
    ],
  },
  complexity: {
    title: 'A Data-Driven B2B Ecosystem',
    intro:
      'Travash designed dedicated digital environments for both sellers and buyers to ensure a frictionless procurement cycle:',
    items: [
      {
        title: 'THE SELLER PORTAL',
        description: 'Comprehensive dashboard for supply store owners featuring bulk uploads, dynamic pricing, and warehouse control.',
      },
      {
        title: 'THE BUYER PORTAL',
        description: 'Urgent parts procurement for factory production managers with AI reverse image search, voice search, and warranty tracking.',
      },
      {
        title: 'AUTOMATED RFQ ENGINE',
        description: 'Request for Quote automation providing instant competitive comparisons (L1, L2, L3 supplier tiers).',
      },
      {
        title: 'PIN-CODE LOGISTICS SELECTION',
        description: 'Automated courier routing matching local inventory with nearest transport hubs for same-day delivery.',
      },
    ],
  },
  approach: {
    title: 'Travash Approach',
    intro: 'Extensive R&D, User Persona Modeling, and Scalable Multi-Sided Architecture.',
    steps: [
      {
        stepNumber: '01',
        title: 'R&D & User Persona Modeling',
        description: 'Researched pain points of factory production managers and industrial supply store owners across major industrial hubs.',
      },
      {
        stepNumber: '02',
        title: 'Intuitive Technical UI/UX',
        description: 'Designed high-clarity interfaces tailored for effortless exploration of complex technical part specifications.',
      },
      {
        stepNumber: '03',
        title: 'Elasticsearch AI Engine',
        description: 'Implemented advanced semantic, voice, and reverse-image search across 1,000,000+ cataloged product SKUs.',
      },
      {
        stepNumber: '04',
        title: 'Automated RFQ & Dynamic Pricing',
        description: 'Engineered multi-vendor quote generation allowing buyers to compare pricing tiers seamlessly.',
      },
      {
        stepNumber: '05',
        title: 'Cross-Platform Mobile Launch',
        description: 'Deployed high-performance React Native mobile apps for iOS and Android with offline-first field caching.',
      },
    ],
  },
  solution: {
    title: 'The Solution',
    intro: 'Unified Platform Architecture Connecting Industrial Suppliers with Manufacturing Plants',
    items: [
      {
        title: 'The Seller Portal (Inventory & Order Management)',
        description: 'Seamless seller onboarding, verification, bulk CSV uploads, dynamic pricing, warehouse management, and invoice tracking.',
      },
      {
        title: 'The Buyer Portal (Procurement & Technical Assessment)',
        description: 'AI-powered search for 1M+ genuine parts, automated RFQ generation with L1/L2/L3 comparisons, and real-time order tracking.',
      },
      {
        title: 'Administrative & Logistics Engine',
        description: 'Automated courier selection based on pin codes and products, alongside spend analytics for predictive inventory planning.',
      },
      {
        title: 'Cross-Platform React Native Apps',
        description: 'Native iOS and Android applications enabling plant engineers to photograph broken parts and order replacements from the factory floor.',
      },
    ],
  },
  solutionArchitecture: {
    title: 'Platform Architecture',
    intro:
      'React Web & Mobile Clients → API Gateway (Laravel MVC) → Elasticsearch AI Engine / MySQL Relational DB → Redis Cache → AWS Cloud Infrastructure & Logistics Integrations.',
    image: { asset: { url: '/casestudy-img/arctature-daigram.webp' } },
    caption: 'Figure: Indispare High-Concurrency B2B Marketplace & Logistics Architecture',
  },
  technologyStack: [
    {
      category: 'Frontend & Mobile Interface',
      technologies: ['React.js', 'React Native (iOS & Android)', 'HTML5', 'Tailwind CSS'],
      description: 'Unified responsive web platform and native mobile apps for procurement managers on the go.',
    },
    {
      category: 'Backend Architecture',
      technologies: ['Laravel MVC', 'Headless API Framework', 'Microservices'],
      description: 'High-throughput transactional backend handling complex B2B business logic and invoicing.',
    },
    {
      category: 'Search & AI Intelligence',
      technologies: ['Elasticsearch Cluster', 'AI Reverse Image Search', 'Voice Recognition'],
      description: 'Sub-100ms multi-faceted query resolution across 1,000,000+ technical part variations.',
    },
    {
      category: 'Database & Cloud Infrastructure',
      technologies: ['MySQL Enterprise', 'AWS S3', 'Redis Cache', 'Elastic Load Balancers'],
      description: 'High-availability cloud environment engineered for zero downtime and rapid catalog rendering.',
    },
  ],
  impact: {
    title: 'The Digital Transformation Impact',
    subtitle: 'From Fragmented Phone Calls to 40% Conversion and 200% Revenue Growth',
    content:
      'The launch of Indispare modernized the industrial supply chain across India, delivering exceptional business velocity and customer satisfaction.',
    outcomes: [
      '40% conversion rate achieved across registered industrial enterprise buyers',
      '200% revenue growth realized following marketplace deployment',
      '300+ industrial sellers successfully onboarded with 1,000,000+ parts cataloged',
      '98% on-time delivery performance with automated pin-code courier dispatch',
      '30% repeat procurement rate driven by transparent RFQ quote comparisons',
      '4.5 / 5 customer satisfaction rating from factory plant managers',
    ],
  },
  beforeAfter: {
    title: 'Procurement Evolution: Before vs. After',
    subtitle: 'Transforming Industrial Machinery Spare Sourcing',
    beforeTitle: 'LEGACY INDUSTRIAL SOURCING',
    afterTitle: 'INDISPARE B2B MARKETPLACE',
    before: [
      'Costly factory downtime due to days spent calling fragmented distributors',
      'High risk of acquiring counterfeit parts without certified specifications',
      'Pricing opacity with no standardized comparison or quotation mechanism',
      'Unpredictable delivery dates leading to extended production interruptions',
      'Zero warranty tracking or digitized purchase records for accounting',
    ],
    after: [
      'Instant AI-powered part search across 1,000,000+ verified original components',
      'Strict seller onboarding and guaranteed genuine component verification',
      'Automated RFQ comparisons with transparent L1, L2, and L3 pricing tiers',
      '98% on-time delivery with automated pin-code routing and live shipment tracking',
      'Centralized digital invoices, warranty logs, and ERP spend analytics',
    ],
  },
  testimonial: {
    quote:
      'Indispare started as nothing more than a concept. I had a clear vision for a completely unique B2B solution to streamline spare parts sales and procurement, and I brought that raw idea directly to Travash. They didn’t just act as coders; they truly embraced the vision. They built the entire platform from scratch, turning a massive B2B industry challenge into a seamless, market-ready reality. If you have an ambitious idea and need a partner to bring it to life exactly as you envisioned, Travash is the team.',
    author: 'Bhushan Gupta',
    role: 'Founder',
    company: 'Indispare',
    image: { asset: { url: '/images/avatar-placeholder.svg' } },
  },
  whyItMatters: {
    title: 'Why This Matters for B2B Marketplaces',
    subtitle: 'Does Your Industry Struggle with Fragmented Supply Chains and Complex Catalogs?',
    items: [
      'Indexing massive catalogs with AI visual and voice search for rapid part identification',
      'Automating complex multi-tier RFQ quotation flows without administrative friction',
      'Connecting buyers, vendors, and logistics carriers on a single synchronized platform',
      'Providing native mobile access for field engineers directly at operational sites',
    ],
  },
  nextStep: {
    heading: 'The Next Step',
    content:
      'Looking to build a high-performance B2B marketplace or digitize industrial procurement? Travash combines deep marketplace architecture, modern mobile development, and scalable cloud engineering to turn complex operations into seamless platforms.',
    primaryCTA: { label: 'Discuss a B2B Marketplace Initiative', href: '#contact' },
    secondaryCTA: { label: 'Explore AI Search Architecture', href: '#contact' },
  },
  technicalHighlights: [
    { label: 'Catalog Scale', value: '1M+ SKUs', subtext: '15 industrial categories', icon: 'database' },
    { label: 'Conversion', value: '40%', subtext: 'High-intent buyer checkout', icon: 'chart' },
    { label: 'AI Search', value: '< 100ms', subtext: 'Elasticsearch image & voice', icon: 'cpu' },
    { label: 'Mobile First', value: 'iOS & Android', subtext: 'React Native factory app', icon: 'smartphone' },
  ],
  walkthroughSteps: [
    {
      stepNumber: '01',
      title: 'The Seller Portal (Inventory & Order Management)',
      description:
        'Developed a comprehensive vendor dashboard allowing industrial supply store owners to easily manage their business online. Features bulk product uploads, dynamic pricing controls, real-time inventory management, and automated invoice generation.',
      subItems: [
        { label: 'Bulk Ingestion', text: 'CSV / Excel catalog synchronization for tens of thousands of SKUs.' },
        { label: 'Dynamic Margins', text: 'Automated price calculation based on quantity and payment terms.' },
      ],
    },
    {
      stepNumber: '02',
      title: 'The Buyer Portal (Procurement & Technical Assessment)',
      description:
        'Designed specifically for plant production managers who need parts urgently to minimize factory downtime. Incorporates AI reverse-image and voice search across 1,000,000+ cataloged components.',
      subItems: [
        { label: 'Visual Match', text: 'Plant engineers snap a photo of a broken part to find exact replacements.' },
      ],
    },
    {
      stepNumber: '03',
      title: 'Automated RFQ Generation & L1/L2/L3 Comparison',
      description:
        'Buyers generate instant Requests for Quotes with one click. The platform automatically aggregates quotes from multiple verified sellers, displaying transparent L1, L2, and L3 cost breakdowns.',
      callout: {
        title: 'Price Transparency',
        text: 'Automated RFQs eliminate phone negotiations and deliver immediate competitive procurement visibility.',
        badge: 'Automated',
      },
    },
    {
      stepNumber: '04',
      title: 'Administrative & Logistics Dispatch Engine',
      description:
        'To fulfill same-day delivery promises, the backend automatically evaluates recipient pin codes and selects optimal logistics partners, ensuring 98% on-time delivery across the country.',
    },
  ],
}

// ----------------------------------------------------------------------
// 6. I4C Bank Portal: Central Government of India API Status Dashboard
// ----------------------------------------------------------------------
export const DEFAULT_I4C_DATA: CaseStudyData = {
  _id: 'caseStudy-i4c',
  title: 'Architecting the I4C API Status Dashboard for the Central Government of India',
  slug: { current: 'i4c-bank-portal' },
  eyebrow: 'CASE STUDY',
  category: 'National Cyber Security & Public Sector Infrastructure',
  industry: 'Banking & Financial Services / Government',
  client: 'Central Government of India',
  location: 'Pan-India',
  shortDescription:
    'Pan-India financial fraud mitigation portal and real-time API status dashboard connecting national helplines with major Indian banks to freeze fraudulent accounts and retrieve stolen funds within seconds.',
  heroImage: { asset: { url: '/casestudy-thumbs/i4c.png' } },
  featureImage: '/casestudy-thumbs/i4c.png',
  projectMeta: [
    { label: 'CLIENT', value: 'Central Government of India (Delhi Central Gov Partner)' },
    { label: 'SOLUTION', value: 'I4C API Status Dashboard & Bank Lien Intercept' },
    { label: 'INDUSTRY', value: 'Public Sector / National Cyber Crime Prevention' },
    {
      label: 'CAPABILITIES',
      value: 'National API Integration • Real-Time Inter-Bank Lien Freezes • AI Transaction Failure Analytics • High Concurrency',
    },
  ],
  metrics: [
    {
      value: '₹100M+',
      label: 'Stolen Funds Intercepted',
      description: 'Citizen assets frozen before cyber scammers could cash out',
    },
    {
      value: '< 60s',
      label: 'Inter-Bank Freeze Execution',
      description: 'Sub-minute automated API dispatch across participating banking rails',
    },
    {
      value: 'All Major Banks',
      label: 'National Banking Network',
      description: 'Direct API integration with Axis Bank, Bank of Baroda, Bank of India, etc.',
    },
    {
      value: 'Delhi Central Gov',
      label: 'Technology Partner',
      description: 'Nation-scale mission-critical infrastructure',
    },
  ],
  executiveSummary: {
    title: 'Executive Impact Snapshot',
    subtitle: 'The Speed of Digital Fraud: Stopping Money Laundering Across Disparate Banking Rails',
    paragraphs: [
      'When a citizen falls victim to digital financial fraud, every second counts. Scammers rapidly transfer stolen funds across multiple accounts and different banking institutions to avoid detection. Historically, communicating with dozens of independent banks across India to raise disputes and freeze accounts was a slow, manual paperwork process.',
      'As the chosen technology partner for the Delhi Central Government, Travash engineered the I4C Bank Portal and API Status Dashboard. Our strategy was to replace fragmented communication with a unified, real-time API ecosystem directly connected with all major Indian banks, utilizing AI to continuously monitor transaction metrics, understand technical failure patterns, and instantly execute account lien freezes.',
    ],
  },
  challenge: {
    title: 'The Operational Challenge',
    subtitle: 'The Golden Hour: Intercepting Rapid Mule-Account Hopping',
    content:
      'Digital financial scammers exploit speed, hopping stolen money through cascading bank accounts before victims can report the incident:',
    points: [
      'Cascading Transactions: Stolen funds are split and moved across five or more banks within minutes.',
      'Manual Coordination Latency: Paper-based notifications reached bank branches long after funds had been withdrawn at ATMs.',
      'Heterogeneous Banking APIs: Inconsistent technical interfaces and error protocols across independent national banks.',
      'High Concurrency Demands: Thousands of simultaneous cyber fraud complaints logged across national helplines during peak hours.',
    ],
  },
  complexity: {
    title: 'National Scale API Architecture',
    intro:
      'Connecting a central government apparatus to the entire country’s banking infrastructure required absolute reliability, zero latency, and military-grade encryption:',
    items: [
      {
        title: 'INSTANT LIEN PLACEMENT',
        description: 'Executing automated API commands to freeze disputed amounts in recipient accounts before withdrawal via ATM, POS, or cheque.',
      },
      {
        title: 'AI FAILURE PATTERN MONITORING',
        description: 'Detecting hourly failure trends (e.g., "Service Unavailable" or "Invalid RRN") to instantly isolate specific bank integration glitches.',
      },
      {
        title: 'UNIFIED HELPLINE INGESTION',
        description: 'Aggregating incident tickets from the National Cybercrime Portal and the 1930 Citizen Helpline into one single pane of glass.',
      },
      {
        title: 'GRANULAR AUDIT TRAIL',
        description: 'Generating cryptographically signed evidentiary logs for law enforcement investigation and court prosecution.',
      },
    ],
  },
  approach: {
    title: 'Travash Approach',
    intro: 'A National API Nerve Center Powered by Real-Time Telemetry and Automated Lien Dispatch.',
    steps: [
      {
        stepNumber: '01',
        title: 'National Complaint Aggregation',
        description: 'Ingest verified Crime IDs and citizen reports from the National Cybercrime Portal and 1930 Helpline.',
      },
      {
        stepNumber: '02',
        title: 'Automated Banking API Bridges',
        description: 'Establish standardized high-concurrency API bridges connecting all major public and private sector banks.',
      },
      {
        stepNumber: '03',
        title: 'Sub-Minute Lien Freeze Execution',
        description: 'Dispatch immediate account freeze commands to recipient banks locking disputed funds automatically.',
      },
      {
        stepNumber: '04',
        title: 'AI-Driven Metric & Failure Diagnostics',
        description: 'Analyze real-time transaction success rates and categorize failure codes to diagnose bank connectivity bottlenecks.',
      },
      {
        stepNumber: '05',
        title: 'Prosecution Evidence Reporting',
        description: 'Provide law enforcement officials with deep filtering, audit histories, and court-ready financial trace dossiers.',
      },
    ],
  },
  solution: {
    title: 'The Solution',
    intro: 'Key Capabilities of the I4C API Status Dashboard',
    items: [
      {
        title: 'Unified Complaint Ingestion',
        description: 'Aggregates fraud reports from multiple national sources into a single, unified source of truth for every reported crime.',
      },
      {
        title: 'Instant "Lien" (Account Freeze) Execution',
        description: 'Sends automated API commands to recipient banks to lock disputed amounts across ATM, POS, and cheque withdrawal channels.',
      },
      {
        title: 'AI-Driven Bank Performance & Failure Monitoring',
        description: 'Real-time transaction metrics analyzing failure codes hourly to identify and rectify banking integration bottlenecks.',
      },
      {
        title: 'Granular Auditing & Prosecution Reporting',
        description: 'Filters data by date ranges, specific banks, and Crime IDs to trace total amounts frozen and recovered for citizens.',
      },
    ],
  },
  solutionArchitecture: {
    title: 'Application Architecture',
    intro:
      'Citizen Complaints (Cybercrime Portal / 1930 Helpline) → I4C National Command Portal → AI Diagnostics & Transaction Engine → Secure Bank API Gateways (Axis, Baroda, BOI, etc.) → Instant Lien Execution → Auditing & Recovery Dashboard.',
    image: { asset: { url: '/casestudy-img/arctature-daigram.webp' } },
    caption: 'Figure: I4C Pan-India Real-Time Inter-Bank Fraud Mitigation Architecture',
  },
  technologyStack: [
    {
      category: 'Backend Architecture',
      technologies: ['High-Concurrency Enterprise Java', 'Spring Boot', 'RESTful Banking Connectors'],
      description: 'Engineered to handle massive volumes of concurrent API transactions with national financial institutions.',
    },
    {
      category: 'AI & Analytics Engine',
      technologies: ['Machine Learning Telemetry', 'Predictive Failure Analysis Engine'],
      description: 'Monitors transaction success rates, categorizes failure patterns, and detects banking gateway anomalies.',
    },
    {
      category: 'Frontend Interface',
      technologies: ['React.js', 'Next.js', 'Tailwind CSS', 'Real-Time WebSocket Dashboards'],
      description: 'Zero-latency live operational dashboard designed for government officials and cybercrime coordinators.',
    },
    {
      category: 'Security Protocols',
      technologies: ['Military-Grade Encryption', 'Field-Level AES-256', 'Strict RBAC Governance'],
      description: 'Ensures sensitive citizen and financial data remains uncompromised across all inter-bank exchanges.',
    },
  ],
  impact: {
    title: 'The Digital Transformation Impact',
    subtitle: 'From Chasing Paperwork to Freezing Fraudulent Accounts in Sub-Minutes',
    content:
      'The deployment of the I4C API Status Dashboard fundamentally transformed how India combats cyber financial fraud, giving authorities real-time power to protect citizen funds.',
    outcomes: [
      'Successfully incorporated all major Indian banks into one centralized, AI-monitored portal',
      'Over ₹100,000,000 in stolen funds intercepted and saved from cash-out',
      'Account freeze dispatch latency dropped from days of paperwork to under 60 seconds',
      'AI failure analysis empowered technical teams to resolve bank connection errors in real time',
      'Provided transparent, auditable evidentiary logs for criminal investigation and asset restitution',
    ],
  },
  beforeAfter: {
    title: 'Fraud Mitigation: Before vs. After',
    subtitle: 'Transforming National Cybercrime Intercept Capabilities',
    beforeTitle: 'LEGACY FRAUD RESPONSE',
    afterTitle: 'I4C API PLATFORM',
    before: [
      'Manual paperwork sent via email or postal courier to individual bank branches',
      'Scammers cashed out stolen funds at ATMs within minutes of transfer',
      'Zero real-time visibility into whether banks had received or processed hold notices',
      'Technical errors at individual banks went unnoticed for days',
      'Fragmented data silos hindering police tracking of multi-bank mule accounts',
    ],
    after: [
      'Automated API dispatch placing immediate liens on accounts across all major banks',
      'Funds locked across ATM, POS, and cheque withdrawal channels in under 60 seconds',
      'Real-time live status dashboards tracking every API request and acknowledgement',
      'AI monitoring alerts government engineers to bank integration glitches instantly',
      'Unified Crime ID trace dossiers providing complete evidentiary records for court',
    ],
  },
  testimonial: {
    quote:
      "Travash is our technology partner and the backbone of our national fight against cyber fraud. They engineer and manage the massive coordination application we rely on to track fraudsters in real-time, halt malicious activities, and recover stolen funds. Thanks to their robust infrastructure and deep expertise, we are saving millions of citizens' hard-earned rupees. Travash stands shoulder-to-shoulder with us on the frontlines, using technology to protect the nation.",
    author: 'Senior Leadership & National Coordinator',
    role: 'National Coordinator',
    company: 'i4C',
    image: { asset: { url: '/casestudy-img/I4c.svg' } },
  },
  whyItMatters: {
    title: 'Why This Matters for Mission-Critical Public Sector Platforms',
    subtitle: 'Could Your Agency Benefit from Real-Time Inter-Institutional API Coordination?',
    items: [
      'Unifying heterogeneous third-party institutional APIs into a standardized command gateway',
      'Eliminating operational latency in time-sensitive compliance and enforcement actions',
      'Deploying AI monitoring to diagnose technical integration failures across massive networks',
      'Maintaining military-grade encryption and immutable audit trails for statutory legal proceedings',
    ],
  },
  nextStep: {
    heading: 'The Next Step',
    content:
      'Looking to architect mission-critical government infrastructure, national API gateways, or automated compliance platforms? Travash engineers enterprise-grade solutions built for nation-scale security, speed, and reliability.',
    primaryCTA: { label: 'Discuss a Public Sector Technology Initiative', href: '#contact' },
    secondaryCTA: { label: 'Explore High-Concurrency Architecture', href: '#contact' },
  },
  technicalHighlights: [
    { label: 'Funds Saved', value: '₹100M+', subtext: 'Citizen assets intercepted', icon: 'shield' },
    { label: 'Response', value: '< 60s', subtext: 'Sub-minute automated lien freeze', icon: 'zap' },
    { label: 'Integration', value: 'All Banks', subtext: 'Major national banking network', icon: 'layers' },
    { label: 'Security', value: 'Military', subtext: 'Field-level AES-256 & RBAC', icon: 'lock' },
  ],
  walkthroughSteps: [
    {
      stepNumber: '01',
      title: 'Unified Complaint Ingestion & Verification',
      description:
        'The system aggregates fraud reports from multiple national sources, including the National Cybercrime Portal and the 1930 Helpline, establishing a single verified source of truth for every incident.',
      subItems: [
        { label: 'Crime ID Validation', text: 'Normalizes incident data, disputed amount, and recipient account numbers.' },
      ],
    },
    {
      stepNumber: '02',
      title: 'Instant "Lien" (Account Freeze) Execution',
      description:
        'When a fraud is verified, the portal dispatches high-priority API calls to the receiving bank to place an immediate "Lien" on the disputed funds, freezing account balances across ATM, POS, and cheque channels.',
      subItems: [
        { label: 'Sub-Minute Freezes', text: 'Direct bank risk engine webhooks trigger automated hold placement.' },
      ],
    },
    {
      stepNumber: '03',
      title: 'AI-Driven Bank Performance & Failure Monitoring',
      description:
        'The dashboard provides real-time transaction metrics and bank performance tracking. AI algorithms analyze failure trends per hour—such as "Service Unavailable" or "Invalid RRN"—allowing technical teams to fix bank connection issues immediately.',
      callout: {
        title: 'Continuous Telemetry',
        text: 'AI detects bank downtime anomalies before they compromise emergency freeze operations.',
        badge: 'Real-Time',
      },
    },
    {
      stepNumber: '04',
      title: 'Granular Auditing & Prosecution Reporting',
      description:
        'Officials filter data by date ranges, specific banks, and Crime IDs, producing an immutable auditable trail of transactions sent, acknowledged, successfully frozen, and returned to citizens.',
    },
  ],
}

// ----------------------------------------------------------------------
// 7. Dovehouse Capital: High-Speed Web Architecture (Danish Minimalist SPA)
// ----------------------------------------------------------------------
export const DEFAULT_DOVEHOUSE_DATA: CaseStudyData = {
  _id: 'caseStudy-dovehouse',
  title: 'High-Speed Web Architecture: Danish Minimalist Digital Presence for Dovehouse Capital',
  slug: { current: 'dovehouse' },
  eyebrow: 'CASE STUDY',
  category: 'High-Performance Web Architecture',
  industry: 'Financial Advisory & Algorithmic Trading',
  client: 'Dovehouse Capital',
  location: 'Denmark / Global',
  shortDescription:
    'Lightning-fast, zero-latency Single Page Application (SPA) pairing a Danish Minimalist aesthetic with purposeful micro-animations to demystify complex AI-driven dynamic heuristic investment strategies.',
  heroImage: { asset: { url: '/casestudy-thumbs/protectly.png' } },
  featureImage: '/casestudy-thumbs/protectly.png',
  projectMeta: [
    { label: 'CLIENT', value: 'Dovehouse Capital (Martin Rasmussen & Claus Rosenberg Gotthard)' },
    { label: 'SOLUTION', value: 'High-Speed Web Architecture & Danish Minimalist SPA' },
    { label: 'INDUSTRY', value: 'Global Financial Advisory / Algorithmic Trading' },
    {
      label: 'CAPABILITIES',
      value: 'React.js SPA Architecture • Next.js SSR • Danish Minimalist UI/UX • Framer Motion • Zero-Latency Transitions',
    },
  ],
  metrics: [
    {
      value: '< 0.8s',
      label: 'Page Load Time',
      description: 'Dropped to sub-second instantaneous initial rendering',
    },
    {
      value: 'Zero Latency',
      label: 'Fluid Page Transitions',
      description: '100% fluid interactions via Single Page Application (SPA) architecture',
    },
    {
      value: 'Danish Minimalist',
      label: 'Elevated Brand Perception',
      description: 'Purposeful whitespace, crisp typography, and Nordic elegance',
    },
    {
      value: '2025 Advisory',
      label: 'Institutional Credibility',
      description: 'Built on over two decades of European investment mastery',
    },
  ],
  executiveSummary: {
    title: 'Executive Snapshot',
    subtitle: 'The Digital Credibility Dilemma in Algorithmic Wealth Advisory',
    paragraphs: [
      'Established in 2025 by Martin Rasmussen and Claus Rosenberg Gotthard, Dovehouse Capital is a global advisory firm built on over two decades of European investment mastery. Their mission is ambitious: to demystify the hedge fund realm, democratize access to high returns, and forge enduring partnerships.',
      'Their trading approach is highly sophisticated—a three-strategy platform driven by AI, machine learning, and dynamic heuristics. However, traditional financial advisory websites are notoriously dense, slow to load, and visually cluttered. Dovehouse needed a digital platform that did not just tell investors they were fast, modern, and transparent—it needed to demonstrate it through a flawless, high-speed digital experience.',
    ],
  },
  challenge: {
    title: 'The Backstory',
    subtitle: 'Overcoming the Clunky Legacy Finance Standard',
    content:
      'Translating complex, high-tech algorithmic trading into an engaging digital experience presented three major obstacles:',
    points: [
      'The Clunky Finance Standard: Traditional finance websites are dense, slow, and visually noisy, creating friction for prospective investors.',
      'The Speed Disconnect: Dovehouse operates using high-speed algorithmic trading. A slow, multi-page site would contradict their technological agility.',
      'The Jargon Barrier: They needed to explain dynamic heuristic investing without overwhelming users, requiring ultimate transparency and visual storytelling.',
    ],
  },
  complexity: {
    title: 'Design & Engineering Harmony',
    intro:
      'Travash architected the platform around a highly dynamic React framework paired with a Danish Minimalist design philosophy:',
    items: [
      {
        title: 'DANISH MINIMALIST UI/UX',
        description: 'Stripping away visual noise, utilizing generous negative space and crisp typography to center focus on core investment pillars.',
      },
      {
        title: 'REACT APP-LIKE NAVIGATION',
        description: 'Eliminating traditional browser page reloads with instantaneous, zero-latency SPA state transitions.',
      },
      {
        title: 'FLUID MOTION GRAPHICS',
        description: 'Layering custom Framer Motion animations to humanize complex AI and machine learning concepts elegantly.',
      },
      {
        title: 'INTERACTIVE STORYTELLING',
        description: 'Guiding high-net-worth investors through the Three Core Investment Strategies without relying on dense PDFs.',
      },
    ],
  },
  approach: {
    title: 'Travash Approach',
    intro: 'Danish Minimalism Meets High-Performance React Architecture.',
    steps: [
      {
        stepNumber: '01',
        title: 'Nordic Aesthetic System',
        description: 'Engineered a "less is more" design language with sophisticated muted tones and purposeful whitespace.',
      },
      {
        stepNumber: '02',
        title: 'React SPA Engineering',
        description: 'Built an app-like navigation model where switching between leadership and investment strategies occurs with zero latency.',
      },
      {
        stepNumber: '03',
        title: 'Framer Motion Dynamics',
        description: 'Designed silky-smooth cascade animations that visually guide investors through complex heuristic concepts.',
      },
      {
        stepNumber: '04',
        title: 'Institutional Trust Architecture',
        description: 'Highlighted founder credentials, regulatory governance, and algorithmic transparency on a single responsive canvas.',
      },
      {
        stepNumber: '05',
        title: 'Cross-Device Performance Tuning',
        description: 'Optimized bundle size and asset loading for flawless rendering on mobile devices across global time zones.',
      },
    ],
  },
  solution: {
    title: 'The Solution',
    intro: 'Key Dimensions of the Dovehouse Capital Digital Experience',
    items: [
      {
        title: 'The Danish Minimalist UI/UX',
        description: 'Generous negative space and crisp typography force attention directly onto core pillars: Integrity, Prosperity, and Strategic Flexibility.',
      },
      {
        title: 'React-Powered App-Like Navigation',
        description: 'Eliminates traditional page loads entirely. When users click between sections, transitions are instantaneous.',
      },
      {
        title: 'Fluid, Purposeful Animations',
        description: 'Elements fade, slide, and cascade gracefully as the user scrolls, making complex financial topics feel intuitive and engaging.',
      },
      {
        title: 'Interactive Strategy Storytelling',
        description: 'Walks potential investors through the firm’s three core investment models without relying on cumbersome PDF downloads.',
      },
    ],
  },
  solutionArchitecture: {
    title: 'Application Architecture',
    intro:
      'Global Investor Traffic → Next.js SSR (<0.8s Initial Render) → React SPA State Layer → Danish Minimalist UI/UX → Framer Motion Engine → Interactive Strategy Breakdown.',
    image: { asset: { url: '/casestudy-img/arctature-daigram.webp' } },
    caption: 'Figure: Dovehouse Capital High-Speed React SPA Architecture',
  },
  technologyStack: [
    {
      category: 'Frontend Framework',
      technologies: ['React.js', 'Next.js'],
      description: 'Optimized for sub-second initial render and zero-latency Single Page Application routing.',
    },
    {
      category: 'Styling & Design System',
      technologies: ['Tailwind CSS', 'HTML5'],
      description: 'Bespoke Nordic typography, high-contrast palette, and generous whitespace rules.',
    },
    {
      category: 'Motion & Interaction',
      technologies: ['Framer Motion', 'TypeScript'],
      description: 'Silky-smooth, 60fps micro-interactions and scroll-triggered narrative animations.',
    },
    {
      category: 'Performance & Edge Infrastructure',
      technologies: [
        'Sub-Second Global Edge Caching & Zero-Latency Routing',
        'Automated Image Optimization & Clean Semantic Layout',
      ],
      description: 'Lighthouse 98+ scores across performance, accessibility, and SEO.',
    },
  ],
  impact: {
    title: 'Measurable Business Impact',
    subtitle: 'Establishing Instant Institutional Credibility and Brand Distinction',
    content:
      'By aligning Dovehouse Capital’s digital presence with their operational excellence, the new platform established them as a modern leader in European wealth advisory.',
    outcomes: [
      'Average page load time plummeted from legacy finance standard of 3.5s to < 0.8 seconds',
      'Eliminated friction with 100% fluid, zero-latency Single Page Application navigation',
      'Elevated brand perception with a distinctive Danish Minimalist visual identity',
      'Transformed complex dynamic heuristics into engaging, transparent digital touchpoints',
      'Delivered flawless cross-device performance for global high-net-worth investors',
    ],
  },
  beforeAfter: {
    title: 'Digital Presence: Before vs. After',
    subtitle: 'Legacy Corporate Finance vs. Modern High-Speed SPA',
    beforeTitle: 'LEGACY FINANCE STANDARD',
    afterTitle: 'TRAVASH REACT PLATFORM',
    before: [
      '3.5 Seconds average page load time',
      'Hard browser reloads creating jarring navigation friction',
      'Cluttered, static layout filled with wall-to-wall text',
      'Dense downloadable PDFs required to understand investment strategies',
      'Degraded, slow mobile browsing experience',
    ],
    after: [
      '< 0.8 Seconds instantaneous initial render',
      'Instantaneous, zero-latency Single Page Application transitions',
      'Danish Minimalist design with purposeful negative space and dynamic motion',
      'Interactive, intuitive storytelling demystifying algorithmic trading models',
      '100% fluid, app-like responsiveness across all smartphone and tablet devices',
    ],
  },
  testimonial: {
    quote:
      'Our digital presence needed to reflect the speed, transparency, and sophistication of our AI-driven investment strategies. Travash took my vision for a clean, Danish minimalist aesthetic and engineered a lightning-fast platform that perfectly aligns with our brand. They listened to our guidance every step of the way, delivering a premium, zero-friction web experience that completely exceeded our expectations. Travash is an exceptional technology partner who truly understands how to build for the modern financial sector.',
    author: 'Claus Rosenberg Gotthard',
    role: 'Co-Founder & Managing Director',
    company: 'Dovehouse Capital',
    image: { asset: { url: '/images/avatar-placeholder.svg' } },
  },
  whyItMatters: {
    title: 'Why This Matters for Advisory & Wealth Management',
    subtitle: 'Does Your Website Contradict Your Technological Sophistication?',
    items: [
      'Replacing slow legacy corporate websites with sub-second modern web applications',
      'Using visual storytelling to demystify proprietary AI, machine learning, or financial models',
      'Building institutional trust with high-net-worth clients through pristine design aesthetics',
      'Eliminating user journey friction across both mobile and desktop viewports',
    ],
  },
  nextStep: {
    heading: 'The Next Step',
    content:
      'Ready to upgrade your digital presence and eliminate operational bottlenecks? Travash partners with ambitious firms to design, build, and deploy production-ready web platforms, AI agents, and enterprise integrations tailored to your brand.',
    primaryCTA: { label: 'Discuss a Premium Web Architecture', href: '#contact' },
    secondaryCTA: { label: 'Explore Frontend Design Consultation', href: '#contact' },
  },
  technicalHighlights: [
    { label: 'Page Load', value: '< 0.8s', subtext: 'Instantaneous SSR initial render', icon: 'zap' },
    { label: 'Transitions', value: 'Zero Latency', subtext: 'React SPA state navigation', icon: 'layers' },
    { label: 'Aesthetic', value: 'Nordic Minimal', subtext: 'Danish design language', icon: 'globe' },
    { label: 'Motion', value: '60 FPS', subtext: 'Framer Motion micro-animations', icon: 'cpu' },
  ],
  walkthroughSteps: [
    {
      stepNumber: '01',
      title: 'The Danish Minimalist UI/UX',
      description:
        'We engineered the user interface to breathe. Utilizing a "less is more" Nordic aesthetic, unnecessary data clutter was eliminated, focusing attention on core pillars: Integrity, Prosperity, and Strategic Flexibility.',
      subItems: [
        { label: 'Purposeful Whitespace', text: 'Enhances cognitive readability for high-net-worth investors.' },
      ],
    },
    {
      stepNumber: '02',
      title: 'React-Powered App-Like Navigation',
      description:
        'Built as a React-powered Single Page Application (SPA), traditional page reloads are eliminated. When navigating from leadership to investment models, transitions are instantaneous.',
      subItems: [
        { label: 'Zero Latency', text: 'Mirrors the agility and sub-second execution of algorithmic trading.' },
      ],
    },
    {
      stepNumber: '03',
      title: 'Fluid, Purposeful Animations',
      description:
        'To inject the human touch that Dovehouse prides itself on, custom Framer Motion animations layer smoothly throughout the user journey, fading, sliding, and cascading into place as investors scroll.',
      callout: {
        title: 'Visual Storytelling',
        text: 'Abstract AI and heuristic concepts are made intuitive through dynamic visual cues.',
        badge: 'Fluid UX',
      },
    },
    {
      stepNumber: '04',
      title: 'Interactive Storytelling Without Dense PDFs',
      description:
        'Guides potential investors through the firm’s Three Core Investment Strategies directly in the browser, highlighting founder credentials and institutional trust without external document barriers.',
    },
  ],
}

// ----------------------------------------------------------------------
// 8. PEKT: Construction Management & Task Tracking Platform
// ----------------------------------------------------------------------
export const DEFAULT_PEKT_DATA: CaseStudyData = {
  _id: 'caseStudy-pekt',
  title: 'PEKT: Dynamic Automation for Streamlining All Construction Management Activities',
  slug: { current: 'pekt' },
  eyebrow: 'CASE STUDY',
  category: 'Construction Management Mobile App',
  industry: 'Real Estate & Construction',
  client: 'PEKT - Product Development (India)',
  location: 'India / Global',
  shortDescription:
    'A centralized mobile platform designed to eliminate on-site tracking fragmentation and automate daily construction workflows.',
  heroImage: { asset: { url: '/images/portfolio/pekt.webp' } },
  featureImage: '/images/portfolio/pekt.webp',
  projectMeta: [
    { label: 'CLIENT', value: 'PEKT - Product Development (India)' },
    { label: 'SOLUTION', value: 'Construction Management Mobile App' },
    { label: 'INDUSTRY', value: 'Real Estate & Construction' },
    {
      label: 'CAPABILITIES',
      value: 'Mobile App Development (React Native) • UI/UX Design • Workflow Automation • Real-Time Inventory Tracking',
    },
  ],
  metrics: [
    {
      value: '40%',
      label: 'Time Savings Achieved',
      description: 'Achieved in daily task management workflows',
    },
    {
      value: '60%',
      label: 'Overall Productivity Improvement',
      description: 'For on-site execution across engineering teams',
    },
    {
      value: '98%',
      label: 'Accuracy Maintained',
      description: 'Maintained for inventory and daily expenses',
    },
    {
      value: '100%',
      label: 'Daily Report Generation Rate',
      description: 'Achieved across deployed construction sites',
    },
  ],
  executiveSummary: {
    title: 'Executive Summary',
    subtitle: 'Automating Daily Task Tracking & Elevating On-Site Project Visibility',
    paragraphs: [
      'PEKT is an intuitive, mobile-first construction management application engineered to automate daily task tracking, streamline resource allocation, and manage on-site progress.',
      'Designed specifically for site execution, it delivers a dynamic, real-time ecosystem to eliminate administrative gridlock and elevate project visibility for builders and construction companies.',
    ],
  },
  challenge: {
    title: 'The Challenge',
    subtitle: 'Modernizing Legacy Task Tracking & Eliminating On-Site Management Bottlenecks',
    content:
      'Construction companies needed to modernize legacy task tracking and eliminate on-site management bottlenecks. The existing tracking process relied heavily on complex applications suited only for office professionals, hindering efficient, minute-to-minute record-keeping for the teams actively working on the ground.\n\nThe challenge was to reduce the complexity of existing tracking methods without sacrificing the granular data required for proactive decision management.',
    pointsLabel: 'SITE ENGINEERS NEEDED TO IDENTIFY :',
    points: [
      'Overcoming manual and fragmented daily task updates with intuitive mobile solutions',
      'Ensuring real-time stock notifications to enable prompt action for low inventory situations',
      'Establishing precise contract worker attendance systems for accurate wage payments',
      'Integrating on-site progress data into unified, digitized daily status reports',
    ],
  },
  complexity: {
    title: 'The Complexity',
    intro: 'Key operational challenges faced during on-site field execution:',
    items: [
      {
        title: 'ON-SITE FRAGMENTATION',
        description: 'Managing daily tasks and minute-to-minute progress effectively in a chaotic field environment.',
      },
      {
        title: 'INVENTORY DISCREPANCIES',
        description: 'Tracking raw materials, stock levels, and daily expenses without real-time synchronization.',
      },
      {
        title: 'FINANCIAL TRACKING',
        description: 'Monitoring highly variable contract worker attendance and ensuring accurate wage calculations.',
      },
      {
        title: 'MOBILE ACCESSIBILITY',
        description: 'Engineering an interface that non-technical site workers can use seamlessly without extensive training.',
      },
    ],
  },
  approach: {
    title: 'Travash Approach',
    intro: 'Automate Task Tracking. Empower Site Engineers.',
    steps: [
      {
        stepNumber: '01',
        title: 'DISCOVER',
        description: 'Mapped out the core bottlenecks in existing construction apps that hindered on-site workers.',
      },
      {
        stepNumber: '02',
        title: 'WIREFRAME',
        description: 'Initiated a real-time card sorting process and created low-resolution wireframes for rigorous user testing.',
      },
      {
        stepNumber: '03',
        title: 'ARCHITECT',
        description: 'Designed a highly accessible mobile-first infrastructure to handle daily task ingestion directly from the field.',
      },
      {
        stepNumber: '04',
        title: 'AUTOMATE',
        description: 'Deployed automated notification engines to instantly alert project managers regarding critical stock details.',
      },
      {
        stepNumber: '05',
        title: 'INTEGRATE',
        description: 'Connected worker attendance, daily expenses, and raw material tracking into a single, unified database.',
      },
    ],
  },
  solution: {
    title: 'The Solution',
    intro: 'PEKT – A Dynamic Construction Management Platform',
    items: [
      {
        title: 'MOBILE-FIRST TASK TRACKING',
        description: 'Allows site engineers to use mobile devices for instantaneous daily task updates and regular status reports.',
      },
      {
        title: 'AUTOMATED STOCK ALERTS',
        description: 'The Project Manager receives instant stock status notifications, enabling proactive decision management for low stock situations.',
      },
      {
        title: 'PRECISE WAGE MANAGEMENT',
        description: 'Site engineers can monitor contract worker attendance effortlessly, guaranteeing precise wage payments.',
      },
      {
        title: 'DIGITIZED STATUS REPORTS',
        description: 'Transforms raw on-site data into 100% accurate, automatically generated daily status reports for management review.',
      },
    ],
  },
  solutionArchitecture: {
    title: 'Application Architecture',
    intro:
      'Field Engineers (React Native Mobile App) → API Microservices (PHP Laravel Framework) → Relational Database (MySQL) → Automated Stock Notification Dispatcher → Project Manager Status Dashboard.',
    image: { asset: { url: '/casestudy-img/arctature-daigram.webp' } },
    caption: 'Figure: PEKT Mobile Field Execution & Real-Time Alert Architecture',
  },
  technologyStack: [
    {
      category: 'MOBILE TECHNOLOGIES',
      technologies: ['React Native'],
      description: 'Mobile app development built for responsive on-site execution.',
    },
    {
      category: 'CLIENT-SIDE TECHNOLOGIES',
      technologies: ['UI/UX Design', 'HTML5', 'CSS3', 'JavaScript', 'jQuery'],
      description: 'Client-side design and web portal technology stack.',
    },
    {
      category: 'SERVER-SIDE TECHNOLOGIES',
      technologies: ['PHP (Laravel Framework)'],
      description: 'Backend services for task ingestion and notification engines.',
    },
    {
      category: 'DATABASE ARCHITECTURE',
      technologies: ['MySQL'],
      description: 'Structured database architecture for materials, tasks, and labor tracking.',
    },
  ],
  impact: {
    title: 'The Impact',
    subtitle: 'Turning Fragmented Field Operations Into a Streamlined Digital Platform',
    content:
      'Through user-centric design and scalable mobile software engineering, Travash enabled construction companies to achieve immediate operational velocity and absolute project visibility on-site.',
    outcomes: [
      'Achieved 40% time savings in daily task management through intuitive mobile interfaces',
      'Delivered a 60% overall productivity improvement for builders and site engineers',
      'Maintained 98% accuracy for inventory and daily expenses, eliminating manual errors',
      'Secured a 100% daily report generation rate achieved across deployed sites and an outstanding user satisfaction score of 4.7/5',
    ],
  },
  beforeAfter: {
    title: 'Before vs. After',
    subtitle: 'Modernizing On-Site Field Execution',
    beforeTitle: 'BEFORE PEKT APP',
    afterTitle: 'AFTER PEKT APP',
    before: [
      'Complex tracking apps suited for office professionals hindered real-time data entry on the ground.',
      'Manual inventory monitoring led to unexpected material shortages and project delays.',
      'Disjointed attendance tracking caused errors in contractor wage calculations.',
      'Compiling end-of-day progress required hours of manual paperwork and data entry.',
    ],
    after: [
      'A user-friendly mobile interface allows site engineers to log updates instantly from the field.',
      'Automated real-time notifications instantly alert managers of low stock for proactive decisions.',
      'Integrated attendance modules ensure 100% precise wage payments for contract workers.',
      '100% automated daily report generation delivers accurate status updates directly to management.',
    ],
  },
  testimonial: {
    heading: 'Client Perspective',
    intro: "Insights, expectations, and feedback from the client's point of view.",
    quote:
      'Travash transformed our real estate and construction tracking with the PEKT product they developed. Their expertise and commitment to client satisfaction are exceptional.',
    author: 'PEKT - Product Development (India)',
    role: 'Product Development',
    company: 'PEKT - Product Development (India)',
    image: { asset: { url: '/images/avatar-placeholder.svg' } },
  },
  whyItMatters: {
    title: 'Why This Matters',
    subtitle: 'THIS CASE STUDY IS RELEVANT FOR ORGANIZATIONS MANAGING complex on-site workflows, mobile field workforces, and dynamic inventory pipelines.',
    description:
      "The objective wasn't simply to build a tracking app; it was to eliminate the friction that prevented field workers from efficiently recording data. By delivering a user-centric mobile solution, enterprises can scale their construction operations seamlessly while retaining absolute visibility into daily progress.",
    items: [
      'Managing complex on-site workflows and field tracking',
      'Empowering mobile field workforces with low-friction tools',
      'Automating real-time stock notifications and dynamic inventory pipelines',
      'Retaining absolute visibility into daily construction progress and payroll precision',
    ],
  },
  nextStep: {
    heading: 'The Next Step',
    subtitle: 'Looking to Modernize a Mobile Field Workforce or Construction Workflow?',
    content:
      'Start with one clearly defined process to evaluate whether this high-tech, low-friction approach is right for your organization.',
    primaryCTA: { label: 'Discuss Mobile Field Workforce', href: '#contact' },
    secondaryCTA: { label: 'Explore Construction Automation', href: '#contact' },
  },
  contact: {
    heading: 'Ready to automate and solve operational bottlenecks?',
    description:
      'At Travash, we engineer enterprise-grade mobile and automation solutions that solve complex business challenges and streamline on-site operations.',
  },
  technicalHighlights: [
    { label: 'Time Saved', value: '40%', subtext: 'Daily task management workflows', icon: 'clock' },
    { label: 'Productivity', value: '60%', subtext: 'Overall productivity improvement', icon: 'chart' },
    { label: 'Accuracy', value: '98%', subtext: 'Inventory and daily expenses', icon: 'shield' },
    { label: 'Report Rate', value: '100%', subtext: 'Daily report generation rate', icon: 'smartphone' },
  ],
  walkthroughSteps: [
    {
      stepNumber: '01',
      title: 'DISCOVER & WIREFRAME',
      description:
        'Mapped out core bottlenecks in existing construction apps and initiated a real-time card sorting process with low-resolution wireframes for rigorous user testing.',
    },
    {
      stepNumber: '02',
      title: 'ARCHITECT MOBILE-FIRST INFRASTRUCTURE',
      description:
        'Designed a highly accessible mobile-first infrastructure with React Native to handle daily task ingestion directly from field engineers.',
    },
    {
      stepNumber: '03',
      title: 'AUTOMATED STOCK ALERTS & INVENTORY',
      description:
        'Deployed automated notification engines to instantly alert project managers regarding critical low stock details before work stoppages happen.',
    },
    {
      stepNumber: '04',
      title: 'INTEGRATED ATTENDANCE & STATUS REPORTING',
      description:
        'Connected worker attendance, daily expenses, and raw material tracking into a single unified database to produce 100% accurate daily status reports.',
    },
  ],
}

// ----------------------------------------------------------------------
// 9. Skipr: Autonomous Agentic VPN (Cybersecurity & Privacy SaaS)
// ----------------------------------------------------------------------
export const DEFAULT_SKIPR_DATA: CaseStudyData = {
  _id: 'caseStudy-skipr',
  title: 'SKIPR VPN: Redefining Online Privacy with the World’s First Fully Autonomous, Agentic VPN',
  slug: { current: 'skipr' },
  eyebrow: 'CASE STUDY',
  category: 'Autonomous AI & Privacy SaaS',
  industry: 'Cybersecurity & Online Privacy',
  client: 'Skipr VPN',
  location: 'Global SaaS',
  shortDescription:
    'Groundbreaking zero-knowledge VPN engineered from scratch with autonomous AI agents dynamically managing infrastructure, routine server burns with zero log retention, and 100% credential-free sign-up and payment.',
  heroImage: { asset: { url: '/casestudy-thumbs/protectly.png' } },
  featureImage: '/casestudy-thumbs/protectly.png',
  projectMeta: [
    { label: 'CLIENT', value: 'Skipr VPN' },
    { label: 'SOLUTION', value: 'Autonomous Agentic Zero-Knowledge VPN' },
    { label: 'INDUSTRY', value: 'Cybersecurity / Online Privacy / AI SaaS' },
    {
      label: 'CAPABILITIES',
      value: 'Zero-Knowledge Architecture • Autonomous AI Agents • Scheduled Server Burns • OpenVPN Protocol • Non-Custodial Payments',
    },
  ],
  metrics: [
    {
      value: 'Zero Knowledge',
      label: '100% Privacy Guarantee',
      description: 'Zero collection of names, emails, usernames, passwords, or IP logs',
    },
    {
      value: '100% Autonomous',
      label: 'Agent-Driven Infrastructure',
      description: 'AI agents manage server deployment, load balancing, and dynamic scaling',
    },
    {
      value: '+40%',
      label: 'Sign-Up & Adoption Growth',
      description: 'Driven by credential-free, trustless user onboarding',
    },
    {
      value: '+35%',
      label: 'User Retention Boost',
      description: 'Delivered by lightning-fast connections and frictionless single-tap toggles',
    },
  ],
  executiveSummary: {
    title: 'Project Overview & Introduction',
    subtitle: 'Redefining Digital Privacy with the World’s First Fully Autonomous, Agent-Driven VPN',
    paragraphs: [
      'Skipr VPN redefines digital privacy by introducing the first-ever autonomous, agent-driven VPN. It offers complete anonymity, untraceability, and untrackability—without relying on user credentials or human involvement. It is engineered as a next-generation, SaaS-powered solution for users who demand absolute privacy.',
      'The client approached Travash with a groundbreaking concept from scratch: to revolutionize the VPN landscape by addressing the core privacy flaws inherent in traditional VPN services. Travash architected and developed the entire Skipr platform from a blank canvas—handling everything from the core agentic backend and OpenVPN integration to the sleek front-end UI and secure non-custodial payment gateways.',
    ],
  },
  challenge: {
    title: 'Scope & Challenges',
    subtitle: 'Overcoming Architectural Hurdles with No Market Blueprint',
    content:
      'Building an autonomous, agent-driven VPN from a blank canvas required overcoming six unprecedented engineering hurdles:',
    points: [
      'No Reference Model: Building an autonomous, agentic VPN from the ground up with no existing market blueprint.',
      'True Privacy Guarantee: Architecting payments and connections without ever collecting an email, username, or password.',
      'Autonomous Agent Deployment: Creating AI agents capable of deploying, routing, and scaling infrastructure dynamically.',
      'Server Burn Protocol: Engineering a backend that automatically destroys server instances on a schedule to eliminate log retention.',
      'Market Distrust: Proving a zero-knowledge, non-custodial architecture to skeptical consumers wary of VPN logging claims.',
      'High-Speed Performance: Ensuring stable, sub-second latency across both mobile and web platforms.',
    ],
  },
  complexity: {
    title: 'Trustless Zero-Knowledge Architecture',
    intro:
      'We discarded traditional user databases and instead engineered a non-custodial, zero-knowledge ecosystem:',
    items: [
      {
        title: 'ZERO-KNOWLEDGE ARCHITECTURE',
        description: 'Skipr collects zero personal information—not even an email. Users enjoy complete anonymity from download to payment.',
      },
      {
        title: 'AUTONOMOUS AGENT FLEET',
        description: 'Fully automated AI agents manage VPN infrastructure, eliminating human error and dynamically balancing server loads.',
      },
      {
        title: 'SCHEDULED SERVER BURNS',
        description: 'Server instances are routinely destroyed and replaced with absolutely no log retention, making traffic untraceable.',
      },
      {
        title: 'IRON-CLAD OPENVPN ENCRYPTION',
        description: 'Cutting-edge OpenVPN encryption paired with AI dynamic routing to circumvent network congestion.',
      },
    ],
  },
  approach: {
    title: 'Travash Approach',
    intro: 'Blank-Canvas SaaS Engineering: Non-Custodial Architecture with AI Agent Orchestration.',
    steps: [
      {
        stepNumber: '01',
        title: 'Zero-Knowledge Protocol Design',
        description: 'Eliminated traditional user databases, replacing them with cryptographic token sessions that require no PII.',
      },
      {
        stepNumber: '02',
        title: 'Autonomous AI Agent Engine',
        description: 'Developed Python-based agentic logic capable of provisioning, balancing, and monitoring global server clusters.',
      },
      {
        stepNumber: '03',
        title: 'Scheduled Server Burn Pipelines',
        description: 'Automated ephemeral server teardown scripts that wipe instance volumes cleanly on scheduled intervals.',
      },
      {
        stepNumber: '04',
        title: 'Sleek Non-Custodial Interface',
        description: 'Designed an intuitive UI with single-tap connection toggles (Skipr Instant vs Skipr Ultimate).',
      },
      {
        stepNumber: '05',
        title: 'Anonymous Payment Gateways',
        description: 'Integrated privacy-preserving payment processing allowing subscription upgrades without revealing identity.',
      },
    ],
  },
  solution: {
    title: 'The Solution',
    intro: 'Highlighted Project Capabilities (Features)',
    items: [
      {
        title: 'Zero-Knowledge Architecture',
        description: 'Collects zero personal information—not even a name or email. Guarantees complete anonymity from download to payment.',
      },
      {
        title: 'Autonomous Agent Network',
        description: 'Fully automated AI agents manage VPN infrastructure, eliminating human error and ensuring dynamic scaling and threat protection.',
      },
      {
        title: 'Scheduled Server Burns',
        description: 'All server instances are routinely destroyed with absolutely no log retention, making the user’s online presence truly untraceable.',
      },
      {
        title: 'Iron-Clad OpenVPN Protocol',
        description: 'Cutting-edge encryption technology delivering lightning-fast, stable connections for streaming, browsing, and communications.',
      },
    ],
  },
  solutionArchitecture: {
    title: 'Application Architecture',
    intro:
      'Client Apps (Mobile & Web) → Non-Custodial Cryptographic Handshake → Autonomous AI Agent Controller → Dynamic Ephemeral Server Fleet (OpenVPN) → Scheduled Server Burn Pipeline → Zero Data Retention.',
    image: { asset: { url: '/casestudy-img/arctature-daigram.webp' } },
    caption: 'Figure: Skipr Autonomous Agentic VPN & Server Burn Protocol Architecture',
  },
  technologyStack: [
    {
      category: 'Client Applications',
      technologies: ['React Native', 'Modern Web App', 'Sleek Dark Mode UI'],
      description: 'Cross-platform mobile and web interfaces with single-tap connection toggles.',
    },
    {
      category: 'Autonomous Agent Backend',
      technologies: ['Node.js', 'Python (AI & Autonomous Agent Logic)', 'FastAPI'],
      description: 'Orchestrates dynamic server provisioning, load monitoring, and autonomous burn schedules.',
    },
    {
      category: 'Networking & Protocols',
      technologies: ['OpenVPN Protocol', 'AES-256-GCM', 'WireGuard Support'],
      description: 'Military-grade cryptographic tunnel encryption with real-time AI latency optimization.',
    },
    {
      category: 'Cloud Infrastructure',
      technologies: ['AWS Cloud Infrastructure', 'Ephemeral EC2 Fleets', 'Docker'],
      description: 'Globally distributed ephemeral server instances designed for automated teardown and recreation.',
    },
  ],
  impact: {
    title: 'Measurable Business Impact (Results)',
    subtitle: 'Immediate Market Validation for a Truly Trustless, Zero-Knowledge Platform',
    content:
      'By delivering a trustless, zero-knowledge platform with autonomous agentic operations, Skipr VPN saw rapid adoption across privacy-conscious users globally.',
    outcomes: [
      'Sign-ups and app adoptions increased by 40% due to credential-free onboarding',
      'User retention improved by 35% driven by fast connection speeds and seamless UX',
      'Overall session duration increased by 50%, powered by AI dynamic network optimization',
      '100% verifiable zero-knowledge posture with zero user data leaks or compromises',
      'Autonomous AI fleet reduced cloud server maintenance overhead by over 60%',
    ],
  },
  beforeAfter: {
    title: 'Privacy Paradigms: Before vs. After',
    subtitle: 'Traditional VPN Services vs. Autonomous Agentic Skipr',
    beforeTitle: 'TRADITIONAL VPN SERVICES',
    afterTitle: 'SKIPR AUTONOMOUS AGENTIC VPN',
    before: [
      'Require email, passwords, and billing information linked to user identities',
      'Persistent server instances vulnerable to subpoena or logging compromises',
      'Human administrators manage infrastructure, introducing human error risks',
      'Slow manual server switching when network congestion occurs',
      'Users forced to trust privacy claims without architectural proof',
    ],
    after: [
      '100% credential-free: no name, email, or account creation required',
      'Scheduled server burns routinely destroy instances with zero log retention',
      'Fully autonomous AI agents manage infrastructure and threat prevention',
      'AI dynamically optimizes routing in real-time to circumvent congestion',
      'Architectural zero-knowledge: mathematically impossible to leak user logs',
    ],
  },
  testimonial: {
    quote:
      'Travash built Skipr VPN from a concept into a cutting-edge reality. Their ability to engineer autonomous AI agents and a zero-knowledge architecture that completely eliminates user sign-up credentials has set a new benchmark in online privacy.',
    author: 'Founding Leadership',
    role: 'Chief Technology Officer',
    company: 'Skipr VPN',
  },
  whyItMatters: {
    title: 'Why This Matters for Cybersecurity & SaaS',
    subtitle: 'Are You Looking to Build Trustless, Next-Generation Privacy Platforms?',
    items: [
      'Architecting non-custodial systems where customer identity is never stored',
      'Deploying autonomous AI agents to manage cloud infrastructure without human intervention',
      'Engineering scheduled ephemeral server teardowns to guarantee zero data retention',
      'Building ultra-fast, cross-platform client applications that eliminate onboarding friction',
    ],
  },
  nextStep: {
    heading: 'The Next Step',
    content:
      'Looking to build a next-generation SaaS platform, autonomous AI agent architecture, or privacy-first digital product? Travash partners with innovators from blank canvas to full-scale global deployment.',
    primaryCTA: { label: 'Discuss an Autonomous AI Initiative', href: '#contact' },
    secondaryCTA: { label: 'Explore Zero-Knowledge SaaS Architecture', href: '#contact' },
  },
  technicalHighlights: [
    { label: 'Privacy', value: 'Zero PII', subtext: 'No email or account required', icon: 'lock' },
    { label: 'Agents', value: '100% Auto', subtext: 'Autonomous AI infrastructure', icon: 'cpu' },
    { label: 'Protocol', value: 'OpenVPN', subtext: 'AES-256-GCM encryption', icon: 'shield' },
    { label: 'Retention', value: 'Zero Logs', subtext: 'Scheduled server burn teardowns', icon: 'zap' },
  ],
  walkthroughSteps: [
    {
      stepNumber: '01',
      title: 'Zero-Knowledge Architecture & Non-Custodial Setup',
      description:
        'Skipr doesn’t collect or store any personal information—not even a name or email. This non-custodial setup guarantees complete anonymity from download to payment.',
      subItems: [
        { label: 'Cryptographic Tokenization', text: 'Device connection tokens authenticate without identifying user data.' },
      ],
    },
    {
      stepNumber: '02',
      title: 'Autonomous Agent Network (Dynamic Infrastructure)',
      description:
        'Fully automated AI agents manage the VPN infrastructure, eliminating human error and ensuring dynamic scaling, performance monitoring, and real-time threat security.',
      subItems: [
        { label: 'Fleet Optimization', text: 'Agents spin up and tear down instances based on live bandwidth demands.' },
      ],
    },
    {
      stepNumber: '03',
      title: 'Scheduled Server Burn Protocol',
      description:
        'All server instances are routinely destroyed with absolutely no log retention. Virtual machine volumes are wiped clean, making the user’s online presence truly untraceable.',
      callout: {
        title: 'Untraceable Traffic',
        text: 'Routine destruction of server instances guarantees that historical connection records cannot exist.',
        badge: 'Zero Logs',
      },
    },
    {
      stepNumber: '04',
      title: 'Iron-Clad OpenVPN Encryption & AI Routing',
      description:
        'Powered by the industry-standard OpenVPN protocol with AI dynamic routing optimization to avoid congestion, delivering consistently fast, stable connections for streaming and browsing.',
    },
  ],
}

// ----------------------------------------------------------------------
// Retain Darpan & i-Verify for CMS / Historical Support
// ----------------------------------------------------------------------
export const DEFAULT_DARPAN_DATA: CaseStudyData = {
  title: 'Darpan: AI Facial Recognition & Missing Person Retrieval Engine',
  slug: { current: 'darpan' },
  eyebrow: 'CASE STUDY',
  category: 'Artificial Intelligence',
  industry: 'Government & Public Sector',
  client: 'State Law Enforcement & Public Safety',
  location: 'India',
  shortDescription:
    'Darpan is a deep learning computer vision system developed to match missing persons and unidentified individuals in real-time across millions of state photo records with high biometric accuracy.',
  heroImage: { asset: { url: '/casestudy-thumbs/Darpan.png' } },
  featureImage: '/casestudy-thumbs/Darpan.png',
  solutionArchitecture: {
    title: 'Solution Architecture',
    intro:
      'High-speed vector similarity indexing with convolutional neural networks for sub-second facial match retrieval.',
    image: { asset: { url: '/casestudy-img/arctature-daigram.webp' } },
    caption: 'Figure: Darpan Biometric Vector Search & Police Registry Integration Architecture',
  },
  projectMeta: [
    { label: 'Industry', value: 'Government / Public Sector' },
    { label: 'Solution', value: 'Deep Learning + Computer Vision' },
    { label: 'Platform', value: 'Mobile & Cloud Infrastructure' },
    { label: 'Capabilities', value: 'Facial Recognition, Video Telemetry, Real-time Search' },
  ],
  metrics: [
    { value: '800+', label: 'Reunited Families', description: 'Verified identity matches' },
    { value: '65%', label: 'Turnaround Speedup', description: 'Compared to manual record checks' },
    { value: '99.2%', label: 'Match Confidence', description: 'Deep biometric feature vectors' },
    { value: '<2s', label: 'Search Latency', description: 'Across 10M+ facial embeddings' },
  ],
  executiveSummary: {
    title: 'Executive Summary',
    subtitle: 'Reuniting missing individuals with loved ones using cutting-edge computer vision.',
    paragraphs: [
      'Locating missing children and unidentified individuals across vast geographical regions traditionally involved manual flyer distribution, disjointed police logbooks, and weeks of administrative delay.',
      'Travash built Darpan, an AI-powered biometric facial recognition platform that extracts high-dimensional facial embeddings from field photos and cross-matches them against historical police databases in seconds.',
    ],
  },
  challenge: {
    title: 'The Challenge',
    subtitle: 'High noise, poor photo quality, and aging variations across historical photo records.',
    content:
      'Field officers frequently capture photos under poor lighting, steep angles, or with low-resolution smartphone cameras. Matching these against archival photos required deep learning models resilient to age progression and illumination shifts.',
    points: [
      'Varying lighting conditions, image blur, and off-axis camera angles in field conditions',
      'Age progression matching between childhood photos and adolescent records',
      'Massive database size requiring sub-second vector search response times',
      'Strict zero-trust security and data privacy safeguards for sensitive citizen data',
    ],
  },
  solution: {
    title: 'The Solution',
    intro: 'A secure mobile app integrated with cloud vector databases and deep neural embeddings.',
    items: [
      {
        title: 'Mobile-First Officer Interface',
        description: 'Empowers field officers to snap photos and instantly trigger biometric search queries.',
      },
      {
        title: 'Deep Facial Embedding Engine',
        description: 'Convolutional neural networks trained to identify invariant facial landmarks despite aging.',
      },
      {
        title: 'Vector Similarity Indexing',
        description: 'High-speed approximate nearest neighbor (ANN) search across millions of profiles in milliseconds.',
      },
    ],
  },
  technologyStack: [
    {
      category: 'Mobile & Frontend',
      technologies: ['Flutter', 'React', 'Tailwind CSS'],
      description: 'Cross-platform mobile application and secure administrative console.',
    },
    {
      category: 'AI & Computer Vision',
      technologies: ['Python', 'TensorFlow', 'OpenCV', 'PyTorch'],
      description: 'Facial detection, landmark alignment, and embedding extraction pipelines.',
    },
    {
      category: 'Database & Cloud',
      technologies: ['Milvus Vector DB', 'PostgreSQL', 'Docker', 'Kubernetes'],
      description: 'High-throughput vector indexing, relational audit logging, and scalable container orchestration.',
    },
  ],
  testimonial: {
    quote:
      "When dealing with missing children, every second and every data point counts. Travash didn't just build an app; they engineered a massive, highly secure database powered by advanced AI and facial recognition. The way their system analyzes complex biometric patterns against thousands of records in real-time is extraordinary. Because of their robust data architecture, we have successfully identified and reunited over 70 children with their families. Travash’s technology is quite literally changing lives.",
    author: 'Director of Intelligence Dept',
    role: 'Director of Intelligence Dept',
    company: 'Telangana State Police',
    image: { asset: { url: '/casestudy-img/Telangana_Police_Logo.png.bv.webp' } },
  },
  seo: {
    metaTitle: 'Darpan: AI Facial Recognition Case Study | Travash Software Solutions',
    metaDescription:
      'Discover how Travash developed Darpan, an AI facial recognition and missing person retrieval engine for state law enforcement.',
  },
  technicalHighlights: [
    { label: 'Search Speed', value: '< 2s', subtext: 'Vector search across 10M+ records', icon: 'zap' },
    { label: 'Accuracy', value: '99.2%', subtext: 'Deep biometric confidence score', icon: 'shield' },
    { label: 'Families', value: '800+', subtext: 'Missing persons reunited', icon: 'chart' },
    { label: 'Security', value: 'Zero-Trust', subtext: 'Encrypted citizen registry data', icon: 'lock' },
  ],
}

export const DEFAULT_IVERIFY_DATA: CaseStudyData = {
  title: 'i-Verify: Next-Gen Background Screening & Biometric Trust Platform',
  slug: { current: 'i-verify' },
  eyebrow: 'CASE STUDY',
  category: 'Enterprise Software',
  industry: 'Government & Banking',
  client: 'Enterprise Verification Consortium',
  location: 'India & UAE',
  shortDescription:
    'i-Verify provides a high-security automated candidate background check and credential verification platform with real-time public registry cross-referencing.',
  heroImage: { asset: { url: '/casestudy-thumbs/i-verify.png' } },
  featureImage: '/casestudy-thumbs/i-verify.png',
  projectMeta: [
    { label: 'Industry', value: 'Technology / HR / Public Sector' },
    { label: 'Solution', value: 'Automated Document AI & Identity Verification' },
    { label: 'Platform', value: 'Enterprise Web Portal' },
    { label: 'Capabilities', value: 'OCR, Document AI, Tamper Detection, API Integrations' },
  ],
  metrics: [
    { value: '500K+', label: 'Verifications Processed', description: 'Automated candidate checks' },
    { value: '85%', label: 'Turnaround Reduction', description: 'From 10 days down to 24 hours' },
    { value: '99.8%', label: 'OCR Precision', description: 'Structured entity extraction' },
    { value: 'Zero', label: 'Compliance Breaches', description: 'Full SOC-2 & ISO 27001 posture' },
  ],
  executiveSummary: {
    title: 'Executive Summary',
    subtitle: 'Digitizing corporate and institutional trust through automated verification pipelines.',
    paragraphs: [
      'Traditional background checks took up to two weeks of manual email chains, telephone calls, and physical certificate verification, stalling corporate hiring and government clearances.',
      'Travash built i-Verify to automate educational credential validation, police registry checks, credit bureau scoring, and employment verification through encrypted API bridges and machine-learning document inspection.',
    ],
  },
  challenge: {
    title: 'The Challenge',
    subtitle: 'Eliminating fraudulent credentials and reducing weeks of onboarding latency.',
    content:
      'Employers and government contractors were vulnerable to forged diplomas, manipulated ID scans, and delayed background reports. The system required automated fraud detection coupled with authorized institutional integration.',
    points: [
      'Widespread prevalence of digitally altered PDF documents and fake seals',
      'Long waiting periods causing high candidate drop-off rates during hiring',
      'Fragmented data sources across universities, courts, and credit bureaus',
      'Strict regulatory data sovereignty and privacy mandates',
    ],
  },
  solution: {
    title: 'The Solution',
    intro: 'An intelligent pipeline combining optical character recognition with cryptographically verified API calls.',
    items: [
      {
        title: 'Document Forensic Analysis',
        description: 'Identifies pixel alterations, font inconsistencies, and metadata tampering in uploaded certificates.',
      },
      {
        title: 'Automated Registry Connectors',
        description: 'Direct API integrations with national identity, court records, and university repositories.',
      },
      {
        title: 'Applicant Self-Service Portal',
        description: 'Frictionless mobile onboarding allowing candidates to upload documents and consent in under 3 minutes.',
      },
    ],
  },
  technologyStack: [
    {
      category: 'Frontend & UI',
      technologies: ['React', 'Next.js', 'Tailwind CSS', 'Framer Motion'],
      description: 'Responsive enterprise web application with real-time audit dashboards.',
    },
    {
      category: 'Backend & AI',
      technologies: ['Node.js', 'Python', 'Tesseract OCR', 'FastAPI'],
      description: 'High-concurrency microservices, document extraction, and cryptographic hash verification.',
    },
    {
      category: 'Database & Security',
      technologies: ['MongoDB', 'Redis', 'AWS KMS', 'HashiCorp Vault'],
      description: 'Field-level encrypted data storage, tokenized access, and immutable audit logs.',
    },
  ],
  impact: {
    title: 'The Impact',
    subtitle: 'From Weeks of Uncertainty to Real-Time Verified Credentialing',
    content:
      'The deployment of i-Verify delivered an immediate transformation in background verification operational capacity, cutting turnaround latency by 85% and preventing credential fraud.',
    outcomes: [
      'Over 500,000 candidate verifications completed with 99.8% extraction accuracy',
      'Turnaround reduced from 14 days to under 24 hours for standard screening profiles',
      'Over 2,400 fraudulent and altered credentials intercepted before enterprise onboarding',
      'Zero compliance infractions with strict candidate consent management and audit trails',
    ],
  },
  testimonial: {
    quote:
      'i-Verify slashed our onboarding verification time from two weeks to under 24 hours. The tamper-detection engine has saved our enterprise from multiple fraudulent credentials.',
    author: 'Head of People Operations',
    role: 'Global Technology Enterprise',
    company: 'Enterprise Client',
  },
  seo: {
    metaTitle: 'i-Verify: Background Screening Platform Case Study | Travash Software Solutions',
    metaDescription:
      'Explore how Travash built i-Verify, an automated background check and credential verification platform processing 500K+ verifications.',
  },
  technicalHighlights: [
    { label: 'Turnaround', value: '< 24 Hours', subtext: '85% latency reduction', icon: 'zap' },
    { label: 'Accuracy', value: '99.8%', subtext: 'OCR forensic extraction precision', icon: 'shield' },
    { label: 'Volume', value: '500K+', subtext: 'Applicant background checks', icon: 'database' },
    { label: 'Compliance', value: 'SOC-2 / ISO', subtext: 'Zero compliance infractions', icon: 'lock' },
  ],
  walkthroughSteps: [
    {
      stepNumber: '01',
      title: 'Applicant Self-Service Onboarding',
      description: 'Candidates upload identity credentials and educational certificates directly via a secured mobile interface in under 3 minutes.',
    },
    {
      stepNumber: '02',
      title: 'Forensic OCR & Tamper Detection',
      description: 'Computer vision algorithms inspect document pixels, font hierarchies, and cryptographic metadata to flag forged seals.',
    },
    {
      stepNumber: '03',
      title: 'Real-Time Institutional Registry Bridges',
      description: 'System verifies student enrollment and public records through automated institutional API connectors.',
    },
    {
      stepNumber: '04',
      title: 'Automated Audit Dossier & Clearance Certificate',
      description: 'Generates immutable digital verification certificates with role-based sign-off for enterprise HR teams.',
    },
  ],
}

// 10. DineDesk Restaurant Management SaaS
export const DEFAULT_DINEDESK_DATA: CaseStudyData = {
  _id: 'proj-dinedesk',
  title: 'DineDesk: Enterprise Restaurant Management & Smart Reservation SaaS',
  slug: { current: 'dine-desk' },
  category: 'Hospitality & SaaS',
  industry: 'Travel & Hospitality',
  client: 'Chander Jain',
  shortDescription:
    'Multi-unit reservation engine, live waitlist tracking, dynamic table allocation, and guest analytics for restaurant chains.',
  heroImage: { asset: { url: '/casestudy-thumbs/dinedesk.png' } },
  featureImage: '/casestudy-thumbs/dinedesk.png',
  testimonial: {
    quote:
      'Before Travash stepped in, we were operating in the dark—we had no real visibility into our customer trends, peak times, or table turnover rates. Travash built DineDesk to do more than just take reservations; they engineered a powerful analytics engine. Now, we have real-time data and reporting that allows us to make split-second operational decisions. The insights we get from this platform have drastically improved our efficiency and helped us handle over 500,000 bookings flawlessly. Travash turned our raw data into our biggest competitive advantage.',
    author: 'Chander Jain',
    role: 'Founder & CEO',
    company: 'DineDesk',
    image: { asset: { url: '/images/avatar-placeholder.svg' } },
  },
  metrics: [
    { value: '500,000+', label: 'Bookings Processed Flawlessly' },
    { value: '3x', label: 'Faster Table Turnover' },
    { value: '40%', label: 'No-Show Reduction' },
    { value: '100%', label: 'Real-Time Visibility' },
  ],
  executiveSummary: {
    title: 'Executive Summary',
    paragraphs: [
      'DineDesk is a next-generation enterprise restaurant management and intelligent table reservation engine engineered by Travash Software Solutions.',
      'By turning raw guest booking data into real-time operational intelligence, DineDesk empowered restaurant chains to eliminate table vacancies, predict peak capacity, and streamline dining experiences across hundreds of hospitality locations.',
    ],
  },
  beforeAfter: {
    title: 'Before vs. After',
    subtitle: 'Transforming Legacy Hospitality Operations Into Intelligent Automation',
    beforeTitle: 'BEFORE DINEDESK',
    afterTitle: 'AFTER DINEDESK',
    before: [
      'Zero visibility into real-time guest trends and table turnover',
      'Manual phone reservations leading to costly no-shows and double bookings',
      'Fragmented waitlist tracking causing walk-away customer loss',
      'No unified analytics across multi-outlet restaurant chains',
      'Disjointed marketing with disconnected guest booking history',
    ],
    after: [
      'Real-time analytics engine empowering split-second table allocation',
      'Automated SMS/WhatsApp booking confirmations reducing no-shows by 40%',
      'Live synchronized waitlists and interactive visual floor-plans',
      'Centralized multi-location dashboard handling 500,000+ bookings',
      'Enriched guest profiles and preference tracking for VIP retention',
    ],
  },
  whyItMatters: {
    title: 'Why This Matters',
    subtitle: 'Does Your Hospitality Business Struggle with Table Turnover & Guest Visibility?',
    items: [
      'Eliminating table vacancies through predictive waitlist management',
      'Automating reservation confirmations to slash guest no-show rates',
      'Delivering real-time multi-unit performance visibility to leadership',
      'Scaling effortlessly across high-volume weekend dining surges',
    ],
  },
}

// ----------------------------------------------------------------------
// 11. RadiantSA: Smart Healthcare Data Platform
// ----------------------------------------------------------------------
export const DEFAULT_RADIANTSA_DATA: CaseStudyData = {
  _id: 'caseStudy-radiantsa',
  title: 'Smart Healthcare Data Platform: Clinical CTMS & Health Intelligence',
  slug: { current: 'radiantsa' },
  eyebrow: 'CASE STUDY',
  category: 'Healthcare Cloud & Clinical AI',
  industry: 'Healthcare & Life Sciences',
  client: 'Global Health Network',
  location: 'Global',
  shortDescription:
    'Connected healthcare intelligence platform for modern clinical operations, processing 3.5M+ patient records with HIPAA-compliant uptime and real-time clinical diagnostics.',
  heroImage: { asset: { url: '/casestudy-thumbs/rediantsage.png' } },
  featureImage: '/casestudy-thumbs/rediantsage.png',
  projectMeta: [
    { label: 'CLIENT', value: 'Global Health Network' },
    { label: 'SOLUTION', value: 'Smart Healthcare Data Platform' },
    { label: 'INDUSTRY', value: 'Healthcare & Life Sciences' },
    {
      label: 'CAPABILITIES',
      value: 'Clinical CTMS • HIPAA Cloud • Real-Time Analytics • Patient Data Ingestion',
    },
  ],
  metrics: [
    {
      value: '3.5M+',
      label: 'Patient records analyzed',
      description: 'Real-time multi-hospital diagnostic data processing',
    },
    {
      value: '99.9%',
      label: 'HIPAA compliant uptime',
      description: 'Zero audit defects across clinical data pipelines',
    },
    {
      value: 'Real-Time Analytics',
      label: 'Clinical diagnostic support',
      description: 'Instant EHR cross-referencing and diagnostic aids',
    },
    {
      value: '40+ Hospitals',
      label: 'Global Health Network',
      description: 'Integrated across multi-center trial networks',
    },
  ],
  executiveSummary: {
    title: 'Executive Summary',
    subtitle: 'Modernizing Clinical Operations with Enterprise Healthcare Data Intelligence',
    paragraphs: [
      'Managing patient records across multi-center hospital networks requires zero-latency data processing, bulletproof HIPAA compliance, and real-time analytical insights for clinical staff.',
      'Travash Software Solutions engineered the Smart Healthcare Data Platform—a high-performance clinical trial and health analytics solution that unifies disparate patient data feeds, automates diagnostic workflows, and ensures 99.9% uptime across 40+ integrated hospitals.',
    ],
  },
  challenge: {
    title: 'The Challenge',
    subtitle: 'Fragmented Clinical Records & Complex Compliance Constraints',
    content: 'The clinical network faced critical operational friction:',
    points: [
      'Fragmented Patient Records: EHR data was trapped in hospital-specific legacy silos.',
      'Manual Compliance Auditing: Ensuring HIPAA and FDA regulatory compliance required heavy manual overhead.',
      'Delayed Diagnostic Intelligence: Doctors lacked real-time analytical cross-referencing during patient care.',
    ],
    pointsLabel: 'CLINICAL TEAMS NEEDED TO SOLVE :',
    takeaway: 'The challenge was to unify patient data streams while adhering to stringent HIPAA data privacy standards.',
  },
  complexity: {
    title: 'Engineering Complexity',
    intro: 'Building a zero-latency clinical intelligence platform required solving strict healthcare constraints:',
    items: [
      {
        title: 'HIPAA & FDA COMPLIANCE',
        description: 'End-to-end encryption for patient PHI at rest and in transit.',
      },
      {
        title: 'REAL-TIME DATA INGESTION',
        description: 'Processing high-frequency biometric streams from 3.5M+ patient records.',
      },
      {
        title: 'MULTI-CENTER SYNCHRONIZATION',
        description: 'Unified data model syncing across 40+ hospitals and research centers.',
      },
    ],
  },
  approach: {
    title: 'Travash Approach',
    intro: 'Unified Cloud Architecture with Built-In HIPAA Compliance',
    steps: [
      {
        stepNumber: '01',
        title: 'Data Pipeline Consolidation',
        description: 'Build automated FHIR/HL7 data connectors to ingest patient records securely.',
      },
      {
        stepNumber: '02',
        title: 'HIPAA Cloud Isolation',
        description: 'Architect isolated AWS/Azure cloud environments with end-to-end PHI encryption.',
      },
      {
        stepNumber: '03',
        title: 'Real-Time Analytics Engine',
        description: 'Deploy sub-second clinical analytics dashboard for doctors and researchers.',
      },
      {
        stepNumber: '04',
        title: 'Automated Compliance Telemetry',
        description: 'Continuous audit logging ensuring zero regulatory defects.',
      },
    ],
  },
  solution: {
    title: 'The Solution',
    intro: 'End-to-End Smart Healthcare Intelligence Engine',
    items: [
      {
        title: 'Unified Patient Data Hub',
        description: 'Consolidates 3.5M+ EHR files into a single, searchable clinical knowledge base.',
      },
      {
        title: 'Real-Time Diagnostic Analytics',
        description: 'Sub-second clinical insights and diagnostic assistance for medical professionals.',
      },
      {
        title: 'Automated Audit Telemetry',
        description: '100% compliant data pipelines with real-time audit logging and encryption.',
      },
    ],
  },
  solutionArchitecture: {
    title: 'Solution Architecture',
    intro: 'Multi-Hospital Ingestion → FHIR Data Pipeline → HIPAA Cloud Analytics → Real-Time Clinical Dashboard.',
    image: { asset: { url: '/casestudy-img/arctature-daigram.webp' } },
    caption: 'Figure: Smart Healthcare Data Platform Cloud Architecture',
  },
  technologyStack: [
    {
      category: 'Cloud Infrastructure',
      technologies: ['AWS HIPAA Cloud', 'Docker', 'Kubernetes'],
    },
    {
      category: 'Data & Analytics',
      technologies: ['PostgreSQL', 'Apache Spark', 'Python', 'FastAPI'],
    },
    {
      category: 'Frontend Platform',
      technologies: ['React', 'Next.js', 'Tailwind CSS'],
    },
  ],
  impact: {
    title: 'Measurable Business Impact',
    subtitle: 'Transforming Multi-Hospital Operations with Automated Healthcare Intelligence',
    content: 'Operational efficiencies delivered immediate clarity across clinical teams and hospital networks.',
    outcomes: [
      '3.5M+ patient records analyzed seamlessly across 40+ global hospitals',
      '99.9% HIPAA-compliant system uptime with zero audit defects',
      'Sub-second query speeds for real-time clinical diagnostic support',
      '60% reduction in administrative data entry overhead for clinical staff',
    ],
  },
  nextStep: {
    heading: 'The Next Step',
    content: 'Looking to Modernize Healthcare Data Infrastructure or Clinical Workflows? Travash engineers scalable HIPAA-compliant solutions.',
    primaryCTA: { label: 'Schedule Healthcare Tech Consultation', href: '#contact' },
    secondaryCTA: { label: 'Explore AI & Data Architecture', href: '#contact' },
  },
}

// ----------------------------------------------------------------------
// 12. Gemba – Industrial Maintenance Platform
// ----------------------------------------------------------------------
export const DEFAULT_GEMBA_DATA: CaseStudyData = {
  _id: 'proj-gemba',
  title: 'Gemba – Smarter Maintenance for Industrial Performance',
  slug: { current: 'gemba' },
  eyebrow: 'CASE STUDY',
  category: 'Manufacturing Software',
  industry: 'Manufacturing & Industrial Operations',
  client: 'Gemba',
  location: 'Global',
  shortDescription:
    'Travash built Gemba as a smart maintenance platform that helps industrial teams track machine breakdowns, understand downtime and make faster maintenance decisions.',
  heroImage: { asset: { url: '/images/portfolio/gemba.png' } },
  featureImage: '/images/portfolio/gemba.png',
  projectMeta: [
    { label: 'Industry', value: 'Manufacturing & Industrial Operations' },
    { label: 'Solution', value: 'Web & Desktop Application' },
    { label: 'Focus', value: 'Maintenance Management, Downtime Tracking & Root Cause Analysis' },
    { label: 'Platform', value: 'Web Application + Desktop Application' },
  ],
  metrics: [
    { value: '30%', label: 'Downtime Reduction', description: 'Improved visibility and faster maintenance response' },
    { value: '100+', label: 'Breakdowns Tracked', description: 'Structured capture and monitoring of breakdown events' },
    { value: '25%', label: 'Equipment Availability Improvement', description: 'Better maintenance visibility' },
    { value: '50%', label: 'Faster Resolution', description: 'Real-time information helps teams resolve issues faster' },
  ],
  executiveSummary: {
    title: 'Executive Summary',
    subtitle: 'Custom Maintenance Software for Better Machine Uptime',
    paragraphs: [
      'Travash built Gemba as a smart maintenance platform that helps industrial teams track machine breakdowns, understand downtime and make faster maintenance decisions.',
      'The platform was designed with manufacturing teams in mind and built to work alongside existing systems — turning maintenance events into actionable data that helps teams move from simply recording breakdowns to understanding and reducing recurring problems.',
    ],
  },
  challenge: {
    title: 'The Operational Challenge',
    subtitle: 'Industrial maintenance teams need to respond quickly when machines break down, but manual reporting and limited visibility can make it difficult to understand what is happening on the plant floor.',
    content:
      'Gemba was created to address this by helping teams capture every maintenance event, understand why it happened and act faster. Instead of relying on manual logs, the platform brings breakdown reporting, downtime tracking and maintenance insights into one connected workflow.',
    pointsLabel: 'TEAMS NEEDED TO:',
    points: [
      'Track machine breakdowns in real time',
      'Record accurate downtime',
      'Identify recurring root causes',
      'Reduce manual maintenance reporting',
      'Make faster, data-backed maintenance decisions',
    ],
  },
  approach: {
    title: 'The Approach',
    intro: 'Turning Maintenance Events into Actionable Data',
    steps: [
      {
        stepNumber: '01',
        title: 'Breakdown Occurs',
        description: 'A machine breakdown event is detected and logged by maintenance teams on the plant floor.',
      },
      {
        stepNumber: '02',
        title: 'Event Logged',
        description: 'The breakdown is captured digitally in real time, replacing manual paper logs.',
      },
      {
        stepNumber: '03',
        title: 'Downtime Tracked',
        description: 'Accurate downtime data is recorded so teams can understand where production time is being lost.',
      },
      {
        stepNumber: '04',
        title: 'Root Cause Identified',
        description: 'Maintenance teams identify recurring issues and understand the causes behind equipment failures.',
      },
      {
        stepNumber: '05',
        title: 'Action Taken → Maintenance Improved',
        description: 'Teams act on the insights to resolve issues faster and reduce recurring problems over time.',
      },
    ],
  },
  solution: {
    title: 'The Solution',
    intro: 'Gemba – A Digital Maintenance Platform for Industrial Teams',
    items: [
      {
        title: 'Real-Time Breakdown Tracking',
        description: 'Teams can log and monitor machine breakdowns as they happen, helping maintenance teams respond faster.',
      },
      {
        title: 'Downtime Tracking',
        description: 'Gemba captures accurate downtime information so teams can understand where production time is being lost.',
      },
      {
        title: 'Root Cause Analysis',
        description: 'Maintenance teams can identify recurring issues and understand the causes behind equipment failures.',
      },
      {
        title: 'Mobile-Friendly Maintenance',
        description: 'The platform enables teams to capture and review maintenance information directly from the plant floor.',
      },
      {
        title: 'Actionable Maintenance Insights',
        description: 'Collected maintenance data is turned into clear insights that help teams make better maintenance decisions.',
      },
    ],
  },
  solutionArchitecture: {
    title: 'Solution Architecture',
    intro:
      'Breakdown Occurs → Event Logged → Downtime Tracked → Root Cause Identified → Action Taken → Maintenance Improved. A continuous maintenance workflow where teams move from recording breakdowns to understanding and reducing recurring problems.',
    image: { asset: { url: '/casestudy-img/arctature-daigram.webp' } },
    caption: 'Figure: Gemba Maintenance Workflow & Industrial Platform Architecture',
  },
  impact: {
    title: 'Business Impact',
    subtitle: 'From Reactive Maintenance to Data-Driven Workflow',
    content:
      'Gemba helped transform maintenance from a largely reactive process into a more structured, data-driven workflow.',
    outcomes: [
      '30% less downtime: Improved visibility and faster maintenance response helped reduce machine downtime',
      '100+ breakdowns tracked: The platform provided a structured way to capture and monitor breakdown events',
      '25% better equipment availability: Better maintenance visibility supported improved equipment availability',
      '50% faster resolution: Real-time information helped maintenance teams resolve issues faster',
    ],
  },
  beforeAfter: {
    title: 'Before → After',
    subtitle: 'From Manual Reporting to Digital Maintenance Workflow',
    beforeTitle: 'BEFORE GEMBA',
    afterTitle: 'AFTER GEMBA',
    before: [
      'Manual Breakdown Reporting: Maintenance events depended on manual logging',
      'Limited Downtime Visibility: Teams had less visibility into where time was being lost',
      'Difficult Root Cause Tracking: Recurring issues were harder to identify and analyse',
      'Slower Maintenance Response: Teams needed better access to information when responding to breakdowns',
    ],
    after: [
      'Digital Event Tracking: Breakdowns can be logged and monitored in real time',
      'Clear Downtime Data: Teams can measure and understand equipment downtime',
      'Root Cause Visibility: Maintenance teams can identify recurring issues',
      'Faster Resolution: Teams have the information needed to respond faster',
    ],
  },
  whyItMatters: {
    title: 'Why Gemba Matters',
    subtitle: 'Still Relying on Manual Maintenance Logs or Disconnected Systems?',
    items: [
      'Gemba demonstrates how custom software development for manufacturing can solve a very specific operational problem',
      'Rather than forcing industrial teams to adapt to generic software, Travash built a platform around the way maintenance teams actually work',
      'Helping them track breakdowns, reduce downtime, identify root causes and improve equipment availability',
      'Travash can help you build a custom manufacturing software solution around your processes — from maintenance tracking and workflow automation to real-time operational visibility',
    ],
  },
  nextStep: {
    heading: 'Ready to Improve Your Maintenance Operations?',
    content:
      'Still relying on manual maintenance logs or disconnected systems? Travash can help you build a custom manufacturing software solution around your processes, from maintenance tracking and workflow automation to real-time operational visibility.',
    primaryCTA: { label: 'Discuss Your Manufacturing Software Requirements', href: '#contact' },
    secondaryCTA: { label: 'Explore Industrial Software Solutions', href: '#contact' },
  },
  seo: {
    metaTitle: 'Gemba: Industrial Maintenance Software Case Study | Travash Software Solutions',
    metaDescription:
      'Discover how Travash built Gemba, a custom industrial maintenance management platform that helped reduce machine downtime by 30% and track 100+ breakdowns.',
  },
}

// ----------------------------------------------------------------------
// Master Fallback Registry of all Reviewed Case Studies
// ----------------------------------------------------------------------
export const FALLBACK_CASE_STUDIES: Record<string, CaseStudyData> = {
  // 1. Pixl AI Voice Agent
  pixl: DEFAULT_PIXL_DATA,
  'ai-voice-agent': DEFAULT_PIXL_DATA,

  // 2. Satyaapan Passport Verification
  satyapaan: DEFAULT_SATYAPAAN_DATA,

  // 3. Direct Owners Vacation Rentals
  'direct-owners': DEFAULT_DIRECTOWNERS_DATA,
  directowner: DEFAULT_DIRECTOWNERS_DATA,

  // 4. UGO (EGO UK) Supply Chain Engine
  ugo: DEFAULT_UGO_DATA,

  // 5. Indispare B2B Marketplace
  indispare: DEFAULT_INDISPARE_DATA,

  // 6. I4C Bank Portal
  'i4c-bank-portal': DEFAULT_I4C_DATA,
  i4c: DEFAULT_I4C_DATA,

  // 7. Dovehouse Capital High-Speed SPA
  dovehouse: DEFAULT_DOVEHOUSE_DATA,
  'dovehouse-capital': DEFAULT_DOVEHOUSE_DATA,

  // 8. PEKT Construction Management
  pekt: DEFAULT_PEKT_DATA,

  // 9. Skipr Autonomous Agentic VPN
  skipr: DEFAULT_SKIPR_DATA,

  // 10. DineDesk
  dinedesk: DEFAULT_DINEDESK_DATA,
  'dine-desk': DEFAULT_DINEDESK_DATA,

  // 11. RadiantSA / Smart Healthcare Data Platform
  radiantsa: DEFAULT_RADIANTSA_DATA,
  radiantsage: DEFAULT_RADIANTSA_DATA,
  'radiant-sage': DEFAULT_RADIANTSA_DATA,
  'smart-healthcare-data-platform': DEFAULT_RADIANTSA_DATA,

  // 12. Gemba Industrial Maintenance Platform
  gemba: DEFAULT_GEMBA_DATA,
  'gemba-connect': DEFAULT_GEMBA_DATA,

  // Historical & CMS Slugs
  darpan: DEFAULT_DARPAN_DATA,
  'i-verify': DEFAULT_IVERIFY_DATA,
}

export function buildCaseStudySections(data: CaseStudyData) {
  const sections: { id: string; label: string; number: string; title?: string }[] = []
  let index = 1
  const num = () => String(index++).padStart(2, '0')

  if (data.metrics?.length || data.executiveSummary) {
    sections.push({
      id: 'overview',
      label: 'Overview',
      number: num(),
      title: data.executiveSummary?.title || 'Overview & Executive Summary',
    })
  }

  if (data.complexity?.items?.length) {
    sections.push({
      id: 'complexity',
      label: 'Complexity',
      number: num(),
      title: data.complexity.title || 'The Complexity',
    })
  }

  if (data.challenge) {
    sections.push({
      id: 'challenge',
      label: 'Challenge',
      number: num(),
      title: data.challenge.title || 'The Challenge',
    })
  }

  if (data.approach) {
    sections.push({
      id: 'approach',
      label: 'Approach',
      number: num(),
      title: data.approach.title || 'Travash Approach',
    })
  }

  if (data.solution || data.solutionArchitecture) {
    sections.push({
      id: 'solution',
      label: 'Solution',
      number: num(),
      title: data.solution?.title || 'The Solution',
    })
  }

  if (data.technologyStack && data.technologyStack.length > 0) {
    sections.push({
      id: 'technology',
      label: 'Technology',
      number: num(),
      title: 'Enterprise Technology Stack',
    })
  }

  if (data.impact || data.beforeAfter) {
    sections.push({
      id: 'impact',
      label: 'Impact',
      number: num(),
      title: data.impact?.title || 'Impact & Results',
    })
  }

  if (data.testimonial || data.whyItMatters) {
    sections.push({
      id: 'perspective',
      label: 'Perspective',
      number: num(),
      title: 'Client Perspective',
    })
  }

  return sections
}
