import { Semigroup, getProductSemigroup, getDualSemigroup, fold as foldSemigroup } from './Semigroup'
import { constant, Endomorphism, identity, compose } from './function'

export interface Monoid<A> extends Semigroup<A> {
  empty(): A
}

export const fold = <A>(monoid: Monoid<A>) => (as: Array<A>): A => {
  return foldSemigroup(monoid)(monoid.empty())(as)
}

export const getProductMonoid = <A>(amonoid: Monoid<A>) => <B>(bmonoid: Monoid<B>): Monoid<[A, B]> => {
  const empty: [A, B] = [amonoid.empty(), bmonoid.empty()]
  return {
    empty: () => empty,
    concat: getProductSemigroup(amonoid)(bmonoid).concat
  }
}

export const getDualMonoid = <A>(monoid: Monoid<A>): Monoid<A> => ({
  ...getDualSemigroup(monoid),
  empty: monoid.empty
})

/** Boolean monoid under conjunction */
export const monoidAll: Monoid<boolean> = {
  empty: () => true,
  concat: x => y => x && y
}

/** Boolean monoid under disjunction */
export const monoidAny: Monoid<boolean> = {
  empty: () => false,
  concat: x => y => x || y
}

/** Monoid under array concatenation (`Array<any>`) */
export const monoidArray: Monoid<Array<any>> = {
  empty: () => [],
  concat: x => y => x.concat(y)
}

/** Monoid under addition */
export const monoidSum: Monoid<number> = {
  empty: () => 0,
  concat: x => y => x + y
}

/** Monoid under multiplication */
export const monoidProduct: Monoid<number> = {
  empty: () => 1,
  concat: x => y => x * y
}

export const monoidString: Monoid<string> = {
  empty: () => '',
  concat: x => y => x + y
}

export const getFunctionMonoid = <M>(monoid: Monoid<M>): (<A>() => Monoid<(a: A) => M>) => {
  const empty = constant(constant(monoid.empty()))
  return () => ({
    empty,
    concat: f => g => a => monoid.concat(f(a))(g(a))
  })
}

export const getEndomorphismMonoid = <A>(): Monoid<Endomorphism<A>> => ({
  empty: () => identity,
  concat: x => y => compose(x, y)
})

export const getArrayMonoid = <A>(): Monoid<Array<A>> => monoidArray
