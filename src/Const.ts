import { HKT } from './HKT'
import { Monoid } from './Monoid'
import { Functor } from './Functor'
import { Contravariant } from './Contravariant'
import { Applicative } from './Applicative'
import { Apply } from './Apply'
import { Semigroup } from './Semigroup'
import { Setoid } from './Setoid'
import { identity, Function1 } from './function'

export type URI = 'Const';

export type HKTConst<A, B> = HKT<HKT<URI, A>, B>;

export class Const<A, B> implements HKTConst<A, B> {
  __hkt: HKT<URI, A>;
  __hkta: B;
  constructor(private value: A){}
  map<B, C>(f: Function1<B, C>): Const<A, C> {
    return this as any
  }
  contramap<B, C>(f: Function1<C, B>): Const<A, C> {
    return this as any
  }
  fold<B>(f: Function1<A, B>): B {
    return f(this.value)
  }
  equals(setoid: Setoid<A>, fy: Const<A, B>): boolean {
    return this.fold(x => fy.fold(y => setoid.equals(x, y)))
  }
}

export function equals<A, B>(setoid: Setoid<A>, fx: Const<A, B>, fy: HKTConst<A, B>): boolean {
  return fx.equals(setoid, fy as Const<A, B>)
}

export function map<A, B, C>(f: Function1<B, C>, fa: HKTConst<A, B>): Const<A, C> {
  return (fa as Const<A, B>).map(f)
}

export function contramap<A, B, C>(f: Function1<C, B>, fa: HKTConst<A, B>): Const<A, C> {
  return (fa as Const<A, B>).contramap(f)
}

export function getApply<A>(semigroup: Semigroup<A>): Apply<HKT<URI, A>> {
  return {
    map,
    ap<B, C>(fab: Const<A, Function1<B, C>>, fa: Const<A, B>): Const<A, C> {
      return new Const<A, C>(semigroup.concat(fab.fold(identity), fa.fold(identity)))
    }
  }
}

export function getApplicative<A>(monoid: Monoid<A>): Applicative<HKT<URI, A>> {
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
    Functor<HKT<URI, any>> &
    Contravariant<HKT<URI, any>>
  )
)
