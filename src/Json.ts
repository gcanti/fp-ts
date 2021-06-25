/**
 * @since 2.10.0
 */
import { Either, parseJSON, stringifyJSON } from './Either'
import { identity } from './function'

/**
 * @since 2.10.0
 */
export type Json = boolean | number | string | null | JsonArray | JsonRecord

/**
 * @since 2.10.0
 */
export interface JsonRecord {
  readonly [key: string]: Json
}

/**
 * @since 2.10.0
 */
export interface JsonArray extends ReadonlyArray<Json> {}

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
 * @since 2.10.0
 */
// tslint:disable-next-line: deprecation
export const parse = (s: string): Either<unknown, Json> => parseJSON(s, identity)

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
 *  @since 2.10.0
 */
// tslint:disable-next-line: deprecation
export const stringify = <A>(a: A): Either<unknown, string> => stringifyJSON(a, identity)

// -----------------------------------------------------------------------------
// destructors
// -----------------------------------------------------------------------------

/**
 * Takes a function for each possible Json type and returns the result of the one from the position that matches the given data.
 *
 * @category destructors
 * @example
 * import * as J from 'fp-ts/Json'
 *
 * const typeOf = J.match(
 *   () => 'null',
 *   () => 'boolean',
 *   () => 'number',
 *   () => 'string',
 *   () => 'array',
 *   () => 'object'
 * )
 *
 * assert.deepStrictEqual(typeOf(32.2), 'number')
 * assert.deepStrictEqual(typeOf(['a', 'b']), 'array')
 *
 *  @since 2.10.6
 */
export const match: <Z>(
  onNull: () => Z,
  onBool: (x: boolean) => Z,
  onNum: (x: number) => Z,
  onStr: (x: string) => Z,
  onArr: (x: JsonArray) => Z,
  onObj: (x: JsonRecord) => Z
) => (j: Json) => Z = (onNull, onBool, onNum, onStr, onArr, onObj) => (j) =>
  j === null
    ? onNull()
    : typeof j === 'boolean'
    ? onBool(j)
    : typeof j === 'number'
    ? onNum(j)
    : typeof j === 'string'
    ? onStr(j)
    : Array.isArray(j)
    ? onArr(j)
    : onObj(j as JsonRecord)
