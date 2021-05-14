/**
 * @since 3.0.0
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
 * @since 3.0.0
 */
export const Eq: E.Eq<string> = {
  equals: (second) => (first) => first === second
}

/**
 * `string` semigroup under concatenation.
 *
 * @example
 * import * as S from 'fp-ts/string'
 * import { pipe } from 'fp-ts/function'
 *
 * assert.deepStrictEqual(pipe('a', S.Semigroup.concat('b')), 'ab')
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
 * import * as S from 'fp-ts/string'
 * import { pipe } from 'fp-ts/function'
 *
 * assert.deepStrictEqual(pipe('a', S.Monoid.concat('b')), 'ab')
 * assert.deepStrictEqual(pipe('a', S.Monoid.concat(S.Monoid.empty)), 'a')
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
  show: (s) => JSON.stringify(s)
}

// -------------------------------------------------------------------------------------
// refinements
// -------------------------------------------------------------------------------------

/**
 * @category refinements
 * @since 3.0.0
 */
export const isString: Refinement<unknown, string> = (u: unknown): u is string => typeof u === 'string'

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

/**
 * @since 3.0.0
 */
export const toLowerCase = (s: string): string => s.toLowerCase()

/**
 * @since 3.0.0
 */
export const replace = (searchValue: string | RegExp, replaceValue: string) => (s: string): string =>
  s.replace(searchValue, replaceValue)

/**
 * @since 3.0.0
 */
export const split = (separator: string | RegExp) => (s: string): ReadonlyNonEmptyArray<string> => {
  const out = s.split(separator)
  return isNonEmpty(out) ? out : [s]
}

/**
 * @since 3.0.0
 */
export const trim = (s: string): string => s.trim()

/**
 * @since 3.0.0
 */
export const trimLeft = (s: string): string => s.trimLeft()

/**
 * @since 3.0.0
 */
export const trimRight = (s: string): string => s.trimRight()

/**
 * @since 3.0.0
 */
export const includes = (searchString: string, position?: number) => (s: string): boolean =>
  s.includes(searchString, position)

/**
 * @since 3.0.0
 */
export const startsWith = (searchString: string, position?: number) => (s: string): boolean =>
  s.startsWith(searchString, position)

/**
 * @since 3.0.0
 */
export const endsWith = (searchString: string, position?: number) => (s: string): boolean =>
  s.endsWith(searchString, position)

/**
 * @since 3.0.0
 */
export const slice = (start: number, end: number) => (s: string): string => s.slice(start, end)
