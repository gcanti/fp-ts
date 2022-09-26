/**
 * `Compactable` represents data structures which can be _compacted_/_separated_.
 *
 * @since 3.0.0
 */
import type { Either } from './Either'
import { constVoid, flow, pipe } from './function'
import * as functor from './Functor'
import type { TypeLambda, Kind, TypeClass } from './HKT'
import type { Option } from './Option'
import * as _ from './internal'
import * as writer from './Writer'

// -------------------------------------------------------------------------------------
// model
// -------------------------------------------------------------------------------------

/**
 * @category type classes
 * @since 3.0.0
 */
export interface Compactable<F extends TypeLambda> extends TypeClass<F> {
  readonly compact: <S, R, O, E, A>(foa: Kind<F, S, R, O, E, Option<A>>) => Kind<F, S, R, O, E, A>
  readonly separate: <S, R, O, E, A, B>(
    fe: Kind<F, S, R, O, E, Either<A, B>>
  ) => readonly [Kind<F, S, R, O, E, A>, Kind<F, S, R, O, E, B>]
}

// -------------------------------------------------------------------------------------
// defaults
// -------------------------------------------------------------------------------------

/**
 * Return a default `compact` implementation from `Functor` and `separate`.
 *
 * @category defaults
 * @since 3.0.0
 */
export const getDefaultCompact =
  <F extends TypeLambda>(F: functor.Functor<F>) =>
  (separate: Compactable<F>['separate']): Compactable<F>['compact'] => {
    return flow(F.map(_.fromOption(constVoid)), separate, writer.snd)
  }

/**
 * Return a default `separate` implementation from `Functor` and `compact`.
 *
 * @category defaults
 * @since 3.0.0
 */
export function getDefaultSeparate<F extends TypeLambda>(
  F: functor.Functor<F>
): (compact: Compactable<F>['compact']) => Compactable<F>['separate'] {
  return (compact) => (fe) => [pipe(fe, F.map(_.getLeft), compact), pipe(fe, F.map(_.getRight), compact)]
}

// -------------------------------------------------------------------------------------
// combinators
// -------------------------------------------------------------------------------------

/**
 * `compact` composition.
 *
 * @category combinators
 * @since 3.0.0
 */
export function getCompactComposition<F extends TypeLambda, G extends TypeLambda>(
  F: functor.Functor<F>,
  G: Compactable<G>
): <FS, FR, FO, FE, GS, GR, GO, GE, A>(
  fgoa: Kind<F, FS, FR, FO, FE, Kind<G, GS, GR, GO, GE, Option<A>>>
) => Kind<F, FS, FR, FO, FE, Kind<G, GS, GR, GO, GE, A>> {
  return F.map(G.compact)
}

/**
 * `separate` composition.
 *
 * @category combinators
 * @since 3.0.0
 */
export function getSeparateComposition<F extends TypeLambda, G extends TypeLambda>(
  F: functor.Functor<F>,
  C: Compactable<G>,
  G: functor.Functor<G>
): <FS, FR, FO, FE, GS, GR, GO, GE, A, B>(
  fge: Kind<F, FS, FR, FO, FE, Kind<G, GS, GR, GO, GE, Either<A, B>>>
) => readonly [
  Kind<F, FS, FR, FO, FE, Kind<G, GS, GR, GO, GE, A>>,
  Kind<F, FS, FR, FO, FE, Kind<G, GS, GR, GO, GE, B>>
] {
  const compactFC = getCompactComposition(F, C)
  const mapFG = functor.getMapComposition(F, G)
  return (fge) => [pipe(fge, mapFG(_.getLeft), compactFC), pipe(fge, mapFG(_.getRight), compactFC)]
}
