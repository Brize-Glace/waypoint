import Logo from '~/components/logo'
import { type ReactNode } from 'react'
import RouteArt from '~/components/route_art'
import FlashToasts from '~/components/flash_toasts'
import ThemeToggle from '~/components/theme_toggle'

export default function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <div className="auth">
        <div className="auth__main">
          <Logo />
          <div className="auth__form-wrap">{children}</div>
        </div>

        <aside className="auth__aside chart-grid">
          <div className="auth__aside-top">
            <ThemeToggle />
          </div>
          <RouteArt />
          <p className="auth__tagline">A logbook for the flights you fly in the sim.</p>
        </aside>
      </div>
      <FlashToasts />
    </>
  )
}
