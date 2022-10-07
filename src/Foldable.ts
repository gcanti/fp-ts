/**
 * @since 3.0.0
 */
import type { Kind, TypeClass, TypeLambda } from './HKT'

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
