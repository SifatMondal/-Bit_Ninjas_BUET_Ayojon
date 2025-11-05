#!/usr/bin/env node

import lighthouse from 'lighthouse';
import * as chromeLauncher from 'chrome-launcher';

const LCP_THRESHOLD = 2500; // 2.5s
const CLS_THRESHOLD = 0.1;

async function runLighthouse() {
  const chrome = await chromeLauncher.launch({
    chromeFlags: ['--headless', '--disable-gpu'],
  });

  const options = {
    logLevel: 'info' as const,
    output: 'json' as const,
    port: chrome.port,
  };

  const url = process.env.LIGHTHOUSE_URL || 'http://localhost:3000';

  console.log(`Running Lighthouse on ${url}...`);

  const runnerResult = await lighthouse(url, options);

  if (!runnerResult || !runnerResult.lhr) {
    console.error('Lighthouse failed to run');
    await chrome.kill();
    process.exit(1);
  }

  const lhr = runnerResult.lhr;

  // Extract metrics
  const lcp = lhr.audits['largest-contentful-paint']?.numericValue || 0;
  const cls = lhr.audits['cumulative-layout-shift']?.numericValue || 0;
  const performance = lhr.categories.performance?.score || 0;

  console.log('\n📊 Performance Metrics:');
  console.log(`   Performance Score: ${Math.round(performance * 100)}/100`);
  console.log(`   LCP: ${Math.round(lcp)}ms (threshold: ${LCP_THRESHOLD}ms)`);
  console.log(`   CLS: ${cls.toFixed(3)} (threshold: ${CLS_THRESHOLD})`);

  await chrome.kill();

  // Check thresholds
  const lcpPassed = lcp <= LCP_THRESHOLD;
  const clsPassed = cls <= CLS_THRESHOLD;

  if (!lcpPassed || !clsPassed) {
    console.error('\n❌ Performance budget exceeded!');
    if (!lcpPassed) {
      console.error(`   LCP: ${Math.round(lcp)}ms > ${LCP_THRESHOLD}ms`);
    }
    if (!clsPassed) {
      console.error(`   CLS: ${cls.toFixed(3)} > ${CLS_THRESHOLD}`);
    }
    process.exit(1);
  }

  console.log('\n✅ Performance budget met!');
}

runLighthouse().catch((err) => {
  console.error('Error running Lighthouse:', err);
  process.exit(1);
});
