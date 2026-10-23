import { useState, type ChangeEvent } from 'react'
import { type Data } from '@generated/data'
import { RouteLine } from '~/components/route'
import { formatDuration } from '~/lib/format'

type Props = {
  errors: Partial<Record<string, string>>
  flight?: Data.Flight
}

function upperCase(event: ChangeEvent<HTMLInputElement>) {
  event.target.value = event.target.value.toUpperCase()
}

function FieldError({ message }: { message?: string }) {
  return message ? <span className="field__error">{message}</span> : null
}

export default function FlightFields({ errors, flight }: Props) {
  const today = new Date().toISOString().slice(0, 10)

  // Traduction inverse du contrôleur : en base, arrival est l'arrivée réelle et plannedArrival la destination prévue
  const wasDiverted = Boolean(flight?.plannedArrival)
  const destination = flight?.plannedArrival ?? flight?.arrival
  const divertedTo = wasDiverted ? flight?.arrival : undefined

  const [diverted, setDiverted] = useState(wasDiverted)
  const [minutes, setMinutes] = useState(flight?.durationMinutes ?? 0)

  return (
    <>
      <fieldset className="flight-form__group">
        <legend className="flight-form__legend">Route</legend>

        <div className="route-fields">
          <div className="field">
            <label className="field__label" htmlFor="departure">
              Departure
            </label>
            <input
              id="departure"
              name="departure"
              className="field__input field__input--code"
              maxLength={4}
              placeholder="LFPG"
              autoComplete="off"
              aria-describedby="icao-hint"
              aria-invalid={errors.departure ? 'true' : undefined}
              defaultValue={flight?.departure.icao}
              onChange={upperCase}
            />
            <FieldError message={errors.departure} />
          </div>

          <RouteLine />

          <div className="field">
            <label className="field__label" htmlFor="destination">
              Destination
            </label>
            <input
              id="destination"
              name="destination"
              className="field__input field__input--code"
              maxLength={4}
              placeholder="EGLL"
              autoComplete="off"
              aria-describedby="icao-hint"
              aria-invalid={errors.destination ? 'true' : undefined}
              defaultValue={destination?.icao}
              onChange={upperCase}
            />
            <FieldError message={errors.destination} />
          </div>
        </div>
        <span id="icao-hint" className="field__hint">
          4-letter ICAO airport codes.
        </span>

        <label className="checkbox">
          <input
            type="checkbox"
            checked={diverted}
            onChange={(event) => setDiverted(event.target.checked)}
          />
          I landed somewhere else (diversion)
        </label>

        {diverted && (
          <div className="field flight-form__diversion">
            <label className="field__label" htmlFor="divertedTo">
              Landed at
            </label>
            <input
              id="divertedTo"
              name="divertedTo"
              className="field__input field__input--code"
              maxLength={4}
              autoComplete="off"
              aria-invalid={errors.divertedTo ? 'true' : undefined}
              defaultValue={divertedTo?.icao}
              onChange={upperCase}
            />
            <FieldError message={errors.divertedTo} />
          </div>
        )}
      </fieldset>

      <fieldset className="flight-form__group">
        <legend className="flight-form__legend">Flight</legend>

        <div className="flight-form__row">
          <div className="field">
            <label className="field__label" htmlFor="flownOn">
              Date
            </label>
            <input
              id="flownOn"
              name="flownOn"
              type="date"
              className="field__input"
              max={today}
              aria-invalid={errors.flownOn ? 'true' : undefined}
              defaultValue={flight?.flownOn}
            />
            <FieldError message={errors.flownOn} />
          </div>

          <div className="field">
            <label className="field__label" htmlFor="aircraft">
              Aircraft
            </label>
            <input
              id="aircraft"
              name="aircraft"
              className="field__input"
              placeholder="A320"
              aria-invalid={errors.aircraft ? 'true' : undefined}
              defaultValue={flight?.aircraft}
            />
            <FieldError message={errors.aircraft} />
          </div>

          <div className="field">
            <label className="field__label" htmlFor="durationMinutes">
              Block time (min)
            </label>
            <input
              id="durationMinutes"
              name="durationMinutes"
              type="number"
              min={1}
              max={1200}
              className="field__input"
              aria-describedby="duration-hint"
              aria-invalid={errors.durationMinutes ? 'true' : undefined}
              defaultValue={flight?.durationMinutes}
              onChange={(event) => setMinutes(Number(event.target.value))}
            />
            {/* Les pilotes lisent les durées en h:mm : on traduit la saisie en direct */}
            <span id="duration-hint" className="field__hint">
              {minutes > 0 ? `= ${formatDuration(Math.floor(minutes))}` : 'Gate to gate'}
            </span>
            <FieldError message={errors.durationMinutes} />
          </div>
        </div>
      </fieldset>

      <div className="field">
        <label className="field__label" htmlFor="notes">
          Notes <span className="muted">(optional)</span>
        </label>
        <textarea
          id="notes"
          name="notes"
          className="field__input"
          rows={4}
          placeholder="Weather, runway in use, anything worth remembering"
          aria-invalid={errors.notes ? 'true' : undefined}
          defaultValue={flight?.notes ?? ''}
        />
        <FieldError message={errors.notes} />
      </div>
    </>
  )
}
