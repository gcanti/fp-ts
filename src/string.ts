/**
 * @since 2.6.0
 */

import { NonEmptyArray } from './NonEmptyArray'

/**
 * Takes a `delimiter` string and splits a given string value at the delimiter
 * returning one or more substrings.
 *
 *
 * @example
 * import { pipe } from 'fp-ts/lib/pipeable'
 * import { split } from 'fp-ts/lib/string'
 *
 * assert.deepStrictEqual(
 *  pipe(
 *    'foo.bar',
 *    split('.')
 *  ),
 *  ['foo', 'bar']
 * )
 *
 * @since 2.6.0
 */
export function split(delimiter: string): (value: string) => NonEmptyArray<string> {
  return (value) => value.split(delimiter) as NonEmptyArray<string>
}

/**
 * Takes a `delimiter` string and joins given string values with the delimiter.
 *
 *
 * @example
 * import { pipe } from 'fp-ts/lib/pipeable'
 * import { join } from 'fp-ts/lib/string'
 *
 * assert.deepStrictEqual(
 *  pipe(
 *    ['foo', 'bar'],
 *    join('.')
 *  ),
 *  'foo.bar'
 * )
 *
 * @since 2.6.0
 */
export function join(delimiter: string): (values: NonEmptyArray<string>) => string {
  return (values) => values.join(delimiter)
}
