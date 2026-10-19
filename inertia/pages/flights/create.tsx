import { useState, type ChangeEvent } from 'react'
import Page from '~/components/page'
import AppLayout from '~/layouts/app'
import { Form } from '@adonisjs/inertia/react'

function upperCase(event: ChangeEvent<HTMLInputElement>) {
  event.target.value = event.target.value.toUpperCase()
}

export default function CreateFlight() {
  const [diverted, setDiverted] = useState(false)
  const today = new Date().toISOString().slice(0, 10)

  return (
    <Page title="New flight">
      <Form route="flights.store">
        {({ errors, processing }) => (
          <div className="auth__form">
            <div className="field">
              <label className="field__label" htmlFor="departure">
                Departure (ICAO)
              </label>
              <input
                id="departure"
                name="departure"
                className="field__input"
                maxLength={4}
                placeholder="LFPG"
                onChange={upperCase}
              />
              {errors.departure && <span className="field__error">{errors.departure}</span>}
            </div>

            <div className="field">
              <label className="field__label" htmlFor="destination">
                Destination (ICAO)
              </label>
              <input
                id="destination"
                name="destination"
                className="field__input"
                maxLength={4}
                placeholder="EGLL"
                onChange={upperCase}
              />
              {errors.destination && <span className="field__error">{errors.destination}</span>}
            </div>

            <label>
              <input
                type="checkbox"
                checked={diverted}
                onChange={(event) => setDiverted(event.target.checked)}
              />{' '}
              Diverted flight
            </label>

            {diverted && (
              <div className="field">
                <label className="field__label" htmlFor="divertedTo">
                  Diverted to (ICAO)
                </label>
                <input
                  id="divertedTo"
                  name="divertedTo"
                  className="field__input"
                  maxLength={4}
                  onChange={upperCase}
                />
                {errors.divertedTo && <span className="field__error">{errors.divertedTo}</span>}
              </div>
            )}

            <div className="field">
              <label className="field__label" htmlFor="aircraft">
                Aircraft
              </label>
              <input id="aircraft" name="aircraft" className="field__input" placeholder="A320" />
              {errors.aircraft && <span className="field__error">{errors.aircraft}</span>}
            </div>

            <div className="field">
              <label className="field__label" htmlFor="flownOn">
                Flight date
              </label>
              <input id="flownOn" name="flownOn" type="date" className="field__input" max={today} />
              {errors.flownOn && <span className="field__error">{errors.flownOn}</span>}
            </div>

            <div className="field">
              <label className="field__label" htmlFor="durationMinutes">
                Duration (minutes)
              </label>
              <input
                id="durationMinutes"
                name="durationMinutes"
                type="number"
                min={1}
                max={1200}
                className="field__input"
              />
              {errors.durationMinutes && (
                <span className="field__error">{errors.durationMinutes}</span>
              )}
            </div>

            <div className="field">
              <label className="field__label" htmlFor="notes">
                Notes
              </label>
              <textarea id="notes" name="notes" className="field__input" rows={3} />
              {errors.notes && <span className="field__error">{errors.notes}</span>}
            </div>

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
