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
export const getStructEq = <A>(eqs: { [K in keyof A]: Eq<A[K]> }): Eq<A> =>
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
 * import { getTupleEq, eqString, eqNumber, eqBoolean } from 'fp-ts/Eq'
 *
 * const E = getTupleEq(eqString, eqNumber, eqBoolean)
 * assert.strictEqual(E.equals(['a', 1, true])(['a', 1, true]), true)
 * assert.strictEqual(E.equals(['a', 1, true])(['b', 1, true]), false)
 * assert.strictEqual(E.equals(['a', 1, true])(['a', 2, true]), false)
 * assert.strictEqual(E.equals(['a', 1, true])(['a', 1, false]), false)
 *
 * @category combinators
 * @since 3.0.0
 */
export const getTupleEq = <A extends ReadonlyArray<unknown>>(...eqs: { [K in keyof A]: Eq<A[K]> }): Eq<A> =>
  fromEquals((second) => (first) => eqs.every((E, i) => E.equals(second[i])(first[i])))

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
export const eqStrict: Eq<unknown> = {
  equals: (second) => (first) => first === second
}

/**
 * @category instances
 * @since 3.0.0
 */
export const eqString: Eq<string> = eqStrict

/**
 * @category instances
 * @since 3.0.0
 */
export const eqNumber: Eq<number> = eqStrict

/**
 * @category instances
 * @since 3.0.0
 */
export const eqBoolean: Eq<boolean> = eqStrict

/**
 * @category instances
 * @since 3.0.0
 */
export const eqDate: Eq<Date> = {
  equals: (second) => (first) => first.valueOf() === second.valueOf()
}

/**
 * @category instances
 * @since 3.0.0
 */
export const getMonoid = <A>(): Monoid<Eq<A>> => ({
  concat: (second) => (first) => fromEquals((b) => (a) => first.equals(b)(a) && second.equals(b)(a)),
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
