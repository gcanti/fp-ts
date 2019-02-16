import { array } from '../src/Array'
import { Monad1 } from '../src/Monad'
import { Option, none as optionNone, some as optionSome } from '../src/Option'
import * as optionT from '../src/OptionT'
import { identity } from '../src/function'

declare module '../src/HKT' {
  interface URI2HKT<A> {
    ArrayOption: ArrayOption<A>
  }
}

export const URI = 'ArrayOption'

export type URI = typeof URI

const T = optionT.getOptionT2v(array)
const foldT = optionT.fold(array)

export class ArrayOption<A> {
  readonly _A!: A
  readonly _URI!: URI
  constructor(readonly value: Array<Option<A>>) {}
  map<B>(f: (a: A) => B): ArrayOption<B> {
    return new ArrayOption(T.map(this.value, f))
  }
  ap<B>(fab: ArrayOption<(a: A) => B>): ArrayOption<B> {
    return new ArrayOption(T.ap(fab.value, this.value))
  }
  ap_<B, C>(this: ArrayOption<(b: B) => C>, fb: ArrayOption<B>): ArrayOption<C> {
    return fb.ap(this)
  }
  chain<B>(f: (a: A) => ArrayOption<B>): ArrayOption<B> {
    return new ArrayOption(T.chain(this.value, a => f(a).value))
  }
  fold<R>(onNone: R, onSome: (a: A) => R): Array<R> {
    return foldT(onNone, onSome, this.value)
  }
  getOrElse(a: A): Array<A> {
    return this.fold(a, identity)
  }
}

const map = <A, B>(fa: ArrayOption<A>, f: (a: A) => B): ArrayOption<B> => fa.map(f)

const of = <A>(a: A): ArrayOption<A> => new ArrayOption(T.of(a))

const ap = <A, B>(fab: ArrayOption<(a: A) => B>, fa: ArrayOption<A>): ArrayOption<B> => fa.ap(fab)

const chain = <A, B>(fa: ArrayOption<A>, f: (a: A) => ArrayOption<B>): ArrayOption<B> => fa.chain(f)

export const some = of

export const none = new ArrayOption(array.of(optionNone))

export const fromOption = <A>(ma: Option<A>): ArrayOption<A> => new ArrayOption(array.of(ma))

export const fromArray = <A>(ma: Array<A>): ArrayOption<A> => new ArrayOption(ma.map(optionSome))

export const arrayOption: Monad1<URI> = {
  URI,
  map,
  of,
  ap,
  chain
}
