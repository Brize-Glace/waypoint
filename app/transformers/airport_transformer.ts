import { BaseTransformer } from '@adonisjs/core/transformers'
import type Airport from '#models/airport'

export default class AirportTransformer extends BaseTransformer<Airport> {
  toObject() {
    return this.pick(this.resource, [
      'id',
      'icao',
      'name',
      'city',
      'country',
      'latitude',
      'longitude',
    ])
  }
}
