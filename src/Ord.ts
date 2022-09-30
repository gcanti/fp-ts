/**
 * The `Ord` type class represents types which support comparisons with a _total order_.
 *
 * Instances should satisfy the laws of total orderings:
 *
 * 1. Reflexivity: `S.compare(a, a) <= 0`
 * 2. Antisymmetry: if `S.compare(a, b) <= 0` and `S.compare(b, a) <= 0` then `a <-> b`
 * 3. Transitivity: if `S.compare(a, b) <= 0` and `S.compare(b, c) <= 0` then `S.compare(a, c) <= 0`
 *
 * @since 2.0.0
 */
import { Contravariant1 } from './Contravariant'
import { Eq, eqStrict } from './Eq'
import { constant, constTrue, pipe } from './function'
import { Monoid } from './Monoid'
import { Ordering } from './Ordering'
import { Semigroup } from './Semigroup'

// -------------------------------------------------------------------------------------
// model
// -------------------------------------------------------------------------------------

/**
 * @category model
 * @since 2.0.0
 */
export interface Ord<A> extends Eq<A> {
  readonly compare: (first: A, second: A) => Ordering
}

// -------------------------------------------------------------------------------------
// defaults
// -------------------------------------------------------------------------------------

/**
 * @category defaults
 * @since 2.10.0
 */
export const equalsDefault =
  <A>(compare: Ord<A>['compare']): Eq<A>['equals'] =>
  (first, second) =>
    first === second || compare(first, second) === 0

// -------------------------------------------------------------------------------------
// constructors
// -------------------------------------------------------------------------------------

/**
 * @category constructors
 * @since 2.0.0
 */
export const fromCompare = <A>(compare: Ord<A>['compare']): Ord<A> => ({
  equals: equalsDefault(compare),
  compare: (first, second) => (first === second ? 0 : compare(first, second))
})

// -------------------------------------------------------------------------------------
// combinators
// -------------------------------------------------------------------------------------

/**
 * Given a tuple of `Ord`s returns an `Ord` for the tuple.
 *
 * @example
 * import { tuple } from 'fp-ts/Ord'
 * import * as B from 'fp-ts/boolean'
 * import * as S from 'fp-ts/string'
 * import * as N from 'fp-ts/number'
 *
 * const O = tuple(S.Ord, N.Ord, B.Ord)
 * assert.strictEqual(O.compare(['a', 1, true], ['b', 2, true]), -1)
 * assert.strictEqual(O.compare(['a', 1, true], ['a', 2, true]), -1)
 * assert.strictEqual(O.compare(['a', 1, true], ['a', 1, false]), 1)
 *
 * @since 2.10.0
 */
export const tuple = <A extends ReadonlyArray<unknown>>(...ords: { [K in keyof A]: Ord<A[K]> }): Ord<Readonly<A>> =>
  fromCompare((first, second) => {
    let i = 0
    for (; i < ords.length - 1; i++) {
      const r = ords[i].compare(first[i], second[i])
      if (r !== 0) {
        return r
      }
    }
    return ords[i].compare(first[i], second[i])
  })

/**
 * @since 2.10.0
 */
export const reverse = <A>(O: Ord<A>): Ord<A> => fromCompare((first, second) => O.compare(second, first))

/* istanbul ignore next */
const contramap_: <A, B>(fa: Ord<A>, f: (b: B) => A) => Ord<B> = (fa, f) => pipe(fa, contramap(f))

/**
 * A typical use case for `contramap` would be like, given some `User` type, to construct an `Ord<User>`.
 *
 * We can do so with a function from `User -> X` where `X` is some value that we know how to compare
 * for ordering (meaning we have an `Ord<X>`)
 *
 * For example, given the following `User` type, there are lots of possible choices for `X`,
 * but let's say we want to sort a list of users by `lastName`.
 *
 * If we have a way of comparing `lastName`s for ordering (`ordLastName: Ord<string>`) and we know how to go from `User -> string`,
 * using `contramap` we can do this
 *
 * @example
 * import { pipe } from 'fp-ts/function'
 * import { contramap, Ord } from 'fp-ts/Ord'
 * import * as RA from 'fp-ts/ReadonlyArray'
 * import * as S from 'fp-ts/string'
 *
 * interface User {
 *   readonly firstName: string
 *   readonly lastName: string
 * }
 *
 * const ordLastName: Ord<string> = S.Ord
 *
 * const ordByLastName: Ord<User> = pipe(
 *   ordLastName,
 *   contramap((user) => user.lastName)
 * )
 *
 * assert.deepStrictEqual(
 *   RA.sort(ordByLastName)([
 *     { firstName: 'a', lastName: 'd' },
 *     { firstName: 'c', lastName: 'b' }
 *   ]),
 *   [
 *     { firstName: 'c', lastName: 'b' },
 *     { firstName: 'a', lastName: 'd' }
 *   ]
 * )
 *
 * @since 2.0.0
 */
