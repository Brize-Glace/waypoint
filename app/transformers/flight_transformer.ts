import { BaseTransformer } from '@adonisjs/core/transformers'
import type Flight from '#models/flight'
import AirportTransformer from '#transformers/airport_transformer'
import { distanceNm } from '#services/geo'

export default class FlightTransformer extends BaseTransformer<Flight> {
  toObject() {
    return {
      ...this.pick(this.resource, ['id', 'aircraft', 'durationMinutes', 'notes']),
      flownOn: this.resource.flownOn.toFormat('yyyy-MM-dd'),
      distanceNm: Math.round(distanceNm(this.resource.departure, this.resource.arrival)),
      departure: AirportTransformer.transform(this.resource.departure),
      arrival: AirportTransformer.transform(this.resource.arrival),
      plannedArrival: this.resource.plannedArrival
        ? AirportTransformer.transform(this.resource.plannedArrival)
        : null,
    }
  }
}
