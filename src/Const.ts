import { HKT } from './HKT'
import { Monoid } from './Monoid'
import { Functor } from './Functor'
import { Contravariant } from './Contravariant'
import { Applicative } from './Applicative'
import { Apply } from './Apply'
import { Semigroup } from './Semigroup'
import { Setoid } from './Setoid'
import { identity } from './function'

export class Const<A, B> extends HKT<HKT<'Const', A>, B> {
  constructor(private value: A){ super() }
  map<B, C>(f: (a: B) => C): Const<A, C> {
    return this as any
  }
  contramap<B, C>(f: (a: C) => B): Const<A, C> {
    return this as any
  }
  fold<B>(f: (a: A) => B): B {
    return f(this.value)
  }
}

export function equals<A, B>(setoid: Setoid<A>, fx: Const<A, B>, fy: Const<A, B>): boolean {
  return fx.fold(x => fy.fold(y => setoid.equals(x, y)))
}

export function map<A, B, C>(f: (a: B) => C, fa: Const<A, B>): Const<A, C> {
  return fa.map(f)
}

export function contramap<A, B, C>(f: (a: C) => B, fa: Const<A, B>): Const<A, C> {
  return fa.contramap(f)
}

export function getApply<A>(semigroup: Semigroup<A>): Apply<HKT<'Const', A>> {
  return {
    map,
    ap<B, C>(fab: Const<A, (a: B) => C>, fa: Const<A, B>): Const<A, C> {
      return new Const<A, C>(semigroup.concat(fab.fold(identity), fa.fold(identity)))
    }
  }
}

export function getApplicative<A>(monoid: Monoid<A>): Applicative<HKT<'Const', A>> {
  const { ap } = getApply(monoid)
  const empty = new Const<A, any>(monoid.empty())
  return {
    map,
    ap,
    of<B>(b: B): Const<A, B> {
      return empty
    }
  }
}

;(
  { map, contramap } as (
    Functor<HKT<'Const', any>> &
    Contravariant<HKT<'Const', any>>
  )
)
