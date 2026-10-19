import Airport from '#models/airport'
import { flightValidator } from '#validators/flight'
import type { HttpContext } from '@adonisjs/core/http'

export default class FlightsController {
  async create({ inertia }: HttpContext) {
    return inertia.render('flights/create', {})
  }

  async store({ request, response, auth, session }: HttpContext) {
    const data = await request.validateUsing(flightValidator)

    const departure = await Airport.findByOrFail('icao', data.departure)
    const destination = await Airport.findByOrFail('icao', data.destination)
    const divertedTo = data.divertedTo ? await Airport.findByOrFail('icao', data.divertedTo) : null

    // En cas de déroutement, l'arrivée réelle est l'aéroport de déroutement et la destination devient "prévue"
    await auth
      .getUserOrFail()
      .related('flights')
      .create({
        departureAirportId: departure.id,
        arrivalAirportId: divertedTo ? divertedTo.id : destination.id,
        plannedArrivalAirportId: divertedTo ? destination.id : null,
        aircraft: data.aircraft,
        flownOn: data.flownOn,
        durationMinutes: data.durationMinutes,
        notes: data.notes,
      })

    session.flash('success', 'Flight saved')
    return response.redirect().toRoute('dashboard')
  }
}
