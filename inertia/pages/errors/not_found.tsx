import { Link } from '@adonisjs/inertia/react'
import MarketingLayout from '~/layouts/marketing'

export default function NotFound() {
  return (
    <main className="landing landing--message">
      <div>
        <p className="landing__code">404</p>
        <h1 className="landing__title">This page isn&apos;t on the chart.</h1>
        <p className="landing__lead">
          The link may be wrong, or the flight it pointed to was deleted.
        </p>
        <div className="landing__actions">
          <Link route="flights.index" className="btn btn--primary">
            Back to the logbook
          </Link>
        </div>
      </div>
    </main>
  )
}

NotFound.layout = [MarketingLayout]
