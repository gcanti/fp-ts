/**
 * @since 2.0.0
 */
import { ReadonlyRecord } from './ReadonlyRecord'

/**
 * The `Show` type class represents those types which can be converted into
 * a human-readable `string` representation.
 *
 * While not required, it is recommended that for any expression `x`, the
 * string `show(x)` be executable TypeScript code which evaluates to the same
 * value as the expression `x`.
 *
 * @category type classes
 * @since 2.0.0
 */
export interface Show<A> {
  readonly show: (a: A) => string
}

/**
 * @category instances
 * @since 2.0.0
 */
export const showString: Show<string> = {
  show: (a) => JSON.stringify(a)
}

/**
 * @category instances
 * @since 2.0.0
 */
export const showNumber: Show<number> = {
  show: (a) => JSON.stringify(a)
}

/**
 * @category instances
 * @since 2.0.0
 */
export const showBoolean: Show<boolean> = {
  show: (a) => JSON.stringify(a)
}

/**
 * @category instances
 * @since 2.0.0
 */
export function getStructShow<O extends ReadonlyRecord<string, any>>(shows: { [K in keyof O]: Show<O[K]> }): Show<O> {
  return {
    show: (s) =>
      `{ ${Object.keys(shows)
        .map((k) => `${k}: ${shows[k].show(s[k])}`)
        .join(', ')} }`
  }
}

/**
 * @category instances
 * @since 2.0.0
 */
export function getTupleShow<T extends ReadonlyArray<Show<any>>>(
  ...shows: T
): Show<{ [K in keyof T]: T[K] extends Show<infer A> ? A : never }> {
  return {
    show: (t) => `[${t.map((a, i) => shows[i].show(a)).join(', ')}]`
  }
}
