/**
 * @since 2.10.0
 */
import * as _ from './internal'
import { getObjectSemigroup, Semigroup } from './Semigroup'

// -------------------------------------------------------------------------------------
// instances
// -------------------------------------------------------------------------------------

/**
 * Return a semigroup which works like `Object.assign`.
 *
 * @example
 * import { getAssignSemigroup } from 'fp-ts/struct'
 *
 * interface Person {
 *   readonly name: string
 *   readonly age: number
 * }
 *
 * const S = getAssignSemigroup<Person>()
 * assert.deepStrictEqual(S.concat({ name: 'name', age: 23 }, { name: 'name', age: 24 }), { name: 'name', age: 24 })
 *
 * @category instances
 * @since 2.10.0
 */
// tslint:disable-next-line: deprecation
export const getAssignSemigroup: <A extends object = never>() => Semigroup<A> = getObjectSemigroup

// -------------------------------------------------------------------------------------
// utils
// -------------------------------------------------------------------------------------

/**
 * Creates a new object by recursively evolving a shallow copy of `a`, according to the `transformation` functions.
 *
 * @example
 * import { pipe } from 'fp-ts/function'
 * import { evolve } from 'fp-ts/struct'
 *
 * assert.deepStrictEqual(
 *   pipe(
 *     { a: 'a', b: 1 },
 *     evolve({
 *       a: (a) => a.length,
 *       b: (b) => b * 2
 *     })
 *   ),
 *   { a: 1, b: 2 }
 * )
 *
 * @since 2.11.0
 */
export const evolve = <A, F extends { [K in keyof A]: (a: A[K]) => unknown }>(transformations: F) => (
  a: A
): { [K in keyof F]: ReturnType<F[K]> } => {
  const out: Record<string, unknown> = {}
  for (const k in a) {
    if (_.hasOwnProperty.call(a, k)) {
      out[k] = transformations[k](a[k])
    }
  }
  return out as any
}
