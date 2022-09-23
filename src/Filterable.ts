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
import * as _ from './internal'
import type { Predicate } from './Predicate'
import type { Refinement } from './Refinement'

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
  ) => <S, R, W, E>(self: Kind<F, S, R, W, E, A>) => readonly [Kind<F, S, R, W, E, B>, Kind<F, S, R, W, E, C>]
  readonly filterMap: <A, B>(
    f: (a: A) => Option<B>
  ) => <S, R, W, E>(self: Kind<F, S, R, W, E, A>) => Kind<F, S, R, W, E, B>
}

// -------------------------------------------------------------------------------------
// combinators
// -------------------------------------------------------------------------------------

/**
 * @category combinators
 * @since 3.0.0
 */
export const filter: <F extends HKT>(
  F: Filterable<F>
) => {
  <C extends A, B extends A, A = C>(refinement: Refinement<A, B>): <S, R, W, E>(
    self: Kind<F, S, R, W, E, C>
  ) => Kind<F, S, R, W, E, B>
  <B extends A, A = B>(predicate: Predicate<A>): <S, R, W, E>(self: Kind<F, S, R, W, E, B>) => Kind<F, S, R, W, E, B>
} =
  <F extends HKT>(F: Filterable<F>) =>
  <B extends A, A = B>(
    predicate: Predicate<A>
  ): (<S, R, W, E>(self: Kind<F, S, R, W, E, B>) => Kind<F, S, R, W, E, B>) =>
    F.filterMap((b) => (predicate(b) ? _.some(b) : _.none))

/**
 * @category combinators
 * @since 3.0.0
 */
export const partition: <F extends HKT>(
  F: Filterable<F>
) => {
  <C extends A, B extends A, A = C>(refinement: Refinement<A, B>): <S, R, W, E>(
    self: Kind<F, S, R, W, E, C>
  ) => readonly [Kind<F, S, R, W, E, C>, Kind<F, S, R, W, E, B>]
  <B extends A, A = B>(predicate: Predicate<A>): <S, R, W, E>(
    self: Kind<F, S, R, W, E, B>
  ) => readonly [Kind<F, S, R, W, E, B>, Kind<F, S, R, W, E, B>]
} =
  <F extends HKT>(F: Filterable<F>) =>
  <B extends A, A = B>(
    predicate: Predicate<A>
  ): (<S, R, W, E>(self: Kind<F, S, R, W, E, B>) => readonly [Kind<F, S, R, W, E, B>, Kind<F, S, R, W, E, B>]) =>
    F.partitionMap((b) => (predicate(b) ? _.right(b) : _.left(b)))

/**
 * `filterMap` composition.
 *
 * @category combinators
 * @since 3.0.0
 */
export const getFilterMapComposition = <F extends HKT, G extends HKT>(
  F: Functor<F>,
  G: Filterable<G>
): (<A, B>(
  f: (a: A) => Option<B>
) => <FS, FR, FW, FE, GS, GR, GW, GE>(
  self: Kind<F, FS, FR, FW, FE, Kind<G, GS, GR, GW, GE, A>>
) => Kind<F, FS, FR, FW, FE, Kind<G, GS, GR, GW, GE, B>>) => {
  return (f) => F.map(G.filterMap(f))
}

/**
 * `partitionMap` composition.
 *
 * @category combinators
 * @since 3.0.0
 */
export const getPartitionMapComposition = <F extends HKT, G extends HKT>(
  F: Functor<F>,
  G: Filterable<G>
): (<A, B, C>(
  f: (a: A) => Either<B, C>
) => <FS, FR, FW, FE, GS, GR, GW, GE>(
  self: Kind<F, FS, FR, FW, FE, Kind<G, GS, GR, GW, GE, A>>
) => readonly [
  Kind<F, FS, FR, FW, FE, Kind<G, GS, GR, GW, GE, B>>,
  Kind<F, FS, FR, FW, FE, Kind<G, GS, GR, GW, GE, C>>
]) => {
  const filterMap = getFilterMapComposition(F, G)
  return (f) => (self) => [pipe(self, filterMap(flow(f, _.getLeft))), pipe(self, filterMap(flow(f, _.getRight)))]
}
