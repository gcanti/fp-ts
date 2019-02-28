import { Option } from '../src/Option'

export interface Method {
  readonly type: 'Method'
  readonly name: string
  readonly signature: string
  readonly description: Option<string>
  readonly since: Option<string>
  readonly example: Option<string>
  readonly deprecated: boolean
}

export const method = (
  name: string,
  signature: string,
  description: Option<string>,
  since: Option<string>,
  example: Option<string>,
  deprecated: boolean
): Method => ({
  type: 'Method',
  name,
  signature,
  description,
  since,
  example,
  deprecated
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
}

export const data = (
  name: string,
  signature: string,
  description: Option<string>,
  constructors: Array<Constructor>,
  since: string,
  example: Option<string>
): Export => {
  return {
    type: 'Data',
    name,
    signature,
    description,
    constructors,
    since,
    example
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
}

export const isFunc = (e: Export): e is Func => e.type === 'Func'

export const func = (
  name: string,
  signature: string,
  description: Option<string>,
  alias: Option<string>,
  since: string,
  example: Option<string>,
  deprecated: boolean
): Export => ({
  type: 'Func',
  name,
  signature,
  description,
  alias,
  since,
  example,
  deprecated
})

export const isConstant = (e: Export): e is Constant => e.type === 'Constant'

export interface Constant {
  readonly type: 'Constant'
  readonly name: string
  readonly signature: string
  readonly description: Option<string>
  readonly since: string
}

export const constant = (name: string, signature: string, description: Option<string>, since: string): Export => {
  return {
    type: 'Constant',
    name,
    signature,
    description,
    since
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
}

export const typeClass = (
  name: string,
  signature: string,
  description: Option<string>,
  since: string,
  deprecated: boolean
): Export => {
  return {
    type: 'Typeclass',
    name,
    signature,
    description,
    since,
    deprecated
  }
}

export const isInterface = (e: Export): e is Interface => e.type === 'Interface'

export interface Interface {
  readonly type: 'Interface'
  readonly name: string
  readonly signature: string
  readonly description: Option<string>
  readonly since: string
}

export const inter = (name: string, signature: string, description: Option<string>, since: string): Export => {
  return {
    type: 'Interface',
    name,
    signature,
    description,
    since
  }
}

export type Export = Data | Func | Constant | Typeclass | Interface

export class Module {
  constructor(readonly name: string, readonly exports: Array<Export>, readonly path: string) {}
}
