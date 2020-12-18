/**
 * The `Eq` type class represents types which support decidable equality.
 *
 * Instances must satisfy the following laws:
 *
 * 1. Reflexivity: `equals(a)(a) === true`
 * 2. Symmetry: `equals(b)(a) === equals(a)(b)`
 * 3. Transitivity: if `equals(b)(a) === true` and `equals(c)(b) === true`, then `equals(c)(a) === true`
 *
 * @since 3.0.0
 */
import { Contravariant1 } from './Contravariant'
import { flow } from './function'
import { Monoid } from './Monoid'
import { ReadonlyRecord } from './ReadonlyRecord'

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
export function fromEquals<A>(equals: Eq<A>['equals']): Eq<A> {
  return {
    equals: (second) => {
      const predicate = equals(second)
      return (first) => first === second || predicate(first)
    }
  }
}

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
export const URI = 'Eq'

/**
 * @category instances
 * @since 3.0.0
 */
export type URI = typeof URI

declare module './HKT' {
  interface URItoKind<A> {
    readonly [URI]: Eq<A>
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
export function getStructEq<O extends ReadonlyRecord<string, any>>(eqs: { [K in keyof O]: Eq<O[K]> }): Eq<O> {
  return fromEquals((second) => (first) => {
    for (const k in eqs) {
      if (!eqs[k].equals(second[k])(first[k])) {
        return false
      }
    }
    return true
  })
}

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
 * @category instances
 * @since 3.0.0
 */
export function getTupleEq<T extends ReadonlyArray<Eq<any>>>(
  ...eqs: T
): Eq<{ [K in keyof T]: T[K] extends Eq<infer A> ? A : never }> {
  return fromEquals((second) => (first) => eqs.every((E, i) => E.equals(second[i])(first[i])))
}

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
export function getMonoid<A>(): Monoid<Eq<A>> {
  return {
    concat: (second) => (first) => fromEquals((b) => (a) => first.equals(b)(a) && second.equals(b)(a)),
    empty: {
      equals: () => () => true
    }
  }
}

/**
 * @category instances
 * @since 3.0.0
 */
export const Contravariant: Contravariant1<URI> = {
  URI,
  contramap
}
