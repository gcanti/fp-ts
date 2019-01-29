import { Option } from '../src/Option'

export interface Location {
  readonly path: string
  readonly lines: {
    readonly from: number
    readonly to: number
  }
}

export const location = (path: string, from: number, to: number): Location => {
  return {
    path,
    lines: {
      from,
      to
    }
  }
}

export interface Method {
  readonly type: 'Method'
  readonly name: string
  readonly signature: string
  readonly description: Option<string>
  readonly since: Option<string>
  readonly example: Option<string>
  readonly deprecated: boolean
  readonly location: Location
}

export const method = (
  name: string,
  signature: string,
  description: Option<string>,
  since: Option<string>,
  example: Option<string>,
  deprecated: boolean,
  location: Location
): Method => ({
  type: 'Method',
  name,
  signature,
  description,
  since,
  example,
  deprecated,
  location
})

export interface Constructor {
  readonly type: 'Constructor'
  readonly name: string
  readonly methods: Array<Method>
}

export const constructor = (name: string, methods: Array<Method>): Constructor => {
  return {
    type: 'Constructor',
    name,
    methods
  }
}

export const isData = (e: Export): e is Data => e.type === 'Data'

export interface Data {
  readonly type: 'Data'
  readonly name: string
  readonly signature: string
  readonly description: Option<string>
  readonly constructors: Array<Constructor>
  readonly since: string
  readonly example: Option<string>
  readonly location: Location
}

export const data = (
  name: string,
  signature: string,
  description: Option<string>,
  constructors: Array<Constructor>,
  since: string,
  example: Option<string>,
  location: Location
): Export => {
  return {
    type: 'Data',
    name,
    signature,
    description,
    constructors,
    since,
    example,
    location
  }
}

export interface Func {
  readonly type: 'Func'
  readonly name: string
  readonly signature: string
  readonly description: Option<string>
  readonly alias: Option<string>
  readonly since: string
  readonly example: Option<string>
  readonly deprecated: boolean
  readonly location: Location
}

export const isFunc = (e: Export): e is Func => e.type === 'Func'

export const func = (
  name: string,
  signature: string,
  description: Option<string>,
  alias: Option<string>,
  since: string,
  example: Option<string>,
  deprecated: boolean,
  location: Location
): Export => ({
  type: 'Func',
  name,
  signature,
  description,
  alias,
  since,
  example,
  deprecated,
  location
})

export const isInstance = (e: Export): e is Instance => e.type === 'Instance'

export interface Instance {
  readonly type: 'Instance'
  readonly name: string
  readonly signature: string
  readonly description: Option<string>
  readonly since: string
  readonly location: Location
}

export const instance = (
  name: string,
  signature: string,
  description: Option<string>,
  since: string,
  location: Location
): Export => {
  return {
    type: 'Instance',
    name,
    signature,
    description,
    since,
    location
  }
}

export const isConstant = (e: Export): e is Constant => e.type === 'Constant'

export interface Constant {
  readonly type: 'Constant'
  readonly name: string
  readonly signature: string
  readonly description: Option<string>
  readonly since: string
  readonly location: Location
}

export const constant = (
  name: string,
  signature: string,
  description: Option<string>,
  since: string,
  location: Location
): Export => {
  return {
    type: 'Constant',
    name,
    signature,
    description,
    since,
    location
  }
}

export const isTypeclass = (e: Export): e is Typeclass => e.type === 'Typeclass'

export interface Typeclass {
  readonly type: 'Typeclass'
  readonly name: string
  readonly signature: string
  readonly description: Option<string>
  readonly since: string
  readonly deprecated: boolean
  readonly location: Location
}

export const typeClass = (
  name: string,
  signature: string,
  description: Option<string>,
  since: string,
  deprecated: boolean,
  location: Location
): Export => {
  return {
    type: 'Typeclass',
    name,
    signature,
    description,
    since,
    deprecated,
    location
  }
}

export const isInterface = (e: Export): e is Interface => e.type === 'Interface'

export interface Interface {
  readonly type: 'Interface'
  readonly name: string
  readonly signature: string
  readonly description: Option<string>
  readonly since: string
  readonly location: Location
}

export const inter = (
  name: string,
  signature: string,
  description: Option<string>,
  since: string,
  location: Location
): Export => {
  return {
    type: 'Interface',
    name,
    signature,
    description,
    since,
    location
  }
}

export type Export = Data | Func | Instance | Constant | Typeclass | Interface

export class Module {
  constructor(readonly name: string, readonly exports: Array<Export>, readonly path: string) {}
}
