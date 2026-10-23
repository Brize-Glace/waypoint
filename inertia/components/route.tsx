export function RouteLine() {
  return <span className="route__line" aria-hidden="true" />
}

export default function Route({ from, to }: { from: string; to: string }) {
  return (
    <span className="route">
      {from}
      <RouteLine />
      <span className="sr-only">to</span>
      {to}
    </span>
  )
}
