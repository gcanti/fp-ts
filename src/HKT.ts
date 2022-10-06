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
export interface TypeClass<F extends TypeLambda> {
  readonly [URI]?: F
}

/**
 * @since 3.0.0
 */
export interface TypeLambda {
  readonly InOut1: unknown
  readonly In1: unknown
  readonly Out3: unknown
  readonly Out2: unknown
  readonly Out1: unknown
}

/**
 * @since 3.0.0
 */
export type Kind<F extends TypeLambda, InOut1, In1, Out3, Out2, Out1> = F extends {
  readonly type: unknown
}
  ? (F & {
      readonly InOut1: InOut1
      readonly In1: In1
      readonly Out3: Out3
      readonly Out2: Out2
      readonly Out1: Out1
    })['type']
  : {
      readonly F: F
      readonly InOut1: (_: InOut1) => InOut1
      readonly In1: (_: In1) => void
      readonly Out3: () => Out3
      readonly Out2: () => Out2
      readonly Out1: () => Out1
    }

/**
 * @since 3.0.0
 */
export type HKD<F extends TypeLambda, A> = Kind<F, <S>(_: S) => S, unknown, never, never, A>
