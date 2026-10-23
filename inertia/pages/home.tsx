import { usePage } from '@inertiajs/react'
import { Link } from '@adonisjs/inertia/react'
import RouteArt from '~/components/route_art'
import MarketingLayout from '~/layouts/marketing'

export default function Home() {
  const { props } = usePage()

  return (
    <main className="landing">
      <div>
        <h1 className="landing__title">Every flight you fly in the sim, logged.</h1>
        <p className="landing__lead">
          Record your departure, destination, aircraft and block time. Waypoint keeps your logbook
          and adds up the hours, nautical miles and airports along the way.
        </p>
        <div className="landing__actions">
          {props.user ? (
            <Link route="flights.create" className="btn btn--primary">
              Log a flight
            </Link>
          ) : (
            <>
              <Link route="new_account.create" className="btn btn--primary">
                Create your logbook
              </Link>
              <Link route="session.create" className="il">
                I already have one
              </Link>
            </>
          )}
        </div>
      </div>

      <div className="landing__art chart-grid">
        <RouteArt />
      </div>
    </main>
  )
}

Home.layout = [MarketingLayout]
