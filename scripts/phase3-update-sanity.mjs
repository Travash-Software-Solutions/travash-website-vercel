import { createClient } from 'next-sanity';
import {
  DEFAULT_PIXL_DATA,
  DEFAULT_SATYAPAAN_DATA,
  DEFAULT_DIRECTOWNERS_DATA,
  DEFAULT_UGO_DATA,
  DEFAULT_INDISPARE_DATA,
  DEFAULT_I4C_DATA,
  DEFAULT_DOVEHOUSE_DATA,
  DEFAULT_PEKT_DATA,
  DEFAULT_SKIPR_DATA,
  DEFAULT_DARPAN_DATA,
  DEFAULT_IVERIFY_DATA,
  DEFAULT_DINEDESK_DATA,
} from '../lib/case-study-data.js';

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 's2k81yej',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  apiVersion: '2024-01-01',
  useCdn: false,
  token: process.env.SANITY_API_TOKEN,
});

const CASE_STUDIES_MAP = {
  pixl: DEFAULT_PIXL_DATA,
  satyapaan: DEFAULT_SATYAPAAN_DATA,
  'direct-owners': DEFAULT_DIRECTOWNERS_DATA,
  ugo: DEFAULT_UGO_DATA,
  indispare: DEFAULT_INDISPARE_DATA,
  'i4c-bank-portal': DEFAULT_I4C_DATA,
  dovehouse: DEFAULT_DOVEHOUSE_DATA,
  pekt: DEFAULT_PEKT_DATA,
  skipr: DEFAULT_SKIPR_DATA,
  darpan: DEFAULT_DARPAN_DATA,
  'i-verify': DEFAULT_IVERIFY_DATA,
  dinedesk: DEFAULT_DINEDESK_DATA,
  'dine-desk': DEFAULT_DINEDESK_DATA,
};

function formatForSanity(csData) {
  const fields = {};

  if (csData.title) fields.title = csData.title;
  if (csData.category) fields.category = csData.category;
  if (csData.industry) fields.industry = csData.industry;
  if (csData.client) fields.client = csData.client;
  if (csData.shortDescription) fields.shortDescription = csData.shortDescription;
  if (csData.cardDescription || csData.shortDescription) {
    fields.cardDescription = csData.cardDescription || csData.shortDescription;
  }
  if (csData.title) fields.portfolioTitle = csData.title.split(':')[0].trim();

  if (Array.isArray(csData.projectMeta)) {
    fields.projectMeta = csData.projectMeta.map((item, idx) => ({
      _key: `meta_${idx + 1}`,
      label: item.label,
      value: item.value,
    }));
  }

  if (Array.isArray(csData.metrics)) {
    fields.metrics = csData.metrics.map((item, idx) => ({
      _key: `m_${idx}`,
      value: item.value,
      label: item.label,
      description: item.description || '',
    }));
  }

  if (csData.executiveSummary) {
    fields.executiveSummary = {
      title: csData.executiveSummary.title || 'Executive Summary',
      subtitle: csData.executiveSummary.subtitle || '',
      paragraphs: csData.executiveSummary.paragraphs || [],
    };
  }

  if (csData.challenge) {
    fields.challenge = {
      title: csData.challenge.title || 'The Challenge',
      subtitle: csData.challenge.subtitle || '',
      content: csData.challenge.content || '',
      pointsLabel: csData.challenge.pointsLabel || 'KEY CHALLENGES:',
      points: csData.challenge.points || [],
      takeaway: csData.challenge.takeaway || '',
    };
  }

  if (csData.complexity) {
    fields.complexity = {
      title: csData.complexity.title || 'The Complexity',
      intro: csData.complexity.intro || '',
      items: (csData.complexity.items || []).map((item, idx) => ({
        _key: `c_${idx}`,
        title: item.title,
        description: item.description,
        icon: item.icon || '',
      })),
    };
  }

  if (csData.approach) {
    fields.approach = {
      title: csData.approach.title || 'Travash Approach',
      subtitle: csData.approach.subtitle || csData.approach.intro || '',
      intro: csData.approach.intro || '',
      steps: (csData.approach.steps || []).map((step, idx) => ({
        _key: `s_${idx}`,
        stepNumber: step.stepNumber || String(idx + 1).padStart(2, '0'),
        title: step.title,
        description: step.description,
      })),
    };
  }

  if (csData.solution) {
    fields.solution = {
      title: csData.solution.title || 'The Solution',
      subtitle: csData.solution.subtitle || csData.solution.intro || '',
      intro: csData.solution.intro || '',
      items: (csData.solution.items || []).map((item, idx) => ({
        _key: `sol_${idx}`,
        title: item.title,
        description: item.description,
      })),
    };
  }

  if (Array.isArray(csData.technologyStack)) {
    fields.technologyStack = csData.technologyStack.map((cat, idx) => ({
      _key: `t_${idx}`,
      category: cat.category,
      displayType: 'icons',
      items: (cat.technologies || []).map((t, tidx) => ({
        _key: `item_${tidx}`,
        _type: 'techIconItem',
        name: typeof t === 'string' ? t : t.name || t.title,
      })),
      technologies: (cat.technologies || []).map(t => (typeof t === 'string' ? t : t.name || t.title)),
      description: cat.description || '',
    }));
  }

  if (csData.impact) {
    fields.impact = {
      title: csData.impact.title || 'The Impact',
      subtitle: csData.impact.subtitle || '',
      content: csData.impact.content || '',
      outcomes: csData.impact.outcomes || [],
    };
  }

  if (csData.beforeAfter) {
    fields.beforeAfter = {
      title: csData.beforeAfter.title || 'Before vs. After',
      subtitle: csData.beforeAfter.subtitle || '',
      beforeTitle: csData.beforeAfter.beforeTitle || 'BEFORE',
      afterTitle: csData.beforeAfter.afterTitle || 'AFTER',
      before: csData.beforeAfter.before || [],
      after: csData.beforeAfter.after || [],
    };
  }

  if (csData.testimonial) {
    fields.testimonial = {
      heading: csData.testimonial.heading || 'Client Perspective',
      intro: csData.testimonial.intro || "Insights, expectations, and feedback from the client's point of view.",
      quote: csData.testimonial.quote || '',
      author: csData.testimonial.author || csData.testimonial.name || '',
      role: csData.testimonial.role || csData.testimonial.designation || '',
      company: csData.testimonial.company || '',
    };
  }

  if (csData.whyItMatters) {
    fields.whyItMatters = {
      title: csData.whyItMatters.title || 'Why This Matters',
      subtitle: csData.whyItMatters.subtitle || '',
      description: csData.whyItMatters.description || '',
      items: csData.whyItMatters.items || [],
    };
  }

  if (csData.nextStep) {
    fields.nextStep = {
      heading: csData.nextStep.heading || 'The Next Step',
      subtitle: csData.nextStep.subtitle || '',
      content: csData.nextStep.content || '',
      primaryCTA: csData.nextStep.primaryCTA || { label: 'Discuss Your Initiative', href: '#contact' },
      secondaryCTA: csData.nextStep.secondaryCTA || { label: 'Schedule a Consultation', href: '#contact' },
    };
  }

  return fields;
}

