import Page from '~/components/page'
import AppLayout from '~/layouts/app'
import { type Data } from '@generated/data'
import { type InertiaProps } from '~/types'
import { Link } from '@adonisjs/inertia/react'

type Props = InertiaProps<{ flights: Data.Flight[] }>

function formatDuration(minutes: number) {
  const hours = Math.floor(minutes / 60)
  const rest = minutes % 60
  return `${hours}h${String(rest).padStart(2, '0')}`
}

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
                <td className="mono">{flight.flownOn}</td>
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
