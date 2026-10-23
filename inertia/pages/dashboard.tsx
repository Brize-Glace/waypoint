import Page from '~/components/page'
import AppLayout from '~/layouts/app'
import { type InertiaProps } from '~/types'
import type { Stats } from '#services/stats'
import { Link } from '@adonisjs/inertia/react'
import { formatDay, formatDuration, formatNumber } from '~/lib/format'

type Props = InertiaProps<{ stats: Stats }>

function plural(count: number, word: string) {
  return `${count} ${count === 1 ? word : `${word}s`}`
}

export default function Dashboard({ stats }: Props) {
  if (stats.totalFlights === 0) {
    return (
      <Page title="Overview">
        <div className="empty">
          <p className="empty__title">Your logbook is empty</p>
          <p className="empty__text">
            Log a flight and this page adds up your hours, nautical miles and airports.
          </p>
          <Link route="flights.create" className="btn btn--primary">
            Log your first flight
          </Link>
        </div>
      </Page>
    )
  }

  const maxPerMonth = Math.max(...stats.flightsPerMonth.map((month) => month.count))

  return (
    <Page title="Overview">
      {/* Les totaux de carrière sont la réponse principale de cet écran : chiffres en grand, sans encadré */}
      <dl className="totals">
        <div>
          <dt className="total__label">{stats.totalFlights === 1 ? 'flight' : 'flights'}</dt>
          <dd className="total__value">{formatNumber(stats.totalFlights)}</dd>
        </div>
        <div>
          <dt className="total__label">block time</dt>
          <dd className="total__value">{formatDuration(stats.totalMinutes)}</dd>
        </div>
        <div>
          <dt className="total__label">flown</dt>
          <dd className="total__value">
            {formatNumber(stats.totalDistanceNm)}
            <span className="total__unit">NM</span>
          </dd>
        </div>
        <div>
          <dt className="total__label">airports visited</dt>
          <dd className="total__value">{formatNumber(stats.airportsVisited)}</dd>
        </div>
      </dl>

      <div className="overview">
        <section aria-labelledby="per-month">
          <h2 id="per-month" className="heading">
            Flights per month
          </h2>
          <ul className="month-chart">
            {stats.flightsPerMonth.map((month) => (
              <li
                key={month.key}
                className="month-chart__col"
                aria-label={`${month.label}: ${plural(month.count, 'flight')}`}
              >
                <span className="month-chart__value" aria-hidden="true">
                  {month.count}
                </span>
                <span className="month-chart__track" aria-hidden="true">
                  <span
                    className="month-chart__bar"
                    style={{ height: `${maxPerMonth ? (month.count / maxPerMonth) * 100 : 0}%` }}
                  />
                </span>
                <span className="month-chart__label" aria-hidden="true">
                  {month.label}
                </span>
              </li>
            ))}
          </ul>
        </section>

        <section className="overview__records" aria-labelledby="records">
          <h2 id="records" className="heading">
            Records
          </h2>
          <dl className="records">
            {stats.lastFlight && (
              <div>
                <dt>Last flight</dt>
                <dd>
                  <Link
                    route="flights.show"
                    routeParams={{ id: stats.lastFlight.id }}
                    className="il"
                  >
                    {stats.lastFlight.route}
                  </Link>
                  <small>{formatDay(stats.lastFlight.flownOn)}</small>
                </dd>
              </div>
            )}
            <div>
              <dt>This month</dt>
              <dd>{plural(stats.flightsThisMonth, 'flight')}</dd>
            </div>
            {stats.topRoute && (
              <div>
                <dt>Most flown route</dt>
                <dd>
                  {stats.topRoute.value}
                  <small>{plural(stats.topRoute.count, 'time')}</small>
                </dd>
              </div>
            )}
            {stats.topAircraft && (
              <div>
                <dt>Favourite aircraft</dt>
                <dd>
                  {stats.topAircraft.value}
                  <small>{plural(stats.topAircraft.count, 'flight')}</small>
                </dd>
              </div>
            )}
          </dl>
        </section>
      </div>
    </Page>
  )
}

Dashboard.layout = [AppLayout]
