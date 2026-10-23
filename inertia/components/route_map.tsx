import 'leaflet/dist/leaflet.css'
import { latLngBounds } from 'leaflet'
import { CircleMarker, MapContainer, Polyline, TileLayer, Tooltip } from 'react-leaflet'
import { greatCirclePoints } from '~/lib/great_circle'

type Airport = { icao: string; latitude: number; longitude: number }

export type Leg = {
  from: Airport
  to: Airport
  // Route prévue mais non volée (déroutement) : tracée en pointillés
  planned?: boolean
}

type Props = {
  legs: Leg[]
  labels?: boolean
  className?: string
}

export default function RouteMap({ legs, labels = false, className = '' }: Props) {
  const paths = legs.map((leg) => ({
    key: `${leg.from.icao}-${leg.to.icao}-${leg.planned ? 'planned' : 'flown'}`,
    leg,
    points: greatCirclePoints(leg.from, leg.to),
  }))

  // Les marqueurs se placent aux extrémités des tracés : après l'antiméridien, la longitude
  // de l'arrivée peut dépasser 180°, et le point doit rester au bout de la ligne
  const markers = new Map<string, { icao: string; position: [number, number] }>()
  for (const { leg, points } of paths) {
    const ends = [
      { icao: leg.from.icao, position: points[0] },
      { icao: leg.to.icao, position: points[points.length - 1] },
    ]
    for (const end of ends) {
      markers.set(`${end.icao}@${Math.round(end.position[1])}`, end)
    }
  }

  const bounds = latLngBounds(paths.flatMap((path) => path.points))
  const isSinglePoint = bounds.getNorthEast().equals(bounds.getSouthWest())

  return (
    <MapContainer
      key={paths.map((path) => path.key).join('|')}
      className={`route-map ${className}`}
      {...(isSinglePoint
        ? { center: bounds.getCenter(), zoom: 9 }
        : { bounds, boundsOptions: { padding: [48, 48] } })}
      scrollWheelZoom={false}
    >
      <TileLayer
        url="https://tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />

      {/* className en prop (et non dans pathOptions) : Leaflet ne l'applique qu'à la création du tracé */}
      {paths.map(({ key, leg, points }) => (
        <Polyline
          key={key}
          positions={points}
          className={leg.planned ? 'route-map__path route-map__path--planned' : 'route-map__path'}
        >
          {!labels && (
            <Tooltip sticky className="route-map__tooltip">
              {leg.from.icao} → {leg.to.icao}
            </Tooltip>
          )}
        </Polyline>
      ))}

      {[...markers.entries()].map(([key, marker]) => (
        <CircleMarker key={key} center={marker.position} radius={4} className="route-map__airport">
          <Tooltip
            permanent={labels}
            direction="top"
            offset={[0, -6]}
            className="route-map__tooltip"
          >
            {marker.icao}
          </Tooltip>
        </CircleMarker>
      ))}
    </MapContainer>
  )
}
