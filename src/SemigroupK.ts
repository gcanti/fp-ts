/**
 * `SemigroupK` has a very similar structure to `Semigroup`, the difference is that `SemigroupK` operates on type
 * constructors of one argument. So, for example, whereas you can find a `Semigroup` for types which are fully
 * specified like `number` or `ReadonlyArray<number>` or `Option<number>`, you will find `SemigroupK` for type constructors like `ReadonlyArray` and `Option`.
 * These types are type constructors in that you can think of them as "functions" in the type space.
 * You can think of the `ReadonlyArray` type as a function which takes a concrete type, like `number`, and returns a concrete type: `ReadonlyArray<number>`.
 * This pattern would also be referred to having `kind: * -> *`, whereas `number` would have kind `*` and `ReadonlyMap` would have `kind *,* -> *`,
 * and, in fact, the `K` in `SemigroupK` stands for `Kind`.
 *
 * `SemigroupK` instances are required to satisfy the following laws:
 *
 * 1. Associativity: `fa1 |> combineK(() => fa2) |> combineK(() => fa3) <-> fa1 |> combineK(() => fa2 |> combineK(() => fa3))`
 * 2. Distributivity: `fa1 |> combineK(() => fa2) |> map(ab) <-> fa1 |> map(ab) |> combineK(() => fa2 |> map(ab))`
 *
 * @since 3.0.0
 */
import type { LazyArg } from './function'
import type { TypeLambda, Kind, Typeclass } from './HKT'

// -------------------------------------------------------------------------------------
// model
// -------------------------------------------------------------------------------------

/**
 * @category type classes
 * @since 3.0.0
 */
export interface SemigroupK<F extends TypeLambda> extends Typeclass<F> {
  readonly combineK: <S, R2, W2, E2, B>(
    second: LazyArg<Kind<F, S, R2, W2, E2, B>>
  ) => <R1, W1, E1, A>(self: Kind<F, S, R1, W1, E1, A>) => Kind<F, S, R1 & R2, W1 | W2, E1 | E2, A | B>
}

// -------------------------------------------------------------------------------------
// utils
// -------------------------------------------------------------------------------------

/**
 * @since 3.0.0
 */
export const combineKAll =
  <F extends TypeLambda>(F: SemigroupK<F>) =>
  <S, R, W, E, A>(startWith: Kind<F, S, R, W, E, A>) =>
  (as: ReadonlyArray<Kind<F, S, R, W, E, A>>): Kind<F, S, R, W, E, A> =>
    as.reduce((acc, a) => F.combineK(() => a)(acc), startWith)