export const contramap: <A, B>(f: (b: B) => A) => (fa: Ord<A>) => Ord<B> = (f) => (fa) =>
  fromCompare((first, second) => fa.compare(f(first), f(second)))

/**
 * @category type lambdas
 * @since 2.0.0
 */
export const URI = 'Ord'

/**
 * @category type lambdas
 * @since 2.0.0
 */
export type URI = typeof URI

declare module './HKT' {
  interface URItoKind<A> {
    readonly [URI]: Ord<A>
  }
}

/**
 * A typical use case for the `Semigroup` instance of `Ord` is merging two or more orderings.
 *
 * For example the following snippet builds an `Ord` for a type `User` which
 * sorts by `created` date descending, and **then** `lastName`
 *
 * @example
 * import * as D from 'fp-ts/Date'
 * import { pipe } from 'fp-ts/function'
 * import { contramap, getSemigroup, Ord, reverse } from 'fp-ts/Ord'
 * import * as RA from 'fp-ts/ReadonlyArray'
 * import * as S from 'fp-ts/string'
 *
 * interface User {
 *   readonly id: string
 *   readonly lastName: string
 *   readonly created: Date
 * }
 *
 * const ordByLastName: Ord<User> = pipe(
 *   S.Ord,
 *   contramap((user) => user.lastName)
 * )
 *
 * const ordByCreated: Ord<User> = pipe(
 *   D.Ord,
 *   contramap((user) => user.created)
 * )
 *
 * const ordUserByCreatedDescThenLastName = getSemigroup<User>().concat(
 *   reverse(ordByCreated),
 *   ordByLastName
 * )
 *
 * assert.deepStrictEqual(
 *   RA.sort(ordUserByCreatedDescThenLastName)([
 *     { id: 'c', lastName: 'd', created: new Date(1973, 10, 30) },
 *     { id: 'a', lastName: 'b', created: new Date(1973, 10, 30) },
 *     { id: 'e', lastName: 'f', created: new Date(1980, 10, 30) }
 *   ]),
 *   [
 *     { id: 'e', lastName: 'f', created: new Date(1980, 10, 30) },
 *     { id: 'a', lastName: 'b', created: new Date(1973, 10, 30) },
 *     { id: 'c', lastName: 'd', created: new Date(1973, 10, 30) }
 *   ]
 * )
 *
 * @category instances
 * @since 2.0.0
 */
export const getSemigroup = <A = never>(): Semigroup<Ord<A>> => ({
  concat: (first, second) =>
    fromCompare((a, b) => {
      const ox = first.compare(a, b)
      return ox !== 0 ? ox : second.compare(a, b)
    })
})

/**
 * Returns a `Monoid` such that:
 *
 * - its `concat(ord1, ord2)` operation will order first by `ord1`, and then by `ord2`
 * - its `empty` value is an `Ord` that always considers compared elements equal
 *
 * @example
 * import { sort } from 'fp-ts/Array'
 * import { contramap, reverse, getMonoid } from 'fp-ts/Ord'
 * import * as S from 'fp-ts/string'
 * import * as B from 'fp-ts/boolean'
 * import { pipe } from 'fp-ts/function'
 * import { concatAll } from 'fp-ts/Monoid'
 * import * as N from 'fp-ts/number'
 *
 * interface User {
 *   readonly id: number
 *   readonly name: string
 *   readonly age: number
 *   readonly rememberMe: boolean
 * }
 *
 * const byName = pipe(
 *   S.Ord,
 *   contramap((p: User) => p.name)
 * )
 *
 * const byAge = pipe(
 *   N.Ord,
 *   contramap((p: User) => p.age)
 * )
 *
 * const byRememberMe = pipe(
 *   B.Ord,
 *   contramap((p: User) => p.rememberMe)
 * )
 *
 * const M = getMonoid<User>()
 *
 * const users: Array<User> = [
 *   { id: 1, name: 'Guido', age: 47, rememberMe: false },
 *   { id: 2, name: 'Guido', age: 46, rememberMe: true },
 *   { id: 3, name: 'Giulio', age: 44, rememberMe: false },
 *   { id: 4, name: 'Giulio', age: 44, rememberMe: true }
 * ]
 *
 * // sort by name, then by age, then by `rememberMe`
 * const O1 = concatAll(M)([byName, byAge, byRememberMe])
 * assert.deepStrictEqual(sort(O1)(users), [
 *   { id: 3, name: 'Giulio', age: 44, rememberMe: false },
 *   { id: 4, name: 'Giulio', age: 44, rememberMe: true },
 *   { id: 2, name: 'Guido', age: 46, rememberMe: true },
 *   { id: 1, name: 'Guido', age: 47, rememberMe: false }
 * ])
 *
 * // now `rememberMe = true` first, then by name, then by age
 * const O2 = concatAll(M)([reverse(byRememberMe), byName, byAge])
 * assert.deepStrictEqual(sort(O2)(users), [
 *   { id: 4, name: 'Giulio', age: 44, rememberMe: true },
 *   { id: 2, name: 'Guido', age: 46, rememberMe: true },
 *   { id: 3, name: 'Giulio', age: 44, rememberMe: false },
 *   { id: 1, name: 'Guido', age: 47, rememberMe: false }
 * ])
 *
 * @category instances
 * @since 2.4.0
 */
