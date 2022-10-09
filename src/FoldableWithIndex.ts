/**
 * @since 3.0.0
 */
import type { TypeLambda, Kind, TypeClass } from './HKT'
import * as readonlyArray from './ReadonlyArray'
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
      readonlyArray.reduceEntries(b, f)(FoldableWithIndex.toEntries(self))
  }

/**
 * @category folding
 * @since 3.0.0
 */
export const foldMapWithIndex =
  <F extends TypeLambda, I>(FoldableWithIndex: FoldableWithIndex<F, I>) =>
  <M>(Monoid: Monoid<M>) => {
    const foldMapWithIndex = readonlyArray.foldMapEntries(Monoid)
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
    const reduceRightWithIndex = readonlyArray.reduceRightEntries(b, f)
    return <S, R, O, E>(self: Kind<F, S, R, O, E, A>): B => {
      return reduceRightWithIndex(FoldableWithIndex.toEntries(self))
    }
  }
