import { createClient } from 'next-sanity';

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 's2k81yej',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  apiVersion: '2024-01-01',
  useCdn: false,
  token: process.env.SANITY_API_TOKEN,
});

async function run() {
  const doc = await client.getDocument('caseStudy-pekt');
  console.log('=== PUBLISHED SANITY DOCUMENT: caseStudy-pekt ===');
  console.log('Title:', doc.title);
  console.log('Client:', doc.client);
  console.log('Category:', doc.category);
  console.log('Short Description:', doc.shortDescription);
  console.log('Metrics:', doc.metrics);
  console.log('Executive Summary Paragraphs:', doc.executiveSummary?.paragraphs);
  console.log('Testimonial Quote:', doc.testimonial?.quote);
}

run().catch(err => {
  console.error('Error fetching published doc:', err);
  process.exit(1);
});
