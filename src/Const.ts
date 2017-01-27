import { HKT, Semigroup, Apply, Applicative, Monoid, Functor, Contravariant } from './cats'

export class Const<A, B> extends HKT<HKT<'Const', A>, B> {
  constructor(public value: A){ super() }
  map<B, C>(f: (a: B) => C): Const<A, C> {
    return this as any as Const<A, C>
  }
  contramap<B, C>(f: (a: C) => B): Const<A, C> {
    return this as any as Const<A, C>
  }
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
      return new Const<A, C>(semigroup.concat(fab.value, fa.value))
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
