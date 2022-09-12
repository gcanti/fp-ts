/**
 * @since 3.0.0
 */
import type { Apply } from './Apply'
import { pipe } from './function'
import type { Functor } from './Functor'
import type { HKT, Kind } from './HKT'

// -------------------------------------------------------------------------------------
// model
// -------------------------------------------------------------------------------------

/**
 * @category type classes
 * @since 3.0.0
 */
export interface Chain<M extends HKT> extends Functor<M> {
  readonly chain: <A, S, R, W, E, B>(
    f: (a: A) => Kind<M, S, R, W, E, B>
  ) => (ma: Kind<M, S, R, W, E, A>) => Kind<M, S, R, W, E, B>
}

// -------------------------------------------------------------------------------------
// combinators
// -------------------------------------------------------------------------------------

/**
 * @category combinators
 * @since 3.0.0
 */
export const ap = <F extends HKT>(M: Chain<F>): Apply<F>['ap'] => (fa) => M.chain((f) => pipe(fa, M.map(f)))

/**
 * @category combinators
 * @since 3.0.0
 */
export const chainFirst = <M extends HKT>(M: Chain<M>) => <A, S, R, W, E, B>(
  f: (a: A) => Kind<M, S, R, W, E, B>
): ((first: Kind<M, S, R, W, E, A>) => Kind<M, S, R, W, E, A>) =>
  M.chain((a) =>
    pipe(
      f(a),
      M.map(() => a)
    )
  )

// -------------------------------------------------------------------------------------
// utils
// -------------------------------------------------------------------------------------

/**
 * @since 3.0.0
 */
export const bind = <M extends HKT>(M: Chain<M>) => <N extends string, A, S, R, W, E, B>(
  name: Exclude<N, keyof A>,
  f: <A2 extends A>(a: A | A2) => Kind<M, S, R, W, E, B>
): ((
  ma: Kind<M, S, R, W, E, A>
) => Kind<M, S, R, W, E, { readonly [K in keyof A | N]: K extends keyof A ? A[K] : B }>) =>
  M.chain((a) =>
    pipe(
      f(a),
      M.map((b) => Object.assign({}, a, { [name]: b }) as any)
    )
  )
