/**
 * `FilterableE` represents data structures which can be _partitioned_ with effects in some `Applicative` functor.
 *
 * @since 3.0.0
 */
import type { Applicative } from './Applicative'
import type { Compactable } from './Compactable'
import type { Either } from './Either'
import { flow, pipe } from './function'
import type { HKT, Kind, Typeclass } from './HKT'
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
export interface FilterableE<T extends HKT> extends Typeclass<T> {
  readonly partitionMapE: <F extends HKT>(
    F: Applicative<F>
  ) => <A, S, R, W, E, B, C>(
    f: (a: A) => Kind<F, S, R, W, E, Either<B, C>>
  ) => <TS, TR, TW, TE>(
    wa: Kind<T, TS, TR, TW, TE, A>
  ) => Kind<F, S, R, W, E, readonly [Kind<T, TS, TR, TW, TE, B>, Kind<T, TS, TR, TW, TE, C>]>
  readonly filterMapE: <F extends HKT>(
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
export function getDefaultPartitionMapE<T extends HKT>(
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
export function getDefaultFilterMapE<T extends HKT>(
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
 * See `ReadonlyArray`'s `filterE` for an example of usage.
 *
 * @since 3.0.0
 */
export const filterE =
  <F extends HKT>(F: FilterableE<F>) =>
  <G extends HKT>(G: Applicative<G>) => {
    const filterMapEG = F.filterMapE(G)
    return <B extends A, GS, GR, GW, GE, A = B>(
      predicateK: (a: A) => Kind<G, GS, GR, GW, GE, boolean>
    ): (<FS, FR, FW, FE>(fb: Kind<F, FS, FR, FW, FE, B>) => Kind<G, GS, GR, GW, GE, Kind<F, FS, FR, FW, FE, B>>) => {
      return filterMapEG((a) =>
        pipe(
          predicateK(a),
          G.map((b) => (b ? _.some(a) : _.none))
        )
      )
    }
  }
