import { readFile } from 'node:fs/promises'
import app from '@adonisjs/core/services/app'
import { BaseSeeder } from '@adonisjs/lucid/seeders'
import { parse } from 'csv-parse/sync'
import Airport from '#models/airport'

type AirportCsvRow = {
  icao: string
  name: string
  city: string
  country: string
  latitude: string
  longitude: string
}
export default class extends BaseSeeder {
  async run() {
    const csv = await readFile(app.makePath('database/data/airports.csv'), 'utf-8')
    const rows = parse(csv, { columns: true }) as AirportCsvRow[]

    const airports = rows.map((row) => ({
      icao: row.icao,
      name: row.name,
      city: row.city || null,
      country: row.country,
      latitude: Number(row.latitude),
      longitude: Number(row.longitude),
    }))

    // je fait un updateOrCreate au lieu de create: comme ça relancer db:seed met à jour sans créer de doublons
    await Airport.updateOrCreateMany('icao', airports)
  }
}
