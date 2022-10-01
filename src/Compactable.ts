/**
 * `Compactable` represents data structures which can be _compacted_/_separated_.
 *
 * @since 3.0.0
 */
import type { Either } from './Either'
import { constVoid, flow, pipe } from './Function'
import * as functor from './Functor'
import type { TypeLambda, Kind, TypeClass } from './HKT'
import type { Option } from './Option'
import * as _ from './internal'

// -------------------------------------------------------------------------------------
// model
// -------------------------------------------------------------------------------------

/**
 * @category model
 * @since 3.0.0
 */
export interface Compactable<F extends TypeLambda> extends TypeClass<F> {
  readonly compact: <S, R, O, E, A>(self: Kind<F, S, R, O, E, Option<A>>) => Kind<F, S, R, O, E, A>
  readonly separate: <S, R, O, E, A, B>(
    self: Kind<F, S, R, O, E, Either<A, B>>
  ) => readonly [Kind<F, S, R, O, E, A>, Kind<F, S, R, O, E, B>]
}

/**
 * Returns a default `compact` implementation.
 *
 * @since 3.0.0
 */
export const compact =
  <F extends TypeLambda>(Functor: functor.Functor<F>) =>
  (separate: Compactable<F>['separate']): Compactable<F>['compact'] => {
    return flow(Functor.map(_.fromOption(constVoid)), separate, ([_, out]) => out)
  }

/**
 * Returns a default `separate` implementation.
 *
 * @since 3.0.0
 */
export function separate<F extends TypeLambda>(
  Functor: functor.Functor<F>
): (compact: Compactable<F>['compact']) => Compactable<F>['separate'] {
  return (compact) => (fe) => [pipe(fe, Functor.map(_.getLeft), compact), pipe(fe, Functor.map(_.getRight), compact)]
}

/**
 * Returns a default `compact` composition.
 *
 * @since 3.0.0
 */
export function compactComposition<F extends TypeLambda, G extends TypeLambda>(
  FunctorF: functor.Functor<F>,
  CompactableG: Compactable<G>
): <FS, FR, FO, FE, GS, GR, GO, GE, A>(
  fgoa: Kind<F, FS, FR, FO, FE, Kind<G, GS, GR, GO, GE, Option<A>>>
) => Kind<F, FS, FR, FO, FE, Kind<G, GS, GR, GO, GE, A>> {
  return FunctorF.map(CompactableG.compact)
}

/**
 * Returns a default `separate` composition.
 *
 * @since 3.0.0
 */
export const separateComposition = <F extends TypeLambda, G extends TypeLambda>(
  FunctorF: functor.Functor<F>,
  CompactableG: Compactable<G>,
  FunctorG: functor.Functor<G>
) => {
  const compact_ = compactComposition(FunctorF, CompactableG)
  const map = functor.mapComposition(FunctorF, FunctorG)
  return <FS, FR, FO, FE, GS, GR, GO, GE, A, B>(
    self: Kind<F, FS, FR, FO, FE, Kind<G, GS, GR, GO, GE, Either<A, B>>>
  ): readonly [
    Kind<F, FS, FR, FO, FE, Kind<G, GS, GR, GO, GE, A>>,
    Kind<F, FS, FR, FO, FE, Kind<G, GS, GR, GO, GE, B>>
  ] => [pipe(self, map(_.getLeft), compact_), pipe(self, map(_.getRight), compact_)]
}
