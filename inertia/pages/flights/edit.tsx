import Page from '~/components/page'
import AppLayout from '~/layouts/app'
import { type Data } from '@generated/data'
import { type InertiaProps } from '~/types'
import { Form } from '@adonisjs/inertia/react'
import FlightFields from '~/components/flight_fields'

type Props = InertiaProps<{ flight: Data.Flight }>

export default function EditFlight({ flight }: Props) {
  return (
    <Page title="Edit flight">
      <Form route="flights.update" routeParams={{ id: flight.id }}>
        {({ errors, processing }) => (
          <div className="auth__form">
            <FlightFields errors={errors} flight={flight} />
            <button type="submit" className="btn btn--primary" disabled={processing}>
              {processing ? 'Saving…' : 'Save changes'}
            </button>
          </div>
        )}
      </Form>
    </Page>
  )
}

EditFlight.layout = [AppLayout]
