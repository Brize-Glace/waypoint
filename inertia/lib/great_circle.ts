type Coordinates = { latitude: number; longitude: number }

const toRadians = (degrees: number) => (degrees * Math.PI) / 180
const toDegrees = (radians: number) => (radians * 180) / Math.PI

/**
 * Points intermédiaires de l'orthodromie (le plus court chemin sur la sphère), pour la tracer
 * sur une carte plane où elle apparaît courbée. `d` est le même angle central que dans la
 * formule de haversine côté serveur (app/services/geo.ts).
 */
export function greatCirclePoints(from: Coordinates, to: Coordinates, steps = 64) {
  const lat1 = toRadians(from.latitude)
  const lon1 = toRadians(from.longitude)
  const lat2 = toRadians(to.latitude)
  const lon2 = toRadians(to.longitude)

  const d =
    2 *
    Math.asin(
      Math.sqrt(
        Math.sin((lat2 - lat1) / 2) ** 2 +
          Math.cos(lat1) * Math.cos(lat2) * Math.sin((lon2 - lon1) / 2) ** 2
      )
    )

  if (d === 0) {
    return [[from.latitude, from.longitude] as [number, number]]
  }

  const points: [number, number][] = []
  let previousLon: number | undefined

  for (let i = 0; i <= steps; i++) {
    // Interpolation sphérique : on avance d'une fraction f de l'arc entre les deux points
    const f = i / steps
    const a = Math.sin((1 - f) * d) / Math.sin(d)
    const b = Math.sin(f * d) / Math.sin(d)

    const x = a * Math.cos(lat1) * Math.cos(lon1) + b * Math.cos(lat2) * Math.cos(lon2)
    const y = a * Math.cos(lat1) * Math.sin(lon1) + b * Math.cos(lat2) * Math.sin(lon2)
    const z = a * Math.sin(lat1) + b * Math.sin(lat2)

    const lat = toDegrees(Math.atan2(z, Math.sqrt(x * x + y * y)))
    let lon = toDegrees(Math.atan2(y, x))

    // Antiméridien (ex. Tokyo → Los Angeles) : longitudes continues, sinon Leaflet trace un trait à travers le monde
    if (previousLon !== undefined) {
      while (lon - previousLon > 180) lon -= 360
      while (lon - previousLon < -180) lon += 360
    }
    previousLon = lon

    points.push([lat, lon])
  }

  return points
}
