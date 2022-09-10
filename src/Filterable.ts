/**
 * `Filterable` represents data structures which can be _partitioned_/_filtered_.
 *
 * @since 3.0.0
 */
import type { Either } from './Either'
import { flow, pipe } from './function'
import type { Functor } from './Functor'
import type { ComposeF, HKT, Kind, Typeclass } from './HKT'
import { getLeft, getRight, Option } from './Option'
import { not, Predicate } from './Predicate'
import type { Refinement } from './Refinement'
import { separated, Separated } from './Separated'

// -------------------------------------------------------------------------------------
// model
// -------------------------------------------------------------------------------------

/**
 * @since 3.0.0
 */
export interface Filter<F extends HKT> {
  <A, B extends A>(refinement: Refinement<A, B>): <S, R, E>(fa: Kind<F, S, R, E, A>) => Kind<F, S, R, E, B>
  <A>(predicate: Predicate<A>): <S, R, E, B extends A>(fb: Kind<F, S, R, E, B>) => Kind<F, S, R, E, B>
  <A>(predicate: Predicate<A>): <S, R, E>(fa: Kind<F, S, R, E, A>) => Kind<F, S, R, E, A>
}

/**
 * @since 3.0.0
 */
export interface Partition<F extends HKT> {
  <A, B extends A>(refinement: Refinement<A, B>): <S, R, E>(
    fa: Kind<F, S, R, E, A>
  ) => Separated<Kind<F, S, R, E, A>, Kind<F, S, R, E, B>>
  <A>(predicate: Predicate<A>): <S, R, E, B extends A>(
    fb: Kind<F, S, R, E, B>
  ) => Separated<Kind<F, S, R, E, B>, Kind<F, S, R, E, B>>
  <A>(predicate: Predicate<A>): <S, R, E>(
    fa: Kind<F, S, R, E, A>
  ) => Separated<Kind<F, S, R, E, A>, Kind<F, S, R, E, A>>
}

/**
 * @category type classes
 * @since 3.0.0
 */
export interface Filterable<F extends HKT> extends Typeclass<F> {
  readonly partitionMap: <A, B, C>(
    f: (a: A) => Either<B, C>
  ) => <S, R, E>(fa: Kind<F, S, R, E, A>) => Separated<Kind<F, S, R, E, B>, Kind<F, S, R, E, C>>
  readonly partition: Partition<F>
  readonly filterMap: <A, B>(f: (a: A) => Option<B>) => <S, R, E>(fa: Kind<F, S, R, E, A>) => Kind<F, S, R, E, B>
  readonly filter: Filter<F>
}

// -------------------------------------------------------------------------------------
// combinators
// -------------------------------------------------------------------------------------

/**
 * `filter` composition.
 *
 * @category combinators
 * @since 3.0.0
 */
export const filter = <F extends HKT, G extends HKT>(
  F: Functor<F>,
  G: Filterable<G>
): Filterable<ComposeF<F, G>>['filter'] => {
  // TODO
  return (predicate: any) => F.map(G.filter(predicate) as any) as any
}

/**
 * `filterMap` composition.
 *
 * @category combinators
 * @since 3.0.0
 */
export function filterMap<F extends HKT, G extends HKT>(
  F: Functor<F>,
  G: Filterable<G>
): Filterable<ComposeF<F, G>>['filterMap'] {
  // TODO
  return flow(G.filterMap, F.map) as any
}

/**
 * `partition` composition.
 *
 * @category combinators
 * @since 3.0.0
 */
export function partition<F extends HKT, G extends HKT>(
  F: Functor<F>,
  G: Filterable<G>
): Filterable<ComposeF<F, G>>['partition'] {
  // TODO
  const _filter = filter(F, G)
  return (predicate: any) => {
    const left = _filter(not(predicate))
    const right = _filter(predicate)
    return (fga: any) => separated(left(fga), right(fga)) as any
  }
}

/**
 * `partitionMap` composition.
 *
 * @category combinators
 * @since 3.0.0
 */
export function partitionMap<F extends HKT, G extends HKT>(
  F: Functor<F>,
  G: Filterable<G>
): Filterable<ComposeF<F, G>>['partitionMap'] {
  const _filterMap = filterMap(F, G)
  return (f) => (fga) => separated(pipe(fga, _filterMap(flow(f, getLeft))), pipe(fga, _filterMap(flow(f, getRight))))
}
