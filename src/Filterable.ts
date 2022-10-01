/**
 * `Filterable` represents data structures which can be _partitioned_/_filtered_.
 *
 * @since 3.0.0
 */
import type { Either } from './Either'
import { flow, pipe } from './f'
import type { Functor } from './Functor'
import type { TypeLambda, Kind, TypeClass } from './HKT'
import type { Option } from './Option'
import * as _ from './internal'
import type { Predicate } from './Predicate'
import type { Refinement } from './Refinement'

// -------------------------------------------------------------------------------------
// model
// -------------------------------------------------------------------------------------

/**
 * @category model
 * @since 3.0.0
 */
export interface Filterable<F extends TypeLambda> extends TypeClass<F> {
  readonly partitionMap: <A, B, C>(
    f: (a: A) => Either<B, C>
  ) => <S, R, O, E>(self: Kind<F, S, R, O, E, A>) => readonly [Kind<F, S, R, O, E, B>, Kind<F, S, R, O, E, C>]
  readonly filterMap: <A, B>(
    f: (a: A) => Option<B>
  ) => <S, R, O, E>(self: Kind<F, S, R, O, E, A>) => Kind<F, S, R, O, E, B>
}

// -------------------------------------------------------------------------------------
// derivations
// -------------------------------------------------------------------------------------

/**
 * @category derivations
 * @since 3.0.0
 */
export const getFilterDerivation: <F extends TypeLambda>(
  Filterable: Filterable<F>
) => {
  <C extends A, B extends A, A = C>(refinement: Refinement<A, B>): <S, R, O, E>(
    self: Kind<F, S, R, O, E, C>
  ) => Kind<F, S, R, O, E, B>
  <B extends A, A = B>(predicate: Predicate<A>): <S, R, O, E>(self: Kind<F, S, R, O, E, B>) => Kind<F, S, R, O, E, B>
} =
  <F extends TypeLambda>(Filterable: Filterable<F>) =>
  <B extends A, A = B>(
    predicate: Predicate<A>
  ): (<S, R, O, E>(self: Kind<F, S, R, O, E, B>) => Kind<F, S, R, O, E, B>) =>
    Filterable.filterMap((b) => (predicate(b) ? _.some(b) : _.none))

/**
 * @category derivations
 * @since 3.0.0
 */
export const getPartitionDerivation: <F extends TypeLambda>(
  Filterable: Filterable<F>
) => {
  <C extends A, B extends A, A = C>(refinement: Refinement<A, B>): <S, R, O, E>(
    self: Kind<F, S, R, O, E, C>
  ) => readonly [Kind<F, S, R, O, E, C>, Kind<F, S, R, O, E, B>]
  <B extends A, A = B>(predicate: Predicate<A>): <S, R, O, E>(
    self: Kind<F, S, R, O, E, B>
  ) => readonly [Kind<F, S, R, O, E, B>, Kind<F, S, R, O, E, B>]
} =
  <F extends TypeLambda>(Filterable: Filterable<F>) =>
  <B extends A, A = B>(
    predicate: Predicate<A>
  ): (<S, R, O, E>(self: Kind<F, S, R, O, E, B>) => readonly [Kind<F, S, R, O, E, B>, Kind<F, S, R, O, E, B>]) =>
    Filterable.partitionMap((b) => (predicate(b) ? _.right(b) : _.left(b)))

// -------------------------------------------------------------------------------------
// compositions
// -------------------------------------------------------------------------------------

/**
 * @category compositions
 * @since 3.0.0
 */
export const getFilterMapComposition = <F extends TypeLambda, G extends TypeLambda>(
  FunctorF: Functor<F>,
  FilterableG: Filterable<G>
): (<A, B>(
  f: (a: A) => Option<B>
) => <FS, FR, FO, FE, GS, GR, GO, GE>(
  self: Kind<F, FS, FR, FO, FE, Kind<G, GS, GR, GO, GE, A>>
) => Kind<F, FS, FR, FO, FE, Kind<G, GS, GR, GO, GE, B>>) => {
  return (f) => FunctorF.map(FilterableG.filterMap(f))
}

/**
 * @category compositions
 * @since 3.0.0
 */
export const getPartitionMapComposition = <F extends TypeLambda, G extends TypeLambda>(
  FunctorF: Functor<F>,
  FilterableG: Filterable<G>
): (<A, B, C>(
  f: (a: A) => Either<B, C>
) => <FS, FR, FO, FE, GS, GR, GO, GE>(
  self: Kind<F, FS, FR, FO, FE, Kind<G, GS, GR, GO, GE, A>>
) => readonly [
  Kind<F, FS, FR, FO, FE, Kind<G, GS, GR, GO, GE, B>>,
  Kind<F, FS, FR, FO, FE, Kind<G, GS, GR, GO, GE, C>>
]) => {
  const filterMap = getFilterMapComposition(FunctorF, FilterableG)
  return (f) => (self) => [pipe(self, filterMap(flow(f, _.getLeft))), pipe(self, filterMap(flow(f, _.getRight)))]
}
