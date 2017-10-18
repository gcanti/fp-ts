import {
  Semigroup,
  getProductSemigroup,
  getDualSemigroup,
  fold as foldSemigroup,
  getRecordSemigroup
} from './Semigroup'
import { constant, Endomorphism, identity, compose } from './function'

/** @typeclass */
export interface Monoid<A> extends Semigroup<A> {
  empty: () => A
}

/** @function */
export const fold = <A>(M: Monoid<A>) => (as: Array<A>): A => {
  return foldSemigroup(M)(M.empty())(as)
}

/** @function */
export const getProductMonoid = <A, B>(MA: Monoid<A>, MB: Monoid<B>): Monoid<[A, B]> => {
  const empty: [A, B] = [MA.empty(), MB.empty()]
  return {
    ...getProductSemigroup(MA, MB),
    empty: () => empty
  }
}

/** @function */
export const getDualMonoid = <A>(M: Monoid<A>): Monoid<A> => {
  return {
    ...getDualSemigroup(M),
    empty: M.empty
  }
}

/**
 * Boolean monoid under conjunction
 * @instance
 */
export const monoidAll: Monoid<boolean> = {
  concat: x => y => x && y,
  empty: () => true
}

/**
 * Boolean monoid under disjunction
 * @instance
 */
export const monoidAny: Monoid<boolean> = {
  concat: x => y => x || y,
  empty: () => false
}

/**
 * Monoid under array concatenation (`Array<any>`)
 * @instance
 */
export const monoidArray: Monoid<Array<any>> = {
  concat: x => y => x.concat(y),
  empty: () => []
}

/**
 * Number monoid under addition
 * @instance
 */
export const monoidSum: Monoid<number> = {
  concat: x => y => x + y,
  empty: () => 0
}

/**
 * Number monoid under multiplication
 * @instance
 */
export const monoidProduct: Monoid<number> = {
  concat: x => y => x * y,
  empty: () => 1
}

/** @instance */
export const monoidString: Monoid<string> = {
  concat: x => y => x + y,
  empty: () => ''
}

/** @function */
export const getFunctionMonoid = <M>(monoid: Monoid<M>) => <A>(): Monoid<(a: A) => M> => {
  const empty = constant(constant(monoid.empty()))
  return {
    concat: f => g => a => monoid.concat(f(a))(g(a)),
    empty
  }
}

/** @function */
export const getEndomorphismMonoid = <A>(): Monoid<Endomorphism<A>> => {
  return {
    concat: x => y => compose(x, y),
    empty: () => identity
  }
}

/**
 * Returns a monoid under array concatenation
 * @function
 */
export const getArrayMonoid = <A>(): Monoid<Array<A>> => {
  return monoidArray
}

/** @function */
export const getRecordMonoid = <O extends { [key: string]: any }>(
  monoids: { [K in keyof O]: Monoid<O[K]> }
): Monoid<{ [K in keyof O]: O[K] }> => {
  const empty: any = {}
  for (const k in monoids) {
    empty[k] = monoids[k].empty()
  }
  return {
    ...getRecordSemigroup<O>(monoids),
    empty: () => empty
  }
}
