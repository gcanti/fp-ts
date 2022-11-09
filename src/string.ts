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
 * @example
 * import * as S from 'fp-ts/string'
 *
 * assert.deepStrictEqual(S.Eq.equals('a', 'a'), true)
 * assert.deepStrictEqual(S.Eq.equals('a', 'b'), false)
 *
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
 * An empty `string`.
 *
 * @since 2.10.0
 */
export const empty = ''

/**
 * `string` monoid under concatenation.
 *
 * The `empty` value is `''`.
 *
 * @example
 * import * as S from 'fp-ts/string'
 *
 * assert.deepStrictEqual(S.Monoid.concat('a', 'b'), 'ab')
 * assert.deepStrictEqual(S.Monoid.concat('a', S.Monoid.empty), 'a')
 *
 * @category instances
 * @since 2.10.0
 */
export const Monoid: M.Monoid<string> = {
  concat: Semigroup.concat,
  empty
}

/**
 * @example
 * import * as S from 'fp-ts/string'
 *
 * assert.deepStrictEqual(S.Ord.compare('a', 'a'), 0)
 * assert.deepStrictEqual(S.Ord.compare('a', 'b'), -1)
 * assert.deepStrictEqual(S.Ord.compare('b', 'a'), 1)
 *
 * @category instances
 * @since 2.10.0
 */
export const Ord: O.Ord<string> = {
  equals: Eq.equals,
  compare: (first, second) => (first < second ? -1 : first > second ? 1 : 0)
}

/**
 * @example
 * import * as S from 'fp-ts/string'
 *
 * assert.deepStrictEqual(S.Show.show('a'), '"a"')
 *
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
 * @example
 * import * as S from 'fp-ts/string'
 *
 * assert.deepStrictEqual(S.isString('a'), true)
 * assert.deepStrictEqual(S.isString(1), false)
 *
 * @category refinements
 * @since 2.11.0
 */
export const isString: Refinement<unknown, string> = (u: unknown): u is string => typeof u === 'string'

// -------------------------------------------------------------------------------------
// combinators
// -------------------------------------------------------------------------------------

/**
 * @example
 * import * as S from 'fp-ts/string'
 * import { pipe } from 'fp-ts/function'
 *
 * assert.deepStrictEqual(pipe('a', S.toUpperCase), 'A')
 *
 * @since 2.11.0
 */
export const toUpperCase = (s: string): string => s.toUpperCase()

/**
 * @example
 * import * as S from 'fp-ts/string'
 * import { pipe } from 'fp-ts/function'
 *
 * assert.deepStrictEqual(pipe('A', S.toLowerCase), 'a')
 *
 * @since 2.11.0
 */
export const toLowerCase = (s: string): string => s.toLowerCase()

/**
 * @example
 * import * as S from 'fp-ts/string'
 * import { pipe } from 'fp-ts/function'
 *
 * assert.deepStrictEqual(pipe('abc', S.replace('b', 'd')), 'adc')
 *
 * @since 2.11.0
 */
export const replace =
  (searchValue: string | RegExp, replaceValue: string) =>
  (s: string): string =>
    s.replace(searchValue, replaceValue)

/**
 * @example
 * import * as S from 'fp-ts/string'
 * import { pipe } from 'fp-ts/function'
 *
 * assert.deepStrictEqual(pipe(' a ', S.trim), 'a')
 *
 * @since 2.11.0
 */
export const trim = (s: string): string => s.trim()

/**
 * @example
 * import * as S from 'fp-ts/string'
 * import { pipe } from 'fp-ts/function'
 *
 * assert.deepStrictEqual(pipe(' a ', S.trimLeft), 'a ')
 *
 * @since 2.11.0
 */
export const trimLeft = (s: string): string => s.trimLeft()

/**
 * @example
 * import * as S from 'fp-ts/string'
 * import { pipe } from 'fp-ts/function'
 *
 * assert.deepStrictEqual(pipe(' a ', S.trimRight), ' a')
 *
 * @since 2.11.0
 */
export const trimRight = (s: string): string => s.trimRight()

/**
 * @example
 * import * as S from 'fp-ts/string'
 * import { pipe } from 'fp-ts/function'
 *
 * assert.deepStrictEqual(pipe('abcd', S.slice(1, 3)), 'bc')
 *
 * @since 2.11.0
 */
export const slice =
  (start: number, end: number) =>
  (s: string): string =>
    s.slice(start, end)

// -------------------------------------------------------------------------------------
// utils
// -------------------------------------------------------------------------------------

/**
 * Test whether a `string` is empty.
 *
 * @example
 * import * as S from 'fp-ts/string'
 * import { pipe } from 'fp-ts/function'
 *
 * assert.deepStrictEqual(pipe('', S.isEmpty), true)
 * assert.deepStrictEqual(pipe('a', S.isEmpty), false)
 *
 * @since 2.10.0
 */
export const isEmpty = (s: string): boolean => s.length === 0

/**
 * Calculate the number of characters in a `string`.
 *
 * @example
 * import * as S from 'fp-ts/string'
 * import { pipe } from 'fp-ts/function'
 *
 * assert.deepStrictEqual(pipe('abc', S.size), 3)
 *
 * @since 2.10.0
 */
export const size = (s: string): number => s.length

/**
 * @example
 * import * as S from 'fp-ts/string'
 * import { pipe } from 'fp-ts/function'
 *
 * assert.deepStrictEqual(pipe('abc', S.split('')), ['a', 'b', 'c'])
 * assert.deepStrictEqual(pipe('', S.split('')), [''])
 *
 * @since 2.11.0
 */
export const split =
  (separator: string | RegExp) =>
  (s: string): ReadonlyNonEmptyArray<string> => {
    const out = s.split(separator)
    return isNonEmpty(out) ? out : [s]
  }

/**
 * @example
 * import * as S from 'fp-ts/string'
 * import { pipe } from 'fp-ts/function'
 *
 * assert.deepStrictEqual(pipe('abc', S.includes('b')), true)
 * assert.deepStrictEqual(pipe('abc', S.includes('d')), false)
 *
 * @since 2.11.0
 */
export const includes =
  (searchString: string, position?: number) =>
  (s: string): boolean =>
    s.includes(searchString, position)

/**
 * @example
 * import * as S from 'fp-ts/string'
 * import { pipe } from 'fp-ts/function'
 *
 * assert.deepStrictEqual(pipe('abc', S.startsWith('a')), true)
 * assert.deepStrictEqual(pipe('bc', S.startsWith('a')), false)
 *
 * @since 2.11.0
 */
export const startsWith =
  (searchString: string, position?: number) =>
  (s: string): boolean =>
    s.startsWith(searchString, position)

/**
 * @example
 * import * as S from 'fp-ts/string'
 * import { pipe } from 'fp-ts/function'
 *
 * assert.deepStrictEqual(pipe('abc', S.endsWith('c')), true)
 * assert.deepStrictEqual(pipe('ab', S.endsWith('c')), false)
 *
 * @since 2.11.0
 */
export const endsWith =
  (searchString: string, position?: number) =>
  (s: string): boolean =>
    s.endsWith(searchString, position)
