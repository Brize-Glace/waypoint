import AuthLayout from '~/layouts/auth'
import { Form, Link } from '@adonisjs/inertia/react'

export default function Login() {
  return (
    <>
      <h1 className="auth__title">Sign in to your logbook</h1>

      <Form route="session.store">
        {({ errors, processing }) => (
          <div className="auth__form">
            <div className="field">
              <label className="field__label" htmlFor="email">
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                className="field__input"
                autoComplete="username"
                placeholder="you@example.com"
                aria-invalid={errors.email ? 'true' : 'false'}
              />
              {errors.email && <span className="field__error">{errors.email}</span>}
            </div>

            <div className="field">
              <label className="field__label" htmlFor="password">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                className="field__input"
                autoComplete="current-password"
                aria-invalid={errors.password ? 'true' : 'false'}
              />
              {errors.password && <span className="field__error">{errors.password}</span>}
            </div>

            <button type="submit" className="btn btn--primary btn--block" disabled={processing}>
              {processing ? 'Signing in…' : 'Sign in'}
            </button>
          </div>
        )}
      </Form>

      <p className="auth__foot">
        No logbook yet?{' '}
        <Link route="new_account.create" className="il">
          Create one
        </Link>
      </p>
    </>
  )
}

Login.layout = [AuthLayout]
