import Page from '~/components/page'
import AppLayout from '~/layouts/app'
import { type Data } from '@generated/data'
import { type InertiaProps } from '~/types'
import { Form, Link } from '@adonisjs/inertia/react'
import FlightFields from '~/components/flight_fields'

type Props = InertiaProps<{ flight: Data.Flight }>

export default function EditFlight({ flight }: Props) {
  return (
    <Page
      title="Edit flight"
      back={
        <Link route="flights.show" routeParams={{ id: flight.id }} className="backlink">
          ← Back to flight
        </Link>
      }
    >
      <Form route="flights.update" routeParams={{ id: flight.id }}>
        {({ errors, processing }) => (
          <div className="flight-form">
            <FlightFields errors={errors} flight={flight} />
            <div className="flight-form__actions">
              <button type="submit" className="btn btn--primary" disabled={processing}>
                {processing ? 'Saving…' : 'Save changes'}
              </button>
              <Link route="flights.show" routeParams={{ id: flight.id }} className="btn btn--quiet">
                Cancel
              </Link>
            </div>
          </div>
        )}
      </Form>
    </Page>
  )
}

EditFlight.layout = [AppLayout]
