import {
  Semigroup,
  getProductSemigroup,
  getDualSemigroup,
  fold as foldSemigroup,
  getRecordSemigroup,
  semigroupAll,
  semigroupString,
  semigroupProduct,
  semigroupSum,
  semigroupAny,
  getArraySemigroup,
  semigroupVoid,
  getFunctionSemigroup,
  getObjectSemigroup
} from './Semigroup'
import { Endomorphism, identity, compose } from './function'

/** @typeclass */
export interface Monoid<A> extends Semigroup<A> {
  readonly empty: A
}

/**
 * @function
 * @since 1.0.0
 */
export const fold = <A>(M: Monoid<A>): ((as: Array<A>) => A) => {
  return foldSemigroup(M)(M.empty)
}

/**
 * @function
 * @since 1.0.0
 */
export const getProductMonoid = <A, B>(MA: Monoid<A>, MB: Monoid<B>): Monoid<[A, B]> => {
  return {
    ...getProductSemigroup(MA, MB),
    empty: [MA.empty, MB.empty]
  }
}

/**
 * @function
 * @since 1.0.0
 */
export const getDualMonoid = <A>(M: Monoid<A>): Monoid<A> => {
  return {
    ...getDualSemigroup(M),
    empty: M.empty
  }
}

/**
 * Boolean monoid under conjunction
 * @instance
 * @since 1.0.0
 */
export const monoidAll: Monoid<boolean> = {
  ...semigroupAll,
  empty: true
}

/**
 * Boolean monoid under disjunction
 * @instance
 * @since 1.0.0
 */
export const monoidAny: Monoid<boolean> = {
  ...semigroupAny,
  empty: false
}

const emptyArray: any[] = []

/**
 * @instance
 * @since 1.0.0
 */
export const unsafeMonoidArray: Monoid<Array<any>> = {
  ...getArraySemigroup(),
  empty: emptyArray
}

/**
 * Monoid under array concatenation (`Array<any>`)
 * @instance
 * @since 1.0.0
 */
export const getArrayMonoid = <A = never>(): Monoid<Array<A>> => {
  return unsafeMonoidArray
}

const emptyObject = {}

/**
 * Monoid under object assignment
 * @function
 * @since 1.4.0
 */
export const getObjectMonoid = <A extends object = never>(): Monoid<A> => ({
  ...getObjectSemigroup<A>(),
  empty: emptyObject as A
})

/**
 * Number monoid under addition
 * @instance
 * @since 1.0.0
 */
export const monoidSum: Monoid<number> = {
  ...semigroupSum,
  empty: 0
}

/**
 * Number monoid under multiplication
 * @instance
 * @since 1.0.0
 */
export const monoidProduct: Monoid<number> = {
  ...semigroupProduct,
  empty: 1
}

/**
 * @instance
 * @since 1.0.0
 */
export const monoidString: Monoid<string> = {
  ...semigroupString,
  empty: ''
}

/**
 * @instance
 * @since 1.0.0
 */
export const monoidVoid: Monoid<void> = {
  ...semigroupVoid,
  empty: undefined
}

/**
 * @function
 * @since 1.0.0
 */
export const getFunctionMonoid = <M>(M: Monoid<M>) => <A = never>(): Monoid<(a: A) => M> => {
  return {
    ...getFunctionSemigroup(M)<A>(),
    empty: () => M.empty
  }
}

/**
 * @function
 * @since 1.0.0
 */
export const getEndomorphismMonoid = <A = never>(): Monoid<Endomorphism<A>> => {
  return {
    concat: compose,
    empty: identity
  }
}

/**
 * @function
 * @since 1.0.0
 */
export const getRecordMonoid = <O>(Ms: { [K in keyof O]: Monoid<O[K]> }): Monoid<O> => {
  const empty: any = {}
  for (const k in Ms) {
    empty[k] = Ms[k].empty
  }
  return {
    ...getRecordSemigroup<O>(Ms),
    empty
  }
}
