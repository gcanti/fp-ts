/**
 * `Witherable` represents data structures which can be _partitioned_ with effects in some `Applicative` functor.
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
import type { Separated } from './Separated'
import type { Traversable } from './Traversable'

// -------------------------------------------------------------------------------------
// model
// -------------------------------------------------------------------------------------

/**
 * @category type classes
 * @since 3.0.0
 */
export interface Witherable<T extends HKT> extends Typeclass<T> {
  readonly wilt: <F extends HKT>(
    F: Applicative<F>
  ) => <A, FS, FR, FE, B, C>(
    f: (a: A) => Kind<F, FS, FR, FE, Either<B, C>>
  ) => <TS, TR, TE>(
    wa: Kind<T, TS, TR, TE, A>
  ) => Kind<F, FS, FR, FE, Separated<Kind<T, TS, TR, TE, B>, Kind<T, TS, TR, TE, C>>>
  readonly wither: <F extends HKT>(
    F: Applicative<F>
  ) => <A, FS, FR, FE, B>(
    f: (a: A) => Kind<F, FS, FR, FE, Option<B>>
  ) => <TS, TR, TE>(ta: Kind<T, TS, TR, TE, A>) => Kind<F, FS, FR, FE, Kind<T, TS, TR, TE, B>>
}

// -------------------------------------------------------------------------------------
// defaults
// -------------------------------------------------------------------------------------

/**
 * Return a `wilt` implementation from `Traversable` and `Compactable`.
 *
 * @category defaults
 * @since 3.0.0
 */
export function wiltDefault<T extends HKT>(T: Traversable<T>, C: Compactable<T>): Witherable<T>['wilt'] {
  return (F) => {
    const traverseF = T.traverse(F)
    return (f) => {
      return flow(traverseF(f), F.map(C.separate))
    }
  }
}

/**
 * Return a `wither` implementation from `Traversable` and `Compactable`.
 *
 * @category defaults
 * @since 3.0.0
 */
export function witherDefault<T extends HKT>(T: Traversable<T>, C: Compactable<T>): Witherable<T>['wither'] {
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
export function filterE<T extends HKT>(
  T: Witherable<T>
): <F extends HKT>(
  F: Applicative<F>
) => <A, FS, FR, FE>(
  predicate: (a: A) => Kind<F, FS, FR, FE, boolean>
) => <TS, TR, TE>(ga: Kind<T, TS, TR, TE, A>) => Kind<F, FS, FR, FE, Kind<T, TS, TR, TE, A>> {
  return (F) => {
    const witherF = T.wither(F)
    return (predicate) =>
      witherF((a) =>
        pipe(
          predicate(a),
          F.map((b) => (b ? _.some(a) : _.none))
        )
      )
  }
}
