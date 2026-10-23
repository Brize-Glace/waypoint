/* eslint-disable prettier/prettier */
import type { routes } from './index.ts'

export interface ApiDefinition {
  home: typeof routes['home']
  newAccount: {
    create: typeof routes['new_account.create']
    store: typeof routes['new_account.store']
  }
  session: {
    create: typeof routes['session.create']
    store: typeof routes['session.store']
    destroy: typeof routes['session.destroy']
  }
  dashboard: typeof routes['dashboard']
  flights: {
    index: typeof routes['flights.index']
    create: typeof routes['flights.create']
    store: typeof routes['flights.store']
    show: typeof routes['flights.show']
    edit: typeof routes['flights.edit']
    update: typeof routes['flights.update']
    destroy: typeof routes['flights.destroy']
  }
}
