import { mkdir, writeFile } from 'node:fs/promises'
import { parse } from 'csv-parse/sync'
import { stringify } from 'csv-stringify/sync'

type OurAiportsRow = {
  type: string
  name: string
  latitude_deg: string
  longitude_deg: string
  iso_country: string
  municipality: string
  icao_code: string
}

const SOURCE_URL = 'https://davidmegginson.github.io/ourairports-data/airports.csv'
const OUTPUT_DIR = 'database/data'
const KEPT_TYPES = ['large_airport', 'medium_airport']
const ICAO_REGEX = /[A-Z]{4}$/

const response = await fetch(SOURCE_URL)
if (!response.ok) {
  throw new Error(`Download from source failed: ${response.status}`)
}

const csv = await response.text()

const rows = parse(csv, { columns: true }) as OurAiportsRow[]

const airports = rows
  .filter((row) => KEPT_TYPES.includes(row.type) && ICAO_REGEX.test(row.icao_code))
  .map((row) => ({
    icao: row.icao_code,
    name: row.name,
    city: row.municipality,
    country: row.iso_country,
    latitude: row.latitude_deg,
    longitude: row.longitude_deg,
  }))

await mkdir(OUTPUT_DIR, { recursive: true })
await writeFile(`${OUTPUT_DIR}/airports.csv`, stringify(airports, { header: true }))

console.log(`${airports.length} aiports wrote in ${OUTPUT_DIR}/aiports.csv`)
