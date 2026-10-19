import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'flights'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')

      table
        .integer('user_id')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('users')
        .onDelete('CASCADE')

      table
        .integer('departure_airport_id')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('airports')

      table
        .integer('arrival_airport_id')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('airports')

      // Déroutement : arrival = où l'avion s'est posé, planned_arrival = la destination prévue (sinon null)
      table
        .integer('planned_arrival_airport_id')
        .unsigned()
        .nullable()
        .references('id')
        .inTable('airports')

      table.string('aircraft', 50).notNullable()
      table.date('flown_on').notNullable()
      table.integer('duration_minutes').unsigned().notNullable()
      table.text('notes').nullable()

      table.timestamp('created_at').notNullable()
      table.timestamp('updated_at').nullable()

      // Le logbook liste toujours les vols d'un pilote triés par date
      table.index(['user_id', 'flown_on'])
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
