import vine, { SimpleMessagesProvider } from '@vinejs/vine'

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

// Messages affichés sous les champs du formulaire : on parle comme l'interface, pas avec les noms techniques
flightValidator.messagesProvider = new SimpleMessagesProvider(
  {
    'required': 'Fill in the {{ field }}.',
    'regex': 'Use a 4-letter ICAO code, like LFPG.',
    'database.exists': 'No airport with this ICAO code.',
    'destination.notSameAs': 'The destination must differ from the departure.',
    'divertedTo.notSameAs': 'Untick the diversion if you landed at your destination.',
    'date': 'Enter a valid date.',
    'date.beforeOrEqual': 'The flight date can’t be in the future.',
    'number': 'Enter a number of minutes.',
    'withoutDecimals': 'Use whole minutes.',
    'range': 'Block time must be between 1 and 1200 minutes.',
    'maxLength': 'Keep it under {{ max }} characters.',
  },
  {
    departure: 'departure',
    destination: 'destination',
    divertedTo: 'diversion airport',
    aircraft: 'aircraft',
    flownOn: 'date',
    durationMinutes: 'block time',
    notes: 'notes',
  }
)
