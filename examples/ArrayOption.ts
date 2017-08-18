import * as optionT from 'fp-ts/lib/OptionT'
import { array } from 'fp-ts/lib/Array'
import { Option } from 'fp-ts/lib/Option'
import { Lazy } from 'fp-ts/lib/function'
import { Monad, FantasyMonad } from 'fp-ts/lib/Monad'

declare module 'fp-ts/lib/HKT' {
  interface URI2HKT1<A> {
    ArrayOption: ArrayOption<A>
  }
}

const optionTArray = optionT.getOptionT(array)

export const URI = 'ArrayOption'

export type URI = typeof URI

export class ArrayOption<A> implements FantasyMonad<URI, A> {
  static of = of
  readonly _A: A
  readonly _URI = URI
  constructor(public readonly value: Array<Option<A>>) {}
  map<B>(f: (a: A) => B): ArrayOption<B> {
    return new ArrayOption(optionTArray.map(f, this.value))
  }
  of<B>(b: B): ArrayOption<B> {
    return of(b)
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
  getOrElse(f: Lazy<A>): Array<A> {
    return optionT.getOrElse(array)(f)(this.value)
  }
  fold<R>(none: Lazy<R>, some: (a: A) => R): Array<R> {
    return optionT.fold(array)(none, some, this.value)
  }
}

export function map<A, B>(f: (a: A) => B, fa: ArrayOption<A>): ArrayOption<B> {
  return fa.map(f)
}

export function of<A>(a: A): ArrayOption<A> {
  return new ArrayOption(optionT.some(array)(a))
}

export function ap<A, B>(fab: ArrayOption<(a: A) => B>, fa: ArrayOption<A>): ArrayOption<B> {
  return fa.ap(fab)
}

export function chain<A, B>(f: (a: A) => ArrayOption<B>, fa: ArrayOption<A>): ArrayOption<B> {
  return fa.chain(f)
}

export const some = of

export const none = new ArrayOption(optionT.none(array)())

export function fromOption<A>(oa: Option<A>): ArrayOption<A> {
  return new ArrayOption(optionT.fromOption(array)(oa))
}

export function liftF<A>(ma: Array<A>): ArrayOption<A> {
  return new ArrayOption(optionT.liftF(array)(ma))
}

export const arrayOption: Monad<URI> = {
  URI,
  map,
  of,
  ap,
  chain
}
