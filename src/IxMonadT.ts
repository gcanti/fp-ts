import { HKT, HKTS } from './HKT'
import { StaticMonad } from './Monad'
import { FantasyIxMonad } from './IxMonad'
import { StaticTrans } from './Trans'

declare module './HKT' {
  interface HKT<A> {
    IxMonadT: IxMonadT<any, any, any, A>
  }
}

export const URI = 'IxMonadT'

export type URI = typeof URI

export class IxMonadT<M extends HKTS, I, O, A> implements FantasyIxMonad<URI, I, O, A> {
  readonly _M: M
  readonly _I: I
  readonly _O: O
  readonly _A: A
  readonly _URI: URI
  iof: <B, I>(b: B) => IxMonadT<M, I, I, B>
  constructor(
    public readonly monad: StaticMonad<M>,
    public readonly value: HKT<A>[M]
  ) {
    this.iof = iof(monad)
  }
  ichain<B, Z>(f: (a: A) => IxMonadT<M, O, Z, B>): IxMonadT<M, I, Z, B> {
    return new IxMonadT<M, I, Z, B>(this.monad, this.monad.chain<A, B>(a => f(a).value, this.value))
  }
}

export function iof<M extends HKTS>(monad: StaticMonad<M>): <A, Z>(a: A) => IxMonadT<M, Z, Z, A> {
  return <A, Z>(a: A) => new IxMonadT<M, Z, Z, A>(monad, monad.of(a))
}

export function ichain<M extends HKTS, I, O, Z, A, B>(f: (a: A) => IxMonadT<M, O, Z, B>, fa: IxMonadT<M, I, O, A>): IxMonadT<M, I, Z, B> {
  return fa.ichain(f)
}

export const of = iof

export function map<M extends HKTS, I, A, B>(f: (a: A) => B, fa: IxMonadT<M, I, I, A>): IxMonadT<M, I, I, B> {
  return new IxMonadT<M, I, I, B>(fa.monad, fa.monad.map(f, fa.value))
}

export function ap<M extends HKTS, I, A, B>(fab: IxMonadT<M, I, I, (a: A) => B>, fa: IxMonadT<M, I, I, A>): IxMonadT<M, I, I, B> {
  return fab.ichain(f => map(f, fa))
}

export function chain<M extends HKTS, I, A, B>(f: (a: A) => IxMonadT<M, I, I, B>, fa: IxMonadT<M, I, I, A>): IxMonadT<M, I, I, B> {
  return fa.ichain(f)
}

export function liftT<M extends HKTS>(monad: StaticMonad<M>): <I, O, A>(fa: HKT<A>[M]) => IxMonadT<M, I, O, A> {
  return <I, O, A>(fa: HKT<A>[M]) => new IxMonadT<M, I, O, A>(monad, fa)
}

// tslint:disable-next-line no-unused-expression
;(
  { liftT } as (
    StaticTrans<URI>
  )
)
