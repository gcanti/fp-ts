/**
 * The `Show` type class represents those types which can be converted into
 * a human-readable `string` representation.
 *
 * While not required, it is recommended that for any expression `x`, the
 * string `show(x)` be executable TypeScript code which evaluates to the same
 * value as the expression `x`.
 *
 * @since 3.0.0
 */
import * as _ from './internal'

// -------------------------------------------------------------------------------------
// model
// -------------------------------------------------------------------------------------

/**
 * @category type classes
 * @since 3.0.0
 */
export interface Show<A> {
  readonly show: (a: A) => string
}

// -------------------------------------------------------------------------------------
// combinators
// -------------------------------------------------------------------------------------

/**
 * @category combinators
 * @since 3.0.0
 */
export const struct = <A>(shows: { [K in keyof A]: Show<A[K]> }): Show<{ readonly [K in keyof A]: A[K] }> => ({
  show: (a) => {
    let s = '{'
    for (const k in shows) {
      if (_.has.call(shows, k)) {
        s += ` ${k}: ${shows[k].show(a[k])},`
      }
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
 * @since 3.0.0
 */
export const tuple = <A extends ReadonlyArray<unknown>>(
  ...shows: { [K in keyof A]: Show<A[K]> }
): Show<Readonly<A>> => ({
  show: (t) => `[${t.map((a, i) => shows[i].show(a)).join(', ')}]`
})
