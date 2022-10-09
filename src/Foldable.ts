/**
 * @since 3.0.0
 */
import type { Kind, TypeClass, TypeLambda } from './HKT'
import * as iterable from './Iterable'
import type { Monoid } from './Monoid'

/**
 * @category model
 * @since 3.0.0
 */
export interface Foldable<F extends TypeLambda> extends TypeClass<F> {
  readonly toIterable: <S, R, O, E, A>(self: Kind<F, S, R, O, E, A>) => Iterable<A>
}

/**
 * Returns a default `toIterable` composition.
 *
 * @since 3.0.0
 */
export const toIterableComposition =
  <F extends TypeLambda, G extends TypeLambda>(FoldableF: Foldable<F>, FoldableG: Foldable<G>) =>
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
  <F extends TypeLambda>(Foldable: Foldable<F>) =>
  <B, A>(b: B, f: (b: B, a: A) => B) => {
    return <S, R, O, E>(self: Kind<F, S, R, O, E, A>): B => iterable.reduce(b, f)(Foldable.toIterable(self))
  }

/**
 * Returns a default `foldMap` implementation.
 *
 * @category folding
 * @since 3.0.0
 */
export const foldMap =
  <F extends TypeLambda>(Foldable: Foldable<F>) =>
  <M>(Monoid: Monoid<M>) => {
    const foldMap = iterable.foldMap(Monoid)
    return <A>(f: (a: A) => M) => {
      const foldMap_ = foldMap(f)
      return <S, R, O, E>(self: Kind<F, S, R, O, E, A>): M => foldMap_(Foldable.toIterable(self))
    }
  }

/**
 * Returns a default `reduceRight` implementation.
 *
 * @category folding
 * @since 3.0.0
 */
export const reduceRight =
  <F extends TypeLambda>(Foldable: Foldable<F>) =>
  <B, A>(b: B, f: (a: A, b: B) => B) => {
    const reduceRight = iterable.reduceRight(b, f)
    return <S, R, O, E>(self: Kind<F, S, R, O, E, A>): B => {
      return reduceRight(Foldable.toIterable(self))
    }
  }
