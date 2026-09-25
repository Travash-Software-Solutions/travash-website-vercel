import { createClient } from 'next-sanity';
import fs from 'fs';
import path from 'path';

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 's2k81yej',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  apiVersion: '2024-01-01',
  useCdn: false,
  token: process.env.SANITY_API_TOKEN,
});

async function run() {
  console.log('Fetching all caseStudy documents (published + drafts)...');
  const docs = await client.fetch(`*[_type == "caseStudy"]`);
  console.log(`Fetched ${docs.length} documents.`);

  const backupDir = path.join(process.cwd(), 'backup');
  if (!fs.existsSync(backupDir)) {
    fs.mkdirSync(backupDir, { recursive: true });
  }

  const backupPath = path.join(backupDir, `case-studies-${new Date().toISOString().split('T')[0]}.json`);
  fs.writeFileSync(backupPath, JSON.stringify(docs, null, 2), 'utf-8');
  console.log(`Backup saved to ${backupPath}`);

  // Find PEKT document
  const pektDoc = docs.find(d => d.slug?.current === 'pekt' || d._id?.includes('pekt') || d.title?.toLowerCase().includes('pekt'));
  console.log('\n--- PEKT Document in Sanity ---');
  if (pektDoc) {
    console.log(`Found PEKT Document ID: ${pektDoc._id}`);
    console.log(JSON.stringify(pektDoc, null, 2));
  } else {
    console.log('PEKT Document not found in Sanity.');
  }
}

run().catch(err => {
  console.error('Error running discovery script:', err);
  process.exit(1);
});
