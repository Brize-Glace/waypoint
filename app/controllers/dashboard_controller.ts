import type { HttpContext } from '@adonisjs/core/http'
import { computeStats } from '#services/stats'

export default class DashboardController {
  async index({ inertia, auth }: HttpContext) {
    const flights = await auth
      .getUserOrFail()
      .related('flights')
      .query()
      .preload('departure')
      .preload('arrival')
      .orderBy('flown_on', 'desc')
      .orderBy('id', 'desc')

    return inertia.render('dashboard', { stats: computeStats(flights) })
  }
}
