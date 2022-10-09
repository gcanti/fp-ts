/**
 * A `Foldable` with an additional index.
 *
 * A `FoldableWithIndex` instance must be compatible with its `Foldable` instance:
 *
 * ```ts
 * reduce(b, f) = reduceWithIndex(b, (_, b, a) => f(b, a))
 * foldMap(M)(f) = foldMapWithIndex(M)((_, a) => f(a))
 * reduceRight(b, f) = reduceRightWithIndex(b, (_, a, b) => f(a, b))
 * ```
 *
 * @since 3.0.0
 */
import type { TypeLambda, Kind, TypeClass } from './HKT'
import * as iterable from './Iterable'
import type { Monoid } from './Monoid'

/**
 * @category model
 * @since 3.0.0
 */
export interface FoldableWithIndex<F extends TypeLambda, I> extends TypeClass<F> {
  readonly toEntries: <S, R, O, E, A>(self: Kind<F, S, R, O, E, A>) => Iterable<readonly [I, A]>
}

/**
 * Returns a default `toIterable` composition.
 *
 * @since 3.0.0
 */
export const toEntriesComposition =
  <F extends TypeLambda, I, G extends TypeLambda, J>(
    FoldableF: FoldableWithIndex<F, I>,
    FoldableG: FoldableWithIndex<G, J>
  ) =>
  <FS, FR, FO, FE, GS, GR, GO, GE, A>(
    self: Kind<F, FS, FR, FO, FE, Kind<G, GS, GR, GO, GE, A>>
  ): Iterable<readonly [readonly [I, J], A]> => {
    return {
      *[Symbol.iterator]() {
        for (const [i, ga] of FoldableF.toEntries(self)) {
          for (const [j, a] of FoldableG.toEntries(ga)) {
            yield [[i, j], a]
          }
        }
      }
    }
  }

/**
 * @category folding
 * @since 3.0.0
 */
export const reduceWithIndex =
  <F extends TypeLambda, I>(FoldableWithIndex: FoldableWithIndex<F, I>) =>
  <B, A>(b: B, f: (i: I, b: B, a: A) => B) => {
    return <S, R, O, E>(self: Kind<F, S, R, O, E, A>): B =>
      iterable.reduceEntries(b, f)(FoldableWithIndex.toEntries(self))
  }

/**
 * @category folding
 * @since 3.0.0
 */
export const foldMapWithIndex =
  <F extends TypeLambda, I>(FoldableWithIndex: FoldableWithIndex<F, I>) =>
  <M>(Monoid: Monoid<M>) => {
    const foldMapWithIndex = iterable.foldMapEntries(Monoid)
    return <A>(f: (i: I, a: A) => M) => {
      const foldMapWithIndex_ = foldMapWithIndex(f)
      return <S, R, O, E>(self: Kind<F, S, R, O, E, A>): M => foldMapWithIndex_(FoldableWithIndex.toEntries(self))
    }
  }

/**
 * @category folding
 * @since 3.0.0
 */
export const reduceRightWithIndex =
  <F extends TypeLambda, I>(FoldableWithIndex: FoldableWithIndex<F, I>) =>
  <B, A>(b: B, f: (i: I, a: A, b: B) => B) => {
    const reduceRightWithIndex = iterable.reduceRightEntries(b, f)
    return <S, R, O, E>(self: Kind<F, S, R, O, E, A>): B => {
      return reduceRightWithIndex(FoldableWithIndex.toEntries(self))
    }
  }
