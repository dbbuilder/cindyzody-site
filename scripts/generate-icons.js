#!/usr/bin/env node

/**
 * Icon Generator Script
 * Generates all required icon sizes for web and iOS from SVG source
 */

import sharp from 'sharp'
import { readFileSync, mkdirSync, existsSync, writeFileSync } from 'fs'
import { join, dirname } from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)
const ROOT_DIR = join(__dirname, '..')

// Icon configurations
const WEB_ICONS = [
  { size: 16, name: 'favicon-16x16.png' },
  { size: 32, name: 'favicon-32x32.png' },
  { size: 48, name: 'favicon-48x48.png' },
  { size: 64, name: 'favicon-64x64.png' },
  { size: 96, name: 'favicon-96x96.png' },
  { size: 128, name: 'favicon-128x128.png' },
  { size: 180, name: 'apple-touch-icon.png' },
  { size: 192, name: 'android-chrome-192x192.png' },
  { size: 512, name: 'android-chrome-512x512.png' },
]

const IOS_ICONS = [
  { size: 20, scales: [1, 2, 3], idiom: 'iphone', purpose: 'notification' },
  { size: 29, scales: [1, 2, 3], idiom: 'iphone', purpose: 'settings' },
  { size: 40, scales: [2, 3], idiom: 'iphone', purpose: 'spotlight' },
  { size: 60, scales: [2, 3], idiom: 'iphone', purpose: 'app' },
  { size: 20, scales: [1, 2], idiom: 'ipad', purpose: 'notification' },
  { size: 29, scales: [1, 2], idiom: 'ipad', purpose: 'settings' },
  { size: 40, scales: [1, 2], idiom: 'ipad', purpose: 'spotlight' },
  { size: 76, scales: [1, 2], idiom: 'ipad', purpose: 'app' },
  { size: 83.5, scales: [2], idiom: 'ipad', purpose: 'app' },
  { size: 1024, scales: [1], idiom: 'ios-marketing', purpose: 'app-store' },
]

async function generateWebIcons() {
  console.log('Generating web icons...')

  const svgPath = join(ROOT_DIR, 'src/assets/icons/app-icon.svg')
  const faviconSvgPath = join(ROOT_DIR, 'src/assets/icons/favicon.svg')
  const outputDir = join(ROOT_DIR, 'public')

  if (!existsSync(outputDir)) {
    mkdirSync(outputDir, { recursive: true })
  }

  const svg = readFileSync(svgPath)
  const faviconSvg = readFileSync(faviconSvgPath)

  for (const icon of WEB_ICONS) {
    const outputPath = join(outputDir, icon.name)
    // Use favicon SVG for small sizes, app icon for larger
    const sourceSvg = icon.size <= 64 ? faviconSvg : svg

    await sharp(sourceSvg)
      .resize(icon.size, icon.size)
      .png()
      .toFile(outputPath)

    console.log(`  Created ${icon.name}`)
  }

  // Also copy favicon.svg to public
  const faviconSvgOut = join(outputDir, 'favicon.svg')
  writeFileSync(faviconSvgOut, faviconSvg)
  console.log('  Copied favicon.svg')
}

async function generateIOSIcons() {
  console.log('Generating iOS icons...')

  const svgPath = join(ROOT_DIR, 'src/assets/icons/app-icon.svg')
  const outputDir = join(ROOT_DIR, 'ios/App/App/Assets.xcassets/AppIcon.appiconset')

  if (!existsSync(outputDir)) {
    mkdirSync(outputDir, { recursive: true })
  }

  const svg = readFileSync(svgPath)
  const contents = {
    images: [],
    info: {
      author: 'xcode',
      version: 1
    }
  }

  for (const config of IOS_ICONS) {
    for (const scale of config.scales) {
      const pixelSize = Math.round(config.size * scale)
      const filename = `AppIcon-${config.size}@${scale}x.png`
      const outputPath = join(outputDir, filename)

      await sharp(svg)
        .resize(pixelSize, pixelSize)
        .png()
        .toFile(outputPath)

      contents.images.push({
        filename,
        idiom: config.idiom,
        scale: `${scale}x`,
        size: `${config.size}x${config.size}`
      })

      console.log(`  Created ${filename} (${pixelSize}x${pixelSize})`)
    }
  }

  // Write Contents.json
  const contentsPath = join(outputDir, 'Contents.json')
  writeFileSync(contentsPath, JSON.stringify(contents, null, 2))
  console.log('  Created Contents.json')
}

async function generateSplashScreen() {
  console.log('Generating splash screen...')

  const svgPath = join(ROOT_DIR, 'src/assets/icons/app-icon.svg')
  const outputDir = join(ROOT_DIR, 'ios/App/App/Assets.xcassets/Splash.imageset')

  if (!existsSync(outputDir)) {
    mkdirSync(outputDir, { recursive: true })
  }

  const svg = readFileSync(svgPath)
  const sizes = [
    { name: 'splash-2732x2732.png', size: 2732 },
    { name: 'splash-2732x2732-1.png', size: 2732 },
    { name: 'splash-2732x2732-2.png', size: 2732 },
  ]

  for (const splash of sizes) {
    const outputPath = join(outputDir, splash.name)

    // Create splash with icon centered on white background
    const iconSize = Math.round(splash.size * 0.3)
    const icon = await sharp(svg)
      .resize(iconSize, iconSize)
      .png()
      .toBuffer()

    await sharp({
      create: {
        width: splash.size,
        height: splash.size,
        channels: 4,
        background: { r: 250, g: 250, b: 249, alpha: 1 }
      }
    })
      .composite([{
        input: icon,
        gravity: 'center'
      }])
      .png()
      .toFile(outputPath)

    console.log(`  Created ${splash.name}`)
  }
}

async function main() {
  console.log('Icon Generation Script')
  console.log('======================\n')

  try {
    await generateWebIcons()
    console.log()
    await generateIOSIcons()
    console.log()
    await generateSplashScreen()
    console.log('\nDone! All icons generated successfully.')
  } catch (error) {
    console.error('Error generating icons:', error)
    process.exit(1)
  }
}

main()
