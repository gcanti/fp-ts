import { HKT, HKTS } from './HKT'
import { FantasyMonad, StaticMonad } from './Monad'
import { Kleisli, Endomorphism } from './function'
import { StaticTrans } from './Trans'

declare module './HKT' {
  interface HKT<A> {
    ReaderT: ReaderT<any, any, A>
  }
  interface HKT2<A, B> {
    ReaderT: ReaderT<any, A, B>
  }
}

export const URI = 'ReaderT'

export type URI = typeof URI

export class ReaderT<M extends HKTS, E, A> implements FantasyMonad<URI, A> {
  readonly _A: A
  readonly _URI: URI
  of: <E>(a: A) => ReaderT<M, E, A>
  constructor(
    public readonly monad: StaticMonad<M>,
    public readonly value: Kleisli<M, E, A>
  ) {
    this.of = of<M>(monad)
  }
  run(e: E): HKT<A>[M] {
    return this.value(e)
  }
  map<B>(f: (a: A) => B): ReaderT<M, E, B> {
    return new ReaderT<M, E, B>(this.monad, e => this.monad.map(f, this.run(e)))
  }
  ap<B>(fab: ReaderT<M, E, (a: A) => B>): ReaderT<M, E, B> {
    return fab.chain(f => this.map(f)) // <- derived
  }
  chain<B>(f: (a: A) => ReaderT<M, E, B>): ReaderT<M, E, B> {
    return flatten(this.map(f)) // <- derived
  }
}

export function flatten<M extends HKTS, E, A>(mma: ReaderT<M, E, ReaderT<M, E, A>>): ReaderT<M, E, A> {
  const value = (e: E) => mma.monad.chain<ReaderT<M, E, A>, A>(r => r.run(e), mma.value(e))
  return new ReaderT<M, E, A>(mma.monad, value)
}

export function of<M extends HKTS>(monad: StaticMonad<M>): <E, A>(a: A) => ReaderT<M, E, A> {
  return <E, A>(a: A) => {
    return new ReaderT<M, E, A>(monad, () => monad.of(a))
  }
}

export function liftT<M extends HKTS>(monad: StaticMonad<M>): <E, A>(fa: HKT<A>[M]) => ReaderT<M, E, A> {
  return <E, A>(fa: HKT<A>[M]) => new ReaderT<M, E, A>(monad, () => fa)
}

export function map<M extends HKTS, E, A, B>(f: (a: A) => B, fa: ReaderT<M, E, A>): ReaderT<M, E, B> {
  return fa.map(f)
}

export function ap<M extends HKTS, E, A, B>(fab: ReaderT<M, E, (a: A) => B>, fa: ReaderT<M, E, A>): ReaderT<M, E, B> {
  return fa.ap(fab)
}

export function chain<M extends HKTS, E, A, B>(f: (a: A) => ReaderT<M, E, B>, fa: ReaderT<M, E, A>): ReaderT<M, E, B> {
  return fa.chain(f)
}

/** reads the current context */
export function ask<M extends HKTS, E>(monad: StaticMonad<M>): ReaderT<M, E, E> {
  return new ReaderT<M, E, E>(monad, e => monad.of(e))
}

/** Projects a value from the global context in a Reader */
export function asks<M extends HKTS>(monad: StaticMonad<M>): <E, A>(f: (e: E) => A) => ReaderT<M, E, A> {
  return <E, A>(f: (e: E) => A) => new ReaderT<M, E, A>(monad, e => monad.of(f(e)))
}

/** changes the value of the local context during the execution of the action `fa` */
export function local<M extends HKTS>(monad: StaticMonad<M>): <E, A>(f: Endomorphism<E>, fa: ReaderT<M, E, A>) => ReaderT<M, E, A> {
  return <E, A>(f: Endomorphism<E>, fa: ReaderT<M, E, A>) => new ReaderT<M, E, A>(monad, (e: E) => fa.run(f(e)))
}

// tslint:disable-next-line no-unused-expression
;(
  { liftT } as (
    StaticTrans<URI>
  )
)
