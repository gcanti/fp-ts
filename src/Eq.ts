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
import { Monoid } from './Monoid'
import { ReadonlyRecord } from './ReadonlyRecord'
import { pipe } from './function'

// -------------------------------------------------------------------------------------
// model
// -------------------------------------------------------------------------------------

/**
 * @category type classes
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
export function fromEquals<A>(equals: (x: A, y: A) => boolean): Eq<A> {
  return {
    equals: (x, y) => x === y || equals(x, y)
  }
}

// -------------------------------------------------------------------------------------
// non-pipeables
// -------------------------------------------------------------------------------------

/* istanbul ignore next */
const contramap_: <A, B>(fa: Eq<A>, f: (b: B) => A) => Eq<B> = (fa, f) => pipe(fa, contramap(f))

// -------------------------------------------------------------------------------------
// pipeables
// -------------------------------------------------------------------------------------

/**
 * @category Contravariant
 * @since 2.0.0
 */
export const contramap: <A, B>(f: (b: B) => A) => (fa: Eq<A>) => Eq<B> = (f) => (fa) =>
  fromEquals((x, y) => fa.equals(f(x), f(y)))

// -------------------------------------------------------------------------------------
// instances
// -------------------------------------------------------------------------------------

/**
 * @category instances
 * @since 2.0.0
 */
export const URI = 'Eq'

/**
 * @category instances
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
  // tslint:disable-next-line: deprecation
  equals: strictEqual
}

/**
 * Use `eqStrict` instead
 *
 * @since 2.0.0
 * @deprecated
 */
export function strictEqual<A>(a: A, b: A): boolean {
  return a === b
}

/**
 * @category instances
 * @since 2.0.0
 */
export const eqString: Eq<string> = eqStrict

/**
 * @category instances
 * @since 2.0.0
 */
export const eqNumber: Eq<number> = eqStrict

/**
 * @category instances
 * @since 2.0.0
 */
export const eqBoolean: Eq<boolean> = eqStrict

/**
 * @category instances
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
 * import { getTupleEq, eqString, eqNumber, eqBoolean } from 'fp-ts/Eq'
 *
 * const E = getTupleEq(eqString, eqNumber, eqBoolean)
 * assert.strictEqual(E.equals(['a', 1, true], ['a', 1, true]), true)
 * assert.strictEqual(E.equals(['a', 1, true], ['b', 1, true]), false)
 * assert.strictEqual(E.equals(['a', 1, true], ['a', 2, true]), false)
 * assert.strictEqual(E.equals(['a', 1, true], ['a', 1, false]), false)
 *
 * @category instances
 * @since 2.0.0
 */
export function getTupleEq<T extends ReadonlyArray<Eq<any>>>(
  ...eqs: T
): Eq<{ [K in keyof T]: T[K] extends Eq<infer A> ? A : never }> {
  return fromEquals((x, y) => eqs.every((E, i) => E.equals(x[i], y[i])))
}

/**
 * @category instances
 * @since 2.0.0
 */
export const eqDate: Eq<Date> = {
  equals: (x, y) => x.valueOf() === y.valueOf()
}

const empty: Eq<unknown> = {
  equals: () => true
}

/**
 * @category instances
 * @since 2.6.0
 */
export function getMonoid<A>(): Monoid<Eq<A>> {
  return {
    concat: (x, y) => fromEquals((a, b) => x.equals(a, b) && y.equals(a, b)),
    empty
  }
}

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
export const eq: Contravariant1<URI> = Contravariant
