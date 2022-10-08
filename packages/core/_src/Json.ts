/**
 * @since 3.0.0
 */
import { identity } from '@fp-ts/core/Function'
import type { Result } from '@fp-ts/core/Result'
import * as result from '@fp-ts/core/Result'

/**
 * @since 3.0.0
 */
export type Json =
  | boolean
  | number
  | string
  | null
  | ReadonlyArray<Json>
  | {
    readonly [key: string]: Json
  }

/**
 * Converts a JavaScript Object Notation (JSON) string into an object.
 *
 * @example
 * import * as J from '@fp-ts/core/Json'
 * import * as E from '@fp-ts/core/Result'
 * import { pipe } from '@fp-ts/core/Function'
 *
 * assert.deepStrictEqual(pipe('{"a":1}', J.parse), E.succeed({ a: 1 }))
 * assert.deepStrictEqual(pipe('{"a":}', J.parse), E.fail(new SyntaxError('Unexpected token } in JSON at position 5')))
 *
 * @since 3.0.0
 */
export const parse = (s: string): Result<unknown, Json> => result.fromThrowable(() => JSON.parse(s), identity)

/**
 * Converts a JavaScript value to a JavaScript Object Notation (JSON) string.
 *
 * @since 3.0.0
 */
export const stringify = <A>(value: A): Result<unknown, string> =>
  result.fromThrowable(() => {
    const s = JSON.stringify(value)
    if (typeof s !== 'string') {
      throw new Error('Converting unsupported structure to JSON')
    }
    return s
  }, identity)
