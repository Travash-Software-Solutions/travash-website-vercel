import { createClient } from 'next-sanity';

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 's2k81yej',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  apiVersion: '2024-01-01',
  useCdn: false,
  token: process.env.SANITY_API_TOKEN,
});

async function run() {
  const publishedDoc = await client.getDocument('caseStudy-pekt');
  const draftDoc = await client.getDocument('drafts.caseStudy-pekt');

  console.log('=== PUBLISHED VS DRAFT COMPARISON FOR PEKT ===\n');

  const fieldsToCheck = [
    'title', 'category', 'client', 'shortDescription', 'projectMeta', 'metrics',
    'executiveSummary', 'challenge', 'complexity', 'approach', 'solution',
    'technologyStack', 'impact', 'beforeAfter', 'testimonial', 'whyItMatters', 'nextStep', 'contact'
  ];

  for (const f of fieldsToCheck) {
    console.log(`--- Field: ${f} ---`);
    console.log('Published:', JSON.stringify(publishedDoc[f], null, 2));
    console.log('Draft:    ', JSON.stringify(draftDoc[f], null, 2));
    console.log('');
  }
}

run().catch(err => {
  console.error('Error verifying draft:', err);
  process.exit(1);
});
