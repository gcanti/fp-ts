/**
 * @since 3.0.0
 */
import type * as eq from './Eq'
import * as monoid from './Monoid'
import type * as semigroup from './Semigroup'
import type * as ord from './Ord'
import type * as show_ from './Show'
import type { Refinement } from './Refinement'
import type { NonEmptyReadonlyArray } from './NonEmptyReadonlyArray'
import * as _ from './internal'

// -------------------------------------------------------------------------------------
// instances
// -------------------------------------------------------------------------------------

/**
 * @example
 * import * as S from 'fp-ts/string'
 * import { pipe } from 'fp-ts/Function'
 *
 * assert.deepStrictEqual(pipe('a', S.Eq.equals('a')), true)
 * assert.deepStrictEqual(pipe('a', S.Eq.equals('b')), false)
 *
 * @category instances
 * @since 3.0.0
 */
export const Eq: eq.Eq<string> = {
  equals: (that) => (self) => self === that
}

/**
 * `string` semigroup under concatenation.
 *
 * @example
 * import * as S from 'fp-ts/string'
 * import { pipe } from 'fp-ts/Function'
 *
 * assert.deepStrictEqual(pipe('a', S.Semigroup.combine('b')), 'ab')
 *
 * @category instances
 * @since 3.0.0
 */
export const Semigroup: semigroup.Semigroup<string> = {
  combine: (that) => (self) => self + that
}

/**
 * An empty `string`.
 *
 * @since 3.0.0
 */
export const empty = ''

/**
 * `string` monoid under concatenation.
 *
 * The `empty` value is `''`.
 *
 * @example
 * import * as S from 'fp-ts/string'
 * import { pipe } from 'fp-ts/Function'
 *
 * assert.deepStrictEqual(pipe('a', S.Monoid.combine('b')), 'ab')
 * assert.deepStrictEqual(pipe('a', S.Monoid.combine(S.Monoid.empty)), 'a')
 *
 * @category instances
 * @since 3.0.0
 */
export const Monoid: monoid.Monoid<string> = {
  combine: Semigroup.combine,
  empty
}

/**
 * @since 3.0.0
 */
export const concatAll: (collection: Iterable<string>) => string = monoid.combineAll(Monoid)

/**
 * @example
 * import * as S from 'fp-ts/string'
 * import { pipe } from 'fp-ts/Function'
 *
 * assert.deepStrictEqual(pipe('a', S.Ord.compare('a')), 0)
 * assert.deepStrictEqual(pipe('a', S.Ord.compare('b')), -1)
 * assert.deepStrictEqual(pipe('b', S.Ord.compare('a')), 1)
 *
 * @category instances
 * @since 3.0.0
 */
export const Ord: ord.Ord<string> = {
  compare: (that) => (self) => self < that ? -1 : self > that ? 1 : 0
}

/**
 * @example
 * import * as S from 'fp-ts/string'
 *
 * assert.deepStrictEqual(S.Show.show('a'), '"a"')
 *
 * @category instances
 * @since 3.0.0
 */
