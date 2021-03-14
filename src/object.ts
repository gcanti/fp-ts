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
 * import { assign } from 'fp-ts/object'
 * import { pipe } from 'fp-ts/function'
 *
 * interface Person {
 *   name: string
 *   age: number
 * }
 *
 * const S = assign<Person>()
 * assert.deepStrictEqual(pipe({ name: 'name', age: 23 }, S.concat({ name: 'name', age: 24 })), { name: 'name', age: 24 })
 *
 * @category instances
 * @since 3.0.0
 */
export const getAssignSemigroup = <A extends object = never>(): Semigroup<A> => ({
  concat: assign
})

// -------------------------------------------------------------------------------------
// utils
// -------------------------------------------------------------------------------------

/**
 * @since 3.0.0
 */
export const assign = <A extends object>(second: A) => (first: A): A => Object.assign({}, first, second)
