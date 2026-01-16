#!/usr/bin/env node

/**
 * Generate, verify, and combine PDFs for all pages of the site
 *
 * Usage:
 *   node scripts/generate-pdfs.js [options]
 *
 * Options:
 *   --base-url <url>     Base URL of the site (default: http://localhost:21002)
 *   --output-dir <dir>   Output directory for PDFs (default: ./pdfs)
 *   --verify-only        Skip generation, just verify existing PDFs and combine
 *
 * Pipeline:
 *   1. Generate individual PDFs for each page using Puppeteer
 *   2. Verify each PDF (file size, valid structure, page count)
 *   3. Combine all verified PDFs into one document
 *
 * Output:
 *   ./pdfs/[page-name].pdf     - Individual page PDFs
 *   ./pdfs/cindyzody-complete-site.pdf - Combined PDF of all pages
 *
 * Make sure the dev server is running before executing this script.
 */

import puppeteer from 'puppeteer'
import { mkdir, stat, readFile, writeFile } from 'fs/promises'
import { join } from 'path'
import { PDFDocument, rgb, StandardFonts } from 'pdf-lib'

const MIN_PDF_SIZE = 5000 // Minimum valid PDF size in bytes (5KB)

// All routes to generate PDFs for
// Note: home is excluded from combined PDF due to intro animations
const routes = [
  { path: '/', name: 'home', excludeFromCombined: true },
  { path: '/about', name: 'about' },
  { path: '/services', name: 'services' },
  { path: '/services/individual', name: 'services-individual' },
  { path: '/services/couples', name: 'services-couples' },
  { path: '/services/groups', name: 'services-groups' },
  { path: '/services/workplace', name: 'services-workplace' },
  { path: '/approach', name: 'approach' },
  { path: '/approach/emotional-intelligence', name: 'approach-emotional-intelligence' },
  { path: '/approach/nvc', name: 'approach-nvc' },
  { path: '/approach/ifs', name: 'approach-ifs' },
  { path: '/approach/mindfulness', name: 'approach-mindfulness' },
  { path: '/approach/attitudinal-healing', name: 'approach-attitudinal-healing' },
  { path: '/approach/conflict-resolution', name: 'approach-conflict-resolution' },
  { path: '/approach/outcomes', name: 'approach-outcomes' },
  { path: '/practice', name: 'practice' },
  { path: '/practice/goals', name: 'practice-goals' },
  { path: '/practice/observation', name: 'practice-observation' },
  { path: '/practice/feelings', name: 'practice-feelings' },
  { path: '/practice/needs', name: 'practice-needs' },
  { path: '/practice/request', name: 'practice-request' },
  { path: '/practice/scenarios', name: 'practice-scenarios' },
  { path: '/history', name: 'history' },
  { path: '/progress', name: 'progress' },
  { path: '/groups', name: 'groups' },
  { path: '/groups/nvc-foundations', name: 'groups-nvc-foundations' },
  { path: '/groups/mindful-communication', name: 'groups-mindful-communication' },
  { path: '/groups/repair-after-conflict', name: 'groups-repair-after-conflict' },
  { path: '/resources', name: 'resources' },
  { path: '/contact', name: 'contact' },
  { path: '/privacy', name: 'privacy' }
]

// Routes to exclude from combined PDF
const excludeFromCombined = new Set(
  routes.filter(r => r.excludeFromCombined).map(r => `${r.name}.pdf`)
)

async function generatePDFs(baseUrl = 'http://localhost:21002', outputDir = './pdfs') {
  console.log(`\n📄 Generating PDFs from ${baseUrl}\n`)

  // Create output directory
  await mkdir(outputDir, { recursive: true })

  // Launch browser
  const browser = await puppeteer.launch({
    headless: 'new'
  })

  const page = await browser.newPage()

  // Set viewport for consistent rendering
  await page.setViewport({ width: 1200, height: 800 })

  const results = { success: [], failed: [] }

  for (const route of routes) {
    const url = `${baseUrl}${route.path}`
    const filename = `${route.name}.pdf`
    const filepath = join(outputDir, filename)

    try {
      console.log(`  📝 ${route.path}`)

      // Navigate to page and wait for network to be idle
      await page.goto(url, {
        waitUntil: 'networkidle0',
        timeout: 30000
      })

      // Wait a bit for any animations to settle
      await page.evaluate(() => new Promise(resolve => setTimeout(resolve, 500)))

      // Generate PDF
      await page.pdf({
        path: filepath,
        format: 'Letter',
        printBackground: true,
        margin: {
          top: '0.5in',
          right: '0.5in',
          bottom: '0.5in',
          left: '0.5in'
        }
      })

      results.success.push({ route: route.path, file: filename })
      console.log(`     ✅ ${filename}`)

    } catch (error) {
      results.failed.push({ route: route.path, error: error.message })
      console.log(`     ❌ Failed: ${error.message}`)
    }
  }

  await browser.close()

  // Summary
  console.log(`\n${'─'.repeat(50)}`)
  console.log(`\n✨ PDF Generation Complete!\n`)
  console.log(`   Success: ${results.success.length}`)
  console.log(`   Failed:  ${results.failed.length}`)
  console.log(`   Output:  ${outputDir}\n`)

  if (results.failed.length > 0) {
    console.log(`Failed pages:`)
    results.failed.forEach(f => console.log(`   - ${f.route}: ${f.error}`))
    console.log('')
  }

  return results
}

