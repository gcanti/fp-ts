/**
 * @since 3.0.0
 */
import * as EitherModule from './Either'

import Either = EitherModule.Either

/**
 * @since 3.0.0
 */
export type Json = boolean | number | string | null | JsonArray | JsonRecord

/**
 * @since 3.0.0
 */
export interface JsonRecord {
  readonly [key: string]: Json
}

/**
 * @since 3.0.0
 */
export interface JsonArray extends ReadonlyArray<Json> {}

/**
 * Converts a JavaScript Object Notation (JSON) string into an object.
 *
 * @example
 * import * as J from 'fp-ts/Json'
 * import * as E from 'fp-ts/Either'
 * import { pipe } from 'fp-ts/function'
 *
 * assert.deepStrictEqual(pipe('{"a":1}', J.parse), E.right({ a: 1 }))
 * assert.deepStrictEqual(pipe('{"a":}', J.parse), E.left(new SyntaxError('Unexpected token } in JSON at position 5')))
 *
 * @since 3.0.0
 */
export const parse = (s: string): Either<unknown, Json> => EitherModule.tryCatch(() => JSON.parse(s))

/**
 * Converts a JavaScript value to a JavaScript Object Notation (JSON) string.
 *
 * @since 3.0.0
 */
export const stringify = <A>(a: A): Either<unknown, string> =>
  EitherModule.tryCatch(() => {
    const s = JSON.stringify(a)
    if (typeof s !== 'string') {
      throw new Error('Converting unsupported structure to JSON')
    }
    return s
  })
