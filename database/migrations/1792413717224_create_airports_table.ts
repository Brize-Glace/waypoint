import { BaseSchema } from '@adonisjs/lucid/schema'

// Pas de timestamps : table de référence remplie par le seeder OurAirports, jamais éditée par l'utilisateur
export default class extends BaseSchema {
  protected tableName = 'airports'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string('icao', 4).notNullable().unique()
      table.string('name').notNullable()
      // Nullable car la colonne "municipality" est parfois vide dans le CSV OurAirports
      table.string('city').nullable()
      table.string('country', 2).notNullable()
      table.double('latitude').notNullable()
      table.double('longitude').notNullable()
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
