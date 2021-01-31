/**
 * @since 3.0.0
 */

/**
 * The `Show` type class represents those types which can be converted into
 * a human-readable `string` representation.
 *
 * While not required, it is recommended that for any expression `x`, the
 * string `show(x)` be executable TypeScript code which evaluates to the same
 * value as the expression `x`.
 *
 * @category type classes
 * @since 3.0.0
 */
export interface Show<A> {
  readonly show: (a: A) => string
}

// -------------------------------------------------------------------------------------
// instances
// -------------------------------------------------------------------------------------

/**
 * @category instances
 * @since 3.0.0
 */
export const showString: Show<string> = {
  show: (a) => JSON.stringify(a)
}

/**
 * @category instances
 * @since 3.0.0
 */
export const showNumber: Show<number> = {
  show: (a) => JSON.stringify(a)
}

/**
 * @category instances
 * @since 3.0.0
 */
export const getStructShow = <A>(shows: { [K in keyof A]: Show<A[K]> }): Show<A> => ({
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
 * @category instances
 * @since 3.0.0
 */
export const getTupleShow = <A extends ReadonlyArray<unknown>>(...shows: { [K in keyof A]: Show<A[K]> }): Show<A> => ({
  show: (t) => `[${t.map((a, i) => shows[i].show(a)).join(', ')}]`
})
