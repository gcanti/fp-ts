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
 * @category type classes
 * @since 3.0.0
 */
export interface Filterable<F extends HKT> extends Typeclass<F> {
  readonly partitionMap: <A, B, C>(
    f: (a: A) => Either<B, C>
  ) => <S, R, W, E>(fa: Kind<F, S, R, W, E, A>) => Separated<Kind<F, S, R, W, E, B>, Kind<F, S, R, W, E, C>>
  readonly partition: {
    <A, B extends A>(refinement: Refinement<A, B>): <S, R, W, E>(
      fa: Kind<F, S, R, W, E, A>
    ) => Separated<Kind<F, S, R, W, E, A>, Kind<F, S, R, W, E, B>>
    <A>(predicate: Predicate<A>): <S, R, W, E, B extends A>(
      fb: Kind<F, S, R, W, E, B>
    ) => Separated<Kind<F, S, R, W, E, B>, Kind<F, S, R, W, E, B>>
    <A>(predicate: Predicate<A>): <S, R, W, E>(
      fa: Kind<F, S, R, W, E, A>
    ) => Separated<Kind<F, S, R, W, E, A>, Kind<F, S, R, W, E, A>>
  }
  readonly filterMap: <A, B>(
    f: (a: A) => Option<B>
  ) => <S, R, W, E>(fa: Kind<F, S, R, W, E, A>) => Kind<F, S, R, W, E, B>
  readonly filter: {
    <A, B extends A>(refinement: Refinement<A, B>): <S, R, W, E>(fa: Kind<F, S, R, W, E, A>) => Kind<F, S, R, W, E, B>
    <A>(predicate: Predicate<A>): <S, R, W, E, B extends A>(fb: Kind<F, S, R, W, E, B>) => Kind<F, S, R, W, E, B>
    <A>(predicate: Predicate<A>): <S, R, W, E>(fa: Kind<F, S, R, W, E, A>) => Kind<F, S, R, W, E, A>
  }
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
  return <A>(predicate: Predicate<A>) => <FS, FR, FW, FE, GS, GR, GW, GE>(
    fga: Kind<F, FS, FR, FW, FE, Kind<G, GS, GR, GW, GE, A>>
  ) => pipe(fga, F.map(G.filter(predicate)))
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
