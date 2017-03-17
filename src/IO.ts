import { HKT } from './HKT'
import { StaticMonoid } from './Monoid'
import { StaticSemigroup } from './Semigroup'
import { StaticMonad, FantasyMonad } from './Monad'
import { constant, Lazy, Function1, Function2, Function3, Function4, Curried2, Curried3, Curried4, Kleisli } from './function'

export type URI = 'IO'

export type HKTIO<A> = HKT<URI, A>

export class IO<A> implements FantasyMonad<URI, A> {
  static of = of
  readonly __hkt: URI
  readonly __hkta: A
  constructor(public readonly value: Lazy<A>) {}
  run(): A {
    return this.value()
  }
  map<B>(f: Function1<A, B>): IO<B> {
    return new IO(() => f(this.run()))
  }
  of<B>(b: B): IO<B> {
    return of(b)
  }
  ap<B>(fab: IO<Function1<A, B>>): IO<B> {
    return new IO(() => fab.run()(this.run()))
  }
  chain<B>(f: Function1<A, IO<B>>): IO<B> {
    return new IO(() => f(this.run()).run())
  }
  concat(semigroup: StaticSemigroup<A>, fy: IO<A>): IO<A> {
    return new IO(() => semigroup.concat(this.run(), fy.run()))
  }
}

export function to<A>(fa: HKTIO<A>): IO<A> {
  return fa as IO<A>
}

export function map<A, B>(f: Function1<A, B>, fa: HKTIO<A>): IO<B> {
  return (fa as IO<A>).map(f)
}

export function ap<A, B>(fab: IO<Function1<A, B>>, fa: HKTIO<A>): IO<B> {
  return (fa as IO<A>).ap(fab)
}

export function of<A>(a: A): IO<A> {
  return new IO(() => a)
}

export function chain<A, B>(f: Function1<A, HKTIO<B>>, fa: HKTIO<A>): IO<B> {
  return (fa as IO<A>).chain(f as Function1<A, IO<B>>)
}

export function concat<A>(semigroup: StaticSemigroup<A>, fx: HKTIO<A>, fy: HKTIO<A>): IO<A> {
  return (fx as IO<A>).concat(semigroup, fy as IO<A>)
}

export function getSemigroup<A>(semigroup: StaticSemigroup<A>): StaticSemigroup<IO<A>> {
  return { concat: (fx, fy) => concat(semigroup, fx, fy) }
}

export function getMonoid<A>(monoid: StaticMonoid<A>): StaticMonoid<IO<A>> {
  const empty = monoid.empty()
  return { empty: constant(of(empty)), concat: getSemigroup(monoid).concat }
}

declare module './Functor' {
  interface FunctorOps {
    map<A, B>(f: Function1<A, B>, fa: FantasyFunctor<URI, A>): IO<B>
    lift<A, B>(functor: StaticFunctor<URI>, f: Function1<A, B>): Function1<IO<A>, IO<B>>
  }
}

declare module './Apply' {
  interface ApplyOps {
    ap<A, B>(fab: FantasyApply<URI, Function1<A, B>>, fa: FantasyApply<URI, A>): IO<B>
    liftA2<A, B, C>(apply: StaticApply<URI>, f: Curried2<A, B, C>): Function2<IO<A>, IO<B>, IO<C>>
    liftA3<A, B, C, D>(apply: StaticApply<URI>, f: Curried3<A, B, C, D>): Function3<IO<A>, IO<B>, IO<C>, IO<D>>
    liftA4<A, B, C, D, E>(apply: StaticApply<URI>, f: Curried4<A, B, C, D, E>): Function4<IO<A>, IO<B>, IO<C>, IO<D>, IO<E>>
  }
}

declare module './Chain' {
  interface MonadOps {
    chain<A, B>(f: Kleisli<URI, A, B>, fa: FantasyMonad<URI, A>): IO<B>
    flatten<A>(mma: FantasyMonad<URI, FantasyMonad<URI, A>>): IO<A>
  }
}

// tslint:disable-next-line no-unused-expression
;(
  { map, of, ap, chain } as (
    StaticMonad<URI>
  )
)
