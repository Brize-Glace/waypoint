import Page from '~/components/page'
import AppLayout from '~/layouts/app'
import { type Data } from '@generated/data'
import { type InertiaProps } from '~/types'
import { Form, Link } from '@adonisjs/inertia/react'
import { formatDuration } from '~/lib/format'

type Props = InertiaProps<{ flight: Data.Flight }>

export default function ShowFlight({ flight }: Props) {
  return (
    <Page
      title={`${flight.departure.icao} → ${flight.arrival.icao}`}
      actions={
        <>
          <Link
            route="flights.edit"
            routeParams={{ id: flight.id }}
            className="btn btn--secondary btn--sm"
          >
            Edit
          </Link>
          <Form
            route="flights.destroy"
            routeParams={{ id: flight.id }}
            onBefore={() => confirm('Delete this flight?')}
          >
            <button type="submit" className="btn btn--secondary btn--sm">
              Delete
            </button>
          </Form>
        </>
      }
    >
      <dl>
        <dt>Date</dt>
        <dd className="mono">{flight.flownOn}</dd>

        <dt>From</dt>
        <dd>
          <span className="mono">{flight.departure.icao}</span> {flight.departure.name}
        </dd>

        <dt>To</dt>
        <dd>
          <span className="mono">{flight.arrival.icao}</span> {flight.arrival.name}
        </dd>

        {flight.plannedArrival && (
          <>
            <dt>Planned destination (diverted)</dt>
            <dd>
              <span className="mono">{flight.plannedArrival.icao}</span>{' '}
              {flight.plannedArrival.name}
            </dd>
          </>
        )}

        <dt>Aircraft</dt>
        <dd>{flight.aircraft}</dd>

        <dt>Duration</dt>
        <dd className="mono">{formatDuration(flight.durationMinutes)}</dd>

        {flight.notes && (
          <>
            <dt>Notes</dt>
            <dd>{flight.notes}</dd>
          </>
        )}
      </dl>
    </Page>
  )
}

ShowFlight.layout = [AppLayout]
