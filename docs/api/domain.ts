import { Option } from '../../src/Option'

export class Method {
  type = 'Method'
  constructor(
    readonly name: string,
    readonly signature: string,
    readonly description: Option<string>,
    readonly since: string,
    readonly example: Option<string>
  ) {}
}

export class Constructor {
  type = 'Constructor'
  constructor(readonly name: string, readonly methods: Array<Method>) {}
}

export const isData = (e: Export): e is Data => e.type === 'Data'

export class Data {
  type: 'Data' = 'Data'
  constructor(
    readonly name: string,
    readonly signature: string,
    readonly description: Option<string>,
    readonly constructors: Array<Constructor>,
    readonly since: string
  ) {}
}

export const isFunc = (e: Export): e is Func => e.type === 'Func'

export class Func {
  type: 'Func' = 'Func'
  constructor(
    readonly name: string,
    readonly signature: string,
    readonly description: Option<string>,
    readonly isAlias: boolean,
    readonly since: string,
    readonly example: Option<string>
  ) {}
}

export const isInstance = (e: Export): e is Instance => e.type === 'Instance'

export class Instance {
  type: 'Instance' = 'Instance'
  constructor(
    readonly name: string,
    readonly signature: string,
    readonly description: Option<string>,
    readonly since: string
  ) {}
}

export const isConstant = (e: Export): e is Constant => e.type === 'Constant'

export class Constant {
  type: 'Constant' = 'Constant'
  constructor(
    readonly name: string,
    readonly signature: string,
    readonly description: Option<string>,
    readonly since: string
  ) {}
}

export const isTypeclass = (e: Export): e is Typeclass => e.type === 'Typeclass'

export class Typeclass {
  type: 'Typeclass' = 'Typeclass'
  constructor(readonly name: string, readonly signature: string, readonly description: Option<string>) {}
}

export type Export = Data | Func | Instance | Constant | Typeclass

export class Module {
  constructor(readonly name: string, readonly exports: Array<Export>) {}
}
