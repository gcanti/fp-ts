/**
 * `Alt` has a very similar structure to `Semigroup`, the difference is that `Alt` operates on type
 * constructors of one argument. So, for example, whereas you can find a `Semigroup` for types which are fully
 * specified like `number` or `ReadonlyArray<number>` or `Option<number>`, you will find `Alt` for type constructors like `ReadonlyArray` and `Option`.
 * These types are type constructors in that you can think of them as "functions" in the type space.
 * You can think of the `ReadonlyArray` type as a function which takes a concrete type, like `number`, and returns a concrete type: `ReadonlyArray<number>`.
 * This pattern would also be referred to having `kind: * -> *`, whereas `number` would have kind `*` and `ReadonlyMap` would have `kind *,* -> *`,
 * and, in fact, the `K` in `Alt` stands for `Kind`.
 *
 * `Alt` instances are required to satisfy the following laws:
 *
 * 1. Associativity: `fa1 |> orElse(fa2) |> orElse(fa3) <-> fa1 |> orElse(fa2 |> orElse(fa3))`
 * 2. Distributivity: `fa1 |> orElse(fa2) |> map(ab) <-> fa1 |> map(ab) |> orElse(fa2 |> map(ab))`
 *
 * @since 3.0.0
 */
import type { Kind, TypeClass, TypeLambda } from '@fp-ts/core/HKT'
import * as iterable from '@fp-ts/core/Iterable'

/**
 * @category model
 * @since 3.0.0
 */
export interface Alt<F extends TypeLambda> extends TypeClass<F> {
  readonly orElse: <S, R2, O2, E2, B>(
    that: Kind<F, S, R2, O2, E2, B>
  ) => <R1, O1, E1, A>(self: Kind<F, S, R1, O1, E1, A>) => Kind<F, S, R1 & R2, O1 | O2, E1 | E2, A | B>
}

/**
 * Returns an effect that runs the first effect and in case of failure, runs
 * each of the specified effects in order until one of them succeeds.
 *
 * @since 3.0.0
 */
export const firstSuccessOf = <G extends TypeLambda>(Alt: Alt<G>) =>
  <S, R, O, E, A>(
    startWith: Kind<G, S, R, O, E, A>
  ): ((iterable: Iterable<Kind<G, S, R, O, E, A>>) => Kind<G, S, R, O, E, A>) =>
    iterable.reduce(startWith, (acc, ga) => Alt.orElse(ga)(acc))
