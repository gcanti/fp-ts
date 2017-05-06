import { Semigroup, getProductSemigroup, getDualSemigroup, fold as foldSemigroup } from './Semigroup'
import { constant, Endomorphism, identity, compose } from './function'

export interface Monoid<A> extends Semigroup<A> {
  empty(): A
}

export function fold<A>(monoid: Monoid<A>, as: Array<A>): A {
  return foldSemigroup(monoid, monoid.empty(), as)
}

export function getProductMonoid<A, B>(amonoid: Monoid<A>, bmonoid: Monoid<B>): Monoid<[A, B]> {
  const empty: [A, B] = [amonoid.empty(), bmonoid.empty()]
  return {
    empty: () => empty,
    concat: getProductSemigroup(amonoid, bmonoid).concat
  }
}

export function getDualMonoid<A>(monoid: Monoid<A>): Monoid<A> {
  return { empty: monoid.empty, concat: getDualSemigroup(monoid).concat }
}

/** Boolean monoid under conjunction */
export const monoidAll: Monoid<boolean> = {
  empty: () => true,
  concat: (x, y) => x && y
}

/** Boolean monoid under disjunction */
export const monoidAny: Monoid<boolean> = {
  empty: () => false,
  concat: (x, y) => x || y
}

/** Monoid under array concatenation */
export const monoidArray: Monoid<Array<any>> = {
  empty: () => [],
  concat: (x, y) => x.concat(y)
}

/** Monoid under addition */
export const monoidSum: Monoid<number> = {
  empty: () => 0,
  concat: (x, y) => x + y
}

/** Monoid under multiplication */
export const monoidProduct: Monoid<number> = {
  empty: () => 1,
  concat: (x, y) => x * y
}

export const monoidString: Monoid<string> = {
  empty: () => '',
  concat: (x, y) => x + y
}

export function getFunctionMonoid<M>(monoid: Monoid<M>): <A>() => Monoid<(a: A) => M> {
  const empty = constant(constant(monoid.empty()))
  return <A>(): Monoid<(a: A) => M> => ({
    empty,
    concat: (f, g) => a => monoid.concat(f(a), g(a))
  })
}

export function getEndomorphismMonoid<A>(): Monoid<Endomorphism<A>> {
  return {
    empty: () => identity,
    concat: (x, y) => compose(x, y)
  }
}
