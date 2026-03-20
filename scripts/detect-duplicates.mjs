/**
 * Sanity Duplicate Detection Script
 * 
 * Detects duplicate documents in your Sanity dataset based on key fields.
 * 
 * Usage:
 *   node scripts/detect-duplicates.mjs              # Detect only  
 *   node scripts/detect-duplicates.mjs --fix        # Detect and delete duplicates (keeps newest)
 *
 * Requirements:
 *   Set SANITY_TOKEN environment variable with a Sanity API token that has write access.
 *   Get one from: https://www.sanity.io/manage → API → Tokens
 */

const PROJECT_ID = 'x4rrz2fy';
const DATASET = 'production';
const API_VERSION = '2023-10-01';

const TOKEN = process.env.SANITY_TOKEN;
const FIX_MODE = process.argv.includes('--fix');

if (FIX_MODE && !TOKEN) {
  console.error('❌ SANITY_TOKEN is required for --fix mode.');
  console.error('   Set it: $env:SANITY_TOKEN="your-token" (PowerShell)');
  process.exit(1);
}

const headers = {
  'Content-Type': 'application/json',
  ...(TOKEN ? { Authorization: `Bearer ${TOKEN}` } : {}),
};

async function query(groq) {
  const encoded = encodeURIComponent(groq);
  const url = `https://${PROJECT_ID}.api.sanity.io/v${API_VERSION}/data/query/${DATASET}?query=${encoded}`;
  const res = await fetch(url, { headers });
  if (!res.ok) throw new Error(`Sanity query failed: ${res.status} ${await res.text()}`);
  const json = await res.json();
  return json.result;
}

async function deleteDocs(ids) {
  const mutations = ids.map(id => ({ delete: { id } }));
  const url = `https://${PROJECT_ID}.api.sanity.io/v${API_VERSION}/data/mutate/${DATASET}`;
  const res = await fetch(url, {
    method: 'POST',
    headers,
    body: JSON.stringify({ mutations }),
  });
  if (!res.ok) throw new Error(`Delete failed: ${res.status} ${await res.text()}`);
  return await res.json();
}

// Define which field makes each type unique
const CHECKS = [
  { type: 'leadershipHistory', field: 'year', label: 'Sejarah Kepemimpinan' },
  { type: 'materiPramuka', field: 'title', label: 'Materi Pramuka' },
  { type: 'achievement', field: 'title', label: 'Achievement' },
  { type: 'purnaAmbalan', field: 'year', label: 'Purna Ambalan' },
  { type: 'fotoKegiatan', field: 'title', label: 'Foto Kegiatan' },
  { type: 'siteSettings', field: null, label: 'Site Settings (singleton)' },
];

async function detectDuplicates() {
  console.log('🔍 Scanning Sanity dataset for duplicates...\n');

  let totalDuplicates = 0;
  const allToDelete = [];

  for (const check of CHECKS) {
    const { type, field, label } = check;

    if (!field) {
      // Singleton check — should have at most 1 document
      const docs = await query(`*[_type == "${type}"]{ _id, _createdAt } | order(_createdAt desc)`);
      if (docs.length > 1) {
        console.log(`⚠️  ${label}: ${docs.length} documents found (should be 1)`);
        const extras = docs.slice(1); // Keep the newest
        extras.forEach(d => {
          console.log(`   🗑️  Would delete: ${d._id} (created ${d._createdAt})`);
          allToDelete.push(d._id);
        });
        totalDuplicates += extras.length;
      } else {
        console.log(`✅ ${label}: OK (${docs.length} document)`);
      }
      continue;
    }

    const docs = await query(
      `*[_type == "${type}"]{ _id, _createdAt, "${field}": ${field} } | order(${field} asc, _createdAt desc)`
    );

    // Group by field value
    const groups = {};
    for (const doc of docs) {
      const key = doc[field] || '(empty)';
      if (!groups[key]) groups[key] = [];
      groups[key].push(doc);
    }

    const dupes = Object.entries(groups).filter(([_, docs]) => docs.length > 1);

    if (dupes.length === 0) {
      console.log(`✅ ${label}: No duplicates (${docs.length} documents)`);
    } else {
      console.log(`⚠️  ${label}: ${dupes.length} duplicate group(s) found`);
      for (const [value, dupDocs] of dupes) {
        console.log(`   📋 ${field}="${value}" → ${dupDocs.length} copies`);
        // Keep the newest (first after sort by _createdAt desc), mark rest for deletion
        const toDelete = dupDocs.slice(1);
        toDelete.forEach(d => {
          console.log(`      🗑️  Would delete: ${d._id} (created ${d._createdAt})`);
          allToDelete.push(d._id);
        });
        totalDuplicates += toDelete.length;
      }
    }
  }

  console.log(`\n${'═'.repeat(50)}`);

  if (totalDuplicates === 0) {
    console.log('🎉 No duplicates found! Your database is clean.');
    return;
  }

  console.log(`\n📊 Found ${totalDuplicates} duplicate document(s) to remove.`);

  if (FIX_MODE) {
    console.log(`\n🔧 FIX MODE: Deleting ${allToDelete.length} duplicate documents...`);
    try {
      await deleteDocs(allToDelete);
      console.log('✅ Successfully deleted all duplicates!');
    } catch (err) {
      console.error('❌ Failed to delete:', err.message);
    }
  } else {
    console.log('\n💡 To fix duplicates, run:');
    console.log('   $env:SANITY_TOKEN="your-token"');
    console.log('   node scripts/detect-duplicates.mjs --fix');
  }
}

detectDuplicates().catch(err => {
  console.error('❌ Error:', err.message);
  process.exit(1);
});
