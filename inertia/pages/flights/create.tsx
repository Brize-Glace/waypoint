import Page from '~/components/page'
import AppLayout from '~/layouts/app'
import { Form } from '@adonisjs/inertia/react'
import FlightFields from '~/components/flight_fields'

export default function CreateFlight() {
  return (
    <Page title="New flight">
      <Form route="flights.store">
        {({ errors, processing }) => (
          <div className="auth__form">
            <FlightFields errors={errors} />
            <button type="submit" className="btn btn--primary" disabled={processing}>
              {processing ? 'Saving…' : 'Save flight'}
            </button>
          </div>
        )}
      </Form>
    </Page>
  )
}

CreateFlight.layout = [AppLayout]
