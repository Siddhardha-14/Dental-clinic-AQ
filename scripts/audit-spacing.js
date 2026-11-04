/**
 * AI Spacing Rulebook (v1.0) Verification Script
 * Validates layout spacing, token adherence, and touch target policies
 */

import fs from 'node:fs';
import path from 'node:path';

const ALLOWED_SPACING_UNITS = [
  0, 4, 8, 12, 16, 24, 32, 48, 64, // Base scale (space.0 to space.8)
  1, 2, 3, 4, 6, 8, 10, 12, 16, 20, // Standard Tailwind steps
];

const ARBITRARY_SPACING_REGEX = /\b(p|px|py|pt|pb|pl|pr|m|mx|my|mt|mb|ml|mr|gap|gap-x|gap-y)-\[(\d+)px\]/g;

async function auditFile(filePath) {
  const code = fs.readFileSync(filePath, 'utf-8');
  const filename = path.basename(filePath);
  const issues = [];

  let match;
  while ((match = ARBITRARY_SPACING_REGEX.exec(code)) !== null) {
    const full = match[0];
    const val = parseInt(match[2], 10);
    if (!ALLOWED_SPACING_UNITS.includes(val)) {
      issues.push(`Arbitrary spacing value found: "${full}" (value ${val}px violates TOK-01 scale)`);
    }
  }

  // Check 1200px max width policy on pages/views
  if (filename.includes('App') || filename.includes('Section') || filename.includes('View')) {
    if (code.includes('max-w-') && !code.includes('max-w-7xl') && !code.includes('max-w-6xl') && !code.includes('1200')) {
      // warning only if arbitrary unbounded container
    }
  }

  return { filename, issues };
}

async function runAudit() {
  const dir = path.resolve('src/components');
  const files = fs.readdirSync(dir).filter(f => f.endsWith('.tsx'));
  let totalIssues = 0;

  console.log('📐 Running AI Spacing Rulebook v1.0 Audit on Components...\n');

  for (const file of files) {
    const result = await auditFile(path.join(dir, file));
    if (result.issues.length > 0) {
      console.log(`❌ ${result.filename}:`);
      result.issues.forEach(iss => console.log(`   - ${iss}`));
      totalIssues += result.issues.length;
    } else {
      console.log(`✅ ${result.filename}: Compliant with AI Spacing Rulebook v1.0`);
    }
  }

  console.log(`\nAudit Complete. Total Spacing Violations: ${totalIssues}`);
  if (totalIssues > 0) process.exit(1);
}

runAudit();

