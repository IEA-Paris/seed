/**
 * Generates JPEG cover thumbnails (page 1) for each annual report PDF.
 * Output: public/images/reports/<year>-<lang>.jpg
 *
 * Requires: pdftoppm (poppler-utils) — available on Linux via: apt install poppler-utils
 * Usage: yarn thumbnails
 * Idempotent — skips files that already exist.
 */

import { existsSync, mkdirSync, writeFileSync, unlinkSync, copyFileSync } from "fs"
import { resolve, dirname } from "path"
import { fileURLToPath } from "url"
import { execFileSync } from "child_process"
import { tmpdir } from "os"

const __dirname = dirname(fileURLToPath(import.meta.url))
const OUTPUT_DIR = resolve(__dirname, "../public/images/reports")

const REPORTS = [
  {
    year: 2024,
    lang: "en",
    href: "https://cdn-yggdrasil-dev.s3.eu-west-2.amazonaws.com/iea/publications/tmp/pdf/en/MAQ_IEA_RA_2024__12_25_ANG_BAT_NUM_compressed_compressed.pdf",
  },
  {
    year: 2023,
    lang: "en",
    href: "https://cdn-yggdrasil-dev.s3.eu-west-2.amazonaws.com/iea/publications/tmp/pdf/en/MAQ_IEA_RA_2023_ANG_NUM_BAT_bd.pdf",
  },
  {
    year: 2024,
    lang: "fr",
    href: "https://cdn-yggdrasil-dev.s3.eu-west-2.amazonaws.com/iea/publications/tmp/pdf/fr/MAQ_IEA_RA_2024__10_25_FR_BAT-avec_compression.pdf",
  },
  {
    year: 2023,
    lang: "fr",
    href: "https://cdn-yggdrasil-dev.s3.eu-west-2.amazonaws.com/iea/publications/tmp/pdf/fr/rapport_annuel_2023_FINAL_fin_08.pdf",
  },
  {
    year: 2022,
    lang: "fr",
    href: "https://cdn-yggdrasil-dev.s3.eu-west-2.amazonaws.com/iea/publications/tmp/pdf/fr/Rapport_annuel_2022_BAT2807.pdf",
  },
  {
    year: 2021,
    lang: "fr",
    href: "https://cdn-yggdrasil-dev.s3.eu-west-2.amazonaws.com/iea/publications/tmp/pdf/fr/Rapport_Annuel_2021_IEA_de_Paris.pdf",
  },
  {
    year: 2020,
    lang: "fr",
    href: "https://cdn-yggdrasil-dev.s3.eu-west-2.amazonaws.com/iea/publications/tmp/pdf/fr/Rapport_annuel_IEA2020.pdf",
  },
]

async function fetchPdf(url) {
  const res = await fetch(url)
  if (!res.ok) throw new Error(`HTTP ${res.status} fetching ${url}`)
  return Buffer.from(await res.arrayBuffer())
}

/**
 * Uses pdftoppm (poppler-utils) to render page 1 of the PDF to JPEG.
 * Produces a proper high-quality rasterization without any DOM dependencies.
 */
function renderWithPdftoppm(pdfBuffer, outputPath, { dpi = 96 } = {}) {
  const id = Date.now()
  const tmpPdf = resolve(tmpdir(), `report-${id}.pdf`)
  const tmpPrefix = resolve(tmpdir(), `report-thumb-${id}`)
  try {
    writeFileSync(tmpPdf, pdfBuffer)
    execFileSync("pdftoppm", [
      "-jpeg",
      "-f", "1",
      "-l", "1",
      "-r", String(dpi),
      "-jpegopt", "quality=88",
      tmpPdf,
      tmpPrefix,
    ])
    // pdftoppm names output: <prefix>-1.jpg or <prefix>-01.jpg depending on page count
    const candidates = [
      `${tmpPrefix}-1.jpg`,
      `${tmpPrefix}-01.jpg`,
      `${tmpPrefix}-001.jpg`,
    ]
    const generated = candidates.find(existsSync)
    if (!generated) throw new Error("pdftoppm did not produce expected output file")
    copyFileSync(generated, outputPath)
    unlinkSync(generated)
  } finally {
    if (existsSync(tmpPdf)) unlinkSync(tmpPdf)
  }
}

async function main() {
  // Verify pdftoppm is available
  try {
    execFileSync("pdftoppm", ["-v"], { stdio: "pipe" })
  } catch {
    console.error("pdftoppm not found. Install poppler-utils:\n  apt install poppler-utils")
    process.exit(1)
  }

  mkdirSync(OUTPUT_DIR, { recursive: true })

  for (const report of REPORTS) {
    const filename = `${report.year}-${report.lang}.jpg`
    const outputPath = resolve(OUTPUT_DIR, filename)

    if (existsSync(outputPath)) {
      console.log(`  skip  ${filename} (already exists)`)
      continue
    }

    process.stdout.write(`  fetch ${filename} ...`)
    const data = await fetchPdf(report.href)
    process.stdout.write(` render ...`)
    renderWithPdftoppm(data, outputPath)
    console.log(` done`)
  }

  console.log("\nAll thumbnails generated in public/images/reports/")
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
