import { Link } from '@adonisjs/inertia/react'

// L'étoile à quatre branches est le symbole d'un waypoint RNAV sur les cartes aéronautiques
export function WaypointMark({ size = 18 }: { size?: number }) {
  return (
    <svg
      className="brand__mark"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      aria-hidden="true"
      fill="currentColor"
    >
      <path d="M12 1.5 14.4 9.6 22.5 12 14.4 14.4 12 22.5 9.6 14.4 1.5 12 9.6 9.6Z" />
    </svg>
  )
}

export default function Logo() {
  return (
    <Link route="home" className="brand" aria-label="Waypoint, home">
      <WaypointMark />
      <span className="brand__name">Waypoint</span>
    </Link>
  )
}