/**
 * Verify all generated PDFs are valid
 */
async function verifyPDFs(outputDir, expectedFiles) {
  console.log(`\n🔍 Verifying PDFs...\n`)

  const verification = { passed: [], failed: [] }

  for (const file of expectedFiles) {
    const filepath = join(outputDir, file)

    try {
      // Check file exists and get size
      const stats = await stat(filepath)

      if (stats.size < MIN_PDF_SIZE) {
        verification.failed.push({ file, reason: `Too small (${stats.size} bytes)` })
        console.log(`   ❌ ${file} - Too small (${stats.size} bytes)`)
        continue
      }

      // Try to parse as valid PDF
      const pdfBytes = await readFile(filepath)
      const pdfDoc = await PDFDocument.load(pdfBytes, { ignoreEncryption: true })
      const pageCount = pdfDoc.getPageCount()

      if (pageCount === 0) {
        verification.failed.push({ file, reason: 'No pages in PDF' })
        console.log(`   ❌ ${file} - No pages`)
        continue
      }

      verification.passed.push({ file, size: stats.size, pages: pageCount })
      console.log(`   ✅ ${file} (${pageCount} page${pageCount > 1 ? 's' : ''}, ${(stats.size / 1024).toFixed(1)}KB)`)

    } catch (error) {
      verification.failed.push({ file, reason: error.message })
      console.log(`   ❌ ${file} - ${error.message}`)
    }
  }

  console.log(`\n${'─'.repeat(50)}`)
  console.log(`\n📊 Verification Summary:\n`)
  console.log(`   Passed: ${verification.passed.length}`)
  console.log(`   Failed: ${verification.failed.length}`)

  return verification
}

/**
 * Create a title page for the combined PDF
 */
async function createTitlePage(pdfDoc) {
  const page = pdfDoc.addPage([612, 792]) // Letter size
  const { width, height } = page.getSize()

  const helveticaBold = await pdfDoc.embedFont(StandardFonts.HelveticaBold)
  const helvetica = await pdfDoc.embedFont(StandardFonts.Helvetica)

  // Brand green color (approximating brand-600)
  const brandGreen = rgb(0.22, 0.56, 0.24)
  const slate700 = rgb(0.2, 0.25, 0.33)
  const slate500 = rgb(0.39, 0.45, 0.55)

  // Draw decorative top bar
  page.drawRectangle({
    x: 0,
    y: height - 80,
    width: width,
    height: 80,
    color: brandGreen,
  })

  // Main title - "Cindy Zody"
  const mainTitle = 'Cindy Zody'
  const mainTitleSize = 72
  const mainTitleWidth = helveticaBold.widthOfTextAtSize(mainTitle, mainTitleSize)
  page.drawText(mainTitle, {
    x: (width - mainTitleWidth) / 2,
    y: height - 280,
    size: mainTitleSize,
    font: helveticaBold,
    color: slate700,
  })

  // Subtitle - "Communications Practitioner"
  const subtitle = 'Communications Practitioner'
  const subtitleSize = 24
  const subtitleWidth = helvetica.widthOfTextAtSize(subtitle, subtitleSize)
  page.drawText(subtitle, {
    x: (width - subtitleWidth) / 2,
    y: height - 320,
    size: subtitleSize,
    font: helvetica,
    color: brandGreen,
  })

  // Decorative line
  page.drawRectangle({
    x: (width - 200) / 2,
    y: height - 370,
    width: 200,
    height: 3,
    color: brandGreen,
  })

  // "Complete Site Export"
  const exportTitle = 'Complete Site Export'
  const exportTitleSize = 36
  const exportTitleWidth = helveticaBold.widthOfTextAtSize(exportTitle, exportTitleSize)
  page.drawText(exportTitle, {
    x: (width - exportTitleWidth) / 2,
    y: height - 440,
    size: exportTitleSize,
    font: helveticaBold,
    color: slate700,
  })

  // Date
  const dateStr = new Date().toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
  const dateSize = 16
  const dateWidth = helvetica.widthOfTextAtSize(dateStr, dateSize)
  page.drawText(dateStr, {
    x: (width - dateWidth) / 2,
    y: height - 480,
    size: dateSize,
    font: helvetica,
    color: slate500,
  })

  // Website URL at bottom
  const url = 'www.cindyzody.com'
  const urlSize = 14
  const urlWidth = helvetica.widthOfTextAtSize(url, urlSize)
  page.drawText(url, {
    x: (width - urlWidth) / 2,
    y: 60,
    size: urlSize,
    font: helvetica,
    color: brandGreen,
  })

  // Draw decorative bottom bar
  page.drawRectangle({
    x: 0,
    y: 0,
    width: width,
    height: 30,
    color: brandGreen,
  })

  return page
}

