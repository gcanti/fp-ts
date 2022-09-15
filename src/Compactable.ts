/**
 * `Compactable` represents data structures which can be _compacted_/_separated_.
 *
 * @since 3.0.0
 */
import type { Either } from './Either'
import { constVoid, flow, pipe } from './function'
import { Functor, map } from './Functor'
import type { HKT, Kind, Typeclass } from './HKT'
import { getLeft, getRight, Option } from './Option'
import { right, Separated, separated } from './Separated'
import * as _ from './internal'

// -------------------------------------------------------------------------------------
// model
// -------------------------------------------------------------------------------------

/**
 * @category type classes
 * @since 3.0.0
 */
export interface Compactable<F extends HKT> extends Typeclass<F> {
  readonly compact: <S, R, W, E, A>(foa: Kind<F, S, R, W, E, Option<A>>) => Kind<F, S, R, W, E, A>
  readonly separate: <S, R, W, E, A, B>(
    fe: Kind<F, S, R, W, E, Either<A, B>>
  ) => Separated<Kind<F, S, R, W, E, A>, Kind<F, S, R, W, E, B>>
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
export const compactDefault = <F extends HKT>(F: Functor<F>) => (
  separate: Compactable<F>['separate']
): Compactable<F>['compact'] => {
  return flow(F.map(_.fromOption(constVoid)), separate, right)
}

/**
 * Return a default `separate` implementation from `Functor` and `compact`.
 *
 * @category defaults
 * @since 3.0.0
 */
export function separateDefault<F extends HKT>(
  F: Functor<F>
): (compact: Compactable<F>['compact']) => Compactable<F>['separate'] {
  return (compact) => (fe) => separated(pipe(fe, F.map(getLeft), compact), pipe(fe, F.map(getRight), compact))
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
export function compact<F extends HKT, G extends HKT>(
  F: Functor<F>,
  G: Compactable<G>
): <FS, FR, FW, FE, GS, GR, GW, GE, A>(
  fgoa: Kind<F, FS, FR, FW, FE, Kind<G, GS, GR, GW, GE, Option<A>>>
) => Kind<F, FS, FR, FW, FE, Kind<G, GS, GR, GW, GE, A>> {
  return F.map(G.compact)
}

/**
 * `separate` composition.
 *
 * @category combinators
 * @since 3.0.0
 */
export function separate<F extends HKT, G extends HKT>(
  F: Functor<F>,
  C: Compactable<G>,
  G: Functor<G>
): <FS, FR, FW, FE, GS, GR, GW, GE, A, B>(
  fge: Kind<F, FS, FR, FW, FE, Kind<G, GS, GR, GW, GE, Either<A, B>>>
) => Separated<
  Kind<F, FS, FR, FW, FE, Kind<G, GS, GR, GW, GE, A>>,
  Kind<F, FS, FR, FW, FE, Kind<G, GS, GR, GW, GE, B>>
> {
  const compactFC = compact(F, C)
  const mapFG = map(F, G)
  return (fge) => separated(pipe(fge, mapFG(getLeft), compactFC), pipe(fge, mapFG(getRight), compactFC))
}
