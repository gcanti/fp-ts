/**
 * `FilterableKind` represents data structures which can be _partitioned_ with effects in some `Applicative` functor.
 *
 * @since 3.0.0
 */
import type { Applicative } from './Applicative'
import type { Compactable } from './Compactable'
import type { Either } from './Either'
import { flow, pipe } from './function'
import type { TypeLambda, Kind, TypeClass } from './HKT'
import * as _ from './internal'
import type { Option } from './Option'
import type { Traversable } from './Traversable'

// -------------------------------------------------------------------------------------
// model
// -------------------------------------------------------------------------------------

/**
 * @category model
 * @since 3.0.0
 */
export interface FilterableKind<T extends TypeLambda> extends TypeClass<T> {
  readonly partitionMapKind: <F extends TypeLambda>(
    F: Applicative<F>
  ) => <A, S, R, O, E, B, C>(
    f: (a: A) => Kind<F, S, R, O, E, Either<B, C>>
  ) => <TS, TR, TO, TE>(
    wa: Kind<T, TS, TR, TO, TE, A>
  ) => Kind<F, S, R, O, E, readonly [Kind<T, TS, TR, TO, TE, B>, Kind<T, TS, TR, TO, TE, C>]>
  readonly filterMapKind: <F extends TypeLambda>(
    F: Applicative<F>
  ) => <A, S, R, O, E, B>(
    f: (a: A) => Kind<F, S, R, O, E, Option<B>>
  ) => <TS, TR, TO, TE>(ta: Kind<T, TS, TR, TO, TE, A>) => Kind<F, S, R, O, E, Kind<T, TS, TR, TO, TE, B>>
}

// -------------------------------------------------------------------------------------
// defaults
// -------------------------------------------------------------------------------------

/**
 * @category defaults
 * @since 3.0.0
 */
export function getDefaultPartitionMapKind<T extends TypeLambda>(
  T: Traversable<T>,
  C: Compactable<T>
): FilterableKind<T>['partitionMapKind'] {
  return (F) => {
    const traverseF = T.traverse(F)
    return (f) => {
      return flow(traverseF(f), F.map(C.separate))
    }
  }
}

/**
 * @category defaults
 * @since 3.0.0
 */
export function getDefaultFilterMapKind<T extends TypeLambda>(
  T: Traversable<T>,
  C: Compactable<T>
): FilterableKind<T>['filterMapKind'] {
  return (F) => {
    const traverseF = T.traverse(F)
    return (f) => {
      return flow(traverseF(f), F.map(C.compact))
    }
  }
}

// -------------------------------------------------------------------------------------
// derivations
// -------------------------------------------------------------------------------------

/**
 * @category derivations
 * @since 3.0.0
 */
export const getFilterKindDerivation =
  <G extends TypeLambda>(FilterableKindG: FilterableKind<G>) =>
  <F extends TypeLambda>(
    Applicative: Applicative<F>
  ): (<B extends A, S, R, O, E, A = B>(
    predicate: (a: A) => Kind<F, S, R, O, E, boolean>
  ) => <GS, GR, GO, GE>(self: Kind<G, GS, GR, GO, GE, B>) => Kind<F, S, R, O, E, Kind<G, GS, GR, GO, GE, B>>) => {
    const filterMapKind_ = FilterableKindG.filterMapKind(Applicative)
    return (predicate) => {
      return filterMapKind_((b) =>
        pipe(
          predicate(b),
          Applicative.map((bool) => (bool ? _.some(b) : _.none))
        )
      )
    }
  }

/**
 * @category derivations
 * @since 3.0.0
 */
export const getPartitionKindDerivation =
  <G extends TypeLambda>(FilterableKindG: FilterableKind<G>) =>
  <F extends TypeLambda>(
    Applicative: Applicative<F>
  ): (<B extends A, S, R, O, E, A = B>(
    predicate: (a: A) => Kind<F, S, R, O, E, boolean>
  ) => <GS, GR, GO, GE>(
    self: Kind<G, GS, GR, GO, GE, B>
  ) => Kind<F, S, R, O, E, readonly [Kind<G, GS, GR, GO, GE, B>, Kind<G, GS, GR, GO, GE, B>]>) => {
    const partitionMapKind_ = FilterableKindG.partitionMapKind(Applicative)
    return (predicate) => {
      return partitionMapKind_((b) =>
        pipe(
          predicate(b),
          Applicative.map((bool) => (bool ? _.right(b) : _.left(b)))
        )
      )
    }
  }
