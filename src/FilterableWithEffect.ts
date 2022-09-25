/**
 * `FilterableWithEffect` represents data structures which can be _partitioned_ with effects in some `Applicative` functor.
 *
 * @since 3.0.0
 */
import type { Applicative } from './Applicative'
import type { Compactable } from './Compactable'
import type { Either } from './Either'
import { flow, pipe } from './function'
import type { TypeLambda, Kind, Typeclass } from './HKT'
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
export interface FilterableWithEffect<T extends TypeLambda> extends Typeclass<T> {
  readonly partitionMapWithEffect: <F extends TypeLambda>(
    F: Applicative<F>
  ) => <A, S, R, W, E, B, C>(
    f: (a: A) => Kind<F, S, R, W, E, Either<B, C>>
  ) => <TS, TR, TW, TE>(
    wa: Kind<T, TS, TR, TW, TE, A>
  ) => Kind<F, S, R, W, E, readonly [Kind<T, TS, TR, TW, TE, B>, Kind<T, TS, TR, TW, TE, C>]>
  readonly filterMapWithEffect: <F extends TypeLambda>(
    F: Applicative<F>
  ) => <A, S, R, W, E, B>(
    f: (a: A) => Kind<F, S, R, W, E, Option<B>>
  ) => <TS, TR, TW, TE>(ta: Kind<T, TS, TR, TW, TE, A>) => Kind<F, S, R, W, E, Kind<T, TS, TR, TW, TE, B>>
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
  <μ extends TypeLambda>(FilterableWithEffectμ: FilterableWithEffect<μ>) =>
  <λ extends TypeLambda>(
    Applicativeλ: Applicative<λ>
  ): (<B extends A, S, R, O, E, A = B>(
    predicateK: (a: A) => Kind<λ, S, R, O, E, boolean>
  ) => <μS, μR, μW, μE>(self: Kind<μ, μS, μR, μW, μE, B>) => Kind<λ, S, R, O, E, Kind<μ, μS, μR, μW, μE, B>>) => {
    const filterMapWithEffectλ = FilterableWithEffectμ.filterMapWithEffect(Applicativeλ)
    return (predicateK) => {
      return filterMapWithEffectλ((b) =>
        pipe(
          predicateK(b),
          Applicativeλ.map((bool) => (bool ? _.some(b) : _.none))
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
  <μ extends TypeLambda>(FilterableWithEffectμ: FilterableWithEffect<μ>) =>
  <λ extends TypeLambda>(
    Applicativeλ: Applicative<λ>
  ): (<B extends A, S, R, O, E, A = B>(
    predicateK: (a: A) => Kind<λ, S, R, O, E, boolean>
  ) => <μS, μR, μW, μE>(
    self: Kind<μ, μS, μR, μW, μE, B>
  ) => Kind<λ, S, R, O, E, readonly [Kind<μ, μS, μR, μW, μE, B>, Kind<μ, μS, μR, μW, μE, B>]>) => {
    const partitionMapWithEffectλ = FilterableWithEffectμ.partitionMapWithEffect(Applicativeλ)
    return (predicateK) => {
      return partitionMapWithEffectλ((b) =>
        pipe(
          predicateK(b),
          Applicativeλ.map((bool) => (bool ? _.right(b) : _.left(b)))
        )
      )
    }
  }
