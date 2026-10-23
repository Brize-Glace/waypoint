import Page from '~/components/page'
import AppLayout from '~/layouts/app'
import { type Data } from '@generated/data'
import { type InertiaProps } from '~/types'
import { Link } from '@adonisjs/inertia/react'
import { formatDuration } from '~/lib/format'

type Props = InertiaProps<{ flights: Data.Flight[] }>

export default function FlightsIndex({ flights }: Props) {
  return (
    <Page
      title="Logbook"
      actions={
        <Link route="flights.create" className="btn btn--primary btn--sm">
          New flight
        </Link>
      }
    >
      {flights.length === 0 ? (
        <p>No flights yet. Log your first one!</p>
      ) : (
        <table className="logbook">
          <thead>
            <tr>
              <th>Date</th>
              <th>From</th>
              <th>To</th>
              <th>Aircraft</th>
              <th>Duration</th>
            </tr>
          </thead>
          <tbody>
            {flights.map((flight) => (
              <tr key={flight.id}>
                <Link route="flights.show" routeParams={{ id: flight.id }}>
                  <td className="mono">{flight.flownOn}</td>
                </Link>
                <td className="mono">{flight.departure.icao}</td>
                <td className="mono">
                  {flight.arrival.icao}
                  {flight.plannedArrival && ` (planned ${flight.plannedArrival.icao})`}
                </td>
                <td>{flight.aircraft}</td>
                <td className="mono">{formatDuration(flight.durationMinutes)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </Page>
  )
}

FlightsIndex.layout = [AppLayout]
