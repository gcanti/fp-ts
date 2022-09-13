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
  /** invariant */
  readonly S?: unknown
  /** contravariant */
  readonly R?: unknown
  /** covariant */
  readonly W?: unknown
  /** covariant */
  readonly E?: unknown
  /** covariant */
  readonly A?: unknown
  readonly type?: unknown
}

/**
 * @since 3.0.0
 */
export type Kind<F extends HKT, S, R, W, E, A> = F extends {
  readonly type: unknown
}
  ? (F & {
      readonly S: S
      readonly R: R
      readonly W: W
      readonly E: E
      readonly A: A
    })['type']
  : {
      readonly _F: F
      readonly _S: (_: S) => S
      readonly _R: (_: R) => void
      readonly _W: () => W
      readonly _E: () => E
      readonly _A: () => A
    }
