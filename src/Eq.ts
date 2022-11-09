/**
 * The `Eq` type class represents types which support decidable equality.
 *
 * Instances must satisfy the following laws:
 *
 * 1. Reflexivity: `E.equals(a, a) === true`
 * 2. Symmetry: `E.equals(a, b) === E.equals(b, a)`
 * 3. Transitivity: if `E.equals(a, b) === true` and `E.equals(b, c) === true`, then `E.equals(a, c) === true`
 *
 * @since 2.0.0
 */
import { Contravariant1 } from './Contravariant'
import { pipe } from './function'
import { Monoid } from './Monoid'
import { ReadonlyRecord } from './ReadonlyRecord'
import { Semigroup } from './Semigroup'

// -------------------------------------------------------------------------------------
// model
// -------------------------------------------------------------------------------------

/**
 * @category model
 * @since 2.0.0
 */
export interface Eq<A> {
  readonly equals: (x: A, y: A) => boolean
}

// -------------------------------------------------------------------------------------
// constructors
// -------------------------------------------------------------------------------------

/**
 * @category constructors
 * @since 2.0.0
 */
export const fromEquals = <A>(equals: Eq<A>['equals']): Eq<A> => ({
  equals: (x, y) => x === y || equals(x, y)
})

// -------------------------------------------------------------------------------------
// combinators
// -------------------------------------------------------------------------------------

/**
 * @since 2.10.0
 */
export const struct = <A>(eqs: { [K in keyof A]: Eq<A[K]> }): Eq<{ readonly [K in keyof A]: A[K] }> =>
  fromEquals((first, second) => {
    for (const key in eqs) {
      if (!eqs[key].equals(first[key], second[key])) {
        return false
      }
    }
    return true
  })

/**
 * Given a tuple of `Eq`s returns a `Eq` for the tuple
 *
 * @example
 * import { tuple } from 'fp-ts/Eq'
 * import * as S from 'fp-ts/string'
 * import * as N from 'fp-ts/number'
 * import * as B from 'fp-ts/boolean'
 *
 * const E = tuple(S.Eq, N.Eq, B.Eq)
 * assert.strictEqual(E.equals(['a', 1, true], ['a', 1, true]), true)
 * assert.strictEqual(E.equals(['a', 1, true], ['b', 1, true]), false)
 * assert.strictEqual(E.equals(['a', 1, true], ['a', 2, true]), false)
 * assert.strictEqual(E.equals(['a', 1, true], ['a', 1, false]), false)
 *
 * @since 2.10.0
 */
export const tuple = <A extends ReadonlyArray<unknown>>(...eqs: { [K in keyof A]: Eq<A[K]> }): Eq<Readonly<A>> =>
  fromEquals((first, second) => eqs.every((E, i) => E.equals(first[i], second[i])))

/* istanbul ignore next */
const contramap_: <A, B>(fa: Eq<A>, f: (b: B) => A) => Eq<B> = (fa, f) => pipe(fa, contramap(f))

/**
 * A typical use case for `contramap` would be like, given some `User` type, to construct an `Eq<User>`.
 *
 * We can do so with a function from `User -> X` where `X` is some value that we know how to compare
 * for equality (meaning we have an `Eq<X>`)
 *
 * For example, given the following `User` type, we want to construct an `Eq<User>` that just looks at the `key` field
 * for each user (since it's known to be unique).
 *
 * If we have a way of comparing `UUID`s for equality (`eqUUID: Eq<UUID>`) and we know how to go from `User -> UUID`,
 * using `contramap` we can do this
 *
 * @example
 * import { contramap, Eq } from 'fp-ts/Eq'
 * import { pipe } from 'fp-ts/function'
 * import * as S from 'fp-ts/string'
 *
 * type UUID = string
 *
 * interface User {
 *   readonly key: UUID
 *   readonly firstName: string
 *   readonly lastName: string
 * }
 *
 * const eqUUID: Eq<UUID> = S.Eq
 *
 * const eqUserByKey: Eq<User> = pipe(
 *   eqUUID,
 *   contramap((user) => user.key)
 * )
 *
 * assert.deepStrictEqual(
 *   eqUserByKey.equals(
 *     { key: 'k1', firstName: 'a1', lastName: 'b1' },
 *     { key: 'k2', firstName: 'a1', lastName: 'b1' }
 *   ),
 *   false
 * )
 * assert.deepStrictEqual(
 *   eqUserByKey.equals(
 *     { key: 'k1', firstName: 'a1', lastName: 'b1' },
 *     { key: 'k1', firstName: 'a2', lastName: 'b1' }
 *   ),
 *   true
 * )
 *
 * @since 2.0.0
 */
