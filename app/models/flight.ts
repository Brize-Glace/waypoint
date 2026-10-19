import { FlightSchema } from '#database/schema'
import { belongsTo } from '@adonisjs/lucid/orm'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'
import Airport from '#models/airport'
import User from '#models/user'

// Les colonnes sont générées dans database/schema.ts à chaque migration : ici on ne déclare que les relations
export default class Flight extends FlightSchema {
  @belongsTo(() => User)
  declare user: BelongsTo<typeof User>

  @belongsTo(() => Airport, { foreignKey: 'departureAirportId' })
  declare departure: BelongsTo<typeof Airport>

  @belongsTo(() => Airport, { foreignKey: 'arrivalAirportId' })
  declare arrival: BelongsTo<typeof Airport>

  @belongsTo(() => Airport, { foreignKey: 'plannedArrivalAirportId' })
  declare plannedArrival: BelongsTo<typeof Airport>
}
