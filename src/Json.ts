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
  isNull: () => Z,
  isBool: (x: boolean) => Z,
  isNum: (x: number) => Z,
  isStr: (x: string) => Z,
  isArr: (x: Array<Json>) => Z,
  isObj: (x: Record<string, Json>) => Z
) => (j: Json) => Z = (isNull, isBool, isNum, isStr, isArr, isObj) => (j) =>
  j === null
    ? isNull()
    : typeof j === 'boolean'
    ? isBool(j)
    : typeof j === 'number'
    ? isNum(j)
    : typeof j === 'string'
    ? isStr(j)
    : Array.isArray(j)
    ? isArr(j)
    : isObj(j as JsonRecord)
