import { StaticIxMonad, FantasyIxMonad } from './IxMonad'
import { StaticMonad } from './Monad'
import { IO } from './IO'
import * as io from './IO'

declare module './HKT' {
  interface HKT<A> {
    IxIO: IxIO<any, any, A>
  }
  interface HKT2<A, B> {
    IxIO: IxIO<any, A, B>
  }
}

declare module './HKT' {
  interface HKT3<A, B, C> {
    IxIO: IxIO<A, B, C>
  }
}

export const URI = 'IxIO'

export type URI = typeof URI

export class IxIO<I, O, A> implements FantasyIxMonad<URI, I, O, A> {
  static iof = iof
  readonly _I: I
  readonly _O: O
  readonly _A: A
  readonly _URI: URI
  constructor(
    public readonly value: (i: I) => IO<[A, O]>
  ) { }
  run(i: I): IO<[A, O]> {
    return this.value(i)
  }
  iof<Z, B>(b: B): IxIO<Z, Z, B> {
    return iof<Z, B>(b)
  }
  ichain<Z, B>(f: (a: A) => IxIO<O, Z, B>): IxIO<I, Z, B> {
    return new IxIO<I, Z, B>(i => io.chain<[A, O], [B, Z]>(([a, o]) => f(a).run(o), this.run(i)))
  }
}

export function iof<I, A>(a: A): IxIO<I, I, A> {
  return new IxIO<I, I, A>(i => IO.of<[A, I]>([a, i]))
}

export function ichain<I, O, Z, A, B>(f: (a: A) => IxIO<O, Z, B>, fa: IxIO<I, O, A>): IxIO<I, Z, B> {
  return fa.ichain(f)
}

// Note that for every indexed monad m, the "no change diagonal" m i i is a monad, but in general, m i j is not.

export const of = iof

export function map<I, A, B>(f: (a: A) => B, fa: IxIO<I, I, A>): IxIO<I, I, B> {
  return new IxIO<I, I, B>(i => fa.run(i).map(([a, i]) => [f(a), i] as [B, I]))
}

export function ap<I, A, B>(fab: IxIO<I, I, (a: A) => B>, fa: IxIO<I, I, A>): IxIO<I, I, B> {
  return fab.ichain(f => map(f, fa)) // <- derived
}

export function chain<I, A, B>(f: (a: A) => IxIO<I, I, B>, fa: IxIO<I, I, A>): IxIO<I, I, B> {
  return fa.ichain(f)
}

export function lift<I, A>(ma: IO<A>): IxIO<I, I, A> {
  return new IxIO<I, I, A>(i => ma.map(a => [a, i] as [A, I]))
}

// tslint:disable-next-line no-unused-expression
;(
  { map, of, ap, chain, iof, ichain } as (
    StaticMonad<URI> &
    StaticIxMonad<URI>
  )
)
