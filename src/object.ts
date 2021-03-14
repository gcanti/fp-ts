/**
 * @since 3.0.0
 */
import { Semigroup } from './Semigroup'

// -------------------------------------------------------------------------------------
// instances
// -------------------------------------------------------------------------------------

/**
 * Return a semigroup which works like `Object.assign`.
 *
 * @example
 * import { getAssignSemigroup } from 'fp-ts/object'
 * import { pipe } from 'fp-ts/function'
 *
 * interface Person {
 *   readonly name: string
 *   readonly age: number
 * }
 *
 * const S = getAssignSemigroup<Person>()
 * assert.deepStrictEqual(pipe({ name: 'name', age: 23 }, S.concat({ name: 'name', age: 24 })), { name: 'name', age: 24 })
 *
 * @category instances
 * @since 3.0.0
 */
export const getAssignSemigroup = <A extends object = never>(): Semigroup<A> => ({
  concat: (second) => (first) => Object.assign({}, first, second)
})
