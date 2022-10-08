/**
 * `Filterable` represents data structures which can be _partitioned_/_filtered_.
 *
 * @since 3.0.0
 */
import { flow, pipe } from '@fp-ts/core/Function'
import type { Functor } from '@fp-ts/core/Functor'
import type { Kind, TypeClass, TypeLambda } from '@fp-ts/core/HKT'
import * as _ from '@fp-ts/core/internal'
import type { Option } from '@fp-ts/core/Option'
import type { Predicate } from '@fp-ts/core/Predicate'
import type { Refinement } from '@fp-ts/core/Refinement'
import type { Result } from '@fp-ts/core/Result'

/**
 * @category model
 * @since 3.0.0
 */
export interface Filterable<F extends TypeLambda> extends TypeClass<F> {
  readonly filterMap: <A, B>(
    f: (a: A) => Option<B>
  ) => <S, R, O, E>(self: Kind<F, S, R, O, E, A>) => Kind<F, S, R, O, E, B>
}

/**
 * Returns a default `filterMap` composition.
 *
 * @since 3.0.0
 */
export const filterMapComposition = <F extends TypeLambda, G extends TypeLambda>(
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
 * Returns a default `filter` implementation.
 *
 * @since 3.0.0
 */
export const filter: <F extends TypeLambda>(
  Filterable: Filterable<F>
) => {
  <C extends A, B extends A, A = C>(refinement: Refinement<A, B>): <S, R, O, E>(
    self: Kind<F, S, R, O, E, C>
  ) => Kind<F, S, R, O, E, B>
  <B extends A, A = B>(predicate: Predicate<A>): <S, R, O, E>(self: Kind<F, S, R, O, E, B>) => Kind<F, S, R, O, E, B>
} = <F extends TypeLambda>(Filterable: Filterable<F>) =>
  <B extends A, A = B>(
    predicate: Predicate<A>
  ): (<S, R, O, E>(self: Kind<F, S, R, O, E, B>) => Kind<F, S, R, O, E, B>) =>
    Filterable.filterMap((b) => (predicate(b) ? _.some(b) : _.none))

/**
 * Returns a default `partitionMap` implementation.
 *
 * @since 3.0.0
 */
export const partitionMap = <F extends TypeLambda>(Filterable: Filterable<F>) =>
  <A, B, C>(f: (a: A) => Result<B, C>) =>
    <S, R, O, E>(self: Kind<F, S, R, O, E, A>): readonly [Kind<F, S, R, O, E, B>, Kind<F, S, R, O, E, C>] => {
      return [
        pipe(self, Filterable.filterMap(flow(f, _.getFailure))),
        pipe(self, Filterable.filterMap(flow(f, _.getSuccess)))
      ]
    }

/**
 * Returns a default `partition` implementation.
 *
 * @since 3.0.0
 */
export const partition: <F extends TypeLambda>(
  Filterable: Filterable<F>
) => {
  <C extends A, B extends A, A = C>(refinement: Refinement<A, B>): <S, R, O, E>(
    self: Kind<F, S, R, O, E, C>
  ) => readonly [Kind<F, S, R, O, E, C>, Kind<F, S, R, O, E, B>]
  <B extends A, A = B>(predicate: Predicate<A>): <S, R, O, E>(
    self: Kind<F, S, R, O, E, B>
  ) => readonly [Kind<F, S, R, O, E, B>, Kind<F, S, R, O, E, B>]
} = <F extends TypeLambda>(Filterable: Filterable<F>) => {
  const partitionMap_ = partitionMap(Filterable)
  return <B extends A, A = B>(
    predicate: Predicate<A>
  ): (<S, R, O, E>(self: Kind<F, S, R, O, E, B>) => readonly [Kind<F, S, R, O, E, B>, Kind<F, S, R, O, E, B>]) =>
    partitionMap_((b) => (predicate(b) ? _.succeed(b) : _.fail(b)))
}
