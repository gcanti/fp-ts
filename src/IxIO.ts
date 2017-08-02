import { Monad } from '../src/Monad'
import { IxMonad, FantasyIxMonad } from '../src/IxMonad'
import { IO } from '../src/IO'
import * as io from '../src/IO'

declare module './HKT' {
  interface URI2HKT3<U, L, A> {
    IxIO: IxIO<U, L, A>
  }
}

export const URI = 'IxIO'

export type URI = typeof URI

export class IxIO<I, O, A> implements FantasyIxMonad<URI, A, O, I> {
  static iof = iof
  readonly _A: A
  readonly _L: O
  readonly _U: I
  readonly _URI: URI
  constructor(public readonly value: IO<A>) {}
  run(): A {
    return this.value.run()
  }
  iof<I, B>(b: B): IxIO<I, I, B> {
    return iof<I, B>(b)
  }
  ichain<Z, B>(f: (a: A) => IxIO<O, Z, B>): IxIO<I, Z, B> {
    return new IxIO<I, Z, B>(this.value.chain(a => f(a).value))
  }
  of<I, B>(b: B): IxIO<I, I, B> {
    return iof<I, B>(b)
  }
  map<B>(f: (a: A) => B): IxIO<I, O, B> {
    return new IxIO<I, O, B>(this.value.map(f))
  }
  ap<B>(fab: IxIO<I, I, (a: A) => B>): IxIO<I, I, B> {
    return new IxIO<I, I, B>(this.value.ap(fab.value))
  }
  chain<B>(f: (a: A) => IxIO<I, I, B>): IxIO<I, I, B> {
    return new IxIO<I, I, B>(this.value.chain(a => f(a).value))
  }
}

export function iof<I, A>(a: A): IxIO<I, I, A> {
  return new IxIO<I, I, A>(io.of(a))
}

export function ichain<I, O, Z, A, B>(f: (a: A) => IxIO<O, Z, B>, fa: IxIO<I, O, A>): IxIO<I, Z, B> {
  return fa.ichain(f)
}

export function map<I, A, B>(f: (a: A) => B, fa: IxIO<I, I, A>): IxIO<I, I, B> {
  return fa.map(f)
}

export const of = iof

export function ap<I, A, B>(fab: IxIO<I, I, (a: A) => B>, fa: IxIO<I, I, A>): IxIO<I, I, B> {
  return fa.ap(fab)
}

export function chain<I, A, B>(f: (a: A) => IxIO<I, I, B>, fa: IxIO<I, I, A>): IxIO<I, I, B> {
  return fa.chain(f)
}

export const ixIO: Monad<URI> & IxMonad<URI> = {
  URI,
  map,
  of,
  ap,
  chain,
  iof,
  ichain
}
