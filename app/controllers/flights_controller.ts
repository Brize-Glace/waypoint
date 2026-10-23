import Airport from '#models/airport'
import { flightValidator } from '#validators/flight'
import type { HttpContext } from '@adonisjs/core/http'
import FlightTransformer from '#transformers/flight_transformer'
import type { Infer } from '@vinejs/vine/types'

export default class FlightsController {
  async index({ inertia, auth }: HttpContext) {
    const flights = await auth
      .getUserOrFail()
      .related('flights')
      .query()
      .preload('departure')
      .preload('arrival')
      .preload('plannedArrival')
      .orderBy('flown_on', 'desc')
      .orderBy('id', 'desc')

    return inertia.render('flights/index', { flights: FlightTransformer.transform(flights) })
  }

  async create({ inertia }: HttpContext) {
    return inertia.render('flights/create', {})
  }

  async store({ request, response, auth, session }: HttpContext) {
    const data = await request.validateUsing(flightValidator)

    await auth
      .getUserOrFail()
      .related('flights')
      .create(await this.toFlightAttributes(data))

    session.flash('success', 'Flight saved')
    return response.redirect().toRoute('flights.index')
  }

  async show({ inertia, auth, params }: HttpContext) {
    const flight = await this.findUserFlight(auth, params.id)
    return inertia.render('flights/show', { flight: FlightTransformer.transform(flight) })
  }

  async edit({ inertia, auth, params }: HttpContext) {
    const flight = await this.findUserFlight(auth, params.id)
    return inertia.render('flights/edit', { flight: FlightTransformer.transform(flight) })
  }

  async update({ request, response, auth, params, session }: HttpContext) {
    const flight = await this.findUserFlight(auth, params.id)
    const data = await request.validateUsing(flightValidator)

    flight.merge(await this.toFlightAttributes(data))
    await flight.save()

    session.flash('success', 'Flight updated')
    return response.redirect().toRoute('flights.show', { id: flight.id })
  }

  async destroy({ response, auth, params, session }: HttpContext) {
    const flight = await this.findUserFlight(auth, params.id)
    await flight.delete()

    session.flash('success', 'Flight deleted')
    return response.redirect().toRoute('flights.index')
  }

  // Seul point d'accès à un vol existant : la requête part de l'utilisateur connecté, le vol d'un autre renvoie une 404
  private async findUserFlight(auth: HttpContext['auth'], id: string) {
    return auth
      .getUserOrFail()
      .related('flights')
      .query()
      .where('id', id)
      .preload('departure')
      .preload('arrival')
      .preload('plannedArrival')
      .firstOrFail()
  }

  // En cas de déroutement, l'arrivée réelle est l'aéroport de déroutement et la destination devient "prévue"
  private async toFlightAttributes(data: Infer<typeof flightValidator>) {
    const departure = await Airport.findByOrFail('icao', data.departure)
    const destination = await Airport.findByOrFail('icao', data.destination)
    const divertedTo = data.divertedTo ? await Airport.findByOrFail('icao', data.divertedTo) : null

    return {
      departureAirportId: departure.id,
      arrivalAirportId: divertedTo ? divertedTo.id : destination.id,
      plannedArrivalAirportId: divertedTo ? destination.id : null,
      aircraft: data.aircraft,
      flownOn: data.flownOn,
      durationMinutes: data.durationMinutes,
      notes: data.notes,
    }
  }
}
