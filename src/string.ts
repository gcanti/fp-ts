/**
 * @since 2.10.0
 */
import * as E from './Eq'
import * as M from './Monoid'
import * as S from './Semigroup'
import * as O from './Ord'
import * as Sh from './Show'
import { Refinement } from './Refinement'
import { ReadonlyNonEmptyArray, isNonEmpty } from './ReadonlyNonEmptyArray'

// -------------------------------------------------------------------------------------
// instances
// -------------------------------------------------------------------------------------

/**
 * @category instances
 * @since 2.10.0
 */
export const Eq: E.Eq<string> = {
  equals: (first, second) => first === second
}

/**
 * `string` semigroup under concatenation.
 *
 * @example
 * import * as S from 'fp-ts/string'
 *
 * assert.deepStrictEqual(S.Semigroup.concat('a', 'b'), 'ab')
 *
 * @category instances
 * @since 2.10.0
 */
export const Semigroup: S.Semigroup<string> = {
  concat: (first, second) => first + second
}

/**
 * `string` monoid under concatenation.
 *
 * The `empty` value is `''`.
 *
 * @example
 * import * as S from 'fp-ts/string'
 *
 * assert.deepStrictEqual(S.Monoid.concat('a', 'b'), 'ab')
 *
 * @category instances
 * @since 2.10.0
 */
export const Monoid: M.Monoid<string> = {
  concat: Semigroup.concat,
  empty: ''
}

/**
 * @category instances
 * @since 2.10.0
 */
export const Ord: O.Ord<string> = {
  equals: Eq.equals,
  compare: (first, second) => (first < second ? -1 : first > second ? 1 : 0)
}

/**
 * @category instances
 * @since 2.10.0
 */
export const Show: Sh.Show<string> = {
  show: (s) => JSON.stringify(s)
}

// -------------------------------------------------------------------------------------
// refinements
// -------------------------------------------------------------------------------------

/**
 * @category refinements
 * @since 2.11.0
 */
export const isString: Refinement<unknown, string> = (u: unknown): u is string => typeof u === 'string'

// -------------------------------------------------------------------------------------
// utils
// -------------------------------------------------------------------------------------

/**
 * An empty `string`.
 *
 * @since 2.10.0
 */
export const empty: string = ''

/**
 * Test whether a `string` is empty.
 *
 * @since 2.10.0
 */
export const isEmpty = (s: string): boolean => s.length === 0

/**
 * Calculate the number of characters in a `string`.
 *
 * @since 2.10.0
 */
export const size = (s: string): number => s.length

/**
 * @since 2.11.0
 */
export const toUpperCase = (s: string): string => s.toUpperCase()

/**
 * @since 2.11.0
 */
export const toLowerCase = (s: string): string => s.toLowerCase()

/**
 * @since 2.11.0
 */
export const replace = (searchValue: string | RegExp, replaceValue: string) => (s: string): string =>
  s.replace(searchValue, replaceValue)

/**
 * @since 2.11.0
 */
export const split = (separator: string | RegExp) => (s: string): ReadonlyNonEmptyArray<string> => {
  const out = s.split(separator)
  return isNonEmpty(out) ? out : [s]
}

/**
 * @since 2.11.0
 */
export const trim = (s: string): string => s.trim()

/**
 * @since 2.11.0
 */
export const trimLeft = (s: string): string => s.trimLeft()

/**
 * @since 2.11.0
 */
export const trimRight = (s: string): string => s.trimRight()

/**
 * @since 2.11.0
 */
export const includes = (searchString: string, position?: number) => (s: string): boolean =>
  s.includes(searchString, position)

/**
 * @since 2.11.0
 */
export const startsWith = (searchString: string, position?: number) => (s: string): boolean =>
  s.startsWith(searchString, position)

/**
 * @since 2.11.0
 */
export const endsWith = (searchString: string, position?: number) => (s: string): boolean =>
  s.endsWith(searchString, position)

/**
 * @since 2.11.0
 */
export const slice = (start: number, end: number) => (s: string): string => s.slice(start, end)
