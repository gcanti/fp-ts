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
import { pipeable } from './pipeable'
import { ReadonlyRecord } from './ReadonlyRecord'

declare module './HKT' {
  interface URItoKind<A> {
    readonly Eq: Eq<A>
  }
}

/**
 * @since 2.0.0
 */
export const URI = 'Eq'

/**
 * @since 2.0.0
 */
export type URI = typeof URI

/**
 * @since 2.0.0
 */
export interface Eq<A> {
  readonly equals: (x: A, y: A) => boolean
}

/**
 * @since 2.0.0
 */
export function fromEquals<A>(equals: (x: A, y: A) => boolean): Eq<A> {
  return {
    equals: (x, y) => x === y || equals(x, y)
  }
}

/**
 * @since 2.0.0
 */
export function strictEqual<A>(a: A, b: A): boolean {
  return a === b
}

const eqStrict = { equals: strictEqual }

/**
 * @since 2.0.0
 */
export const eqString: Eq<string> = eqStrict

/**
 * @since 2.0.0
 */
export const eqNumber: Eq<number> = eqStrict

/**
 * @since 2.0.0
 */
export const eqBoolean: Eq<boolean> = eqStrict

/**
 * @since 2.0.0
 */
export function getStructEq<O extends ReadonlyRecord<string, any>>(eqs: { [K in keyof O]: Eq<O[K]> }): Eq<O> {
  return fromEquals((x, y) => {
    for (const k in eqs) {
      if (!eqs[k].equals(x[k], y[k])) {
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
 * import { getTupleEq, eqString, eqNumber, eqBoolean } from 'fp-ts/lib/Eq'
 *
 * const E = getTupleEq(eqString, eqNumber, eqBoolean)
 * assert.strictEqual(E.equals(['a', 1, true], ['a', 1, true]), true)
 * assert.strictEqual(E.equals(['a', 1, true], ['b', 1, true]), false)
 * assert.strictEqual(E.equals(['a', 1, true], ['a', 2, true]), false)
 * assert.strictEqual(E.equals(['a', 1, true], ['a', 1, false]), false)
 *
 * @since 2.0.0
 */
export function getTupleEq<T extends ReadonlyArray<Eq<any>>>(
  ...eqs: T
): Eq<{ [K in keyof T]: T[K] extends Eq<infer A> ? A : never }> {
  return fromEquals((x, y) => eqs.every((E, i) => E.equals(x[i], y[i])))
}

/**
 * @since 2.0.0
 */
export const eq: Contravariant1<URI> = {
  URI,
  contramap: (fa, f) => fromEquals((x, y) => fa.equals(f(x), f(y)))
}

const { contramap } = pipeable(eq)

export {
  /**
   * @since 2.0.0
   */
  contramap
}

/**
 * @since 2.0.0
 */
export const eqDate: Eq<Date> = eq.contramap(eqNumber, date => date.valueOf())
