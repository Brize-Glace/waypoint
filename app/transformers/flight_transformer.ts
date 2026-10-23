import { BaseTransformer } from '@adonisjs/core/transformers'
import type Flight from '#models/flight'
import AirportTransformer from '#transformers/airport_transformer'

export default class FlightTransformer extends BaseTransformer<Flight> {
  toObject() {
    return {
      ...this.pick(this.resource, ['id', 'aircraft', 'durationMinutes', 'notes']),
      flownOn: this.resource.flownOn.toFormat('yyyy-MM-dd'),
      departure: AirportTransformer.transform(this.resource.departure),
      arrival: AirportTransformer.transform(this.resource.arrival),
      plannedArrival: this.resource.plannedArrival
        ? AirportTransformer.transform(this.resource.plannedArrival)
        : null,
    }
  }
}
