import Page from '~/components/page'
import Route from '~/components/route'
import AppLayout from '~/layouts/app'
import { type Data } from '@generated/data'
import { type InertiaProps } from '~/types'
import { Link } from '@adonisjs/inertia/react'
import { formatDay, formatDuration, formatMonth, formatNumber } from '~/lib/format'

type Props = InertiaProps<{ flights: Data.Flight[] }>

// Les vols arrivent déjà triés du plus récent au plus ancien : on les regroupe par mois "yyyy-MM"
function groupByMonth(flights: Data.Flight[]) {
  const months = new Map<string, Data.Flight[]>()
  for (const flight of flights) {
    const month = flight.flownOn.slice(0, 7)
    months.set(month, [...(months.get(month) ?? []), flight])
  }
  return [...months]
}

export default function FlightsIndex({ flights }: Props) {
  if (flights.length === 0) {
    return (
      <Page title="Logbook">
        <div className="empty">
          <p className="empty__title">No flights logged yet</p>
          <p className="empty__text">
            Each flight you log appears here, grouped by month with its block time.
          </p>
          <Link route="flights.create" className="btn btn--primary">
            Log your first flight
          </Link>
        </div>
      </Page>
    )
  }

  return (
    <Page
      title="Logbook"
      description={`${flights.length} ${flights.length === 1 ? 'flight' : 'flights'}`}
    >
      <div className="logbook__columns" aria-hidden="true">
        <span>Date</span>
        <span>Route</span>
        <span>Aircraft</span>
        <span>Block</span>
        <span>Distance</span>
      </div>

      {groupByMonth(flights).map(([month, monthFlights]) => {
        const monthMinutes = monthFlights.reduce((sum, flight) => sum + flight.durationMinutes, 0)
        return (
          <section key={month} className="month" aria-labelledby={`month-${month}`}>
            <header className="month__head">
              <h2 id={`month-${month}`} className="month__title">
                {formatMonth(month)}
              </h2>
              <span className="month__total">
                {monthFlights.length} {monthFlights.length === 1 ? 'flight' : 'flights'} ·{' '}
                {formatDuration(monthMinutes)}
              </span>
            </header>

            <ul className="strips">
              {monthFlights.map((flight) => (
                <li key={flight.id}>
                  <Link route="flights.show" routeParams={{ id: flight.id }} className="strip">
                    <span className="strip__date">{formatDay(flight.flownOn)}</span>
                    <span className="strip__route">
                      <Route from={flight.departure.icao} to={flight.arrival.icao} />
                      <span className="strip__places">
                        {flight.departure.city ?? flight.departure.name} →{' '}
                        {flight.arrival.city ?? flight.arrival.name}
                      </span>
                      {flight.plannedArrival && (
                        <span className="strip__diversion">
                          Diverted, planned {flight.plannedArrival.icao}
                        </span>
                      )}
                    </span>
                    <span className="strip__aircraft">{flight.aircraft}</span>
                    <span className="strip__time">{formatDuration(flight.durationMinutes)}</span>
                    <span className="strip__distance">{formatNumber(flight.distanceNm)} NM</span>
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        )
      })}
    </Page>
  )
}

FlightsIndex.layout = [AppLayout]