/**
 * Combine all verified PDFs into one document
 */
async function combinePDFs(outputDir, verifiedFiles, combinedFilename = 'cindyzody-complete-site.pdf') {
  // Filter out excluded files
  const filesToCombine = verifiedFiles.filter(({ file }) => !excludeFromCombined.has(file))
  const excludedCount = verifiedFiles.length - filesToCombine.length

  console.log(`\n📚 Combining ${filesToCombine.length} PDFs...`)
  if (excludedCount > 0) {
    console.log(`   (${excludedCount} excluded: ${[...excludeFromCombined].join(', ')})\n`)
  } else {
    console.log('')
  }

  const mergedPdf = await PDFDocument.create()

  // Add title page first
  console.log('   📄 Creating title page...')
  await createTitlePage(mergedPdf)

  for (const { file } of filesToCombine) {
    const filepath = join(outputDir, file)
    console.log(`   📄 Adding ${file}...`)

    try {
      const pdfBytes = await readFile(filepath)
      const pdf = await PDFDocument.load(pdfBytes, { ignoreEncryption: true })
      const copiedPages = await mergedPdf.copyPages(pdf, pdf.getPageIndices())
      copiedPages.forEach(page => mergedPdf.addPage(page))
    } catch (error) {
      console.log(`   ⚠️  Skipping ${file}: ${error.message}`)
    }
  }

  const totalPages = mergedPdf.getPageCount()
  const combinedPath = join(outputDir, combinedFilename)

  const pdfBytes = await mergedPdf.save()
  await writeFile(combinedPath, pdfBytes)

  const stats = await stat(combinedPath)

  console.log(`\n${'─'.repeat(50)}`)
  console.log(`\n✨ Combined PDF Created!\n`)
  console.log(`   File:  ${combinedFilename}`)
  console.log(`   Pages: ${totalPages} (includes title page)`)
  console.log(`   Size:  ${(stats.size / 1024 / 1024).toFixed(2)}MB`)
  console.log(`   Path:  ${combinedPath}\n`)

  return { path: combinedPath, pages: totalPages, size: stats.size }
}

// Parse command line arguments
const args = process.argv.slice(2)
let baseUrl = 'http://localhost:21002'
let outputDir = './pdfs'
let skipGenerate = false

for (let i = 0; i < args.length; i++) {
  if (args[i] === '--base-url' && args[i + 1]) {
    baseUrl = args[++i]
  } else if (args[i] === '--output-dir' && args[i + 1]) {
    outputDir = args[++i]
  } else if (args[i] === '--verify-only') {
    skipGenerate = true
  }
}

// Run the full pipeline: generate → verify → combine
async function run() {
  let generatedFiles = routes.map(r => `${r.name}.pdf`)

  // Step 1: Generate PDFs (unless --verify-only)
  if (!skipGenerate) {
    const results = await generatePDFs(baseUrl, outputDir)

    if (results.failed.length > 0) {
      console.log('\n⚠️  Some pages failed to generate. Continuing with verification...\n')
      // Only verify files that were successfully generated
      generatedFiles = results.success.map(s => s.file)
    }
  }

  // Step 2: Verify all PDFs
  const verification = await verifyPDFs(outputDir, generatedFiles)

  if (verification.failed.length > 0) {
    console.log('\n⚠️  Some PDFs failed verification. Only valid PDFs will be combined.\n')
  }

  if (verification.passed.length === 0) {
    console.log('\n❌ No valid PDFs to combine. Exiting.\n')
    return { success: false }
  }

  // Step 3: Combine all verified PDFs
  const combined = await combinePDFs(outputDir, verification.passed)

  console.log('─'.repeat(50))
  console.log('\n🎉 All done!\n')

  return {
    success: verification.failed.length === 0,
    generated: generatedFiles.length,
    verified: verification.passed.length,
    failed: verification.failed.length,
    combined
  }
}

run()
  .then(result => {
    process.exit(result.success ? 0 : 1)
  })
  .catch(err => {
    console.error('Fatal error:', err)
    process.exit(1)
  })
