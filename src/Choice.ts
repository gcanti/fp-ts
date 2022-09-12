/**
 * The `Choice` class extends `Profunctor` with combinators for working with
 * sum types.
 *
 * `left` and `right` lift values in a `Profunctor` to act on the `Left` and
 * `Right` components of a sum, respectively.
 *
 * Looking at `Choice` through the intuition of inputs and outputs
 * yields the following type signature:
 *
 * ```purescript
 * left ::  forall input output a. p input output -> p (Either input a) (Either output a)
 * right :: forall input output a. p input output -> p (Either a input) (Either a output)
 * ```
 *
 * If we specialize the profunctor `p` to the `function` arrow, we get the following type
 * signatures:
 *
 * ```purescript
 * left ::  forall input output a. (input -> output) -> (Either input a) -> (Either output a)
 * right :: forall input output a. (input -> output) -> (Either a input) -> (Either a output)
 * ```
 *
 * When the `profunctor` is `Function` application, `left` allows you to map a function over the
 * left side of an `Either`, and `right` maps it over the right side (same as `map` would do).
 *
 * Adapted from https://github.com/purescript/purescript-profunctor/blob/master/src/Data/Profunctor/Choice.purs
 *
 * @since 3.0.0
 */
import type { Category } from './Category'
import type { Either } from './Either'
import { identity, pipe } from './function'
import type { HKT, Kind } from './HKT'
import * as _ from './internal'
import type { Profunctor } from './Profunctor'

/**
 * @category type classes
 * @since 3.0.0
 */
export interface Choice<P extends HKT> extends Profunctor<P> {
  readonly left: <S, A, W, E, B, C>(pab: Kind<P, S, A, W, E, B>) => Kind<P, S, Either<A, C>, W, E, Either<B, C>>
  readonly right: <S, B, W, E, C, A>(pbc: Kind<P, S, B, W, E, C>) => Kind<P, S, Either<A, B>, W, E, Either<A, C>>
}

/**
 * Compose a value acting on a sum from two values, each acting on one of
 * the components of the sum.
 *
 * Specializing `split` to function application would look like this:
 *
 * ```purescript
 * split :: forall a b c d. (a -> b) -> (c -> d) -> (Either a c) -> (Either b d)
 * ```
 *
 * We take two functions, `f` and `g`, and we transform them into a single function which
 * takes an `Either`and maps `f` over the left side and `g` over the right side.  Just like
 * `bimap` would do for the `Bifunctor` instance of `Either`.
 *
 * @since 3.0.0
 */
export const split = <P extends HKT>(P: Choice<P>, C: Category<P>) => <S, A, W, E, B, C, D>(
  pab: Kind<P, S, A, W, E, B>,
  pcd: Kind<P, S, C, W, E, D>
): Kind<P, S, Either<A, C>, W, E, Either<B, D>> =>
  pipe(P.left<S, A, W, E, B, C>(pab), C.compose(P.right<S, C, W, E, D, B>(pcd)))

/**
 * Compose a value which eliminates a sum from two values, each eliminating
 * one side of the sum.
 *
 * This combinator is useful when assembling values from smaller components,
 * because it provides a way to support two different types of input.
 *
 * Specializing `fanIn` to function application would look like this:
 *
 * ```purescript
 * fanIn :: forall a b c d. (a -> c) -> (b -> c) -> Either a b -> c
 * ```
 *
 * We take two functions, `f` and `g`, which both return the same type `c` and we transform them into a
 * single function which takes an `Either` value with the parameter type of `f` on the left side and
 * the parameter type of `g` on the right side. The function then runs either `f` or `g`, depending on
 * whether the `Either` value is a `Left` or a `Right`.
 * This allows us to bundle two different computations which both have the same result type into one
 * function which will run the appropriate computation based on the parameter supplied in the `Either` value.
 *
 * @since 3.0.0
 */
export const fanIn = <P extends HKT>(
  P: Choice<P>,
  C: Category<P>
): (<S, A, W, E, C, B>(
  pac: Kind<P, S, A, W, E, C>,
  pbc: Kind<P, S, B, W, E, C>
) => Kind<P, S, Either<A, B>, W, E, C>) => {
  const splitPC = split(P, C)
  return <S, A, W, E, C, B>(
    pac: Kind<P, S, A, W, E, C>,
    pbc: Kind<P, S, B, W, E, C>
  ): Kind<P, S, Either<A, B>, W, E, C> =>
    pipe(
      splitPC(pac, pbc),
      C.compose(
        pipe(
          C.id<S, C, W, E>(),
          P.promap((cc: Either<C, C>) => (_.isLeft(cc) ? cc.left : cc.right), identity)
        )
      )
    )
}