export const contramap: <A, B>(f: (b: B) => A) => (fa: Eq<A>) => Eq<B> = (f) => (fa) =>
  fromEquals((x, y) => fa.equals(f(x), f(y)))

/**
 * @category type lambdas
 * @since 2.0.0
 */
export const URI = 'Eq'

/**
 * @category type lambdas
 * @since 2.0.0
 */
export type URI = typeof URI

declare module './HKT' {
  interface URItoKind<A> {
    readonly [URI]: Eq<A>
  }
}

/**
 * @category instances
 * @since 2.5.0
 */
export const eqStrict: Eq<unknown> = {
  equals: (a, b) => a === b
}

const empty: Eq<unknown> = {
  equals: () => true
}

/**
 * @category instances
 * @since 2.10.0
 */
export const getSemigroup = <A>(): Semigroup<Eq<A>> => ({
  concat: (x, y) => fromEquals((a, b) => x.equals(a, b) && y.equals(a, b))
})

/**
 * @category instances
 * @since 2.6.0
 */
export const getMonoid = <A>(): Monoid<Eq<A>> => ({
  concat: getSemigroup<A>().concat,
  empty
})

/**
 * @category instances
 * @since 2.7.0
 */
export const Contravariant: Contravariant1<URI> = {
  URI,
  contramap: contramap_
}

// -------------------------------------------------------------------------------------
// deprecated
// -------------------------------------------------------------------------------------

/**
 * Use [`tuple`](#tuple) instead.
 *
 * @category zone of death
 * @since 2.0.0
 * @deprecated
 */
export const getTupleEq: <T extends ReadonlyArray<Eq<any>>>(
  ...eqs: T
) => Eq<{ [K in keyof T]: T[K] extends Eq<infer A> ? A : never }> = tuple

/**
 * Use [`struct`](#struct) instead.
 *
 * @category zone of death
 * @since 2.0.0
 * @deprecated
 */
export const getStructEq: <O extends ReadonlyRecord<string, any>>(eqs: { [K in keyof O]: Eq<O[K]> }) => Eq<O> = struct

/**
 * Use [`eqStrict`](#eqstrict) instead
 *
 * @category zone of death
 * @since 2.0.0
 * @deprecated
 */
export const strictEqual: <A>(a: A, b: A) => boolean = eqStrict.equals

/**
 * This instance is deprecated, use small, specific instances instead.
 * For example if a function needs a `Contravariant` instance, pass `E.Contravariant` instead of `E.eq`
 * (where `E` is from `import E from 'fp-ts/Eq'`)
 *
 * @category zone of death
 * @since 2.0.0
 * @deprecated
 */
export const eq: Contravariant1<URI> = Contravariant

/**
 * Use [`Eq`](./boolean.ts.html#eq) instead.
 *
 * @category zone of death
 * @since 2.0.0
 * @deprecated
 */
export const eqBoolean: Eq<boolean> = eqStrict

/**
 * Use [`Eq`](./string.ts.html#eq) instead.
 *
 * @category zone of death
 * @since 2.0.0
 * @deprecated
 */
export const eqString: Eq<string> = eqStrict

/**
 * Use [`Eq`](./number.ts.html#eq) instead.
 *
 * @category zone of death
 * @since 2.0.0
 * @deprecated
 */
export const eqNumber: Eq<number> = eqStrict

/**
 * Use [`Eq`](./Date.ts.html#eq) instead.
 *
 * @category zone of death
 * @since 2.0.0
 * @deprecated
 */
export const eqDate: Eq<Date> = {
  equals: (first, second) => first.valueOf() === second.valueOf()
}
