const EARTH_RADIUS_NM = 3440.065

type Coordinates = { latitude: number; longitude: number }

function toRadians(degrees: number) {
  return (degrees * Math.PI) / 180
}

// Formule de haversine : distance orthodromique (plus court chemin sur la sphère terrestre), en milles nautiques
export function distanceNm(from: Coordinates, to: Coordinates) {
  const deltaLat = toRadians(to.latitude - from.latitude)
  const deltaLon = toRadians(to.longitude - from.longitude)

  const a =
    Math.sin(deltaLat / 2) ** 2 +
    Math.cos(toRadians(from.latitude)) *
      Math.cos(toRadians(to.latitude)) *
      Math.sin(deltaLon / 2) ** 2

  return 2 * EARTH_RADIUS_NM * Math.asin(Math.sqrt(a))
}
