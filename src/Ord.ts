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
import { pipe } from './function'
import { Monoid } from './Monoid'
import { Ordering } from './Ordering'
import { Semigroup } from './Semigroup'

// -------------------------------------------------------------------------------------
// model
// -------------------------------------------------------------------------------------

/**
 * @category type classes
 * @since 2.0.0
 */
export interface Ord<A> extends Eq<A> {
  readonly compare: (x: A, y: A) => Ordering
}

// -------------------------------------------------------------------------------------
// defaults
// -------------------------------------------------------------------------------------

/**
 * @category defaults
 * @since 2.10.0
 */
export const equalsDefault = <A>(compare: Ord<A>['compare']): Eq<A>['equals'] => (first, second) =>
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
 * Given a tuple of `Ord`s returns an `Ord` for the tuple
 *
 * @example
 * import { getTupleOrd } from 'fp-ts/Ord'
 * import * as S from 'fp-ts/string'
 * import * as N from 'fp-ts/number'
 * import * as B from 'fp-ts/boolean'
 *
 * const O = getTupleOrd(S.Ord, N.Ord, B.Ord)
 * assert.strictEqual(O.compare(['a', 1, true], ['b', 2, true]), -1)
 * assert.strictEqual(O.compare(['a', 1, true], ['a', 2, true]), -1)
 * assert.strictEqual(O.compare(['a', 1, true], ['a', 1, false]), 1)
 *
 * @category combinators
 * @since 2.0.0
 */
export function getTupleOrd<T extends ReadonlyArray<Ord<any>>>(
  ...ords: T
): Ord<{ [K in keyof T]: T[K] extends Ord<infer A> ? A : never }> {
  const len = ords.length
  return fromCompare((x, y) => {
    let i = 0
    for (; i < len - 1; i++) {
      const r = ords[i].compare(x[i], y[i])
      if (r !== 0) {
        return r
      }
    }
    return ords[i].compare(x[i], y[i])
  })
}

/**
 * @category combinators
 * @since 2.10.0
 */
export const reverse = <A>(O: Ord<A>): Ord<A> => fromCompare((x, y) => O.compare(y, x))

// -------------------------------------------------------------------------------------
// non-pipeables
// -------------------------------------------------------------------------------------

/* istanbul ignore next */
const contramap_: <A, B>(fa: Ord<A>, f: (b: B) => A) => Ord<B> = (fa, f) => pipe(fa, contramap(f))

// -------------------------------------------------------------------------------------
// type class members
// -------------------------------------------------------------------------------------

/**
 * @category Contravariant
 * @since 2.0.0
 */
export const contramap: <A, B>(f: (b: B) => A) => (fa: Ord<A>) => Ord<B> = (f) => (fa) =>
  fromCompare((x, y) => fa.compare(f(x), f(y)))

// -------------------------------------------------------------------------------------
// instances
// -------------------------------------------------------------------------------------

/**
 * @category instances
 * @since 2.0.0
 */
export const URI = 'Ord'

/**
 * @category instances
 * @since 2.0.0
 */
export type URI = typeof URI

declare module './HKT' {
  interface URItoKind<A> {
    readonly [URI]: Ord<A>
  }
}

/**
 * @category instances
 * @since 2.0.0
 */
