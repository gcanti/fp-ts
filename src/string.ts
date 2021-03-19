/**
 * @since 3.0.0
 */
import * as E from './Eq'
import * as M from './Monoid'
import * as S from './Semigroup'
import * as O from './Ord'
import * as Sh from './Show'

// -------------------------------------------------------------------------------------
// instances
// -------------------------------------------------------------------------------------

/**
 * @category instances
 * @since 3.0.0
 */
export const Eq: E.Eq<string> = {
  equals: (second) => (first) => first === second
}

/**
 * `string` semigroup under concatenation.
 *
 * @example
 * import { Semigroup } from 'fp-ts/string'
 * import { pipe } from 'fp-ts/function'
 *
 * assert.deepStrictEqual(pipe('a', Semigroup.concat('b')), 'ab')
 *
 * @category instances
 * @since 3.0.0
 */
export const Semigroup: S.Semigroup<string> = {
  concat: (second) => (first) => first + second
}

/**
 * An empty `string`.
 *
 * @since 3.0.0
 */
export const empty: string = ''

/**
 * `string` monoid under concatenation.
 *
 * The `empty` value is `''`.
 *
 * @example
 * import { Monoid } from 'fp-ts/string'
 * import { pipe } from 'fp-ts/function'
 *
 * assert.deepStrictEqual(pipe('a', Monoid.concat('b')), 'ab')
 *
 * @category instances
 * @since 3.0.0
 */
export const Monoid: M.Monoid<string> = {
  concat: Semigroup.concat,
  empty
}

/**
 * @category instances
 * @since 3.0.0
 */
export const Ord: O.Ord<string> = {
  compare: (second) => (first) => (first < second ? -1 : first > second ? 1 : 0)
}

/**
 * @category instances
 * @since 3.0.0
 */
export const Show: Sh.Show<string> = {
  show: (a) => JSON.stringify(a)
}

// -------------------------------------------------------------------------------------
// utils
// -------------------------------------------------------------------------------------

/**
 * Test whether a `string` is empty.
 *
 * @since 3.0.0
 */
export const isEmpty = (s: string): boolean => s.length === 0

/**
 * Calculate the number of characters in a `string`.
 *
 * @since 3.0.0
 */
export const size = (s: string): number => s.length

/**
 * @since 3.0.0
 */
export const toUpperCase = (s: string): string => s.toUpperCase()
