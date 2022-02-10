/**
 * @since 2.10.0
 */
import safeStringify from 'safe-stable-stringify'
import { Either, tryCatch } from './Either'
import { identity } from './function'
import * as Sh from './Show'

// -------------------------------------------------------------------------------------
// model
// -------------------------------------------------------------------------------------

/**
 * @category model
 * @since 2.10.0
 */
export type Json = boolean | number | string | null | JsonArray | JsonRecord

/**
 * @category model
 * @since 2.10.0
 */
export interface JsonRecord {
  readonly [key: string]: Json
}

/**
 * @category model
 * @since 2.10.0
 */
export interface JsonArray extends ReadonlyArray<Json> {}

// -------------------------------------------------------------------------------------
// instances
// -------------------------------------------------------------------------------------

/**
 * @example
 * import * as J from 'fp-ts/Json'
 *
 * const circular: any = { b: 1, a: 0 }
 * circular.circular = circular
 * assert.deepStrictEqual(J.Show.show(circular), '{"a":0,"b":1,"circular":"[Circular]"}')
 *
 * @category instances
 * @since 2.11.9
 */
export const Show: Sh.Show<Json> = {
  show: safeStringify
}

// -------------------------------------------------------------------------------------
// constructors
// -------------------------------------------------------------------------------------

/**
 * Converts a JavaScript Object Notation (JSON) string into a `Json` type.
 *
 * @example
 * import * as J from 'fp-ts/Json'
 * import * as E from 'fp-ts/Either'
 * import { pipe } from 'fp-ts/function'
 *
 * assert.deepStrictEqual(pipe('{"a":1}', J.parse), E.right({ a: 1 }))
 * assert.deepStrictEqual(pipe('{"a":}', J.parse), E.left(new SyntaxError('Unexpected token } in JSON at position 5')))
 *
 * @category constructors
 * @since 2.10.0
 */
export const parse = (s: string): Either<unknown, Json> => tryCatch(() => JSON.parse(s), identity)

// -------------------------------------------------------------------------------------
// destructors
// -------------------------------------------------------------------------------------

/**
 * Converts a JavaScript value to a JavaScript Object Notation (JSON) string.
 *
 * @example
 * import * as E from 'fp-ts/Either'
 * import * as J from 'fp-ts/Json'
 * import { pipe } from 'fp-ts/function'
 *
 * assert.deepStrictEqual(J.stringify({ a: 1 }), E.right('{"a":1}'))
 * const circular: any = { ref: null }
 * circular.ref = circular
 * assert.deepStrictEqual(
 *   pipe(
 *     J.stringify(circular),
 *     E.mapLeft(e => e instanceof Error && e.message.includes('Converting circular structure to JSON'))
 *   ),
 *   E.left(true)
 * )
 *
 * @category destructors
 * @since 2.10.0
 */
export const stringify = <A>(a: A): Either<unknown, string> =>
  tryCatch(() => {
    const s = JSON.stringify(a)
    if (typeof s !== 'string') {
      throw new Error('Converting unsupported structure to JSON')
    }
    return s
  }, identity)