export const getSemigroup = <A = never>(): Semigroup<Ord<A>> => ({
  concat: (x, y) =>
    fromCompare((a, b) => {
      const ox = x.compare(a, b)
      return ox !== 0 ? ox : y.compare(a, b)
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
 * import { fold } from 'fp-ts/Monoid'
 * import * as N from 'fp-ts/number'
 *
 * interface User {
 *   id: number
 *   name: string
 *   age: number
 *   rememberMe: boolean
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
 * const O1 = fold(M)([byName, byAge, byRememberMe])
 * assert.deepStrictEqual(sort(O1)(users), [
 *   { id: 3, name: 'Giulio', age: 44, rememberMe: false },
 *   { id: 4, name: 'Giulio', age: 44, rememberMe: true },
 *   { id: 2, name: 'Guido', age: 46, rememberMe: true },
 *   { id: 1, name: 'Guido', age: 47, rememberMe: false }
 * ])
 *
 * // now `rememberMe = true` first, then by name, then by age
 * const O2 = fold(M)([reverse(byRememberMe), byName, byAge])
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

// TODO: curry in v3
/**
 * Test whether one value is _strictly less than_ another
 *
 * @since 2.0.0
 */
export function lt<A>(O: Ord<A>): (x: A, y: A) => boolean {
  return (x, y) => O.compare(x, y) === -1
}

// TODO: curry in v3
/**
 * Test whether one value is _strictly greater than_ another
 *
 * @since 2.0.0
 */
export function gt<A>(O: Ord<A>): (x: A, y: A) => boolean {
  return (x, y) => O.compare(x, y) === 1
}

// TODO: curry in v3
/**
 * Test whether one value is _non-strictly less than_ another
 *
 * @since 2.0.0
 */
export function leq<A>(O: Ord<A>): (x: A, y: A) => boolean {
  return (x, y) => O.compare(x, y) !== 1
}

// TODO: curry in v3
/**
 * Test whether one value is _non-strictly greater than_ another
 *
 * @since 2.0.0
 */
export function geq<A>(O: Ord<A>): (x: A, y: A) => boolean {
  return (x, y) => O.compare(x, y) !== -1
}

// TODO: curry in v3
/**
 * Take the minimum of two values. If they are considered equal, the first argument is chosen
 *
 * @since 2.0.0
 */
export function min<A>(O: Ord<A>): (x: A, y: A) => A {
  return (x, y) => (O.compare(x, y) === 1 ? y : x)
}

// TODO: curry in v3
/**
 * Take the maximum of two values. If they are considered equal, the first argument is chosen
 *
 * @since 2.0.0
 */
export function max<A>(O: Ord<A>): (x: A, y: A) => A {
  return (x, y) => (O.compare(x, y) === -1 ? y : x)
}

/**
 * Clamp a value between a minimum and a maximum
 *
 * @since 2.0.0
 */
export function clamp<A>(O: Ord<A>): (low: A, hi: A) => (x: A) => A {
  const minO = min(O)
  const maxO = max(O)
  return (low, hi) => (x) => maxO(minO(x, hi), low)
}

/**
 * Test whether a value is between a minimum and a maximum (inclusive)
 *
 * @since 2.0.0
 */
export function between<A>(O: Ord<A>): (low: A, hi: A) => (x: A) => boolean {
  const lessThanO = lt(O)
  const greaterThanO = gt(O)
  return (low, hi) => (x) => (lessThanO(x, low) || greaterThanO(x, hi) ? false : true)
}

// -------------------------------------------------------------------------------------
// deprecated
// -------------------------------------------------------------------------------------

/**
 * Use `reverse` instead.
 *
 * @category combinators
 * @since 2.0.0
 * @deprecated
 */
export const getDualOrd = reverse

/**
 * Use `Contravariant` instead.
 *
 * @category instances
 * @since 2.0.0
 * @deprecated
 */
export const ord: Contravariant1<URI> = Contravariant

// default compare for primitive types
function compare(x: any, y: any): Ordering {
  return x < y ? -1 : x > y ? 1 : 0
}

const strictOrd = {
  equals: eqStrict.equals,
  compare
}

/**
 * Use `boolean.Ord` instead.
 *
 * @category instances
 * @since 2.0.0
 * @deprecated
 */
export const ordBoolean: Ord<boolean> = strictOrd

/**
 * Use `string.Ord` instead.
 *
 * @category instances
 * @since 2.0.0
 * @deprecated
 */
export const ordString: Ord<string> = strictOrd

/**
 * Use `number.Ord` instead.
 *
 * @category instances
 * @since 2.0.0
 * @deprecated
 */
export const ordNumber: Ord<number> = strictOrd

/**
 * Use `Date.Ord` instead.
 *
 * @category instances
 * @since 2.0.0
 * @deprecated
 */
export const ordDate: Ord<Date> =
  /*#__PURE__*/
  pipe(
    // tslint:disable-next-line: deprecation
    ordNumber,
    /*#__PURE__*/
    contramap((date) => date.valueOf())
  )
