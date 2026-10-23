import Logo from '~/components/logo'
import { type ReactNode } from 'react'
import { LogOut } from 'lucide-react'
import { usePage } from '@inertiajs/react'
import { Form, Link } from '@adonisjs/inertia/react'
import FlashToasts from '~/components/flash_toasts'
import ThemeToggle from '~/components/theme_toggle'
import NavLink, { type NavItem } from '~/components/nav_link'

const nav: NavItem[] = [
  { label: 'Overview', route: 'dashboard' },
  { label: 'Logbook', route: 'flights.index' },
]

export default function AppLayout({ children }: { children: ReactNode }) {
  const { component } = usePage()

  return (
    <>
      <header className="topbar">
        <div className="topbar__inner">
          <Logo />
          <nav className="topnav" aria-label="Main">
            {nav.map(({ label, route }) => (
              <NavLink key={label} route={route} className="topnav__item">
                {label}
              </NavLink>
            ))}
          </nav>
          <div className="topbar__actions">
            {/* Saisir un vol est l'action principale : accessible depuis chaque écran, sauf le formulaire lui-même */}
            {component !== 'flights/create' && (
              <Link route="flights.create" className="btn btn--primary btn--sm">
                Log flight
              </Link>
            )}
            <ThemeToggle />
            <Form route="session.destroy">
              <button type="submit" className="iconbtn" aria-label="Sign out" title="Sign out">
                <LogOut size={16} />
              </button>
            </Form>
          </div>
        </div>
      </header>

      <main className="app-main">{children}</main>
      <FlashToasts />
    </>
  )
}
