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
import { Eq } from './Eq'
import { Monoid } from './Monoid'
import { monoidOrdering, Ordering } from './Ordering'
import { Semigroup } from './Semigroup'
import { pipe } from './function'

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

// default compare for primitive types
function compare(x: any, y: any): Ordering {
  return x < y ? -1 : x > y ? 1 : 0
}

function strictEqual<A>(a: A, b: A): boolean {
  return a === b
}

/**
 * @category instances
 * @since 2.0.0
 */
export const ordString: Ord<string> = {
  equals: strictEqual,
  compare
}

/**
 * @category instances
 * @since 2.0.0
 */
export const ordNumber: Ord<number> = {
  equals: strictEqual,
  compare
}

/**
 * @category instances
 * @since 2.0.0
 */
export const ordBoolean: Ord<boolean> = {
  equals: strictEqual,
  compare
}

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

/**
 * @category constructors
 * @since 2.0.0
 */
export function fromCompare<A>(compare: (x: A, y: A) => Ordering): Ord<A> {
  const optimizedCompare = (x: A, y: A): Ordering => (x === y ? 0 : compare(x, y))
  return {
    equals: (x, y) => optimizedCompare(x, y) === 0,
    compare: optimizedCompare
  }
}

/**
 * Use `getMonoid` instead
 *
 * @category instances
 * @since 2.0.0
 * @deprecated
 */
export function getSemigroup<A = never>(): Semigroup<Ord<A>> {
  return {
    concat: (x, y) => fromCompare((a, b) => monoidOrdering.concat(x.compare(a, b), y.compare(a, b)))
  }
}

/**
 * Returns a `Monoid` such that:
 *
 * - its `concat(ord1, ord2)` operation will order first by `ord1`, and then by `ord2`
 * - its `empty` value is an `Ord` that always considers compared elements equal
 *
 * @example
 * import { sort } from 'fp-ts/Array'
 * import { contramap, getDualOrd, getMonoid, ordBoolean, ordNumber, ordString } from 'fp-ts/Ord'
 * import { pipe } from 'fp-ts/function'
 * import { fold } from 'fp-ts/Monoid'
 *
 * interface User {
 *   id: number
 *   name: string
 *   age: number
 *   rememberMe: boolean
 * }
 *
 * const byName = pipe(
 *   ordString,
 *   contramap((p: User) => p.name)
 * )
 *
 * const byAge = pipe(
 *   ordNumber,
 *   contramap((p: User) => p.age)
 * )
 *
 * const byRememberMe = pipe(
 *   ordBoolean,
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
 * const O2 = fold(M)([getDualOrd(byRememberMe), byName, byAge])
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
export function getMonoid<A = never>(): Monoid<Ord<A>> {
  return {
    // tslint:disable-next-line: deprecation
    concat: getSemigroup<A>().concat,
    empty: fromCompare(() => 0)
  }
}

/**
 * Given a tuple of `Ord`s returns an `Ord` for the tuple
 *
 * @example
 * import { getTupleOrd, ordString, ordNumber, ordBoolean } from 'fp-ts/Ord'
 *
 * const O = getTupleOrd(ordString, ordNumber, ordBoolean)
 * assert.strictEqual(O.compare(['a', 1, true], ['b', 2, true]), -1)
 * assert.strictEqual(O.compare(['a', 1, true], ['a', 2, true]), -1)
 * assert.strictEqual(O.compare(['a', 1, true], ['a', 1, false]), 1)
 *
 * @category instances
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
 * @since 2.0.0
 */
export function getDualOrd<A>(O: Ord<A>): Ord<A> {
  return fromCompare((x, y) => O.compare(y, x))
}

// -------------------------------------------------------------------------------------
// non-pipeables
// -------------------------------------------------------------------------------------

/* istanbul ignore next */
const contramap_: <A, B>(fa: Ord<A>, f: (b: B) => A) => Ord<B> = (fa, f) => pipe(fa, contramap(f))

// -------------------------------------------------------------------------------------
// pipeables
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
export const ordDate: Ord<Date> =
  /*#__PURE__*/
  pipe(
    ordNumber,
    /*#__PURE__*/
    contramap((date) => date.valueOf())
  )

/**
 * @category instances
 * @since 2.7.0
 */
export const Contravariant: Contravariant1<URI> = {
  URI,
  contramap: contramap_
}

// TODO: remove in v3
/**
 * @category instances
 * @since 2.0.0
 */
export const ord: Contravariant1<URI> = Contravariant
