/**
 * `FilterableWithEffect` represents data structures which can be _partitioned_ with effects in some `Applicative` functor.
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
 * @category type classes
 * @since 3.0.0
 */
export interface FilterableWithEffect<T extends TypeLambda> extends TypeClass<T> {
  readonly partitionMapWithEffect: <F extends TypeLambda>(
    F: Applicative<F>
  ) => <A, S, R, O, E, B, C>(
    f: (a: A) => Kind<F, S, R, O, E, Either<B, C>>
  ) => <TS, TR, TO, TE>(
    wa: Kind<T, TS, TR, TO, TE, A>
  ) => Kind<F, S, R, O, E, readonly [Kind<T, TS, TR, TO, TE, B>, Kind<T, TS, TR, TO, TE, C>]>
  readonly filterMapWithEffect: <F extends TypeLambda>(
    F: Applicative<F>
  ) => <A, S, R, O, E, B>(
    f: (a: A) => Kind<F, S, R, O, E, Option<B>>
  ) => <TS, TR, TO, TE>(ta: Kind<T, TS, TR, TO, TE, A>) => Kind<F, S, R, O, E, Kind<T, TS, TR, TO, TE, B>>
}

// -------------------------------------------------------------------------------------
// defaults
// -------------------------------------------------------------------------------------

/**
 * Return a `partitionMapWithEffect` implementation from `Traversable` and `Compactable`.
 *
 * @category defaults
 * @since 3.0.0
 */
export function getDefaultPartitionMapWithEffect<T extends TypeLambda>(
  T: Traversable<T>,
  C: Compactable<T>
): FilterableWithEffect<T>['partitionMapWithEffect'] {
  return (F) => {
    const traverseF = T.traverse(F)
    return (f) => {
      return flow(traverseF(f), F.map(C.separate))
    }
  }
}

/**
 * Return a `filterMapWithEffect` implementation from `Traversable` and `Compactable`.
 *
 * @category defaults
 * @since 3.0.0
 */
export function getDefaultFilterMapWithEffect<T extends TypeLambda>(
  T: Traversable<T>,
  C: Compactable<T>
): FilterableWithEffect<T>['filterMapWithEffect'] {
  return (F) => {
    const traverseF = T.traverse(F)
    return (f) => {
      return flow(traverseF(f), F.map(C.compact))
    }
  }
}

// -------------------------------------------------------------------------------------
// combinators
// -------------------------------------------------------------------------------------

/**
 * Filter values inside a `F` context.
 *
 * @category combinators
 * @since 3.0.0
 */
export const filterWithEffect =
  <G extends TypeLambda>(FilterableWithEffectG: FilterableWithEffect<G>) =>
  <F extends TypeLambda>(
    ApplicativeF: Applicative<F>
  ): (<B extends A, S, R, O, E, A = B>(
    predicateK: (a: A) => Kind<F, S, R, O, E, boolean>
  ) => <GS, GR, GO, GE>(self: Kind<G, GS, GR, GO, GE, B>) => Kind<F, S, R, O, E, Kind<G, GS, GR, GO, GE, B>>) => {
    const filterMapWithEffectF = FilterableWithEffectG.filterMapWithEffect(ApplicativeF)
    return (predicateK) => {
      return filterMapWithEffectF((b) =>
        pipe(
          predicateK(b),
          ApplicativeF.map((bool) => (bool ? _.some(b) : _.none))
        )
      )
    }
  }

/**
 * Partition values inside a `F` context.
 *
 * @category combinators
 * @since 3.0.0
 */
export const partitionWithEffect =
  <G extends TypeLambda>(FilterableWithEffectG: FilterableWithEffect<G>) =>
  <F extends TypeLambda>(
    ApplicativeF: Applicative<F>
  ): (<B extends A, S, R, O, E, A = B>(
    predicateK: (a: A) => Kind<F, S, R, O, E, boolean>
  ) => <GS, GR, GO, GE>(
    self: Kind<G, GS, GR, GO, GE, B>
  ) => Kind<F, S, R, O, E, readonly [Kind<G, GS, GR, GO, GE, B>, Kind<G, GS, GR, GO, GE, B>]>) => {
    const partitionMapWithEffectF = FilterableWithEffectG.partitionMapWithEffect(ApplicativeF)
    return (predicateK) => {
      return partitionMapWithEffectF((b) =>
        pipe(
          predicateK(b),
          ApplicativeF.map((bool) => (bool ? _.right(b) : _.left(b)))
        )
      )
    }
  }
