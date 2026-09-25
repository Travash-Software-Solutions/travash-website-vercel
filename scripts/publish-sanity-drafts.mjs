import { createClient } from 'next-sanity';

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 's2k81yej',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  apiVersion: '2024-01-01',
  useCdn: false,
  token: process.env.SANITY_API_TOKEN,
});

async function run() {
  console.log('Publishing all updated caseStudy drafts to Sanity CMS...\n');

  const allDrafts = await client.fetch(`*[_type == "caseStudy" && _id match "drafts.*"]`);
  console.log(`Found ${allDrafts.length} draft documents to publish.\n`);

  const publishedResults = [];

  for (const draft of allDrafts) {
    const publishedId = draft._id.replace('drafts.', '');
    const draftId = draft._id;
    const title = draft.title || draft.slug?.current || publishedId;

    console.log(`Publishing draft "${title}" (${draftId} -> ${publishedId})...`);

    // Create or replace the published document
    const publishedPayload = {
      ...draft,
      _id: publishedId,
    };

    await client.createOrReplace(publishedPayload);
    console.log(`  ✓ Created/replaced published document ${publishedId}`);

    // Delete the draft document after publishing
    await client.delete(draftId);
    console.log(`  ✓ Deleted draft document ${draftId}\n`);

    publishedResults.push({
      publishedId,
      draftId,
      slug: draft.slug?.current,
      title,
    });
  }

  console.log('=== PUBLISH SUMMARY ===');
  console.log(`Successfully published ${publishedResults.length} case study documents to Sanity!`);
  for (const res of publishedResults) {
    console.log(`- ${res.slug || res.publishedId}: ${res.title}`);
  }
}

run().catch(err => {
  console.error('Error publishing Sanity drafts:', err);
  process.exit(1);
});
