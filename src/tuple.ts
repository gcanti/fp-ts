/**
 * @since 3.0.0
 */

// -------------------------------------------------------------------------------------
// utils
// -------------------------------------------------------------------------------------

/**
 * @since 3.0.0
 */
export const tuple = <T extends ReadonlyArray<unknown>>(...t: T): T => t

/**
 * Creates a new tuple by recursively evolving a shallow copy of `as`, according to the `transformation` functions.
 *
 * @example
 * import { pipe } from 'fp-ts/function'
 * import { evolve } from 'fp-ts/tuple'
 *
 * assert.deepStrictEqual(
 *   pipe(
 *     ['a', 1] as const,
 *     evolve(
 *       (s) => s.length,
 *       (n) => n * 2
 *     )
 *   ),
 *   [1, 2]
 * )
 *
 * @since 3.0.0
 */
export const evolve = <A extends ReadonlyArray<unknown>, F extends { [K in keyof A]: (a: A[K]) => unknown }>(
  ...transformations: F
) => (as: A): { [K in keyof F]: ReturnType<F[K]> } => {
  const out: Array<unknown> = [...as]
  for (let i = 0; i < transformations.length; i++) {
    out[i] = transformations[i](as[i])
  }
  return out as any
}
