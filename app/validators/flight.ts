import vine from '@vinejs/vine'

// Format strict sans trim/toUpperCase : notSameAs compare les valeurs brutes, "lfpg" passerait face à "LFPG"
const icao = () =>
  vine
    .string()
    .regex(/^[A-Z]{4}$/)
    .exists({ table: 'airports', column: 'icao' })

export const flightValidator = vine.create({
  departure: icao(),
  destination: icao().notSameAs('departure'),
  divertedTo: icao().notSameAs('destination').nullable().optional(),
  aircraft: vine.string().trim().maxLength(50),
  flownOn: vine.date().beforeOrEqual('today'),
  durationMinutes: vine.number().withoutDecimals().range([1, 1200]),
  notes: vine.string().trim().maxLength(2000).nullable().optional(),
})
