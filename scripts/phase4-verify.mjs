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
  console.log('Running Phase 4 Draft Verification...\n');

  const backupPath = path.join(process.cwd(), 'backup', 'case-studies-2026-09-21.json');
  if (!fs.existsSync(backupPath)) {
    console.error('Backup file not found!');
    process.exit(1);
  }

  const backupDocs = JSON.parse(fs.readFileSync(backupPath, 'utf-8'));
  const backupMap = {};
  backupDocs.forEach(d => { backupMap[d._id] = d; });

  const currentDocs = await client.fetch(`*[_type == "caseStudy"]`);
  const drafts = currentDocs.filter(d => d._id.startsWith('drafts.'));

  console.log(`Found ${drafts.length} total draft documents in Sanity.\n`);

  for (const draft of drafts) {
    const pubId = draft._id.replace('drafts.', '');
    const pubDoc = backupMap[pubId];

    console.log(`Draft ID: ${draft._id} (Slug: ${draft.slug?.current})`);
    if (!pubDoc) {
      console.log(`  New draft without existing backup doc.`);
      continue;
    }

    const modifiedFields = [];
    const preservedFields = [];

    const keys = new Set([...Object.keys(draft), ...Object.keys(pubDoc)]);
    for (const key of keys) {
      if (key.startsWith('_')) continue;
      if (JSON.stringify(draft[key]) !== JSON.stringify(pubDoc[key])) {
        modifiedFields.push(key);
      } else {
        preservedFields.push(key);
      }
    }

    console.log(`  Modified fields (${modifiedFields.length}): ${modifiedFields.join(', ')}`);
    console.log(`  Preserved untouched fields (${preservedFields.length}): ${preservedFields.join(', ')}`);
    console.log('');
  }
}

run().catch(err => {
  console.error('Error in Phase 4 verification:', err);
  process.exit(1);
});
