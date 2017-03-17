import { HKT } from './HKT'
import { StaticMonoid } from './Monoid'
import { StaticFunctor, FantasyFunctor } from './Functor'
import { StaticContravariant, FantasyContravariant } from './Contravariant'
import { StaticApplicative } from './Applicative'
import { StaticApply } from './Apply'
import { StaticSemigroup } from './Semigroup'
import { StaticSetoid } from './Setoid'
import { identity, Function1 } from './function'

export type URI = 'Const'

export type HKTURI<L> = HKT<URI, L>

export type HKTConst<L, A> = HKT<HKTURI<L>, A>

export class Const<L, A> implements
  FantasyFunctor<HKTURI<L>, A>,
  FantasyContravariant<HKTURI<L>, A> {

  readonly __hkt: HKTURI<L>
  readonly __hkta: A
  constructor(public readonly value: L) {}
  map<B, C>(f: Function1<B, C>): Const<L, C> {
    return this as any
  }
  contramap<B, C>(f: Function1<C, B>): Const<L, C> {
    return this as any
  }
  fold<B>(f: Function1<L, B>): B {
    return f(this.value)
  }
  equals(setoid: StaticSetoid<L>, fy: Const<L, A>): boolean {
    return this.fold(x => fy.fold(y => setoid.equals(x, y)))
  }
}

export function to<L, A>(fa: HKTConst<L, A>): Const<L, A> {
  return fa as Const<L, A>
}

export function equals<L, A>(setoid: StaticSetoid<L>, fx: Const<L, A>, fy: HKTConst<L, A>): boolean {
  return fx.equals(setoid, fy as Const<L, A>)
}

export function map<L, A, B>(f: Function1<A, B>, fa: HKTConst<L, A>): Const<L, B> {
  return (fa as Const<L, A>).map(f)
}

export function contramap<L, A, B>(f: Function1<B, A>, fa: HKTConst<L, A>): Const<L, B> {
  return (fa as Const<L, A>).contramap(f)
}

export function getApply<L>(semigroup: StaticSemigroup<L>): StaticApply<HKTURI<L>> {
  return {
    map,
    ap<A, B>(fab: Const<L, Function1<A, B>>, fa: Const<L, A>): Const<L, B> {
      return new Const<L, B>(semigroup.concat(fab.fold(identity), fa.fold(identity)))
    }
  }
}

export function getApplicative<L>(monoid: StaticMonoid<L>): StaticApplicative<HKTURI<L>> {
  const { ap } = getApply(monoid)
  const empty = new Const<L, any>(monoid.empty())
  return {
    map,
    ap,
    of<A>(b: A): Const<L, A> {
      return empty
    }
  }
}

declare module './Functor' {
  interface FunctorOps {
    map<L, A, B>(f: Function1<A, B>, fa: FantasyFunctor<HKTURI<L>, A>): Const<L, B>
    lift<L, A, B>(functor: StaticFunctor<URI>, f: Function1<A, B>): Function1<Const<L, A>, Const<L, B>>
  }
}

declare module './Contravariant' {
  interface ContravariantOps {
    contramap<L, A, B>(f: Function1<B, A>, fa: FantasyContravariant<HKTURI<L>, A>): Const<L, B>
    lift<L, A, B>(functor: StaticContravariant<URI>, f: Function1<B, A>): Function1<Const<L, A>, Const<L, B>>
  }
}

// tslint:disable-next-line no-unused-expression
;(
  { map, contramap } as (
    StaticFunctor<HKTURI<any>> &
    StaticContravariant<HKTURI<any>>
  )
)
