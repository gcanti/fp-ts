/**
 * @since 3.0.0
 */
import type { Semigroup } from '@fp-ts/core/Semigroup'

// -------------------------------------------------------------------------------------
// instances
// -------------------------------------------------------------------------------------

/**
 * Return a semigroup which works like `Object.assign`.
 *
 * @example
 * import { getAssignSemigroup } from '@fp-ts/core/struct'
 * import { pipe } from '@fp-ts/core/Function'
 *
 * interface Person {
 *   readonly name: string
 *   readonly age: number
 * }
 *
 * const S = getAssignSemigroup<Person>()
 * assert.deepStrictEqual(pipe({ name: 'name', age: 23 }, S.combine({ name: 'name', age: 24 })), { name: 'name', age: 24 })
 *
 * @category instances
 * @since 3.0.0
 */
export const getAssignSemigroup = <A>(): Semigroup<A> => ({
  combine: (that) => (self) => Object.assign({}, self, that)
})
