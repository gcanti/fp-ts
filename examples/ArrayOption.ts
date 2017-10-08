import * as optionT from 'fp-ts/lib/OptionT'
import { array } from 'fp-ts/lib/Array'
import { Option } from 'fp-ts/lib/Option'
import { Lazy } from 'fp-ts/lib/function'
import { Monad, FantasyMonad } from 'fp-ts/lib/Monad'

declare module 'fp-ts/lib/HKT' {
  interface URI2HKT<A> {
    ArrayOption: ArrayOption<A>
  }
}

const optionTArray = optionT.getOptionT(array)

export const URI = 'ArrayOption'

export type URI = typeof URI

export class ArrayOption<A> implements FantasyMonad<URI, A> {
  readonly _A: A
  readonly _URI = URI
  constructor(readonly value: Array<Option<A>>) {}
  map<B>(f: (a: A) => B): ArrayOption<B> {
    return new ArrayOption(optionTArray.map(f, this.value))
  }
  ap<B>(fab: ArrayOption<(a: A) => B>): ArrayOption<B> {
    return new ArrayOption(optionTArray.ap(fab.value, this.value))
  }
  ap_<B, C>(this: ArrayOption<(a: B) => C>, fb: ArrayOption<B>): ArrayOption<C> {
    return fb.ap(this)
  }
  chain<B>(f: (a: A) => ArrayOption<B>): ArrayOption<B> {
    return new ArrayOption(optionTArray.chain(a => f(a).value, this.value))
  }
  getOrElseValue(a: A): Array<A> {
    return optionT.getOrElseValue(array)(a)(this.value)
  }
  fold<R>(none: Lazy<R>, some: (a: A) => R): Array<R> {
    return optionT.fold(array)(none, some, this.value)
  }
}

export const map = <A, B>(f: (a: A) => B, fa: ArrayOption<A>): ArrayOption<B> => fa.map(f)

export const of = <A>(a: A): ArrayOption<A> => new ArrayOption(optionT.some(array)(a))

export const ap = <A, B>(fab: ArrayOption<(a: A) => B>, fa: ArrayOption<A>): ArrayOption<B> => fa.ap(fab)

export const chain = <A, B>(f: (a: A) => ArrayOption<B>, fa: ArrayOption<A>): ArrayOption<B> => fa.chain(f)

export const some = of

export const none = new ArrayOption(optionT.none(array)())

export const fromOption = <A>(oa: Option<A>): ArrayOption<A> => new ArrayOption(optionT.fromOption(array)(oa))

export const liftF = <A>(ma: Array<A>): ArrayOption<A> => new ArrayOption(optionT.liftF(array)(ma))

export const arrayOption: Monad<URI> = {
  URI,
  map,
  of,
  ap,
  chain
}
