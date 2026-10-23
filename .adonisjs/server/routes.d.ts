import '@adonisjs/core/types/http'

type ParamValue = string | number | bigint | boolean

export type ScannedRoutes = {
  ALL: {
    'home': { paramsTuple?: []; params?: {} }
    'new_account.create': { paramsTuple?: []; params?: {} }
    'new_account.store': { paramsTuple?: []; params?: {} }
    'session.create': { paramsTuple?: []; params?: {} }
    'session.store': { paramsTuple?: []; params?: {} }
    'dashboard': { paramsTuple?: []; params?: {} }
    'session.destroy': { paramsTuple?: []; params?: {} }
    'flights.index': { paramsTuple?: []; params?: {} }
    'flights.create': { paramsTuple?: []; params?: {} }
    'flights.store': { paramsTuple?: []; params?: {} }
    'flights.show': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'flights.edit': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'flights.update': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'flights.destroy': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
  }
  GET: {
    'home': { paramsTuple?: []; params?: {} }
    'new_account.create': { paramsTuple?: []; params?: {} }
    'session.create': { paramsTuple?: []; params?: {} }
    'dashboard': { paramsTuple?: []; params?: {} }
    'flights.index': { paramsTuple?: []; params?: {} }
    'flights.create': { paramsTuple?: []; params?: {} }
    'flights.show': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'flights.edit': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
  }
  HEAD: {
    'home': { paramsTuple?: []; params?: {} }
    'new_account.create': { paramsTuple?: []; params?: {} }
    'session.create': { paramsTuple?: []; params?: {} }
    'dashboard': { paramsTuple?: []; params?: {} }
    'flights.index': { paramsTuple?: []; params?: {} }
    'flights.create': { paramsTuple?: []; params?: {} }
    'flights.show': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'flights.edit': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
  }
  POST: {
    'new_account.store': { paramsTuple?: []; params?: {} }
    'session.store': { paramsTuple?: []; params?: {} }
    'session.destroy': { paramsTuple?: []; params?: {} }
    'flights.store': { paramsTuple?: []; params?: {} }
  }
  PUT: {
    'flights.update': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
  }
  PATCH: {
    'flights.update': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
  }
  DELETE: {
    'flights.destroy': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
  }
}
declare module '@adonisjs/core/types/http' {
  export interface RoutesList extends ScannedRoutes {}
}