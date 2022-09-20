/**
 * `Filterable` represents data structures which can be _partitioned_/_filtered_.
 *
 * @since 3.0.0
 */
import type { Either } from './Either'
import { flow, pipe } from './function'
import type { Functor } from './Functor'
import type { HKT, Kind, Typeclass } from './HKT'
import type { Option } from './Option'
import * as separated from './Separated'
import * as _ from './internal'
import type { Predicate } from './Predicate'
import type { Refinement } from './Refinement'

import Separated = separated.Separated

// -------------------------------------------------------------------------------------
// model
// -------------------------------------------------------------------------------------

/**
 * @category type classes
 * @since 3.0.0
 */
export interface Filterable<F extends HKT> extends Typeclass<F> {
  readonly partitionMap: <A, B, C>(
    f: (a: A) => Either<B, C>
  ) => <S, R, W, E>(fa: Kind<F, S, R, W, E, A>) => Separated<Kind<F, S, R, W, E, B>, Kind<F, S, R, W, E, C>>
  readonly filterMap: <A, B>(
    f: (a: A) => Option<B>
  ) => <S, R, W, E>(fa: Kind<F, S, R, W, E, A>) => Kind<F, S, R, W, E, B>
}

// -------------------------------------------------------------------------------------
// combinators
// -------------------------------------------------------------------------------------

/**
 * @category combinators
 * @since 3.0.0
 */
export const filter =
  <F extends HKT>(F: Filterable<F>) =>
  <B extends A, A = B>(predicate: Predicate<A>): (<S, R, W, E>(fb: Kind<F, S, R, W, E, B>) => Kind<F, S, R, W, E, B>) =>
    F.filterMap((b) => (predicate(b) ? _.some(b) : _.none))

/**
 * @category combinators
 * @since 3.0.0
 */
export const refine =
  <F extends HKT>(F: Filterable<F>) =>
  <C extends A, B extends A, A = C>(
    refinement: Refinement<A, B>
  ): (<S, R, W, E>(fc: Kind<F, S, R, W, E, C>) => Kind<F, S, R, W, E, B>) =>
    F.filterMap((b) => (refinement(b) ? _.some(b) : _.none))

/**
 * @category combinators
 * @since 3.0.0
 */
export const partition =
  <F extends HKT>(F: Filterable<F>) =>
  <B extends A, A = B>(
    predicate: Predicate<A>
  ): (<S, R, W, E>(fb: Kind<F, S, R, W, E, B>) => Separated<Kind<F, S, R, W, E, B>, Kind<F, S, R, W, E, B>>) =>
    F.partitionMap((b) => (predicate(b) ? _.right(b) : _.left(b)))

/**
 * @category combinators
 * @since 3.0.0
 */
export const refinement =
  <F extends HKT>(F: Filterable<F>) =>
  <C extends A, B extends A, A = C>(
    refinement: Refinement<A, B>
  ): (<S, R, W, E>(fc: Kind<F, S, R, W, E, C>) => Separated<Kind<F, S, R, W, E, C>, Kind<F, S, R, W, E, B>>) =>
    F.partitionMap((c) => (refinement(c) ? _.right(c) : _.left(c)))

/**
 * `filterMap` composition.
 *
 * @category combinators
 * @since 3.0.0
 */
export const filterMap = <F extends HKT, G extends HKT>(
  F: Functor<F>,
  G: Filterable<G>
): (<A, B>(
  f: (a: A) => Option<B>
) => <FS, FR, FW, FE, GS, GR, GW, GE>(
  fga: Kind<F, FS, FR, FW, FE, Kind<G, GS, GR, GW, GE, A>>
) => Kind<F, FS, FR, FW, FE, Kind<G, GS, GR, GW, GE, B>>) => {
  return (f) => F.map(G.filterMap(f))
}

/**
 * `partitionMap` composition.
 *
 * @category combinators
 * @since 3.0.0
 */
export const partitionMap = <F extends HKT, G extends HKT>(
  F: Functor<F>,
  G: Filterable<G>
): (<A, B, C>(
  f: (a: A) => Either<B, C>
) => <FS, FR, FW, FE, GS, GR, GW, GE>(
  fga: Kind<F, FS, FR, FW, FE, Kind<G, GS, GR, GW, GE, A>>
) => Separated<
  Kind<F, FS, FR, FW, FE, Kind<G, GS, GR, GW, GE, B>>,
  Kind<F, FS, FR, FW, FE, Kind<G, GS, GR, GW, GE, C>>
>) => {
  const _filterMap = filterMap(F, G)
  return (f) => (fga) =>
    separated.separated(pipe(fga, _filterMap(flow(f, _.getLeft))), pipe(fga, _filterMap(flow(f, _.getRight))))
}