export const Show: show_.Show<string> = {
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
 * @since 3.0.0
 */
export const isString: Refinement<unknown, string> = (u: unknown): u is string => typeof u === 'string'

/**
 * @example
 * import * as S from 'fp-ts/string'
 * import { pipe } from 'fp-ts/Function'
 *
 * assert.deepStrictEqual(pipe('a', S.toUpperCase), 'A')
 *
 * @since 3.0.0
 */
export const toUpperCase = (s: string): string => s.toUpperCase()

/**
 * @example
 * import * as S from 'fp-ts/string'
 * import { pipe } from 'fp-ts/Function'
 *
 * assert.deepStrictEqual(pipe('A', S.toLowerCase), 'a')
 *
 * @since 3.0.0
 */
export const toLowerCase = (s: string): string => s.toLowerCase()

/**
 * @example
 * import * as S from 'fp-ts/string'
 * import { pipe } from 'fp-ts/Function'
 *
 * assert.deepStrictEqual(pipe('abc', S.replace('b', 'd')), 'adc')
 *
 * @since 3.0.0
 */
export const replace =
  (searchValue: string | RegExp, replaceValue: string) =>
  (s: string): string =>
    s.replace(searchValue, replaceValue)

/**
 * @example
 * import * as S from 'fp-ts/string'
 * import { pipe } from 'fp-ts/Function'
 *
 * assert.deepStrictEqual(pipe(' a ', S.trim), 'a')
 *
 * @since 3.0.0
 */
export const trim = (s: string): string => s.trim()

/**
 * @example
 * import * as S from 'fp-ts/string'
 * import { pipe } from 'fp-ts/Function'
 *
 * assert.deepStrictEqual(pipe(' a ', S.trimLeft), 'a ')
 *
 * @since 3.0.0
 */
export const trimLeft = (s: string): string => s.trimLeft()

/**
 * @example
 * import * as S from 'fp-ts/string'
 * import { pipe } from 'fp-ts/Function'
 *
 * assert.deepStrictEqual(pipe(' a ', S.trimRight), ' a')
 *
 * @since 3.0.0
 */
export const trimRight = (s: string): string => s.trimRight()

/**
 * @example
 * import * as S from 'fp-ts/string'
 * import { pipe } from 'fp-ts/Function'
 *
 * assert.deepStrictEqual(pipe('abcd', S.slice(1, 3)), 'bc')
 *
 * @since 3.0.0
 */
export const slice =
  (start: number, end: number) =>
  (s: string): string =>
    s.slice(start, end)

/**
 * Test whether a `string` is empty.
 *
 * @example
 * import * as S from 'fp-ts/string'
 * import { pipe } from 'fp-ts/Function'
 *
 * assert.deepStrictEqual(pipe('', S.isEmpty), true)
 * assert.deepStrictEqual(pipe('a', S.isEmpty), false)
 *
 * @since 3.0.0
 */
export const isEmpty = (s: string): boolean => s.length === 0

/**
 * Calculate the number of characters in a `string`.
 *
 * @example
 * import * as S from 'fp-ts/string'
 * import { pipe } from 'fp-ts/Function'
 *
 * assert.deepStrictEqual(pipe('abc', S.size), 3)
 *
 * @since 3.0.0
 */
export const size = (s: string): number => s.length

/**
 * @example
 * import * as S from 'fp-ts/string'
 * import { pipe } from 'fp-ts/Function'
 *
 * assert.deepStrictEqual(pipe('abc', S.split('')), ['a', 'b', 'c'])
 * assert.deepStrictEqual(pipe('', S.split('')), [''])
 *
 * @since 3.0.0
 */
export const split =
  (separator: string | RegExp) =>
  (s: string): NonEmptyReadonlyArray<string> => {
    const out = s.split(separator)
    return _.isNonEmpty(out) ? out : [s]
  }

/**
 * @example
 * import * as S from 'fp-ts/string'
 * import { pipe } from 'fp-ts/Function'
 *
 * assert.deepStrictEqual(pipe('abc', S.includes('b')), true)
 * assert.deepStrictEqual(pipe('abc', S.includes('d')), false)
 *
 * @since 3.0.0
 */
export const includes =
  (searchString: string, position?: number) =>
  (s: string): boolean =>
    s.includes(searchString, position)

/**
 * @example
 * import * as S from 'fp-ts/string'
 * import { pipe } from 'fp-ts/Function'
 *
 * assert.deepStrictEqual(pipe('abc', S.startsWith('a')), true)
 * assert.deepStrictEqual(pipe('bc', S.startsWith('a')), false)
 *
 * @since 3.0.0
 */
export const startsWith =
  (searchString: string, position?: number) =>
  (s: string): boolean =>
    s.startsWith(searchString, position)

/**
 * @example
 * import * as S from 'fp-ts/string'
 * import { pipe } from 'fp-ts/Function'
 *
 * assert.deepStrictEqual(pipe('abc', S.endsWith('c')), true)
 * assert.deepStrictEqual(pipe('ab', S.endsWith('c')), false)
 *
 * @since 3.0.0
 */
export const endsWith =
  (searchString: string, position?: number) =>
  (s: string): boolean =>
    s.endsWith(searchString, position)
