function Waypoint({ x, y }: { x: number; y: number }) {
  return (
    <path
      className="route-art__waypoint"
      transform={`translate(${x - 9} ${y - 9}) scale(0.75)`}
      d="M12 1.5 14.4 9.6 22.5 12 14.4 14.4 12 22.5 9.6 14.4 1.5 12 9.6 9.6Z"
    />
  )
}

// Un vol Paris → New York : sur une carte plane, l'orthodromie apparaît comme une courbe
export default function RouteArt() {
  return (
    <svg
      className="route-art"
      viewBox="0 0 480 320"
      role="img"
      aria-label="A flight route from LFPG to KJFK drawn on a chart"
    >
      <path className="route-art__path" d="M392 210 C 330 70, 170 40, 86 150" />
      <Waypoint x={392} y={210} />
      <Waypoint x={86} y={150} />
      <text className="route-art__label" x={392} y={244} textAnchor="middle">
        LFPG
      </text>
      <text className="route-art__sub" x={392} y={260} textAnchor="middle">
        Paris
      </text>
      <text className="route-art__label" x={86} y={184} textAnchor="middle">
        KJFK
      </text>
      <text className="route-art__sub" x={86} y={200} textAnchor="middle">
        New York
      </text>
      <text className="route-art__sub" x={250} y={58} textAnchor="middle">
        3,150 NM
      </text>
    </svg>
  )
}
