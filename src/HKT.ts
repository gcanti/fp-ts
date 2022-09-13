/**
 * Type defunctionalization (as describe in [Lightweight higher-kinded polymorphism](https://www.cl.cam.ac.uk/~jdy22/papers/lightweight-higher-kinded-polymorphism.pdf))
 *
 * @since 3.0.0
 */

/**
 * @since 3.0.0
 */
export declare const URI: unique symbol

/**
 * @since 3.0.0
 */
export interface Typeclass<F extends HKT> {
  readonly [URI]?: F
}

/**
 * @since 3.0.0
 */
export interface HKT {
  readonly Invariant1: unknown
  readonly Contravariant1: unknown
  readonly Covariant3: unknown
  readonly Covariant2: unknown
  readonly Covariant1: unknown
  readonly type: unknown
}

/**
 * @since 3.0.0
 */
export type Kind<F extends HKT, S, R, W, E, A> = F extends {
  readonly type: unknown
}
  ? (F & {
      readonly Invariant1: S
      readonly Contravariant1: R
      readonly Covariant3: W
      readonly Covariant2: E
      readonly Covariant1: A
    })['type']
  : {
      readonly F: F
      readonly Invariant1: (_: S) => S
      readonly Contravariant1: (_: R) => void
      readonly Covariant3: () => W
      readonly Covariant2: () => E
      readonly Covariant1: () => A
    }
