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
// compositions
// -------------------------------------------------------------------------------------

/**
 * `reduce` composition.
 *
 * @category compositions
 * @since 3.0.0
 */
export const getReduceComposition =
  <F extends TypeLambda, G extends TypeLambda>(
    FoldableF: Foldable<F>,
    FoldableG: Foldable<G>
  ): (<B, A>(
    b: B,
    f: (b: B, a: A) => B
  ) => <FS, FR, FO, FE, GS, GR, GO, GE>(fga: Kind<F, FS, FR, FO, FE, Kind<G, GS, GR, GO, GE, A>>) => B) =>
  (b, f) =>
    FoldableF.reduce(b, (b, ga) => pipe(ga, FoldableG.reduce(b, f)))

/**
 * `foldMap` compositions.
 *
 * @category compositions
 * @since 3.0.0
 */
export const getFoldMapComposition = <F extends TypeLambda, G extends TypeLambda>(
  FoldableF: Foldable<F>,
  FoldableG: Foldable<G>
): (<M>(
  M: Monoid<M>
) => <A>(
  f: (a: A) => M
) => <FS, FR, FO, FE, GS, GR, GO, GE>(fga: Kind<F, FS, FR, FO, FE, Kind<G, GS, GR, GO, GE, A>>) => M) => {
  return (M) => (f) => FoldableF.foldMap(M)(FoldableG.foldMap(M)(f))
}

/**
 * `reduceRight` compositions.
 *
 * @category compositions
 * @since 3.0.0
 */
export const getReduceRightComposition = <F extends TypeLambda, G extends TypeLambda>(
  FoldableF: Foldable<F>,
  FoldableG: Foldable<G>
): (<B, A>(
  b: B,
  f: (a: A, b: B) => B
) => <FS, FR, FO, FE, GS, GR, GO, GE>(fga: Kind<F, FS, FR, FO, FE, Kind<G, GS, GR, GO, GE, A>>) => B) => {
  return (b, f) => FoldableF.reduceRight(b, (ga, b) => FoldableG.reduceRight(b, f)(ga))
}

// -------------------------------------------------------------------------------------
// conversions
// -------------------------------------------------------------------------------------

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
 * @category conversions
 * @since 3.0.0
 */
export const toReadonlyArray =
  <F extends TypeLambda>(Foldable: Foldable<F>) =>
  <S, R, O, E, A>(self: Kind<F, S, R, O, E, A>): ReadonlyArray<A> => {
    return pipe(
      self,
      Foldable.reduce([], (acc: Array<A>, a: A) => {
        acc.push(a)
        return acc
      })
    )
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
 * import { reduceKind } from 'fp-ts/Foldable'
 * import { Flattenable, some } from 'fp-ts/Option'
 * import { make, Foldable } from 'fp-ts/Tree'
 * import { pipe } from 'fp-ts/function'
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
) => <GS, GR, GO, GE, B, A>(
  mb: Kind<G, GS, GR, GO, GE, B>,
  f: (b: B, a: A) => Kind<G, GS, GR, GO, GE, B>
) => <FS, FR, FO, FE>(self: Kind<F, FS, FR, FO, FE, A>) => Kind<G, GS, GR, GO, GE, B> {
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
 * import { pipe } from 'fp-ts/function'
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
  <S, R, O, E>(fm: Kind<F, S, R, O, E, M>): M => {
    const go = ([init, acc]: readonly [boolean, M], m: M): readonly [boolean, M] =>
      init ? [false, m] : [false, pipe(acc, Monoid.combine(separator), Monoid.combine(m))]
    return pipe(fm, Foldable.reduce([true, Monoid.empty], go))[1]
  }
