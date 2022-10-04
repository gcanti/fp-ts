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
import type * as contravariant from './Contravariant'
import type { TypeLambda } from './HKT'
import * as _ from './internal'

/**
 * @category model
 * @since 3.0.0
 */
export interface Show<A> {
  readonly show: (a: A) => string
}

// -------------------------------------------------------------------------------------
// type lambdas
// -------------------------------------------------------------------------------------

/**
 * @category type lambdas
 * @since 3.0.0
 */
export interface ShowTypeLambda extends TypeLambda {
  readonly type: Show<this['In1']>
}

// -------------------------------------------------------------------------------------
// instances
// -------------------------------------------------------------------------------------

/**
 * @since 3.0.0
 */
export const contramap: <B, A>(f: (b: B) => A) => (self: Show<A>) => Show<B> = (f) => (self) => ({
  show: (b) => self.show(f(b))
})

/**
 * @category instances
 * @since 3.0.0
 */
export const Contravariant: contravariant.Contravariant<ShowTypeLambda> = {
  contramap
}

/**
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
 * @since 3.0.0
 */
export const tuple = <A extends ReadonlyArray<unknown>>(
  ...shows: { [K in keyof A]: Show<A[K]> }
): Show<Readonly<A>> => ({
  show: (t) => `[${t.map((a, i) => shows[i].show(a)).join(', ')}]`
})
