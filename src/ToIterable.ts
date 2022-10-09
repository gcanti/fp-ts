/**
 * @since 3.0.0
 */
import type { Flattenable } from './Flattenable'
import type { Kind, TypeClass, TypeLambda } from './HKT'
import * as _ from './internal'
import * as iterable from './Iterable'
import type { Monoid } from './Monoid'

/**
 * @category model
 * @since 3.0.0
 */
export interface ToIterable<F extends TypeLambda> extends TypeClass<F> {
  readonly toIterable: <S, R, O, E, A>(self: Kind<F, S, R, O, E, A>) => Iterable<A>
}

// TODO refactor
/**
 * Returns a default `toIterable` composition.
 *
 * @since 3.0.0
 */
export const toIterableComposition =
  <F extends TypeLambda, G extends TypeLambda>(FoldableF: ToIterable<F>, FoldableG: ToIterable<G>) =>
  <FS, FR, FO, FE, GS, GR, GO, GE, A>(self: Kind<F, FS, FR, FO, FE, Kind<G, GS, GR, GO, GE, A>>): Iterable<A> => {
    return {
      *[Symbol.iterator]() {
        for (const ga of FoldableF.toIterable(self)) {
          yield* FoldableG.toIterable(ga)
        }
      }
    }
  }

/**
 * Returns a default `reduce` implementation.
 *
 * @category folding
 * @since 3.0.0
 */
export const reduce =
  <F extends TypeLambda>(Foldable: ToIterable<F>) =>
  <B, A>(b: B, f: (b: B, a: A) => B) =>
  <S, R, O, E>(self: Kind<F, S, R, O, E, A>): B =>
    iterable.reduce(b, f)(Foldable.toIterable(self))

/**
 * Returns a default `foldMap` implementation.
 *
 * @category folding
 * @since 3.0.0
 */
export const foldMap =
  <F extends TypeLambda>(Foldable: ToIterable<F>) =>
  <M>(Monoid: Monoid<M>) =>
  <A>(f: (a: A) => M) =>
  <S, R, O, E>(self: Kind<F, S, R, O, E, A>): M =>
    iterable.foldMap(Monoid)(f)(_.fromIterable(Foldable.toIterable(self)))

/**
 * Returns a default `reduceRight` implementation.
 *
 * @category folding
 * @since 3.0.0
 */
export const reduceRight =
  <F extends TypeLambda>(Foldable: ToIterable<F>) =>
  <B, A>(b: B, f: (a: A, b: B) => B) =>
  <S, R, O, E>(self: Kind<F, S, R, O, E, A>): B =>
    iterable.reduceRight(b, f)(Foldable.toIterable(self))

/**
 * Returns a default `reduceWithIndex` implementation.
 *
 * @category folding
 * @since 3.0.0
 */
export const reduceWithIndex =
  <F extends TypeLambda>(Foldable: ToIterable<F>) =>
  <B, A>(b: B, f: (i: number, b: B, a: A) => B) =>
  <S, R, O, E>(self: Kind<F, S, R, O, E, A>): B =>
    iterable.reduceWithIndex(b, f)(Foldable.toIterable(self))

/**
 * Returns a default `foldMapWithIndex` implementation.
 *
 * @category folding
 * @since 3.0.0
 */
export const foldMapWithIndex =
  <F extends TypeLambda>(Foldable: ToIterable<F>) =>
  <M>(Monoid: Monoid<M>) =>
  <A>(f: (i: number, a: A) => M) =>
  <S, R, O, E>(self: Kind<F, S, R, O, E, A>): M =>
    iterable.foldMapWithIndex(Monoid)(f)(Foldable.toIterable(self))

/**
 * Returns a default `reduceRightWithIndex` implementation.
 *
 * @category folding
 * @since 3.0.0
 */
export const reduceRightWithIndex =
  <F extends TypeLambda>(Foldable: ToIterable<F>) =>
  <B, A>(b: B, f: (i: number, a: A, b: B) => B) =>
  <S, R, O, E>(self: Kind<F, S, R, O, E, A>): B =>
    iterable.reduceRightWithIndex(b, f)(Foldable.toIterable(self))

/**
 * @category folding
 * @since 3.0.0
 */
export const reduceKind =
  <T extends TypeLambda>(Foldable: ToIterable<T>) =>
  <F extends TypeLambda>(Flattenable: Flattenable<F>) =>
  <S, R, O, E, B, A>(fb: Kind<F, S, R, O, E, B>, f: (b: B, a: A) => Kind<F, S, R, O, E, B>) =>
  <TS, TR, TO, TE>(self: Kind<T, TS, TR, TO, TE, A>): Kind<F, S, R, O, E, B> =>
    iterable.reduceKind(Flattenable)(fb, f)(Foldable.toIterable(self))
