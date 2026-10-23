// Notation des carnets de vol : heures:minutes (75 min → 1:15)
export function formatDuration(minutes: number) {
  const hours = Math.floor(minutes / 60)
  const rest = minutes % 60
  return `${hours}:${String(rest).padStart(2, '0')}`
}

// Les dates arrivent en "yyyy-MM-dd" : on les construit en heure locale pour éviter un décalage d'un jour
function parseDay(isoDay: string) {
  const [year, month, day] = isoDay.split('-').map(Number)
  return new Date(year, month - 1, day)
}

const SHORT_MONTHS = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'Jun',
  'Jul',
  'Aug',
  'Sep',
  'Oct',
  'Nov',
  'Dec',
]

export function formatDay(isoDay: string) {
  const date = parseDay(isoDay)
  return `${date.getDate()} ${SHORT_MONTHS[date.getMonth()]}`
}

export function formatDate(isoDay: string) {
  return `${formatDay(isoDay)} ${parseDay(isoDay).getFullYear()}`
}

export function formatMonth(isoMonth: string) {
  return parseDay(`${isoMonth}-01`).toLocaleDateString('en-GB', { month: 'long', year: 'numeric' })
}

export function formatNumber(value: number) {
  return value.toLocaleString('en-US')
}
