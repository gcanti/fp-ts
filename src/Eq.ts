/**
 * The `Eq` type class represents types which support decidable equality.
 *
 * Instances must satisfy the following laws:
 *
 * 1. Reflexivity: `a |> equals(a) === true`
 * 2. Symmetry: `a |> equals(b) === b |> equals(a)`
 * 3. Transitivity: if `a |> equals(b) === true` and `b |> equals(c) === true`, then `a |> equals(c) === true`
 *
 * @since 3.0.0
 */
import { Contravariant1 } from './Contravariant'
import { flow } from './function'
import { Monoid } from './Monoid'
import { Semigroup } from './Semigroup'

// -------------------------------------------------------------------------------------
// model
// -------------------------------------------------------------------------------------

/**
 * @category type classes
 * @since 3.0.0
 */
export interface Eq<A> {
  readonly equals: (second: A) => (first: A) => boolean
}

// -------------------------------------------------------------------------------------
// constructors
// -------------------------------------------------------------------------------------

/**
 * @category constructors
 * @since 3.0.0
 */
export const fromEquals = <A>(equals: Eq<A>['equals']): Eq<A> => ({
  equals: (second) => {
    const predicate = equals(second)
    return (first) => first === second || predicate(first)
  }
})

// -------------------------------------------------------------------------------------
// combinators
// -------------------------------------------------------------------------------------

/**
 * @category combinators
 * @since 3.0.0
 */
export const struct = <A>(eqs: { [K in keyof A]: Eq<A[K]> }): Eq<{ readonly [K in keyof A]: A[K] }> =>
  fromEquals((second) => (first) => {
    for (const key in eqs) {
      if (!eqs[key].equals(second[key])(first[key])) {
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
 * assert.strictEqual(E.equals(['a', 1, true])(['a', 1, true]), true)
 * assert.strictEqual(E.equals(['a', 1, true])(['b', 1, true]), false)
 * assert.strictEqual(E.equals(['a', 1, true])(['a', 2, true]), false)
 * assert.strictEqual(E.equals(['a', 1, true])(['a', 1, false]), false)
 *
 * @category combinators
 * @since 3.0.0
 */
export const tuple = <A extends ReadonlyArray<unknown>>(
  ...eqs: { [K in keyof A]: Eq<A[K]> }
): Eq<Readonly<Readonly<A>>> => fromEquals((second) => (first) => eqs.every((E, i) => E.equals(second[i])(first[i])))

// -------------------------------------------------------------------------------------
// type class members
// -------------------------------------------------------------------------------------

/**
 * @category Contravariant
 * @since 3.0.0
 */
export const contramap: Contravariant1<URI>['contramap'] = (f) => (fa) =>
  fromEquals((second) => flow(f, fa.equals(f(second))))

// -------------------------------------------------------------------------------------
// instances
// -------------------------------------------------------------------------------------

/**
 * @category instances
 * @since 3.0.0
 */
export type URI = 'Eq'

declare module './HKT' {
  interface URItoKind<A> {
    readonly Eq: Eq<A>
  }
}

/**
 * @category instances
 * @since 3.0.0
 */
export const EqStrict: Eq<unknown> = {
  equals: (second) => (first) => first === second
}

/**
 * @category instances
 * @since 3.0.0
 */
export const getSemigroup = <A>(): Semigroup<Eq<A>> => ({
  concat: (second) => (first) => fromEquals((b) => (a) => first.equals(b)(a) && second.equals(b)(a))
})

/**
 * @category instances
 * @since 3.0.0
 */
export const getMonoid = <A>(): Monoid<Eq<A>> => ({
  concat: getSemigroup<A>().concat,
  empty: {
    equals: () => () => true
  }
})

/**
 * @category instances
 * @since 3.0.0
 */
export const Contravariant: Contravariant1<URI> = {
  contramap
}
