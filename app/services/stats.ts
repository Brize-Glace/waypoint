import { DateTime } from 'luxon'
import type Flight from '#models/flight'
import { distanceNm } from '#services/geo'

function mostFrequent(values: string[]) {
  const counts = new Map<string, number>()
  for (const value of values) {
    counts.set(value, (counts.get(value) ?? 0) + 1)
  }

  let best: { value: string; count: number } | null = null
  for (const [value, count] of counts) {
    if (!best || count > best.count) {
      best = { value, count }
    }
  }
  return best
}

// Attend les vols triés du plus récent au plus ancien, avec departure et arrival préchargés
export function computeStats(flights: Flight[]) {
  const now = DateTime.now()
  const lastFlight = flights[0]

  const lastTwelveMonths = Array.from({ length: 12 }, (_, index) =>
    now.startOf('month').minus({ months: 11 - index })
  )

  return {
    totalFlights: flights.length,
    totalMinutes: flights.reduce((sum, flight) => sum + flight.durationMinutes, 0),
    totalDistanceNm: Math.round(
      flights.reduce((sum, flight) => sum + distanceNm(flight.departure, flight.arrival), 0)
    ),
    airportsVisited: new Set(
      flights.flatMap((flight) => [flight.departure.icao, flight.arrival.icao])
    ).size,
    flightsThisMonth: flights.filter((flight) => flight.flownOn.hasSame(now, 'month')).length,
    topAircraft: mostFrequent(flights.map((flight) => flight.aircraft)),
    topRoute: mostFrequent(
      flights.map((flight) => `${flight.departure.icao} → ${flight.arrival.icao}`)
    ),
    lastFlight: lastFlight
      ? {
          id: lastFlight.id,
          route: `${lastFlight.departure.icao} → ${lastFlight.arrival.icao}`,
          flownOn: lastFlight.flownOn.toFormat('yyyy-MM-dd'),
        }
      : null,
    flightsPerMonth: lastTwelveMonths.map((month) => ({
      key: month.toFormat('yyyy-MM'),
      label: month.toFormat('MMM'),
      count: flights.filter((flight) => flight.flownOn.hasSame(month, 'month')).length,
    })),
  }
}

export type Stats = ReturnType<typeof computeStats>
