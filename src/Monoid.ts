import { Bounded } from './Bounded'
import { compose, Endomorphism, identity } from './function'
import {
  fold as foldSemigroup,
  getArraySemigroup,
  getDictionarySemigroup,
  getDualSemigroup,
  getFunctionSemigroup,
  getJoinSemigroup,
  getMeetSemigroup,
  getProductSemigroup,
  getRecordSemigroup,
  Semigroup,
  semigroupAll,
  semigroupAny,
  semigroupProduct,
  semigroupString,
  semigroupSum,
  semigroupVoid
} from './Semigroup'

/**
 * @typeclass
 * @since 1.0.0
 */
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

const emptyArray: Array<any> = []

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
 * @function
 * @since 1.0.0
 */
export const getArrayMonoid = <A = never>(): Monoid<Array<A>> => {
  return unsafeMonoidArray
}

const emptyObject = {}

/**
 * Gets {@link Monoid} instance for dictionaries given {@link Semigroup} instance for their values
 *
 * @example
 * import { getDictionaryMonoid, fold } from 'fp-ts/lib/Monoid'
 * import { semigroupSum } from 'fp-ts/lib/Semigroup'
 *
 * const M = getDictionaryMonoid(semigroupSum)
 * assert.deepEqual(fold(M)([{ foo: 123 }, { foo: 456 }]), { foo: 579 })
 *
 * @function
 * @since 1.4.0
 */
export const getDictionaryMonoid = <A>(S: Semigroup<A>): Monoid<{ [key: string]: A }> => ({
  ...getDictionarySemigroup(S),
  empty: emptyObject
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
export const getRecordMonoid = <O extends { [key: string]: any }>(
  monoids: { [K in keyof O]: Monoid<O[K]> }
): Monoid<O> => {
  const empty: any = {}
  const keys = Object.keys(monoids)
  for (const key of keys) {
    empty[key] = monoids[key].empty
  }
  return {
    ...getRecordSemigroup<O>(monoids),
    empty
  }
}

/**
 * @function
 * @since 1.9.0
 */
export const getMeetMonoid = <A>(B: Bounded<A>): Monoid<A> => {
  return {
    ...getMeetSemigroup(B),
    empty: B.top
  }
}

/**
 * @function
 * @since 1.9.0
 */
export const getJoinMonoid = <A>(B: Bounded<A>): Monoid<A> => {
  return {
    ...getJoinSemigroup(B),
    empty: B.bottom
  }
}
