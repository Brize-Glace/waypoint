import Logo from '~/components/logo'
import { type ReactNode } from 'react'
import { usePage } from '@inertiajs/react'
import { Link } from '@adonisjs/inertia/react'
import FlashToasts from '~/components/flash_toasts'
import ThemeToggle from '~/components/theme_toggle'

export default function MarketingLayout({ children }: { children: ReactNode }) {
  const { props } = usePage()
  return (
    <>
      <header className="site-header">
        <div className="site-header__inner">
          <Logo />
          <div className="site-header__actions">
            <ThemeToggle />
            {props.user ? (
              <Link route="flights.index" className="btn btn--secondary btn--sm">
                Open logbook
              </Link>
            ) : (
              <Link route="session.create" className="btn btn--quiet btn--sm">
                Sign in
              </Link>
            )}
          </div>
        </div>
      </header>
      {children}
      <FlashToasts />
    </>
  )
}
