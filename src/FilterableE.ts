/**
 * `FilterableE` represents data structures which can be _partitioned_ with effects in some `Applicative` functor.
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
export interface FilterableE<T extends TypeLambda> extends Typeclass<T> {
  readonly partitionMapE: <F extends TypeLambda>(
    F: Applicative<F>
  ) => <A, S, R, W, E, B, C>(
    f: (a: A) => Kind<F, S, R, W, E, Either<B, C>>
  ) => <TS, TR, TW, TE>(
    wa: Kind<T, TS, TR, TW, TE, A>
  ) => Kind<F, S, R, W, E, readonly [Kind<T, TS, TR, TW, TE, B>, Kind<T, TS, TR, TW, TE, C>]>
  readonly filterMapE: <F extends TypeLambda>(
    F: Applicative<F>
  ) => <A, S, R, W, E, B>(
    f: (a: A) => Kind<F, S, R, W, E, Option<B>>
  ) => <TS, TR, TW, TE>(ta: Kind<T, TS, TR, TW, TE, A>) => Kind<F, S, R, W, E, Kind<T, TS, TR, TW, TE, B>>
}

// -------------------------------------------------------------------------------------
// defaults
// -------------------------------------------------------------------------------------

/**
 * Return a `partitionMapE` implementation from `Traversable` and `Compactable`.
 *
 * @category defaults
 * @since 3.0.0
 */
export function getDefaultPartitionMapE<T extends TypeLambda>(
  T: Traversable<T>,
  C: Compactable<T>
): FilterableE<T>['partitionMapE'] {
  return (F) => {
    const traverseF = T.traverse(F)
    return (f) => {
      return flow(traverseF(f), F.map(C.separate))
    }
  }
}

/**
 * Return a `filterMapE` implementation from `Traversable` and `Compactable`.
 *
 * @category defaults
 * @since 3.0.0
 */
export function getDefaultFilterMapE<T extends TypeLambda>(
  T: Traversable<T>,
  C: Compactable<T>
): FilterableE<T>['filterMapE'] {
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
export const filterE =
  <μ extends TypeLambda>(FilterableEμ: FilterableE<μ>) =>
  <λ extends TypeLambda>(
    Applicativeλ: Applicative<λ>
  ): (<B extends A, S, R, O, E, A = B>(
    predicateK: (a: A) => Kind<λ, S, R, O, E, boolean>
  ) => <μS, μR, μW, μE>(self: Kind<μ, μS, μR, μW, μE, B>) => Kind<λ, S, R, O, E, Kind<μ, μS, μR, μW, μE, B>>) => {
    const filterMapEλ = FilterableEμ.filterMapE(Applicativeλ)
    return (predicateK) => {
      return filterMapEλ((b) =>
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
export const partitionE =
  <μ extends TypeLambda>(FilterableEμ: FilterableE<μ>) =>
  <λ extends TypeLambda>(
    Applicativeλ: Applicative<λ>
  ): (<B extends A, S, R, O, E, A = B>(
    predicateK: (a: A) => Kind<λ, S, R, O, E, boolean>
  ) => <μS, μR, μW, μE>(
    self: Kind<μ, μS, μR, μW, μE, B>
  ) => Kind<λ, S, R, O, E, readonly [Kind<μ, μS, μR, μW, μE, B>, Kind<μ, μS, μR, μW, μE, B>]>) => {
    const partitionMapEλ = FilterableEμ.partitionMapE(Applicativeλ)
    return (predicateK) => {
      return partitionMapEλ((b) =>
        pipe(
          predicateK(b),
          Applicativeλ.map((bool) => (bool ? _.right(b) : _.left(b)))
        )
      )
    }
  }
