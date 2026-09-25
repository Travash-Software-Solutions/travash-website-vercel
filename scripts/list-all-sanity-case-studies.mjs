import { createClient } from 'next-sanity';

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 's2k81yej',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  apiVersion: '2024-01-01',
  useCdn: false,
  token: process.env.SANITY_API_TOKEN,
});

async function run() {
  const caseStudies = await client.fetch(`*[_type == "caseStudy"]{ _id, title, client, "slug": slug.current }`);
  const portfolioProjects = await client.fetch(`*[_type == "portfolioProject"]{ _id, title, "slug": slug.current }`);

  console.log(`=== SANITY CASE STUDIES (${caseStudies.length}) ===`);
  caseStudies.forEach(cs => {
    console.log(`ID: ${cs._id} | Slug: ${cs.slug} | Title: ${cs.title}`);
  });

  console.log(`\n=== SANITY PORTFOLIO PROJECTS (${portfolioProjects.length}) ===`);
  portfolioProjects.forEach(pp => {
    console.log(`ID: ${pp._id} | Slug: ${pp.slug} | Title: ${pp.title}`);
  });
}

run().catch(console.error);
