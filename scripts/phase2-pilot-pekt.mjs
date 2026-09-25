import { createClient } from 'next-sanity';

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 's2k81yej',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  apiVersion: '2024-01-01',
  useCdn: false,
  token: process.env.SANITY_API_TOKEN,
});

async function run() {
  const publishedId = 'caseStudy-pekt';
  const draftId = `drafts.${publishedId}`;

  console.log(`Checking existing document in Sanity for ${publishedId} / ${draftId}...`);
  const publishedDoc = await client.getDocument(publishedId);
  const draftDoc = await client.getDocument(draftId);

  const baseDoc = draftDoc || publishedDoc;

  if (!baseDoc) {
    console.error('Neither published nor draft document found for PEKT!');
    process.exit(1);
  }

  console.log(`Found base document _id: ${baseDoc._id}`);

  // Create draft if not exists
  if (!draftDoc) {
    console.log(`Draft ${draftId} does not exist. Creating draft from published doc...`);
    await client.createIfNotExists({
      ...publishedDoc,
      _id: draftId,
    });
  }

  const pektFields = {
    title: 'PEKT: Dynamic Automation for Streamlining All Construction Management Activities',
    category: 'Construction Management Mobile App',
    industry: 'Real Estate & Construction',
    client: 'PEKT - Product Development (India)',
    shortDescription: 'A centralized mobile platform designed to eliminate on-site tracking fragmentation and automate daily construction workflows.',
    cardDescription: 'A centralized mobile platform designed to eliminate on-site tracking fragmentation and automate daily construction workflows.',
    portfolioTitle: 'PEKT - Dynamic Construction Management',
    projectMeta: [
      { _key: 'meta_1', label: 'CLIENT', value: 'PEKT - Product Development (India)' },
      { _key: 'meta_2', label: 'SOLUTION', value: 'Construction Management Mobile App' },
      { _key: 'meta_3', label: 'INDUSTRY', value: 'Real Estate & Construction' },
      { _key: 'meta_4', label: 'CAPABILITIES', value: 'Mobile App Development (React Native) • UI/UX Design • Workflow Automation • Real-Time Inventory Tracking' }
    ],
    metrics: [
      { _key: 'm_0', value: '40%', label: 'Time Savings Achieved', description: 'Achieved in daily task management workflows' },
      { _key: 'm_1', value: '60%', label: 'Overall Productivity Improvement', description: 'For on-site execution across engineering teams' },
      { _key: 'm_2', value: '98%', label: 'Accuracy Maintained', description: 'Maintained for inventory and daily expenses' },
      { _key: 'm_3', value: '100%', label: 'Daily Report Generation Rate', description: 'Achieved across deployed construction sites' }
    ],
    executiveSummary: {
      title: 'Executive Summary',
      subtitle: 'Automating Daily Task Tracking & Elevating On-Site Project Visibility',
      paragraphs: [
        'PEKT is an intuitive, mobile-first construction management application engineered to automate daily task tracking, streamline resource allocation, and manage on-site progress.',
        'Designed specifically for site execution, it delivers a dynamic, real-time ecosystem to eliminate administrative gridlock and elevate project visibility for builders and construction companies.'
      ]
    },
    challenge: {
      title: 'The Challenge',
      subtitle: 'Modernizing Legacy Task Tracking & Eliminating On-Site Management Bottlenecks',
      content: 'Construction companies needed to modernize legacy task tracking and eliminate on-site management bottlenecks. The existing tracking process relied heavily on complex applications suited only for office professionals, hindering efficient, minute-to-minute record-keeping for the teams actively working on the ground.\n\nThe challenge was to reduce the complexity of existing tracking methods without sacrificing the granular data required for proactive decision management.',
      pointsLabel: 'SITE ENGINEERS NEEDED TO IDENTIFY :',
      points: [
        'Overcoming manual and fragmented daily task updates with intuitive mobile solutions',
        'Ensuring real-time stock notifications to enable prompt action for low inventory situations',
        'Establishing precise contract worker attendance systems for accurate wage payments',
        'Integrating on-site progress data into unified, digitized daily status reports'
      ]
    },
    complexity: {
      title: 'The Complexity',
      intro: 'Key operational challenges faced during on-site field execution:',
      items: [
        { _key: 'c_0', title: 'ON-SITE FRAGMENTATION', description: 'Managing daily tasks and minute-to-minute progress effectively in a chaotic field environment.' },
        { _key: 'c_1', title: 'INVENTORY DISCREPANCIES', description: 'Tracking raw materials, stock levels, and daily expenses without real-time synchronization.' },
        { _key: 'c_2', title: 'FINANCIAL TRACKING', description: 'Monitoring highly variable contract worker attendance and ensuring accurate wage calculations.' },
        { _key: 'c_3', title: 'MOBILE ACCESSIBILITY', description: 'Engineering an interface that non-technical site workers can use seamlessly without extensive training.' }
      ]
    },
    approach: {
      title: 'Travash Approach',
      intro: 'Automate Task Tracking. Empower Site Engineers.',
      steps: [
        { _key: 's_0', stepNumber: '01', title: 'DISCOVER', description: 'Mapped out the core bottlenecks in existing construction apps that hindered on-site workers.' },
        { _key: 's_1', stepNumber: '02', title: 'WIREFRAME', description: 'Initiated a real-time card sorting process and created low-resolution wireframes for rigorous user testing.' },
        { _key: 's_2', stepNumber: '03', title: 'ARCHITECT', description: 'Designed a highly accessible mobile-first infrastructure to handle daily task ingestion directly from the field.' },
        { _key: 's_3', stepNumber: '04', title: 'AUTOMATE', description: 'Deployed automated notification engines to instantly alert project managers regarding critical stock details.' },
        { _key: 's_4', stepNumber: '05', title: 'INTEGRATE', description: 'Connected worker attendance, daily expenses, and raw material tracking into a single, unified database.' }
      ]
    },
    solution: {
      title: 'The Solution',
      intro: 'PEKT – A Dynamic Construction Management Platform',
      items: [
        { _key: 'sol_0', title: 'MOBILE-FIRST TASK TRACKING', description: 'Allows site engineers to use mobile devices for instantaneous daily task updates and regular status reports.' },
        { _key: 'sol_1', title: 'AUTOMATED STOCK ALERTS', description: 'The Project Manager receives instant stock status notifications, enabling proactive decision management for low stock situations.' },
        { _key: 'sol_2', title: 'PRECISE WAGE MANAGEMENT', description: 'Site engineers can monitor contract worker attendance effortlessly, guaranteeing precise wage payments.' },
        { _key: 'sol_3', title: 'DIGITIZED STATUS REPORTS', description: 'Transforms raw on-site data into 100% accurate, automatically generated daily status reports for management review.' }
      ]
    },
    technologyStack: [
      {
        _key: 'mob_tech',
        category: 'MOBILE TECHNOLOGIES',
        displayType: 'icons',
        items: [
          { _key: 'rn_icon', _type: 'techIconItem', name: 'React Native', publicIcon: 'React-Native.svg' }
        ],
        technologies: ['React Native'],
        description: 'Mobile app development built for responsive on-site execution.'
      },
      {
        _key: 'client_tech',
        category: 'CLIENT-SIDE TECHNOLOGIES',
        displayType: 'icons',
        items: [
          { _key: 'uiux_icon', _type: 'techIconItem', name: 'UI/UX Design' },
          { _key: 'html5_icon', _type: 'techIconItem', name: 'HTML5' },
          { _key: 'css3_icon', _type: 'techIconItem', name: 'CSS3' },
          { _key: 'js_icon', _type: 'techIconItem', name: 'JavaScript' },
          { _key: 'jq_icon', _type: 'techIconItem', name: 'jQuery' }
        ],
        technologies: ['UI/UX Design', 'HTML5', 'CSS3', 'JavaScript', 'jQuery'],
        description: 'Client-side design and web portal technology stack.'
      },
      {
        _key: 'server_tech',
        category: 'SERVER-SIDE TECHNOLOGIES',
        displayType: 'icons',
        items: [
          { _key: 'php_icon', _type: 'techIconItem', name: 'PHP (Laravel Framework)' }
        ],
        technologies: ['PHP (Laravel Framework)'],
        description: 'Backend services for task ingestion and notification engines.'
      },
      {
        _key: 'db_tech',
        category: 'DATABASE ARCHITECTURE',
        displayType: 'icons',
        items: [
          { _key: 'mysql_icon', _type: 'techIconItem', name: 'MySQL' }
        ],
        technologies: ['MySQL'],
        description: 'Structured database architecture for materials, tasks, and labor tracking.'
      }
    ],
    impact: {
      title: 'The Impact',
      subtitle: 'Turning Fragmented Field Operations Into a Streamlined Digital Platform',
      content: 'Through user-centric design and scalable mobile software engineering, Travash enabled construction companies to achieve immediate operational velocity and absolute project visibility on-site.',
      outcomes: [
        'Achieved 40% time savings in daily task management through intuitive mobile interfaces',
        'Delivered a 60% overall productivity improvement for builders and site engineers',
        'Maintained 98% accuracy for inventory and daily expenses, eliminating manual errors',
        'Secured a 100% daily report generation rate achieved across deployed sites and an outstanding user satisfaction score of 4.7/5'
      ]
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
        'Compiling end-of-day progress required hours of manual paperwork and data entry.'
      ],
      after: [
        'A user-friendly mobile interface allows site engineers to log updates instantly from the field.',
        'Automated real-time notifications instantly alert managers of low stock for proactive decisions.',
        'Integrated attendance modules ensure 100% precise wage payments for contract workers.',
        '100% automated daily report generation delivers accurate status updates directly to management.'
      ]
    },
    testimonial: {
      heading: 'Client Perspective',
      intro: "Insights, expectations, and feedback from the client's point of view.",
      quote: 'Travash transformed our real estate and construction tracking with the PEKT product they developed. Their expertise and commitment to client satisfaction are exceptional.',
      author: 'PEKT - Product Development (India)',
      role: 'Product Development',
      company: 'PEKT - Product Development (India)'
    },
    whyItMatters: {
      title: 'Why This Matters',
      subtitle: 'THIS CASE STUDY IS RELEVANT FOR ORGANIZATIONS MANAGING complex on-site workflows, mobile field workforces, and dynamic inventory pipelines.',
      description: "The objective wasn't simply to build a tracking app; it was to eliminate the friction that prevented field workers from efficiently recording data. By delivering a user-centric mobile solution, enterprises can scale their construction operations seamlessly while retaining absolute visibility into daily progress.",
      items: [
        'Managing complex on-site workflows and field tracking',
        'Empowering mobile field workforces with low-friction tools',
        'Automating real-time stock notifications and dynamic inventory pipelines',
        'Retaining absolute visibility into daily construction progress and payroll precision'
      ]
    },
    nextStep: {
      heading: 'The Next Step',
      subtitle: 'Looking to Modernize a Mobile Field Workforce or Construction Workflow?',
      content: 'Start with one clearly defined process to evaluate whether this high-tech, low-friction approach is right for your organization.',
      primaryCTA: { label: 'Discuss Mobile Field Workforce', href: '#contact' },
      secondaryCTA: { label: 'Explore Construction Automation', href: '#contact' }
    },
    contact: {
      heading: 'Ready to automate and solve operational bottlenecks?',
      description: 'At Travash, we engineer enterprise-grade mobile and automation solutions that solve complex business challenges and streamline on-site operations.'
    }
  };

  console.log(`Patching draft document ${draftId}...`);
  const result = await client.patch(draftId).set(pektFields).commit();
  console.log('Successfully updated draft in Sanity!');
  console.log('Updated document ID:', result._id);
}

run().catch(err => {
  console.error('Error running pilot update script:', err);
  process.exit(1);
});
