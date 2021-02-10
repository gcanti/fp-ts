/**
 * The `Show` type class represents those types which can be converted into
 * a human-readable `string` representation.
 *
 * While not required, it is recommended that for any expression `x`, the
 * string `show(x)` be executable TypeScript code which evaluates to the same
 * value as the expression `x`.
 *
 * @since 2.0.0
 */
import { ReadonlyRecord } from './ReadonlyRecord'

// -------------------------------------------------------------------------------------
// model
// -------------------------------------------------------------------------------------

/**
 * @category type classes
 * @since 2.0.0
 */
export interface Show<A> {
  readonly show: (a: A) => string
}

// -------------------------------------------------------------------------------------
// combinators
// -------------------------------------------------------------------------------------

/**
 * @category combinators
 * @since 2.10.0
 */
export const struct = <A>(shows: { [K in keyof A]: Show<A[K]> }): Show<A> => ({
  show: (a) => {
    let s = '{'
    // tslint:disable-next-line: forin
    for (const key in shows) {
      s += ` ${key}: ${shows[key].show(a[key])},`
    }
    if (s.length > 1) {
      s = s.slice(0, -1) + ' '
    }
    s += '}'
    return s
  }
})

/**
 * @category combinators
 * @since 2.10.0
 */
export const tuple = <A extends ReadonlyArray<unknown>>(...shows: { [K in keyof A]: Show<A[K]> }): Show<A> => ({
  show: (t) => `[${t.map((a, i) => shows[i].show(a)).join(', ')}]`
})

// -------------------------------------------------------------------------------------
// deprecated
// -------------------------------------------------------------------------------------

/**
 * Use `tuple` instead.
 *
 * @category combinators
 * @since 2.0.0
 * @deprecated
 */
export const getTupleShow: <T extends ReadonlyArray<Show<any>>>(
  ...shows: T
) => Show<{ [K in keyof T]: T[K] extends Show<infer A> ? A : never }> = tuple

/**
 * Use `struct` instead.
 *
 * @category combinators
 * @since 2.0.0
 * @deprecated
 */
export const getStructShow: <O extends ReadonlyRecord<string, any>>(
  shows: { [K in keyof O]: Show<O[K]> }
) => Show<O> = struct

/**
 * Use `boolean.Show` instead.
 *
 * @category instances
 * @since 2.0.0
 * @deprecated
 */
export const showBoolean: Show<boolean> = {
  show: (a) => JSON.stringify(a)
}

/**
 * Use `string.Show` instead.
 *
 * @category instances
 * @since 2.0.0
 * @deprecated
 */
export const showString: Show<string> = {
  show: (a) => JSON.stringify(a)
}

/**
 * Use `number.Show` instead.
 *
 * @category instances
 * @since 2.0.0
 * @deprecated
 */
export const showNumber: Show<number> = {
  show: (a) => JSON.stringify(a)
}
