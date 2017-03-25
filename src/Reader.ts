import { HKT } from './HKT'
import { StaticMonad, FantasyMonad } from './Monad'
import { identity, Function1, Endomorphism, Function2, Function3, Function4, Curried2, Curried3, Curried4, Kleisli } from './function'

export type URI = 'Reader'

export type HKTURI<E> = HKT<URI, E>

export type HKTReader<E, A> = HKT<HKTURI<E>, A>

export class Reader<E, A> implements FantasyMonad<HKTURI<E>, A> {
  static of = of
  readonly _hkt: HKTURI<E>
  readonly _hkta: A
  constructor(public readonly value: Function1<E, A>) {}
  run(e: E): A {
    return this.value(e)
  }
  map<B>(f: Function1<A, B>): Reader<E, B> {
    return new Reader((e: E) => f(this.run(e)))
  }
  of<E2, B>(b: B): Reader<E2, B> {
    return of<E2, B>(b)
  }
  ap<B>(fab: Reader<E, Function1<A, B>>): Reader<E, B> {
    return new Reader((e: E) => fab.run(e)(this.run(e)))
  }
  chain<B>(f: Function1<A, Reader<E, B>>): Reader<E, B> {
    return new Reader((e: E) => f(this.run(e)).run(e))
  }
}

export function to<E, A>(fa: HKTReader<E, A>): Reader<E, A> {
  return fa as Reader<E, A>
}

export function map<E, A, B>(f: Function1<A, B>, fa: HKTReader<E, A>): Reader<E, B> {
  return (fa as Reader<E, A>).map(f)
}

export function of<E, A>(a: A): Reader<E, A> {
  return new Reader((e: E) => a)
}

export function ap<E, A, B>(fab: HKTReader<E, Function1<A, B>>, fa: HKTReader<E, A>): Reader<E, B> {
  return (fa as Reader<E, A>).ap(fab as Reader<E, Function1<A, B>>)
}

export function chain<E, A, B>(f: Function1<A, HKTReader<E, B>>, fa: HKTReader<E, A>): Reader<E, B> {
  return (fa as Reader<E, A>).chain(f as Function1<A, Reader<E, B>>)
}

/** reads the current context */
export function ask<E>(): Reader<E, E> {
  return new Reader<E, E>(identity)
}

/** Projects a value from the global context in a Reader */
export function asks<E, A>(f: Function1<E, A>): Reader<E, A> {
  return new Reader(f)
}

/** changes the value of the local context during the execution of the action `fa` */
export function local<E, A>(f: Endomorphism<E>, fa: HKTReader<E, A>): Reader<E, A> {
  return new Reader((e: E) => (fa as Reader<E, A>).run(f(e)))
}

declare module './Functor' {
  interface FunctorOps {
    map<E, A, B>(f: Function1<A, B>, fa: FantasyFunctor<HKTURI<E>, A>): Reader<E, B>
    lift<E, A, B>(functor: StaticFunctor<HKTURI<E>>, f: Function1<A, B>): Function1<Reader<E, A>, Reader<E, B>>
  }
}

declare module './Apply' {
  interface ApplyOps {
    ap<E, A, B>(fab: Reader<E, Function1<A, B>>, fa: FantasyApply<HKTURI<E>, A>): Reader<E, B>
    liftA2<E, A, B, C>(apply: StaticApply<HKTURI<E>>, f: Curried2<A, B, C>): Function2<Reader<E, A>, Reader<E, B>, Reader<E, C>>
    liftA3<E, A, B, C, D>(apply: StaticApply<HKTURI<E>>, f: Curried3<A, B, C, D>): Function3<Reader<E, A>, Reader<E, B>, Reader<E, C>, Reader<E, D>>
    liftA4<E, A, B, C, D, F>(apply: StaticApply<HKTURI<E>>, f: Curried4<A, B, C, D, F>): Function4<Reader<E, A>, Reader<E, B>, Reader<E, C>, Reader<E, D>, Reader<E, F>>
  }
}

declare module './Chain' {
  interface MonadOps {
    chain<E, A, B>(f: Kleisli<HKTURI<E>, A, B>, fa: FantasyMonad<HKTURI<E>, A>): Reader<E, B>
    flatten<E, A>(mma: FantasyMonad<HKTURI<E>, FantasyMonad<HKTURI<E>, A>>): Reader<E, A>
  }
}

// tslint:disable-next-line no-unused-expression
;(
  { map, of, ap, chain } as (
    StaticMonad<HKTURI<any>>
  )
)