export const getMonoid = <A = never>(): Monoid<Ord<A>> => ({
  concat: getSemigroup<A>().concat,
  empty: fromCompare(() => 0)
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
// utils
// -------------------------------------------------------------------------------------

/**
 * @since 2.11.0
 */
export const trivial: Ord<unknown> = {
  equals: constTrue,
  compare: /*#__PURE__*/ constant(0)
}

/**
 * @since 2.11.0
 */
export const equals =
  <A>(O: Ord<A>) =>
  (second: A) =>
  (first: A): boolean =>
    first === second || O.compare(first, second) === 0

// TODO: curry in v3
/**
 * Test whether one value is _strictly less than_ another
 *
 * @since 2.0.0
 */
export const lt =
  <A>(O: Ord<A>) =>
  (first: A, second: A): boolean =>
    O.compare(first, second) === -1

// TODO: curry in v3
/**
 * Test whether one value is _strictly greater than_ another
 *
 * @since 2.0.0
 */
export const gt =
  <A>(O: Ord<A>) =>
  (first: A, second: A): boolean =>
    O.compare(first, second) === 1

// TODO: curry in v3
/**
 * Test whether one value is _non-strictly less than_ another
 *
 * @since 2.0.0
 */
export const leq =
  <A>(O: Ord<A>) =>
  (first: A, second: A): boolean =>
    O.compare(first, second) !== 1

// TODO: curry in v3
/**
 * Test whether one value is _non-strictly greater than_ another
 *
 * @since 2.0.0
 */
export const geq =
  <A>(O: Ord<A>) =>
  (first: A, second: A): boolean =>
    O.compare(first, second) !== -1

// TODO: curry in v3
/**
 * Take the minimum of two values. If they are considered equal, the first argument is chosen
 *
 * @since 2.0.0
 */
export const min =
  <A>(O: Ord<A>) =>
  (first: A, second: A): A =>
    first === second || O.compare(first, second) < 1 ? first : second

// TODO: curry in v3
/**
 * Take the maximum of two values. If they are considered equal, the first argument is chosen
 *
 * @since 2.0.0
 */
export const max =
  <A>(O: Ord<A>) =>
  (first: A, second: A): A =>
    first === second || O.compare(first, second) > -1 ? first : second

/**
 * Clamp a value between a minimum and a maximum
 *
 * @since 2.0.0
 */
export const clamp = <A>(O: Ord<A>): ((low: A, hi: A) => (a: A) => A) => {
  const minO = min(O)
  const maxO = max(O)
  return (low, hi) => (a) => maxO(minO(a, hi), low)
}

/**
 * Test whether a value is between a minimum and a maximum (inclusive)
 *
 * @since 2.0.0
 */
export const between = <A>(O: Ord<A>): ((low: A, hi: A) => (a: A) => boolean) => {
  const ltO = lt(O)
  const gtO = gt(O)
  return (low, hi) => (a) => ltO(a, low) || gtO(a, hi) ? false : true
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
export const getTupleOrd: <T extends ReadonlyArray<Ord<any>>>(
  ...ords: T
) => Ord<{ [K in keyof T]: T[K] extends Ord<infer A> ? A : never }> = tuple

/**
 * Use [`reverse`](#reverse) instead.
 *
 * @category zone of death
 * @since 2.0.0
 * @deprecated
 */
export const getDualOrd = reverse

/**
 * Use [`Contravariant`](#contravariant) instead.
 *
 * @category zone of death
 * @since 2.0.0
 * @deprecated
 */
export const ord: Contravariant1<URI> = Contravariant

// default compare for primitive types
function compare(first: any, second: any): Ordering {
  return first < second ? -1 : first > second ? 1 : 0
}

const strictOrd = {
  equals: eqStrict.equals,
  compare
}

/**
 * Use [`Ord`](./boolean.ts.html#ord) instead.
 *
 * @category zone of death
 * @since 2.0.0
 * @deprecated
 */
export const ordBoolean: Ord<boolean> = strictOrd

/**
 * Use [`Ord`](./string.ts.html#ord) instead.
 *
 * @category zone of death
 * @since 2.0.0
 * @deprecated
 */
export const ordString: Ord<string> = strictOrd

/**
 * Use [`Ord`](./number.ts.html#ord) instead.
 *
 * @category zone of death
 * @since 2.0.0
 * @deprecated
 */
export const ordNumber: Ord<number> = strictOrd

/**
 * Use [`Ord`](./Date.ts.html#ord) instead.
 *
 * @category zone of death
 * @since 2.0.0
 * @deprecated
 */
export const ordDate: Ord<Date> = /*#__PURE__*/ pipe(
  ordNumber,
  /*#__PURE__*/
  contramap((date) => date.valueOf())
)
