import { Option } from '../../src/Option'

export class Method {
  type = 'Method'
  constructor(
    readonly name: string,
    readonly signature: string,
    readonly description: Option<string>,
    readonly since: string
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
    readonly since: string
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

export const isTypeclass = (e: Export): e is Typeclass => e.type === 'Typeclass'

export class Typeclass {
  type: 'Typeclass' = 'Typeclass'
  constructor(readonly name: string, readonly signature: string, readonly description: Option<string>) {}
}

export type Export = Data | Func | Instance | Typeclass

export class Module {
  constructor(readonly name: string, readonly exports: Array<Export>) {}
}

export type ModuleEntry = {
  name: string
  docs: boolean
}

export const modules: Array<ModuleEntry> = [
  { name: 'Alt', docs: true },
  { name: 'Alternative', docs: true },
  { name: 'Applicative', docs: true },
  { name: 'Apply', docs: true },
  { name: 'Array', docs: true },
  { name: 'Bifunctor', docs: true },
  { name: 'Bounded', docs: true },
  { name: 'Category', docs: true },
  { name: 'Chain', docs: true },
  { name: 'ChainRec', docs: true },
  { name: 'Comonad', docs: true },
  { name: 'Console', docs: true },
  { name: 'Const', docs: true },
  { name: 'Contravariant', docs: true },
  { name: 'Either', docs: true },
  { name: 'EitherT', docs: true },
  { name: 'Exception', docs: true },
  { name: 'Extend', docs: true },
  { name: 'Field', docs: true },
  { name: 'Foldable', docs: true },
  { name: 'Free', docs: true },
  { name: 'function', docs: true },
  { name: 'Functor', docs: true },
  { name: 'HKT', docs: true },
  { name: 'Identity', docs: true },
  { name: 'Invariant', docs: true },
  { name: 'IO', docs: true },
  { name: 'IxIO', docs: true },
  { name: 'IxMonad', docs: true },
  { name: 'Monad', docs: true },
  { name: 'Monoid', docs: true },
  { name: 'Monoidal', docs: true },
  { name: 'NonEmptyArray', docs: true },
  { name: 'Option', docs: true },
  { name: 'OptionT', docs: true },
  { name: 'Ord', docs: true },
  { name: 'Ordering', docs: true },
  { name: 'Pair', docs: true },
  { name: 'Plus', docs: true },
  { name: 'Profunctor', docs: true },
  { name: 'Random', docs: true },
  { name: 'Reader', docs: true },
  { name: 'ReaderT', docs: true },
  { name: 'Ring', docs: true },
  { name: 'Semigroup', docs: true },
  { name: 'Semigroupoid', docs: true },
  { name: 'Semiring', docs: true },
  { name: 'Set', docs: true },
  { name: 'Setoid', docs: true },
  { name: 'State', docs: true },
  { name: 'StateT', docs: true },
  { name: 'Store', docs: true },
  { name: 'StrMap', docs: true },
  { name: 'Task', docs: true },
  { name: 'TaskEither', docs: true },
  { name: 'These', docs: true },
  { name: 'Trace', docs: true },
  { name: 'Traversable', docs: true },
  { name: 'Tuple', docs: true },
  { name: 'Unfoldable', docs: true },
  { name: 'Validation', docs: true },
  { name: 'Writer', docs: true }
]
