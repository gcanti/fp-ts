import { StaticMonoid } from './Monoid'
import { StaticFunctor, FantasyFunctor } from './Functor'
import { StaticContravariant, FantasyContravariant } from './Contravariant'
import { StaticApplicative } from './Applicative'
import { StaticApply } from './Apply'
import { StaticSemigroup } from './Semigroup'
import { StaticSetoid } from './Setoid'
import { identity } from './function'

declare module './HKT' {
  interface HKT<A, U> {
    Const: Const<U, A>
  }
}

export const URI = 'Const'

export type URI = typeof URI

export class Const<L, A> implements
  FantasyFunctor<URI, A>,
  FantasyContravariant<URI, A> {

  readonly _L: L
  readonly _A: A
  readonly _URI: URI
  constructor(public readonly value: L) {}
  map<B, C>(f: (b: B) => C): Const<L, C> {
    return this as any
  }
  contramap<B, C>(f: (c: C) => B): Const<L, C> {
    return this as any
  }
  fold<B>(f: (l: L) => B): B {
    return f(this.value)
  }
  equals(setoid: StaticSetoid<L>, fy: Const<L, A>): boolean {
    return this.fold(x => fy.fold(y => setoid.equals(x, y)))
  }
}

export function equals<L, A>(setoid: StaticSetoid<L>, fx: Const<L, A>, fy: Const<L, A>): boolean {
  return fx.equals(setoid, fy)
}

export function map<L, A, B>(f: (a: A) => B, fa: Const<L, A>): Const<L, B> {
  return fa.map(f)
}

export function contramap<L, A>(fa: Const<L, A>): <B>(f: (b: B) => A) => Const<L, B> {
  return <B>(f: (b: B) => A) => fa.contramap(f)
}

export function getApply<L>(semigroup: StaticSemigroup<L>): StaticApply<URI> {
  return {
    URI,
    map,
    ap<A, B>(fab: Const<L, (a: A) => B>, fa: Const<L, A>): Const<L, B> {
      return new Const<L, B>(semigroup.concat(fab.fold(identity), fa.fold(identity)))
    }
  }
}

export function getApplicative<L>(monoid: StaticMonoid<L>): StaticApplicative<URI> {
  const { ap } = getApply(monoid)
  const empty = new Const<L, any>(monoid.empty())
  return {
    URI,
    map,
    ap,
    of<A>(b: A): Const<L, A> {
      return empty
    }
  }
}

// tslint:disable-next-line no-unused-expression
;(
  { map, contramap } as (
    StaticFunctor<URI> &
    StaticContravariant<URI>
  )
)