async function run() {
  console.log('Starting Phase 3 Full Sanity Draft Update...\n');

  // Fetch all documents from Sanity
  const allDocs = await client.fetch(`*[_type == "caseStudy"]`);
  console.log(`Fetched ${allDocs.length} case study documents from Sanity.\n`);

  const results = [];

  for (const doc of allDocs) {
    // Only process published docs (not drafts directly in iteration, but update draft for each published doc)
    if (doc._id.startsWith('drafts.')) continue;

    const slug = doc.slug?.current;
    if (!slug) continue;

    const csData = CASE_STUDIES_MAP[slug];
    if (!csData) {
      console.log(`Skipping slug "${slug}" (no local content definition found)`);
      continue;
    }

    const publishedId = doc._id;
    const draftId = `drafts.${publishedId}`;

    console.log(`Processing "${doc.title}" (slug: ${slug})...`);

    const draftDoc = await client.getDocument(draftId);
    if (!draftDoc) {
      console.log(`  Creating draft ${draftId} from published doc ${publishedId}...`);
      await client.createIfNotExists({
        ...doc,
        _id: draftId,
      });
    }

    const patchFields = formatForSanity(csData);
    console.log(`  Patching ${draftId} with updated text content...`);

    const patchResult = await client.patch(draftId).set(patchFields).commit();
    console.log(`  Successfully updated ${draftId}!\n`);

    results.push({
      slug,
      publishedId,
      draftId,
      fieldsUpdated: Object.keys(patchFields),
    });
  }

  console.log('=== PHASE 3 UPDATE SUMMARY ===');
  console.log(`Updated ${results.length} draft documents in Sanity.`);
  for (const r of results) {
    console.log(`- ${r.slug} (${r.draftId}): ${r.fieldsUpdated.length} fields updated`);
  }
}

run().catch(err => {
  console.error('Error in Phase 3 update:', err);
  process.exit(1);
});
