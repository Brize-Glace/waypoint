import Page from '~/components/page'
import AppLayout from '~/layouts/app'
import { RouteLine } from '~/components/route'
import { type Data } from '@generated/data'
import { type InertiaProps } from '~/types'
import { Form, Link } from '@adonisjs/inertia/react'
import { formatDate, formatDuration, formatNumber } from '~/lib/format'

type Props = InertiaProps<{ flight: Data.Flight }>

function Place({ airport }: { airport: Data.Airport }) {
  return (
    <>
      <strong>{airport.name}</strong>
      {airport.city && `${airport.city}, `}
      {airport.country}
    </>
  )
}

export default function ShowFlight({ flight }: Props) {
  return (
    <Page
      title={`${flight.departure.icao} → ${flight.arrival.icao}`}
      hideTitle
      back={
        <Link route="flights.index" className="backlink">
          ← Logbook
        </Link>
      }
    >
      <div className="flight-head">
        <h1 className="flight-route">
          <span className="flight-route__code">{flight.departure.icao}</span>
          <RouteLine />
          <span className="sr-only">to</span>
          <span className="flight-route__code">{flight.arrival.icao}</span>
          <span className="flight-route__place">
            <Place airport={flight.departure} />
          </span>
          <span className="flight-route__place">
            <Place airport={flight.arrival} />
            {flight.plannedArrival && (
              <span className="flight-route__diversion">
                Diverted, planned {flight.plannedArrival.icao} ({flight.plannedArrival.name})
              </span>
            )}
          </span>
        </h1>

        <Link
          route="flights.edit"
          routeParams={{ id: flight.id }}
          className="btn btn--secondary btn--sm"
        >
          Edit flight
        </Link>
      </div>

      <dl className="facts">
        <div>
          <dt>Date</dt>
          <dd>{formatDate(flight.flownOn)}</dd>
        </div>
        <div>
          <dt>Aircraft</dt>
          <dd>{flight.aircraft}</dd>
        </div>
        <div>
          <dt>Block time</dt>
          <dd>{formatDuration(flight.durationMinutes)}</dd>
        </div>
        <div>
          <dt>Distance</dt>
          <dd>{formatNumber(flight.distanceNm)} NM</dd>
        </div>
      </dl>

      {flight.notes && (
        <section className="notes">
          <h2 className="heading">Notes</h2>
          <p>{flight.notes}</p>
        </section>
      )}

      {/* Action rare et destructive : en bas de page, sans poids visuel, avec confirmation */}
      <div className="flight-foot">
        <Form
          route="flights.destroy"
          routeParams={{ id: flight.id }}
          onBefore={() => confirm('Delete this flight from your logbook?')}
        >
          <button type="submit" className="btn btn--danger">
            Delete flight
          </button>
        </Form>
      </div>
    </Page>
  )
}

ShowFlight.layout = [AppLayout]
