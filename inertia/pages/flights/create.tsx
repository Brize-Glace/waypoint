import Page from '~/components/page'
import AppLayout from '~/layouts/app'
import { Form, Link } from '@adonisjs/inertia/react'
import FlightFields from '~/components/flight_fields'

export default function CreateFlight() {
  return (
    <Page title="Log a flight">
      <Form route="flights.store">
        {({ errors, processing }) => (
          <div className="flight-form">
            <FlightFields errors={errors} />
            <div className="flight-form__actions">
              <button type="submit" className="btn btn--primary" disabled={processing}>
                {processing ? 'Saving…' : 'Log flight'}
              </button>
              <Link route="flights.index" className="btn btn--quiet">
                Cancel
              </Link>
            </div>
          </div>
        )}
      </Form>
    </Page>
  )
}

CreateFlight.layout = [AppLayout]
