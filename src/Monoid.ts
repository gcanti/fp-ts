import { StaticSemigroup, getProductStaticSemigroup, getDualStaticSemigroup, fold as foldSemigroup } from './Semigroup'

export interface StaticMonoid<A> extends StaticSemigroup<A> {
  empty(): A
}

export function fold<A>(monoid: StaticMonoid<A>, as: Array<A>): A {
  return foldSemigroup(monoid, monoid.empty(), as)
}

export function getProductStaticMonoid<A, B>(amonoid: StaticMonoid<A>, bmonoid: StaticMonoid<B>): StaticMonoid<[A, B]> {
  const empty: [A, B] = [amonoid.empty(), bmonoid.empty()]
  return {
    empty: () => empty,
    concat: getProductStaticSemigroup(amonoid, bmonoid).concat
  }
}

export function getDualStaticMonoid<A>(monoid: StaticMonoid<A>): StaticMonoid<A> {
  return { empty: monoid.empty, concat: getDualStaticSemigroup(monoid).concat }
}

/** Boolean monoid under conjunction */
export const monoidAll: StaticMonoid<boolean> = {
  empty: () => true,
  concat: (x, y) => x && y
}

/** Boolean monoid under disjunction */
export const monoidAny: StaticMonoid<boolean> = {
  empty: () => false,
  concat: (x, y) => x || y
}

/** Monoid under array concatenation */
export const monoidArray: StaticMonoid<Array<any>> = {
  empty: () => [],
  concat: (x, y) => x.concat(y)
}

/** Monoid under addition */
export const monoidSum: StaticMonoid<number> = {
  empty: () => 0,
  concat: (x, y) => x + y
}

/** Monoid under multiplication */
export const monoidProduct: StaticMonoid<number> = {
  empty: () => 1,
  concat: (x, y) => x * y
}

export const monoidString: StaticMonoid<string> = {
  empty: () => '',
  concat: (x, y) => x + y
}
