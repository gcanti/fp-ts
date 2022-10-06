/**
 * @since 3.0.0
 */
import type { Flattenable } from './Flattenable'
import { pipe } from './Function'
import type { TypeLambda, Kind, TypeClass } from './HKT'
import type { Monoid } from './Monoid'

/**
 * @category model
 * @since 3.0.0
 */
export interface Foldable<F extends TypeLambda> extends TypeClass<F> {
  readonly reduce: <B, A>(b: B, f: (b: B, a: A) => B) => <S>(self: Kind<F, S, never, unknown, unknown, A>) => B
  readonly foldMap: <M>(M: Monoid<M>) => <A>(f: (a: A) => M) => <S>(self: Kind<F, S, never, unknown, unknown, A>) => M
  readonly reduceRight: <B, A>(b: B, f: (a: A, b: B) => B) => <S>(self: Kind<F, S, never, unknown, unknown, A>) => B
}

/**
 * Returns a default `reduce` composition.
 *
 * @since 3.0.0
 */
export const reduceComposition =
  <F extends TypeLambda, G extends TypeLambda>(
    FoldableF: Foldable<F>,
    FoldableG: Foldable<G>
  ): (<B, A>(
    b: B,
    f: (b: B, a: A) => B
  ) => <FS, GS>(fga: Kind<F, FS, never, unknown, unknown, Kind<G, GS, never, unknown, unknown, A>>) => B) =>
  (b, f) =>
    FoldableF.reduce(b, (b, ga) => pipe(ga, FoldableG.reduce(b, f)))

/**
 * Returns a default `foldMap` composition.
 *
 * @since 3.0.0
 */
export const foldMapComposition = <F extends TypeLambda, G extends TypeLambda>(
  FoldableF: Foldable<F>,
  FoldableG: Foldable<G>
): (<M>(
  M: Monoid<M>
) => <A>(
  f: (a: A) => M
) => <FS, GS>(fga: Kind<F, FS, never, unknown, unknown, Kind<G, GS, never, unknown, unknown, A>>) => M) => {
  return (M) => (f) => FoldableF.foldMap(M)(FoldableG.foldMap(M)(f))
}

/**
 * Returns a default `reduceRight` composition.
 *
 * @since 3.0.0
 */
export const reduceRightComposition = <F extends TypeLambda, G extends TypeLambda>(
  FoldableF: Foldable<F>,
  FoldableG: Foldable<G>
): (<B, A>(
  b: B,
  f: (a: A, b: B) => B
) => <FS, GS>(fga: Kind<F, FS, never, unknown, unknown, Kind<G, GS, never, unknown, unknown, A>>) => B) => {
  return (b, f) => FoldableF.reduceRight(b, (ga, b) => FoldableG.reduceRight(b, f)(ga))
}

// -------------------------------------------------------------------------------------
// conversions
// -------------------------------------------------------------------------------------

/**
 * Converts a `Foldable` into a read-only array.
 *
 * @example
 * import { toReadonlyArray } from 'fp-ts/Foldable'
 * import { Foldable, make } from 'fp-ts/Tree'
 * import { pipe } from 'fp-ts/Function'
 *
 * const tree = make(1, [make(2), make(3), make(4)])
 * assert.deepStrictEqual(pipe(tree, toReadonlyArray(Foldable)), [1, 2, 3, 4])
 *
 * @category conversions
 * @since 3.0.0
 */
export const toReadonlyArray =
  <F extends TypeLambda>(Foldable: Foldable<F>) =>
  <S, A>(self: Kind<F, S, never, unknown, unknown, A>): ReadonlyArray<A> => {
    return pipe(
      self,
      Foldable.reduce([], (acc: Array<A>, a: A) => {
        acc.push(a)
        return acc
      })
    )
  }

/**
 * Similar to 'reduce', but the result is encapsulated in a monad.
 *
 * Note: this function is not generally stack-safe, e.g., for monads which build up thunks a la `Sync`.
 *
 * @example
 * import { reduceKind } from 'fp-ts/Foldable'
 * import { Flattenable, some } from 'fp-ts/Option'
 * import { make, Foldable } from 'fp-ts/Tree'
 * import { pipe } from 'fp-ts/Function'
 *
 * const tree = make(1, [make(2), make(3), make(4)])
 * assert.deepStrictEqual(pipe(tree, reduceKind(Foldable)(Flattenable)(some(0), (b, a) => (a > 2 ? some(b + a) : some(b)))), some(7))
 *
 * @since 3.0.0
 */
export function reduceKind<F extends TypeLambda>(
  FoldableF: Foldable<F>
): <G extends TypeLambda>(
  FlattenableG: Flattenable<G>
) => <S, R, O, E, B, A>(
  mb: Kind<G, S, R, O, E, B>,
  f: (b: B, a: A) => Kind<G, S, R, O, E, B>
) => <FS>(self: Kind<F, FS, never, unknown, unknown, A>) => Kind<G, S, R, O, E, B> {
  return (FlattenableG) => (mb, f) =>
    FoldableF.reduce(mb, (mb, a) =>
      pipe(
        mb,
        FlattenableG.flatMap((b) => f(b, a))
      )
    )
}

/**
 * Fold a data structure, accumulating values in some `Monoid`, combining adjacent elements
 * using the specified separator.
 *
 * @example
 * import { intercalate } from 'fp-ts/Foldable'
 * import { Monoid } from 'fp-ts/string'
 * import * as T from 'fp-ts/Tree'
 * import { pipe } from 'fp-ts/Function'
 *
 * const tree = T.make('a', [T.make('b'), T.make('c'), T.make('d')])
 * assert.strictEqual(pipe(tree, intercalate(T.Foldable)(Monoid)('|')), 'a|b|c|d')
 *
 * @since 3.0.0
 */
export const intercalate =
  <F extends TypeLambda>(Foldable: Foldable<F>) =>
  <M>(Monoid: Monoid<M>) =>
  (separator: M) =>
  <S>(fm: Kind<F, S, never, unknown, unknown, M>): M => {
    const go = ([init, acc]: readonly [boolean, M], m: M): readonly [boolean, M] =>
      init ? [false, m] : [false, pipe(acc, Monoid.combine(separator), Monoid.combine(m))]
    return pipe(fm, Foldable.reduce([true, Monoid.empty], go))[1]
  }
