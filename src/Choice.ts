import { Either } from './Either_'
import { HKT2, Type2, Type3, URIS2, URIS3, URIS4, Type4 } from './HKT'
import { Profunctor, Profunctor2, Profunctor3, Profunctor4 } from './Profunctor'
import { Category, Category2, Category3 } from './Category'
import { identity } from './function'

// Adapted from https://github.com/purescript/purescript-profunctor/blob/master/src/Data/Profunctor/Choice.purs

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
 * @typeclass
 * @since 1.11.0
 */
export interface Choice<F> extends Profunctor<F> {
  readonly left: <A, B, C>(pab: HKT2<F, A, B>) => HKT2<F, Either<A, C>, Either<B, C>>
  readonly right: <A, B, C>(pbc: HKT2<F, B, C>) => HKT2<F, Either<A, B>, Either<A, C>>
}

export interface Choice2<F extends URIS2> extends Profunctor2<F> {
  readonly left: <A, B, C>(pab: Type2<F, A, B>) => Type2<F, Either<A, C>, Either<B, C>>
  readonly right: <A, B, C>(pbc: Type2<F, B, C>) => Type2<F, Either<A, B>, Either<A, C>>
}

export interface Choice3<F extends URIS3> extends Profunctor3<F> {
  readonly left: <U, A, B, C>(pab: Type3<F, U, A, B>) => Type3<F, U, Either<A, C>, Either<B, C>>
  readonly right: <U, A, B, C>(pbc: Type3<F, U, B, C>) => Type3<F, U, Either<A, B>, Either<A, C>>
}

export interface Choice4<F extends URIS4> extends Profunctor4<F> {
  readonly left: <X, U, A, B, C>(pab: Type4<F, X, U, A, B>) => Type4<F, X, U, Either<A, C>, Either<B, C>>
  readonly right: <X, U, A, B, C>(pbc: Type4<F, X, U, B, C>) => Type4<F, X, U, Either<A, B>, Either<A, C>>
}

/**
 * Compose a value acting on a sum from two values, each acting on one of
 * the components of the sum.
 *
 * Specializing `(+++)` to function application would look like this:
 *
 * ```purescript
 * (+++) :: forall a b c d. (a -> b) -> (c -> d) -> (Either a c) -> (Either b d)
 * ```
 *
 * We take two functions, `f` and `g`, and we transform them into a single function which
 * takes an `Either`and maps `f` over the left side and `g` over the right side.  Just like
 * `bi-map` would do for the `bi-functor` instance of `Either`.
 *
 * @since 1.11.0
 */
export function splitChoice<F extends URIS3>(
  F: Category3<F> & Choice3<F>
): <U, A, B, C, D>(pab: Type3<F, U, A, B>, pcd: Type3<F, U, C, D>) => Type3<F, U, Either<A, C>, Either<B, D>>
export function splitChoice<F extends URIS2>(
  F: Category2<F> & Choice2<F>
): <A, B, C, D>(pab: Type2<F, A, B>, pcd: Type2<F, C, D>) => Type2<F, Either<A, C>, Either<B, D>>
export function splitChoice<F>(
  F: Category<F> & Choice<F>
): <A, B, C, D>(pab: HKT2<F, A, B>, pcd: HKT2<F, C, D>) => HKT2<F, Either<A, C>, Either<B, D>>
export function splitChoice<F>(
  F: Category<F> & Choice<F>
): <A, B, C, D>(pab: HKT2<F, A, B>, pcd: HKT2<F, C, D>) => HKT2<F, Either<A, C>, Either<B, D>> {
  return (pab, pcd) =>
    F.compose(
      F.left(pab),
      F.right(pcd)
    )
}

/**
 * Compose a value which eliminates a sum from two values, each eliminating
 * one side of the sum.
 *
 * This combinator is useful when assembling values from smaller components,
 * because it provides a way to support two different types of input.
 *
 * Specializing `(|||)` to function application would look like this:
 *
 * ```purescript
 * (|||) :: forall a b c d. (a -> c) -> (b -> c) -> Either a b -> c
 * ```
 *
 * We take two functions, `f` and `g`, which both return the same type `c` and we transform them into a
 * single function which takes an `Either` value with the parameter type of `f` on the left side and
 * the parameter type of `g` on the right side. The function then runs either `f` or `g`, depending on
 * whether the `Either` value is a `Left` or a `Right`.
 * This allows us to bundle two different computations which both have the same result type into one
 * function which will run the approriate computation based on the parameter supplied in the `Either` value.
 *
 * @since 1.11.0
 */
export function fanin<F extends URIS3>(
  F: Category3<F> & Choice3<F>
): <U, A, B, C>(pac: Type3<F, U, A, C>, pbc: Type3<F, U, B, C>) => Type3<F, U, Either<A, B>, C>
export function fanin<F extends URIS2>(
  F: Category2<F> & Choice2<F>
): <A, B, C>(pac: Type2<F, A, C>, pbc: Type2<F, B, C>) => Type2<F, Either<A, B>, C>
export function fanin<F>(
  F: Category<F> & Choice<F>
): <A, B, C>(pac: HKT2<F, A, C>, pbc: HKT2<F, B, C>) => HKT2<F, Either<A, B>, C>
export function fanin<F>(
  F: Category<F> & Choice<F>
): <A, B, C>(pac: HKT2<F, A, C>, pbc: HKT2<F, B, C>) => HKT2<F, Either<A, B>, C> {
  const splitChoiceF = splitChoice(F)
  return <A, B, C>(pac: HKT2<F, A, C>, pbc: HKT2<F, B, C>): HKT2<F, Either<A, B>, C> => {
    const join: HKT2<F, Either<C, C>, C> = F.promap(F.id<C>(), e => e.fold(identity, identity), identity)
    return F.compose(
      join,
      splitChoiceF(pac, pbc)
    )
  }
}
