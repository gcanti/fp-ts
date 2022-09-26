/**
 * @since 3.0.0
 */
import type { Flattenable } from './Flattenable'
import { pipe } from './function'
import type { TypeLambda, Kind, TypeClass } from './HKT'
import type { Monoid } from './Monoid'

// -------------------------------------------------------------------------------------
// model
// -------------------------------------------------------------------------------------

/**
 * @category type classes
 * @since 3.0.0
 */
export interface Foldable<F extends TypeLambda> extends TypeClass<F> {
  readonly reduce: <B, A>(b: B, f: (b: B, a: A) => B) => <S, R, O, E>(self: Kind<F, S, R, O, E, A>) => B
  readonly foldMap: <M>(M: Monoid<M>) => <A>(f: (a: A) => M) => <S, R, O, E>(self: Kind<F, S, R, O, E, A>) => M
  readonly reduceRight: <B, A>(b: B, f: (a: A, b: B) => B) => <S, R, O, E>(self: Kind<F, S, R, O, E, A>) => B
}
// -------------------------------------------------------------------------------------
// combinators
// -------------------------------------------------------------------------------------

/**
 * `reduce` composition.
 *
 * @category combinators
 * @since 3.0.0
 */
export const getReduceComposition =
  <F extends TypeLambda, G extends TypeLambda>(
    F: Foldable<F>,
    G: Foldable<G>
  ): (<B, A>(
    b: B,
    f: (b: B, a: A) => B
  ) => <FS, FR, FO, FE, GS, GR, GO, GE>(fga: Kind<F, FS, FR, FO, FE, Kind<G, GS, GR, GO, GE, A>>) => B) =>
  (b, f) =>
    F.reduce(b, (b, ga) => pipe(ga, G.reduce(b, f)))

/**
 * `foldMap` composition.
 *
 * @category combinators
 * @since 3.0.0
 */
export const getFoldMapComposition = <F extends TypeLambda, G extends TypeLambda>(
  F: Foldable<F>,
  G: Foldable<G>
): (<M>(
  M: Monoid<M>
) => <A>(
  f: (a: A) => M
) => <FS, FR, FO, FE, GS, GR, GO, GE>(fga: Kind<F, FS, FR, FO, FE, Kind<G, GS, GR, GO, GE, A>>) => M) => {
  return (M) => (f) => F.foldMap(M)(G.foldMap(M)(f))
}

/**
 * `reduceRight` composition.
 *
 * @category combinators
 * @since 3.0.0
 */
export const getReduceRightComposition = <F extends TypeLambda, G extends TypeLambda>(
  F: Foldable<F>,
  G: Foldable<G>
): (<B, A>(
  b: B,
  f: (a: A, b: B) => B
) => <FS, FR, FO, FE, GS, GR, GO, GE>(fga: Kind<F, FS, FR, FO, FE, Kind<G, GS, GR, GO, GE, A>>) => B) => {
  return (b, f) => F.reduceRight(b, (ga, b) => G.reduceRight(b, f)(ga))
}

// -------------------------------------------------------------------------------------
// utils
// -------------------------------------------------------------------------------------

/**
 * Similar to 'reduce', but the result is encapsulated in a monad.
 *
 * Note: this function is not generally stack-safe, e.g., for monads which build up thunks a la `IO`.
 *
 * @example
 * import { reduceWithEffect } from 'fp-ts/Foldable'
 * import { Flattenable, some } from 'fp-ts/Option'
 * import { make, Foldable } from 'fp-ts/Tree'
 * import { pipe } from 'fp-ts/function'
 *
 * const tree = make(1, [make(2), make(3), make(4)])
 * assert.deepStrictEqual(pipe(tree, reduceWithEffect(Foldable)(Flattenable)(some(0), (b, a) => (a > 2 ? some(b + a) : some(b)))), some(7))
 *
 * @since 3.0.0
 */
export function reduceWithEffect<F extends TypeLambda>(
  F: Foldable<F>
): <M extends TypeLambda>(
  M: Flattenable<M>
) => <GS, GR, GO, GE, B, A>(
  mb: Kind<M, GS, GR, GO, GE, B>,
  f: (b: B, a: A) => Kind<M, GS, GR, GO, GE, B>
) => <FS, FR, FO, FE>(self: Kind<F, FS, FR, FO, FE, A>) => Kind<M, GS, GR, GO, GE, B> {
  return (M) => (mb, f) =>
    F.reduce(mb, (mb, a) =>
      pipe(
        mb,
        M.flatMap((b) => f(b, a))
      )
    )
}

/**
 * Fold a data structure, accumulating values in some `Monoid`, combining adjacent elements using the specified separator.
 *
 * @example
 * import { intercalate } from 'fp-ts/Foldable'
 * import { Monoid } from 'fp-ts/string'
 * import * as T from 'fp-ts/Tree'
 * import { pipe } from 'fp-ts/function'
 *
 * const tree = T.make('a', [T.make('b'), T.make('c'), T.make('d')])
 * assert.strictEqual(pipe(tree, intercalate(T.Foldable)(Monoid)('|')), 'a|b|c|d')
 *
 * @since 3.0.0
 */
export function intercalate<F extends TypeLambda>(
  F: Foldable<F>
): <M>(M: Monoid<M>) => (sep: M) => <S, R, O, E>(fm: Kind<F, S, R, O, E, M>) => M {
  return <M>(M: Monoid<M>) =>
    (sep: M) =>
    <S, R, O, E>(fm: Kind<F, S, R, O, E, M>) => {
      const go = ([init, acc]: readonly [boolean, M], m: M): readonly [boolean, M] =>
        init ? [false, m] : [false, pipe(acc, M.combine(sep), M.combine(m))]
      return pipe(fm, F.reduce([true, M.empty], go))[1]
    }
}

/**
 * Transforms a `Foldable` into a read-only array.
 *
 * @example
 * import { toReadonlyArray } from 'fp-ts/Foldable'
 * import { Foldable, make } from 'fp-ts/Tree'
 * import { pipe } from 'fp-ts/function'
 *
 * const tree = make(1, [make(2), make(3), make(4)])
 * assert.deepStrictEqual(pipe(tree, toReadonlyArray(Foldable)), [1, 2, 3, 4])
 *
 * @since 3.0.0
 */
export function toReadonlyArray<F extends TypeLambda>(
  F: Foldable<F>
): <S, R, O, E, A>(self: Kind<F, S, R, O, E, A>) => ReadonlyArray<A> {
  return <S, R, O, E, A>(self: Kind<F, S, R, O, E, A>) =>
    pipe(
      self,
      F.reduce([], (acc: Array<A>, a: A) => {
        acc.push(a)
        return acc
      })
    )
}
